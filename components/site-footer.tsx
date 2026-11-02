import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { LogoEmblem } from "@/components/logo";
import { hrefFor, type Content, type Lang } from "@/lib/content";

export function SiteFooter({ lang, content }: { lang: Lang; content: Content }) {
  return (
    <footer className="grain relative overflow-hidden bg-ink-gradient text-cream">
      <div aria-hidden className="hairline-grid absolute inset-0" />

      {/* Masthead */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-16">
          <div>
            <LogoEmblem className="h-14 w-14" />
            <p className="mt-6 font-heading text-[2.6rem] font-light leading-none tracking-[0.02em] text-cream sm:text-6xl">
              Medius <em className="font-light italic text-gold">Unus</em>
            </p>
            <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-gold">
              Nigeria Limited
            </p>
          </div>
          <p className="max-w-sm font-heading text-xl font-light italic leading-relaxed text-cream/70 lg:pb-2 lg:text-right lg:text-[1.35rem]">
            &ldquo;{content.site.tagline}&rdquo;
          </p>
        </div>
      </div>

      {/* Columns */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
        <nav aria-label="Footer navigation">
          <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold">
            {content.footer.navigate}
          </h2>
          <ul className="mt-6 space-y-3 text-sm">
            {content.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={hrefFor(lang, item.href)}
                  className="link-arrow text-cream/75 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold">
            {content.footer.services}
          </h2>
          <ul className="mt-6 space-y-3 text-sm">
            {content.services.items.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={hrefFor(lang, `/services#${s.slug}`)}
                  className="link-arrow text-cream/75 transition-colors hover:text-gold"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold">
            {content.footer.contact}
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-cream/75">
            <li>
              <a
                href={`tel:${content.site.phone.replace(/\s/g, "")}`}
                className="link-arrow transition-colors hover:text-gold"
              >
                {content.site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${content.site.email}`}
                className="link-arrow transition-colors hover:text-gold"
              >
                {content.site.email}
              </a>
            </li>
            <li className="pt-3">
              <Link
                href={hrefFor(lang, "/contact")}
                className="btn-line-light inline-flex px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em]"
              >
                {content.footer.enquiry}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-8 lg:items-end">
          <Link
            href="#main"
            className="group inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cream/60 transition-colors hover:text-gold"
          >
            <span className="flex h-10 w-10 items-center justify-center border border-white/15 transition-colors group-hover:border-gold/60">
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </span>
            Top
          </Link>
        </div>
      </div>

      {/* Legal line */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-[0.7rem] text-cream/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 {content.footer.copyright}</p>
          <p className="uppercase tracking-[0.24em] text-cream/35">{content.site.shortName} · EN / FR</p>
        </div>
      </div>
    </footer>
  );
}
