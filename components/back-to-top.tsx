"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating gold control that appears once the reader is a few viewports
 * down and returns to the top of the page. Anchor navigation keeps it
 * dependency-free and honours the reduced-motion scroll behaviour.
 */
export function BackToTop() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY < window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#main" aria-label="Back to top" data-hidden={hidden} className="back-to-top">
      <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
    </a>
  );
}
