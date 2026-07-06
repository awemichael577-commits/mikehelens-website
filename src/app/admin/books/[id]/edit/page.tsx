import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { BookForm } from "@/components/admin/BookForm";
import { getAdminBookById } from "@/lib/admin-books";

export const dynamic = "force-dynamic";

type EditBookPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditBookPage({ params, searchParams }: EditBookPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const book = await getAdminBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/admin/books"
            className="font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
          >
            Back to books
          </Link>
          <h1 className="mt-4 font-serif text-4xl font-bold text-navy-deep">
            Edit {book.title}
          </h1>
        </div>
        <Link
          href={`/admin/books/${book.id}/preview`}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-navy/20 px-6 text-sm font-black text-navy-deep transition hover:bg-gold-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Preview
        </Link>
      </div>
      <BookForm book={book} error={query.error} />
    </AdminShell>
  );
}
