import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { SocialLinkForm } from "@/components/admin/SocialLinkForm";

export const dynamic = "force-dynamic";

type NewSocialLinkPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewSocialLinkPage({ searchParams }: NewSocialLinkPageProps) {
  const params = await searchParams;

  return (
    <AdminShell>
      <div className="mb-8">
        <Link
          href="/admin/social-links"
          className="font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
        >
          Back to social links
        </Link>
        <h1 className="mt-4 font-serif text-4xl font-bold text-navy-deep">Add social link</h1>
      </div>
      <SocialLinkForm error={params.error} />
    </AdminShell>
  );
}
