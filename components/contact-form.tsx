"use client";

import { Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const enquiryTypes = [
  { value: "services", label: "Services" },
  { value: "partnership", label: "Partnership" },
  { value: "investment", label: "Investment opportunity" },
  { value: "other", label: "Other" },
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  organisation: z.string().optional(),
  email: z.string().email("Please enter a valid work email address."),
  telephone: z.string().optional(),
  enquiryType: z.enum(["services", "partnership", "investment", "other"], {
    message: "Please select an enquiry type.",
  }),
  message: z.string().min(20, "Please briefly describe your enquiry (at least 20 characters)."),
  privacy: z.literal(true, {
    message: "Please acknowledge the privacy notice to continue.",
  }),
  companyWebsite: z.string().max(200).optional(), // honeypot — humans never see it
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  );
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const defaultIntent = searchParams.get("intent");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
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
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: mountedAt.current }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "The enquiry could not be delivered. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError(
        "A network error occurred. Please check your connection and try again."
      );
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
          Thank you — your enquiry has been received.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          A member of the Medius Unus team will review your message and respond in due
          course. Please do not send confidential transaction documents at this stage.
        </p>
      </div>
    );
  }

  const err = (msg?: string) =>
    msg ? (
      <p id={`err-${msg.length}`} className="mt-1 text-sm text-destructive" role="alert">
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
          <Label htmlFor="fullName">Full name *</Label>
          <Input
            id="fullName"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            className="mt-1.5 h-11 bg-white"
            {...register("fullName")}
          />
          {err(errors.fullName?.message)}
        </div>
        <div>
          <Label htmlFor="organisation">Organisation</Label>
          <Input
            id="organisation"
            autoComplete="organization"
            className="mt-1.5 h-11 bg-white"
            {...register("organisation")}
          />
        </div>
        <div>
          <Label htmlFor="email">Work email *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="mt-1.5 h-11 bg-white"
            {...register("email")}
          />
          {err(errors.email?.message)}
        </div>
        <div>
          <Label htmlFor="telephone">Telephone</Label>
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
        <Label htmlFor="enquiryType">Enquiry type *</Label>
        <select
          id="enquiryType"
          aria-invalid={!!errors.enquiryType}
          defaultValue=""
          {...register("enquiryType")}
          className="mt-1.5 h-11 w-full rounded-md border border-input bg-white px-3 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="" disabled>
            Select an enquiry type
          </option>
          {enquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {err(errors.enquiryType?.message)}
      </div>

      <div>
        <Label htmlFor="message">Brief message *</Label>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          className="mt-1.5 h-11 bg-white"
          {...register("message")}
        />
        {err(errors.message?.message)}
      </div>

      <div>
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            id="privacyConsent"
            className="mt-1 h-4 w-4 accent-[#7A5A1A]"
            aria-invalid={!!errors.privacy}
            {...register("privacy")}
          />
          <label htmlFor="privacyConsent">
            I understand that Medius Unus will use the information I provide solely to
            respond to this enquiry, in line with the company&apos;s privacy notice. I
            will not submit confidential transaction documents at this stage. *
          </label>
        </div>
        {err(errors.privacy?.message)}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-navy text-cream hover:bg-navy/90 sm:w-auto"
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={1.5} />}
        {isSubmitting ? "Sending…" : "Submit Enquiry"}
      </Button>
    </form>
  );
}
