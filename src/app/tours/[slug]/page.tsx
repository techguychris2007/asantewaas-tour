// src/app/tours/[slug]/page.tsx
import { tours, getTour } from "@/lib/tours";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return {
    title: `${tour.title} — Asantewaa's Tour`,
    description: tour.tagline,
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 text-cream">
            <p className="eyebrow text-gold">{tour.duration} · {tour.groupSize}</p>
            <h1 className="mt-3 font-display text-5xl md:text-7xl">{tour.title}</h1>
            <p className="hand mt-3 text-3xl text-gold">{tour.tagline}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr]">
          {/* Main content */}
          <div>
            <h2 className="font-display text-3xl">About this tour</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{tour.description}</p>

            <h3 className="mt-12 font-display text-2xl">Highlights</h3>
            <ul className="mt-4 space-y-3">
              {tour.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="text-gold">✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-display text-2xl">Day by day</h3>
            <div className="mt-4 space-y-4">
              {tour.itinerary.map((item, i) => (
                <div key={i} className="flex gap-6 border-l-2 border-clay pl-6">
                  <div>
                    <p className="font-display text-lg text-clay">{item.day}</p>
                    <p className="mt-1 text-muted">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-12 font-display text-2xl">What's included</h3>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {tour.includes.map((inc) => (
                <li key={inc} className="flex gap-2">
                  <span className="text-forest">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky booking card */}
          <aside>
            <div className="sticky top-24 rounded-sm border border-ink/10 bg-bone p-6">
              <p className="eyebrow">From</p>
              <p className="mt-1 font-display text-4xl text-forest">
                {tour.priceFrom.replace(" per person", "")}
                <span className="text-sm text-muted"> / person</span>
              </p>
              <p className="mt-2 text-xs text-muted">
                Group discounts available for 6+ guests.
              </p>
              <Link
                href={`/book?tour=${tour.slug}`}
                className="btn-clay mt-6 w-full"
              >
                Book this tour
              </Link>
              <p className="mt-4 text-center text-xs text-muted">
                or{" "}
                <Link href="/#contact" className="underline">
                  ask me anything first
                </Link>
              </p>
            </div>
          </aside>
        </div>

        {/* Gallery strip */}
        <div className="mt-20">
          <p className="eyebrow">Scenes from this tour</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {tour.gallery.map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-sm">
                <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
