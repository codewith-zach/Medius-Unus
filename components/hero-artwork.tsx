"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Abstract brand motif for the hero: fine gold concentric rings with a
 * band of vertical bars whose heights follow the circle's chord — an
 * echo of the emblem's geometry. The outer ring drifts subtly with
 * scroll; the dashed ring rotates almost imperceptibly.
 */
export function HeroArtwork({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [0, -40]);

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
      ref={ref}
      className={`relative select-none ${className}`}
      role="img"
      aria-label="Abstract geometric motif echoing the Medius Unus emblem"
    >
      <motion.div style={reduce ? undefined : { y: drift }}>
        <svg
          viewBox="-300 -300 600 600"
          className="h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] lg:h-[480px] lg:w-[480px]"
        >
          {/* outer fine ring */}
          <circle r="280" fill="none" stroke="#C79D4B" strokeOpacity="0.32" strokeWidth="1" />
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
          <motion.path
            d="M -258 138 A 294 294 0 0 1 138 -258"
            fill="none"
            stroke="#C79D4B"
            strokeOpacity="0.65"
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
          {/* softly pulsing centre node */}
          <motion.circle
            cx="0"
            cy="0"
            r="4"
            fill="#C79D4B"
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
