import { Phone, Mail, CalendarDays } from "lucide-react";
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

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="relative overflow-hidden bg-cream">
        <ContourLines
          className="pointer-events-none absolute -left-28 -bottom-24 h-72 w-[45%]"
          stroke="#0D2B1F"
          opacity={0.05}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <SectionHeading eyebrow={t.hero.eyebrow} title={t.directTitle} />
            <Reveal className="mt-8 space-y-6">
              <a
                href={`tel:${c.site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 rounded border border-sand bg-white p-5 transition-colors hover:border-gold"
              >
                <Phone className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                <span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {t.telephone}
                  </span>
                  <span className="font-medium text-navy">{c.site.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${c.site.email}`}
                className="flex items-center gap-4 rounded border border-sand bg-white p-5 transition-colors hover:border-gold"
              >
                <Mail className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                <span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {t.email}
                  </span>
                  <span className="font-medium text-navy">{c.site.email}</span>
                </span>
              </a>
              <a
                href="https://cal.com/medius-unus/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded border border-sand bg-white p-5 transition-colors hover:border-gold"
              >
                <CalendarDays className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
                <span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {t.consultation}
                  </span>
                  <span className="font-medium text-navy">{t.book}</span>
                </span>
              </a>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.caution}</p>
            </Reveal>
          </div>

          <div>
            <SectionHeading eyebrow={t.hero.eyebrow} title={t.formTitle} />
            <Reveal className="mt-8 rounded border border-sand bg-sand/30 p-6 sm:p-8">
              <ContactForm lang={lang} strings={c.form} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
