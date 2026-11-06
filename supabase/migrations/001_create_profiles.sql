-- ============================================================
-- Remote Roles Hub — Profiles & Access Control
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
--
-- Safe to re-run: every statement is idempotent.
-- ============================================================

-- 1. Create the profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  access_level text not null default 'free' check (access_level in ('free', 'full')),
  payment_status text not null default 'none' check (payment_status in ('none', 'pending', 'paid')),
  payment_reference text,
  paid_at timestamptz,
  invited_by uuid references auth.users(id),
  invited_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Enable Row Level Security
alter table public.profiles enable row level security;

-- 3. RLS policies (dropped first so this migration can be re-run)
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own row, but NOT their own access level or
-- payment fields — those are writable only by the service role, which
-- bypasses RLS entirely (used by the Paystack webhook and admin panel).
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and access_level = (select p.access_level from public.profiles p where p.id = auth.uid())
    and payment_status = (select p.payment_status from public.profiles p where p.id = auth.uid())
  );

-- 4. Auto-create a profile when a new user signs up.
--    `on conflict do nothing` matters: if this insert ever raised, the
--    whole signup transaction would roll back and the user couldn't register.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    lower(new.email)
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Auto-update the updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

drop trigger if exists on_profiles_updated on public.profiles;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- 6. Indexes for admin lookups
create index if not exists idx_profiles_access_level on public.profiles(access_level);
create index if not exists idx_profiles_email on public.profiles(email);

-- 7. Backfill profiles for users who signed up before this migration
insert into public.profiles (id, full_name, email)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'full_name', ''),
  lower(u.email)
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id)
on conflict (id) do nothing;

-- 8. Normalize any emails that were stored with mixed case
update public.profiles set email = lower(email) where email <> lower(email);
