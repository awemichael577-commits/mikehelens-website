import { deleteTestimonialAction, saveTestimonialAction } from "@/app/admin/content-actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminBooks } from "@/lib/admin-books";
import { getAdminTestimonials } from "@/lib/admin-testimonials";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminTestimonialsPage({ searchParams }: PageProps) {
  const [params, testimonials, books] = await Promise.all([
    searchParams,
    getAdminTestimonials(),
    getAdminBooks(),
  ]);

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
          Testimonials
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">
          Manage reader voices
        </h1>
      </div>
      <AdminNotice saved={params.saved} error={params.error} />

      <section className="mb-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-navy-deep">Add testimonial</h2>
        <form action={saveTestimonialAction} className="mt-5 grid gap-4">
          <TestimonialFields books={books} />
          <button className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
            Add testimonial
          </button>
        </form>
      </section>

      <section className="grid gap-4">
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <form action={saveTestimonialAction} className="grid gap-4">
              <input type="hidden" name="id" value={testimonial.id} />
              <TestimonialFields
                books={books}
                defaults={{
                  quote: testimonial.quote,
                  name: testimonial.name,
                  role: testimonial.role ?? "",
                  bookId: testimonial.bookId ?? "site",
                  status: testimonial.status,
                  sortOrder: testimonial.sortOrder,
                }}
              />
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-navy-deep px-5 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                  Save
                </button>
                <span className="inline-flex items-center text-sm text-muted">
                  Assigned to {testimonial.bookTitle ?? "site-wide testimonials"}
                </span>
              </div>
            </form>
            <form action={deleteTestimonialAction} className="mt-3">
              <input type="hidden" name="id" value={testimonial.id} />
              <button className="text-sm font-bold text-red-700 underline decoration-red-300 underline-offset-4">
                Delete testimonial
              </button>
            </form>
          </article>
        ))}
        {testimonials.length === 0 ? (
          <p className="rounded-2xl border border-line bg-white p-8 text-center text-muted">
            No testimonials yet.
          </p>
        ) : null}
      </section>
    </AdminShell>
  );
}

type BookOption = Awaited<ReturnType<typeof getAdminBooks>>[number];

function TestimonialFields({
  books,
  defaults,
}: {
  books: BookOption[];
  defaults?: {
    quote: string;
    name: string;
    role: string;
    bookId: string;
    status: string;
    sortOrder: number;
  };
}) {
  return (
    <>
      <label className="grid gap-2 text-sm font-bold text-navy-deep">
        Quote
        <textarea
          name="quote"
          defaultValue={defaults?.quote ?? ""}
          rows={4}
          required
          className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Name
          <input name="name" defaultValue={defaults?.name ?? ""} required className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Role
          <input name="role" defaultValue={defaults?.role ?? ""} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Assignment
          <select name="bookId" defaultValue={defaults?.bookId ?? "site"} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold">
            <option value="site">Site-wide</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Status
          <select name="status" defaultValue={defaults?.status ?? "published"} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Sort order
          <input name="sortOrder" type="number" defaultValue={defaults?.sortOrder ?? 0} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
      </div>
    </>
  );
}
