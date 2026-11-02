import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContourLines } from "@/components/contour-lines";
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
      <ContourLines
        className="pointer-events-none absolute left-1/2 top-1/2 h-[170%] w-[95%] -translate-x-1/2 -translate-y-1/2"
        opacity={0.12}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <span
            aria-hidden
            className="mx-auto block h-10 w-px bg-gradient-to-b from-transparent to-gold"
          />
          <h2 className="mt-2 text-balance font-heading text-[2rem] font-light leading-[1.14] tracking-[-0.01em] text-cream sm:text-5xl">
            {title}
            {titleAccent ? (
              <>
                <br />
                <em className="italic text-gold">{titleAccent}</em>
              </>
            ) : null}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[0.95rem] leading-[1.8] text-cream/70 sm:text-base">
            {description}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={hrefFor(lang, "/contact")}
              className="btn-gold group inline-flex items-center gap-2.5 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
            >
              {primary}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href={hrefFor(lang, "/contact?intent=partnership")}
              className="btn-line-light group inline-flex items-center gap-2.5 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
            >
              {secondary}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
