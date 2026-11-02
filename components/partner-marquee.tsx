import type { Content, Lang } from "@/lib/content";

/**
 * Band under the hero. Wide screens get the infinite marquee of affiliated
 * organisation names; phones get a compact static band linking to the
 * Partners page (a scrolling marquee reads as clipped text at that width).
 * Pure CSS animation; pauses on hover; wraps statically under reduced motion.
 */
export function PartnerMarquee({ lang, content }: { lang: Lang; content: Content }) {
  const names = [
    ...new Set(
      content.partnersPage.categories.flatMap((c) => c.orgs.map((n) => n.replace(" — France", "")))
    ),
  ];

  return (
    <div className="border-y border-white/10 bg-navy">
      {/* Tablet/desktop: marquee */}
      <div className="marquee py-4 md:py-5" aria-label={content.home.marqueeLabel}>
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="marquee-group"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {names.map((name) => (
                <span key={name} className="flex items-center gap-14">
                  <span className="whitespace-nowrap font-heading text-sm tracking-[0.08em] text-cream/60 sm:text-base md:text-lg">
                    {name}
                  </span>
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/70"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
