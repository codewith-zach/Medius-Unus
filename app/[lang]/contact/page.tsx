import { Phone, Mail, CalendarDays, ArrowUpRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { ContourLines } from "@/components/contour-lines";
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
      external: false,
    },
    {
      href: `mailto:${c.site.email}`,
      icon: Mail,
      label: t.email,
      value: c.site.email,
      external: false,
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
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -left-28 -bottom-24 h-72 w-[45%]"
          stroke="#0C2A1E"
          opacity={0.05}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <SectionHeading eyebrow={t.hero.eyebrow} title={t.directTitle} />
            <div className="mt-8 space-y-4">
              {channels.map((ch, i) => (
                <Reveal key={ch.label} delay={i * 0.06}>
                  <a
                    href={ch.href}
                    {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-5 rounded border border-sand bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_14px_36px_rgba(12,42,30,0.10)]"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-cream transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10">
                      <ch.icon className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        {ch.label}
                      </span>
                      <span className="mt-0.5 block truncate font-medium text-navy">{ch.value}</span>
                    </span>
                    {ch.external && (
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-deepgold/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-deepgold"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    )}
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t.caution}</p>
            </Reveal>
          </div>

          <div>
            <SectionHeading eyebrow={t.hero.eyebrow} title={t.formTitle} />
            <Reveal className="corner-marks mt-8 rounded border border-sand bg-sand/30 p-6 sm:p-8">
              <ContactForm lang={lang} strings={c.form} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
