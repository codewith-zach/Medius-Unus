import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ContourLines } from "@/components/contour-lines";

/**
 * Chapter-numbered section heading — the report-like rhythm used
 * throughout the site: numeral, engraved rule, eyebrow, serif title.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  dark = false,
  align = "left",
  chapter,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
  chapter?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-gold" : "text-deepgold"
          } ${centered ? "justify-center" : ""}`}
        >
          {chapter && (
            <span aria-hidden className="font-heading text-sm font-medium normal-case italic tracking-normal text-gold">
              {chapter}
            </span>
          )}
          <span aria-hidden className="inline-block h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-5 text-balance font-heading text-[1.9rem] font-medium leading-[1.12] tracking-[-0.015em] sm:text-4xl lg:text-[2.9rem] ${
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
      {description && (
        <p
          className={`mt-6 max-w-2xl text-[0.95rem] leading-[1.75] sm:text-base ${
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
 * Interior-page hero: deep ink band with hairline grid, contour
 * linework and an optional photographic plate on the right.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  chapter,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  chapter?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink-gradient pt-40 pb-16 sm:pt-48 sm:pb-24">
      <div aria-hidden className="hairline-grid absolute inset-0" />
      <ContourLines
        className="pointer-events-none absolute -right-32 top-0 h-[135%] w-[72%]"
        opacity={0.12}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {image ? (
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow={eyebrow}
                title={title}
                description={description}
                dark
                chapter={chapter}
              />
            </div>
            <Reveal variant="clip" delay={0.15} className="hidden lg:block">
              <figure className="plate">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={900}
                  height={1100}
                  sizes="(min-width: 1024px) 36vw, 0px"
                  className="img-editorial aspect-[4/5] w-full object-cover"
                  priority
                />
              </figure>
            </Reveal>
          </div>
        ) : (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            dark
            chapter={chapter}
          />
        )}
      </div>
    </section>
  );
}
