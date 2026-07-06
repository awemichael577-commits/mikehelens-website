import type { Metadata } from "next";
import Image from "next/image";
import { BookGrid } from "@/components/BookGrid";
import { BuyOptions } from "@/components/BuyOptions";
import { Button } from "@/components/Button";
import { EmailSignup } from "@/components/EmailSignup";
import { siteConfig } from "@/data/site";
import { getPublicMediaUrl } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import {
  getPublishedBooks,
  getSiteSettings,
  getSiteTestimonials,
} from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Mikehelens Manuscripts & Publications | Faith-building Christian Books",
  description:
    "Faith-building books by Pastor Akinwumi Awe for Christian readers, families, and ministry-minded believers.",
});

const fallbackTestimonials = [
  {
    id: "ministry-leader",
    quote: "A faith-building testimony that encourages readers to trust God's leading.",
    name: "Name",
    role: "Ministry Leader",
  },
  {
    id: "reader",
    quote: "Warm, clear, and deeply useful for couples and families.",
    name: "Name",
    role: "Reader",
  },
  {
    id: "pastor",
    quote: "A timely resource for believers seeking spiritual understanding.",
    name: "Name",
    role: "Pastor",
  },
];

export default async function HomePage() {
  const [publishedBooks, settings, testimonials] = await Promise.all([
    getPublishedBooks(),
    getSiteSettings(),
    getSiteTestimonials(),
  ]);

  const featuredBook = publishedBooks.find((book) => book.featured) ?? publishedBooks[0] ?? null;
  const readerVoices = testimonials.length ? testimonials : fallbackTestimonials;
  const whatsapp = settings.whatsapp || siteConfig.whatsappNumber;
  const heroImage = getPublicMediaUrl(settings.heroImagePath);
  const portraitImage = getPublicMediaUrl(settings.portraitPath);
  const heroTrustCues = settings.heroTrustCue
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <>
      <section className="bg-white pt-[76px]">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:items-center lg:gap-12 lg:px-12 lg:pb-[72px] lg:pt-[64px]">
          <div className="min-w-0">
            <Image
              src="/assets/logo-full.png"
              alt={`${siteConfig.wordmark} logo`}
              width={2000}
              height={1871}
              priority
              className="mb-7 h-28 w-auto sm:h-32"
            />
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
              Christian books for faith, family, and testimony
            </p>
            <h1 className="mt-5 max-w-[720px] font-serif text-[clamp(3rem,5vw,4.5rem)] font-bold leading-[1.05] text-navy-deep">
              {settings.heroHeadline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              {settings.heroSubheadline}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/books">{settings.heroCtaText || "Explore the books"}</Button>
              <Button href="/about" variant="secondary">
                About the author
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-navy-deep">
              {(heroTrustCues.length
                ? heroTrustCues
                : ["Secure purchase links", "WhatsApp support", "Faith and family resources"]
              ).map((item) => (
                <li key={item} className="rounded-full bg-gold-pale px-4 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[540px] overflow-visible pb-14 sm:pb-16 lg:pb-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-bg-alt shadow-soft">
              <Image
                src={heroImage}
                alt="Pastor Akinwumi Awe and his wife"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute bottom-2 right-3 flex items-end gap-3 sm:bottom-1 sm:right-5 lg:bottom-0 lg:right-6">
              {publishedBooks.slice(0, 2).map((book, index) => (
                <div
                  key={book.slug}
                  className={`relative aspect-[2/3] overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-white/80 ${
                    index === 0
                      ? "z-10 w-28 sm:w-[8.5rem] lg:w-[9.5rem]"
                      : "w-24 translate-y-4 sm:w-[7.5rem] lg:w-[8.5rem]"
                  }`}
                >
                  <Image
                    src={book.coverImage}
                    alt={book.coverAlt || `${book.title} cover`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featuredBook ? (
        <section className="bg-bg-alt py-11 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-12">
            <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px] overflow-hidden rounded-[1.5rem] bg-white shadow-soft">
              <Image
                src={featuredBook.coverImage}
                alt={featuredBook.coverAlt || `${featuredBook.title} cover`}
                fill
                sizes="(min-width: 1024px) 32vw, 90vw"
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
                Featured book
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold text-navy-deep sm:text-5xl">
                {featuredBook.title}
              </h2>
              {featuredBook.subtitle ? (
                <p className="mt-3 text-xl font-bold text-navy-soft">{featuredBook.subtitle}</p>
              ) : null}
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                {featuredBook.hook || featuredBook.description}
              </p>
              <ul className="mt-5 grid gap-3">
                {featuredBook.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 leading-7 text-muted">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-lg font-black text-navy-deep">
                {featuredBook.priceDisplay ?? "Price coming soon"}
              </p>
              <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button href={`/books/${featuredBook.slug}`} variant="secondary">
                  View details
                </Button>
                <BuyOptions
                  selarUrl={featuredBook.selarUrl}
                  amazonUrl={featuredBook.amazonUrl}
                  whatsapp={whatsapp}
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-11 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl font-bold text-navy-deep sm:text-5xl">
              Choose a book for your season
            </h2>
          </div>
        </div>
        <div className="mt-8">
          <BookGrid books={publishedBooks} whatsapp={whatsapp} />
        </div>
      </section>

      <section className="bg-bg-alt py-11 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12 lg:px-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_14px_38px_rgba(18,41,75,0.12)] lg:mx-0 lg:max-w-[430px]">
            <Image
              src={portraitImage}
              alt="Pastor Akinwumi Awe and his wife"
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="max-w-[680px]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
              About the author
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-navy-deep">
              {settings.authorName}
            </h2>
            <p className="mt-4 text-[1.1rem] leading-[1.8] text-muted">
              {settings.aboutBio}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/about">Read about the author</Button>
              <Button
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                Contact on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-11 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <h2 className="max-w-3xl font-serif text-4xl font-bold text-navy-deep sm:text-5xl">
            Words from readers and ministry leaders
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {readerVoices.slice(0, 3).map((testimonial) => (
              <figure key={testimonial.id} className="rounded-2xl bg-gold-pale p-5 sm:p-6">
                <blockquote className="leading-7 text-navy-deep">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm font-bold text-muted">
                  {testimonial.name}
                  {"role" in testimonial && testimonial.role ? ` · ${testimonial.role}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <EmailSignup />
    </>
  );
}
