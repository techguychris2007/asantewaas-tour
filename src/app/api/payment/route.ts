import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  full_name: z.string().min(2).max(120),
  amount_usd: z.number().positive(),
  tour_title: z.string().min(1),
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

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Payment not configured." },
      { status: 500 }
    );
  }

  const { email, full_name, amount_usd, tour_title } = parsed.data;

  // Paystack amount is in the smallest currency unit
  // USD → cents (e.g. $50 = 5000)
  const amount_cents = Math.round(amount_usd * 100);

  const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amount_cents,
      currency: "USD",
      metadata: {
        full_name,
        tour_title,
        custom_fields: [
          { display_name: "Name", variable_name: "full_name", value: full_name },
          { display_name: "Tour", variable_name: "tour_title", value: tour_title },
        ],
      },
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book/success`,
    }),
  });

  if (!paystackRes.ok) {
    const err = await paystackRes.json().catch(() => ({}));
    return NextResponse.json(
      { error: err.message ?? "Payment initialisation failed." },
      { status: 502 }
    );
  }

  const data = await paystackRes.json();
  const { authorization_url } = data.data;

  return NextResponse.json({ authorization_url });
}
