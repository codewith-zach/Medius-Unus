import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContourLines } from "@/components/contour-lines";
import { LogoEmblem } from "@/components/logo";
import { hrefFor } from "@/lib/content";

export function CtaSection({
  lang,
  title,
  titleAccent,
  description,
  primary,
  secondary,
}: {
  lang: string;
  title: string;
  titleAccent: string;
  description: string;
  primary: string;
  secondary: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink-gradient">
      <div aria-hidden className="hairline-grid absolute inset-0" />
      {/* Emblem watermark centred behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
      >
        <LogoEmblem className="h-[26rem] w-[26rem]" priority={false} />
      </div>
      <div
        aria-hidden
        className="gold-halo pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[44rem] -translate-x-1/2 -translate-y-1/2"
      />
      <ContourLines className="absolute left-1/2 top-1/2 h-[160%] w-[90%] -translate-x-1/2 -translate-y-1/2" opacity={0.08} />
      <div className="relative mx-auto max-w-4xl px-4 py-28 text-center sm:px-6 sm:py-32">
        <Reveal>
          <p className="flex items-center justify-center gap-3" aria-hidden>
            <span className="diamond h-1.5 w-1.5 opacity-80" />
            <span className="diamond h-2.5 w-2.5" />
            <span className="diamond h-1.5 w-1.5 opacity-80" />
          </p>
          <h2 className="mt-8 font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.015em] text-balance text-cream sm:text-4xl lg:text-[3.4rem]">
            {title}
            {titleAccent ? (
              <>
                <br />
                <em className="text-gold-gradient font-medium italic">{titleAccent}</em>
              </>
            ) : null}
          </h2>
          <div className="gold-rule rule-grow mx-auto mt-8 h-px w-16" aria-hidden />
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-pretty text-cream/80 sm:text-lg">
            {description}
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={hrefFor(lang, "/contact")}
              className="btn-sheen group inline-flex items-center gap-2.5 rounded bg-gold px-8 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-[#d8ac58] hover:shadow-[0_8px_30px_rgba(199,157,75,0.35)] active:scale-[0.98]"
            >
              {primary}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href={hrefFor(lang, "/contact?intent=partnership")}
              className="inline-flex items-center gap-2.5 rounded border border-gold/60 px-8 py-3.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-navy active:scale-[0.98]"
            >
              <Handshake className="h-4 w-4" strokeWidth={1.5} />
              {secondary}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
