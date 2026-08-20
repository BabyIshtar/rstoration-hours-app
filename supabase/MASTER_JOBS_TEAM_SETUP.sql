-- VODA Time shared master jobs
-- Run once in Supabase SQL Editor if app_jobs does not already allow employees
-- to read shared jobs and create the first record for a new job.

alter table public.app_jobs enable row level security;

-- Every authenticated VODA user can see the shared master-job directory.
drop policy if exists "VODA team can read master jobs" on public.app_jobs;
create policy "VODA team can read master jobs"
on public.app_jobs
for select
to authenticated
using (auth.uid() is not null);

-- Employees may create the first shared job they work on. The UI always writes
-- created_by = auth.uid(), keeps it active, and leaves assignment open to the team.
drop policy if exists "VODA team can create master jobs" on public.app_jobs;
create policy "VODA team can create master jobs"
on public.app_jobs
for insert
to authenticated
with check (created_by = auth.uid());

-- Only admins may change master-job metadata/status after creation.
drop policy if exists "VODA admins can update master jobs" on public.app_jobs;
create policy "VODA admins can update master jobs"
on public.app_jobs
for update
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

-- Helpful lookup index. This does not enforce uniqueness because older databases
-- may already contain duplicate spellings that admins still need to merge/clean.
create index if not exists app_jobs_customer_name_lower_idx
  on public.app_jobs (lower(customer_name));
