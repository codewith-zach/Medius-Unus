import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { getContent, hrefFor, isLang, defaultLang } from "@/lib/content";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
});

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const c = getContent(lang);
  return {
    metadataBase: new URL("https://mediusunus.com"),
    title: {
      default: `${c.site.name} — ${c.site.tagline}`,
      template: `%s | ${c.site.name}`,
    },
    description: c.home.hero.support,
    alternates: {
      languages: {
        en: hrefFor("en", ""),
        fr: hrefFor("fr", ""),
      },
    },
    openGraph: {
      title: c.site.name,
      description: c.site.tagline,
      url: hrefFor(lang, ""),
      siteName: c.site.name,
      locale: lang === "fr" ? "fr_FR" : "en_NG",
      type: "website",
      images: [
        { url: "/medius-unus-logo.svg", width: 511, height: 420, alt: "Medius Unus logo" },
      ],
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
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const c = getContent(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          {lang === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <SiteHeader lang={lang} content={c} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} content={c} />
        <BackToTop />
      </body>
    </html>
  );
}
