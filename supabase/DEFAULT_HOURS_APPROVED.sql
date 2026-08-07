-- VODA Time: default newly-created time entries to Approved.
-- Run once in the Voda Time Supabase SQL Editor.
-- Existing entries are NOT changed; this only changes defaults for future inserts.

alter table if exists public.time_entries
  alter column approval_status set default 'approved';

alter table if exists public.time_entries
  alter column status set default 'approved';
