import { Reveal } from "@/components/reveal";
import { ContourLines } from "@/components/contour-lines";

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  dark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-gold" : "text-deepgold"
          } ${align === "center" ? "justify-center" : ""}`}
        >
          <span aria-hidden className="diamond h-1.5 w-1.5 opacity-80" />
          {eyebrow}
          {align === "center" && (
            <span aria-hidden className="diamond h-1.5 w-1.5 opacity-80" />
          )}
        </p>
      )}
      <h2
        className={`mt-5 font-heading text-[1.9rem] font-medium leading-[1.12] tracking-[-0.015em] text-balance sm:text-4xl lg:text-[2.9rem] ${
          dark ? "text-cream" : "text-navy"
        }`}
      >
        {title}
        {titleAccent ? (
          <>
            {" "}
            <em className="font-light italic text-gold">{titleAccent}</em>
          </>
        ) : null}
      </h2>
      <div
        className={`gold-rule rule-grow mt-6 h-px w-16 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden
      />
      {description && (
        <p
          className={`mt-6 max-w-2xl text-[0.95rem] leading-[1.75] text-pretty sm:text-base ${
            dark ? "text-cream/75" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

/**
 * Dark band that opens every inner page. The eyebrow is echoed as a huge
 * ghost wordmark behind the heading for editorial drama.
 */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink-gradient pt-36 pb-20 sm:pt-48 sm:pb-24">
      <div aria-hidden className="hairline-grid absolute inset-0" />
      <ContourLines className="absolute -right-40 top-0 h-[130%] w-[70%] opacity-80" opacity={0.1} />
      {/* Ghost echo of the eyebrow, cropped by the band */}
      <span
        aria-hidden
        className="quote-glyph pointer-events-none absolute -bottom-[0.23em] left-1/2 w-full -translate-x-1/2 select-none text-center font-heading text-[22vw] font-medium leading-none tracking-[0.08em] text-outline-cream opacity-60"
      >
        {eyebrow}
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} dark />
      </div>
    </section>
  );
}
