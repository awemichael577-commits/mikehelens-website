import { unstable_noStore as noStore } from "next/cache";
import { requireAdminClient } from "@/lib/admin";
import { isMissingSchemaError } from "@/lib/queries";
import type { ContactMessage, ContactMessageStatus } from "@/lib/types";
import type { Database } from "@/lib/database.types";

type MessageRow = Database["public"]["Tables"]["messages"]["Row"];

export const MISSING_MESSAGES_TABLE_MESSAGE =
  "The messages table doesn't exist yet. Run supabase/migrations/008_contact_messages.sql in the Supabase SQL editor, then refresh this page.";

function mapMessage(row: MessageRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    reason: row.reason ?? undefined,
    message: row.message,
    status: row.status === "read" || row.status === "archived" ? row.status : "new",
    createdAt: row.created_at ?? undefined,
  };
}

export async function getAdminMessages(status?: string) {
  noStore();
  const { supabase } = await requireAdminClient();
  let query = supabase.from("messages").select("*").order("created_at", { ascending: false });

  if (status && ["new", "read", "archived"].includes(status)) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(isMissingSchemaError(error) ? MISSING_MESSAGES_TABLE_MESSAGE : error.message);
  }

  return (data ?? []).map(mapMessage);
}

export function messageStatusLabel(status: ContactMessageStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function messageStatusClasses(status: ContactMessageStatus) {
  if (status === "new") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  if (status === "archived") {
    return "bg-slate-100 text-slate-700 border-slate-200";
  }

  return "bg-green-50 text-green-700 border-green-200";
}
