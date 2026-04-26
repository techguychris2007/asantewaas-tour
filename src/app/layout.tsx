// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppBubble } from "@/components/whatsapp-bubble";

export const metadata: Metadata = {
  title: "Asantewaa's Tour — Come see Ghana with me",
  description:
    "Private, personal tours of Ghana led by Asantewaa. Cape Coast, Aburi Gardens, Wli Falls, Kumasi, and more. Explore and experience the golden legacy.",
  openGraph: {
    title: "Asantewaa's Tour",
    description: "Come see Ghana with me.",
    images: ["/images/group-flag.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain">
        <Header />
        {children}
        <Footer />
        <WhatsAppBubble />
      </body>
    </html>
  );
}
