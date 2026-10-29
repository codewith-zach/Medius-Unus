import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function CtaSection({
  title = "Have a project, partnership or opportunity to discuss?",
  description = "Whether you are exploring the Nigerian market, considering a strategic transaction, seeking support for a complex programme or looking to connect with relevant expertise, Medius Unus welcomes an initial conversation about your objectives and possible next steps.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            {title}
          </h2>
          <div className="gold-rule mx-auto mt-6 w-16" aria-hidden />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-[#d8ac58]"
            >
              Make an Enquiry
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link
              href="/contact?intent=partnership"
              className="inline-flex items-center gap-2 rounded border border-gold/60 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
            >
              <Handshake className="h-4 w-4" strokeWidth={1.5} />
              Discuss a Partnership
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
