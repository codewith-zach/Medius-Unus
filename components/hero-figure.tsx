import Image from "next/image";

/**
 * Hero plate: architectural photography in an offset gold frame with a
 * caption plate and vertical margin label — the "plate" language used
 * for imagery across the site.
 */
export function HeroFigure({ caption }: { caption: string }) {
  return (
    <figure className="relative">
      {/* vertical margin label */}
      <span
        aria-hidden
        className="v-text absolute -left-9 top-2 hidden text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-gold/70 xl:block"
      >
        Nigeria Limited
      </span>

      <div className="plate">
        <Image
          src="/images/hero-facade.jpg"
          alt="Modern glass towers converging toward the sky"
          width={980}
          height={1240}
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="img-editorial aspect-[4/5] w-full object-cover"
        />
        {/* restrained ink veil for palette cohesion */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/15"
        />
        {/* corner registration ticks */}
        <span aria-hidden className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-gold" />
        <span aria-hidden className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-gold" />
      </div>

      {/* caption plate */}
      <figcaption className="absolute -bottom-5 left-6 max-w-[16rem] border border-white/10 bg-ink px-6 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] sm:left-8">
        <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-gold">
          Medius Unus
        </span>
        <span className="mt-1.5 block font-heading text-sm font-light italic leading-snug text-cream/85">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
