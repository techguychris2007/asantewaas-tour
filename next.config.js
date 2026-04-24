/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    unoptimized: true, // Required for Cloudflare Pages
  },
};

module.exports = nextConfig;s