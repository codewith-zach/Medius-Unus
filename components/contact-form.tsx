"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Content, Lang } from "@/lib/content";

type FormStrings = Content["form"];

const formSchema = z.object({
  fullName: z.string().min(2),
  organisation: z.string().optional(),
  email: z.string().email(),
  telephone: z.string().optional(),
  enquiryType: z.enum(["services", "partnership", "investment", "other"]),
  message: z.string().min(20),
  companyWebsite: z.string().max(200).optional(), // honeypot — humans never see it
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm({ lang, strings }: { lang: Lang; strings: FormStrings }) {
  return (
    <Suspense fallback={null}>
      <ContactFormInner lang={lang} strings={strings} />
    </Suspense>
  );
}

function ContactFormInner({ lang, strings }: { lang: Lang; strings: FormStrings }) {
  const searchParams = useSearchParams();
  const defaultIntent = searchParams.get("intent");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [consented, setConsented] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const consentRef = useRef<HTMLButtonElement>(null);

  // Deliberate deviation from idiomatic React: this listener is attached
  // natively rather than via onClick because some embedded webviews never
  // deliver element clicks to React's delegated root listener, which left
  // the consent control unusable there. Behavior is identical elsewhere.
  useEffect(() => {
    const el = consentRef.current;
    if (!el) return;
    const toggle = () => {
      setConsented((c) => !c);
      setConsentError(false);
    };
    el.addEventListener("click", toggle);
    return () => el.removeEventListener("click", toggle);
  }, []);
  const mountedAt = useRef(Date.now());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      enquiryType:
        defaultIntent === "partnership"
          ? "partnership"
          : defaultIntent === "investment"
            ? "investment"
            : undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    if (!consented) {
      setConsentError(true);
      return;
    }
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          privacy: true,
          lang,
          startedAt: mountedAt.current,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? strings.errors.server);
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError(strings.errors.network);
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded border border-gold/40 bg-sand/50 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-deepgold" strokeWidth={1.25} />
        <h3 className="mt-4 font-heading text-2xl font-semibold text-navy">
          {strings.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {strings.successBody}
        </p>
      </div>
    );
  }

  const err = (msg?: string) =>
    msg ? (
      <p className="mt-1 text-sm text-destructive" role="alert">
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {serverError && (
        <div role="alert" className="rounded border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          {serverError}
        </div>
      )}
      {/* Honeypot: invisible to humans; bots that fill it are discarded server-side */}
      <input
        type="text"
        {...register("companyWebsite")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">{strings.fullName} *</Label>
          <Input
            id="fullName"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            className="mt-1.5 h-11 bg-white"
            {...register("fullName")}
          />
          {err(errors.fullName ? strings.errors.fullName : undefined)}
        </div>
        <div>
          <Label htmlFor="organisation">{strings.organisation}</Label>
          <Input
            id="organisation"
            autoComplete="organization"
            className="mt-1.5 h-11 bg-white"
            {...register("organisation")}
          />
        </div>
        <div>
          <Label htmlFor="email">{strings.email} *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="mt-1.5 h-11 bg-white"
            {...register("email")}
          />
          {err(errors.email ? strings.errors.email : undefined)}
        </div>
        <div>
          <Label htmlFor="telephone">{strings.telephone}</Label>
          <Input
            id="telephone"
            type="tel"
            autoComplete="tel"
            className="mt-1.5 h-11 bg-white"
            {...register("telephone")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="enquiryType">{strings.enquiryType} *</Label>
        <select
          id="enquiryType"
          aria-invalid={!!errors.enquiryType}
          defaultValue=""
          {...register("enquiryType")}
          className="mt-1.5 h-11 w-full rounded-md border border-input bg-white px-3 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="" disabled>
            {strings.selectType}
          </option>
          {strings.types.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {err(errors.enquiryType ? strings.errors.enquiryType : undefined)}
      </div>

      <div>
        <Label htmlFor="message">{strings.message} *</Label>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          className="mt-1.5 bg-white"
          {...register("message")}
        />
        {err(errors.message ? strings.errors.message : undefined)}
      </div>

      <div>
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <button
            type="button"
            id="privacyConsent"
            ref={consentRef}
            role="checkbox"
            aria-checked={consented}
            aria-required="true"
            aria-invalid={consentError}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
              consented
                ? "border-deepgold bg-deepgold text-cream"
                : consentError
                  ? "border-destructive bg-white"
                  : "border-input bg-white"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
          >
            {consented && (
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            )}
          </button>
          <label htmlFor="privacyConsent" className="cursor-pointer">
            {strings.privacy} *
          </label>
        </div>
        {consentError && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {strings.errors.privacy}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-navy text-cream hover:bg-navy/90 sm:w-auto"
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={1.5} />}
        {isSubmitting ? strings.sending : strings.submit}
      </Button>
    </form>
  );
}
