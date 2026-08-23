-- VODA Time submission compatibility repair
-- Safe to run more than once in Supabase SQL Editor.

alter table if exists public.time_entries
  add column if not exists job_id uuid null;

-- Add FK only when app_jobs uses uuid ids and the constraint is not already present.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'time_entries_job_id_fkey'
      and conrelid = 'public.time_entries'::regclass
  ) then
    alter table public.time_entries
      add constraint time_entries_job_id_fkey
      foreign key (job_id) references public.app_jobs(id)
      on update cascade on delete set null;
  end if;
exception
  when datatype_mismatch then
    raise notice 'Skipped FK because app_jobs.id and time_entries.job_id types do not match. Frontend fallback will still allow hour submission.';
end $$;

alter table if exists public.time_entries
  alter column approval_status set default 'approved';
alter table if exists public.time_entries
  alter column status set default 'approved';

create index if not exists time_entries_job_id_idx on public.time_entries(job_id);
