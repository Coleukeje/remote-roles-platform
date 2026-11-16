-- ============================================================
-- Remote Roles Hub — Staff roles
--
-- Until now "is this person an admin" was a hardcoded list of email
-- addresses compiled into the app, which meant:
--   • adding an HR user needed a code change and a deploy
--   • the list shipped to the browser in the client bundle
--
-- This moves it to a column on the profile, checked on the server.
-- Every new signup is a student. Only an existing admin (or this file)
-- can promote someone.
--
-- Run this in the Supabase SQL Editor. Safe to re-run.
-- ============================================================

alter table public.profiles
  add column if not exists role text not null default 'student';

-- Added separately so a re-run on an existing column still gets the check.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_role_check'
  ) then
    alter table public.profiles
      add constraint profiles_role_check check (role in ('student', 'admin'));
  end if;
end $$;

create index if not exists idx_profiles_role on public.profiles(role);

-- Seed the first admin. Without this nobody can reach the panel to
-- promote anyone else.
update public.profiles
   set role = 'admin'
 where lower(email) = 'ukejecole@gmail.com';

-- Staff can see the whole programme; otherwise an admin would be looking at
-- a paywall while trying to support the people who hit it.
update public.profiles
   set access_level = 'full'
 where role = 'admin' and access_level <> 'full';

-- A trainee may still edit their own name, but not hand themselves a role.
-- Role changes go through the service role, which bypasses RLS.
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and access_level = (select p.access_level from public.profiles p where p.id = auth.uid())
    and payment_status = (select p.payment_status from public.profiles p where p.id = auth.uid())
    and role = (select p.role from public.profiles p where p.id = auth.uid())
  );
