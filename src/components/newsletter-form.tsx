// src/components/newsletter-form.tsx
"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "pending" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState({ kind: "pending" });
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: fd.get("email") }),
    });
    if (res.ok) {
      setState({ kind: "success" });
      (e.target as HTMLFormElement).reset();
    } else {
      const d = await res.json().catch(() => ({}));
      setState({ kind: "error", message: d.error ?? "Something went wrong" });
    }
  }

  if (state.kind === "success") {
    return (
      <p className="text-sm text-gold">
        Thank you! You're on the list. 🌿
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        name="email"
        type="email"
        required
        placeholder="you@email.com"
        className="flex-1 rounded-none border-b-2 border-cream/30 bg-transparent px-0 py-2 text-sm text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        disabled={state.kind === "pending"}
        className="text-sm font-medium text-gold hover:underline disabled:opacity-50"
      >
        {state.kind === "pending" ? "…" : "Subscribe →"}
      </button>
      {state.kind === "error" && (
        <p className="text-xs text-clay">{state.message}</p>
      )}
    </form>
  );
}
