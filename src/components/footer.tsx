// src/components/footer.tsx
import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "./newsletter-form";

// ✏️ UPDATE YOUR WHATSAPP NUMBER (country code + number, no + or spaces)
const WHATSAPP_NUMBER = "233XXXXXXXXX"; // e.g. 233244123456
const WHATSAPP_MESSAGE = "Hello Asantewaa! I'm interested in a tour.";

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="mt-32 bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image src="/images/logo.jpg" alt="Asantewaa's Tour Logo" width={72} height={72} className="rounded-full object-cover" />
            </div>
            <p className="hand mb-2 text-gold">with love from Accra,</p>
            <h3 className="font-display text-2xl">Come see Ghana with me.</h3>
            <p className="mt-3 text-sm text-cream/80">Personal, unhurried tours led by someone who calls this place home.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          <div>
            <p className="eyebrow mb-4 text-gold">Tours</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tours" className="hover:text-gold">All tours</Link></li>
              <li><Link href="/tours/heritage-cape-coast" className="hover:text-gold">Heritage Journey</Link></li>
              <li><Link href="/tours/nature-mountains" className="hover:text-gold">Green Ghana Tour</Link></li>
              <li><Link href="/tours/accra-immersion" className="hover:text-gold">Accra in Full Colour</Link></li>
              <li><Link href="/tours/full-ghana-experience" className="hover:text-gold">Full Ghana Experience</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-gold">Explore</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/videos" className="hover:text-gold">Watch videos</Link></li>
              <li><Link href="/blog" className="hover:text-gold">Stories & guides</Link></li>
              <li><Link href="/gallery" className="hover:text-gold">Photo gallery</Link></li>
              <li><Link href="/reviews" className="hover:text-gold">Guest reviews</Link></li>
              <li><Link href="/faq" className="hover:text-gold">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-gold">About Asantewaa</Link></li>
              <li><Link href="/book" className="hover:text-gold">Book a tour</Link></li>
            </ul>
            <p className="eyebrow mt-6 mb-3 text-gold">Also available</p>
            <ul className="space-y-1 text-sm text-cream/80">
              <li>🌅 Day tours (fee applies)</li>
              <li>🎨 Batik workshops (groups)</li>
              <li>🍳 Cooking classes (individuals)</li>
              <li>🏡 Village experience</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-gold">Stay in touch</p>
            <p className="mb-3 text-sm text-cream/80">Stories from the road, new tours, and occasional trip discounts.</p>
            <NewsletterForm />
            <a href="https://www.youtube.com/@asantewaatourtv7125" target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-cream/80 hover:text-gold">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube — @asantewaatourtv7125
            </a>
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
