import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContourLines } from "@/components/contour-lines";
import { LogoEmblem } from "@/components/logo";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-screen items-center overflow-hidden bg-ink-gradient px-4 pb-24 pt-32 text-center">
      <div aria-hidden className="hairline-grid absolute inset-0" />
      <ContourLines className="absolute left-1/2 top-1/2 h-[160%] w-[90%] -translate-x-1/2 -translate-y-1/2" opacity={0.08} />
      {/* Emblem watermark behind the numeral */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
      >
        <LogoEmblem className="h-[30rem] w-[30rem]" priority={false} />
      </div>
      <div className="relative mx-auto max-w-2xl">
        <p
          aria-hidden
          className="quote-glyph select-none font-heading text-[9rem] font-semibold leading-none text-outline-cream sm:text-[13rem]"
        >
          404
        </p>
        <div className="mx-auto -mt-8 flex items-center justify-center gap-4 sm:-mt-12" aria-hidden>
          <span className="gold-rule h-px w-14" />
          <span className="diamond h-2 w-2" />
          <span className="gold-rule h-px w-14" style={{ transform: "scaleX(-1)" }} />
        </div>
        <h1 className="mt-8 font-heading text-3xl font-semibold text-balance text-cream sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/70">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/en"
            className="btn-sheen inline-flex items-center gap-2 rounded bg-gold px-7 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-[#d8ac58] active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Back to home (EN)
          </Link>
          <Link
            href="/fr"
            className="inline-flex items-center rounded border border-gold/60 px-7 py-3.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-navy active:scale-[0.98]"
          >
            Retour à l&apos;accueil (FR)
          </Link>
        </div>
      </div>
    </section>
  );
}
