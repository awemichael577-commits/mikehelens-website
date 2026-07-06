import { saveAboutAction } from "@/app/admin/content-actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { SiteImageField } from "@/components/admin/SiteImageField";
import { getPublicMediaUrl } from "@/lib/media";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminAboutPage({ searchParams }: PageProps) {
  const [params, settings] = await Promise.all([searchParams, getSiteSettings()]);

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
          About
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">
          Edit author profile
        </h1>
      </div>
      <AdminNotice saved={params.saved} error={params.error} />
      <form action={saveAboutAction} className="grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Author name
          <input name="authorName" defaultValue={settings.authorName} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Biography
          <textarea name="aboutBio" defaultValue={settings.aboutBio} rows={10} className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
        <SiteImageField
          name="portrait"
          label="Portrait image"
          currentPath={settings.portraitPath}
          currentUrl={getPublicMediaUrl(settings.portraitPath)}
          hiddenName="existingPortraitPath"
        />

        <fieldset className="grid gap-4 rounded-xl border border-line bg-bg-alt p-4">
          <legend className="px-2 text-sm font-bold text-navy-deep">
            Credibility &amp; journey (four cards on the About page)
          </legend>
          <label className="grid gap-2 text-sm font-bold text-navy-deep">
            Ministry journey
            <textarea name="credibilityMinistry" defaultValue={settings.credibilityMinistry} rows={4} className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-navy-deep">
            Books published
            <textarea name="credibilityBooks" defaultValue={settings.credibilityBooks} rows={4} className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-navy-deep">
            Teaching and counselling
            <textarea name="credibilityTeaching" defaultValue={settings.credibilityTeaching} rows={4} className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-navy-deep">
            Family testimony
            <textarea name="credibilityFamily" defaultValue={settings.credibilityFamily} rows={4} className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
          </label>
        </fieldset>

        <button className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          Save about
        </button>
      </form>
    </AdminShell>
  );
}
