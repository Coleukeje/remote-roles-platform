-- ============================================================
-- Per-lesson progress tracking
--
-- Until now "Mark as Complete" lived in React state only, so a trainee
-- lost every tick on refresh and the sidebar progress card was
-- hardcoded to 0%. This table makes progress durable.
--
-- Why not the existing public.progress table: it stores module and
-- lesson as int4, but the curriculum identifies lessons by string ids
-- ("w1d1-telemarketing"). Squeezing those into integers would mean an
-- index mapping that breaks every time a lesson is added or reordered.
-- public.progress is left in place untouched as legacy data.
--
-- Safe to re-run.
-- ============================================================

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  completed boolean not null default false,
  confirmed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists idx_lesson_progress_user
  on public.lesson_progress(user_id);

-- ─── RLS: a trainee can only ever see or change their own progress ───
alter table public.lesson_progress enable row level security;

drop policy if exists "Read own lesson progress"   on public.lesson_progress;
drop policy if exists "Insert own lesson progress" on public.lesson_progress;
drop policy if exists "Update own lesson progress" on public.lesson_progress;

create policy "Read own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Insert own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Update own lesson progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── Grants (the 42501 trap again) ───
grant usage on schema public to anon, authenticated, service_role;
grant all privileges on table public.lesson_progress to service_role;
grant select, insert, update on table public.lesson_progress to authenticated;

-- ─── Keep updated_at honest ───
create or replace function public.handle_lesson_progress_updated()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

drop trigger if exists on_lesson_progress_updated on public.lesson_progress;

create trigger on_lesson_progress_updated
  before update on public.lesson_progress
  for each row execute procedure public.handle_lesson_progress_updated();
