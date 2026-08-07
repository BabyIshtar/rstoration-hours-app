-- VODA TIME — APP STORE-READY HOURS AUDIT + ADMIN RESTORE SUPPORT
-- Run once in Supabase SQL Editor after the existing Voda Time schema.

create table if not exists public.time_entry_audit_log (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid null,
  employee_id uuid null references public.profiles(id) on delete set null,
  actor_id uuid null references public.profiles(id) on delete set null,
  action text not null,
  label text,
  detail text,
  created_at timestamptz not null default now()
);

create index if not exists time_entry_audit_log_employee_idx on public.time_entry_audit_log(employee_id, created_at desc);
create index if not exists time_entry_audit_log_actor_idx on public.time_entry_audit_log(actor_id, created_at desc);

alter table public.time_entry_audit_log enable row level security;

-- Helper: treat a profile role of admin as an administrator.
create or replace function public.voda_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and lower(coalesce(p.role, '')) = 'admin'
  );
$$;

drop policy if exists "Admins can view audit log" on public.time_entry_audit_log;
create policy "Admins can view audit log"
on public.time_entry_audit_log for select
to authenticated
using (public.voda_is_admin());

drop policy if exists "Users can view own audit activity" on public.time_entry_audit_log;
create policy "Users can view own audit activity"
on public.time_entry_audit_log for select
to authenticated
using (employee_id = auth.uid());

drop policy if exists "Authenticated users can write audit events" on public.time_entry_audit_log;
create policy "Authenticated users can write audit events"
on public.time_entry_audit_log for insert
to authenticated
with check (actor_id = auth.uid());

-- Admin all-around controls for time entries, including delete and restore/insert.
-- These policies layer on top of existing employee policies rather than replacing them.
alter table public.time_entries enable row level security;

drop policy if exists "Voda admins can update any time entry" on public.time_entries;
create policy "Voda admins can update any time entry"
on public.time_entries for update
to authenticated
using (public.voda_is_admin())
with check (public.voda_is_admin());

drop policy if exists "Voda admins can delete any time entry" on public.time_entries;
create policy "Voda admins can delete any time entry"
on public.time_entries for delete
to authenticated
using (public.voda_is_admin());

drop policy if exists "Voda admins can restore time entries" on public.time_entries;
create policy "Voda admins can restore time entries"
on public.time_entries for insert
to authenticated
with check (public.voda_is_admin());

-- Realtime should already be enabled for time_entries in the prior update.
-- If not, run the following once. Ignore a duplicate-table publication error.
-- alter publication supabase_realtime add table public.time_entries;
