import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site";
import { getPublicMediaUrl } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "About Pastor Akinwumi Awe",
  description:
    "Learn about Pastor Akinwumi Awe, the faith-based author behind Mikehelens Manuscripts & Publications.",
  path: "/about",
});

const values = [
  {
    title: "Faith",
    text: "Books that point readers back to God's word, wisdom, and guidance.",
  },
  {
    title: "Family",
    text: "Resources that encourage homes, couples, and family life.",
  },
  {
    title: "Testimony",
    text: "Real stories that help readers see God's hand clearly.",
  },
  {
    title: "Spiritual Growth",
    text: "Teaching that strengthens understanding, prayer, and Christian maturity.",
  },
  {
    title: "Practical Living",
    text: "Simple Christian wisdom for everyday decisions and relationships.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const milestones = [
    { title: "Ministry journey", text: settings.credibilityMinistry },
    { title: "Books published", text: settings.credibilityBooks },
    { title: "Teaching and counselling", text: settings.credibilityTeaching },
    { title: "Family testimony", text: settings.credibilityFamily },
  ];
  const whatsapp = settings.whatsapp || siteConfig.whatsappNumber;
  const portraitImage = getPublicMediaUrl(settings.portraitPath);
  const bioParagraphs = settings.aboutBio
    .split(/\n{2,}|\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <section className="bg-[radial-gradient(circle_at_10%_10%,rgba(201,162,75,0.12),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#F7F8FA_100%)] pt-[76px]">
        <div className="mx-auto grid max-w-[1200px] gap-9 px-5 py-12 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14 lg:px-10 lg:py-16">
          <div className="mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-[460px]">
            <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_18px_45px_rgba(18,41,75,0.14)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={portraitImage}
                  alt="Pastor Akinwumi Awe portrait"
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="max-w-[720px]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
              About the author
            </p>
            <h1 className="mt-5 font-serif text-[clamp(3rem,5vw,4.5rem)] font-bold leading-[1.05] text-navy-deep">
              {settings.authorName}
            </h1>
            <p className="mt-4 text-2xl font-bold text-navy-soft">
              Author, pastor, teacher, and faith-based writer.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {settings.aboutBio}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/books" className="w-full sm:w-auto">
                Explore the books
              </Button>
              <Button href="/contact" variant="secondary" className="w-full sm:w-auto">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[52px] lg:py-16">
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
            Author story
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-navy-deep">
            The heart behind the books
          </h2>
          <div className="mt-6 grid gap-5 text-[1.08rem] leading-[1.85] text-muted">
            {bioParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-alt px-5 py-[52px] sm:px-8 lg:py-16">
        <div className="mx-auto max-w-[900px] rounded-[28px] border border-line bg-gold-pale p-6 text-center shadow-[0_14px_34px_rgba(18,41,75,0.08)] sm:p-8 lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
            Mission
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-navy-deep">
            Why Mikehelens Manuscripts & Publications exists
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.08rem] leading-[1.8] text-muted">
            Mikehelens Manuscripts & Publications exists to share Christian books that strengthen faith,
            encourage families, and help believers apply spiritual truth to
            everyday life.
          </p>
        </div>
      </section>

      <section className="bg-white py-[52px] lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
          <div className="max-w-[760px]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
              Values
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-navy-deep">
              Guided by faith, family, and testimony
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-[22px] border border-line bg-white p-6 shadow-[0_12px_30px_rgba(18,41,75,0.07)]"
              >
                <div className="mb-5 h-1 w-12 rounded-full bg-gold" />
                <h3 className="font-serif text-2xl font-bold text-navy-deep">
                  {value.title}
                </h3>
                <p className="mt-3 leading-7 text-muted">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-[52px] lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
          <div className="max-w-[760px]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
              Credibility
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-navy-deep">
              Credibility and journey
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Three decades of ministry, teaching, publishing, and shared family
              testimony.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone) => (
              <article
                key={milestone.title}
                className="rounded-[20px] border border-line bg-white p-5 shadow-[0_10px_26px_rgba(18,41,75,0.06)]"
              >
                <h3 className="font-serif text-xl font-bold text-navy-deep">
                  {milestone.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{milestone.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-[52px] sm:px-8 lg:py-16">
        <figure className="mx-auto max-w-[900px] rounded-[28px] bg-navy-deep p-6 text-white shadow-[0_20px_55px_rgba(18,41,75,0.16)] sm:p-8 lg:p-10">
          <blockquote className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.18]">
            &ldquo;My desire is that every reader will see God&apos;s hand clearly
            and find courage to walk in His purpose.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-white/70">
            {settings.authorName}
          </figcaption>
        </figure>
      </section>

      <section className="bg-bg-alt px-5 py-[52px] sm:px-8 lg:py-16">
        <div className="mx-auto max-w-[1200px] rounded-[28px] border border-line bg-white p-6 shadow-[0_16px_42px_rgba(18,41,75,0.1)] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-navy-deep">
                Explore books written to strengthen faith, family, and purpose.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                Discover Christian books that speak to marriage, spiritual
                growth, testimony, and everyday faith.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/books" className="w-full sm:w-auto">
                Explore the books
              </Button>
              <Button
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Contact on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
