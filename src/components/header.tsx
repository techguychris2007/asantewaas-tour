// src/components/header.tsx
// MOBILE NAV: hamburger menu added — works on all screen sizes
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/tours", label: "Tours" },
  { href: "/videos", label: "Watch" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Stories" },
  { href: "/faq", label: "FAQ" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 overflow-hidden rounded-full">
            <Image
              src="/images/logo.jpg"
              alt="Asantewaa's Tour"
              width={40}
              height={40}
              className="object-cover"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold">Asantewaa&apos;s Tour</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted">
              Explore the golden legacy
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-clay transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/book" className="btn-clay text-xs">
            Book a tour
          </Link>
        </nav>

        {/* Mobile: Book + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/book" className="btn-clay text-xs">
            Book
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span className={"block h-0.5 w-5 bg-ink transition-all " + (open ? "translate-y-2 rotate-45" : "")} />
            <span className={"block h-0.5 w-5 bg-ink transition-all " + (open ? "opacity-0" : "")} />
            <span className={"block h-0.5 w-5 bg-ink transition-all " + (open ? "-translate-y-2 -rotate-45" : "")} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="border-t border-ink/10 bg-cream px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-base hover:text-clay transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
