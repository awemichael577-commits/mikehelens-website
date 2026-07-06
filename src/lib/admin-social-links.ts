import { unstable_noStore as noStore } from "next/cache";
import { requireAdminClient } from "@/lib/admin";
import { isMissingSchemaError, mapSocialLink } from "@/lib/queries";
import type { SocialLinkStatus } from "@/lib/types";

export const MISSING_SOCIAL_LINKS_TABLE_MESSAGE =
  "The social_links table doesn't exist yet. Run supabase/migrations/007_social_links.sql in the Supabase SQL editor, then refresh this page.";

export async function getAdminSocialLinks() {
  noStore();
  const { supabase } = await requireAdminClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(isMissingSchemaError(error) ? MISSING_SOCIAL_LINKS_TABLE_MESSAGE : error.message);
  }

  return (data ?? []).map(mapSocialLink);
}

export async function getAdminSocialLinkById(id: string) {
  noStore();
  const { supabase } = await requireAdminClient();
  const { data, error } = await supabase.from("social_links").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapSocialLink(data) : null;
}

export function socialLinkStatusLabel(status: SocialLinkStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function socialLinkStatusClasses(status: SocialLinkStatus) {
  return status === "active"
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-slate-100 text-slate-700 border-slate-200";
}
