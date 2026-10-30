import { Fragment } from "react";
import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { partnerCategories } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Partners & Affiliations",
  description:
    "Organisations connected to Medius Unus: strategic and technology partners, international business relationships, local corporate and institutional partners, and representation mandates.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners & Affiliations"
        title="Partners & Affiliations"
        description="Organisations connected to Medius Unus across four kinds of relationship — strategic and technology partners, international business relationships, local corporate and institutional partners, and representation mandates."
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow="Categories"
            title="Four categories of relationship"
          />
          <div className="mt-14 border-t border-navy/10">
            {partnerCategories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="grid gap-4 border-b border-navy/10 py-8 sm:grid-cols-[4rem_1fr_auto] sm:gap-8 sm:py-10">
                  <span
                    aria-hidden
                    className="font-heading text-2xl font-semibold text-gold/70 sm:text-3xl"
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
                  <span className="hidden self-start pt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:block">
                    {c.orgs.length}{" "}
                    {c.orgs.length === 1 ? "organisation" : "organisations"}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Interested in a partnership with Medius Unus?"
        description="If your organisation shares relevant objectives — commercial, institutional or technological — we welcome an initial conversation about possible collaboration."
      />
    </>
  );
}
