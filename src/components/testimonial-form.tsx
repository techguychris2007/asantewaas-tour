// src/components/testimonial-form.tsx
"use client";
import { useState } from "react";

export function TestimonialForm() {
  const [state, setState] = useState<"idle"|"pending"|"success"|{error:string}>("idle");
  const [rating, setRating] = useState(5);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("pending");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        author_name: fd.get("author_name"),
        author_location: fd.get("author_location") || undefined,
        rating,
        quote: fd.get("quote"),
      }),
    });
    if (res.ok) {
      setState("success");
    } else {
      const d = await res.json().catch(() => ({}));
      setState({ error: d.error ?? "Something went wrong." });
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-sm bg-forest/10 p-8 text-center">
        <p className="hand text-3xl text-forest">Medaase! 🌿</p>
        <p className="mt-2 text-muted">Your review has been submitted. It will appear on the site after approval.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label">Your name</label>
          <input name="author_name" required className="input" />
        </div>
        <div>
          <label className="label">Where you're from</label>
          <input name="author_location" placeholder="e.g. Atlanta, USA" className="input" />
        </div>
      </div>
      <div>
        <label className="label">Your rating</label>
        <div className="flex gap-2 mt-2">
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={`text-2xl transition-transform hover:scale-110 ${n <= rating ? "text-gold" : "text-ink/20"}`}
            >★</button>
          ))}
        </div>
      </div>
      <div>
        <label className="label">Tell us about your experience</label>
        <textarea name="quote" required rows={4} placeholder="What made this trip special for you?" className="input resize-none" />
      </div>
      {typeof state === "object" && "error" in state && (
        <p className="text-sm text-clay">{state.error}</p>
      )}
      <button type="submit" disabled={state === "pending"} className="btn-clay w-full">
        {state === "pending" ? "Submitting…" : "Submit review"}
      </button>
      <p className="text-xs text-muted text-center">Reviews are reviewed before appearing on the site.</p>
    </form>
  );
}
