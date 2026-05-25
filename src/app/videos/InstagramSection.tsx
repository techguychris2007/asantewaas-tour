"use client";

import Script from "next/script";
import { useEffect } from "react";

interface InstagramPost {
  id: string;
  caption: string;
}

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function processEmbeds() {
  if (typeof window !== "undefined" && window.instgrm) {
    window.instgrm.Embeds.process();
  }
}

export default function InstagramSection({ posts }: { posts: InstagramPost[] }) {
  useEffect(() => {
    processEmbeds();
  }, []);

  return (
    <section className="mt-24">
      <p className="eyebrow">Instagram</p>
      <h2 className="mt-3 font-display text-4xl md:text-5xl">
        On the <span className="italic text-clay">ground</span>.
      </h2>
      <p className="mt-4 max-w-xl text-muted">
        Moments from the road, shared in real time.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-2">
            <blockquote
              className="instagram-media !max-w-full !min-w-0 !w-full"
              data-instgrm-permalink={`https://www.instagram.com/p/${post.id}/`}
              data-instgrm-version="14"
              data-instgrm-captioned
              style={{
                background: "#FFF",
                border: "0",
                borderRadius: "3px",
                boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            />
          </div>
        ))}
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processEmbeds}
      />
    </section>
  );
}
