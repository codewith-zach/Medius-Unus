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

      {/* caption plate — floats on the image surface, reference-style:
          raised above the bottom edge, at the left edge, gold left border,
          translucent ground + blur, ✦ glyph beside the tracked label */}
      <figcaption className="absolute bottom-10 left-0 z-[3] max-w-[280px] border-l-2 border-gold bg-navy/95 py-4 pl-5 pr-6 shadow-[0_15px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:-bottom-2 sm:-left-4 lg:-left-6">
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className="text-[1.45rem] leading-none text-gold"
          >
            ✦
          </span>
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-gold">
            Medius Unus
          </span>
        </span>
        <span className="mt-3 block font-heading text-[0.95rem] font-light italic leading-[1.55] text-cream/90">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
