-- Reusable, admin-managed social links system.
-- Run this in the Supabase SQL editor (same manual process as migrations 001-006).

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('youtube', 'facebook', 'instagram', 'whatsapp', 'email', 'website', 'tiktok', 'x')),
  display_name text not null,
  handle text default '',
  url text default '',
  description text default '',
  is_featured boolean not null default false,
  show_in_footer boolean not null default false,
  show_on_contact_page boolean not null default false,
  status text not null default 'active' check (status in ('active', 'hidden')),
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists social_links_touch on public.social_links;
create trigger social_links_touch before update on public.social_links
  for each row execute function public.touch_updated_at();

alter table public.social_links enable row level security;

drop policy if exists social_links_public_read on public.social_links;
create policy social_links_public_read on public.social_links
  for select using (status = 'active');

drop policy if exists social_links_admin_all on public.social_links;
create policy social_links_admin_all on public.social_links
  for all using (public.is_admin()) with check (public.is_admin());

-- Seed example rows as hidden drafts so nothing broken shows publicly until the
-- owner confirms the real URLs and enables them from /admin/social-links.
-- Guarded with `where not exists` since there is no natural unique key to key
-- an `on conflict` off of, so this migration stays safe to run more than once.
insert into public.social_links
  (platform, display_name, handle, url, description, is_featured, show_in_footer, show_on_contact_page, status, sort_order)
select 'youtube', 'Mike Helens Manuscripts', '@mikehelensmanuscripts', '', 'Visit our YouTube channel for book updates, testimonies, teachings, and faith-building video content.', true, false, false, 'hidden', 1
where not exists (select 1 from public.social_links where platform = 'youtube' and display_name = 'Mike Helens Manuscripts');

insert into public.social_links
  (platform, display_name, handle, url, description, is_featured, show_in_footer, show_on_contact_page, status, sort_order)
select 'youtube', 'Pastor Akinwumi Awe Messages', '@pastorawe', '', 'Watch messages, ministry teachings, and spiritual encouragement from Pastor Akinwumi Awe.', false, false, false, 'hidden', 2
where not exists (select 1 from public.social_links where platform = 'youtube' and display_name = 'Pastor Akinwumi Awe Messages');

insert into public.social_links
  (platform, display_name, handle, url, description, is_featured, show_in_footer, show_on_contact_page, status, sort_order)
select 'facebook', 'Pastor Akinwumi Awe', 'Personal Facebook Profile', '', 'Connect with Pastor Akinwumi Awe directly on Facebook.', false, false, false, 'hidden', 3
where not exists (select 1 from public.social_links where platform = 'facebook' and display_name = 'Pastor Akinwumi Awe');

insert into public.social_links
  (platform, display_name, handle, url, description, is_featured, show_in_footer, show_on_contact_page, status, sort_order)
select 'instagram', 'Mike Helens Manuscripts', '@mikehelensmanuscripts', '', 'Follow for book updates, quotes, launch news, and faith-building posts.', false, false, false, 'hidden', 4
where not exists (select 1 from public.social_links where platform = 'instagram' and display_name = 'Mike Helens Manuscripts');
