import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mediusunus.com"),
  title: {
    default: "Medius Unus Nigeria Limited — Connecting expertise, opportunity and execution",
    template: "%s | Medius Unus Nigeria Limited",
  },
  description:
    "Medius Unus Nigeria Limited supports organisations pursuing growth, transformation and cross-border opportunities — combining strategic advisory, programme delivery and an understanding of Nigeria's institutional and commercial environment.",
  openGraph: {
    title: "Medius Unus Nigeria Limited",
    description:
      "Connecting expertise, opportunity and execution. Strategic advisory and business facilitation in Nigeria and beyond.",
    url: "https://mediusunus.com",
    siteName: "Medius Unus Nigeria Limited",
    locale: "en_NG",
    type: "website",
    images: [{ url: "/medius-unus-logo.svg", width: 511, height: 420, alt: "Medius Unus logo" }],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
