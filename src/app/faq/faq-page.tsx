// src/app/faq/page.tsx
import Link from "next/link";

export const metadata = {
  title: "FAQ — Asantewaa's Tour",
  description: "Everything you need to know before booking a tour of Ghana with Asantewaa — from visas to packing to what to expect.",
};

const faqs = [
  {
    category: "Booking & Payment",
    questions: [
      {
        q: "How do I book a tour?",
        a: "Fill in the booking form on the Book page with your details, preferred tour, dates and group size. Asantewaa will respond within 48 hours to confirm availability and discuss your itinerary. A deposit secures your dates.",
      },
      {
        q: "How far in advance should I book?",
        a: "For private tours, at least 4–6 weeks in advance is recommended — especially for peak season (November to March). For custom multi-day itineraries, 8–12 weeks is ideal so there is enough time to plan accommodation, transport and special experiences.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Bank transfer, mobile money (MTN MoMo, Vodafone Cash), and PayPal. Payment terms are discussed and confirmed when your booking is accepted.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellations more than 14 days before the tour date receive a full refund of the deposit. Within 14 days, the deposit is non-refundable but can be transferred to a future booking. We understand that travel plans change — please contact us as early as possible.",
      },
    ],
  },
  {
    category: "The Tours",
    questions: [
      {
        q: "What is included in the tour price?",
        a: "All transport during the tour, entry fees to attractions, a local guide (Asantewaa or one of her trusted team), and where applicable, meals. Flights, accommodation and travel insurance are not included unless stated in your specific itinerary.",
      },
      {
        q: "Can you build a custom itinerary for me?",
        a: "Absolutely — custom tours are a speciality. Whether you have specific ancestral sites to visit, a family reunion to plan, or simply want a pace and style that's yours, Asantewaa will design an itinerary around you. Use the booking form and select 'Custom tour'.",
      },
      {
        q: "How large are the tour groups?",
        a: "Private tours are for you and your party only — no strangers. The maximum group size for a private tour is 12 people. This is a deliberate choice: smaller groups get a better experience, more flexibility, and more personal attention.",
      },
      {
        q: "Do you offer solo traveller tours?",
        a: "Yes. Solo travellers are very welcome. Some solo guests prefer a fully private experience; others are happy to be matched with a small group of other solo travellers. Let Asantewaa know your preference when you book.",
      },
    ],
  },
  {
    category: "Visiting Ghana",
    questions: [
      {
        q: "Do I need a visa to enter Ghana?",
        a: "Most nationalities require a visa. Citizens of ECOWAS countries (Nigeria, Senegal, Côte d'Ivoire, etc.) do not need one. Most visitors can apply for an e-Visa online before travel at evisa.gov.gh. Always check the current requirements for your specific passport before booking flights.",
      },
      {
        q: "What is the best time of year to visit?",
        a: "November to March is the dry season and the most popular time to visit — cooler temperatures, clear skies, and ideal conditions for outdoor activities. April to October brings the rains, which make the waterfalls and landscapes more dramatic, with fewer tourists and lower prices. There is no truly bad time to visit Ghana.",
      },
      {
        q: "Is Ghana safe for tourists?",
        a: "Ghana is one of the most politically stable and welcoming countries in West Africa. Accra, Cape Coast, Kumasi and the main tourist areas are very safe. As with any destination, basic awareness — not leaving valuables unattended, using reputable transport — goes a long way. Asantewaa will brief you on all practical safety considerations before and during your tour.",
      },
      {
        q: "What vaccinations do I need?",
        a: "Yellow fever vaccination is required for entry — you will need to show your certificate at the border. Hepatitis A, typhoid and malaria prophylaxis are strongly recommended. Consult a travel health clinic at least 4–6 weeks before your trip for personalised advice.",
      },
    ],
  },
  {
    category: "Practical Matters",
    questions: [
      {
        q: "What currency is used in Ghana?",
        a: "The Ghanaian Cedi (GHS). US Dollars and Euros are widely accepted in hotels and larger establishments, but having local currency is useful for markets, street food and tips. ATMs are widely available in Accra, Cape Coast and Kumasi.",
      },
      {
        q: "What should I pack?",
        a: "Light, breathable clothing (linen and cotton work well in the heat), comfortable walking shoes, a hat and sunscreen, a light rain jacket if visiting in the wet season, and an adapter for Type G plugs (the same as the UK). Asantewaa will send a full packing list tailored to your specific itinerary.",
      },
      {
        q: "Will I have mobile data and internet access?",
        a: "Yes. Ghana has good mobile coverage across most of the country. Buying a local SIM on arrival (MTN or Vodafone) is easy and inexpensive. Most hotels and many restaurants in cities have WiFi.",
      },
      {
        q: "I have dietary restrictions. Can you accommodate me?",
        a: "Yes. Ghanaian cuisine is naturally very accommodating — many dishes are plant-based, and fresh fruit and vegetables are abundant. Let Asantewaa know your dietary needs when you book and she will plan meals accordingly.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="eyebrow reveal reveal-1">FAQ</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl reveal reveal-2">
        Your questions, <span className="italic text-clay">answered</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted reveal reveal-3">
        Everything you need to know before you book. If your question
        isn&apos;t here, use the booking form and Asantewaa will answer personally.
      </p>

      <div className="mt-16 space-y-16">
        {faqs.map((section) => (
          <section key={section.category}>
            <p className="eyebrow border-b border-ink/10 pb-4">{section.category}</p>
            <dl className="mt-8 space-y-8">
              {section.questions.map((item) => (
                <div key={item.q}>
                  <dt className="font-display text-xl">{item.q}</dt>
                  <dd className="mt-3 text-base text-muted leading-relaxed">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 rounded-sm bg-forest/5 border border-forest/20 px-8 py-10 text-center">
        <p className="font-display text-2xl">Still have a question?</p>
        <p className="mt-2 text-muted">
          Asantewaa reads and responds to every booking enquiry personally.
        </p>
        <Link href="/book" className="mt-6 inline-flex btn-clay">
          Send her a message
        </Link>
      </div>
    </main>
  );
}
