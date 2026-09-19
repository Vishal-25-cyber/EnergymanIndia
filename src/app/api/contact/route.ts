import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongoose";
import Inquiry from "@/models/Inquiry";
import { sendEmailNotification } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, classLevel, subject, message } = await req.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Please enter a valid 10-digit mobile number." }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Please write your query message." }, { status: 400 });
    }

    await connectToDatabase();

    const inquiry = await Inquiry.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      classLevel: classLevel || "Class 10",
      subject: subject || "General Admissions & Curriculum",
      message: message.trim(),
      status: "NEW",
    });

    // Dispatch real-time email notification to info@mantif.com
    const emailResult = await sendEmailNotification({
      to: "info@mantif.com",
      replyTo: email.trim(),
      subject: subject || `Career Application / Inquiry: ${name.trim()}`,
      text: `New Application / Inquiry Received:\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim()}\nRole/Program: ${classLevel || "General"}\nSubject: ${subject || "General"}\n\nMessage Details:\n${message.trim()}\n\n[Inquiry ID: ${inquiry._id}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #002137; border-bottom: 2px solid #004b79; padding-bottom: 10px; margin-top: 0;">New Career Application Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Candidate Name:</td><td style="color: #0f172a; font-weight: bold;">${name.trim()}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td><td><a href="mailto:${email.trim()}" style="color: #004b79; text-decoration: underline;">${email.trim()}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone / WhatsApp:</td><td style="color: #0f172a; font-weight: 500;">${phone.trim()}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Role / Position:</td><td style="color: #0f172a; font-weight: bold;">${classLevel || "General Application"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Subject:</td><td style="color: #0f172a;">${subject || "Career Application"}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 14px 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #004b79;">
            <strong style="color: #002137; display: block; margin-bottom: 6px; font-size: 13px; text-transform: uppercase;">Application Details &amp; Pitch:</strong>
            <p style="color: #334155; margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message.trim()}</p>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email.trim()}?subject=Interview with MANTIF - ${encodeURIComponent(classLevel || "Application")}" style="display: inline-block; padding: 10px 20px; background-color: #002137; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px;">Reply to Candidate</a>
          </div>
          <p style="margin-top: 28px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
            Delivered directly to info@mantif.com • MANTIF Admissions &amp; Careers System • Record ID: ${inquiry._id}
          </p>
        </div>
      `,
    });

    console.log(`[Contact API] Email delivery status:`, emailResult);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Received and routed to info@mantif.com.",
      inquiryId: inquiry._id,
      emailDelivery: emailResult,
    });
  } catch (error: any) {
    console.error("Contact Inquiry Error:", error);
    return NextResponse.json({ error: error.message || "Failed to send message." }, { status: 500 });
  }
}
