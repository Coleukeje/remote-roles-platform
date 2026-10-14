# Remote Roles — Data Architecture

## Overview

This document outlines the recommended database schema and authentication
setup using **Supabase** (Postgres + Auth + Row Level Security). Supabase
gives you a hosted Postgres database, built-in email/password and Google
OAuth authentication, and row-level security so trainees can only see
their own data.

---

## 1. Authentication (Supabase Auth)

Supabase Auth handles signup, login, password reset, and OAuth out of the
box. No custom auth tables needed.

| Provider       | Notes                                           |
| -------------- | ----------------------------------------------- |
| Email/Password | Built-in. Enable in Supabase dashboard.         |
| Google OAuth   | Add Google client ID/secret in Supabase console. |

After sign-up, a trigger inserts a row into `profiles` (see below).

---

## 2. Database Tables

### `profiles`

Extends Supabase's `auth.users` with app-specific fields.

```sql
CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'trainee'
                CHECK (role IN ('trainee', 'admin')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### `module_access`

Controls which weeks each trainee can access. Admins toggle these on/off.

```sql
CREATE TABLE public.module_access (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_id     TEXT NOT NULL,           -- e.g. 'week-1', 'week-2', 'week-3'
  unlocked    BOOLEAN NOT NULL DEFAULT false,
  unlocked_by UUID REFERENCES public.profiles(id),  -- which admin unlocked it
  unlocked_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (user_id, week_id)
);

-- Index for fast lookups
CREATE INDEX idx_module_access_user ON public.module_access(user_id);
```

### `lesson_progress`

Tracks which lessons each trainee has completed.

```sql
CREATE TABLE public.lesson_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_id      TEXT NOT NULL,
  day_id       TEXT NOT NULL,
  lesson_id    TEXT NOT NULL,
  completed    BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (user_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lookup
  ON public.lesson_progress(user_id, week_id, day_id);
```

### `quiz_attempts` (future)

```sql
CREATE TABLE public.quiz_attempts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id   TEXT NOT NULL,
  score       INTEGER NOT NULL,          -- percentage 0-100
  answers     JSONB NOT NULL DEFAULT '{}', -- { questionId: selectedAnswer }
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_quiz_user ON public.quiz_attempts(user_id, lesson_id);
```

---

## 3. Row Level Security (RLS)

RLS ensures trainees only see their own data, while admins see everything.

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- profiles: users see own, admins see all
CREATE POLICY "Users view own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

-- module_access: users see own, admins manage all
CREATE POLICY "Users view own access"
  ON public.module_access FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Admins manage access"
  ON public.module_access FOR ALL
  USING (public.is_admin());

-- lesson_progress: users manage own, admins view all
CREATE POLICY "Users manage own progress"
  ON public.lesson_progress FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Admins view all progress"
  ON public.lesson_progress FOR SELECT
  USING (public.is_admin());

-- quiz_attempts: users manage own, admins view all
CREATE POLICY "Users manage own quizzes"
  ON public.quiz_attempts FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Admins view all quizzes"
  ON public.quiz_attempts FOR SELECT
  USING (public.is_admin());
```

---

## 4. How It All Connects

```
┌──────────────────────────────────────────────────────────┐
│                    SUPABASE AUTH                         │
│  Email/Password · Google OAuth · Magic Links            │
└─────────────────────┬────────────────────────────────────┘
                      │ on signup → trigger
                      ▼
┌──────────────────────────────────────────────────────────┐
│  profiles                                               │
│  id · full_name · email · role (trainee | admin)        │
└──┬──────────────┬────────────────────────────────────────┘
   │              │
   ▼              ▼
┌────────────┐  ┌──────────────────┐  ┌────────────────┐
│ module_    │  │ lesson_progress  │  │ quiz_attempts  │
│ access     │  │                  │  │                │
│            │  │ user_id          │  │ user_id        │
│ user_id    │  │ lesson_id        │  │ lesson_id      │
│ week_id    │  │ completed        │  │ score          │
│ unlocked   │  │ completed_at     │  │ answers (JSON) │
│ unlocked_by│  │                  │  │                │
└────────────┘  └──────────────────┘  └────────────────┘

Admin Panel reads/writes module_access for any user.
Training UI reads module_access for current user,
  reads/writes lesson_progress for current user.
```

---

## 5. Environment Variables

Add these to Netlify (Site → Environment Variables) and to `.env.local`
for local dev:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...service-role-key   # server-side only
```

**Never commit `.env.local` to git.** The anon key is safe for the
browser (RLS protects the data). The service role key bypasses RLS and
must only be used in server-side API routes.

---

## 6. Deployment Checklist

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL above in the Supabase SQL Editor
3. Enable Email/Password auth in Authentication → Providers
4. (Optional) Add Google OAuth credentials
5. Copy the project URL and anon key from Settings → API
6. Add env vars to Netlify dashboard
7. Push code → Netlify auto-deploys from your Git repo
8. Set your first admin: update a profile row's `role` to `'admin'`
   in the Supabase Table Editor

---

## 7. Future Enhancements

- **Real-time progress:** Use Supabase Realtime subscriptions so the
  admin panel updates live as trainees complete lessons.
- **File uploads:** Store training materials (PDFs, slide decks) in
  Supabase Storage buckets with signed URLs.
- **Notifications:** Send email via Supabase Edge Functions when a
  trainee completes a week or when an admin unlocks new content.
- **Analytics dashboard:** Aggregate `lesson_progress` data to show
  completion rates, average time per module, and dropout points.
