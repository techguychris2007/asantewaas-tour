"use client";

import { useState, useEffect } from "react";
import type { Tour } from "@/lib/tours";

const HCAPTCHA_SITE_KEY = "10000000-ffff-ffff-ffff-000000000001"; // replace before going live

declare global {
  interface Window {
    hcaptcha: any;
    onCaptchaSuccess: (token: string) => void;
    onCaptchaExpired: () => void;
  }
}

export function BookingForm({ tours, initialTour }: { tours: Tour[]; initialTour?: string }) {
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "pending" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });
  const [captchaToken, setCaptchaToken] = useState("");
  const [paymentMode, setPaymentMode] = useState(false);

  useEffect(() => {
    // Register global callbacks hCaptcha can call
    window.onCaptchaSuccess = (token: string) => setCaptchaToken(token);
    window.onCaptchaExpired = () => setCaptchaToken("");

    // Load hCaptcha script
    if (!document.getElementById("hcaptcha-script")) {
      const s = document.createElement("script");
      s.id = "hcaptcha-script";
      s.src = "https://js.hcaptcha.com/1/api.js";
      s.async = true;
      document.head.appendChild(s);
    }

    return () => {
      delete (window as any).onCaptchaSuccess;
      delete (window as any).onCaptchaExpired;
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!captchaToken) {
      setState({ kind: "error", message: "Please complete the CAPTCHA before submitting." });
      return;
    }
    setState({ kind: "pending" });
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: fd.get("full_name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") || undefined,
      country: fd.get("country") || undefined,
      tour_slug: fd.get("tour_slug") as string,
      preferred_date: fd.get("preferred_date") || undefined,
      group_size: Number(fd.get("group_size")),
      message: fd.get("message") || undefined,
      captcha_token: captchaToken,
    };

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      if (paymentMode) {
        const payRes = await fetch("/api/payment", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: payload.email,
            full_name: payload.full_name,
            amount_usd: 50,
            tour_title: tours.find(t => t.slug === payload.tour_slug)?.title ?? "Tour",
          }),
        });
        if (payRes.ok) {
          const { authorization_url } = await payRes.json();
          window.location.href = authorization_url;
          return;
        }
      }
      setState({ kind: "success" });
    } else {
      const d = await res.json().catch(() => ({}));
      setState({ kind: "error", message: d.error ?? "Something went wrong." });
      window.hcaptcha?.reset();
      setCaptchaToken("");
    }
  }

  if (state.kind === "success") {
    return (
      <div className="rounded-sm bg-forest p-12 text-center text-cream">
        <p className="font-hand text-4xl text-gold">Akwaaba! 🌿</p>
        <h2 className="mt-4 font-display text-3xl">Your booking request arrived.</h2>
        <p className="mt-4 text-cream/80">
          I'll be in touch within 24 hours with dates, a full quote, and next steps.
          Check your email (and spam folder, just in case).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="label">Which tour are you interested in?</label>
        <select name="tour_slug" required defaultValue={initialTour ?? ""} className="input appearance-none cursor-pointer">
          <option value="" disabled>Pick a tour…</option>
          {tours.map((t) => (
            <option key={t.slug} value={t.slug}>{t.title} ({t.duration})</option>
          ))}
          <option value="custom">I want something custom</option>
        </select>
      </div>

      <div>
        <label className="label">Full name</label>
        <input name="full_name" required className="input" />
      </div>
      <div>
        <label className="label">Email</label>
        <input name="email" type="email" required className="input" />
      </div>
      <div>
        <label className="label">Phone (with country code)</label>
        <input name="phone" placeholder="+1 555 123 4567" className="input" />
      </div>
      <div>
        <label className="label">Country you'll travel from</label>
        <input name="country" placeholder="USA" className="input" />
      </div>
      <div>
        <label className="label">Preferred start date</label>
        <input name="preferred_date" type="date" className="input" />
      </div>
      <div>
        <label className="label">Group size</label>
        <input name="group_size" type="number" min={1} max={50} defaultValue={2} required className="input" />
      </div>
      <div className="md:col-span-2">
        <label className="label">Anything else I should know?</label>
        <textarea name="message" rows={4} placeholder="Accessibility needs, dietary preferences, things you want to see…" className="input resize-none" />
      </div>

      {/* hCaptcha widget — uses named global callbacks */}
      <div className="md:col-span-2">
        <div
          className="h-captcha"
          data-sitekey={HCAPTCHA_SITE_KEY}
          data-callback="onCaptchaSuccess"
          data-expired-callback="onCaptchaExpired"
        />
      </div>

      {/* Payment toggle */}
      <div className="md:col-span-2 flex items-center gap-3 rounded-sm border border-ink/10 bg-bone p-4">
        <input
          type="checkbox"
          id="pay-deposit"
          checked={paymentMode}
          onChange={e => setPaymentMode(e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-forest"
        />
        <label htmlFor="pay-deposit" className="cursor-pointer text-sm">
          <span className="font-medium">Pay $50 deposit now</span>
          <span className="ml-2 text-muted">— secure your spot (card, MoMo, bank transfer)</span>
        </label>
      </div>

      {state.kind === "error" && (
        <p className="md:col-span-2 text-sm text-clay">{state.message}</p>
      )}

      <div className="md:col-span-2 mt-4 flex items-center justify-between gap-4">
        <p className="text-xs text-muted">By submitting, you agree to be contacted about your trip. No spam, ever.</p>
        <button type="submit" disabled={state.kind === "pending"} className="btn-clay">
          {state.kind === "pending" ? "Sending…" : paymentMode ? "Book & pay deposit →" : "Send booking request"}
        </button>
      </div>
    </form>
  );
}
