"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site";
import type { SiteSettings } from "@/lib/types";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/connect", label: "Connect" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings?: SiteSettings }) {
  const siteName = settings?.siteName || siteConfig.wordmark;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isCurrent(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8 lg:flex-nowrap lg:px-12"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          aria-label={siteName}
          className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          <Image
            src="/assets/logo-horizontal.png"
            alt={`${siteName} logo`}
            width={2000}
            height={520}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line text-xl font-black text-navy-deep transition hover:bg-gold-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold lg:hidden"
        >
          {isOpen ? "x" : "="}
        </button>
        <div
          className={`w-full flex-col gap-2 border-t border-line pt-4 lg:flex lg:w-auto lg:flex-row lg:items-center lg:border-t-0 lg:pt-0 ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                isCurrent(item.href)
                  ? "bg-gold-pale text-navy-deep"
                  : "text-navy-deep hover:bg-gold-pale"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/books" className="mt-2 w-full lg:mt-0 lg:w-auto">
            Get the book
          </Button>
        </div>
      </nav>
    </header>
  );
}
