"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Abstract brand motif for the hero: fine gold concentric rings with a
 * band of vertical bars whose heights follow the circle's chord — an
 * echo of the emblem's geometry, drawn as thin 1px lines on navy.
 */
export function HeroArtwork({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  // Vertical bars across the middle band; heights follow the circle chord.
  const R = 252;
  const bars = Array.from({ length: 43 }, (_, i) => {
    const x = -172 + i * 8;
    const chord = 2 * Math.sqrt(Math.max(0, R * R - x * x));
    const h = Math.min(200, chord * 0.46);
    const t = 1 - Math.abs(x) / 172;
    return { x, h, opacity: 0.22 + t * 0.5 };
  });

  return (
    <div
      className={`relative select-none ${className}`}
      role="img"
      aria-label="Abstract geometric motif echoing the Medius Unus emblem"
    >
      <svg viewBox="-300 -300 600 600" className="h-[300px] w-[300px] sm:h-[420px] sm:w-[420px]">
        {/* outer fine ring */}
        <circle r="280" fill="none" stroke="#C79D4B" strokeOpacity="0.32" strokeWidth="1" />
        {/* rotating dashed ring */}
        <motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={reduce ? undefined : { duration: 120, ease: "linear", repeat: Infinity }}
          style={reduce ? undefined : { originX: "0px", originY: "0px" }}
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
        {/* inner ring */}
        <circle r="132" fill="none" stroke="#C79D4B" strokeOpacity="0.22" strokeWidth="1" />

        {/* vertical bar band — chord-following heights */}
        <g stroke="#C79D4B" strokeWidth="1.25" strokeLinecap="round">
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
        <path
          d="M -258 138 A 294 294 0 0 1 138 -258"
          fill="none"
          stroke="#C79D4B"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="-258" cy="138" r="3.5" fill="#C79D4B" />
        <circle cx="138" cy="-258" r="3.5" fill="#C79D4B" />
        <circle cx="0" cy="0" r="4" fill="#C79D4B" />
      </svg>
    </div>
  );
}
