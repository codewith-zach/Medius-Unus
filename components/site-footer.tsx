import Link from "next/link";
import { LogoEmblem } from "@/components/logo";
import { nav, site, services } from "@/lib/site-content";

export function SiteFooter() {
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
          <p className="mt-4 max-w-xs text-sm text-cream/70">{site.tagline}</p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Navigate
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/80 hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Services
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="text-cream/80 hover:text-gold"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </li>
            <li className="pt-2">
              <Link
                href="/contact"
                className="inline-block rounded border border-gold/60 px-4 py-2 text-gold hover:bg-gold hover:text-navy"
              >
                Make an Enquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-cream/60 sm:px-6 lg:px-8">
          © 2026 Medius Unus Nigeria Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
