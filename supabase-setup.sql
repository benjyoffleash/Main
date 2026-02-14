-- Run this SQL in your Supabase SQL Editor to set up the database tables and functions.

-- ── Profiles table ──
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null,
  created_at timestamptz not null default now(),
  total_sessions integer not null default 0,
  total_minutes integer not null default 0,
  streak integer not null default 0,
  last_session_date timestamptz
);

alter table profiles enable row level security;

create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- ── Sessions table ──
create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  track_id text not null,
  track_type text not null check (track_type in ('essay', 'meditation')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  duration_listened integer not null default 0
);

alter table sessions enable row level security;

create policy "Users can read own sessions"
  on sessions for select using (auth.uid() = user_id);
create policy "Users can insert own sessions"
  on sessions for insert with check (auth.uid() = user_id);

create index idx_sessions_user_id on sessions(user_id);

-- ── Atomic stats update function (replaces Firestore transaction) ──
create or replace function update_user_stats(p_user_id uuid, p_duration integer)
returns void as $$
declare
  v_last_session date;
  v_today date := current_date;
  v_yesterday date := current_date - 1;
  v_streak integer;
begin
  select last_session_date::date, streak
    into v_last_session, v_streak
    from profiles where id = p_user_id;

  if v_last_session = v_yesterday then
    v_streak := v_streak + 1;
  elsif v_last_session is distinct from v_today then
    v_streak := 1;
  end if;

  update profiles set
    total_sessions = total_sessions + 1,
    total_minutes = total_minutes + (p_duration / 60),
    streak = v_streak,
    last_session_date = now()
  where id = p_user_id;
end;
$$ language plpgsql security definer;
