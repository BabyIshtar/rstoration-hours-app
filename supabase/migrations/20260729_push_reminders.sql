create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.app_daily_activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  last_accessed_at timestamptz not null default now(),
  primary key (user_id, activity_date)
);

alter table public.push_subscriptions enable row level security;
alter table public.app_daily_activity enable row level security;

create policy "Users manage own push subscriptions" on public.push_subscriptions
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own activity" on public.app_daily_activity
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
