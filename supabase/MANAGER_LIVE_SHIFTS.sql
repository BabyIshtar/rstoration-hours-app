-- VODA Time RC4 — shared live shift presence for the Manager Dashboard.
-- Run once in the Voda Time Supabase SQL Editor.

create table if not exists public.live_shifts (
  employee_id uuid primary key references public.profiles(id) on delete cascade,
  started_at timestamptz not null,
  work_date date not null,
  job_id text,
  job_type text,
  customer_name text,
  updated_at timestamptz not null default now()
);

alter table public.live_shifts enable row level security;

drop policy if exists "Employees manage own live shift" on public.live_shifts;
create policy "Employees manage own live shift"
on public.live_shifts
for all
to authenticated
using (employee_id = auth.uid())
with check (employee_id = auth.uid());

drop policy if exists "Admins read all live shifts" on public.live_shifts;
create policy "Admins read all live shifts"
on public.live_shifts
for select
to authenticated
using (
  employee_id = auth.uid()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

-- Realtime is optional but strongly recommended for instant admin visibility.
do $$
begin
  alter publication supabase_realtime add table public.live_shifts;
exception
  when duplicate_object then null;
end $$;
