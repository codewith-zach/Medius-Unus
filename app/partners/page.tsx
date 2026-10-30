import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { partnerCategories } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Partners & Affiliations",
  description:
    "Organisations connected to Medius Unus, grouped under their source categories: Strategic & Technology Partners, International Business Relationships, Local Corporate & Institutional Partners, and Representation Mandates.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners & Affiliations"
        title="Partners & Affiliations"
        description="The organisations below are grouped under the categories provided in the firm's source information. Names are shown without descriptions of individual relationships."
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow="Categories"
            title="Four categories of relationship"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {partnerCategories.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.08}>
                <div className="h-full rounded border border-sand bg-white p-6 sm:p-8">
                  <h2 className="font-heading text-xl font-semibold text-navy sm:text-2xl">
                    {c.title}
                  </h2>
                  <div className="gold-rule mt-4 w-12" aria-hidden />
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.orgs.map((o) => (
                      <li
                        key={o}
                        className="rounded border border-sand bg-cream px-4 py-2 text-sm font-medium text-navy"
                      >
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
        title="Interested in a partnership with Medius Unus?"
        description="If your organisation shares relevant objectives — commercial, institutional or technological — we welcome an initial conversation about possible collaboration."
      />
    </>
  );
}
