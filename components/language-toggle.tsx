"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/content";

/**
 * EN | FR pill switcher. Remembers the choice in a `lang` cookie (read by
 * the middleware on future visits) and navigates to the same page under
 * the other locale prefix.
 */
export function LanguageToggle({
  lang,
  variant = "light",
}: {
  lang: Lang;
  variant?: "light" | "dark";
}) {
  const pathname = usePathname() || `/${lang}`;

  const hrefFor = (target: Lang) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  const remember = (target: Lang) => {
    document.cookie = `lang=${target};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
  };

  const base =
    variant === "dark"
      ? "border-white/20"
      : "border-sand";

  return (
    <div
      className={`flex items-center overflow-hidden rounded-full border ${base} text-[0.65rem] font-semibold uppercase tracking-[0.12em]`}
      role="group"
      aria-label="Language / Langue"
    >
      {(["en", "fr"] as Lang[]).map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          onClick={() => remember(l)}
          aria-current={lang === l ? "true" : undefined}
          className={
            lang === l
              ? "bg-gold px-3 py-1.5 text-navy"
              : variant === "dark"
                ? "px-3 py-1.5 text-cream/70 transition-colors hover:text-gold"
                : "px-3 py-1.5 text-muted-foreground transition-colors hover:text-deepgold"
          }
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
