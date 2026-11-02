import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-ink-gradient px-4 pb-24 pt-44 text-center">
      <p className="font-heading text-6xl font-semibold text-gold">404</p>
      <h1 className="mt-4 font-heading text-3xl font-semibold text-cream">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/70">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/en"
          className="rounded border border-gold/60 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
        >
          Back to home (EN)
        </Link>
        <Link
          href="/fr"
          className="rounded border border-gold/60 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
        >
          Retour à l&apos;accueil (FR)
        </Link>
      </div>
    </section>
  );
}
