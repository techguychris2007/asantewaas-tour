// src/components/best-time.tsx
// Practical info section — helps visitors plan and builds confidence to book

const seasons = [
  {
    months: "Nov — Mar",
    label: "Peak season",
    color: "bg-clay/10 border-clay/30",
    labelColor: "text-clay",
    description:
      "Dry, sunny, and perfect for outdoor tours. Cape Coast, waterfalls, and hikes are at their best. Book early — this is when most diaspora travellers come home.",
    icon: "☀️",
  },
  {
    months: "Apr — Jun",
    label: "Shoulder season",
    color: "bg-forest/10 border-forest/30",
    labelColor: "text-forest",
    description:
      "Light rains begin. The landscape turns vivid green. Fewer tourists, lower prices, and a quieter, more intimate Ghana. Waterfalls are more dramatic.",
    icon: "🌿",
  },
  {
    months: "Jul — Sep",
    label: "Rainy season",
    color: "bg-gold/10 border-gold/30",
    labelColor: "text-gold",
    description:
      "Heavy rains in the south but the north stays dry. Lowest prices, emptiest sites. Great for adventurous travellers who want Ghana all to themselves.",
    icon: "🌧️",
  },
  {
    months: "Oct",
    label: "Transition",
    color: "bg-bone border-ink/20",
    labelColor: "text-ink",
    description:
      "Rains taper off. A good shoulder option — the country is still green from the rains but the sun is returning. Quiet and affordable.",
    icon: "🍂",
  },
];

export function BestTime() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow">Plan your trip</p>
      <h2 className="mt-3 font-display text-4xl md:text-5xl">
        When to come to <span className="italic text-clay">Ghana</span>.
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        There is no bad time to visit — but there is a right time for you.
        Here is what each season actually feels like on the ground.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {seasons.map((s) => (
          <div
            key={s.months}
            className={"rounded-sm border p-6 " + s.color}
          >
            <span className="text-3xl">{s.icon}</span>
            <p className="mt-3 font-display text-lg">{s.months}</p>
            <p className={"mt-1 font-sans text-xs uppercase tracking-widest font-medium " + s.labelColor}>
              {s.label}
            </p>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        Not sure when works for you?{" "}
        <a href="/book" className="text-clay underline underline-offset-2 hover:no-underline">
          Tell Asantewaa your dates
        </a>{" "}
        and she will advise you personally.
      </p>
    </section>
  );
}
