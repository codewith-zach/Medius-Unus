import { PageHero } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { ContourLines } from "@/components/contour-lines";
import { getContent, isLang, defaultLang } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: getContent(lang).services.hero.title };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const t = getContent(lang).services;
  const cta = getContent(lang).cta;

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-[55%]"
          stroke="#0D2B1F"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="space-y-10">
            {t.items.map((s, i) => (
              <Reveal key={s.slug}>
                <article
                  id={s.slug}
                  className="group scroll-mt-28 rounded border border-sand bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_48px_rgba(13,43,31,0.10)] sm:p-10"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-0">
                    <div className="shrink-0 lg:w-1/3 lg:pr-10">
                      <span
                        aria-hidden
                        className="font-heading text-5xl font-semibold leading-none text-outline-gold sm:text-6xl"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-4 font-heading text-2xl font-semibold leading-snug text-balance text-navy sm:text-3xl">
                        {s.title}
                      </h2>
                      <div className="gold-rule mt-4 h-px w-14 transition-all duration-300 group-hover:w-20" aria-hidden />
                    </div>
                    <div className="border-t border-sand pt-6 lg:w-2/3 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                      <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                        {s.description}
                      </p>
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                            <span
                              aria-hidden
                              className="diamond mt-1.5 h-1.5 w-1.5 shrink-0"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        lang={lang}
        title={cta.title}
        titleAccent={cta.titleAccent}
        description={cta.description}
        primary={cta.primary}
        secondary={cta.secondary}
      />
    </>
  );
}
