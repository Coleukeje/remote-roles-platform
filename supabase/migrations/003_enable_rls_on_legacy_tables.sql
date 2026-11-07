-- ============================================================
-- Lock down the tables that still have RLS switched off
--
-- Why this matters:
--   NEXT_PUBLIC_SUPABASE_ANON_KEY ships to every visitor's browser.
--   That is by design — it is only safe because RLS decides what the
--   key can actually reach. On a table with RLS off, the anon key can
--   read and write every row.
--
--   public.users currently holds 15 trainees' first name, last name,
--   email and country with RLS disabled, so anyone who opened dev
--   tools on the site could read the lot. progress, recordings and
--   roleplay_sessions are in the same state.
--
-- None of these four tables are referenced anywhere in the app — it
-- only ever queries public.profiles — so enabling RLS cannot break
-- anything currently running. The policies below are written so the
-- tables still behave correctly if they are used again later.
--
-- Safe to re-run.
-- ============================================================

-- ─── 1. Turn RLS on ───
alter table public.users              enable row level security;
alter table public.progress           enable row level security;
alter table public.recordings         enable row level security;
alter table public.roleplay_sessions  enable row level security;

-- ─── 2. public.users — each person sees only their own row ───
drop policy if exists "Users can read own user row"   on public.users;
drop policy if exists "Users can update own user row" on public.users;

create policy "Users can read own user row"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own user row"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ─── 3. public.progress — each person sees only their own rows ───
drop policy if exists "Users can read own progress"   on public.progress;
drop policy if exists "Users can write own progress"  on public.progress;
drop policy if exists "Users can update own progress" on public.progress;

create policy "Users can read own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can write own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── 4. recordings and roleplay_sessions ───
-- Both are empty and unused. RLS is on with no policies, which denies
-- all client access outright. service_role still bypasses RLS, so the
-- admin side can reach them. Add policies here if these are ever used.

-- ─── 5. Role grants ───
-- Same gap that broke profiles: RLS decides which ROWS a role may see,
-- but the role still needs table-level privileges to reach the table
-- at all. Without these you get 42501 "permission denied for table".
grant usage on schema public to anon, authenticated, service_role;

grant all privileges on table public.users             to service_role;
grant all privileges on table public.progress          to service_role;
grant all privileges on table public.recordings        to service_role;
grant all privileges on table public.roleplay_sessions to service_role;

grant select, insert, update on table public.users    to authenticated;
grant select, insert, update on table public.progress to authenticated;

-- ─── 6. Verify ───
-- rowsecurity should be true for all five tables.
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
order by tablename;
