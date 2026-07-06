"use server";

import { redirect } from "next/navigation";
import { getSupabaseConfig } from "@/lib/env";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { Database } from "@/lib/database.types";

type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];

const MIN_SUBMIT_SECONDS = 3;

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function sendContactMessageAction(formData: FormData) {
  // Honeypot: a real visitor never sees or fills this field (hidden via CSS in
  // the form). Bots that blindly fill every input trip it.
  const honeypot = text(formData, "company");
  // Timing check: reject submissions that arrive implausibly fast after the
  // page rendered, a common signal of scripted/bot submissions.
  const renderedAt = Number(text(formData, "formRenderedAt"));
  const elapsedSeconds = Number.isFinite(renderedAt) ? (Date.now() - renderedAt) / 1000 : Infinity;
  const looksLikeSpam = Boolean(honeypot) || elapsedSeconds < MIN_SUBMIT_SECONDS;

  const name = text(formData, "name");
  const message = text(formData, "message");

  if (looksLikeSpam) {
    // Pretend success so scripted submitters get no signal that they were caught.
    redirect("/contact?sent=1");
  }

  if (!name || !message) {
    redirect("/contact?error=Please%20fill%20in%20your%20name%20and%20message.#message");
  }

  if (!getSupabaseConfig()) {
    redirect("/contact?error=Messaging%20is%20not%20connected%20yet.%20Please%20use%20WhatsApp.#message");
  }

  const payload: MessageInsert = {
    name,
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    reason: text(formData, "reason"),
    message,
  };

  const supabase = createSupabasePublicClient();
  const { error } = await supabase.from("messages").insert(payload);

  if (error) {
    const isMissingSchema = error.code === "PGRST205" || error.message?.includes("Could not find the table");
    const friendlyMessage = isMissingSchema
      ? "Messaging isn't fully set up yet. Please use WhatsApp instead."
      : error.message;
    redirect(`/contact?error=${encodeURIComponent(friendlyMessage)}#message`);
  }

  redirect("/contact?sent=1#message");
}
