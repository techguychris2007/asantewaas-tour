// src/components/header.tsx
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 overflow-hidden rounded-full">
            <Image src="/images/logo.jpg" alt="Asantewaa's Tour" width={40} height={40} className="object-cover" />
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
