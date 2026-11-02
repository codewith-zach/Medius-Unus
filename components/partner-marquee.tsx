import Link from "next/link";
import { hrefFor, type Content, type Lang } from "@/lib/content";

/**
 * Band under the hero: a labelled marquee of affiliated organisation
 * names. Pure CSS animation; pauses on hover; wraps statically under
 * reduced motion.
 */
export function PartnerMarquee({ lang, content }: { lang: Lang; content: Content }) {
  const names = [
    ...new Set(
      content.partnersPage.categories.flatMap((c) => c.orgs.map((n) => n.replace(" — France", "")))
    ),
  ];

  return (
    <div className="relative border-y border-white/10 bg-ink">
      <p className="sr-only">{content.home.marqueeLabel}</p>
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 sm:px-8 lg:px-10">
        <Link
          href={hrefFor(lang, "/partners")}
          className="group hidden shrink-0 items-center gap-3 border-l-2 border-gold py-5 pl-4 text-[0.58rem] font-semibold uppercase leading-relaxed tracking-[0.3em] text-cream/50 transition-colors hover:text-gold md:flex"
        >
          {content.home.marqueeLabel}
          <span aria-hidden className="h-px w-6 bg-current transition-all duration-300 group-hover:w-9" />
        </Link>
        <div className="marquee grow py-4 md:py-5" aria-hidden>
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee-group">
                {names.map((name) => (
                  <span key={name} className="flex items-center gap-14">
                    <span className="whitespace-nowrap font-heading text-sm font-light tracking-[0.06em] text-cream/55 sm:text-base md:text-lg">
                      {name}
                    </span>
                    <span
                      className="inline-block h-1 w-1 rotate-45 bg-gold/70"
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
