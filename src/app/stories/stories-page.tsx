// src/app/stories/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Stories — Asantewaa's Tour",
  description: "Travel stories, destination guides and Ghana insights from Asantewaa — written for people who want to go deeper.",
};

const stories = [
  {
    slug: "cape-coast-castle-what-nobody-tells-you",
    category: "History",
    title: "Cape Coast Castle — what nobody tells you before you go",
    excerpt:
      "Every diaspora traveller puts Cape Coast on their list. Almost none of them are prepared for what it actually feels like to stand inside the Door of No Return. Here is what I tell my guests before we walk through those gates.",
    readTime: "6 min read",
    date: "April 2025",
  },
  {
    slug: "eating-accra-without-a-guidebook",
    category: "Food",
    title: "Eating Accra without a guidebook",
    excerpt:
      "The best food in Accra has no Instagram presence, no Google listing, and no English menu. It is cooked by someone's aunty on a street corner and it will ruin restaurant food for you forever. A guide to eating the way locals eat.",
    readTime: "5 min read",
    date: "March 2025",
  },
  {
    slug: "wli-waterfalls-the-complete-guide",
    category: "Nature",
    title: "Wli Waterfalls — the complete guide to Ghana's greatest hike",
    excerpt:
      "Ghana's highest waterfall sits at the end of a two-hour trail through forest so dense you forget what sky looks like. I have done this hike over forty times. Here is everything you need to know — the trail, the season, the swim at the end.",
    readTime: "8 min read",
    date: "February 2025",
  },
  {
    slug: "kumasi-beyond-the-market",
    category: "Culture",
    title: "Kumasi beyond the market — the Ashanti capital most visitors miss",
    excerpt:
      "Everyone comes to Kumasi for Kejetia market. Almost no one visits the kente weavers of Bonwire, the sword bearers of the Manhyia Palace, or the wood carvers along the Oforikrom road. The real Kumasi is waiting just beyond the obvious.",
    readTime: "7 min read",
    date: "January 2025",
  },
  {
    slug: "year-of-return-five-years-on",
    category: "Diaspora",
    title: "Year of Return, five years on — what changed and what didn't",
    excerpt:
      "In 2019 Ghana invited the African diaspora home. Hundreds of thousands came. I was guiding through all of it. Five years later I want to talk honestly about what that moment meant, what it delivered, and what we are still waiting for.",
    readTime: "9 min read",
    date: "December 2024",
  },
  {
    slug: "how-to-plan-your-first-ghana-trip",
    category: "Planning",
    title: "How to plan your first Ghana trip — the honest guide",
    excerpt:
      "Not the version that tells you everything is easy and the weather is perfect. The real version: when to come, how long to stay, what will shock you, what will move you, and why you should hire a guide who actually knows the country.",
    readTime: "10 min read",
    date: "November 2024",
  },
];

const categoryColors: Record<string, string> = {
  History: "text-clay",
  Food: "text-gold",
  Nature: "text-forest",
  Culture: "text-clay",
  Diaspora: "text-forest",
  Planning: "text-gold",
};

export default function StoriesPage() {
  const [featured, ...rest] = stories;

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <p className="eyebrow reveal reveal-1">Stories</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl reveal reveal-2">
        Ghana, in <span className="italic text-clay">words</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted reveal reveal-3">
        Travel writing, destination guides, and honest stories from a decade of
        leading tours across this country. Written for people who want to go deeper.
      </p>

      {/* Featured story */}
      {featured && (
        <div className="mt-14 reveal reveal-4 border-b border-ink/10 pb-14">
          <span className={"eyebrow " + (categoryColors[featured.category] ?? "text-clay")}>
            {featured.category}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl leading-tight max-w-3xl">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            {featured.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted">
            <span>{featured.date}</span>
            <span>·</span>
            <span>{featured.readTime}</span>
          </div>
          <Link
            href={"/stories/" + featured.slug}
            className="mt-6 inline-flex items-center gap-2 btn-clay"
          >
            Read the story
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      )}

      {/* Stories grid */}
      <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((story) => (
          <article key={story.slug} className="group">
            <span className={"eyebrow " + (categoryColors[story.category] ?? "text-clay")}>
              {story.category}
            </span>
            <h2 className="mt-3 font-display text-xl leading-snug group-hover:text-clay transition-colors">
              <Link href={"/stories/" + story.slug}>{story.title}</Link>
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
              {story.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted">
              <span>{story.date}</span>
              <span>·</span>
              <span>{story.readTime}</span>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 rounded-sm bg-clay/10 border border-clay/20 px-8 py-10 text-center">
        <p className="font-display text-2xl">These stories are better lived in person.</p>
        <p className="mt-2 text-muted">
          Reading about Ghana is one thing. Standing in it is another.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/tours" className="btn-clay">See my tours</Link>
          <Link href="/book" className="btn-outline">Plan your trip</Link>
        </div>
      </div>
    </main>
  );
}
