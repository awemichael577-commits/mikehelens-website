import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SocialLinkForm } from "@/components/admin/SocialLinkForm";
import { getAdminSocialLinkById } from "@/lib/admin-social-links";

export const dynamic = "force-dynamic";

type EditSocialLinkPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditSocialLinkPage({ params, searchParams }: EditSocialLinkPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const link = await getAdminSocialLinkById(id);

  if (!link) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="mb-8">
        <Link
          href="/admin/social-links"
          className="font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
        >
          Back to social links
        </Link>
        <h1 className="mt-4 font-serif text-4xl font-bold text-navy-deep">Edit {link.displayName}</h1>
      </div>
      <SocialLinkForm link={link} error={query.error} />
    </AdminShell>
  );
}
