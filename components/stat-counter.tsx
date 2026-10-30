"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Count-up number for the sourced-stats band. Only used with figures
 * stated in the brief (no invented impact metrics).
 *
 * Visibility is detected twice: via IntersectionObserver (useInView) and a
 * scroll/resize listener that measures the element directly. Some embedded
 * webviews deliver scroll/intersection events unreliably, which previously
 * left counters stuck at 0; whichever trigger fires first starts the tween.
 */
export function StatCounter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView) return;
    start();
  }, [inView]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const visible = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight - 40 && r.bottom > 40;
    };

    const onCheck = () => {
      if (!started.current && visible()) start();
    };

    window.addEventListener("scroll", onCheck, { passive: true });
    window.addEventListener("resize", onCheck, { passive: true });
    onCheck();
    return () => {
      window.removeEventListener("scroll", onCheck);
      window.removeEventListener("resize", onCheck);
    };
  }, []);

  function start() {
    if (started.current) return;
    started.current = true;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const begin = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - begin) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    startCleanup.current = () => cancelAnimationFrame(raf);
  }

  const startCleanup = useRef<null | (() => void)>(null);
  useEffect(() => () => startCleanup.current?.(), []);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
