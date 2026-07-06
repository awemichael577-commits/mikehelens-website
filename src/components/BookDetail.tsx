import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { BuyOptions } from "@/components/BuyOptions";
import { Button } from "@/components/Button";
import { TestimonialCard } from "@/components/TestimonialCard";
import { getPublicMediaUrl } from "@/lib/media";
import type { Book, SiteSettings } from "@/lib/types";

export function BookDetail({
  book,
  settings,
  relatedBooks = [],
}: {
  book: Book;
  settings?: SiteSettings;
  relatedBooks?: Book[];
}) {
  const whatsapp = settings?.whatsapp ?? "";
  const hook = book.hook || book.description;
  const authorImage = settings ? getPublicMediaUrl(settings.portraitPath) : undefined;

  return (
    <article>
      <section className="bg-[radial-gradient(circle_at_10%_10%,rgba(201,162,75,0.14),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#F7F8FA_100%)] pt-[76px]">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 sm:px-8 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-[88px] lg:pt-[72px]">
          <div className="mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-[450px]">
            <div className="rounded-[26px] border border-white/70 bg-white p-3 shadow-[0_24px_60px_rgba(18,41,75,0.18)]">
              <div className="relative aspect-[2/3] max-h-[620px] overflow-hidden rounded-[20px] bg-[#f4efe5]">
                <Image
                  src={book.coverImage}
                  alt={book.coverAlt || `${book.title} book cover`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 450px, 90vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="max-w-[720px]">
            <Link
              href="/books"
              className="mb-5 inline-flex w-fit text-sm font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
            >
              Back to Books
            </Link>
            {book.category ? (
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
                {book.category}
              </p>
            ) : null}
            <h1 className="mt-5 font-serif text-[clamp(3rem,5vw,4.5rem)] font-bold leading-[1.05] text-navy-deep">
              {book.title}
            </h1>
            {book.subtitle ? (
              <p className="mt-3 text-2xl font-bold text-navy-soft">{book.subtitle}</p>
            ) : null}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{hook}</p>
            <p className="mt-6 text-2xl font-black text-navy-deep">
              {book.priceDisplay ?? "Price coming soon"}
            </p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <BuyOptions selarUrl={book.selarUrl} amazonUrl={book.amazonUrl} whatsapp={whatsapp} />
            </div>
            <ul className="mt-6 grid gap-3 text-sm font-bold text-navy-deep sm:grid-cols-3">
              {["Secure purchase link", "WhatsApp support available", "Digital delivery where available"].map(
                (item) => (
                  <li key={item} className="rounded-full bg-white/80 px-4 py-2 text-center shadow-sm ring-1 ring-line">
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-[52px] lg:py-[72px]">
        <div className="mx-auto grid max-w-[1200px] gap-7 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <article className="rounded-[24px] border border-line bg-white p-6 shadow-[0_14px_38px_rgba(18,41,75,0.08)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">
              Who this is for
            </p>
            <p className="mt-5 text-[1.05rem] leading-[1.8] text-muted">
              {book.audience || "Details coming soon."}
            </p>
          </article>

          <article className="rounded-[24px] border border-line bg-white p-6 shadow-[0_14px_38px_rgba(18,41,75,0.08)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">
              What readers will gain
            </p>
            {book.benefits.length ? (
              <ul className="mt-5 grid gap-4">
                {book.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-navy-deep">
                    <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-navy-deep">
                      &#10003;
                    </span>
                    <span className="leading-7">{benefit}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-[1.05rem] leading-[1.8] text-muted">Details coming soon.</p>
            )}
          </article>
        </div>
      </section>

      {book.description ? (
        <section className="bg-white py-[52px] lg:py-[72px]">
          <div className="mx-auto max-w-[760px] px-5 text-center sm:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
              About this book
            </p>
            <div className="mx-auto mt-4 h-px w-20 bg-gold" />
            <p className="mt-6 text-[1.08rem] leading-[1.85] text-muted">{book.description}</p>
          </div>
        </section>
      ) : null}

      {book.testimonials?.length ? (
        <section className="bg-navy-deep py-16 text-white lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Book testimonials
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Early reader responses.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {book.testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={{
                    quote: testimonial.quote,
                    name: testimonial.role ? `${testimonial.name}, ${testimonial.role}` : testimonial.name,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {settings ? (
        <section className="bg-bg-alt py-[52px] lg:py-[72px]">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 sm:px-8 md:grid-cols-[260px_1fr] md:items-center lg:px-10">
            <div className="mx-auto w-full max-w-[260px] rounded-[24px] border border-line bg-white p-2 shadow-[0_14px_38px_rgba(18,41,75,0.12)] md:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#eef1ec]">
                <Image
                  src={authorImage ?? ""}
                  alt={settings.authorName}
                  fill
                  sizes="260px"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="max-w-[760px]">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
                About the author
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-navy-deep">
                {settings.authorName}
              </h2>
              <p className="mt-5 text-[1.08rem] leading-[1.8] text-muted">{settings.aboutBio}</p>
              <div className="mt-6">
                <Button href="/about">Read about the author</Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white px-5 py-[52px] sm:px-8 lg:py-[72px]">
        <div className="mx-auto max-w-[1200px] rounded-[28px] bg-navy-deep p-6 text-white shadow-[0_20px_55px_rgba(18,41,75,0.16)] sm:p-8 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1]">
                Ready to get {book.title}?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">
                {hook}
              </p>
            </div>
            <BuyOptions selarUrl={book.selarUrl} amazonUrl={book.amazonUrl} whatsapp={whatsapp} />
          </div>
        </div>
      </section>

      {relatedBooks.length ? (
        <section className="bg-bg-alt py-[52px] lg:py-[72px]">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
              Related books
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {relatedBooks.map((relatedBook) => (
                <BookCard
                  key={relatedBook.id}
                  title={relatedBook.title}
                  subtitle={relatedBook.subtitle ?? ""}
                  category={relatedBook.category || (relatedBook.featured ? "Featured Book" : "Book")}
                  hook={relatedBook.hook || relatedBook.description}
                  priceDisplay={relatedBook.priceDisplay ?? "Price coming soon"}
                  coverImage={relatedBook.coverImage}
                  coverAlt={relatedBook.coverAlt || `${relatedBook.title} book cover`}
                  detailHref={`/books/${relatedBook.slug}`}
                  purchaseOptions={{
                    selarUrl: relatedBook.selarUrl,
                    amazonUrl: relatedBook.amazonUrl,
                    whatsapp,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
