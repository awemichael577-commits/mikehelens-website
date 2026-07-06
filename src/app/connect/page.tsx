import type { Metadata } from "next";
import { SocialLinkCard } from "@/components/social/SocialLinkCard";
import { pageMetadata } from "@/lib/metadata";
import { getSocialLinks } from "@/lib/queries";
import type { SocialLink } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Connect",
  description:
    "Connect with Mikehelens Manuscripts & Publications across YouTube, social platforms, and other projects.",
  path: "/connect",
});

// Preferred display order; any custom categories appear after these, alphabetically.
const CATEGORY_ORDER = ["Book Related", "Personal Channels", "Other"];

function groupByCategory(links: SocialLink[]) {
  const groups = new Map<string, SocialLink[]>();

  for (const link of links) {
    const category = link.category || "Other";
    const bucket = groups.get(category) ?? [];
    bucket.push(link);
    groups.set(category, bucket);
  }

  return [...groups.entries()].sort(([a], [b]) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });
}

export default async function ConnectPage() {
  const links = await getSocialLinks();
  const groups = groupByCategory(links);

  return (
    <>
      <section className="bg-[radial-gradient(circle_at_10%_10%,rgba(201,162,75,0.12),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#F7F8FA_100%)] pt-[76px]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-[780px]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">Connect</p>
            <h1 className="mt-5 font-serif text-[clamp(3rem,5vw,4.5rem)] font-bold leading-[1.05] text-navy-deep">
              Find us online
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              All of our channels, book links, and related projects in one place. Some are about the
              books; others are separate projects and ministries.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-[52px] lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
          {groups.length === 0 ? (
            <p className="rounded-2xl border border-line bg-white p-8 text-center text-muted">
              No links have been published yet. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-12">
              {groups.map(([category, categoryLinks]) => (
                <div key={category}>
                  <h2 className="font-serif text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-[1.1] text-navy-deep">
                    {category}
                  </h2>
                  <div className="mt-3 h-px w-16 bg-gold" />
                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    {categoryLinks.map((link) => (
                      <SocialLinkCard key={link.id} link={link} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
