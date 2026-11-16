-- ============================================================
-- Remote Roles Hub — Certificates
--
-- A certificate is only issued when two things are true:
--   1. the trainee has completed every lesson in the curriculum
--   2. an admin has approved it
--
-- Eligibility is computed from lesson_progress at request time, so
-- this table only records the request and the approval decision.
--
-- Run this in the Supabase SQL Editor. Safe to re-run.
-- ============================================================

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  code text not null unique,
  recipient_name text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'revoked')),
  lessons_completed int,
  lessons_total int,
  requested_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by uuid references auth.users(id),
  revoked_at timestamptz,
  revoke_reason text,
  created_at timestamptz not null default now()
);

-- One live certificate per trainee. A revoked one doesn't block a reissue.
create unique index if not exists certificates_one_live_per_user
  on public.certificates(user_id)
  where status <> 'revoked';

create index if not exists idx_certificates_status
  on public.certificates(status);

alter table public.certificates enable row level security;

-- Trainees may read their own certificate row and nothing else.
-- Every write goes through the service role (API routes), which
-- bypasses RLS — so nobody can approve their own certificate.
drop policy if exists "Users can read own certificate" on public.certificates;
create policy "Users can read own certificate"
  on public.certificates for select
  using (auth.uid() = user_id);

grant select on public.certificates to authenticated;
grant all on public.certificates to service_role;
