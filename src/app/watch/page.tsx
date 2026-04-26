// src/app/watch/page.tsx
export const metadata = {
  title: "Watch - Asantewaa's Tour",
  description: "Watch real footage from Asantewaa's tours across Ghana. Cape Coast, Wli Falls, Accra street food and more.",
};

const videos = [
  {
    id: "REPLACE_WITH_VIDEO_ID_1",
    title: "Come see Ghana with me",
    description: "A taste of what a tour with Asantewaa looks and feels like.",
  },
  {
    id: "REPLACE_WITH_VIDEO_ID_2",
    title: "Cape Coast Castle - a journey through history",
    description: "Walking the grounds of Cape Coast Castle with guests from the diaspora.",
  },
  {
    id: "REPLACE_WITH_VIDEO_ID_3",
    title: "Wli Waterfalls hike",
    description: "The trail, the falls, and the swim. Ghana's greatest natural wonder.",
  },
  {
    id: "REPLACE_WITH_VIDEO_ID_4",
    title: "Accra street food tour",
    description: "Kelewele, waakye, jollof. Eating our way through the capital.",
  },
  {
    id: "REPLACE_WITH_VIDEO_ID_5",
    title: "Mount Afadja summit",
    description: "Standing at the top of Ghana's highest mountain.",
  },
  {
    id: "REPLACE_WITH_VIDEO_ID_6",
    title: "Aburi Gardens",
    description: "The famous palm avenue and botanical gardens just outside Accra.",
  },
];

const ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

export default function WatchPage() {
  const [featured, ...rest] = videos;

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow reveal reveal-1">Watch</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl reveal reveal-2">
        Ghana on <span className="italic text-clay">screen</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted reveal reveal-3">
        Real footage from real tours. Watch before you book and see exactly what
        travelling with Asantewaa looks and feels like.
      </p>

      {featured && (
        <div className="mt-14 reveal reveal-4">
          <div
            className="relative w-full overflow-hidden rounded-sm"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src={"https://www.youtube-nocookie.com/embed/" + featured.id + "?rel=0&modestbranding=1"}
              title={featured.title}
              allow={ALLOW}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <h2 className="mt-4 font-display text-2xl">{featured.title}</h2>
          <p className="mt-1 text-muted">{featured.description}</p>
        </div>
      )}

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((video) => (
          <div key={video.id}>
            <div
              className="relative w-full overflow-hidden rounded-sm"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                src={"https://www.youtube-nocookie.com/embed/" + video.id + "?rel=0&modestbranding=1"}
                title={video.title}
                allow={ALLOW}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <h3 className="mt-3 font-display text-xl">{video.title}</h3>
            <p className="mt-1 text-sm text-muted">{video.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 rounded-sm bg-clay/10 border border-clay/20 px-8 py-10 text-center">
        <p className="font-display text-2xl">Want more Ghana?</p>
        <p className="mt-2 text-muted">
          Subscribe to Asantewaa&apos;s YouTube channel for new videos every week.
        </p>
        <a
          href="https://www.youtube.com/@asantewaatourtv7125"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 btn-clay"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Subscribe on YouTube
        </a>
      </div>
    </main>
  );
}
