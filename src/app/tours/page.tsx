// src/app/tours/page.tsx
import Link from "next/link";
import Image from "next/image";
import { tours } from "@/lib/tours";

export const metadata = {
  title: "All Tours — Asantewaa's Tour",
  description: "Pick your pace. From two-day Accra tastings to ten-day transformations across Ghana.",
};

export default function ToursPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">All tours</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">
          Four ways to <span className="italic text-clay">meet Ghana</span>.
        </h1>
        <p className="mt-6 text-lg text-muted">
          Every tour can be customized — lengths, stops, pace. These are my
          most-requested itineraries. Pick one as a starting point and we'll
          shape it to your group.
        </p>
      </div>

      <div className="mt-16 space-y-20">
        {tours.map((tour, i) => (
          <article
            key={tour.slug}
            className={`grid gap-10 md:grid-cols-2 md:items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Link href={`/tours/${tour.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </Link>
            <div>
              <p className="eyebrow">{tour.duration} · {tour.groupSize}</p>
              <h2 className="mt-2 font-display text-4xl">
                <Link href={`/tours/${tour.slug}`} className="hover:text-clay">
                  {tour.title}
                </Link>
              </h2>
              <p className="mt-2 font-hand text-2xl text-forest">{tour.tagline}</p>
              <p className="mt-4 text-muted">{tour.description}</p>

              <ul className="mt-6 space-y-2 text-sm">
                {tour.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="text-gold">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between">
                <p className="font-display text-lg text-forest">
                  From {tour.priceFrom}
                </p>
                <Link
                  href={`/tours/${tour.slug}`}
                  className="border-b-2 border-clay pb-1 text-sm text-clay hover:text-forest hover:border-forest"
                >
                  Full details →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
