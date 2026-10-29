import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, LineChart, Handshake, Landmark } from "lucide-react";
import { HeroArtwork } from "@/components/hero-artwork";
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
    role: "Leadership",
    bio: "A senior financial-services leader with extensive experience translating complex regulatory requirements into practical governance, controls and operational change — shaped primarily in the United Kingdom, with additional professional experience in Belgium and Luxembourg, alongside first-hand knowledge of Nigeria's institutional and economic environment.",
  },
  {
    name: "Nordine Djeddi",
    role: "Leadership",
    bio: "An IT delivery professional with a double bachelor's degree in IT and a 16-year record of supporting quality IT project implementation, including IT testing, transition into production and data-centre migration projects across several countries.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #C79D4B 0, transparent 55%), radial-gradient(circle at 85% 80%, #C79D4B 0, transparent 45%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-36 pb-20 sm:px-6 sm:pt-44 sm:pb-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Medius Unus Nigeria Limited
            </p>
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Connecting expertise, opportunity and execution.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
              Medius Unus Nigeria Limited supports organisations pursuing growth,
              transformation and cross-border opportunities. Combining strategic
              advisory, programme and project delivery, and an understanding of
              Nigeria&apos;s institutional and commercial environment, the firm helps
              bring the right stakeholders together and turn complex objectives into
              practical next steps.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-[#d8ac58]"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded border border-gold/60 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
              >
                Start a Conversation
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="hidden justify-center lg:flex">
            <HeroArtwork />
          </Reveal>
        </div>
      </section>

      {/* A practical partner */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
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
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded border border-sand bg-white p-6">
                  <item.icon
                    className="h-7 w-7 text-gold"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <h3 className="mt-4 font-heading text-xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-sand/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="Eight areas of focused expertise"
            description="Concise service areas, each written around client needs and possible deliverables — from strategic direction through to implementation support."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 0.06}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group flex h-full flex-col rounded border border-sand bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <span className="font-heading text-sm font-semibold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-deepgold">
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="Sectors"
            title="Where our knowledge is relevant"
            description="Relevant sector knowledge, leadership experience and confirmed mandates — presented without a project portfolio."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/sectors#${s.slug}`}
                  className="group block h-full rounded border border-sand bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="gold-rule w-10" aria-hidden />
                  <h3 className="mt-4 font-heading text-xl font-semibold text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership preview */}
      <section className="bg-sand/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="Experienced, delivery-oriented leadership"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {leadershipPreview.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded border border-sand bg-white p-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deepgold">
                    {p.role}
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-navy">
                    {p.name}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link
              href="/leadership"
              className="inline-flex items-center gap-2 text-sm font-medium text-deepgold hover:text-gold"
            >
              Read the full leadership profiles
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Partners preview */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="Partners & Affiliations"
            title="Relationships across sectors and borders"
            description="Organisation names grouped under their source categories. No individual relationship descriptions are provided."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerCategories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="h-full rounded border border-sand bg-white p-6">
                  <h3 className="font-heading text-base font-semibold text-navy">
                    {c.title}
                  </h3>
                  <div className="gold-rule mt-3 w-10" aria-hidden />
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
