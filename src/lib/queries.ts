import { unstable_noStore as noStore } from "next/cache";
import { books as fallbackBooks } from "@/data/books";
import { siteConfig } from "@/data/site";
import { getSupabaseConfig } from "@/lib/env";
import { getPublicMediaUrl } from "@/lib/media";
import { normalizeExternalUrl, normalizePurchaseUrl } from "@/lib/purchase-links";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";
import { DEFAULT_SOCIAL_CATEGORY } from "@/lib/types";
import type { Book, BookStatus, SiteSettings, SocialLink, SocialPlatform, Testimonial } from "@/lib/types";

type BookRow = Database["public"]["Tables"]["books"]["Row"];
type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];
type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];
type SocialLinkRow = Database["public"]["Tables"]["social_links"]["Row"];

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  "youtube",
  "facebook",
  "instagram",
  "whatsapp",
  "email",
  "website",
  "tiktok",
  "x",
];

function normalizeSocialPlatform(platform: string): SocialPlatform {
  return (SOCIAL_PLATFORMS as string[]).includes(platform) ? (platform as SocialPlatform) : "website";
}

export function isMissingSchemaError(error: { code?: string; message?: string }) {
  return error.code === "PGRST205" || error.message?.includes("Could not find the table");
}

function normalizeStatus(status: string): BookStatus {
  if (status === "draft" || status === "archived" || status === "published") {
    return status;
  }

  return "draft";
}

export function formatPrice(
  price?: number | null,
  currency?: string | null,
  priceDisplay?: string | null,
) {
  if (priceDisplay) {
    return priceDisplay;
  }

  if (typeof price !== "number") {
    return undefined;
  }

  const code = currency || "NGN";

  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: code,
      maximumFractionDigits: code === "NGN" ? 0 : 2,
    }).format(price);
  } catch {
    return `${code} ${price}`;
  }
}

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    bookId: row.book_id,
    quote: row.quote,
    name: row.name,
    role: row.role ?? undefined,
    status: row.status === "draft" ? "draft" : "published",
    sortOrder: row.sort_order ?? 0,
  };
}

function fallbackSiteSettings(): SiteSettings {
  return {
    id: 1,
    siteName: siteConfig.wordmark,
    tagline: siteConfig.tagline,
    heroHeadline: siteConfig.pastorName,
    heroSubheadline: siteConfig.tagline,
    heroCtaText: "Browse Books",
    heroTrustCue: siteConfig.shortIntro,
    heroImagePath: siteConfig.portraitImage,
    authorName: siteConfig.pastorName,
    aboutBio: siteConfig.bio,
    portraitPath: siteConfig.portraitImage,
    whatsapp: siteConfig.whatsappNumber,
    email: siteConfig.contactEmail,
    footerText: siteConfig.tagline,
    credibilityMinistry: siteConfig.credibility.ministry,
    credibilityBooks: siteConfig.credibility.books,
    credibilityTeaching: siteConfig.credibility.teaching,
    credibilityFamily: siteConfig.credibility.family,
  };
}

function mapSiteSettings(row: SiteSettingsRow): SiteSettings {
  const fallback = fallbackSiteSettings();

  return {
    id: row.id,
    siteName: row.site_name || fallback.siteName,
    tagline: row.tagline || fallback.tagline,
    heroHeadline: row.hero_headline || fallback.heroHeadline,
    heroSubheadline: row.hero_subheadline || fallback.heroSubheadline,
    heroCtaText: row.hero_cta_text || fallback.heroCtaText,
    heroTrustCue: row.hero_trust_cue || fallback.heroTrustCue,
    heroImagePath: row.hero_image_path || fallback.heroImagePath,
    authorName: row.author_name || fallback.authorName,
    aboutBio: row.about_bio || fallback.aboutBio,
    portraitPath: row.portrait_path || fallback.portraitPath,
    whatsapp: row.whatsapp || fallback.whatsapp,
    email: row.email || fallback.email,
    footerText: row.footer_text || fallback.footerText,
    credibilityMinistry: row.credibility_ministry || fallback.credibilityMinistry,
    credibilityBooks: row.credibility_books || fallback.credibilityBooks,
    credibilityTeaching: row.credibility_teaching || fallback.credibilityTeaching,
    credibilityFamily: row.credibility_family || fallback.credibilityFamily,
  };
}

export function mapBook(row: BookRow, testimonials: Testimonial[] = []): Book {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    category: row.category ?? undefined,
    hook: row.hook ?? undefined,
    description: row.description ?? "",
    audience: row.audience ?? "",
    benefits: row.benefits ?? [],
    coverPath: row.cover_path ?? undefined,
    coverImage: getPublicMediaUrl(row.cover_path),
    coverAlt: row.cover_alt ?? undefined,
    price: row.price ?? undefined,
    currency: row.currency ?? "NGN",
    priceDisplay: formatPrice(row.price, row.currency, row.price_display),
    selarUrl: normalizePurchaseUrl(row.selar_url),
    amazonUrl: normalizePurchaseUrl(row.amazon_url),
    featured: Boolean(row.featured),
    status: normalizeStatus(row.status),
    sortOrder: row.sort_order ?? 0,
    updatedAt: row.updated_at ?? undefined,
    createdAt: row.created_at ?? undefined,
    testimonials,
  };
}

