-- Run in the Supabase SQL Editor as the project administrator.
-- Only three administrator-selected auth.users can have a profile.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  member_slot smallint not null unique check (member_slot between 1 and 3),
  name text not null check (length(btrim(name)) > 0),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;

drop policy if exists "Participants can read their own profile" on public.profiles;
create policy "Participants can read their own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

-- There are deliberately no INSERT, UPDATE or DELETE policies for app users.
-- The administrator inserts the three rows in SQL Editor after creating auth users.
