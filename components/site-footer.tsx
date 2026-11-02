import Link from "next/link";
import { LogoEmblem } from "@/components/logo";
import { hrefFor, type Content, type Lang } from "@/lib/content";

export function SiteFooter({ lang, content }: { lang: Lang; content: Content }) {
  return (
    <footer className="grain relative overflow-hidden bg-ink-gradient text-cream">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <LogoEmblem className="h-20 w-20" />
          <p className="mt-5 font-heading text-2xl font-semibold tracking-[0.06em] text-cream">
            Medius Unus
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gold">
            Nigeria Limited
          </p>
          <p className="mt-4 max-w-xs text-sm text-cream/70">{content.site.tagline}</p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {content.footer.navigate}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {content.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={hrefFor(lang, item.href)}
                  className="text-cream/80 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {content.footer.services}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {content.services.items.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={hrefFor(lang, `/services#${s.slug}`)}
                  className="text-cream/80 transition-colors hover:text-gold"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
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
                className="inline-block rounded border border-gold/60 px-4 py-2 text-gold transition-colors hover:bg-gold hover:text-navy"
              >
                {content.footer.enquiry}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-cream/60 sm:px-6 lg:px-8">
          © 2026 {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
