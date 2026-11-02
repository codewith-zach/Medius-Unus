import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { ContourLines } from "@/components/contour-lines";
import { getContent, hrefFor, isLang, defaultLang } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: getContent(lang).sectorsPage.hero.title };
}

export default async function SectorsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const t = getContent(lang).sectorsPage;
  const cta = getContent(lang).cta;

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -left-28 -bottom-24 h-80 w-[55%]"
          stroke="#0D2B1F"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="space-y-8">
            {t.sectors.map((s, i) => (
              <Reveal key={s.slug}>
                <article
                  id={s.slug}
                  className="corner-marks group scroll-mt-28 rounded border border-sand bg-white p-6 transition-all duration-300 hover:border-gold/50 hover:shadow-[0_20px_48px_rgba(13,43,31,0.10)] sm:p-10"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden
                      className="font-heading text-4xl font-semibold leading-none text-outline-gold sm:text-5xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-heading text-2xl font-semibold text-balance text-navy sm:text-3xl">
                      {s.title}
                    </h2>
                  </div>
                  <div className="gold-rule mt-4 h-px w-14 transition-all duration-300 group-hover:w-20" aria-hidden />
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                    {s.description}
                  </p>
                  {s.slug === "oil-gas" && (
                    <div className="mt-10">
                      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-deepgold">
                        <span aria-hidden className="diamond h-1.5 w-1.5" />
                        {t.partnershipsEyebrow}
                      </p>
                      <div className="mt-6 grid gap-5 md:grid-cols-3">
                        {t.oilGasPartnerships.map((p, pi) => (
                          <Reveal key={p.name} delay={pi * 0.08}>
                            <div className="relative flex h-full flex-col rounded border border-sand bg-white p-6 pt-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_16px_40px_rgba(13,43,31,0.12)]">
                              <span
                                aria-hidden
                                className="pointer-events-none absolute right-5 top-4 select-none font-heading text-4xl font-semibold leading-none text-outline-navy opacity-40"
                              >
                                {String(pi + 1).padStart(2, "0")}
                              </span>
                              <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                {p.location}
                              </p>
                              <h3 className="relative mt-2 font-heading text-xl font-semibold text-navy">
                                {p.name}
                              </h3>
                              <div className="gold-rule relative mt-3 h-px w-10" aria-hidden />
                              <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                                {p.description}
                              </p>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  )}
                  {s.slug === "solid-minerals" && (
                    <p className="relative mt-5 flex items-start gap-3 rounded border border-gold/40 bg-sand/40 p-4 text-sm leading-relaxed text-foreground">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-deepgold" strokeWidth={1.25} />
                      {t.solidMineralsNote.text}
                      <Link
                        href={hrefFor(lang, "/contact?intent=investment")}
                        className="font-medium text-deepgold underline-offset-4 hover:underline"
                      >
                        {t.solidMineralsNote.link}
                      </Link>
                      .
                    </p>
                  )}
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
