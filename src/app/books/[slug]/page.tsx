import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookDetail } from "@/components/BookDetail";
import { pageMetadata } from "@/lib/metadata";
import {
  getBookBySlug,
  getOtherPublishedBooks,
  getPublishedBookSlugs,
  getSiteSettings,
} from "@/lib/queries";

type BookDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublishedBookSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BookDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    return pageMetadata({
      title: "Book Not Found",
      description: "The requested book could not be found.",
      path: "/books",
    });
  }

  return pageMetadata({
    title: book.title,
    description: book.subtitle ?? book.description,
    path: `/books/${book.slug}`,
    image: book.coverImage,
    imageAlt: book.coverAlt || `${book.title} book cover`,
  });
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const [settings, relatedBooks] = await Promise.all([
    getSiteSettings(),
    getOtherPublishedBooks(book.id, 2),
  ]);

  return <BookDetail book={book} settings={settings} relatedBooks={relatedBooks} />;
}
