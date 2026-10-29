import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Helen Miner and Nordine Djeddi — the leadership of Medius Unus Nigeria Limited.",
};

const profiles = [
  {
    name: "Helen Miner",
    initials: "HM",
    paragraphs: [
      "Helen Miner is a senior financial-services leader with extensive experience translating complex regulatory requirements into practical governance, controls and operational change. Her career has been shaped primarily in the United Kingdom, with additional professional experience in Belgium and Luxembourg, alongside first-hand knowledge of Nigeria's institutional and economic environment.",
      "Her experience spans international banking and asset management, regulatory change, financial-services operations, cross-border compliance and multi-country transformation programmes. Her professional history includes senior assignments involving Northern Trust Asset Management, Royal Bank of Canada, Barclays and J.P. Morgan. At Fortis Merchant Banque, she managed product-risk responsibilities, supported cross-border compliance and led group-wide MiFID implementation in Belgium and the United Kingdom.",
      "Her experience also includes institutional-fund operations, financial reporting, reconciliation, client onboarding, migrations, mergers and multi-country change programmes. Her regulatory background includes MiFID, MiFIR, Sarbanes–Oxley and GDPR.",
      "In Nigeria, Helen served as Plateau State Commissioner for Commerce and Industry, Senior Economic Adviser to the Governor and Chairman of PIPC, leading policy, investment and multi-stakeholder initiatives. She also served for more than two decades on the UK Board of the Nigerian Electricity Services Company (NESCO), with responsibilities relating to corporate governance, regulatory compliance, risk management and issue resolution.",
      "For financial institutions and other organisations, her experience may be relevant to the design and implementation of risk-based compliance frameworks, governance and supervisory controls, stakeholder coordination, operational processes, reporting and implementation roadmaps. Her profile combines regulatory, operational, technology-enabled change and executive-governance perspectives.",
    ],
  },
  {
    name: "Nordine Djeddi",
    initials: "ND",
    paragraphs: [
      "Nordine Djeddi has a double bachelor's degree in IT and a stated 16-year record of supporting quality IT project implementation. His experience includes IT testing, transition from development into production, and data-centre migration projects across several countries.",
      "His work has included project delivery, team management and training in demanding, international and multicultural environments. His professional background also includes establishing two business start-ups, providing exposure to operational management and sales and commercial management.",
      "His stated strengths include coordinating multiple IT projects, working under time and quality constraints, relationship management, collaboration and an adaptable, delivery-focused approach. His background includes GDPR training in 2018 and NDPR training in 2019, and experience delivering training in French.",
    ],
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Leadership"
        description="International financial-services, regulatory and IT-delivery experience, combined with Nigerian public-sector leadership."
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-16">
            {profiles.map((p) => (
              <Reveal key={p.name}>
                <article className="rounded border border-sand bg-white p-6 sm:p-10">
                  <div className="flex items-center gap-5">
                    <div
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-sand font-heading text-2xl font-semibold text-deepgold"
                      aria-hidden
                    >
                      {p.initials}
                    </div>
                    <div>
                      <h2 className="font-heading text-3xl font-semibold text-navy">
                        {p.name}
                      </h2>
                      <div className="gold-rule mt-3 w-14" aria-hidden />
                    </div>
                  </div>
                  <div className="mt-6 space-y-5">
                    {p.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className={
                          i === 0
                            ? "text-base leading-relaxed text-foreground sm:text-lg"
                            : "text-base leading-relaxed text-muted-foreground"
                        }
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Would this experience be relevant to your objectives?"
        description="If your organisation is navigating regulatory change, a complex programme or a cross-border opportunity, we welcome an initial conversation."
      />
    </>
  );
}
