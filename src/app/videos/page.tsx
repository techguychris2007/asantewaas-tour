import InstagramSection from "./InstagramSection";

export const metadata = {
  title: "Watch - Asantewaa's Tour",
  description: "Watch real footage from Asantewaa's tours across Ghana.",
};

const ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

const youtubeShorts = [
  { id: "obC7BcX-3fI", title: "Come see Ghana with me" },
  { id: "Hf5tne1gfUs", title: "Tour highlights" },
  { id: "Jd2Sw1exUE0", title: "Ghana moments" },
  { id: "OKdeYx_8tHg", title: "On the road" },
  { id: "0mIfSTq3KEY", title: "Real Ghana" },
  { id: "wM1k7YU6KsI", title: "Travel with Asantewaa" },
];

const instagramPosts = [
  // Original posts
  { id: "C-_LBInyu7n", caption: "Tour memory" },
  { id: "C4tRn2mttj0", caption: "Ghana vibes" },
  { id: "C0Wyw43N3_W", caption: "On the road" },
  { id: "C003TlYtbKd", caption: "Ghana moments" },
  { id: "CzGwFAoN3ie", caption: "Tour life" },
  { id: "CwfBALwNAAT", caption: "Ghana beauty" },
  { id: "CwkwXIBKZQq", caption: "Real footage" },
  // New posts
  { id: "CujEli2gtR_", caption: "Tour memory" },
  { id: "CvN0DxJtibe", caption: "Ghana vibes" },
  { id: "C1wdlqjtEAo", caption: "On the road" },
  { id: "C19XYXstrSK", caption: "Ghana moments" },
  { id: "C7TtMmbNQU_", caption: "Tour life" },
  { id: "C8aOEq2tIfg", caption: "Ghana beauty" },
  { id: "C8aPI1ot-Yp", caption: "Real footage" },
  { id: "C8fa6tyNMid", caption: "Tour memory" },
  { id: "C9Mtz5rNV3p", caption: "Ghana vibes" },
  { id: "C9bzh6OtcA_", caption: "On the road" },
  { id: "C_iGR-8N9mh", caption: "Ghana moments" },
  { id: "C_GOvdJiu6e", caption: "Tour life" },
  { id: "C_oVyswtHW9", caption: "Ghana beauty" },
  { id: "DAaod58tuhe", caption: "Real footage" },
  { id: "DC8jIm3tdK3", caption: "Tour memory" },
  { id: "DJkTLKYtwWn", caption: "Ghana vibes" },
  { id: "DM55DSKMzQu", caption: "On the road" },
  { id: "DNL_U7bsjMe", caption: "Ghana moments" },
];

const [featuredShort, ...restShorts] = youtubeShorts;

export default function WatchPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <p className="eyebrow">Watch</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">
        Ghana on <span className="italic text-clay">screen</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Real footage from real tours. Watch before you book.
      </p>

      {/* YouTube Shorts — Featured */}
      {featuredShort && (
        <div className="mt-14">
          <p className="eyebrow mb-4">YouTube Shorts</p>
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <div
                className="relative w-full overflow-hidden rounded-sm"
                style={{ paddingTop: "177.78%" }}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${featuredShort.id}?rel=0`}
                  title={featuredShort.title}
                  allow={ALLOW}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <h2 className="mt-3 font-display text-xl">{featuredShort.title}</h2>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Shorts — Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {restShorts.map((short) => (
          <div key={short.id}>
            <div
              className="relative w-full overflow-hidden rounded-sm"
              style={{ paddingTop: "177.78%" }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${short.id}?rel=0`}
                title={short.title}
                allow={ALLOW}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <h3 className="mt-3 font-display text-lg">{short.title}</h3>
          </div>
        ))}
      </div>

      {/* Instagram Section (client component) */}
      <InstagramSection posts={instagramPosts} />

      {/* Subscribe CTA */}
      <div className="mt-20 rounded-sm bg-clay/10 border border-clay/20 px-8 py-10 text-center">
        <p className="font-display text-2xl">Want more Ghana?</p>
        <p className="mt-2 text-muted">
          Subscribe to Asantewaa&apos;s YouTube channel and follow on Instagram.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://www.youtube.com/@asantewaatourtv7125"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-clay"
          >
            Subscribe on YouTube
          </a>
          <a
            href="https://www.instagram.com/yaansiahasantewaa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-clay"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </main>
  );
}
