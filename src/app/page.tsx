// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { tours } from "@/lib/tours";
import { supabase } from "@/lib/supabase";
import { ContactForm } from "@/components/contact-form";
import { TrustBar } from "@/components/trust-bar";
import { GhanaFacts } from "@/components/ghana-facts";
import { BestTime } from "@/components/best-time";

export const revalidate = 60;

async function getTestimonials() {
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(6);
  return data ?? [];
}

export default async function HomePage() {
  const testimonials = await getTestimonials();

  return (
    <>
      {/* =================== HERO =================== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <div>
              <p className="eyebrow reveal reveal-1">Asantewaa · your guide in Ghana</p>
              <h1 className="reveal reveal-2 mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]">
                Come see <span className="italic text-clay">Ghana</span> with me.
              </h1>
              <p className="reveal reveal-3 mt-6 max-w-xl text-lg text-muted">
                I don't run tour buses. I run journeys. The kind where you taste
                kelewele from my favourite street seller, sit with your ancestors
                at Cape Coast, and leave Ghana with stories you'll tell for the
                rest of your life.
              </p>
              <div className="reveal reveal-4 mt-8 flex flex-wrap gap-3">
                <Link href="/tours" className="btn-clay">Explore tours</Link>
                <Link href="/book" className="btn-outline">Plan your trip</Link>
              </div>

              <div className="reveal reveal-4 mt-12 flex items-center gap-6 text-sm text-muted">
                <div>
                  <p className="font-display text-3xl text-ink">200+</p>
                  <p className="text-xs uppercase tracking-wider">guests hosted</p>
                </div>
                <div className="h-10 w-px bg-ink/20" />
                <div>
                  <p className="font-display text-3xl text-ink">15+</p>
                  <p className="text-xs uppercase tracking-wider">regions explored</p>
                </div>
                <div className="h-10 w-px bg-ink/20" />
                <div>
                  <p className="font-display text-3xl text-ink">5.0 ★</p>
                  <p className="text-xs uppercase tracking-wider">guest rating</p>
                </div>
              </div>
            </div>

            <div className="reveal reveal-2 relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src="/images/asantewaa-portrait.jpg"
                  alt="Asantewaa holding her 'Come See Ghana With Me' sign"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
              <p className="hand absolute -bottom-6 -left-4 max-w-[12rem] -rotate-3 bg-cream/90 px-3 py-1 text-forest">
                that's me — akwaaba!
              </p>
              <div className="absolute -top-4 -right-4 rotate-3 bg-clay px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cream">
                Meet your guide
              </div>
            </div>
          </div>
        </div>

        {/* Destination strip */}
        <div className="overflow-hidden border-y border-ink/10 bg-bone py-4">
          <div className="marquee flex gap-12 whitespace-nowrap font-display text-2xl italic text-muted">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12">
                <span>Cape Coast Castle</span><span>·</span>
                <span>Aburi Gardens</span><span>·</span>
                <span>Mount Afadja</span><span>·</span>
                <span>Wli Waterfalls</span><span>·</span>
                <span>Kumasi</span><span>·</span>
                <span>Elmina</span><span>·</span>
                <span>Makola Market</span><span>·</span>
                <span>Boti Falls</span><span>·</span>
                <span>Shai Hills</span><span>·</span>
                <span>Jamestown</span><span>·</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== TRUST BAR =================== */}
      {/* Shows guest countries — edit the list in src/components/trust-bar.tsx */}
      <TrustBar />

      {/* =================== ABOUT =================== */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/images/group-flag.jpg"
                alt="Asantewaa with a group of travelers holding the Ghana flag"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-40 w-40 overflow-hidden rounded-sm md:block">
              <Image
                src="/images/drumming-2.jpg"
                alt="Drumming experience"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          </div>

          <div>
            <p className="eyebrow">About Asantewaa</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              A Ghana you can <span className="italic text-clay">feel</span>.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                My name is Asantewaa, and I've been walking people through my
                country for over a decade. I got into this work because every
                time a friend visited, I'd spend the whole week in the car with
                them anyway. Eventually someone said,{" "}
                <em>"you should charge for this."</em>
              </p>
              <p>
                Most of my guests are from the diaspora — returning for the
                first time, often. I take that seriously. The pace is yours.
                The plan is yours. I just make sure everything works, and that
                you see the Ghana you came to see.
              </p>
              <p>
                I'll pick you up from the airport. I'll know the best place for
                jollof in whatever town we're in. I'll cry with you at Cape
                Coast if you need me to. That's the job.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-block border-b-2 border-clay pb-1 text-clay hover:text-forest hover:border-forest"
            >
              Read my full story →
            </Link>
          </div>
        </div>
      </section>

      {/* =================== TOURS =================== */}
      <section id="tours" className="bg-bone py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Tours</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Pick your pace.</h2>
            </div>
            <Link href="/tours" className="hidden text-sm text-muted hover:text-clay md:block">
              See all tours →
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {tours.map((tour) => (
              <Link key={tour.slug} href={"/tours/" + tour.slug} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                  <div className="absolute top-4 left-4 bg-cream/95 px-3 py-1 text-xs uppercase tracking-widest">
                    {tour.duration}
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl group-hover:text-clay">{tour.title}</h3>
                    <p className="mt-1 text-sm text-muted">{tour.tagline}</p>
                  </div>
                  <p className="whitespace-nowrap font-display text-sm text-forest">
                    from {tour.priceFrom.replace(" per person", "")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================== GHANA FACTS =================== */}
      {/* Dark green section with 6 Ghana facts — edit in src/components/ghana-facts.tsx */}
      <GhanaFacts />

      {/* =================== GALLERY =================== */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">The scrapbook</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Memories from past trips.</h2>
            </div>
            <Link href="/gallery" className="hidden text-sm text-muted hover:text-clay md:block">
              Full gallery →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "/images/group-rocks.jpg",
              "/images/waterfall.jpg",
              "/images/drumming-1.jpg",
              "/images/aburi-gardens.jpg",
              "/images/kwame-nkrumah-memorial.jpg",
              "/images/plane-wreck.jpg",
              "/images/fish-market.jpg",
              "/images/nkrumah-quote.jpg",
            ].map((src, i) => (
              <div
                key={src}
                className={"relative aspect-square overflow-hidden rounded-sm " + (i === 0 || i === 5 ? "md:aspect-[3/4]" : "")}
              >
                <Image
                  src={src}
                  alt="Tour moment"
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== BEST TIME TO VISIT =================== */}
      {/* 4-card season guide — edit in src/components/best-time.tsx */}
      <BestTime />

      {/* =================== TESTIMONIALS =================== */}
      <section className="bg-ink py-24 text-cream">
        <div className="mx-auto max-w-5xl px-6">
          <p className="eyebrow text-gold">What guests say</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            People don&apos;t forget this trip.
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.length > 0 ? (
              testimonials.map((t: any) => (
                <figure key={t.id} className="relative">
                  <div className="absolute -top-4 -left-2 font-display text-6xl text-gold/50">"</div>
                  <blockquote className="relative text-lg leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-6 border-t border-cream/20 pt-4">
                    <p className="font-medium">{t.author_name}</p>
                    {t.author_location && (
                      <p className="text-xs text-cream/60">{t.author_location}</p>
                    )}
                  </figcaption>
                </figure>
              ))
            ) : (
              // Fallback testimonials shown when Supabase has no approved entries yet
              [
                { quote: "Asantewaa made our Ghana trip feel like a homecoming. Every stop was meaningful and she knew each story by heart.", name: "Denise W.", location: "Atlanta, USA" },
                { quote: "From Cape Coast to Aburi, she handled everything. We just showed up and experienced it. 10/10 would travel with her again.", name: "The Johnson family", location: "Brooklyn, USA" },
                { quote: "She does not just show you Ghana — she introduces you to it. Warm, funny, incredibly knowledgeable.", name: "Marcia B.", location: "London, UK" },
              ].map((t) => (
                <figure key={t.name} className="relative">
                  <div className="absolute -top-4 -left-2 font-display text-6xl text-gold/50">"</div>
                  <blockquote className="relative text-lg leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-6 border-t border-cream/20 pt-4">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-cream/60">{t.location}</p>
                  </figcaption>
                </figure>
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/reviews" className="btn-outline border-cream/30 text-cream hover:bg-cream hover:text-ink">
              Read all reviews
            </Link>
          </div>
        </div>
      </section>

      {/* =================== MORE EXPERIENCES =================== */}
      <section className="py-24 bg-bone">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">More with Asantewaa</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Beyond the <span className="italic text-clay">tour</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Not every experience fits a package. Here's what else I offer — reach out and we'll build something just for you.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { icon: "🌅", title: "Day Tours", desc: "Short on time? A single-day tour is available with a fee. Tell me what you want to see — I'll make it happen." },
              { icon: "🎨", title: "Batik Workshop", desc: "A hands-on batik fabric dyeing session for groups. Create something beautiful to take home." },
              { icon: "🍳", title: "Cooking Class", desc: "Learn to cook Ghanaian dishes with me. Available for individuals. Jollof secrets included." },
              { icon: "🏡", title: "Village Experience", desc: "Step into everyday Ghanaian life. A grounding, joyful visit to a real community — not a performance." },
            ].map((item) => (
              <div key={item.title} className="rounded-sm bg-cream p-6 shadow-sm">
                <div className="mb-3 text-4xl">{item.icon}</div>
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-sm border border-clay/30 bg-clay/10 px-6 py-5">
            <p className="text-sm text-ink leading-relaxed">
              <span className="font-semibold">Note:</span> All itineraries are subject to change to suit your preferences — and prices will adjust accordingly. Whatever you want, I'll send you a personalised plan with the price. Just ask.
            </p>
          </div>
        </div>
      </section>

      {/* =================== CONTACT =================== */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <p className="eyebrow">Say hello</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">
                Got questions? <br />
                <span className="italic text-clay">Just ask.</span>
              </h2>
              <p className="mt-6 text-muted">
                Drop a note and I'll get back within 24 hours. If you're ready to
                book, skip the form and go straight to{" "}
                <Link href="/book" className="underline decoration-clay decoration-2 hover:text-clay">
                  planning your trip
                </Link>
                .
              </p>

              <div className="mt-10 space-y-4 text-sm">
                <div>
                  <p className="eyebrow">Based in</p>
                  <p className="mt-1">Accra, Ghana — I come to you at the airport.</p>
                </div>
                <div>
                  <p className="eyebrow">Best for</p>
                  <p className="mt-1">Diaspora travelers, couples, small groups (2–20), solo explorers.</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
