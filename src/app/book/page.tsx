import { BookingForm } from "@/components/BookingForm";
import { tours } from "@/lib/tours";

export default function BookPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-2 text-4xl font-bold">Plan your trip</h1>
      <p className="mb-8 text-stone-600">
        Tell me what you want, and I'll send a personalised plan within 24 hours.
      </p>
      <BookingForm tours={tours} />
    </main>
  );
}
