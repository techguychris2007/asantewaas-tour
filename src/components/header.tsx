// src/components/header.tsx
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-gold">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 2L14.5 9L22 9.5L16.5 14L18 22L12 18L6 22L7.5 14L2 9.5L9.5 9L12 2Z" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold">Asantewaa's Tour</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted">
              Explore the golden legacy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/tours" className="hover:text-clay">Tours</Link>
          <Link href="/gallery" className="hover:text-clay">Gallery</Link>
          <Link href="/about" className="hover:text-clay">About</Link>
          <Link href="/#contact" className="hover:text-clay">Contact</Link>
          <Link href="/book" className="btn-clay text-xs">
            Book a tour
          </Link>
        </nav>

        {/* mobile: simple nav */}
        <Link href="/book" className="btn-clay text-xs md:hidden">
          Book
        </Link>
      </div>
    </header>
  );
}
