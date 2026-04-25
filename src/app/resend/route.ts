// src/app/api/resend/route.ts
// Called internally by /api/bookings after a successful booking insert.
// Set RESEND_API_KEY and RESEND_TO_EMAIL in your Vercel environment variables.

export async function sendBookingNotification(data: {
  full_name: string;
  email: string;
  phone?: string;
  country?: string;
  tour_title: string;
  preferred_date?: string;
  group_size: number;
  message?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL; // your own email address

  if (!apiKey || !toEmail) return; // silently skip if not configured yet

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Asantewaa Tour <bookings@resend.dev>",
      to: [toEmail],
      subject: `New booking request — ${data.tour_title}`,
      html: `
        <h2>New booking request 🌿</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
          <tr><td style="padding:6px 16px 6px 0;color:#888">Name</td><td><strong>${data.full_name}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Phone</td><td>${data.phone ?? "—"}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Country</td><td>${data.country ?? "—"}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Tour</td><td>${data.tour_title}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Date</td><td>${data.preferred_date ?? "Flexible"}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Group size</td><td>${data.group_size}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Message</td><td>${data.message ?? "—"}</td></tr>
        </table>
        <p style="margin-top:24px;color:#888;font-size:13px">Sent from asantewaa-tour.vercel.app</p>
      `,
    }),
  });
}
