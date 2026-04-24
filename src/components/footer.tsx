// src/components/footer.tsx
import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  return (
    <footer className="mt-32 bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="hand mb-2 text-gold">with love from Accra,</p>
            <h3 className="font-display text-3xl">
              Come see Ghana with me.
            </h3>
            <p className="mt-4 max-w-sm text-cream/80">
              Personal, unhurried tours led by someone who calls this place
              home. Tell me when you're coming — I'll take care of the rest.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4 text-gold">Explore</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tours" className="hover:text-gold">All tours</Link></li>
              <li><Link href="/gallery" className="hover:text-gold">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-gold">About Asantewaa</Link></li>
              <li><Link href="/book" className="hover:text-gold">Book a tour</Link></li>
              <li><Link href="/#contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-gold">Stay in touch</p>
            <p className="mb-3 text-sm text-cream/80">
              Stories from the road, new tours, and occasional trip discounts.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 border-t border-cream/20 pt-6 text-xs text-cream/60 md:flex md:justify-between">
          <p>© {new Date().getFullYear()} Asantewaa's Tour. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Akwaaba 🇬🇭 — you are always welcome here.</p>
        </div>
      </div>
    </footer>
  );
}
