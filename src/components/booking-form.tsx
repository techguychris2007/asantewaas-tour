// src/components/booking-form.tsx
"use client";

import { useState } from "react";
import type { Tour } from "@/lib/tours";

export function BookingForm({
  tours,
  initialTour,
}: {
  tours: Tour[];
  initialTour?: string;
}) {
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "pending" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ kind: "pending" });
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: fd.get("full_name"),
      email: fd.get("email"),
      phone: fd.get("phone") || undefined,
      country: fd.get("country") || undefined,
      tour_slug: fd.get("tour_slug"),
      preferred_date: fd.get("preferred_date") || undefined,
      group_size: Number(fd.get("group_size")),
      message: fd.get("message") || undefined,
    };
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setState({ kind: "success" });
    } else {
      const d = await res.json().catch(() => ({}));
      setState({ kind: "error", message: d.error ?? "Something went wrong." });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="rounded-sm bg-forest p-12 text-center text-cream">
        <p className="font-hand text-4xl text-gold">Akwaaba! 🌿</p>
        <h2 className="mt-4 font-display text-3xl">
          Your booking request arrived.
        </h2>
        <p className="mt-4 text-cream/80">
          I've got it. I'll be in touch within 24 hours with dates, a full
          quote, and next steps. Check your email (and spam folder, just in case).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="label">Which tour are you interested in?</label>
        <select
          name="tour_slug"
          required
          defaultValue={initialTour ?? ""}
          className="input appearance-none cursor-pointer"
        >
          <option value="" disabled>Pick a tour…</option>
          {tours.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.title} ({t.duration})
            </option>
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
        <textarea
          name="message"
          rows={5}
          placeholder="Accessibility needs, dietary preferences, things you specifically want to see, dealbreakers…"
          className="input resize-none"
        />
      </div>

      {state.kind === "error" && (
        <p className="md:col-span-2 text-sm text-clay">{state.message}</p>
      )}

      <div className="md:col-span-2 mt-4 flex items-center justify-between gap-4">
        <p className="text-xs text-muted">
          By submitting, you agree to be contacted about your trip. No spam, ever.
        </p>
        <button
          type="submit"
          disabled={state.kind === "pending"}
          className="btn-clay"
        >
          {state.kind === "pending" ? "Sending…" : "Send booking request"}
        </button>
      </div>
    </form>
  );
}
