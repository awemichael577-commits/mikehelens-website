-- Contact form inbox. Visitors insert (write-only, no public read), owner reads/manages from /admin/messages.
-- Run this in the Supabase SQL editor (same manual process as migrations 001-007).

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text default '',
  phone text default '',
  reason text default '',
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

-- Public can only insert (submit the form). No public select policy exists,
-- so anonymous visitors can never read back messages, including their own.
drop policy if exists messages_public_insert on public.messages;
create policy messages_public_insert on public.messages
  for insert with check (true);

drop policy if exists messages_admin_all on public.messages;
create policy messages_admin_all on public.messages
  for all using (public.is_admin()) with check (public.is_admin());
