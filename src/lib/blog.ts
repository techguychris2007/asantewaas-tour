// src/lib/blog.ts
// Add new blog posts here. 'content' supports basic HTML.

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-to-expect-cape-coast",
    title: "What to expect at Cape Coast Castle",
    excerpt: "Nothing can fully prepare you for Cape Coast — but knowing what to expect helps. Here's my honest guide for first-time visitors.",
    date: "April 2025",
    category: "Travel guide",
    coverImage: "/images/cape-coast-castle.jpg",
    content: `
      <p>Every guest I've taken to Cape Coast Castle has gone quiet in the same place — the Door of No Return. It doesn't matter where they're from, how old they are, or how much history they knew going in. Something happens there that words don't cover.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">Before you go</h2>
      <p>Eat a good breakfast. The tour is 1.5–2 hours on your feet, moving through dungeons that are dark, low-ceilinged, and warm. Wear comfortable closed-toe shoes. The floors are uneven stone.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">The Door of No Return</h2>
      <p>Take your time here. There is no script. Some guests stand quietly. Some cry. Some pray. All of it is right. Since 1998, there has been a tradition of Africans in the diaspora returning through the door — a symbolic homecoming. If this matters to you, tell me before the tour.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">After the castle</h2>
      <p>I always build debrief time into the itinerary. A lot happens at Cape Coast and it deserves more than being rushed into the next stop. You'll leave different. That's the point.</p>
    `,
  },
  {
    slug: "ghana-first-timer-guide",
    title: "Your first time in Ghana: 10 things I wish someone had told me",
    excerpt: "From the airport to the street food to the traffic — a practical and honest guide to arriving in Ghana for the first time.",
    date: "March 2025",
    category: "First-timer guide",
    coverImage: "/images/i-love-ghana.jpg",
    content: `
      <p>I've watched hundreds of first-time visitors arrive at Kotoka International Airport. The ones who have the best trips share one thing: they came with open hands, not a rigid plan.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">1. The traffic is real</h2>
      <p>Accra traffic is legendary. Build buffer time into everything. A 20-minute drive can take an hour.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">2. Try the street food immediately</h2>
      <p>Kelewele, waakye, jollof from a roadside pot — this is where the real food is. I'll guide you to the safe, delicious spots on day one.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">3. Greet people properly</h2>
      <p>Ghanaians greet. Walking past someone without a hello is considered rude. Simple phrases go a very long way.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">4. Slow down</h2>
      <p>Ghana runs on its own time. Fighting it will exhaust you. Leaning into it will be one of the best things you ever did.</p>
    `,
  },
  {
    slug: "wli-waterfalls-guide",
    title: "Wli Waterfalls: the hike, the swim, and what no one tells you",
    excerpt: "Wli is the highest waterfall in West Africa — and it's completely worth the hike. Here's everything you need to know.",
    date: "February 2025",
    category: "Destination guide",
    coverImage: "/images/waterfall.jpg",
    content: `
      <p>When guests ask me what surprised them most about Ghana, Wli Waterfalls comes up almost every time. People expect a nice view. They don't expect to stand under a curtain of water so powerful it shakes the ground.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">The hike</h2>
      <p>The lower falls are a 30–45 minute walk through a forest path. It's not steep but it's uneven — wear proper shoes. The path follows a river the whole way.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">The falls themselves</h2>
      <p>The lower falls drop into a pool where you can swim. The water is cool, clear, and absolutely magical. Bring a swimsuit and a towel.</p>
      <h2 style="font-size:1.5rem;margin-top:2rem;margin-bottom:0.5rem">Best time to visit</h2>
      <p>The falls are most powerful during and after the rainy season (May–October). I'll advise you based on when you're visiting.</p>
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
