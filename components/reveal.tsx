"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-triggered reveal. `variant` picks the choreography:
 *  - "up"   fade + rise (default, headings and copy)
 *  - "fade" opacity only (slow sections, layered furniture)
 *  - "clip" curtain wipe from bottom (photography plates)
 */
export function Reveal({
  children,
  delay = 0,
  className,
  variant = "up",
  duration,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "up" | "fade" | "clip";
  duration?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const hidden =
    variant === "up"
      ? { opacity: 0, y: 28 }
      : variant === "clip"
        ? { opacity: 1, clipPath: "inset(16% 0 0 0)" }
        : { opacity: 0 };
  const visible =
    variant === "up"
      ? { opacity: 1, y: 0 }
      : variant === "clip"
        ? { opacity: 1, clipPath: "inset(0% 0 0 0)" }
        : { opacity: 1 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: duration ?? (variant === "clip" ? 0.9 : 0.65),
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
