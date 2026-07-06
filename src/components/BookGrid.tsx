import { BookCard } from "@/components/BookCard";
import { siteConfig } from "@/data/site";
import type { Book } from "@/lib/types";

export function BookGrid({ books, whatsapp }: { books: Book[]; whatsapp?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
      <div className="grid items-stretch gap-7 lg:grid-cols-2">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            subtitle={book.subtitle ?? ""}
            category={book.category || (book.featured ? "Featured Book" : "Book")}
            hook={book.hook || book.description}
            priceDisplay={book.priceDisplay ?? "Price coming soon"}
            coverImage={book.coverImage}
            coverAlt={book.coverAlt || `${book.title} book cover`}
            detailHref={`/books/${book.slug}`}
            purchaseOptions={{
              selarUrl: book.selarUrl,
              amazonUrl: book.amazonUrl,
              whatsapp: whatsapp || siteConfig.whatsappNumber,
            }}
          />
        ))}
      </div>
      {books.length === 0 ? (
        <p className="rounded-2xl border border-gold-pale bg-white p-8 text-muted">
          No published books are available yet.
        </p>
      ) : null}
    </section>
  );
}
