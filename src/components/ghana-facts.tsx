// src/components/ghana-facts.tsx
// Exciting Ghana facts — builds destination excitement and trust

const facts = [
  {
    stat: "1957",
    label: "First sub-Saharan African country to gain independence",
    icon: "✊🏿",
  },
  {
    stat: "80+",
    label: "Languages spoken across the country",
    icon: "🗣️",
  },
  {
    stat: "#1",
    label: "Safest country in West Africa for tourists",
    icon: "🛡️",
  },
  {
    stat: "560km",
    label: "Of stunning Atlantic coastline",
    icon: "🌊",
  },
  {
    stat: "30°C",
    label: "Average year-round temperature",
    icon: "🌤️",
  },
  {
    stat: "Akwaaba",
    label: "Means welcome — and they mean it",
    icon: "🤝",
  },
];

export function GhanaFacts() {
  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="eyebrow text-gold">Why Ghana</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">
          A country that stays with you.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-cream/70">
          Ghana is not just a destination. For many visitors — especially those
          from the diaspora — it is a reckoning, a homecoming, and a joy.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.stat} className="flex gap-4">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <p className="font-display text-2xl text-gold">{f.stat}</p>
                <p className="mt-1 text-sm text-cream/70 leading-relaxed">{f.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
