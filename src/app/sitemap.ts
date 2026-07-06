import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getPublishedBooks } from "@/lib/queries";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/books", "/about", "/connect", "/contact"];
  const books = await getPublishedBooks();

  return [
    ...routes.map((route) => ({
      url: new URL(route, siteConfig.domain).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...books.map((book) => ({
      url: new URL(`/books/${book.slug}`, siteConfig.domain).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
