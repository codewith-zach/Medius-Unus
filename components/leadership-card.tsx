"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/reveal";
import type { Leader } from "@/lib/content";

/**
 * Editorial leadership profile: portrait plate with warm hover,
 * serif name, small-caps mandate list and a discreet profile dialog.
 * The dialog keeps its owner-approved centered, portrait-first layout.
 */
export function LeadershipCard({
  leader,
  index,
  readLabel,
}: {
  leader: Leader;
  index: number;
  readLabel: string;
}) {
  return (
    <Reveal delay={index * 0.12}>
      <article className="group relative border-t border-navy/15 pt-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
          <div className="relative shrink-0">
            <div className="plate w-36 sm:w-44">
              <Image
                src={leader.photo}
                alt={`Portrait of ${leader.name}`}
                width={440}
                height={520}
                sizes="(min-width: 640px) 176px, 144px"
                className="img-editorial aspect-[4/5] w-full object-cover grayscale-[0.35] transition-all duration-700 group-hover:grayscale-0"
              />
            </div>
            <span
              aria-hidden
              className="absolute -top-8 left-0 font-heading text-sm font-light italic tracking-wide text-gold"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-[1.7rem] font-medium leading-tight tracking-[-0.01em] text-navy sm:text-[2rem]">
              {leader.name}
            </h3>
            <p className="mt-3 text-[0.62rem] font-semibold uppercase leading-[1.9] tracking-[0.2em] text-deepgold">
              {leader.title}
            </p>
            <p className="mt-5 text-sm leading-[1.8] text-muted-foreground">
              {leader.short}
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <button className="mt-6 inline-flex items-center gap-2 border-b border-gold/60 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:border-gold hover:text-deepgold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {readLabel}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[82vh]! w-[calc(100%-2.5rem)]! max-w-4xl! overflow-y-auto border-sand bg-cream p-0 [&>button]:rounded-full [&>button]:text-navy hover:[&>button]:bg-sand/60">
                {/* Centered portrait-first header (owner-approved layout) */}
                <div className="border-b border-gold/40 px-7 pb-8 pt-10 text-center sm:px-12 sm:pb-10 sm:pt-12">
                  <Image
                    src={leader.photo}
                    alt={`Portrait of ${leader.name}`}
                    width={320}
                    height={320}
                    className="mx-auto h-28 w-28 border border-gold/60 object-cover sm:h-36 sm:w-36"
                  />
                  <DialogDescription className="mx-auto mt-6 max-w-md text-[0.62rem] font-semibold uppercase leading-snug tracking-[0.18em] text-deepgold sm:text-[0.7rem]">
                    {leader.title}
                  </DialogDescription>
                  <DialogTitle className="mt-3 font-heading text-3xl font-medium uppercase leading-tight tracking-[0.04em] text-navy sm:text-4xl">
                    {leader.name}
                  </DialogTitle>
                </div>
                <div className="space-y-6 px-7 py-8 sm:px-12 sm:py-10">
                  {leader.full.map((para, i) => (
                    <p key={i} className="text-[0.95rem] leading-[1.85] text-foreground sm:text-base sm:leading-[1.85]">
                      {para}
                    </p>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
