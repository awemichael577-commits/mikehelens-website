import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import type { SiteSettings } from "@/lib/types";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/connect", label: "Connect" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ settings }: { settings?: SiteSettings }) {
  const siteName = settings?.siteName || siteConfig.wordmark;
  const footerText = settings?.footerText || settings?.tagline || siteConfig.tagline;
  const whatsapp = settings?.whatsapp || siteConfig.whatsappNumber;

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-12 lg:px-12">
        <div className="max-w-sm">
          <Image
            src="/assets/logo-reversed.png"
            alt={`${siteName} logo`}
            width={2000}
            height={1871}
            className="h-24 w-auto"
          />
          <p className="mt-5 text-sm leading-6 text-white/65">{footerText}</p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Explore
          </p>
          <ul className="grid gap-2.5 text-sm">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 transition hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Connect
          </p>
          <ul className="grid gap-2.5 text-sm">
            {whatsapp ? (
              <li>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 transition hover:text-gold"
                >
                  Chat on WhatsApp
                </a>
              </li>
            ) : null}
            <li>
              <Link href="/contact" className="text-white/75 transition hover:text-gold">
                Send a message
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-sm text-white/55">
        &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
      </div>
    </footer>
  );
}
