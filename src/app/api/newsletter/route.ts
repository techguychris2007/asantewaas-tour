// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  email: z.string().email(),
  name: z.string().max(120).optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Upsert so duplicate submissions don't error out
  const { error } = await supabase
    .from("subscribers")
    .upsert(
      { email: parsed.data.email, name: parsed.data.name },
      { onConflict: "email", ignoreDuplicates: true }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
