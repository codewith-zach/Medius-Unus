import { en, type Content } from "./en";
import { fr } from "./fr";

export type { Content };
export type Lang = "en" | "fr";
export type Leader = Content["leadership"][number];

export const langs: Lang[] = ["en", "fr"];
export const defaultLang: Lang = "en";

const dictionaries: Record<Lang, Content> = { en, fr };

export function isLang(value: string): value is Lang {
  return value === "en" || value === "fr";
}

export function getContent(lang: string): Content {
  return isLang(lang) ? dictionaries[lang] : dictionaries[defaultLang];
}

/** Locale-aware internal href: hrefFor(lang, "/services") → "/fr/services" */
export function hrefFor(lang: string, path: string): string {
  const base = isLang(lang) ? lang : defaultLang;
  return path === "" ? `/${base}` : `/${base}${path}`;
}
