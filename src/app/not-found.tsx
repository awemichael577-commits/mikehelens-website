import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg-alt px-5 py-24 sm:px-8">
      <section className="mx-auto max-w-2xl rounded-[28px] border border-line bg-white p-8 text-center shadow-[0_14px_34px_rgba(18,41,75,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
          Page not found
        </p>
        <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] text-navy-deep">
          This page is not available.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-muted">
          The page may have moved, or the link may no longer be active.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Go home
        </Link>
      </section>
    </main>
  );
}