function fallbackBookList(): Book[] {
  return fallbackBooks.map((book, index) => ({
    id: book.id,
    slug: book.slug,
    title: book.title,
    subtitle: book.subtitle,
    category: book.category,
    hook: book.hook,
    description: book.description,
    audience: book.audience,
    benefits: book.benefits,
    coverPath: book.coverImage,
    coverImage: book.coverImage,
    currency: "NGN",
    priceDisplay: book.priceDisplay,
    selarUrl: book.selarUrl,
    amazonUrl: book.amazonUrl,
    featured: Boolean(book.featured),
    status: "published",
    sortOrder: index,
    testimonials: book.testimonials?.map((testimonial, testimonialIndex) => ({
      id: `${book.id}-${testimonialIndex}`,
      bookId: book.id,
      quote: testimonial.quote,
      name: testimonial.name,
      status: "published",
      sortOrder: testimonialIndex,
    })),
  }));
}

export async function getPublishedBooks() {
  const config = getSupabaseConfig();

  if (!config) {
    return fallbackBookList();
  }

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (!isMissingSchemaError(error)) {
      console.error("Failed to fetch published books", error);
    }

    return fallbackBookList();
  }

  return (data ?? []).map((row) => mapBook(row));
}

export async function getSiteSettings() {
  if (!getSupabaseConfig()) {
    return fallbackSiteSettings();
  }

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) {
    if (error && !isMissingSchemaError(error)) {
      console.error("Failed to fetch site settings", error);
    }

    return fallbackSiteSettings();
  }

  return mapSiteSettings(data);
}

export function mapSocialLink(row: SocialLinkRow): SocialLink {
  return {
    id: row.id,
    platform: normalizeSocialPlatform(row.platform),
    displayName: row.display_name,
    handle: row.handle ?? undefined,
    url: normalizeExternalUrl(row.url) ?? undefined,
    description: row.description ?? undefined,
    category: row.category?.trim() || DEFAULT_SOCIAL_CATEGORY,
    iconPath: row.icon_path ?? undefined,
    iconUrl: row.icon_path ? getPublicMediaUrl(row.icon_path) : undefined,
    isFeatured: Boolean(row.is_featured),
    showInFooter: Boolean(row.show_in_footer),
    showOnContactPage: Boolean(row.show_on_contact_page),
    status: row.status === "hidden" ? "hidden" : "active",
    sortOrder: row.sort_order ?? 0,
  };
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  if (!getSupabaseConfig()) {
    return [];
  }

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("status", "active")
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (!isMissingSchemaError(error)) {
      console.error("Failed to fetch social links", error);
    }

    return [];
  }

  return (data ?? []).map(mapSocialLink);
}

export async function getSiteTestimonials() {
  if (!getSupabaseConfig()) {
    return siteConfig.testimonials.map((testimonial, index) => ({
      id: `site-${index}`,
      bookId: null,
      quote: testimonial.quote,
      name: testimonial.name,
      status: "published" as const,
      sortOrder: index,
    }));
  }

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .is("book_id", null)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (!isMissingSchemaError(error)) {
      console.error("Failed to fetch site testimonials", error);
    }

    return [];
  }

  return (data ?? []).map(mapTestimonial);
}

export async function getBookBySlug(slug: string) {
  const config = getSupabaseConfig();

  if (!config) {
    return fallbackBookList().find((book) => book.slug === slug) ?? null;
  }

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    if (error && !isMissingSchemaError(error)) {
      console.error("Failed to fetch book by slug", error);
    }

    return null;
  }

  const testimonials = await getBookTestimonials(data.id);
  return mapBook(data, testimonials);
}

export async function getFeaturedBook() {
  const books = await getPublishedBooks();
  return books.find((book) => book.featured) ?? books[0] ?? null;
}

export async function getBookTestimonials(bookId: string) {
  if (!getSupabaseConfig()) {
    return fallbackBookList().find((book) => book.id === bookId)?.testimonials ?? [];
  }

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("book_id", bookId)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (!isMissingSchemaError(error)) {
      console.error("Failed to fetch book testimonials", error);
    }

    return [];
  }

  return (data ?? []).map(mapTestimonial);
}

export async function getPublishedBookSlugs() {
  const books = await getPublishedBooks();
  return books.map((book) => book.slug);
}

export async function getOtherPublishedBooks(currentBookId: string, limit = 3) {
  const books = await getPublishedBooks();
  return books.filter((book) => book.id !== currentBookId).slice(0, limit);
}

export async function getAdminPreviewBookById(id: string) {
  noStore();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("books").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    if (error) {
      console.error("Failed to fetch preview book", error);
    }

    return null;
  }

  const { data: testimonialRows } = await supabase
    .from("testimonials")
    .select("*")
    .eq("book_id", id)
    .order("sort_order", { ascending: true });

  return mapBook(data, (testimonialRows ?? []).map(mapTestimonial));
}
