import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { getContent, hrefFor, isLang, defaultLang } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: getContent(lang).services.hero.title };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const t = getContent(lang).services;
  const cta = getContent(lang).cta;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        description={t.hero.description}
      />

      {/* Index rail — a table of contents for the eight services */}
      <section className="border-b border-navy/10 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <Reveal>
            <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.items.map((s, i) => (
                <Link
                  key={s.slug}
                  href={hrefFor(lang, `/services#${s.slug}`)}
                  className="group flex items-baseline gap-4 border-b border-navy/10 py-3 transition-colors hover:border-gold"
                >
                  <span className="font-heading text-xs font-light italic text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.8rem] font-medium leading-snug text-navy/75 transition-colors group-hover:text-navy">
                    {s.title}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The eight services — editorial spread */}
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden className="hairline-grid-ink absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <div className="space-y-20 sm:space-y-28">
            {t.items.map((s, i) => (
              <article key={s.slug} id={s.slug} className="scroll-mt-28">
                <Reveal>
                  <div className="grid gap-10 border-t border-navy/15 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                      <p className="flex items-baseline gap-4">
                        <span className="font-heading text-5xl font-light leading-none text-gold sm:text-6xl">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-heading text-sm font-light italic text-navy/40">
                          / {String(t.items.length).padStart(2, "0")}
                        </span>
                      </p>
                      <h2 className="mt-6 text-balance font-heading text-[1.55rem] font-medium leading-[1.18] tracking-[-0.012em] text-navy sm:text-[1.9rem]">
                        {s.title}
                      </h2>
                      <div className="gold-rule mt-6 w-14" aria-hidden />
                    </div>
                    <div>
                      <p className="max-w-2xl text-[0.95rem] leading-[1.85] text-foreground/85 sm:text-base">
                        {s.description}
                      </p>
                      <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3.5 border-t border-navy/10 py-3.5 text-[0.85rem] leading-relaxed text-muted-foreground"
                          >
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-deepgold"
                              strokeWidth={1.75}
                              aria-hidden
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
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
