import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

const DEFAULT_OG_IMAGE = "/og-image.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
};

export function pageMetadata({
  title,
  description,
  path = "",
  image: imagePath = DEFAULT_OG_IMAGE,
  imageAlt = `${siteConfig.wordmark} logo`,
}: PageMetadataInput): Metadata {
  const url = new URL(path, siteConfig.domain).toString();
  const image = new URL(imagePath, siteConfig.domain).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.wordmark,
      images: [
        {
          url: image,
          width: 1200,
          height: 800,
          alt: imageAlt,
        },
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
