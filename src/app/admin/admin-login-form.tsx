// src/app/admin/admin-login-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password: fd.get("password") }),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) {
      router.refresh();
    } else {
      setErr("Wrong password.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="label">Password</label>
        <input name="password" type="password" required className="input" />
      </div>
      {err && <p className="text-sm text-clay">{err}</p>}
      <button type="submit" disabled={pending} className="btn-clay w-full">
        {pending ? "…" : "Sign in"}
      </button>
    </form>
  );
}
