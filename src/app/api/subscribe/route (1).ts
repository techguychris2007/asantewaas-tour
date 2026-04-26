// Place this file at: app/api/subscribe/route.ts
// Simplest version: just emails Asantewaa when someone subscribes.
// Upgrade later to Mailchimp/Buttondown/Resend Audiences.

import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL || "",
      subject: `New newsletter subscriber: ${email}`,
      html: `<p>${email} just subscribed to your newsletter.</p>`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return Response.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
