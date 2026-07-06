import { saveSettingsAction } from "@/app/admin/content-actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminSettingsPage({ searchParams }: PageProps) {
  const [params, settings] = await Promise.all([searchParams, getSiteSettings()]);

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
          Settings
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">
          Edit site basics
        </h1>
      </div>
      <AdminNotice saved={params.saved} error={params.error} />
      <form action={saveSettingsAction} className="grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Site name
          <input name="siteName" defaultValue={settings.siteName} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Tagline
          <input name="tagline" defaultValue={settings.tagline} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Footer text
          <textarea name="footerText" defaultValue={settings.footerText} rows={4} className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
        </label>
        <button className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          Save settings
        </button>
      </form>
    </AdminShell>
  );
}
