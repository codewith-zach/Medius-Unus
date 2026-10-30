import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ContourLines } from "@/components/contour-lines";
import { CtaSection } from "@/components/cta-section";
import { values, howWeWork } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Medius Unus Nigeria Limited works at the intersection of strategy, business development and delivery — bringing together international financial-services experience, programme delivery and commercial engagement in Nigeria.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About Medius Unus"
        description="Medius Unus Nigeria Limited works at the intersection of strategy, business development and delivery."
      />

      {/* Overview */}
      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-[55%]"
          stroke="#14213D"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading eyebrow="Company overview" title="Strategy, business development and delivery" />
          <Reveal className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              The firm brings together experience across international financial
              services, programme and project management, public-sector leadership and
              commercial engagement in Nigeria.
            </p>
            <p>
              Its work is shaped by a practical belief: opportunities become more
              valuable when the right expertise, relationships and implementation
              discipline are brought together. Medius Unus seeks to help organisations
              assess possibilities, align stakeholders and progress initiatives with
              clarity and purpose.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-navy">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Mission</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-snug text-cream sm:text-3xl">
              To connect organisations, expertise and opportunities
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/80">
              To connect organisations, expertise and opportunities in ways that
              support sustainable business growth, institutional effectiveness and
              practical delivery.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Vision</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-snug text-cream sm:text-3xl">
              A trusted partner for cross-border value
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/80">
              To be a trusted partner for organisations seeking to build meaningful
              cross-border relationships, unlock opportunities and deliver lasting
              value in Nigeria and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading eyebrow="Values" title="How we conduct our work" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
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

      {/* How we work */}
      <section className="bg-sand/40">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading eyebrow="How we work" title="A structured, practical approach" />
          <ol className="mt-10 space-y-5">
            {howWeWork.map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <li className="flex items-start gap-4 rounded border border-sand bg-white p-5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 font-heading text-sm font-semibold text-deepgold">
                    {i + 1}
                  </span>
                  <span className="text-base leading-relaxed text-foreground">{step}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-8">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-deepgold" strokeWidth={1.25} />
              The scope of each engagement is defined according to the firm&apos;s
              authorisation, mandate and the relevant professional specialists.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
