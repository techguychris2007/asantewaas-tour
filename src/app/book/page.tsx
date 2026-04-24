// src/app/book/page.tsx
import { BookingForm } from "@/components/booking-form";
import { tours } from "@/lib/tours";

export const metadata = {
  title: "Book a tour — Asantewaa's Tour",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>;
}) {
  const { tour } = await searchParams;

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow">Start your journey</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">
          Tell me when <span className="italic text-clay">you're coming</span>.
        </h1>
        <p className="mt-6 text-lg text-muted">
          Fill this out and I'll get back to you within 24 hours with dates,
          pricing, and next steps. No payment required right now — this is just
          to start the conversation.
        </p>
      </div>

      <BookingForm tours={tours} initialTour={tour} />
    </main>
  );
}
