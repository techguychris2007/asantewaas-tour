// src/app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { getTour } from "@/lib/tours";

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
  if (!tour) {
    return NextResponse.json({ error: "Unknown tour" }, { status: 400 });
  }

  const { error } = await supabase.from("bookings").insert({
    full_name: parsed.data.full_name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    country: parsed.data.country,
    tour_slug: parsed.data.tour_slug,
    tour_title: tour.title,
    preferred_date: parsed.data.preferred_date || null,
    group_size: parsed.data.group_size,
    message: parsed.data.message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
