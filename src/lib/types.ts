export type BookStatus = "draft" | "published" | "archived";

export type Testimonial = {
  id: string;
  bookId: string | null;
  quote: string;
  name: string;
  role?: string;
  status: "draft" | "published";
  sortOrder: number;
};

export type Book = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  hook?: string;
  description: string;
  audience: string;
  benefits: string[];
  coverPath?: string;
  coverImage: string;
  coverAlt?: string;
  price?: number;
  currency: string;
  priceDisplay?: string;
  selarUrl?: string;
  amazonUrl?: string;
  featured: boolean;
  status: BookStatus;
  sortOrder: number;
  updatedAt?: string;
  createdAt?: string;
  testimonials?: Testimonial[];
};

export type SiteSettings = {
  id: number;
  siteName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroTrustCue: string;
  heroImagePath?: string;
  authorName: string;
  aboutBio: string;
  portraitPath?: string;
  whatsapp: string;
  email: string;
  footerText: string;
  credibilityMinistry: string;
  credibilityBooks: string;
  credibilityTeaching: string;
  credibilityFamily: string;
};

export type SocialPlatform =
  | "youtube"
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "email"
  | "website"
  | "tiktok"
  | "x";

export type SocialLinkStatus = "active" | "hidden";

export const DEFAULT_SOCIAL_CATEGORY = "Other";

export type SocialLink = {
  id: string;
  platform: SocialPlatform;
  displayName: string;
  handle?: string;
  url?: string;
  description?: string;
  category: string;
  iconPath?: string;
  iconUrl?: string;
  isFeatured: boolean;
  showInFooter: boolean;
  showOnContactPage: boolean;
  status: SocialLinkStatus;
  sortOrder: number;
};

export type ContactMessageStatus = "new" | "read" | "archived";

export type ContactMessage = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  reason?: string;
  message: string;
  status: ContactMessageStatus;
  createdAt?: string;
};
