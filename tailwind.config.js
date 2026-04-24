/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        hand: ['"Caveat"', "cursive"],
      },
      colors: {
        cream: "#f5f0e6",
        bone: "#ebe3d3",
        clay: "#b0462a",          // terracotta red
        forest: "#1f4a2e",         // deep Ghana green
        gold: "#d4a24c",           // kente gold
        ink: "#1a1612",            // warm near-black
        muted: "#6b5d4a",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
