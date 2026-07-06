import Link from "next/link";
import {
  deleteSocialLinkAction,
  reorderSocialLinkAction,
  updateSocialLinkStatusAction,
} from "@/app/admin/social-links/actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { PLATFORM_LABELS, SocialIcon } from "@/components/social/icons";
import { getAdminSocialLinks, socialLinkStatusClasses, socialLinkStatusLabel } from "@/lib/admin-social-links";

export const dynamic = "force-dynamic";

type AdminSocialLinksPageProps = {
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
};

export default async function AdminSocialLinksPage({ searchParams }: AdminSocialLinksPageProps) {
  const [params, links] = await Promise.all([searchParams, getAdminSocialLinks()]);

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">Social links</p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">Manage social links</h1>
        </div>
        <Link
          href="/admin/social-links/new"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Add social link
        </Link>
      </div>

      <AdminNotice saved={params.saved} error={params.error} />

      <p className="mb-5 max-w-2xl text-sm leading-6 text-muted">
        Only <strong>active</strong> links are visible publicly. All active links appear on the{" "}
        <Link href="/connect" className="font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4">
          Connect page
        </Link>
        , grouped by category.
      </p>

      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-line text-sm">
            <thead className="bg-bg-alt text-left text-xs uppercase tracking-[0.16em] text-muted">
              <tr>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {links.map((link) => (
                <tr key={link.id}>
                  <td className="px-4 py-4">
                    <div className="flex min-w-[220px] items-center gap-3">
                      <SocialIcon platform={link.platform} iconUrl={link.iconUrl} className="size-9 shrink-0 rounded-[11px]" />
                      <div>
                        <p className="font-bold text-navy-deep">{link.displayName}</p>
                        <p className="mt-0.5 text-xs text-muted">
                          {PLATFORM_LABELS[link.platform]}
                          {link.handle ? ` · ${link.handle}` : ""}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-full border border-line bg-bg-alt px-3 py-1 text-xs font-bold text-navy-deep">
                      {link.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${socialLinkStatusClasses(link.status)}`}
                    >
                      {socialLinkStatusLabel(link.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-lg" aria-label={link.isFeatured ? "Featured" : "Not featured"}>
                    {link.isFeatured ? "*" : "-"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {["up", "down"].map((direction) => (
                        <form action={reorderSocialLinkAction} key={direction}>
                          <input type="hidden" name="id" value={link.id} />
                          <input type="hidden" name="sortOrder" value={link.sortOrder} />
                          <input type="hidden" name="direction" value={direction} />
                          <button className="rounded-lg border border-line px-2 py-1 text-xs font-bold text-navy-deep">
                            {direction === "up" ? "Up" : "Down"}
                          </button>
                        </form>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/social-links/${link.id}/edit`}
                        className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-navy-deep"
                      >
                        Edit
                      </Link>
                      <form action={updateSocialLinkStatusAction}>
                        <input type="hidden" name="id" value={link.id} />
                        <input
                          type="hidden"
                          name="status"
                          value={link.status === "active" ? "hidden" : "active"}
                        />
                        <button className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-navy-deep">
                          {link.status === "active" ? "Hide" : "Activate"}
                        </button>
                      </form>
                      <form action={deleteSocialLinkAction}>
                        <input type="hidden" name="id" value={link.id} />
                        <button className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-red-700">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {links.length === 0 ? (
          <p className="p-8 text-center text-muted">No social links yet. Add your first one above.</p>
        ) : null}
      </div>
    </AdminShell>
  );
}
