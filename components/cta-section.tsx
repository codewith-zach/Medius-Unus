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
          <span
            aria-hidden
            className="mx-auto block h-10 w-px bg-gradient-to-b from-transparent to-gold"
          />
          <h2 className="mt-3 font-heading text-[2rem] font-light leading-[1.14] tracking-[-0.01em] text-balance text-cream sm:text-5xl">
            {title}
            {titleAccent ? (
              <>
                <br />
                <em className="text-gold-gradient italic">{titleAccent}</em>
              </>
            ) : null}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[0.95rem] leading-[1.8] text-pretty text-cream/70 sm:text-base">
            {description}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={hrefFor(lang, "/contact")}
              className="btn-sheen group inline-flex items-center gap-2.5 bg-gold px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy transition-all hover:bg-[#d8ac58] hover:shadow-[0_8px_30px_rgba(199,157,75,0.35)] active:translate-y-px"
            >
              {primary}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href={hrefFor(lang, "/contact?intent=partnership")}
              className="inline-flex items-center gap-2.5 border border-gold/60 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold transition-all hover:bg-gold hover:text-navy active:translate-y-px"
            >
              <Handshake className="h-3.5 w-3.5" strokeWidth={1.5} />
              {secondary}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
