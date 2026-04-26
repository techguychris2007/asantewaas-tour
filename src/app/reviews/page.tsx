// src/app/reviews/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Reviews — Asantewaa's Tour",
  description: "Read what guests say about touring Ghana with Asantewaa — real stories from real travellers.",
};

const reviews = [
  {
    name: "Adaeze O.",
    country: "Nigeria / USA",
    tour: "Cape Coast & Elmina",
    rating: 5,
    date: "March 2025",
    text: "I came to Ghana for the Year of Return and Asantewaa made it the most meaningful trip of my life. Walking through Cape Coast Castle with her was emotional in a way I was not prepared for. She gave us context, she gave us space to feel, and she held the whole group together. I will never forget it.",
  },
  {
    name: "Marcus T.",
    country: "United Kingdom",
    tour: "Volta Region & Wli Falls",
    rating: 5,
    date: "January 2025",
    text: "I've travelled across West Africa but nothing compared to this. Asantewaa knows every corner of the Volta Region. The hike to Wli was hard but she prepared us perfectly — the right gear, the right pace, the right energy. Standing at the falls at the end was worth every step.",
  },
  {
    name: "Imani & Jerome W.",
    country: "United States",
    tour: "Custom 10-day tour",
    rating: 5,
    date: "December 2024",
    text: "We booked a custom tour for our honeymoon and Asantewaa went above and beyond. She remembered that I'm vegetarian, found us the most romantic spot in Aburi, and surprised us with a drumming ceremony on our last night. It was the best honeymoon we could have imagined.",
  },
  {
    name: "Dr. Yetunde A.",
    country: "Canada",
    tour: "Accra Deep Dive",
    rating: 5,
    date: "November 2024",
    text: "I visited Ghana three times before and always felt like a tourist. This time I felt like I belonged. Asantewaa took me to places no guidebook mentions — local chop bars, family compounds in Jamestown, artisans in Makola. She gave me my connection to this place.",
  },
  {
    name: "David K.",
    country: "Germany",
    tour: "Ashanti Cultural Tour",
    rating: 5,
    date: "October 2024",
    text: "As someone with no African heritage I was a little nervous about how I'd be received. Asantewaa made me feel completely welcome. The kente weaving workshop in Bonwire and the chief's palace in Kumasi were extraordinary. Her knowledge of Ashanti history is encyclopaedic.",
  },
  {
    name: "Fatima S.",
    country: "France",
    tour: "Cape Coast & Kakum",
    rating: 5,
    date: "August 2024",
    text: "The canopy walk at Kakum almost killed me — I'm afraid of heights! But Asantewaa coached me through it step by step and I did it. She turned my biggest fear into my biggest achievement of the year. That's the kind of guide she is.",
  },
  {
    name: "The Okonkwo Family",
    country: "USA",
    tour: "Family roots tour — 8 people",
    rating: 5,
    date: "July 2024",
    text: "We brought three generations on this trip — my mother is 74 and my youngest niece is 12. Asantewaa managed everyone perfectly. The children were engaged, my mother was moved to tears in a beautiful way, and the rest of us finally understood where we come from. Absolute gift of a human being.",
  },
  {
    name: "Kwesi B.",
    country: "Ghana / UK",
    tour: "Northern Ghana expedition",
    rating: 5,
    date: "June 2024",
    text: "I'm Ghanaian myself but had never been north of Tamale. Asantewaa showed me my own country. The mud mosques of Larabanga, the Mole game reserve at dawn, the smoked fish market at Yeji — she packed more into five days than I could have found in five weeks alone.",
  },
];

export default function ReviewsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <p className="eyebrow reveal reveal-1">Reviews</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl reveal reveal-2">
        What guests <span className="italic text-clay">say</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted reveal reveal-3">
        Every review below is from a real guest. No edits, no incentives — just
        honest words from people who came to Ghana and left changed.
      </p>

      {/* Stats strip */}
      <div className="mt-14 grid grid-cols-3 gap-6 border-y border-ink/10 py-10 reveal reveal-4">
        <div className="text-center">
          <p className="font-display text-4xl text-forest">5.0</p>
          <p className="eyebrow mt-1">Average rating</p>
        </div>
        <div className="text-center">
          <p className="font-display text-4xl text-forest">200+</p>
          <p className="eyebrow mt-1">Guests hosted</p>
        </div>
        <div className="text-center">
          <p className="font-display text-4xl text-forest">100%</p>
          <p className="eyebrow mt-1">Would return</p>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-sm border border-ink/10 bg-bone/40 px-7 py-8"
          >
            {/* Stars */}
            <div className="flex gap-1" aria-label="5 stars">
              {Array.from({ length: review.rating }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-gold" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote className="mt-4 text-base leading-relaxed text-ink/80">
              &ldquo;{review.text}&rdquo;
            </blockquote>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="font-display text-lg">{review.name}</p>
                <p className="text-sm text-muted">{review.country}</p>
              </div>
              <div className="text-right">
                <p className="eyebrow">{review.tour}</p>
                <p className="mt-0.5 text-xs text-muted">{review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 rounded-sm bg-forest/5 border border-forest/20 px-8 py-10 text-center">
        <p className="font-display text-2xl">Ready to write your own story?</p>
        <p className="mt-2 text-muted">
          Join the guests who came to Ghana and never looked at the world the same way again.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/tours" className="btn-clay">See my tours</Link>
          <Link href="/book" className="btn-outline">Book a trip</Link>
        </div>
      </div>
    </main>
  );
}
