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
