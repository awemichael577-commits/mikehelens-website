import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site";
import { getPublicMediaUrl } from "@/lib/media";
import type { Book } from "@/lib/types";
import type { SiteSettings } from "@/lib/types";

export function Hero({
  featuredBook,
  settings,
}: {
  featuredBook?: Book | null;
  settings?: SiteSettings;
}) {
  const headline = settings?.heroHeadline || siteConfig.pastorName;
  const subheadline = settings?.heroSubheadline || siteConfig.tagline;
  const ctaText = settings?.heroCtaText || "Browse Books";
  const heroImage = getPublicMediaUrl(settings?.heroImagePath || siteConfig.portraitImage);

  return (
    <section className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#fffaf0_0%,#fff3d9_48%,#eaf0ff_100%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.88fr] lg:px-12 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
            Nigerian pastor and author
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-[1.02] text-navy-deep sm:text-6xl lg:text-7xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-muted">
            {subheadline}
          </p>
          {settings?.heroTrustCue ? (
            <p className="mt-4 max-w-2xl text-sm font-bold text-navy-deep">
              {settings.heroTrustCue}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/books">
              {ctaText}
            </Button>
            <Button href="/about" variant="secondary">
              About the Author
            </Button>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-[0.8fr_1fr] lg:grid-cols-1">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] bg-navy-deep shadow-soft">
            <Image
              src={heroImage}
              alt={`Portrait placeholder for ${settings?.authorName || siteConfig.pastorName}`}
              fill
              priority
              className="object-cover"
            />
          </div>
          {featuredBook ? (
            <div className="rounded-[2rem] border border-gold-pale bg-white p-5 shadow-soft sm:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-dark">
                Featured
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-navy-deep">
                {featuredBook.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">{featuredBook.subtitle}</p>
              <Link
                href={`/books/${featuredBook.slug}`}
                className="mt-5 inline-flex font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
              >
                See purchase options
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
