import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { getTour } from "@/lib/tours";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  full_name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  country: z.string().max(80).optional(),
  tour_slug: z.string().min(1),
  preferred_date: z.string().optional(),
  group_size: z.number().int().min(1).max(100),
  message: z.string().max(2000).optional(),
});

interface BookingNotificationData {
  full_name: string;
  email: string;
  phone?: string;
  country?: string;
  tour_title: string;
  preferred_date?: string;
  group_size: number;
  message?: string;
}

// Internal helper function (NO 'export' keyword here so Next.js build passes)
async function sendBookingNotification(data: BookingNotificationData) {
  const adminEmail = process.env.ADMIN_EMAIL || "info@asantewaas-tour.org";

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
          .header { background-color: #1b4332; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
          .content { padding: 30px; color: #333333; }
          .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 20px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .table td { padding: 12px; border-bottom: 1px solid #eeeeee; font-size: 15px; }
          .table td.label { font-weight: 600; color: #555555; width: 35%; }
          .table td.value { color: #111111; }
          .message-box { background: #f8f9fa; border-left: 4px solid #1b4332; padding: 15px; margin-top: 20px; border-radius: 4px; font-style: italic; color: #555; }
          .footer { background: #f8f9fa; text-align: center; padding: 15px; font-size: 13px; color: #888888; border-top: 1px solid #eeeeee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Asantewaa Tours</h1>
          </div>
          <div class="content">
            <span class="badge">🌿 New Booking Request Received</span>
            <p>A new booking request has been submitted through the website. Here are the details:</p>
            
            <table class="table">
              <tr>
                <td class="label">Customer Name</td>
                <td class="value"><strong>${data.full_name}</strong></td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone Number</td>
                <td class="value">${data.phone || "Not provided"}</td>
              </tr>
              <tr>
                <td class="label">Country</td>
                <td class="value">${data.country || "Not provided"}</td>
              </tr>
              <tr>
                <td class="label">Selected Tour</td>
                <td class="value"><strong>${data.tour_title}</strong></td>
              </tr>
              <tr>
                <td class="label">Preferred Date</td>
                <td class="value">${data.preferred_date || "Flexible / Unspecified"}</td>
              </tr>
              <tr>
                <td class="label">Group Size</td>
                <td class="value">${data.group_size} person(s)</td>
              </tr>
            </table>

            ${
              data.message
                ? `<div class="message-box"><strong>Customer Note:</strong> "${data.message}"</div>`
                : ""
            }
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Asantewaa Tours. Sent automatically from asantewaas-tour.org</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Send Admin Alert Email
  await resend.emails.send({
    from: "Asantewaa Tours <info@asantewaas-tour.org>",
    to: [adminEmail],
    subject: `New Booking Request: ${data.tour_title} 🌿`,
    html: emailHtml,
  });

  // 2. Send Customer Confirmation Email
  await resend.emails.send({
    from: "Asantewaa Tours <info@asantewaas-tour.org>",
    to: [data.email],
    subject: "We received your booking request! 🌿 - Asantewaa Tours",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #1b4332;">Thank you for booking with Asantewaa Tours, ${data.full_name}!</h2>
        <p>We have received your booking request for <strong>${data.tour_title}</strong>.</p>
        <p>Our team is currently reviewing your request and will get back to you shortly via email or phone with availability and payment options.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 13px; color: #777;">If you have urgent questions, feel free to contact us directly via WhatsApp.</p>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const tour = getTour(parsed.data.tour_slug);
  if (!tour && parsed.data.tour_slug !== "custom") {
    return NextResponse.json({ error: "Unknown tour" }, { status: 400 });
  }

  const tourTitle = tour?.title ?? "Custom tour";

  const { error } = await supabase.from("bookings").insert({
    full_name: parsed.data.full_name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    country: parsed.data.country,
    tour_slug: parsed.data.tour_slug,
    tour_title: tourTitle,
    preferred_date: parsed.data.preferred_date || null,
    group_size: parsed.data.group_size,
    message: parsed.data.message,
  });

  if (error) {
    console.error("Bookings insert error:", error);
    return NextResponse.json(
      { error: "Something went wrong saving your booking. Please try again or WhatsApp me directly." },
      { status: 500 }
    );
  }

  sendBookingNotification({
    full_name: parsed.data.full_name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    country: parsed.data.country,
    tour_title: tourTitle,
    preferred_date: parsed.data.preferred_date,
    group_size: parsed.data.group_size,
    message: parsed.data.message,
  }).catch((err) => console.error("Email notification error:", err));

  return NextResponse.json({ ok: true });
}
