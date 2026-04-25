// src/app/api/payment/route.ts
// Paystack payment initialization
// Add PAYSTACK_SECRET_KEY to your Vercel environment variables
// Get it from: https://dashboard.paystack.com/#/settings/developers

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  amount_usd: z.number().min(1),
  tour_title: z.string(),
  full_name: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Payment not configured yet." }, { status: 503 });
  }

  // Paystack uses pesewas (GHS) or kobo (NGN). For USD we use USD directly.
  // Amount in kobo/pesewas = amount * 100
  const amountInCents = Math.round(parsed.data.amount_usd * 100);

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: parsed.data.email,
      amount: amountInCents,
      currency: "USD",
      metadata: {
        tour_title: parsed.data.tour_title,
        full_name: parsed.data.full_name,
      },
      channels: ["card", "mobile_money", "bank_transfer"],
    }),
  });

  const data = await response.json();
  if (!data.status) {
    return NextResponse.json({ error: data.message }, { status: 400 });
  }

  // Return the checkout URL — frontend redirects user there
  return NextResponse.json({ authorization_url: data.data.authorization_url });
}
