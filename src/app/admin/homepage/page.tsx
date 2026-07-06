import Link from "next/link";
import { saveHomepageAction } from "@/app/admin/content-actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { SiteImageField } from "@/components/admin/SiteImageField";
import { getPublicMediaUrl } from "@/lib/media";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminHomepagePage({ searchParams }: PageProps) {
  const [params, settings] = await Promise.all([searchParams, getSiteSettings()]);

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
            Homepage
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">
            Edit homepage hero
          </h1>
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
        >
          Preview live home
        </Link>
      </div>
      <AdminNotice saved={params.saved} error={params.error} />
      <form action={saveHomepageAction} className="grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Hero headline
          <input name="heroHeadline" defaultValue={settings.heroHeadline} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Hero subheadline
          <textarea name="heroSubheadline" defaultValue={settings.heroSubheadline} rows={4} className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-navy-deep">
            CTA text
            <input name="heroCtaText" defaultValue={settings.heroCtaText} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-navy-deep">
            Trust cue
            <input name="heroTrustCue" defaultValue={settings.heroTrustCue} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
          </label>
        </div>
        <SiteImageField
          name="heroImage"
          label="Hero image"
          currentPath={settings.heroImagePath}
          currentUrl={getPublicMediaUrl(settings.heroImagePath)}
          hiddenName="existingHeroImagePath"
        />
        <button className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          Save homepage
        </button>
      </form>
    </AdminShell>
  );
}
