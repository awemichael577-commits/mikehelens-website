-- Add editable category + optional custom icon to the admin-managed social/external links.
-- Run this in the Supabase SQL editor (same manual process as migrations 001-008).

alter table public.social_links add column if not exists category text default 'Other';
alter table public.social_links add column if not exists icon_path text;

-- Give existing rows a sensible starting category based on platform.
update public.social_links
set category = 'Personal Channels'
where (category is null or category = '') and platform in ('youtube', 'tiktok', 'x', 'instagram', 'facebook');

update public.social_links
set category = 'Other'
where category is null or category = '';
