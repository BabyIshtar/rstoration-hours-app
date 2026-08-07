-- VODA Time: admin hour-management permissions
-- Run in Supabase SQL Editor only if your existing RLS policies do not already allow admin UPDATE/DELETE.

alter table public.time_entries enable row level security;

drop policy if exists "voda_admin_manage_time_entries" on public.time_entries;
create policy "voda_admin_manage_time_entries"
on public.time_entries
for all
to authenticated
using (
  employee_id = auth.uid()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and lower(coalesce(p.role, '')) = 'admin'
  )
)
with check (
  employee_id = auth.uid()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and lower(coalesce(p.role, '')) = 'admin'
  )
);

-- Realtime is used so admin edits/deletes instantly update employee devices.
-- If time_entries is not already in the realtime publication, run the next line once:
-- alter publication supabase_realtime add table public.time_entries;
