# Mike Helens Manuscripts

A Next.js App Router site for Mike Helens Manuscripts with a Supabase-backed public book catalogue and owner-only admin MVP for managing books.

## Local Run

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Only these two public Supabase variables are used by the app. Do not add a service-role key.

3. Start development:

```bash
npm run dev
```

On this Windows machine, PowerShell may block `npm.ps1`; use `npm.cmd run dev` if needed.

## Supabase Setup

1. In Supabase SQL editor, run the SQL files in `supabase/migrations/` in numeric order:
   - `001_initial_schema.sql`
   - `002_harden_rls_and_storage_policies.sql`
   - `003_restrict_admin_helper_and_storage_roles.sql`
   - `004_seed_starter_content.sql` if you want editable starter content
   - `005_wire_brand_assets.sql` if you want the current starter brand/content values
   - `006_rebrand_and_content_fields.sql` to add book category/hook/cover-alt fields and rebrand site_settings to Mike Helens Manuscripts
2. Create a public Storage bucket named `media`.
3. Keep uploads organized under:
   - `covers/`
   - `site/`
4. In Supabase Auth settings, disable public sign-up.
5. Create the owner user in Supabase Auth.
6. Insert the owner email into the admin allowlist:

```sql
insert into public.admins (email) values ('owner@email.com');
```

The admin uses Supabase email/password auth. All admin reads and writes use the signed-in user session with RLS. The service-role key must never be committed or added to application code.

## Admin

- Login: `/admin/login`
- Dashboard: `/admin`
- Books: `/admin/books`

The books admin supports listing all statuses, filtering, adding/editing books, uploading covers to Supabase Storage, saving drafts, publishing, archiving, reordering by `sort_order`, and previewing draft content before publishing.

Draft and archived books stay out of the public site. Published books appear on `/books`, `/books/[slug]`, the homepage featured/teaser sections, and the sitemap after revalidation.

Homepage, About, Testimonials, Contact & Social, and Settings can be edited from the admin area. Image uploads use Server Actions with a 10 MB body limit.

Purchase links are plain external Selar/Amazon URLs. Selar handles payment and file delivery; there is no cart, account area, or on-site payment flow.

The starter migration seeds placeholder books/testimonials/settings so the public site has editable content immediately after setup.

## Deployment To Vercel

1. Import the repo into Vercel.
2. Add these environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Use the default Next.js build command.

`/admin` is marked `noindex` and disallowed in `robots.txt`.

## Security Notes

- RLS is enabled for all app tables.
- Anonymous users can read only published books/testimonials and site settings.
- Admin access requires both a valid Supabase session and an email in `public.admins`.
- `.env*` files are gitignored.
- No service-role key is used anywhere in application code.
