// Place this file at: app/sitemap.ts
// Next.js auto-generates /sitemap.xml from this.

import type { MetadataRoute } from "next";

const BASE_URL = "https://asantewaas-tour-645d.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = [
    "", "/tours", "/about", "/book", "/gallery",
    "/videos", "/blog", "/faq", "/reviews",
  ];

  const tourPages = [
    "/tours/heritage-cape-coast",
    "/tours/nature-mountains",
    "/tours/accra-immersion",
    "/tours/full-ghana-experience",
  ];

  return [...staticPages, ...tourPages].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/tours/") ? 0.8 : 0.6,
  }));
}
