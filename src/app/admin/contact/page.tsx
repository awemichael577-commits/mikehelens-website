import Link from "next/link";
import { saveContactAction } from "@/app/admin/content-actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminContactPage({ searchParams }: PageProps) {
  const [params, settings] = await Promise.all([searchParams, getSiteSettings()]);

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
          Contact
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">
          Edit contact details
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Facebook, Instagram, YouTube, and other social platforms are managed from{" "}
          <Link href="/admin/social-links" className="font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4">
            Social Links
          </Link>
          .
        </p>
      </div>
      <AdminNotice saved={params.saved} error={params.error} />
      <form action={saveContactAction} className="grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-navy-deep">
            Email
            <input name="email" type="email" defaultValue={settings.email} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-navy-deep">
            WhatsApp number
            <input name="whatsapp" defaultValue={settings.whatsapp} className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold" />
          </label>
        </div>
        <button className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
          Save contact
        </button>
      </form>
    </AdminShell>
  );
}
