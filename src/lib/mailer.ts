import nodemailer from "nodemailer";

export interface SendMailOptions {
  to?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export interface MailerResult {
  success: boolean;
  provider: "gmail-smtp" | "custom-smtp" | "formsubmit" | "none";
  message?: string;
}

/**
 * Creates a nodemailer transporter based on environment configuration.
 * Supports Gmail (App Password), Microsoft 365, GoDaddy Workspace, or generic SMTP.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || "smtpout.secureserver.net";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || "info@mantif.com";
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.SMTP_PASSWORD;

  // Option 1: Gmail with 16-character App Password (highest deliverability)
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return {
      type: "gmail-smtp" as const,
      client: nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ""),
        },
      }),
    };
  }

  // Option 2: Custom SMTP credentials (e.g. smtp.office365.com or GoDaddy)
  if (user && pass) {
    return {
      type: "custom-smtp" as const,
      client: nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 7000,
      }),
    };
  }

  return null;
}

/**
 * Sends an email notification in real time to info@mantif.com.
 * Uses a multi-tiered fallback:
 * Tier 1: Configured SMTP (Gmail or custom SMTP)
 * Tier 2: HTTP FormSubmit Relay directly to info@mantif.com
 */
export async function sendEmailNotification(options: SendMailOptions): Promise<MailerResult> {
  const recipient = options.to || process.env.NOTIFICATION_EMAIL || "info@mantif.com";
  const fromAddress = process.env.SMTP_FROM || `"MANTIF Careers" <${process.env.SMTP_USER || "info@mantif.com"}>`;

  const transporterObj = createTransporter();

  // ── TIER 1: SMTP DISPATCH ──
  if (transporterObj) {
    try {
      const info = await transporterObj.client.sendMail({
        from: fromAddress,
        to: recipient,
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      console.log(`[Mailer] Real-time email delivered via ${transporterObj.type} to ${recipient}. MessageId: ${info.messageId}`);
      return { success: true, provider: transporterObj.type, message: info.messageId };
    } catch (smtpError: any) {
      console.warn(`[Mailer] ${transporterObj.type} failed (${smtpError?.message}), falling back to HTTP relay...`);
    }
  }

  // ── TIER 2: HTTP FORMSUBMIT RELAY (WITH CC BACKUP) ──
  try {
    const ccAddress = process.env.NOTIFICATION_CC || "solairaj495@gmail.com";
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://mantif.com",
        Referer: "https://mantif.com/",
      },
      body: JSON.stringify({
        _subject: options.subject,
        _replyto: options.replyTo,
        _cc: ccAddress,
        name: options.replyTo || "Applicant",
        email: options.replyTo || recipient,
        message: options.text,
        _template: "table",
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (data?.success === "true" || data?.success === true) {
      console.log(`[Mailer] Real-time email dispatched via FormSubmit HTTP relay to ${recipient}.`);
      return { success: true, provider: "formsubmit", message: "Delivered via FormSubmit" };
    } else {
      console.warn(`[Mailer] FormSubmit HTTP relay status:`, data?.message || JSON.stringify(data));
      return {
        success: false,
        provider: "formsubmit",
        message: data?.message || "FormSubmit pending confirmation at info@mantif.com",
      };
    }
  } catch (httpError: any) {
    console.error(`[Mailer] HTTP FormSubmit relay error:`, httpError?.message);
    return {
      success: false,
      provider: "none",
      message: httpError?.message || "All mail delivery providers failed.",
    };
  }
}
