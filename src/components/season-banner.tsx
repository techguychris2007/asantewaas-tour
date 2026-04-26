// src/components/season-banner.tsx
// Urgency banner shown at top of site during peak season
// TO UPDATE: change the message and dates to match current availability
// TO HIDE: simply remove <SeasonBanner /> from layout.tsx

export function SeasonBanner() {
  return (
    <div className="bg-clay text-cream py-2.5 px-6 text-center text-sm">
      <span className="font-medium">
        🌍 Peak season bookings are filling fast —{" "}
      </span>
      <a
        href="/book"
        className="underline underline-offset-2 hover:no-underline font-medium"
      >
        secure your November–March dates now
      </a>
    </div>
  );
}
