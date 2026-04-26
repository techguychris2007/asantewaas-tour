// src/components/trust-bar.tsx
// Shows flags and countries of past guests — builds social proof
// TO UPDATE: edit the countries array to match real guest origins

const countries = [
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇯🇲", name: "Jamaica" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇳🇬", name: "Nigeria" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇧🇧", name: "Barbados" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇿🇦", name: "South Africa" },
  { flag: "🇹🇹", name: "Trinidad" },
];

export function TrustBar() {
  return (
    <section className="border-y border-ink/10 bg-bone/40 py-5">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 text-center font-sans text-xs uppercase tracking-[0.2em] text-muted">
          Guests have joined from
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {countries.map((c) => (
            <span key={c.name} className="flex items-center gap-1.5 text-sm text-ink/70">
              <span className="text-lg">{c.flag}</span>
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
