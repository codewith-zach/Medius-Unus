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
    <Reveal delay={index * 0.1}>
      <div className="group flex h-full flex-col rounded border border-sand bg-white p-8 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_16px_40px_rgba(13,43,31,0.10)]">
        <div className="flex items-center gap-6">
          <Image
            src={leader.photo}
            alt={`Portrait of ${leader.name}`}
            width={192}
            height={192}
            className="h-20 w-20 shrink-0 rounded-full border border-gold/50 object-cover transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24"
          />
          <div>
            <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.06em] text-navy">
              {leader.name}
            </h3>
            <p className="mt-2 text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-deepgold">
              {leader.title}
            </p>
          </div>
        </div>
        <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {leader.short}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <button className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-deepgold transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {readLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[82vh]! w-[calc(100%-2.5rem)]! max-w-4xl! overflow-y-auto rounded-2xl border-sand bg-white p-0 [&>button]:rounded-full [&>button]:text-navy hover:[&>button]:bg-sand/60">
            {/* Centered portrait-first header: photo → title → name */}
            <div className="border-b border-gold/40 px-7 pb-8 pt-10 text-center sm:px-12 sm:pb-10 sm:pt-12">
              <Image
                src={leader.photo}
                alt={`Portrait of ${leader.name}`}
                width={320}
                height={320}
                className="mx-auto h-28 w-28 rounded-full border-2 border-gold/60 object-cover sm:h-36 sm:w-36"
              />
              <DialogDescription className="mx-auto mt-6 max-w-md text-[0.62rem] font-semibold uppercase leading-snug tracking-[0.18em] text-deepgold sm:text-[0.7rem]">
                {leader.title}
              </DialogDescription>
              <DialogTitle className="mt-3 font-heading text-3xl font-semibold uppercase leading-tight tracking-[0.06em] text-navy sm:text-4xl">
                {leader.name}
              </DialogTitle>
            </div>
            <div className="space-y-6 px-7 py-8 sm:px-12 sm:py-10">
              {leader.full.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-foreground sm:text-[1.05rem] sm:leading-[1.75]">
                  {para}
                </p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Reveal>
  );
}
