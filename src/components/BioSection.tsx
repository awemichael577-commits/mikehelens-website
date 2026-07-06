import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { getPublicMediaUrl } from "@/lib/media";
import type { SiteSettings } from "@/lib/types";

export function BioSection({
  compact = false,
  settings,
}: {
  compact?: boolean;
  settings?: SiteSettings;
}) {
  const name = settings?.authorName || siteConfig.pastorName;
  const bio = settings?.aboutBio || siteConfig.bio;
  const portrait = getPublicMediaUrl(settings?.portraitPath || siteConfig.portraitImage);

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1fr] lg:px-12 lg:py-24">
      <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-navy-deep shadow-soft">
        <Image
          src={portrait}
          alt={`Portrait placeholder for ${name}`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
          Ministry and authorship
        </p>
        <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-navy-deep sm:text-5xl">
          About 30 years of pastoral ministry and Christian teaching.
        </h2>
        <p className="mt-6 text-lg leading-9 text-muted">{bio}</p>
        {compact ? (
          <Link
            href="/about"
            className="mt-7 inline-flex w-fit font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
          >
            Read the full bio
          </Link>
        ) : null}
      </div>
    </section>
  );
}
