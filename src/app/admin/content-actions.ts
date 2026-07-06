"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminClient } from "@/lib/admin";
import type { Database } from "@/lib/database.types";
import { isSupabaseStoragePath } from "@/lib/media";

type SiteSettingsUpdate = Database["public"]["Tables"]["site_settings"]["Update"];
type TestimonialInsert = Database["public"]["Tables"]["testimonials"]["Insert"];
type TestimonialUpdate = Database["public"]["Tables"]["testimonials"]["Update"];

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

  return cleaned || "image";
}

async function uploadSiteImage(formData: FormData, key: string, existingPath: string | null) {
  const file = formData.get(key);

  if (!(file instanceof File) || file.size === 0) {
    return isSupabaseStoragePath(existingPath) ? existingPath : null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Upload must be an image file.");
  }

  const { supabase } = await requireAdminClient();
  const path = `site/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return path;
}

function revalidate(paths: string[]) {
  paths.forEach((path) => revalidatePath(path));
  revalidatePath("/sitemap.xml");
}

function fail(path: string, error: unknown) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function saveHomepageAction(formData: FormData) {
  try {
    const { supabase } = await requireAdminClient();
    const heroImagePath = await uploadSiteImage(
      formData,
      "heroImage",
      optionalText(formData, "existingHeroImagePath"),
    );
    const payload: SiteSettingsUpdate = {
      hero_headline: text(formData, "heroHeadline"),
      hero_subheadline: text(formData, "heroSubheadline"),
      hero_cta_text: text(formData, "heroCtaText") || "Explore the books",
      hero_trust_cue: text(formData, "heroTrustCue"),
      hero_image_path: heroImagePath,
    };
    const { error } = await supabase.from("site_settings").update(payload).eq("id", 1);

    if (error) {
      throw new Error(error.message);
    }

    revalidate(["/"]);
  } catch (error) {
    fail("/admin/homepage", error);
  }

  redirect("/admin/homepage?saved=1");
}

export async function saveAboutAction(formData: FormData) {
  try {
    const { supabase } = await requireAdminClient();
    const portraitPath = await uploadSiteImage(
      formData,
      "portrait",
      optionalText(formData, "existingPortraitPath"),
    );
    const payload: SiteSettingsUpdate = {
      author_name: text(formData, "authorName"),
      about_bio: text(formData, "aboutBio"),
      portrait_path: portraitPath,
    };
    const { error } = await supabase.from("site_settings").update(payload).eq("id", 1);

    if (error) {
      throw new Error(error.message);
    }

    // Best-effort: credibility columns are added in migration 010. If they don't
    // exist yet, the core About save above still succeeds and the About page
    // shows the built-in fallback content.
    const credibilityPayload: SiteSettingsUpdate = {
      credibility_ministry: text(formData, "credibilityMinistry"),
      credibility_books: text(formData, "credibilityBooks"),
      credibility_teaching: text(formData, "credibilityTeaching"),
      credibility_family: text(formData, "credibilityFamily"),
    };
    const { error: credibilityError } = await supabase
      .from("site_settings")
      .update(credibilityPayload)
      .eq("id", 1);

    if (credibilityError) {
      const missingColumn =
        credibilityError.code === "PGRST204" ||
        /column|schema cache/i.test(credibilityError.message ?? "");

      if (!missingColumn) {
        throw new Error(credibilityError.message);
      }
    }

    revalidate(["/", "/about"]);
  } catch (error) {
    fail("/admin/about", error);
  }

  redirect("/admin/about?saved=1");
}

export async function saveContactAction(formData: FormData) {
  try {
    const { supabase } = await requireAdminClient();
    const payload: SiteSettingsUpdate = {
      whatsapp: text(formData, "whatsapp"),
      email: text(formData, "email"),
    };
    const { error } = await supabase.from("site_settings").update(payload).eq("id", 1);

    if (error) {
      throw new Error(error.message);
    }

    revalidate(["/contact"]);
  } catch (error) {
    fail("/admin/contact", error);
  }

  redirect("/admin/contact?saved=1");
}

export async function saveSettingsAction(formData: FormData) {
  try {
    const { supabase } = await requireAdminClient();
    const payload: SiteSettingsUpdate = {
      site_name: text(formData, "siteName"),
      tagline: text(formData, "tagline"),
      footer_text: text(formData, "footerText"),
    };
    const { error } = await supabase.from("site_settings").update(payload).eq("id", 1);

    if (error) {
      throw new Error(error.message);
    }

    revalidate(["/", "/books", "/about", "/contact"]);
  } catch (error) {
    fail("/admin/settings", error);
  }

  redirect("/admin/settings?saved=1");
}

export async function saveTestimonialAction(formData: FormData) {
  const id = text(formData, "id");
  const path = "/admin/testimonials";

  try {
    const { supabase } = await requireAdminClient();
    const bookId = optionalText(formData, "bookId");
    const payload: TestimonialInsert | TestimonialUpdate = {
      quote: text(formData, "quote"),
      name: text(formData, "name"),
      role: optionalText(formData, "role"),
      book_id: bookId === "site" ? null : bookId,
      status: text(formData, "status") || "published",
      sort_order: Number(text(formData, "sortOrder")) || 0,
    };

    if (!payload.quote || !payload.name) {
      throw new Error("Quote and name are required.");
    }

    const result = id
      ? await supabase.from("testimonials").update(payload).eq("id", id)
      : await supabase.from("testimonials").insert(payload as TestimonialInsert);

    if (result.error) {
      throw new Error(result.error.message);
    }

    revalidate(["/", "/books"]);
  } catch (error) {
    fail(path, error);
  }

  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonialAction(formData: FormData) {
  try {
    const { supabase } = await requireAdminClient();
    const id = text(formData, "id");
    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    revalidate(["/", "/books"]);
  } catch (error) {
    fail("/admin/testimonials", error);
  }

  redirect("/admin/testimonials?saved=1");
}
