// src/app/api/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  author_name: z.string().min(1).max(100),
  author_location: z.string().max(100).optional(),
  rating: z.number().int().min(1).max(5),
  quote: z.string().min(10).max(1000),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  // approved defaults to false — you approve in admin panel before it shows
  const { error } = await supabase.from("testimonials").insert({
    ...parsed.data,
    approved: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
