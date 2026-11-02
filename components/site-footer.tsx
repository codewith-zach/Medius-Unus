import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { LogoEmblem } from "@/components/logo";
import { hrefFor, type Content, type Lang } from "@/lib/content";

export function SiteFooter({ lang, content }: { lang: Lang; content: Content }) {
  const backToTop = lang === "fr" ? "Haut de page" : "Back to top";

  return (
    <footer className="grain relative overflow-hidden bg-ink-gradient text-cream">
      <div aria-hidden className="top-gild absolute inset-x-0 top-0" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <LogoEmblem className="h-20 w-20" priority={false} />
          <p className="mt-5 font-heading text-2xl font-semibold tracking-[0.06em] text-cream">
            Medius Unus
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gold">
            Nigeria Limited
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{content.site.tagline}</p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span aria-hidden className="diamond h-1.5 w-1.5 opacity-80" />
            {content.footer.navigate}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {content.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={hrefFor(lang, item.href)}
                  className="link-arrow text-cream/80 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span aria-hidden className="diamond h-1.5 w-1.5 opacity-80" />
            {content.footer.services}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {content.services.items.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={hrefFor(lang, `/services#${s.slug}`)}
                  className="link-arrow text-cream/80 transition-colors hover:text-gold"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span aria-hidden className="diamond h-1.5 w-1.5 opacity-80" />
            {content.footer.contact}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <a
                href={`tel:${content.site.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-gold"
              >
                {content.site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${content.site.email}`}
                className="transition-colors hover:text-gold"
              >
                {content.site.email}
              </a>
            </li>
            <li className="pt-2">
              <Link
                href={hrefFor(lang, "/contact")}
                className="inline-block rounded border border-gold/60 px-4 py-2 text-gold transition-all hover:bg-gold hover:text-navy"
              >
                {content.footer.enquiry}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Ghost wordmark cropped along the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none relative mx-auto -mb-[0.34em] w-full select-none overflow-hidden"
      >
        <p className="quote-glyph text-center font-heading text-[13.5vw] font-semibold leading-[0.8] tracking-[0.14em] text-outline-cream opacity-50">
          MEDIUS UNUS
        </p>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-cream/60 sm:px-6 lg:px-8">
          <p>© 2026 {content.footer.copyright}</p>
          <a
            href="#main"
            className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-gold/80 transition-colors hover:text-gold"
          >
            {backToTop}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/50 transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
