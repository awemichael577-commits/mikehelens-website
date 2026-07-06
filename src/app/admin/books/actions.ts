"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminClient } from "@/lib/admin";
import type { Database } from "@/lib/database.types";
import { isUploadedCoverPath } from "@/lib/media";
import { normalizePurchaseUrl } from "@/lib/purchase-links";

type BookInsert = Database["public"]["Tables"]["books"]["Insert"];
type BookUpdate = Database["public"]["Tables"]["books"]["Update"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value ? value : null;
}

function parsePrice(formData: FormData) {
  const value = text(formData, "price");

  if (!value) {
    return null;
  }

  const price = Number(value);
  return Number.isFinite(price) ? price : null;
}

function parseBenefits(formData: FormData) {
  return formData
    .getAll("benefits")
    .map((benefit) => String(benefit).trim())
    .filter(Boolean);
}

function purchaseUrl(formData: FormData, key: string) {
  const raw = optionalText(formData, key);
  const normalized = normalizePurchaseUrl(raw);

  if (raw && !normalized) {
    throw new Error("Purchase links must be valid http or https URLs.");
  }

  return normalized ?? null;
}

function safeFileName(name: string) {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || "cover";
}

async function uploadCover(formData: FormData, existingPath: string | null) {
  const file = formData.get("cover");

  if (!(file instanceof File) || file.size === 0) {
    return isUploadedCoverPath(existingPath) ? existingPath : null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Cover upload must be an image file.");
  }

  const { supabase } = await requireAdminClient();
  const path = `covers/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return path;
}

function revalidateBookPaths(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/books");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/books/${slug}`);
  }
}

async function buildBookPayload(formData: FormData, status: string) {
  const title = text(formData, "title");
  const slug = slugify(text(formData, "slug") || title);

  if (!title) {
    throw new Error("Title is required.");
  }

  if (!slug) {
    throw new Error("Slug is required.");
  }

  const existingCoverPath = optionalText(formData, "existingCoverPath");
  const coverPath = await uploadCover(formData, existingCoverPath);

  if (status === "published" && !isUploadedCoverPath(coverPath)) {
    throw new Error("Upload a valid book cover before publishing.");
  }

  return {
    slug,
    title,
    subtitle: optionalText(formData, "subtitle"),
    category: optionalText(formData, "category") ?? "",
    hook: optionalText(formData, "hook") ?? "",
    description: optionalText(formData, "description") ?? "",
    audience: optionalText(formData, "audience") ?? "",
    benefits: parseBenefits(formData),
    cover_path: coverPath,
    cover_alt: optionalText(formData, "coverAlt") ?? "",
    price: parsePrice(formData),
    currency: text(formData, "currency") || "NGN",
    price_display: optionalText(formData, "priceDisplay"),
    selar_url: purchaseUrl(formData, "selarUrl"),
    amazon_url: purchaseUrl(formData, "amazonUrl"),
    featured: formData.get("featured") === "on",
    status,
    sort_order: Number(text(formData, "sortOrder")) || 0,
  };
}

function errorRedirect(path: string, error: unknown) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function saveBookAction(formData: FormData) {
  const id = text(formData, "id");
  const intent = text(formData, "intent");
  const previousSlug = optionalText(formData, "previousSlug");
  const requestedStatus = text(formData, "status") || "draft";
  const status = intent === "publish" ? "published" : requestedStatus;
  const failurePath = id ? `/admin/books/${id}/edit` : "/admin/books/new";

  try {
    const { supabase } = await requireAdminClient();
    const payload = await buildBookPayload(formData, status);

    if (payload.featured) {
      await supabase.from("books").update({ featured: false }).neq("id", id || "00000000-0000-0000-0000-000000000000");
    }

    if (id) {
      const { error } = await supabase.from("books").update(payload satisfies BookUpdate).eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    } else {
      const { error } = await supabase.from("books").insert(payload satisfies BookInsert);

      if (error) {
        throw new Error(error.message);
      }
    }

    revalidateBookPaths(payload.slug);
    if (previousSlug && previousSlug !== payload.slug) {
      revalidateBookPaths(previousSlug);
    }
  } catch (error) {
    errorRedirect(failurePath, error);
  }

  redirect(`/admin/books?saved=1`);
}

export async function updateBookStatusAction(formData: FormData) {
  const id = text(formData, "id");
  const slug = text(formData, "slug");
  const status = text(formData, "status");

  if (!id || !["draft", "published", "archived"].includes(status)) {
    redirect("/admin/books?error=Invalid%20status%20update.");
  }

  const { supabase } = await requireAdminClient();

  if (status === "published") {
    const { data: book, error: bookError } = await supabase
      .from("books")
      .select("cover_path")
      .eq("id", id)
      .maybeSingle();

    if (bookError) {
      redirect(`/admin/books?error=${encodeURIComponent(bookError.message)}`);
    }

    if (!isUploadedCoverPath(book?.cover_path)) {
      redirect("/admin/books?error=Upload%20a%20valid%20book%20cover%20before%20publishing.");
    }
  }

  const { error } = await supabase.from("books").update({ status }).eq("id", id);

  if (error) {
    redirect(`/admin/books?error=${encodeURIComponent(error.message)}`);
  }

  revalidateBookPaths(slug);
  redirect("/admin/books?saved=1");
}

export async function reorderBookAction(formData: FormData) {
  const id = text(formData, "id");
  const slug = text(formData, "slug");
  const currentOrder = Number(text(formData, "sortOrder")) || 0;
  const direction = text(formData, "direction");
  const nextOrder = direction === "up" ? currentOrder - 1 : currentOrder + 1;

  const { supabase } = await requireAdminClient();
  const { error } = await supabase.from("books").update({ sort_order: nextOrder }).eq("id", id);

  if (error) {
    redirect(`/admin/books?error=${encodeURIComponent(error.message)}`);
  }

  revalidateBookPaths(slug);
  redirect("/admin/books?saved=1");
}
