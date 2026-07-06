import { siteConfig } from "@/data/site";

export function EmailSignup() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-11 sm:px-8 lg:px-12 lg:pb-[72px] lg:pt-14">
      <div className="grid gap-6 rounded-[2rem] bg-navy-deep p-6 text-white shadow-soft sm:p-7 lg:grid-cols-[0.9fr_1fr] lg:p-10">
        <div>
          <h2 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Get notified when the next book releases
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/75">
            Receive occasional updates about new books, devotionals, and Christian
            resources from Mikehelens Manuscripts & Publications.
          </p>
        </div>
        <form
          action={siteConfig.emailSignupAction}
          method="post"
          className="flex flex-col justify-center gap-4"
        >
          {/* TODO: connect email provider */}
          <label className="text-sm font-bold text-white" htmlFor="email">
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="email"
              name="email"
              type="email"
              required
              suppressHydrationWarning
              placeholder="Email address"
              className="min-h-12 flex-1 rounded-full border-white/20 bg-white px-5 text-navy-deep placeholder:text-muted focus:border-gold focus:ring-gold"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-black text-navy-deep transition hover:bg-gold-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Notify me
            </button>
          </div>
          <p className="text-xs leading-5 text-white/60">
            Replace the form action with the client&apos;s real email provider endpoint.
          </p>
        </form>
      </div>
    </section>
  );
}
