import Image from "next/image";
import Link from "next/link";
import { reorderBookAction, updateBookStatusAction } from "@/app/admin/books/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { bookStatusClasses, getAdminBooks, statusLabel } from "@/lib/admin-books";

export const dynamic = "force-dynamic";

type AdminBooksPageProps = {
  searchParams: Promise<{
    status?: string;
    saved?: string;
    error?: string;
  }>;
};

const filters = [
  { href: "/admin/books", label: "All" },
  { href: "/admin/books?status=draft", label: "Draft" },
  { href: "/admin/books?status=published", label: "Published" },
  { href: "/admin/books?status=archived", label: "Archived" },
];

export default async function AdminBooksPage({ searchParams }: AdminBooksPageProps) {
  const params = await searchParams;
  const books = await getAdminBooks(params.status);

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
            Books
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">
            Manage books
          </h1>
        </div>
        <Link
          href="/admin/books/new"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Add book
        </Link>
      </div>

      {params.saved ? (
        <p className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700">
          Changes saved.
        </p>
      ) : null}
      {params.error ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
          {decodeURIComponent(params.error)}
        </p>
      ) : null}

      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.href}
            href={filter.href}
            className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy-deep transition hover:bg-gold-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-line text-sm">
            <thead className="bg-bg-alt text-left text-xs uppercase tracking-[0.16em] text-muted">
              <tr>
                <th className="px-4 py-3">Book</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-4">
                    <div className="flex min-w-[260px] items-center gap-4">
                      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-gold-pale">
                        <Image src={book.coverImage} alt={`${book.title} cover`} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-navy-deep">{book.title}</p>
                        <p className="mt-1 text-xs text-muted">/{book.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${bookStatusClasses(book.status)}`}>
                      {statusLabel(book.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-lg" aria-label={book.featured ? "Featured" : "Not featured"}>
                    {book.featured ? "*" : "-"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {["up", "down"].map((direction) => (
                        <form action={reorderBookAction} key={direction}>
                          <input type="hidden" name="id" value={book.id} />
                          <input type="hidden" name="slug" value={book.slug} />
                          <input type="hidden" name="sortOrder" value={book.sortOrder} />
                          <input type="hidden" name="direction" value={direction} />
                          <button className="rounded-lg border border-line px-2 py-1 text-xs font-bold text-navy-deep">
                            {direction === "up" ? "Up" : "Down"}
                          </button>
                        </form>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/books/${book.id}/edit`}
                        className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-navy-deep"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/books/${book.id}/preview`}
                        className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-navy-deep"
                      >
                        Preview
                      </Link>
                      <form action={updateBookStatusAction}>
                        <input type="hidden" name="id" value={book.id} />
                        <input type="hidden" name="slug" value={book.slug} />
                        <input
                          type="hidden"
                          name="status"
                          value={book.status === "published" ? "draft" : "published"}
                        />
                        <button className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-navy-deep">
                          {book.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <form action={updateBookStatusAction}>
                        <input type="hidden" name="id" value={book.id} />
                        <input type="hidden" name="slug" value={book.slug} />
                        <input type="hidden" name="status" value="archived" />
                        <button className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-red-700">
                          Archive
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {books.length === 0 ? (
          <p className="p-8 text-center text-muted">No books match this filter.</p>
        ) : null}
      </div>
    </AdminShell>
  );
}
