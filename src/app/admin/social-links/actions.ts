"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminClient } from "@/lib/admin";
import type { Database } from "@/lib/database.types";
import { isSupabaseStoragePath } from "@/lib/media";
import { normalizeExternalUrl } from "@/lib/purchase-links";
import { DEFAULT_SOCIAL_CATEGORY } from "@/lib/types";

type SocialLinkInsert = Database["public"]["Tables"]["social_links"]["Insert"];
type SocialLinkUpdate = Database["public"]["Tables"]["social_links"]["Update"];
type AdminSupabase = Awaited<ReturnType<typeof requireAdminClient>>["supabase"];

const VALID_PLATFORMS = ["youtube", "facebook", "instagram", "whatsapp", "email", "website", "tiktok", "x"];

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value ? value : null;
}

function safeFileName(name: string) {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || "icon";
}

async function uploadSocialIcon(
  supabase: AdminSupabase,
  formData: FormData,
  existingPath: string | null,
) {
  const file = formData.get("icon");

  if (!(file instanceof File) || file.size === 0) {
    return isSupabaseStoragePath(existingPath) ? existingPath : null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Custom icon must be an image file.");
  }

  const path = `social/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return path;
}

function revalidateSocialPaths() {
  revalidatePath("/connect");
}

function errorRedirect(path: string, error: unknown) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

async function buildSocialLinkPayload(supabase: AdminSupabase, formData: FormData) {
  const platform = text(formData, "platform");
  const displayName = text(formData, "displayName");
  const status = text(formData, "status") || "hidden";
  const rawUrl = optionalText(formData, "url");

  if (!VALID_PLATFORMS.includes(platform)) {
    throw new Error("Choose a valid platform.");
  }

  if (!displayName) {
    throw new Error("Display name is required.");
  }

  let normalizedUrl: string | null = null;

  if (rawUrl) {
    normalizedUrl = normalizeExternalUrl(rawUrl) ?? null;

    if (!normalizedUrl) {
      throw new Error("Enter a valid http:// or https:// URL.");
    }
  }

  if (status === "active" && !normalizedUrl) {
    throw new Error("Add a URL before making this link active, or save it as hidden.");
  }

  const iconPath = await uploadSocialIcon(supabase, formData, optionalText(formData, "existingIconPath"));

  return {
    platform,
    display_name: displayName,
    handle: optionalText(formData, "handle") ?? "",
    url: normalizedUrl ?? "",
    description: optionalText(formData, "description") ?? "",
    category: optionalText(formData, "category") ?? DEFAULT_SOCIAL_CATEGORY,
    icon_path: iconPath,
    is_featured: formData.get("isFeatured") === "on",
    status,
    sort_order: Number(text(formData, "sortOrder")) || 0,
  };
}

export async function saveSocialLinkAction(formData: FormData) {
  const id = text(formData, "id");
  const failurePath = id ? `/admin/social-links/${id}/edit` : "/admin/social-links/new";

  try {
    const { supabase } = await requireAdminClient();
    const payload = await buildSocialLinkPayload(supabase, formData);

    if (id) {
      const { error } = await supabase.from("social_links").update(payload satisfies SocialLinkUpdate).eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    } else {
      const { error } = await supabase.from("social_links").insert(payload satisfies SocialLinkInsert);

      if (error) {
        throw new Error(error.message);
      }
    }

    revalidateSocialPaths();
  } catch (error) {
    errorRedirect(failurePath, error);
  }

  redirect("/admin/social-links?saved=1");
}

export async function updateSocialLinkStatusAction(formData: FormData) {
  const id = text(formData, "id");
  const status = text(formData, "status");

  if (!id || !["active", "hidden"].includes(status)) {
    redirect("/admin/social-links?error=Invalid%20status%20update.");
  }

  const { supabase } = await requireAdminClient();

  if (status === "active") {
    const { data: link, error: linkError } = await supabase
      .from("social_links")
      .select("url")
      .eq("id", id)
      .maybeSingle();

    if (linkError) {
      redirect(`/admin/social-links?error=${encodeURIComponent(linkError.message)}`);
    }

    if (!link?.url) {
      redirect("/admin/social-links?error=Add%20a%20URL%20before%20activating%20this%20link.");
    }
  }

  const { error } = await supabase.from("social_links").update({ status }).eq("id", id);

  if (error) {
    redirect(`/admin/social-links?error=${encodeURIComponent(error.message)}`);
  }

  revalidateSocialPaths();
  redirect("/admin/social-links?saved=1");
}

export async function deleteSocialLinkAction(formData: FormData) {
  try {
    const { supabase } = await requireAdminClient();
    const id = text(formData, "id");
    const { error } = await supabase.from("social_links").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    revalidateSocialPaths();
  } catch (error) {
    errorRedirect("/admin/social-links", error);
  }

  redirect("/admin/social-links?saved=1");
}

export async function reorderSocialLinkAction(formData: FormData) {
  const id = text(formData, "id");
  const currentOrder = Number(text(formData, "sortOrder")) || 0;
  const direction = text(formData, "direction");
  const nextOrder = direction === "up" ? currentOrder - 1 : currentOrder + 1;

  const { supabase } = await requireAdminClient();
  const { error } = await supabase.from("social_links").update({ sort_order: nextOrder }).eq("id", id);

  if (error) {
    redirect(`/admin/social-links?error=${encodeURIComponent(error.message)}`);
  }

  revalidateSocialPaths();
  redirect("/admin/social-links?saved=1");
}
