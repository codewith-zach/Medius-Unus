import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
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
      <ContourLines className="absolute left-1/2 top-1/2 h-[160%] w-[90%] -translate-x-1/2 -translate-y-1/2" opacity={0.1} />
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-28">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.01em] text-cream sm:text-4xl lg:text-5xl">
            {title}
            {titleAccent ? (
              <>
                <br />
                <em className="font-medium italic text-gold">{titleAccent}</em>
              </>
            ) : null}
          </h2>
          <div className="gold-rule rule-grow mx-auto mt-7 w-16" aria-hidden />
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {description}
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={hrefFor(lang, "/contact")}
              className="group inline-flex items-center gap-2.5 rounded bg-gold px-7 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-[#d8ac58] hover:shadow-[0_8px_30px_rgba(199,157,75,0.35)] active:scale-[0.98]"
            >
              {primary}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href={hrefFor(lang, "/contact?intent=partnership")}
              className="inline-flex items-center gap-2.5 rounded border border-gold/60 px-7 py-3.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-navy active:scale-[0.98]"
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
