"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { LogoWordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav } from "@/lib/site-content";

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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
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
            className="w-72 border-sand bg-navy text-cream [&>button]:text-cream"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded px-3 py-3 text-base ${
                    pathname === item.href
                      ? "bg-white/10 text-gold"
                      : "text-cream/85 hover:bg-white/5 hover:text-gold"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded border border-gold/60 px-3 py-3 text-center text-base text-gold hover:bg-gold hover:text-navy"
              >
                Start a Conversation
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
