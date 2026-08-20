# VODA Time — Shared Master Jobs Update

- Any employee can be the first person to create a new job simply by entering hours for it.
- The new job is written to `app_jobs` as a shared master record and the submitted time entry stores its `job_id`.
- All employees load the same open master-job directory, not just personally assigned jobs.
- Existing master jobs win over free-typed names. Abbreviations such as `Jenn H` resolve to an established fuller name such as `Jenn Halp` when they clearly match.
- Job suggestion buttons attach the real master-job ID instead of storing only text.
- The entry form tells the employee whether the current name is an existing shared master job or a new job that will be created for the team.
- Master jobs update in real time across signed-in devices through Supabase Realtime.
- Offline entries resolve/create their master job when they reconnect, before the hours entry syncs.
- Admin-created jobs are checked against the existing master list to reduce duplicate jobs.

## Supabase setup
Run `supabase/MASTER_JOBS_TEAM_SETUP.sql` once in the Supabase SQL Editor if employees currently receive an RLS/permission error when creating a new job or cannot see team-wide jobs.
