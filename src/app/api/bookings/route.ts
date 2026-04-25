import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { getTour } from "@/lib/tours";
import { sendBookingNotification } from "@/lib/send-booking-notification";

const schema = z.object({
  full_name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  country: z.string().max(80).optional(),
  tour_slug: z.string().min(1),
  preferred_date: z.string().optional(),
  group_size: z.number().int().min(1).max(100),
  message: z.string().max(2000).optional(),
  captcha_token: z.string().min(1, "Please complete the CAPTCHA"),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const captchaSecret = process.env.HCAPTCHA_SECRET;
  if (captchaSecret) {
    const verify = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${captchaSecret}&response=${parsed.data.captcha_token}`,
    });
    const result = await verify.json();
    if (!result.success) {
      return NextResponse.json(
        { error: "CAPTCHA failed. Please try again." },
        { status: 400 }
      );
    }
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
    return NextResponse.json({ error: error.message }, { status: 500 });
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
  }).catch(() => {});

  return NextResponse.json({ ok: true });
}