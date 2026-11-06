-- ============================================================
-- Fix: grant the standard Supabase roles access to profiles
--
-- Symptom this fixes:
--   code 42501 — "permission denied for table profiles"
--   Payments verify with Paystack but the unlock write is refused,
--   and getUserProfile() silently falls back to free access.
--
-- Cause: public.profiles was created without the table-level GRANTs
-- that Supabase's roles normally receive, so service_role (used by the
-- Paystack webhook and the admin panel) and authenticated (used by the
-- app to read a user's own profile) were both locked out. RLS was never
-- the blocker — the roles couldn't touch the table at all.
--
-- Safe to re-run.
-- ============================================================

-- Schema access
grant usage on schema public to anon, authenticated, service_role;

-- service_role bypasses RLS and does the privileged writes
-- (webhook unlock, admin grant/revoke, invites)
grant all privileges on table public.profiles to service_role;

-- Signed-in users read and update their own row; the RLS policies from
-- migration 001 still constrain them to it and block self-promotion.
grant select, insert, update on table public.profiles to authenticated;

-- Make sure future tables in this schema don't hit the same problem
alter default privileges in schema public
  grant all on tables to service_role;
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;

-- Verify: should list privileges for service_role and authenticated
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'profiles'
  and grantee in ('service_role', 'authenticated', 'anon')
order by grantee, privilege_type;
