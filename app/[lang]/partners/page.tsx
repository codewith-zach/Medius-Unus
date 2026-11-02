import { Fragment } from "react";
import { PageHero, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { ContourLines } from "@/components/contour-lines";
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
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-[55%]"
          stroke="#0C2A1E"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          <div className="mt-14 border-t border-navy/10">
            {t.categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="group relative grid gap-4 border-b border-navy/10 py-8 pl-3 transition-colors duration-300 hover:bg-white/70 sm:grid-cols-[4rem_1fr_auto] sm:gap-8 sm:py-10">
                  <span
                    aria-hidden
                    className="font-heading text-2xl font-semibold leading-none text-outline-gold transition-all duration-300 group-hover:tracking-wider sm:text-3xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-navy sm:text-2xl">
                      {c.title}
                    </h2>
                    <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2.5">
                      {c.orgs.map((o, oi) => (
                        <Fragment key={o}>
                          {oi > 0 && (
                            <li
                              aria-hidden
                              className="h-1 w-1 rotate-45 bg-gold/70"
                            />
                          )}
                          <li className="text-sm font-medium leading-relaxed text-navy/75 sm:text-[0.95rem]">
                            {o}
                          </li>
                        </Fragment>
                      ))}
                    </ul>
                  </div>
                  <span className="hidden self-start rounded-full border border-navy/15 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-hover:border-gold/50 group-hover:text-deepgold sm:block">
                    {(c.orgs.length === 1 ? t.orgCountOne : t.orgCountMany).replace("{n}", String(c.orgs.length))}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
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
