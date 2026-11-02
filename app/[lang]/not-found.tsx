import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grain relative overflow-hidden bg-ink-gradient px-5 pb-28 pt-48 text-center">
      <div aria-hidden className="hairline-grid absolute inset-0" />
      <div className="relative mx-auto max-w-xl">
        <p className="font-heading text-8xl font-light italic leading-none text-gold sm:text-9xl">
          404
        </p>
        <div className="gold-rule mx-auto mt-10 w-16" aria-hidden />
        <h1 className="mt-8 font-heading text-3xl font-light text-cream sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-[1.8] text-cream/65">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/en"
            className="btn-line-light inline-flex items-center justify-center px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
          >
            Back to home (EN)
          </Link>
          <Link
            href="/fr"
            className="inline-flex items-center justify-center px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/60 transition-colors hover:text-gold"
          >
            Retour à l&apos;accueil (FR)
          </Link>
        </div>
      </div>
    </section>
  );
}
