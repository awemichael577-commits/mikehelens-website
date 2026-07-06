import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { BookDetail } from "@/components/BookDetail";
import { getAdminPreviewBookById, getOtherPublishedBooks, getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

type PreviewBookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PreviewBookPage({ params }: PreviewBookPageProps) {
  const { id } = await params;
  const book = await getAdminPreviewBookById(id);

  if (!book) {
    notFound();
  }

  const [settings, relatedBooks] = await Promise.all([
    getSiteSettings(),
    getOtherPublishedBooks(book.id, 2),
  ]);

  return (
    <AdminShell>
      <div className="mb-6 rounded-2xl border border-gold-pale bg-gold-pale p-5">
        <p className="text-sm font-bold text-navy-deep">
          Previewing {book.status} content. This page is admin-only and does not publish the book.
        </p>
        <Link
          href={`/admin/books/${book.id}/edit`}
          className="mt-3 inline-flex font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
        >
          Back to edit
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <BookDetail book={book} settings={settings} relatedBooks={relatedBooks} />
      </div>
    </AdminShell>
  );
}
