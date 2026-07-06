import type { Metadata } from "next";
import { sendContactMessageAction } from "@/app/contact/actions";
import { Button } from "@/components/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

type ContactPageProps = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export const metadata: Metadata = pageMetadata({
  title: "Contact Mikehelens Manuscripts & Publications",
  description:
    "Contact Mikehelens Manuscripts & Publications for book enquiries, purchase support, WhatsApp help, email enquiries, and ministry invitations.",
  path: "/contact",
});

const faqs = [
  {
    question: "Can I ask for help before buying a book?",
    answer: "Yes. You can contact us on WhatsApp for guidance before purchasing.",
  },
  {
    question: "Can I invite Pastor Awe for a ministry or speaking engagement?",
    answer: "Yes. Use the message form below for formal invitations.",
  },
  {
    question: "Where do I buy the books?",
    answer:
      "Each book page includes purchase buttons. If a link is unavailable, contact us on WhatsApp for support.",
  },
  {
    question: "How do I receive my eBook?",
    answer:
      "After paying on Selar, your download is delivered by Selar automatically.",
  },
];

function displayPhone(value: string) {
  if (!value) {
    return "+234 XXX XXX XXXX"; // TODO: replace with confirmed public WhatsApp number.
  }

  return value.startsWith("+") ? value : `+${value}`;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [params, settings] = await Promise.all([searchParams, getSiteSettings()]);
  const whatsapp = settings.whatsapp || siteConfig.whatsappNumber;
  const whatsappUrl = `https://wa.me/${whatsapp}`;
  const formRenderedAt = Date.now();

  return (
    <>
      <section className="bg-[radial-gradient(circle_at_10%_10%,rgba(201,162,75,0.12),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#F7F8FA_100%)] pt-[76px]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-[780px]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
              Contact
            </p>
            <h1 className="mt-5 font-serif text-[clamp(3rem,5vw,4.5rem)] font-bold leading-[1.05] text-navy-deep">
              Get in touch with Mikehelens Manuscripts & Publications
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Have a question about a book, purchase link, invitation, or
              ministry enquiry? Reach out and we&apos;ll guide you clearly.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton whatsapp={whatsapp} label="Chat on WhatsApp" className="w-full px-6 sm:w-auto" />
              <Button href="#message" variant="secondary" className="w-full sm:w-auto">
                Send a message
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[52px] lg:py-16">
        <div className="mx-auto grid max-w-[1200px] gap-5 px-5 sm:px-8 md:grid-cols-3 lg:px-10">
          <article className="rounded-[24px] border border-[#cfeedd] bg-[#f2fbf6] p-6 shadow-[0_14px_34px_rgba(18,41,75,0.08)]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-navy-deep">
              WhatsApp
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-deep">
              Fast reader support
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Best for book enquiries, purchase support, and quick questions.
            </p>
            <WhatsAppButton whatsapp={whatsapp} label="Chat on WhatsApp" className="mt-6 w-full px-5" />
          </article>

          <article className="rounded-[24px] border border-line bg-white p-6 shadow-[0_14px_34px_rgba(18,41,75,0.07)]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
              Message
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-deep">
              Formal enquiries
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Best for longer questions, official enquiries, or formal
              communication.
            </p>
            <Button href="#message" variant="secondary" className="mt-6 w-full">
              Send a Message
            </Button>
          </article>

          <article className="rounded-[24px] border border-line bg-white p-6 shadow-[0_14px_34px_rgba(18,41,75,0.07)]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
              Ministry / Invitations
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-deep">
              Invitations
            </h2>
            <p className="mt-4 leading-7 text-muted">
              For speaking invitations, ministry collaboration, or official
              contact.
            </p>
            <Button href="#message" variant="secondary" className="mt-6 w-full">
              Make Enquiry
            </Button>
          </article>
        </div>
      </section>

      <section id="message" className="bg-bg-alt py-[52px] lg:py-16">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:px-10">
          <div className="rounded-[24px] border border-line bg-white p-6 shadow-[0_14px_34px_rgba(18,41,75,0.08)] sm:p-8">
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-navy-deep">
              Send a message
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Fill in the form below and we&apos;ll get back to you. For the fastest
              response, WhatsApp is best.
            </p>
            {params.sent ? (
              <p className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700">
                Thank you — your message has been sent.
              </p>
            ) : null}
            {params.error ? (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                {decodeURIComponent(params.error)}
              </p>
            ) : null}
            <form action={sendContactMessageAction} className="mt-7 grid gap-5">
              <input type="hidden" name="formRenderedAt" value={formRenderedAt} />
              <label
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                aria-hidden="true"
              >
                Leave this field blank
                <input name="company" type="text" tabIndex={-1} autoComplete="off" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy-deep">
                Full Name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  className="min-h-12 rounded-[14px] border border-line px-4 font-normal text-navy-deep focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </label>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-navy-deep">
                  Email Address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="min-h-12 rounded-[14px] border border-line px-4 font-normal text-navy-deep focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-navy-deep">
                  Phone / WhatsApp Number
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="min-h-12 rounded-[14px] border border-line px-4 font-normal text-navy-deep focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-bold text-navy-deep">
                Reason for Contact
                <select
                  name="reason"
                  defaultValue="Book enquiry"
                  className="min-h-12 rounded-[14px] border border-line px-4 font-normal text-navy-deep focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                >
                  <option>Book enquiry</option>
                  <option>Purchase support</option>
                  <option>Ministry invitation</option>
                  <option>General question</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-navy-deep">
                Message
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="rounded-[14px] border border-line px-4 py-3 font-normal text-navy-deep focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-fit"
              >
                Send Message
              </button>
            </form>
          </div>

          <aside className="rounded-[24px] border border-line bg-white p-6 shadow-[0_14px_34px_rgba(18,41,75,0.08)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
              Best way to reach us
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-deep">
              WhatsApp is fastest
            </h2>
            <p className="mt-4 leading-7 text-muted">
              For most readers and buyers, WhatsApp is the fastest way to receive
              help with book enquiries, purchase links, and availability.
            </p>
            <div className="mt-7 grid gap-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
                  WhatsApp
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
                >
                  {displayPhone(whatsapp)}
                </a>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
                  Message
                </p>
                <a
                  href="#message"
                  className="mt-2 inline-flex font-bold text-navy-deep underline decoration-gold decoration-2 underline-offset-4"
                >
                  Use the form to send us a message
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-[52px] lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
          <div className="max-w-[760px]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted">
              Common questions
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-navy-deep">
              Quick answers before you reach out
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[22px] border border-line bg-white p-6 shadow-[0_12px_30px_rgba(18,41,75,0.07)]"
              >
                <h3 className="font-serif text-2xl font-bold text-navy-deep">
                  {faq.question}
                </h3>
                <p className="mt-4 leading-7 text-muted">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
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
              <Button href="/books" variant="secondary" className="w-full sm:w-auto">
                Explore books
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
