import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { getContent, isLang, defaultLang } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: getContent(lang).about.hero.title };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const t = getContent(lang).about;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        description={t.hero.description}
        image="/images/about-institution.jpg"
        imageAlt="Modern institutional building with a sculpted concrete facade"
      />

      {/* Overview — editorial lead */}
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden className="hairline-grid-ink absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <SectionHeading
                chapter="01"
                eyebrow={t.overview.eyebrow}
                title={t.overview.title}
              />
            </div>
            <Reveal delay={0.1} className="space-y-6 lg:pt-12">
              {t.overview.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[0.95rem] leading-[1.85] text-muted-foreground sm:text-base"
                >
                  {para}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision — two panels with a gold divider */}
      <section className="grain relative overflow-hidden bg-ink-gradient">
        <div aria-hidden className="hairline-grid absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-0 lg:px-10">
          <Reveal className="lg:pr-16">
            <p className="flex items-center gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold">
              <span aria-hidden className="h-8 w-px bg-gradient-to-r from-transparent to-gold" />
              {t.mission.label}
            </p>
            <h2 className="mt-6 text-balance font-heading text-[1.6rem] font-light leading-[1.22] tracking-[-0.01em] text-cream sm:text-[2.1rem]">
              {t.mission.title}
            </h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-[1.85] text-cream/70 sm:text-base">
              {t.mission.body}
            </p>
          </Reveal>
          <Reveal delay={0.12} className="lg:border-l lg:border-gold/25 lg:pl-16">
            <p className="flex items-center gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold">
              <span aria-hidden className="h-8 w-px bg-gradient-to-r from-transparent to-gold" />
              {t.vision.label}
            </p>
            <h2 className="mt-6 text-balance font-heading text-[1.6rem] font-light leading-[1.22] tracking-[-0.01em] text-cream sm:text-[2.1rem]">
              {t.vision.title}
            </h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-[1.85] text-cream/70 sm:text-base">
              {t.vision.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values — numbered editorial list */}
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden className="hairline-grid-ink absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <SectionHeading chapter="02" eyebrow={t.values.eyebrow} title={t.values.title} />
          <div className="mt-14 grid gap-x-16 sm:grid-cols-2 lg:grid-cols-3">
            {t.values.items.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.07}>
                <div className="group border-t border-navy/20 py-8 transition-colors hover:border-gold">
                  <p className="font-heading text-sm font-light italic text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-medium tracking-[-0.01em] text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[0.85rem] leading-[1.75] text-muted-foreground">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work — the method */}
      <section className="relative overflow-hidden bg-sand/50">
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <SectionHeading chapter="03" eyebrow={t.howWeWork.eyebrow} title={t.howWeWork.title} />
          <ol className="mt-16 space-y-0 border-t border-navy/15">
            {t.howWeWork.steps.map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <li className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-5 border-b border-navy/15 py-7 transition-colors hover:border-gold sm:grid-cols-[5rem_1fr] sm:gap-8">
                  <span className="font-heading text-2xl font-light italic text-gold/80 transition-colors group-hover:text-gold sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] leading-[1.8] text-foreground/90 sm:text-base">
                    {step}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10">
            <p className="flex items-start gap-3.5 text-[0.83rem] leading-[1.75] text-muted-foreground">
              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-deepgold" strokeWidth={1.25} />
              {t.howWeWork.note}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection
        lang={lang}
        title={getContent(lang).cta.title}
        titleAccent={getContent(lang).cta.titleAccent}
        description={getContent(lang).cta.description}
        primary={getContent(lang).cta.primary}
        secondary={getContent(lang).cta.secondary}
      />
    </>
  );
}
