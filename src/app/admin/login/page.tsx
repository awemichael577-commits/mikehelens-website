import type { Metadata } from "next";
import { signInAction } from "@/app/admin/actions";
import { getSupabaseConfig } from "@/lib/env";

export const metadata: Metadata = {
  title: "Admin Login | Mikehelens Manuscripts & Publications",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (!error) {
    return null;
  }

  if (error === "not-authorized") {
    return "This signed-in user is not in the admin allowlist.";
  }

  return decodeURIComponent(error);
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = getErrorMessage(params.error);
  const hasSupabase = Boolean(getSupabaseConfig());

  return (
    <main className="min-h-screen bg-bg-alt px-5 py-16 sm:px-8">
      <section className="mx-auto max-w-md rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-dark">
          Owner login
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-navy-deep">
          Mikehelens Manuscripts & Publications Admin
        </h1>
        {!hasSupabase ? (
          <p className="mt-5 rounded-xl border border-gold-pale bg-gold-pale p-4 text-sm leading-6 text-navy-deep">
            Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to
            .env.local before signing in.
          </p>
        ) : null}
        {error ? (
          <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
            {error}
          </p>
        ) : null}
        <form action={signInAction} className="mt-6 grid gap-4">
          <input type="hidden" name="next" value={params.next ?? "/admin"} />
          <div>
            <label className="text-sm font-bold text-navy-deep" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 min-h-12 w-full rounded-xl border-line text-navy-deep focus:border-gold focus:ring-gold"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-navy-deep" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 min-h-12 w-full rounded-xl border-line text-navy-deep focus:border-gold focus:ring-gold"
            />
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!hasSupabase}
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
