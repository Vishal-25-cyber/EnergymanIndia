import nodemailer from "nodemailer";

export interface SendMailOptions {
  to?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

/**
 * Creates a nodemailer transporter based on environment configuration.
 * Supports GoDaddy Workspace Email (default for mantif.com), Gmail, or generic SMTP.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || "smtpout.secureserver.net";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || "info@mantif.com";
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.SMTP_PASSWORD;

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  if (user && pass) {
    return nodemailer.createTransport({
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
    });
  }

  return null;
}

/**
 * Sends an email notification in real time to info@mantif.com.
 */
export async function sendEmailNotification(options: SendMailOptions): Promise<{ success: boolean; message?: string }> {
  const recipient = options.to || process.env.NOTIFICATION_EMAIL || "info@mantif.com";
  const fromAddress = process.env.SMTP_FROM || `"MANTIF Careers" <${process.env.SMTP_USER || "info@mantif.com"}>`;

  const transporter = createTransporter();

  if (!transporter) {
    console.warn(
      `[Mailer] SMTP credentials not fully configured in environment. Inquiries are stored in MongoDB. ` +
      `To deliver live emails to ${recipient}, configure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env`
    );
    return {
      success: false,
      message: "SMTP credentials not configured in environment.",
    };
  }

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log(`[Mailer] Real-time email delivered successfully to ${recipient}. MessageId: ${info.messageId}`);
    return { success: true, message: info.messageId };
  } catch (error: any) {
    console.error(`[Mailer] Failed to deliver real-time email to ${recipient}:`, error);
    return { success: false, message: error?.message || "Email dispatch failed" };
  }
}
