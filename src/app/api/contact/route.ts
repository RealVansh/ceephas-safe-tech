import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, company, email, phone, product, message } = data || {};

    if (!name || !company || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // SMTP Credentials Configuration
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL || "gloves@cephasmedical.net";

    const isSmtpConfigured = !!(smtpHost && smtpPort && smtpUser && smtpPass);

    const emailContentHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 8px;">
        <h2 style="color: #2F3192; border-bottom: 2px solid #2F3192; padding-bottom: 10px; margin-top: 0;">New B2B Website Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #475569;">Full Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Company Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Number:</td>
            <td style="padding: 8px 0; color: #0f172a;">${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Product Interest:</td>
            <td style="padding: 8px 0; color: #2F3192; font-weight: bold;">${product || "General Enquiry"}</td>
          </tr>
        </table>
        <div style="margin-top: 30px; padding: 15px; bg-slate-50: #f8fafc; border-left: 4px solid #ED1C25; background-color: #f8fafc;">
          <h4 style="margin: 0 0 10px 0; color: #475569; font-size: 14px; uppercase: tracking-wider;">Message / Requirements:</h4>
          <p style="margin: 0; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${message || "No message provided"}</p>
        </div>
        <div style="margin-top: 30px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center;">
          Sent from Cephas Safe Tech B2B Contact Form • Sender IP: ${ip}
        </div>
      </div>
    `;

    if (!isSmtpConfigured) {
      console.warn("⚠️ [SMTP NOT CONFIGURED] Fallback Logger: Contact enquiry received.");
      console.log("Enquiry Details:", {
        name,
        company,
        email,
        phone,
        product,
        message,
        ip
      });
      return NextResponse.json({ ok: true, mocked: true }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465, // true for port 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"${name} (${company})" <${smtpUser}>`, // Must be validated sender
      replyTo: email,
      to: contactEmail,
      bcc: "jeremiah@cls.net.in",
      subject: `[Cephas B2B Enquiry] ${company} - ${product || "General"}`,
      html: emailContentHtml,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    console.error("❌ Error in contact API route:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
