// src/app/gallery/page.tsx
import Image from "next/image";

export const metadata = {
  title: "Gallery — Asantewaa's Tour",
  description: "Scenes from past trips across Ghana.",
};

const photos = [
  { src: "/images/aburi-gardens.jpg", caption: "Palm avenue, Aburi Botanical Gardens" },
  { src: "/images/group-flag.jpg", caption: "Fresh arrivals, proud moment" },
  { src: "/images/waterfall.jpg", caption: "Under the waterfall" },
  { src: "/images/shai-hills.jpg", caption: "Climbing Shai Hills" },
  { src: "/images/cape-coast-castle.jpg", caption: "Cape Coast — the walk of remembrance" },
  { src: "/images/kwame-nkrumah-memorial.jpg", caption: "At the Nkrumah Memorial" },
  { src: "/images/drumming-1.jpg", caption: "Drum circle session" },
  { src: "/images/drumming-2.jpg", caption: "Finding the rhythm" },
  { src: "/images/group-mountains.jpg", caption: "Overlooking the Volta Region" },
  { src: "/images/afadja-mountain.jpg", caption: "Summit day — Mount Afadja" },
  { src: "/images/group-rocks.jpg", caption: "Climbing together" },
  { src: "/images/plane-wreck.jpg", caption: "The hidden plane wreck at Aburi" },
  { src: "/images/fish-market.jpg", caption: "Makola Market, smoked fish section" },
  { src: "/images/coconut-stand.jpg", caption: "Fresh coconut, street corner" },
  { src: "/images/nkrumah-quote.jpg", caption: "\"Africa was born in me.\" — Dr. Nkrumah" },
  { src: "/images/i-love-ghana.jpg", caption: "I ♥ Ghana, Independence Square" },
];

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Gallery</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">
          Moments from <span className="italic text-clay">the road</span>.
        </h1>
        <p className="mt-6 text-lg text-muted">
          Every photo here is a real trip. Real guests, real places. If you see
          something that calls you, that's where we'll go.
        </p>
      </div>

      <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <figure key={p.src} className="group mb-4 break-inside-avoid">
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src={p.src}
                alt={p.caption}
                width={800}
                height={1000}
                className="h-auto w-full transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <figcaption className="mt-2 font-hand text-lg text-forest">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
