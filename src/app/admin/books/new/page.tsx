import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { BookForm } from "@/components/admin/BookForm";

export const dynamic = "force-dynamic";

type NewBookPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewBookPage({ searchParams }: NewBookPageProps) {
  const params = await searchParams;

  return (
    <AdminShell>
      <div className="mb-8">
        <Link
          href="/admin/books"
          className="font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
        >
          Back to books
        </Link>
        <h1 className="mt-4 font-serif text-4xl font-bold text-navy-deep">Add book</h1>
      </div>
      <BookForm error={params.error} />
    </AdminShell>
  );
}
