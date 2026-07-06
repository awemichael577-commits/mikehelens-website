import Link from "next/link";
import type { ReactNode } from "react";
import { signOutAction } from "@/app/admin/actions";
import { requireAdminClient } from "@/lib/admin";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/books", label: "Books" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/social-links", label: "Social Links" },
  { href: "/admin/settings", label: "Settings" },
];

export async function AdminShell({ children }: { children: ReactNode }) {
  await requireAdminClient();

  return (
    <div className="min-h-screen bg-bg-alt pt-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[240px_1fr] lg:px-12">
        <aside className="h-fit rounded-2xl border border-line bg-white p-4 shadow-sm">
          <Link href="/admin" className="block font-serif text-2xl font-bold text-navy-deep">
            MHM Admin
          </Link>
          <nav className="mt-6 grid gap-1" aria-label="Admin navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-bold text-muted transition hover:bg-gold-pale hover:text-navy-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 grid gap-2 border-t border-line pt-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-3 py-2 text-sm font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
            >
              View live site
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-muted transition hover:bg-line hover:text-navy-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                Sign out
              </button>
            </form>
          </div>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
