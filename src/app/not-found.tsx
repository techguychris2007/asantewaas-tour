// src/app/not-found.tsx
// Custom 404 page — replace the default Next.js 404
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl md:text-6xl">
        Lost in <span className="italic text-clay">Ghana</span>?
      </h1>
      <p className="mt-6 text-lg text-muted max-w-md">
        Even Asantewaa takes a wrong turn sometimes. This page does not exist —
        but the rest of the site is full of good things.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-clay">
          Back to home
        </Link>
        <Link href="/tours" className="btn-outline">
          See the tours
        </Link>
        <Link href="/book" className="btn-outline">
          Book a trip
        </Link>
      </div>
      <p className="mt-16 font-hand text-2xl text-forest">Akwaaba 🇬🇭</p>
    </main>
  );
}
