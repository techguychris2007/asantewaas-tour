// src/app/admin/page.tsx
import { createAdminClient } from "@/lib/supabase";
import { AdminLoginForm } from "./admin-login-form";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const runtime = "edge";

async function isAuthed(): Promise<boolean> {
  const c = (await cookies()).get("admin_auth")?.value;
  return Boolean(c && c === process.env.ADMIN_PASSWORD);
}

export default async function AdminPage() {
  if (!(await isAuthed())) {
    return (
      <main className="mx-auto max-w-sm px-6 py-32">
        <h1 className="font-display text-4xl">Admin</h1>
        <p className="mt-2 text-muted">Enter your password to view bookings.</p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </main>
    );
  }

  const admin = createAdminClient();

  const [{ data: bookings }, { data: subscribers }, { data: messages }] =
    await Promise.all([
      admin
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200),
      admin
        .from("subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false })
        .limit(200),
      admin
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

  const newBookings = (bookings ?? []).filter((b) => b.status === "new").length;
  const unhandledMessages = (messages ?? []).filter((m) => !m.handled).length;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Admin</h1>
        <form action="/api/admin/logout" method="post">
          <button className="text-sm text-muted hover:text-clay">Sign out</button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-sm border border-ink/10 bg-bone p-6">
          <p className="eyebrow">New bookings</p>
          <p className="mt-2 font-display text-4xl text-clay">{newBookings}</p>
        </div>
        <div className="rounded-sm border border-ink/10 bg-bone p-6">
          <p className="eyebrow">Unread messages</p>
          <p className="mt-2 font-display text-4xl text-clay">{unhandledMessages}</p>
        </div>
        <div className="rounded-sm border border-ink/10 bg-bone p-6">
          <p className="eyebrow">Subscribers</p>
          <p className="mt-2 font-display text-4xl text-forest">
            {subscribers?.length ?? 0}
          </p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Bookings</h2>
        <div className="mt-4 overflow-hidden rounded-sm border border-ink/10 bg-bone">
          <table className="w-full text-sm">
            <thead className="bg-ink/5 text-left text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Tour</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {(bookings ?? []).map((b) => (
                <tr key={b.id} className="align-top">
                  <td className="px-4 py-3 text-xs text-muted">
                    {new Date(b.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {b.full_name}
                    {b.country && (
                      <p className="text-xs text-muted">{b.country}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${b.email}`} className="block text-xs hover:text-clay">
                      {b.email}
                    </a>
                    {b.phone && <p className="text-xs text-muted">{b.phone}</p>}
                  </td>
                  <td className="px-4 py-3">{b.tour_title}</td>
                  <td className="px-4 py-3 text-xs">{b.preferred_date ?? "—"}</td>
                  <td className="px-4 py-3">{b.group_size}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-ink/10 px-2 py-0.5 text-xs">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!bookings || bookings.length === 0) && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted">
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Contact messages</h2>
        <div className="mt-4 space-y-3">
          {(messages ?? []).map((m) => (
            <div key={m.id} className="rounded-sm border border-ink/10 bg-bone p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{m.name}</p>
                  <a href={`mailto:${m.email}`} className="text-xs text-muted hover:text-clay">
                    {m.email}
                  </a>
                </div>
                <p className="text-xs text-muted">
                  {new Date(m.created_at).toLocaleString()}
                </p>
              </div>
              <p className="mt-3 text-sm">{m.message}</p>
            </div>
          ))}
          {(!messages || messages.length === 0) && (
            <p className="text-muted">No messages yet.</p>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Newsletter subscribers</h2>
        <div className="mt-4 rounded-sm border border-ink/10 bg-bone p-4">
          <p className="text-sm text-muted">
            {subscribers?.length ?? 0} subscriber(s). Export them via Supabase
            dashboard → Table Editor → subscribers → Export CSV.
          </p>
        </div>
      </section>
    </main>
  );
}
