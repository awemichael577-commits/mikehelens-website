import { unstable_noStore as noStore } from "next/cache";
import { requireAdminClient } from "@/lib/admin";
import { mapBook } from "@/lib/queries";
import type { Book, BookStatus } from "@/lib/types";

export async function getAdminBooks(status?: string) {
  noStore();
  const { supabase } = await requireAdminClient();
  let query = supabase
    .from("books")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (status && ["draft", "published", "archived"].includes(status)) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapBook(row));
}

export async function getAdminBookById(id: string) {
  noStore();
  const { supabase } = await requireAdminClient();
  const { data, error } = await supabase.from("books").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapBook(data) : null;
}

export function statusLabel(status: BookStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function bookStatusClasses(status: BookStatus) {
  if (status === "published") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (status === "archived") {
    return "bg-slate-100 text-slate-700 border-slate-200";
  }

  return "bg-amber-50 text-amber-700 border-amber-200";
}
