import { CircleCheck } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { ContourLines } from "@/components/contour-lines";
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
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-[55%]"
          stroke="#0D2B1F"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading eyebrow={t.overview.eyebrow} title={t.overview.title} />
          <Reveal className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.overview.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-ink-gradient">
        <div aria-hidden className="hairline-grid absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t.mission.label}</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-snug text-cream sm:text-3xl">
              {t.mission.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/80">{t.mission.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t.vision.label}</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-snug text-cream sm:text-3xl">
              {t.vision.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/80">{t.vision.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-[55%]"
          stroke="#0D2B1F"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading eyebrow={t.values.eyebrow} title={t.values.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.values.items.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded border border-sand bg-white p-6">
                  <h3 className="font-heading text-xl font-semibold text-navy">{v.title}</h3>
                  <div className="gold-rule mt-3 w-10" aria-hidden />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sand/40">
        <ContourLines
          className="pointer-events-none absolute -left-28 -bottom-24 h-72 w-[45%]"
          stroke="#0D2B1F"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading eyebrow={t.howWeWork.eyebrow} title={t.howWeWork.title} />
          <ol className="relative mt-12 space-y-9 before:absolute before:bottom-6 before:left-[1.1875rem] before:top-2 before:w-px before:bg-gold/40 sm:before:left-[1.4375rem]">
            {t.howWeWork.steps.map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <li className="relative flex items-start gap-5 sm:gap-6">
                  <span
                    className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-heading text-base font-semibold sm:h-12 sm:w-12 ${
                      i === 0
                        ? "border-gold bg-gold text-navy"
                        : "border-gold/60 bg-cream text-deepgold"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-1.5 text-base leading-relaxed text-foreground sm:text-lg">
                    {step}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-8">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-deepgold" strokeWidth={1.25} />
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
