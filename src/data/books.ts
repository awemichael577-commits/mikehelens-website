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
  coverImage: string;
  priceDisplay?: string;
  selarUrl?: string;
  selarEmbedId?: string;
  amazonUrl?: string;
  testimonials?: {
    quote: string;
    name: string;
  }[];
  featured?: boolean;
};

export const books: Book[] = [
  {
    id: "i-said-yes",
    slug: "i-said-yes",
    title: "I Said Yes",
    subtitle: "How God Led Us Together",
    category: "Marriage Testimony",
    hook: "A testimony of divine guidance, love, faith, and God's faithful provision in marriage.",
    description:
      "A testimony of divine guidance, love, faith, and God's faithful provision in marriage.",
    audience: "Couples, families, and Christian readers.",
    benefits: [
      "Understand how divine guidance can shape marriage and destiny.",
      "Learn faith lessons from a real Christian marriage testimony.",
      "Receive encouragement for trusting God in relationship decisions.",
    ],
    coverImage: "/assets/i-said-yes-cover.png",
    priceDisplay: "₦5,000",
    testimonials: [
      {
        quote: "A faith-building testimony that encourages readers to trust God's leading.",
        name: "Reader",
      },
      {
        quote: "Warm, clear, and deeply useful for couples and families.",
        name: "Ministry Leader",
      },
    ],
    featured: true,
  },
  {
    id: "strange-altars",
    slug: "strange-altars",
    title: "Strange Altars",
    subtitle: "A Journey to the Places Where Transformation Begins",
    category: "Spiritual Transformation",
    hook: "A spiritual guide to understanding foundations, confronting ungodly altars, and walking in God's transforming power.",
    description:
      "A spiritual guide to understanding foundations, confronting ungodly altars, and walking in God's transforming power.",
    audience: "Believers, families, and prayer-minded readers.",
    benefits: [
      "Understand the meaning and influence of spiritual altars.",
      "Recognize ungodly foundations and patterns that can affect destiny.",
      "Learn how prayer, repentance, and faith in Christ bring transformation.",
    ],
    coverImage: "/assets/strange-altars-cover.png",
    priceDisplay: "₦4,000",
    testimonials: [
      {
        quote: "A timely resource for believers seeking spiritual understanding and freedom.",
        name: "Pastor",
      },
      {
        quote: "Clear, bold, and deeply relevant for families and prayer-minded believers.",
        name: "Ministry Leader",
      },
    ],
  },
];

export const featuredBook = books.find((book) => book.featured) ?? books[0];

export function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug);
}
