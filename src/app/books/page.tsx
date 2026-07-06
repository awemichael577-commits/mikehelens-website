import type { Metadata } from "next";
import { BookGrid } from "@/components/BookGrid";
import { Button } from "@/components/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { getPublishedBooks, getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Books",
  description:
    "Browse Mikehelens Manuscripts & Publications titles by Pastor Akinwumi Awe, including I Said Yes and Strange Altars.",
  path: "/books",
});

export default async function BooksPage() {
  const [publishedBooks, settings] = await Promise.all([
    getPublishedBooks(),
    getSiteSettings(),
  ]);
  const whatsapp = settings.whatsapp || siteConfig.whatsappNumber;

  return (
    <>
      <section className="bg-[radial-gradient(circle_at_10%_10%,rgba(201,162,75,0.12),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#F7F8FA_100%)] pt-[76px]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-[820px]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
              Book catalogue
            </p>
            <h1 className="mt-5 font-serif text-[clamp(3rem,5vw,4.5rem)] font-bold leading-[1.05] text-navy-deep">
              Christian books for faith, family, and transformation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Explore faith-building books by Pastor Akinwumi Awe, written to
              encourage believers, strengthen homes, and point readers back to
              God&apos;s guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pt-[52px] lg:pt-16">
        <BookGrid books={publishedBooks} whatsapp={whatsapp} />
      </section>

      <section className="bg-bg-alt px-5 py-[52px] sm:px-8 lg:py-16">
        <div className="mx-auto max-w-[1200px] rounded-[28px] bg-navy-deep p-6 text-white shadow-[0_20px_55px_rgba(18,41,75,0.16)] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1]">
                Need help choosing a book?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">
                Chat with us on WhatsApp and we&apos;ll help you find the right
                book for your season.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton whatsapp={whatsapp} label="Contact on WhatsApp" className="w-full px-6 sm:w-auto" />
              <Button href="/contact" variant="secondary" className="w-full sm:w-auto">
                Contact page
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
