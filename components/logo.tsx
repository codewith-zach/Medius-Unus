import Image from "next/image";

/**
 * The circular monogram from the original logo file, shown in its
 * original gold (#C79D4B). Never recoloured or distorted.
 */
export function LogoEmblem({
  className = "h-12 w-12",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/medius-unus-emblem.svg"
      alt="Medius Unus emblem"
      width={870}
      height={870}
      className={className}
      priority
    />
  );
}

export function LogoWordmark() {
  return (
    <div className="flex items-center gap-3.5">
      <LogoEmblem className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-[1.15rem] font-semibold tracking-[0.14em] text-cream sm:text-xl">
          MEDIUS UNUS
        </span>
        <span className="mt-1 text-[0.6rem] uppercase tracking-[0.32em] text-gold">
          Nigeria Limited
        </span>
      </span>
    </div>
  );
}
