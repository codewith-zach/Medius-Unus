import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/section";
import { ContourLines } from "@/components/contour-lines";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eight service areas spanning strategic advisory, corporate finance, transactions, programme delivery, process improvement, market entry, regulatory implementation and capacity building.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What Medius Unus does"
        description="Eight clear service areas, from strategic direction and transaction support through to implementation and capacity building. The scope of each engagement is defined according to the firm's authorisation, mandate and the relevant professional specialists."
      />

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-[55%]"
          stroke="#0D2B1F"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-10">
            {services.map((s, i) => (
              <Reveal key={s.slug}>
                <article
                  id={s.slug}
                  className="scroll-mt-28 rounded border border-sand bg-white p-6 sm:p-10"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                    <div className="shrink-0 lg:w-1/3">
                      <span className="font-heading text-3xl font-semibold text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-3 font-heading text-2xl font-semibold leading-snug text-navy sm:text-3xl">
                        {s.title}
                      </h2>
                      <div className="gold-rule mt-4 w-14" aria-hidden />
                    </div>
                    <div className="lg:w-2/3">
                      <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {s.description}
                      </p>
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-deepgold"
                              strokeWidth={1.5}
                              aria-hidden
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

      <CtaSection />
    </>
  );
}
