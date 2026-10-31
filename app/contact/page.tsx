import type { Metadata } from "next";
import { Phone, Mail, CalendarDays } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { ContourLines } from "@/components/contour-lines";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Medius Unus Nigeria Limited — telephone, email and a short, privacy-conscious enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation"
        description="Whether you are exploring the Nigerian market, considering a strategic transaction or seeking support for a complex programme, we welcome an initial conversation about your objectives."
      />

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -left-28 -bottom-24 h-72 w-[45%]"
          stroke="#0D2B1F"
          opacity={0.05}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <SectionHeading eyebrow="Direct contact" title="Reach us directly" />
            <Reveal className="mt-8 space-y-6">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 rounded border border-sand bg-white p-5 transition-colors hover:border-gold"
              >
                <Phone className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                <span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Telephone
                  </span>
                  <span className="font-medium text-navy">{site.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded border border-sand bg-white p-5 transition-colors hover:border-gold"
              >
                <Mail className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                <span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Email
                  </span>
                  <span className="font-medium text-navy">{site.email}</span>
                </span>
              </a>
              <a
                href={site.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded border border-sand bg-white p-5 transition-colors hover:border-gold"
              >
                <CalendarDays className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                <span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Consultation
                  </span>
                  <span className="font-medium text-navy">Book a consultation</span>
                </span>
              </a>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Please do not send confidential transaction documents at the initial
                stage. Further information is shared only after internal review and any
                required confidentiality arrangements.
              </p>
            </Reveal>
          </div>

          <div>
            <SectionHeading eyebrow="Enquiry form" title="Make an enquiry" />
            <Reveal className="mt-8 rounded border border-sand bg-sand/30 p-6 sm:p-8">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
