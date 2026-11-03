import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { getContent, hrefFor, isLang, defaultLang } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: getContent(lang).sectorsPage.hero.title };
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
    src: "/images/sector-gherkin.jpg",
    alt: "The Gherkin (30 St Mary Axe) rising above the City of London",
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

export default async function SectorsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const t = getContent(lang).sectorsPage;
  const cta = getContent(lang).cta;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        description={t.hero.description}
      />

      {/* Filmstrip index of the five sectors */}
      <section className="border-b border-navy/10 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {t.sectors.map((s, i) => {
                const img = sectorImages[s.slug];
                return (
                  <Link
                    key={s.slug}
                    href={hrefFor(lang, `/sectors#${s.slug}`)}
                    className="group relative overflow-hidden border border-navy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="relative aspect-[4/3]">
                      {img && (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1024px) 18vw, 50vw"
                          className="img-editorial object-cover transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.05]"
                        />
                      )}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                        <span className="font-heading text-[0.8rem] font-medium leading-tight text-cream sm:text-sm">
                          {s.title}
                        </span>
                        <span className="font-heading text-[0.7rem] font-light italic text-gold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sector profiles — alternating editorial rows */}
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden className="hairline-grid-ink absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl space-y-20 px-5 py-16 sm:space-y-28 sm:px-8 sm:py-24 lg:px-10">
          {t.sectors.map((s, i) => {
            const img = sectorImages[s.slug];
            const flip = i % 2 === 1;
            return (
              <article key={s.slug} id={s.slug} className="scroll-mt-28">
                <Reveal>
                  <div
                    className={`grid items-center gap-10 border-t border-navy/15 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 ${
                      flip ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <figure className={`plate ${flip ? "lg:ml-6" : "lg:mr-6"}`}>
                      {img && (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={1100}
                          height={760}
                          sizes="(min-width: 1024px) 42vw, 100vw"
                          className="img-editorial aspect-[7/5] w-full object-cover"
                        />
                      )}
                    </figure>
                    <div>
                      <p className="flex items-baseline gap-4">
                        <span className="font-heading text-5xl font-light leading-none text-gold sm:text-6xl">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-heading text-sm font-light italic text-navy/40">
                          / {String(t.sectors.length).padStart(2, "0")}
                        </span>
                      </p>
                      <h2 className="mt-6 text-balance font-heading text-[1.55rem] font-medium leading-[1.18] tracking-[-0.012em] text-navy sm:text-[1.9rem]">
                        {s.title}
                      </h2>
                      <div className="gold-rule mt-6 w-14" aria-hidden />
                      <p className="mt-6 max-w-2xl text-[0.95rem] leading-[1.85] text-foreground/85 sm:text-base">
                        {s.description}
                      </p>

                      {s.slug === "oil-gas" && t.oilGasPartnerships.length > 0 && (
                        <div className="mt-10">
                          <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-deepgold">
                            <span aria-hidden className="inline-block h-px w-8 bg-current opacity-60" />
                            {t.partnershipsEyebrow}
                          </p>
                          <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {t.oilGasPartnerships.map((p) => (
                              <div
                                key={p.name}
                                className="border-t border-navy/20 pt-5 transition-colors hover:border-gold"
                              >
                                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                                  {p.location}
                                </p>
                                <h3 className="mt-2 font-heading text-xl font-medium tracking-[-0.01em] text-navy">
                                  {p.name}
                                </h3>
                                <p className="mt-3 text-[0.83rem] leading-[1.75] text-muted-foreground">
                                  {p.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {s.slug === "solid-minerals" && (
                        <p className="mt-8 flex items-start gap-4 border-l-2 border-gold bg-sand/50 px-6 py-5 text-[0.85rem] leading-[1.75] text-foreground">
                          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-deepgold" strokeWidth={1.25} />
                          <span>
                            {t.solidMineralsNote.text}
                            <Link
                              href={hrefFor(lang, "/contact?intent=investment")}
                              className="link-arrow font-medium text-deepgold"
                            >
                              {t.solidMineralsNote.link}
                            </Link>
                            .
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <CtaSection
        lang={lang}
        title={cta.title}
        titleAccent={cta.titleAccent}
        description={cta.description}
        primary={cta.primary}
        secondary={cta.secondary}
      />
    </>
  );
}
