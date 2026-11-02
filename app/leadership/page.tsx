import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/section";
import { ContourLines } from "@/components/contour-lines";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { leadership } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Helen Miner and Nordine Djeddi — the leadership of Medius Unus Nigeria Limited.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Leadership"
        description="International financial-services, regulatory and IT-delivery experience, combined with Nigerian public-sector leadership."
      />

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-[55%]"
          stroke="#0D2B1F"
          opacity={0.05}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-16">
            {leadership.map((p) => (
              <Reveal key={p.name}>
                <article className="rounded border border-sand bg-white p-6 sm:p-10">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <Image
                      src={p.photo}
                      alt={`Portrait of ${p.name}`}
                      width={256}
                      height={256}
                      className="h-24 w-24 shrink-0 rounded-full border border-gold/50 object-cover sm:h-28 sm:w-28"
                    />
                    <div>
                      <h2 className="font-heading text-2xl font-semibold uppercase tracking-[0.06em] text-navy sm:text-3xl">
                        {p.name}
                      </h2>
                      <p className="mt-3 text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-deepgold sm:text-xs">
                        {p.title}
                      </p>
                      <div className="gold-rule mt-4 w-14" aria-hidden />
                    </div>
                  </div>
                  <div className="mt-6 space-y-5">
                    {p.full.map((para, i) => (
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
