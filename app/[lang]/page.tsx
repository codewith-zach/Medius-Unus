import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroFigure } from "@/components/hero-figure";
import { PartnerMarquee } from "@/components/partner-marquee";
import { StatCounter } from "@/components/stat-counter";
import { ContourLines } from "@/components/contour-lines";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { CtaSection } from "@/components/cta-section";
import { LeadershipCard } from "@/components/leadership-card";
import { getContent, hrefFor, isLang, defaultLang } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const c = getContent(lang);
  return { title: `${c.site.name} — ${c.site.tagline}` };
}

const sectorImages: Record<string, { src: string; alt: string }> = {
  "oil-gas": {
    src: "/images/sector-oil-gas.jpg",
    alt: "Industrial processing facility with elevated stacks at dusk",
  },
  "solid-minerals": {
    src: "/images/sector-minerals.jpg",
    alt: "Terraced open-pit mine cut into warm earth",
  },
  "banking-financial-services": {
    src: "/images/sector-finance.jpg",
    alt: "Financial-district towers rising above a city",
  },
  manufacturing: {
    src: "/images/sector-manufacturing.jpg",
    alt: "Precision robotic arm on a production line",
  },
  "public-sector": {
    src: "/images/sector-public.jpg",
    alt: "Classical civic building with rows of stone columns",
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const c = getContent(lang);
  const t = c.home;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-ink-gradient">
        <div aria-hidden className="hairline-grid absolute inset-0" />
        <ContourLines
          className="pointer-events-none absolute -right-24 top-0 h-[125%] w-[70%]"
          opacity={0.11}
        />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:px-10 lg:pb-28">
          <div className="max-w-2xl">
            <Reveal>
              <p className="flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
                <span aria-hidden className="h-10 w-px bg-gradient-to-r from-transparent to-gold" />
                {t.hero.eyebrow}
              </p>
            </Reveal>

            <h1 className="mt-8 font-heading text-[2.6rem] font-light leading-[1.06] tracking-[-0.02em] text-cream sm:text-6xl lg:text-[4.1rem]">
              {t.hero.lines.map((line, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <span
                    className={`block ${
                      i === 1 ? "pl-10 italic text-cream sm:pl-16 lg:pl-20" : ""
                    }`}
                  >
                    {"pre" in line ? (
                      <>
                        {line.pre}
                        <em className="italic text-gold">{line.accent}</em>
                      </>
                    ) : (
                      line.text
                    )}
                  </span>
                </Reveal>
              ))}
            </h1>

            <Reveal delay={0.44}>
              <p className="mt-7 max-w-lg text-[0.92rem] leading-[1.8] text-cream/70 sm:text-[0.95rem]">
                {t.hero.support}
              </p>
            </Reveal>

            <Reveal delay={0.56}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={hrefFor(lang, "/services")}
                  className="btn-gold group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
                <Link
                  href={hrefFor(lang, "/contact")}
                  className="btn-line-light inline-flex items-center justify-center gap-2 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
                >
                  {t.hero.ctaSecondary}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal variant="clip" delay={0.25} className="mb-6 lg:mb-0">
            <HeroFigure caption={c.site.tagline} />
          </Reveal>
        </div>

        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <div className="scroll-cue" />
        </div>
      </section>

      {/* ── Partner band ─────────────────────────────────────── */}
      <PartnerMarquee lang={lang} content={c} />

      {/* ── Who we are ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden className="hairline-grid-ink absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading
                chapter="01"
                eyebrow={t.whoWeAre.eyebrow}
                title={t.whoWeAre.title}
                titleAccent={t.whoWeAre.titleAccent}
              />
              <Reveal delay={0.1} className="mt-8">
                <p className="max-w-xl text-[0.95rem] leading-[1.85] text-muted-foreground sm:text-base">
                  {t.whoWeAre.body}
                </p>
              </Reveal>
            </div>
            <div className="grid gap-x-12 sm:grid-cols-2">
              {t.whoWeAre.pillars.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="group border-t border-navy/20 py-7 transition-colors hover:border-gold">
                    <p className="font-heading text-sm font-light italic text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-heading text-xl font-medium tracking-[-0.01em] text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.83rem] leading-[1.75] text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What we do — the service index ───────────────────── */}
      <section className="relative overflow-hidden bg-sand/50">
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              chapter="02"
              eyebrow={t.whatWeDo.eyebrow}
              title={t.whatWeDo.title}
              description={t.whatWeDo.description}
            />
            <Reveal delay={0.1} className="pb-2">
              <Link
                href={hrefFor(lang, "/services")}
                className="link-arrow group inline-flex items-center gap-2 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-deepgold"
              >
                {t.whatWeDo.viewAll}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 border-t border-navy/15">
              {c.services.items.map((s, i) => (
                <Link
                  key={s.slug}
                  href={hrefFor(lang, `/services#${s.slug}`)}
                  className="index-row group grid grid-cols-[2.6rem_1fr_auto] items-center gap-5 border-b border-navy/15 px-3 py-6 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8 sm:px-5 sm:py-7"
                >
                  <span className="font-heading text-xl font-light italic text-gold/70 transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-heading text-lg font-medium leading-snug tracking-[-0.01em] text-navy transition-colors duration-300 group-hover:text-cream sm:text-[1.35rem]">
                      {s.title}
                    </span>
                    <span className="mt-1.5 hidden max-w-2xl text-[0.83rem] leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-cream/65 md:block">
                      {s.summary}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-navy/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold"
                    strokeWidth={1.25}
                  />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Statement band ───────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-ink-gradient">
        <Image
          src="/images/statement-city.jpg"
          alt=""
          fill
          sizes="100vw"
          className="img-editorial pointer-events-none object-cover opacity-[0.16]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink"
        />
        <div className="relative mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36 lg:px-10">
          <Reveal>
            <span
              aria-hidden
              className="block font-heading text-[6rem] font-light leading-[0.4] text-gold/50 sm:text-[8rem]"
            >
              &ldquo;
            </span>
            <blockquote className="mt-10 font-heading text-[1.55rem] font-light leading-[1.4] tracking-[-0.01em] text-cream sm:text-3xl lg:text-[2.5rem]">
              {t.statement.segments.map((seg, i) =>
                "em" in seg ? (
                  <em key={i} className="italic text-gold">
                    {seg.em}
                  </em>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </blockquote>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 flex items-center gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-cream/50">
              <span aria-hidden className="inline-block h-px w-10 bg-gold/60" />
              {t.statement.attribution}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Sectors mosaic ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream">
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
          <SectionHeading
            chapter="03"
            eyebrow={t.sectors.eyebrow}
            title={t.sectors.title}
            titleAccent={t.sectors.titleAccent}
            description={t.sectors.description}
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {c.sectorsPage.sectors.map((s, i) => {
              const img = sectorImages[s.slug];
              return (
                <Reveal
                  key={s.slug}
                  delay={(i % 3) * 0.08}
                  className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
                >
                  <Link
                    href={hrefFor(lang, `/sectors#${s.slug}`)}
                    className="group relative block overflow-hidden border border-navy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className={`relative ${i < 2 ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
                      {img && (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes={i < 2 ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
                          className="img-editorial object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.045]"
                        />
                      )}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10 transition-opacity duration-500 group-hover:from-ink/95"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <p className="font-heading text-xs font-light italic tracking-wide text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-heading text-xl font-medium leading-tight tracking-[-0.01em] text-cream sm:text-[1.4rem]">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[0.8rem] leading-relaxed text-cream/75 transition-all duration-500 sm:max-h-0 sm:text-cream/0 sm:overflow-hidden sm:group-hover:max-h-24 sm:group-hover:text-cream/75 sm:group-focus-visible:max-h-24 sm:group-focus-visible:text-cream/75">
                        {s.summary}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold">
                        {t.sectors.detail}
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-ink-gradient">
        <div aria-hidden className="hairline-grid absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-8 px-5 py-16 sm:grid-cols-2 sm:gap-y-12 sm:px-8 lg:grid-cols-4 lg:px-10">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div
                className={`flex items-baseline justify-between gap-4 pb-6 sm:block sm:pb-0 lg:pl-10 ${
                  i < t.stats.length - 1 ? "border-b border-white/10 sm:border-0" : ""
                } ${i > 0 ? "lg:border-l lg:border-white/15" : "lg:pl-0"}`}
              >
                <StatCounter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-heading text-5xl font-light text-gold sm:text-6xl"
                />
                <p className="text-[0.62rem] font-semibold uppercase leading-[1.8] tracking-[0.2em] text-cream/60 sm:mt-4 sm:text-[0.68rem]">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-[55%]"
          stroke="#0C2A1E"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
          <SectionHeading
            chapter="04"
            eyebrow={t.leadership.eyebrow}
            title={t.leadership.title}
          />
          <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
            {c.leadership.map((l, i) => (
              <LeadershipCard
                key={l.name}
                leader={l}
                index={i}
                readLabel={t.leadership.readProfile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners & Affiliations preview ──────────────────── */}
      <section className="relative overflow-hidden bg-sand/50">
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
          <SectionHeading
            chapter="05"
            eyebrow={t.partners.eyebrow}
            title={t.partners.title}
            titleAccent={t.partners.titleAccent}
            description={t.partners.description}
          />
          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {c.partnersPage.categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.06}>
                <div className="text-navy/70">
                  <div aria-hidden className="rule-double w-full opacity-25" />
                  <p className="mt-5 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-deepgold">
                    {(cat.orgs.length === 1
                      ? c.partnersPage.orgCountOne
                      : c.partnersPage.orgCountMany
                    ).replace("{n}", String(cat.orgs.length))}
                  </p>
                  <h3 className="mt-3 font-heading text-lg font-medium leading-snug tracking-[-0.01em] text-navy">
                    {cat.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5 text-[0.83rem] leading-relaxed text-muted-foreground">
                    {cat.orgs.map((o) => (
                      <li key={o} className="flex items-baseline gap-3">
                        <span aria-hidden className="h-1 w-1 shrink-0 translate-y-[-1px] rotate-45 bg-gold/80" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        lang={lang}
        title={c.cta.title}
        titleAccent={c.cta.titleAccent}
        description={c.cta.description}
        primary={c.cta.primary}
        secondary={c.cta.secondary}
      />
    </>
  );
}
