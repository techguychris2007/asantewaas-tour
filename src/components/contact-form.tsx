// src/components/contact-form.tsx
"use client";

import { useState } from "react";

export function ContactForm() {
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
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        message: fd.get("message"),
      }),
    });
    if (res.ok) {
      setState({ kind: "success" });
      (e.target as HTMLFormElement).reset();
    } else {
      const d = await res.json().catch(() => ({}));
      setState({ kind: "error", message: d.error ?? "Please try again." });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="rounded-sm bg-forest/10 p-8 text-center">
        <p className="hand text-3xl text-forest">Medaase! 🌿</p>
        <p className="mt-2 text-muted">
          Your message arrived. I'll reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="label">Your name</label>
        <input name="name" required className="input" />
      </div>
      <div>
        <label className="label">Email</label>
        <input name="email" type="email" required className="input" />
      </div>
      <div>
        <label className="label">What's on your mind?</label>
        <textarea name="message" required rows={4} className="input resize-none" />
      </div>
      {state.kind === "error" && (
        <p className="text-sm text-clay">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={state.kind === "pending"}
        className="btn-forest w-full"
      >
        {state.kind === "pending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
