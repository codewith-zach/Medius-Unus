"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Abstract brand motif for the hero: fine gold concentric instruments with a
 * band of vertical bars whose heights follow the circle's chord — an echo of
 * the emblem's geometry. A chronometer-style tick ring frames the piece; the
 * outer ring drifts subtly with scroll, the dashed ring rotates almost
 * imperceptibly, and a single node orbits the figure.
 */
export function HeroArtwork({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Coordinates are rounded so Node (SSR) and the browser, whose Math.sin/
  // Math.cos can differ in the last ulp, render identical attributes —
  // otherwise React flags a hydration mismatch on the SVG lines.
  const round = (v: number) => Math.round(v * 100) / 100;

  // Vertical bars across the middle band; heights follow the circle chord.
  const R = 252;
  const bars = Array.from({ length: 43 }, (_, i) => {
    const x = -172 + i * 8;
    const chord = 2 * Math.sqrt(Math.max(0, R * R - x * x));
    const h = Math.min(200, chord * 0.46);
    const t = 1 - Math.abs(x) / 172;
    return { x, h: round(h), opacity: round(0.22 + t * 0.5) };
  });

  // Fine tick marks around the outer ring, longer at each quarter.
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2;
    const quarter = i % 18 === 0;
    const inner = quarter ? 266 : 271;
    return {
      x1: round(Math.cos(a) * inner),
      y1: round(Math.sin(a) * inner),
      x2: round(Math.cos(a) * 280),
      y2: round(Math.sin(a) * 280),
      opacity: quarter ? 0.5 : 0.25,
    };
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* soft gold halo behind the instrument */}
      <div
        aria-hidden
        className="gold-halo absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        style={reduce ? undefined : { y: drift }}
        className="relative select-none"
        role="img"
        aria-label="Abstract geometric motif echoing the Medius Unus emblem"
      >
        <svg
          viewBox="-300 -300 600 600"
          className="h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] lg:h-[480px] lg:w-[480px]"
        >
          <defs>
            <linearGradient id="hero-gold" x1="-280" y1="280" x2="280" y2="-280">
              <stop offset="0%" stopColor="#A87F33" />
              <stop offset="50%" stopColor="#E3C078" />
              <stop offset="100%" stopColor="#C79D4B" />
            </linearGradient>
          </defs>

          {/* outer fine ring */}
          <circle r="280" fill="none" stroke="#C79D4B" strokeOpacity="0.32" strokeWidth="1" />

          {/* chronometer tick ring */}
          <g stroke="#C79D4B" strokeWidth="1">
            {ticks.map((t, i) => (
              <line
                key={i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                strokeOpacity={t.opacity}
              />
            ))}
          </g>

          {/* slowly rotating dashed ring */}
          <motion.g
            animate={reduce ? undefined : { rotate: 360 }}
            transition={
              reduce ? undefined : { duration: 120, ease: "linear", repeat: Infinity }
            }
          >
            <circle
              r="232"
              fill="none"
              stroke="#C79D4B"
              strokeOpacity="0.45"
              strokeWidth="1"
              strokeDasharray="2 9"
            />
          </motion.g>
          {/* inner ring, counter-rotating */}
          <motion.g
            animate={reduce ? undefined : { rotate: -360 }}
            transition={
              reduce ? undefined : { duration: 160, ease: "linear", repeat: Infinity }
            }
          >
            <circle
              r="132"
              fill="none"
              stroke="#C79D4B"
              strokeOpacity="0.25"
              strokeWidth="1"
              strokeDasharray="1 5"
            />
          </motion.g>

          {/* orbiting node on the dashed ring */}
          <motion.g
            animate={reduce ? undefined : { rotate: 360 }}
            transition={
              reduce ? undefined : { duration: 46, ease: "linear", repeat: Infinity }
            }
          >
            <circle cx="232" cy="0" r="3" fill="#E3C078" />
            <circle cx="232" cy="0" r="8" fill="none" stroke="#C79D4B" strokeOpacity="0.35" />
          </motion.g>

          {/* vertical bar band — chord-following heights */}
          <g stroke="url(#hero-gold)" strokeWidth="1.25" strokeLinecap="round">
            {bars.map((b, i) => (
              <line
                key={i}
                x1={b.x}
                y1={-b.h / 2}
                x2={b.x}
                y2={b.h / 2}
                strokeOpacity={b.opacity}
              />
            ))}
          </g>

          {/* convergence arc — expertise, opportunity and execution meeting */}
          <motion.path
            d="M -258 138 A 294 294 0 0 1 138 -258"
            fill="none"
            stroke="url(#hero-gold)"
            strokeOpacity="0.75"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={reduce ? undefined : { pathLength: 1 }}
            transition={reduce ? undefined : { duration: 2, delay: 0.6, ease: "easeInOut" }}
          />
          <motion.circle
            cx="-258"
            cy="138"
            r="3.5"
            fill="#C79D4B"
            initial={reduce ? undefined : { scale: 0 }}
            animate={reduce ? undefined : { scale: 1 }}
            transition={reduce ? undefined : { delay: 0.7, duration: 0.5 }}
          />
          <motion.circle
            cx="138"
            cy="-258"
            r="3.5"
            fill="#C79D4B"
            initial={reduce ? undefined : { scale: 0 }}
            animate={reduce ? undefined : { scale: 1 }}
            transition={reduce ? undefined : { delay: 0.9, duration: 0.5 }}
          />
          {/* softly pulsing centre node with halo */}
          <motion.circle
            cx="0"
            cy="0"
            r="4"
            fill="#E3C078"
            animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [1, 0.7, 1] }}
            transition={
              reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </svg>
      </motion.div>
    </div>
  );
}
