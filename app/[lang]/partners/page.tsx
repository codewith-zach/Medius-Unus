import { PageHero } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { getContent, isLang, defaultLang } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: getContent(lang).partnersPage.hero.title };
}

export default async function PartnersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const t = getContent(lang).partnersPage;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        description={t.hero.description}
      />

      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden className="hairline-grid-ink absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl space-y-20 px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-navy/15 pb-6">
              <h2 className="font-heading text-2xl font-medium tracking-[-0.01em] text-navy sm:text-[1.8rem]">
                {t.title}
              </h2>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-deepgold">
                {t.eyebrow}
              </p>
            </div>
          </Reveal>

          {t.categories.map((cat, i) => (
            <div key={cat.title}>
              <Reveal>
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
                  <p className="flex items-baseline gap-5">
                    <span className="font-heading text-sm font-light italic text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-xl font-medium tracking-[-0.01em] text-navy sm:text-2xl">
                      {cat.title}
                    </span>
                  </p>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {(cat.orgs.length === 1 ? t.orgCountOne : t.orgCountMany).replace(
                      "{n}",
                      String(cat.orgs.length)
                    )}
                  </span>
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.orgs.map((o, oi) => {
                  const [name, location] = o.split(" — ");
                  return (
                    <Reveal key={o} delay={Math.min(oi * 0.05, 0.2)}>
                      <div className="group flex h-full flex-col items-center justify-center border border-navy/15 bg-card px-6 py-8 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-[0_18px_40px_-18px_rgba(12,42,30,0.25)]">
                        <span
                          aria-hidden
                          className="mb-4 h-1.5 w-1.5 rotate-45 bg-gold/80 transition-transform duration-300 group-hover:scale-125"
                        />
                        <p className="font-heading text-lg font-medium leading-snug tracking-[0.02em] text-navy">
                          {name}
                        </p>
                        {location && (
                          <p className="mt-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                            {location}
                          </p>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              {i < t.categories.length - 1 && (
                <div aria-hidden className="mt-20 border-t border-navy/10" />
              )}
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        lang={lang}
        title={t.cta.title}
        titleAccent={t.cta.titleAccent}
        description={t.cta.description}
        primary={t.cta.primary}
        secondary={t.cta.secondary}
      />
    </>
  );
}
