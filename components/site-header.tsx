"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { LogoEmblem, LogoWordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/lib/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the navy hero at the top of every page; solid navy bar once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (href: string) =>
    `nav-link text-sm tracking-wide transition-colors hover:text-gold ${
      pathname === href
        ? "text-gold"
        : pathname.startsWith(href) && href !== "/"
          ? "text-gold"
          : "text-cream/80"
    }`;
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-navy/95 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur supports-[backdrop-filter]:bg-navy/90"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Medius Unus — home" className="shrink-0">
          <LogoWordmark />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)} data-active={isActive(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            asChild
            variant="outline"
            className="border-gold/60 text-gold hover:bg-gold hover:text-navy"
          >
            <Link href="/contact">Start a Conversation</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
              className="text-cream"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[300px] flex-col border-l border-white/10 bg-navy p-0 text-cream [&>button]:text-cream [&>button]:hover:bg-white/10"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>

            {/* Brand */}
            <div className="flex items-center gap-3.5 border-b border-white/10 px-6 pb-6 pt-7">
              <LogoEmblem className="h-11 w-11 shrink-0" />
              <span className="flex flex-col leading-tight">
                <span className="font-heading text-base font-semibold tracking-[0.14em] text-cream">
                  MEDIUS UNUS
                </span>
                <span className="mt-1 text-[0.55rem] uppercase tracking-[0.3em] text-gold">
                  Nigeria Limited
                </span>
              </span>
            </div>

            {/* Links */}
            <nav className="px-3 py-4" aria-label="Mobile navigation">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-3.5 rounded-md px-3 py-3.5 text-[0.95rem] tracking-wide transition-colors ${
                      active
                        ? "text-gold"
                        : "text-cream/85 hover:bg-white/5 hover:text-gold"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1 w-1 rotate-45 transition-colors ${
                        active ? "bg-gold" : "bg-cream/30 group-hover:bg-gold"
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + contact */}
            <div className="mt-auto space-y-5 border-t border-white/10 px-6 pb-8 pt-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-[#d8ac58]"
              >
                Start a Conversation
              </Link>
              <div className="space-y-1.5 text-center text-xs text-cream/60">
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="block transition-colors hover:text-gold"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="block transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
