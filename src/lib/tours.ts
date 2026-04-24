// src/lib/tours.ts
// All tour offerings live here. Edit this file to change tour details.

export interface Tour {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  groupSize: string;
  priceFrom: string;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  description: string;
  itinerary: { day: string; activity: string }[];
  includes: string[];
}

export const tours: Tour[] = [
  {
    slug: "heritage-cape-coast",
    title: "The Heritage Journey",
    tagline: "Cape Coast Castle & the walk through history",
    duration: "3 days / 2 nights",
    groupSize: "2–15 people",
    priceFrom: "$450 per person",
    heroImage: "/images/cape-coast-castle.jpg",
    gallery: [
      "/images/cape-coast-castle.jpg",
      "/images/nkrumah-quote.jpg",
      "/images/kwame-nkrumah-memorial.jpg",
    ],
    highlights: [
      "Cape Coast Castle & the Door of No Return",
      "Elmina Castle and fishing town",
      "Kwame Nkrumah Memorial Park",
      "Private reflection time at the slave dungeons",
    ],
    description:
      "This is the tour most of my diaspora guests come for. It's heavy, it's holy, and it's handled with care. We walk the same stones our ancestors walked. I'll be right there with you — not rushing, not narrating over your feelings, just holding space.",
    itinerary: [
      { day: "Day 1", activity: "Arrive Accra. Independence Square & Nkrumah Memorial in the afternoon. Welcome dinner." },
      { day: "Day 2", activity: "Drive to Cape Coast. Guided castle tour, Door of No Return, group debrief, time alone." },
      { day: "Day 3", activity: "Elmina Castle in the morning, Kakum canopy walk on the way back, return to Accra." },
    ],
    includes: [
      "All transport (private AC vehicle)",
      "All castle/park entry fees",
      "Breakfasts and welcome dinner",
      "Asantewaa as your guide the entire time",
    ],
  },
  {
    slug: "nature-mountains",
    title: "The Green Ghana Tour",
    tagline: "Waterfalls, mountains, and palm-lined walks",
    duration: "4 days / 3 nights",
    groupSize: "4–12 people",
    priceFrom: "$520 per person",
    heroImage: "/images/waterfall.jpg",
    gallery: [
      "/images/waterfall.jpg",
      "/images/aburi-gardens.jpg",
      "/images/shai-hills.jpg",
      "/images/afadja-mountain.jpg",
      "/images/group-mountains.jpg",
    ],
    highlights: [
      "Aburi Botanical Gardens — the famous palm avenue",
      "Boti Falls & Umbrella Rock hike",
      "Mount Afadja (or Afadjato) — Ghana's tallest mountain",
      "Wli Waterfalls (the highest in West Africa)",
    ],
    description:
      "For folks who want to see that Ghana is lush, wild, and breathtaking. We'll hike, we'll swim under a waterfall, and we'll stand at the top of a mountain looking at three countries at once. Bring good shoes.",
    itinerary: [
      { day: "Day 1", activity: "Accra pickup. Afternoon at Aburi Gardens and craft village." },
      { day: "Day 2", activity: "Drive to Volta Region. Hike to Wli Waterfalls." },
      { day: "Day 3", activity: "Mount Afadja climb. Sunset from the summit." },
      { day: "Day 4", activity: "Shai Hills reserve (baboons and zebras), return to Accra." },
    ],
    includes: [
      "All transport",
      "Park fees and local hiking guides",
      "Breakfasts and lunches",
      "Accommodation in small eco-lodges",
    ],
  },
  {
    slug: "accra-immersion",
    title: "Accra in Full Colour",
    tagline: "Markets, music, drumming, and street food",
    duration: "2 days",
    groupSize: "1–10 people",
    priceFrom: "$180 per person",
    heroImage: "/images/drumming-1.jpg",
    gallery: [
      "/images/drumming-1.jpg",
      "/images/drumming-2.jpg",
      "/images/fish-market.jpg",
      "/images/coconut-stand.jpg",
      "/images/i-love-ghana.jpg",
    ],
    highlights: [
      "Makola Market — the heart of Accra commerce",
      "Hands-on Ghanaian drumming class",
      "Street food walk (try kelewele, waakye, jollof)",
      "Independence Square & Black Star Gate",
    ],
    description:
      "Short on time but want the real Accra? This is it. Two days of market smells, drum circles, fresh coconut water, and the best jollof you'll ever eat. You'll go home with new rhythms in your chest.",
    itinerary: [
      { day: "Day 1", activity: "Makola Market, Jamestown walk, street food crawl, Independence Square at sunset." },
      { day: "Day 2", activity: "Drumming lesson with a master drummer, Arts Centre, farewell fresh coconut." },
    ],
    includes: [
      "Transport around Accra",
      "Drumming class fees",
      "All food on the street food walk",
      "Local SIM card on arrival",
    ],
  },
  {
    slug: "full-ghana-experience",
    title: "The Full Ghana Experience",
    tagline: "Ten days, one country, every flavour",
    duration: "10 days / 9 nights",
    groupSize: "4–20 people",
    priceFrom: "$1,850 per person",
    heroImage: "/images/group-flag.jpg",
    gallery: [
      "/images/group-flag.jpg",
      "/images/group-rocks.jpg",
      "/images/plane-wreck.jpg",
      "/images/aburi-gardens.jpg",
      "/images/cape-coast-castle.jpg",
    ],
    highlights: [
      "Everything from the Heritage and Nature tours",
      "Kumasi & the Ashanti Kingdom (palace, markets, kente)",
      "Home-cooked dinner with a Ghanaian family",
      "Optional naming ceremony — receive your Ghanaian name",
    ],
    description:
      "My signature tour. Ten days isn't a vacation — it's a transformation. We'll cover Cape Coast, the Volta Region, Accra, and Kumasi. You'll leave with a full heart, a new name (if you want one), and a family in Ghana.",
    itinerary: [
      { day: "Days 1–2", activity: "Accra: markets, food, Independence Square, drumming." },
      { day: "Days 3–4", activity: "Cape Coast & Elmina: castles, Kakum, Door of No Return." },
      { day: "Days 5–6", activity: "Volta Region: Wli Falls, Mount Afadja, Boti Falls." },
      { day: "Days 7–8", activity: "Kumasi: Manhyia Palace, Kejetia Market, kente village." },
      { day: "Days 9–10", activity: "Aburi Gardens, optional naming ceremony, farewell dinner." },
    ],
    includes: [
      "All transport (private AC vehicle)",
      "All accommodation (mix of hotels and lodges)",
      "Most meals",
      "All tour fees, guide fees, park fees",
      "Asantewaa as your personal guide the full ten days",
    ],
  },
];

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}
