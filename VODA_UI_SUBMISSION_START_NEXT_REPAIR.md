# Voda Time — UI, Submission & Start Next Repair

## Fixed
- Manual Add Hours no longer fails just because shared master-job sync fails.
- Recorded live-clock shifts use the same resilient submission path.
- Added compatibility retry when production `time_entries` has not yet received the optional `job_id` column.
- Added `supabase/TIME_ENTRY_JOB_LINK_AND_SUBMIT_REPAIR.sql` for the permanent production schema repair.
- Rebuilt Start Next into two explicit choices:
  - Start New Time Clock — previous job remains ended; a separate timer starts for the next job.
  - Enter Hours Manually — opens a fresh manual entry with current date/time prefilled.
- Both next-job paths can select an existing shared job or use a new/unlisted job.
- Stabilized light/dark inputs, select options, date/time controls, modal surfaces, placeholders, and disabled buttons.
- Preserved automatic Approved status for newly submitted hours.

## Verification
- Existing Voda static QA: 17/17 checks passing.
- Full Vite build could not complete inside the artifact runtime because dependency installation exceeded the execution window; the archive intentionally excludes node_modules and uses the existing package-lock.json for a clean local/Vercel install.

## Supabase
Run `supabase/TIME_ENTRY_JOB_LINK_AND_SUBMIT_REPAIR.sql` once in the Voda Time Supabase SQL Editor. The frontend also includes a compatibility fallback so hour entry remains usable before/if that migration is delayed.
