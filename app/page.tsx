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
import { services, sectors, partnerCategories } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Medius Unus Nigeria Limited — Connecting expertise, opportunity and execution",
};

const leadershipPreview = [
  {
    name: "Helen Miner",
    initials: "HM",
    role: "Leadership",
    bio: "A senior financial-services leader with extensive experience translating complex regulatory requirements into practical governance, controls and operational change — shaped primarily in the United Kingdom, with additional professional experience in Belgium and Luxembourg, alongside first-hand knowledge of Nigeria's institutional and economic environment.",
  },
  {
    name: "Nordine Djeddi",
    initials: "ND",
    role: "Leadership",
    bio: "An IT delivery professional with a double bachelor's degree in IT and a 16-year record of supporting quality IT project implementation, including IT testing, transition into production and data-centre migration projects across several countries.",
  },
];

// All figures below are stated in the brief — no invented impact metrics.
const stats = [
  { value: 8, suffix: "", label: "Service areas" },
  { value: 5, suffix: "", label: "Sectors of focus" },
  { value: 16, suffix: "+", label: "Years of IT project delivery" },
  { value: 20, suffix: "+", label: "Years of UK board service" },
];

const pillars = [
  {
    icon: Compass,
    title: "Strategic advisory",
    text: "Helping organisations assess priorities and define direction with clarity.",
  },
  {
    icon: LineChart,
    title: "Transaction support",
    text: "Financial and commercial coordination for complex transactions.",
  },
  {
    icon: Landmark,
    title: "Institutional insight",
    text: "Understanding of Nigeria's institutional and regulatory environment.",
  },
  {
    icon: Handshake,
    title: "Delivery discipline",
    text: "Programme and project management that turns plans into action.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-navy">
        <div aria-hidden className="hairline-grid absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #C79D4B 0, transparent 55%), radial-gradient(circle at 85% 80%, #C79D4B 0, transparent 45%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pt-36 pb-24 sm:px-6 sm:pt-44 sm:pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                <span aria-hidden className="inline-block h-px w-10 bg-gold/70" />
                Medius Unus Nigeria Limited
              </p>
            </Reveal>
            <h1 className="mt-7 font-heading text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.015em] text-cream sm:text-6xl lg:text-[4.4rem]">
              <Reveal delay={0.08}>
                <span className="block">
                  Connecting <em className="text-gold">expertise,</em>
                </span>
              </Reveal>
              <Reveal delay={0.16}>
                <span className="block">opportunity</span>
              </Reveal>
              <Reveal delay={0.24}>
                <span className="block">
                  and <em className="text-gold">execution.</em>
                </span>
              </Reveal>
            </h1>
            <Reveal delay={0.34}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
                Medius Unus Nigeria Limited supports organisations pursuing growth,
                transformation and cross-border opportunities — combining strategic
                advisory, programme and project delivery, and an understanding of
                Nigeria&apos;s institutional and commercial environment to turn complex
                objectives into practical next steps.
              </p>
            </Reveal>
            <Reveal delay={0.44}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-2.5 rounded bg-gold px-7 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-[#d8ac58] hover:shadow-[0_8px_30px_rgba(199,157,75,0.35)] active:scale-[0.98]"
                >
                  Explore Our Services
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded border border-gold/60 px-7 py-3.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-navy active:scale-[0.98]"
                >
                  Start a Conversation
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="hidden justify-center lg:flex">
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

      {/* ── Partner marquee band ─────────────────────────────── */}
      <div className="bg-navy">
        <PartnerMarquee />
      </div>

      {/* ── A practical partner ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-[62%]"
          stroke="#14213D"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading
            eyebrow="Who we are"
            title="A practical partner for complex objectives"
          />
          <Reveal className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Medius Unus works at the intersection of strategy, business development
              and delivery. The firm brings together international financial-services
              experience, programme and project-management capability, public-sector
              leadership and commercial engagement in Nigeria. Its approach is grounded
              in understanding the context, aligning the right people and helping turn
              objectives into coordinated action.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group border-t border-navy/15 pt-6 transition-colors hover:border-gold">
                  <item.icon
                    className="h-7 w-7 text-gold transition-transform duration-300 group-hover:-translate-y-1"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <h3 className="mt-5 font-heading text-xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we do — editorial numbered list ─────────────── */}
      <section className="relative overflow-hidden bg-sand/40">
        <ContourLines
          className="pointer-events-none absolute -left-28 -bottom-28 h-80 w-[55%]"
          stroke="#14213D"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What we do"
              title="Eight areas of focused expertise"
              description="From strategic direction and transaction support through to implementation and capacity building."
            />
            <Reveal delay={0.1}>
              <Link
                href="/services"
                className="link-arrow group inline-flex items-center gap-2 text-sm font-medium text-deepgold"
              >
                All services in detail
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 border-t border-navy/10">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={Math.min(i * 0.04, 0.2)}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group relative z-0 grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-md border-b border-navy/10 py-6 transition-all duration-300 hover:-translate-y-1 hover:z-10 hover:scale-[1.01] hover:shadow-[0_14px_36px_rgba(20,33,61,0.14)] active:translate-y-0 active:scale-[0.995] active:shadow-none sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8 sm:py-7"
                >
                  <span className="font-heading text-2xl font-semibold text-gold/70 transition-colors group-hover:text-gold sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-heading text-lg font-semibold leading-snug text-navy sm:text-xl">
                      {s.title}
                    </span>
                    <span className="mt-1.5 hidden max-w-2xl text-sm leading-relaxed text-muted-foreground md:block">
                      {s.summary}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-deepgold/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-deepgold"
                    strokeWidth={1.5}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statement band ───────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-navy">
        <div aria-hidden className="hairline-grid absolute inset-0" />
        <ContourLines className="absolute right-[-10%] top-1/2 h-[170%] w-[75%] -translate-y-1/2" opacity={0.12} />
        <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <Reveal>
            <p className="font-heading text-2xl font-medium leading-[1.35] text-cream sm:text-3xl lg:text-[2.6rem] lg:leading-[1.3]">
              <span className="text-gold">“</span>Opportunities become more valuable
              when the right <em className="text-gold">expertise</em>, the right{" "}
              <em className="text-gold">relationships</em> and disciplined{" "}
              <em className="text-gold">implementation</em> are brought together.
              <span className="text-gold">”</span>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-cream/50">
              The belief that shapes our work
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Sectors — asymmetric grid with ghost numerals ────── */}
      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-16 h-72 w-[55%]"
          stroke="#14213D"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading
            eyebrow="Sectors"
            title="Where our knowledge is relevant"
            description="Leadership experience and confirmed mandates across energy, financial services, industry and the public sector."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Reveal
                key={s.slug}
                delay={(i % 3) * 0.07}
                className={i === 0 ? "lg:col-span-2" : ""}
              >
                <Link
                  href={`/sectors#${s.slug}`}
                  className="group relative block h-full overflow-hidden rounded border border-sand bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_16px_40px_rgba(20,33,61,0.10)] sm:p-8"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-7 top-0 translate-x-0 translate-y-[-0.32em] select-none font-heading text-[5.5rem] font-semibold leading-none text-sand transition-colors duration-300 group-hover:text-gold/25 sm:right-8"
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
                      Sector detail
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

      {/* ── Stats band (sourced figures only) ────────────────── */}
      <section className="border-y border-navy/10 bg-sand/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 px-4 py-14 sm:grid-cols-2 sm:gap-y-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div
                className={`flex items-baseline justify-between gap-4 border-navy/10 pb-5 sm:block sm:border-0 sm:pb-0 sm:text-center lg:text-left ${
                  i < stats.length - 1 ? "border-b sm:border-0" : ""
                } ${i > 0 ? "lg:border-l lg:border-navy/10 lg:pl-10" : ""}`}
              >
                <StatCounter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-heading text-4xl font-semibold text-deepgold sm:text-5xl lg:text-6xl"
                />
                <p className="text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-muted-foreground sm:mt-3 sm:text-xs">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Leadership preview ───────────────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="Experienced, delivery-oriented leadership"
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {leadershipPreview.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <div className="group flex h-full flex-col rounded border border-sand bg-white p-8 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_16px_40px_rgba(20,33,61,0.08)]">
                  <div className="flex items-center gap-5">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-sand font-heading text-xl font-semibold text-deepgold transition-transform duration-300 group-hover:scale-105"
                      aria-hidden
                    >
                      {p.initials}
                    </div>
                    <div>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-deepgold">
                        {p.role}
                      </span>
                      <h3 className="mt-1 font-heading text-2xl font-semibold text-navy">
                        {p.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link
              href="/leadership"
              className="link-arrow group inline-flex items-center gap-2 text-sm font-medium text-deepgold"
            >
              Read the full leadership profiles
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Partners & Affiliations preview ──────────────────── */}
      <section className="relative overflow-hidden bg-sand/40">
        <ContourLines
          className="pointer-events-none absolute -bottom-20 -right-24 h-64 w-[50%]"
          stroke="#14213D"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading
            eyebrow="Partners & Affiliations"
            title="Relationships across sectors and borders"
            description="Partner and affiliated organisations spanning technology, international business, local institutions and representation mandates."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerCategories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="h-full border-t border-navy/15 pt-6 transition-colors hover:border-gold">
                  <h3 className="font-heading text-base font-semibold text-navy">
                    {c.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {c.orgs.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
