create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

create index if not exists testimonials_book_id_idx on public.testimonials(book_id);

-- Public buckets serve files by URL without a broad object SELECT policy.
drop policy if exists media_public_read on storage.objects;

-- Scope table policies to the roles that actually need them.
drop policy if exists books_public_read on public.books;
create policy books_public_read on public.books
  for select to anon using (status = 'published');

drop policy if exists testimonials_public_read on public.testimonials;
create policy testimonials_public_read on public.testimonials
  for select to anon using (status = 'published');

drop policy if exists books_admin_all on public.books;
create policy books_admin_all on public.books
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists testimonials_admin_all on public.testimonials;
create policy testimonials_admin_all on public.testimonials
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists settings_admin_write on public.site_settings;
create policy settings_admin_write on public.site_settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists admins_admin_read on public.admins;
create policy admins_admin_read on public.admins
  for select to authenticated using (public.is_admin());
