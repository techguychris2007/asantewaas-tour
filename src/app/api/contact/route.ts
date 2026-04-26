// Place this file at: app/api/contact/route.ts
//
// SETUP:
// 1. npm install resend
// 2. Sign up at resend.com (free: 3000 emails/month) — get API key
// 3. In Vercel project settings, add env vars:
//      RESEND_API_KEY=re_xxxxxx
//      CONTACT_TO_EMAIL=asantewaa@yourdomain.com   (where she wants to receive bookings)
//      CONTACT_FROM_EMAIL=bookings@yourdomain.com  (must be a domain you've verified in Resend)
// 4. Redeploy.
//
// If she doesn't have a domain yet, use "onboarding@resend.dev" as the From address — it works without verification.

import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot — if filled, silently accept and drop
    if (body.website) {
      return Response.json({ ok: true });
    }

    const {
      name, email, phone, country, tour, startDate,
      adults, children, message, type,
    } = body;

    if (!name || !email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const subject = type === "booking"
      ? `New booking request: ${tour || "general"} — ${name}`
      : `New message from ${name}`;

    const html = `
      <h2>${subject}</h2>
      <table style="font-family: system-ui, sans-serif; line-height: 1.6;">
        <tr><td><strong>Name:</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${escapeHtml(email)}</td></tr>
        ${phone ? `<tr><td><strong>WhatsApp:</strong></td><td>${escapeHtml(phone)}</td></tr>` : ""}
        ${country ? `<tr><td><strong>From:</strong></td><td>${escapeHtml(country)}</td></tr>` : ""}
        ${tour ? `<tr><td><strong>Tour:</strong></td><td>${escapeHtml(tour)}</td></tr>` : ""}
        ${startDate ? `<tr><td><strong>Start date:</strong></td><td>${escapeHtml(startDate)}</td></tr>` : ""}
        ${adults ? `<tr><td><strong>Adults:</strong></td><td>${escapeHtml(String(adults))}</td></tr>` : ""}
        ${children ? `<tr><td><strong>Children:</strong></td><td>${escapeHtml(String(children))}</td></tr>` : ""}
      </table>
      ${message ? `<h3>Message</h3><p style="font-family: system-ui, sans-serif;">${escapeHtml(message).replace(/\n/g, "<br>")}</p>` : ""}
    `;

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL || "",
      replyTo: email,
      subject,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
