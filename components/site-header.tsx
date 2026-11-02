"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { LogoEmblem } from "@/components/logo";
import { LanguageToggle } from "@/components/language-toggle";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { hrefFor, type Content, type Lang } from "@/lib/content";

export function SiteHeader({ lang, content }: { lang: Lang; content: Content }) {
  const pathname = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the hero at the top of every page; ink glass once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fullPath = (path: string) => hrefFor(lang, path);
  const isActive = (path: string) =>
    path === "" ? pathname === `/${lang}` : pathname.startsWith(`/${lang}${path}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-ink/90 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[5.5rem] sm:gap-6 sm:px-8 lg:px-10">
        <Link href={fullPath("")} aria-label="Medius Unus — home" className="group shrink-0">
          <span className="flex items-center gap-2.5 sm:gap-4">
            <LogoEmblem className="h-9 w-9 shrink-0 transition-transform duration-500 group-hover:rotate-45 sm:h-12 sm:w-12" />
            <span className="flex flex-col leading-tight">
              <span className="font-heading text-[0.82rem] font-medium tracking-[0.1em] text-cream sm:text-xl sm:tracking-[0.12em]">
                MEDIUS UNUS
              </span>
              <span className="mt-1 text-[0.48rem] font-semibold uppercase tracking-[0.32em] text-gold sm:text-[0.58rem] sm:tracking-[0.42em]">
                Nigeria Limited
              </span>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main navigation">
          {content.nav.map((item) => (
            <Link
              key={item.href}
              href={fullPath(item.href)}
              className={`nav-link text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-gold ${
                isActive(item.href) ? "text-gold" : "text-cream/75"
              }`}
              data-active={isActive(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <LanguageToggle lang={lang} variant="dark" />
          <Link
            href={fullPath("/contact")}
            className="btn-line-light group inline-flex items-center gap-2 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
          >
            {content.header.cta}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <LanguageToggle lang={lang} variant="dark" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <button
                aria-label={content.header.openMenu}
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-cream transition-colors hover:border-gold/60 hover:text-gold sm:h-11 sm:w-11"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[320px] flex-col border-l border-white/10 bg-ink p-0 text-cream [&>button]:text-cream [&>button]:hover:bg-white/10"
            >
              <SheetTitle className="sr-only">{content.header.menuTitle}</SheetTitle>

              {/* Brand */}
              <div className="flex items-center gap-4 border-b border-white/10 px-7 pb-7 pt-8">
                <LogoEmblem className="h-12 w-12 shrink-0" />
                <span className="flex flex-col leading-tight">
                  <span className="font-heading text-lg font-medium tracking-[0.12em] text-cream">
                    MEDIUS UNUS
                  </span>
                  <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.42em] text-gold">
                    Nigeria Limited
                  </span>
                </span>
              </div>

              {/* Links */}
              <nav className="px-7 py-5" aria-label="Mobile navigation">
                {content.nav.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={fullPath(item.href)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-baseline gap-5 border-b border-white/[0.07] py-4 transition-colors ${
                        active ? "text-gold" : "text-cream/85 hover:text-gold"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="font-heading text-xs font-light italic text-gold/60"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-xl font-medium tracking-[0.02em]">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* CTA + contact */}
              <div className="mt-auto space-y-6 border-t border-white/10 px-7 pb-9 pt-7">
                <Link
                  href={fullPath("/contact")}
                  onClick={() => setOpen(false)}
                  className="btn-gold flex items-center justify-center gap-2 px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
                >
                  {content.header.cta}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <div className="space-y-2 text-center text-xs text-cream/60">
                  <a
                    href={`tel:${content.site.phone.replace(/\s/g, "")}`}
                    className="block transition-colors hover:text-gold"
                  >
                    {content.site.phone}
                  </a>
                  <a
                    href={`mailto:${content.site.email}`}
                    className="block transition-colors hover:text-gold"
                  >
                    {content.site.email}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
