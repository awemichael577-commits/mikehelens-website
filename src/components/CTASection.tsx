import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export function CTASection({ title, description, href, label }: CTASectionProps) {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] bg-gold-pale p-8 shadow-soft sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold leading-tight text-navy-deep sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">{description}</p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
