-- Add editable "Credibility and journey" fields to site_settings for the About page.
-- Run this in the Supabase SQL editor (same manual process as migrations 001-009).

alter table public.site_settings add column if not exists credibility_ministry text default '';
alter table public.site_settings add column if not exists credibility_books text default '';
alter table public.site_settings add column if not exists credibility_teaching text default '';
alter table public.site_settings add column if not exists credibility_family text default '';

update public.site_settings
set
  credibility_ministry = 'For over 30 years, Pastor Akinwumi Awe has led God''s people with wisdom and spiritual insight, since first receiving his call to ministry in 1996 and entering full-time ministry in 2000 after seminary training at Christ Apostolic Church Theological Seminary, Ile-Ife.',
  credibility_books = 'Pastor Awe''s teaching ministry has produced Strange Altars and I Said Yes, drawn from a personal sermon archive of over 2,000 messages — with more titles currently in development.',
  credibility_teaching = 'Pastor Awe is currently pursuing a Master''s in Organisational Leadership and has walked alongside couples and church leaders through real pastoral conflict resolution and spiritual formation training.',
  credibility_family = 'Pastor Akinwumi and Pastor (Mrs) Oluwafayokemi Helen Awe co-founded Shekinah International Academy together and share their own story of divine guidance in marriage in their book, I Said Yes.'
where id = 1
  and (credibility_ministry is null or credibility_ministry = '');
