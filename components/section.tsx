import { Reveal } from "@/components/reveal";
import { ContourLines } from "@/components/contour-lines";

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
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
          className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${
            dark ? "text-gold" : "text-deepgold"
          } ${align === "center" ? "justify-center" : ""}`}
        >
          <span aria-hidden className="inline-block h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-4 font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-cream" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <div
        className={`gold-rule rule-grow mt-6 w-16 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden
      />
      {description && (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            dark ? "text-cream/80" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

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
    <section className="grain relative overflow-hidden bg-navy pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div aria-hidden className="hairline-grid absolute inset-0" />
      <ContourLines className="absolute -right-40 top-0 h-[130%] w-[70%] opacity-80" opacity={0.1} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} dark />
      </div>
    </section>
  );
}
