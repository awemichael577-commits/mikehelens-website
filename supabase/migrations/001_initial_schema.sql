-- Shekinah Books initial schema.
-- Run this in the Supabase SQL editor, then create a public Storage bucket named "media".

create extension if not exists pgcrypto;

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  description text default '',
  audience text default '',
  benefits text[] default '{}',
  cover_path text,
  price numeric,
  currency text default 'NGN',
  price_display text,
  selar_url text,
  amazon_url text,
  featured boolean default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  book_id uuid references public.books(id) on delete cascade,
  quote text not null,
  name text not null,
  role text,
  status text not null default 'published' check (status in ('draft', 'published')),
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.site_settings (
  id int primary key default 1,
  site_name text default 'Shekinah Books',
  tagline text default '',
  hero_headline text default '',
  hero_subheadline text default '',
  hero_cta_text text default 'Explore the books',
  hero_trust_cue text default '',
  hero_image_path text,
  author_name text default '',
  about_bio text default '',
  portrait_path text,
  whatsapp text default '',
  email text default '',
  facebook text default '',
  instagram text default '',
  youtube text default '',
  footer_text text default '',
  updated_at timestamptz default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into public.site_settings (id) values (1) on conflict do nothing;

create table if not exists public.admins (
  email text primary key
);

-- TODO: after creating the owner's auth user, insert their email:
-- insert into public.admins (email) values ('OWNER_EMAIL'); -- TODO: confirm

create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists books_touch on public.books;
create trigger books_touch before update on public.books
  for each row execute function public.touch_updated_at();

drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

create or replace function public.is_admin() returns boolean as $$
  select exists (
    select 1 from public.admins a
    where a.email = (auth.jwt() ->> 'email')
  );
$$ language sql stable security definer set search_path = public;

alter table public.books enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_settings enable row level security;
alter table public.admins enable row level security;

drop policy if exists books_public_read on public.books;
create policy books_public_read on public.books
  for select using (status = 'published');

drop policy if exists testimonials_public_read on public.testimonials;
create policy testimonials_public_read on public.testimonials
  for select using (status = 'published');

drop policy if exists settings_public_read on public.site_settings;
create policy settings_public_read on public.site_settings
  for select using (true);

drop policy if exists books_admin_all on public.books;
create policy books_admin_all on public.books
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists testimonials_admin_all on public.testimonials;
create policy testimonials_admin_all on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists settings_admin_write on public.site_settings;
create policy settings_admin_write on public.site_settings
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists admins_admin_read on public.admins;
create policy admins_admin_read on public.admins
  for select using (public.is_admin());

-- Storage setup:
-- 1. Create a public bucket named "media" in Supabase Storage.
-- 2. Create folders by uploading files under covers/ and site/.
-- 3. Run the policies below after the bucket exists.

drop policy if exists media_public_read on storage.objects;
create policy media_public_read on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists media_admin_insert on storage.objects;
create policy media_admin_insert on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());

drop policy if exists media_admin_update on storage.objects;
create policy media_admin_update on storage.objects
  for update using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists media_admin_delete on storage.objects;
create policy media_admin_delete on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());
