"use server";

import { redirect } from "next/navigation";
import { requireAdminClient } from "@/lib/admin";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateMessageStatusAction(formData: FormData) {
  const id = text(formData, "id");
  const status = text(formData, "status");

  if (!id || !["new", "read", "archived"].includes(status)) {
    redirect("/admin/messages?error=Invalid%20status%20update.");
  }

  const { supabase } = await requireAdminClient();
  const { error } = await supabase.from("messages").update({ status }).eq("id", id);

  if (error) {
    redirect(`/admin/messages?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/messages?saved=1");
}

export async function deleteMessageAction(formData: FormData) {
  const id = text(formData, "id");
  const { supabase } = await requireAdminClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    redirect(`/admin/messages?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/messages?saved=1");
}
