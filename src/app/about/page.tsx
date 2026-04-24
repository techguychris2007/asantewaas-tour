// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About — Asantewaa's Tour",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src="/images/asantewaa-portrait.jpg"
              alt="Asantewaa"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
          <p className="hand mt-4 text-center text-2xl text-forest">
            "come see Ghana with me"
          </p>
        </div>

        <div>
          <p className="eyebrow">About me</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.05]">
            I'm <span className="italic text-clay">Asantewaa</span>, and this is
            my country.
          </h1>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I was born and raised here. I've lived everywhere from Accra to
              Kumasi to the Volta Region, and I've been guiding visitors —
              formally and informally — for over a decade.
            </p>
            <p>
              My name, Asantewaa, belongs to Yaa Asantewaa — the Ashanti queen
              mother who led an uprising against the British Empire in 1900. I
              carry that name seriously. It reminds me every day that this is
              a place of strength, resistance, and beauty.
            </p>
            <p>
              I started <em>Asantewaa's Tour</em> because I kept meeting
              diaspora travellers who had come home for the first time and
              didn't know where to begin. I'd spend a weekend with them and
              they'd leave changed. Eventually I made it my whole thing.
            </p>
            <p>
              My guests become family. I still hear from people I guided four
              years ago. I'll remember your favourite drink, the food you
              don't eat, whether you need quiet time after Cape Coast. That's
              the kind of tour I run.
            </p>
          </div>

          <div className="mt-12 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
            <div>
              <p className="font-display text-3xl text-forest">10+</p>
              <p className="eyebrow mt-1">Years guiding</p>
            </div>
            <div>
              <p className="font-display text-3xl text-forest">200+</p>
              <p className="eyebrow mt-1">Guests hosted</p>
            </div>
            <div>
              <p className="font-display text-3xl text-forest">5 ★</p>
              <p className="eyebrow mt-1">Average rating</p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/tours" className="btn-clay">See my tours</Link>
            <Link href="/book" className="btn-outline">Plan a trip with me</Link>
          </div>
        </div>
      </div>

      {/* A few photos of her work */}
      <section className="mt-24">
        <p className="eyebrow">In my element</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            "/images/nkrumah-quote.jpg",
            "/images/group-flag.jpg",
            "/images/drumming-2.jpg",
          ].map((src) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
