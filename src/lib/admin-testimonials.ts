import { unstable_noStore as noStore } from "next/cache";
import { requireAdminClient } from "@/lib/admin";
import type { Testimonial } from "@/lib/types";

type AdminTestimonial = Testimonial & {
  bookTitle?: string;
};

export async function getAdminTestimonials() {
  noStore();
  const { supabase } = await requireAdminClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*, books(title)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row): AdminTestimonial => {
    const book = row.books as { title?: string } | null;

    return {
      id: row.id,
      bookId: row.book_id,
      quote: row.quote,
      name: row.name,
      role: row.role ?? undefined,
      status: row.status === "draft" ? "draft" : "published",
      sortOrder: row.sort_order ?? 0,
      bookTitle: book?.title,
    };
  });
}
