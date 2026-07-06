import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

const sections = [
  {
    href: "/admin/books",
    title: "Books",
    description: "Create drafts, upload covers, preview, publish, archive, and reorder titles.",
  },
  {
    href: "/admin/homepage",
    title: "Homepage",
    description: "Edit the hero headline, subheadline, CTA text, trust cue, and hero image.",
  },
  {
    href: "/admin/about",
    title: "About",
    description: "Edit the author name, biography, and portrait image.",
  },
  {
    href: "/admin/testimonials",
    title: "Testimonials",
    description: "Add, edit, assign, and remove site-wide and per-book testimonials.",
  },
  {
    href: "/admin/messages",
    title: "Messages",
    description: "Read and manage submissions from the public Contact page form.",
  },
  {
    href: "/admin/contact",
    title: "Contact",
    description: "Edit the WhatsApp number and reply-to email used internally.",
  },
  {
    href: "/admin/social-links",
    title: "Social Links",
    description: "Manage Facebook, Instagram, YouTube, and other social platform links.",
  },
  {
    href: "/admin/settings",
    title: "Settings",
    description: "Edit site name, tagline, and footer text.",
  },
];

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
            Owner dashboard
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">
            Manage Mikehelens Manuscripts & Publications
          </h1>
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
        >
          View live site
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <h2 className="font-serif text-2xl font-bold text-navy-deep">{section.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{section.description}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
