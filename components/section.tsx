import { Reveal } from "@/components/reveal";

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
          className={`text-xs font-semibold uppercase tracking-[0.25em] ${
            dark ? "text-gold" : "text-deepgold"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-heading text-3xl font-semibold leading-tight sm:text-4xl ${
          dark ? "text-cream" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <div
        className={`gold-rule mt-5 w-16 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden
      />
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
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
    <section className="bg-navy pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          dark
        />
      </div>
    </section>
  );
}
