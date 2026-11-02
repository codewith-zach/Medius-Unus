import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Compass, LineChart, Handshake, Landmark } from "lucide-react";
import { HeroArtwork } from "@/components/hero-artwork";
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

const pillarIcons = {
  compass: Compass,
  chart: LineChart,
  landmark: Landmark,
  handshake: Handshake,
} as const;

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
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pt-36 pb-24 sm:px-6 sm:pt-44 sm:pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <p className="flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
                <span
                  aria-hidden
                  className="h-10 w-px bg-gradient-to-r from-transparent to-gold"
                />
                {t.hero.eyebrow}
              </p>
            </Reveal>
            <h1 className="mt-8 font-heading text-[2.6rem] font-light leading-[1.06] tracking-[-0.02em] text-balance text-cream sm:text-6xl lg:text-[4.1rem]">
              {t.hero.lines.map((line, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <span
                    className={`block ${i === 1 ? "pl-10 italic sm:pl-16 lg:pl-20" : ""}`}
                  >
                    {"pre" in line ? (
                      <>
                        {line.pre}
                        <em className="text-gold-gradient italic">{line.accent}</em>
                      </>
                    ) : (
                      line.text
                    )}
                  </span>
                </Reveal>
              ))}
            </h1>
            <Reveal delay={0.44}>
              <p className="mt-7 max-w-lg text-[0.92rem] leading-[1.8] text-pretty text-cream/70 sm:text-[0.95rem]">
                {t.hero.support}
              </p>
            </Reveal>
            <Reveal delay={0.56}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={hrefFor(lang, "/services")}
                  className="btn-sheen group inline-flex items-center justify-center gap-2.5 bg-gold px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy transition-all hover:bg-[#d8ac58] hover:shadow-[0_8px_30px_rgba(199,157,75,0.35)] active:translate-y-px"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
                <Link
                  href={hrefFor(lang, "/contact")}
                  className="inline-flex items-center justify-center gap-2 border border-gold/60 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold transition-all hover:bg-gold hover:text-navy active:translate-y-px"
                >
                  {t.hero.ctaSecondary}
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="hidden justify-center lg:flex">
            <HeroArtwork />
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

      {/* ── A practical partner ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-[62%]"
          stroke="#0C2A1E"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading
            eyebrow={t.whoWeAre.eyebrow}
            title={t.whoWeAre.title}
            titleAccent={t.whoWeAre.titleAccent}
          />
          <Reveal className="mt-6 max-w-3xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            <p className="dropcap">{t.whoWeAre.body}</p>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.whoWeAre.pillars.map((item, i) => {
              const Icon = pillarIcons[item.icon as keyof typeof pillarIcons];
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="group relative border-t border-navy/15 pt-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-0 top-5 select-none font-heading text-5xl font-semibold leading-none text-outline-navy opacity-50 transition-opacity duration-300 group-hover:opacity-90"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-white shadow-[inset_0_0_0_4px_#FFFFFF,0_0_0_4px_rgba(199,157,75,0.10)] transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_8px_24px_rgba(199,157,75,0.28)]">
                      <Icon
                        className="h-6 w-6 text-gold transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.25}
                        aria-hidden
                      />
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What we do — editorial numbered list ─────────────── */}
      <section className="relative overflow-hidden bg-sand/40">
        <ContourLines
          className="pointer-events-none absolute -left-28 -bottom-28 h-80 w-[55%]"
          stroke="#0C2A1E"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t.whatWeDo.eyebrow}
              title={t.whatWeDo.title}
              description={t.whatWeDo.description}
            />
            <Reveal delay={0.1}>
              <Link
                href={hrefFor(lang, "/services")}
                className="link-arrow group inline-flex items-center gap-2 text-sm font-medium text-deepgold"
              >
                {t.whatWeDo.viewAll}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 border-t border-navy/10">
            {c.services.items.map((s, i) => (
              <Reveal key={s.slug} delay={Math.min(i * 0.04, 0.2)}>
                <Link
                  href={hrefFor(lang, `/services#${s.slug}`)}
                  className="group relative z-0 grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-navy/10 py-6 pl-3 transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:origin-top before:scale-y-0 before:bg-gold before:transition-transform before:duration-300 hover:z-10 hover:-translate-y-0.5 hover:bg-white/70 hover:before:scale-y-100 hover:shadow-[0_14px_36px_rgba(12,42,30,0.14)] active:translate-y-0 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8 sm:py-7"
                >
                  <span
                    aria-hidden
                    className="font-heading text-2xl font-semibold leading-none text-outline-gold transition-all duration-300 group-hover:tracking-wider sm:text-3xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-heading text-lg font-semibold leading-snug text-navy sm:text-xl">
                      {s.title}
                    </span>
                    <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-muted-foreground md:block">
                      {s.summary}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-deepgold/50 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-deepgold"
                    strokeWidth={1.5}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statement band ───────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-ink-gradient">
        <div aria-hidden className="hairline-grid absolute inset-0" />
        <ContourLines className="absolute right-[-10%] top-1/2 h-[170%] w-[75%] -translate-y-1/2" opacity={0.12} />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          <span
            aria-hidden
            className="quote-glyph pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none font-heading text-[11rem] font-light text-gold/12 sm:text-[15rem]"
          >
            &ldquo;
          </span>
          <Reveal>
            <p className="relative font-heading text-[1.7rem] font-light leading-[1.35] text-balance text-cream sm:text-3xl lg:text-[2.4rem] lg:leading-[1.3]">
              {t.statement.segments.map((seg, i) =>
                "em" in seg ? (
                  <em key={i} className="text-gold-gradient">
                    {seg.em}
                  </em>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex items-center justify-center gap-4" aria-hidden>
              <span className="gold-rule h-px w-14" />
              <span className="diamond h-2 w-2" />
              <span className="gold-rule h-px w-14" style={{ transform: "scaleX(-1)" }} />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-cream/50">
              {t.statement.attribution}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Sectors ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-16 h-72 w-[55%]"
          stroke="#0C2A1E"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading
            eyebrow={t.sectors.eyebrow}
            title={t.sectors.title}
            titleAccent={t.sectors.titleAccent}
            description={t.sectors.description}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.sectorsPage.sectors.map((s, i) => (
              <Reveal
                key={s.slug}
                delay={(i % 3) * 0.07}
                className={i === 0 ? "lg:col-span-2" : ""}
              >
                <Link
                  href={hrefFor(lang, `/sectors#${s.slug}`)}
                  className="corner-marks group relative block h-full overflow-hidden rounded border border-sand bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_16px_40px_rgba(12,42,30,0.12)] sm:p-8"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-7 top-0 translate-y-[-0.32em] select-none font-heading text-[5.5rem] font-semibold leading-none text-sand transition-colors duration-300 group-hover:text-gold/25 sm:right-8"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <div className="gold-rule w-10 transition-all duration-300 group-hover:w-16" aria-hidden />
                    <h3 className="mt-5 font-heading text-2xl font-semibold text-navy">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {s.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-deepgold">
                      {t.sectors.detail}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-ink-gradient">
        <ContourLines
          className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[80%] -translate-x-1/2 -translate-y-1/2"
          opacity={0.07}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-8 px-4 py-16 sm:grid-cols-2 sm:gap-y-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div
                className={`flex items-baseline justify-between gap-4 border-white/10 pb-5 sm:block sm:border-0 sm:pb-0 sm:text-center lg:text-left ${
                  i < t.stats.length - 1 ? "border-b sm:border-0" : ""
                } ${i > 0 ? "lg:border-l lg:border-white/15 lg:pl-10" : ""}`}
              >
                <StatCounter
                  value={s.value}
                  suffix={s.suffix}
                  className="text-gold-gradient font-heading text-4xl font-semibold sm:text-5xl lg:text-6xl"
                />
                <p className="text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-cream/70 sm:mt-3 sm:text-xs">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Leadership preview ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-[55%]"
          stroke="#0C2A1E"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading eyebrow={t.leadership.eyebrow} title={t.leadership.title} />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
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
      <section className="relative overflow-hidden bg-sand/40">
        <ContourLines
          className="pointer-events-none absolute -bottom-20 -right-24 h-64 w-[50%]"
          stroke="#0C2A1E"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading
            eyebrow={t.partners.eyebrow}
            title={t.partners.title}
            titleAccent={t.partners.titleAccent}
            description={t.partners.description}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.partnersPage.categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.06}>
                <div className="group h-full border-t border-navy/15 pt-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold">
                  <span
                    aria-hidden
                    className="pointer-events-none float-right select-none font-heading text-4xl font-semibold leading-none text-outline-navy opacity-40"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-navy">
                    {cat.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {cat.orgs.map((o) => (
                      <li key={o} className="flex items-baseline gap-2.5">
                        <span aria-hidden className="diamond mt-1.5 h-1 w-1 shrink-0 opacity-70" />
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
