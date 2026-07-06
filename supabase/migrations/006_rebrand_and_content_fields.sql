-- Rebrand to Mike Helens Manuscripts + add category/hook/cover_alt fields to books.
-- Run this in the Supabase SQL editor (same manual process as migrations 001-005).

alter table public.books add column if not exists category text default '';
alter table public.books add column if not exists hook text default '';
alter table public.books add column if not exists cover_alt text default '';

update public.books
set
  category = 'Marriage Testimony',
  hook = 'A testimony of divine guidance, love, faith, and God''s faithful provision in marriage.',
  cover_alt = 'I Said Yes book cover'
where slug = 'i-said-yes' and (category is null or category = '');

update public.books
set
  category = 'Spiritual Transformation',
  hook = 'A spiritual guide to understanding foundations, confronting ungodly altars, and walking in God''s transforming power.',
  cover_alt = 'Strange Altars book cover'
where slug = 'strange-altars' and (category is null or category = '');

update public.site_settings
set
  site_name = 'Mike Helens Manuscripts',
  tagline = 'Christian books, testimonies, and faith-building manuscripts.',
  hero_headline = 'Faith-building books for the journey of life',
  hero_subheadline = 'Manuscripts by Pastor Akinwumi Awe written to strengthen faith, guide families, and encourage believers with practical spiritual insight.',
  footer_text = 'Christian books, testimonies, and faith-building manuscripts.'
where id = 1;
