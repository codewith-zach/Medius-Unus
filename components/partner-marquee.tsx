import { partnerCategories } from "@/lib/site-content";

/**
 * Subtle infinite marquee of affiliated organisation names.
 * Pure CSS animation; pauses on hover; wraps statically under reduced motion.
 */
export function PartnerMarquee() {
  const names = partnerCategories.flatMap((c) => c.orgs);
  const unique = [...new Set(names.map((n) => n.replace(" — France", "")))];

  return (
    <div className="marquee border-y border-white/10 py-5" aria-label="Partners and affiliations">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="marquee-group"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {unique.map((name) => (
              <span key={name} className="flex items-center gap-14">
                <span className="whitespace-nowrap font-heading text-lg tracking-[0.08em] text-cream/60">
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
  );
}
