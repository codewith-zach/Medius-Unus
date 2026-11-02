import type { Metadata } from "next";
import { Phone, Mail, CalendarDays, ArrowUpRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { getContent, isLang, defaultLang } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: getContent(lang).contactPage.hero.title };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : defaultLang;
  const c = getContent(lang);
  const t = c.contactPage;

  const channels = [
    {
      href: `tel:${c.site.phone.replace(/\s/g, "")}`,
      icon: Phone,
      label: t.telephone,
      value: c.site.phone,
    },
    {
      href: `mailto:${c.site.email}`,
      icon: Mail,
      label: t.email,
      value: c.site.email,
    },
    {
      href: "https://cal.com/medius-unus/consultation",
      icon: CalendarDays,
      label: t.consultation,
      value: t.book,
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        description={t.hero.description}
      />

      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden className="hairline-grid-ink absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
          {/* Direct channels */}
          <div>
            <SectionHeading chapter="01" eyebrow={t.hero.eyebrow} title={t.directTitle} />
            <div className="mt-12 border-t border-navy/15">
              {channels.map((ch, i) => (
                <Reveal key={ch.label} delay={i * 0.07}>
                  <a
                    href={ch.href}
                    {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-6 border-b border-navy/15 py-6 transition-colors hover:border-gold"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-navy/15 text-deepgold transition-colors group-hover:border-gold/60 group-hover:text-gold">
                      <ch.icon className="h-5 w-5" strokeWidth={1.25} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                        {ch.label}
                      </span>
                      <span className="mt-1.5 block truncate font-heading text-lg font-medium text-navy">
                        {ch.value}
                      </span>
                    </span>
                    {ch.external && (
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-navy/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                        strokeWidth={1.5}
                      />
                    )}
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-8 border-l-2 border-gold bg-sand/50 px-6 py-5 text-[0.83rem] leading-[1.75] text-muted-foreground">
                {t.caution}
              </p>
            </Reveal>
          </div>

          {/* Enquiry form */}
          <div>
            <SectionHeading chapter="02" eyebrow={t.hero.eyebrow} title={t.formTitle} />
            <Reveal delay={0.1} className="mt-12">
              <div className="border border-navy/15 bg-card p-7 shadow-[0_30px_60px_-40px_rgba(12,42,30,0.35)] sm:p-10">
                <div aria-hidden className="rule-double mb-9 w-full text-navy/25" />
                <ContactForm lang={lang} strings={c.form} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
