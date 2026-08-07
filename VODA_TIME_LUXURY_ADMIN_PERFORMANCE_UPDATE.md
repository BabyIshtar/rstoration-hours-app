# VODA Time — Luxury UI, Admin Controls & Performance Update

## Included
- Softer, more rounded Apple-inspired glass surfaces and tighter mobile spacing.
- Lighter mobile blur/shadow treatment to reduce PWA/WebView paint cost.
- Admin Edit / Move controls for time entries (change date, times, job, lunch, notes).
- Admin Delete control with confirmation and immediate optimistic removal.
- Supabase Realtime time-entry synchronization so admin edits/deletes/approvals can update employee screens without a full refresh.
- Live timer isolated into its own tiny component instead of re-rendering the entire application every second.
- Weekly tracking expanded with remaining-to-40, daily average, and overtime stats.
- Mobile admin controls changed to a compact 2-column / 4-column responsive layout.

## Supabase note
If admin DELETE is blocked by Row Level Security, run `supabase/ADMIN_HOURS_CONTROLS.sql` in Supabase SQL Editor. If Realtime is not enabled for `time_entries`, enable the table in Supabase Realtime/replication or use the commented publication line in that SQL file.

## Install/build
This release ZIP intentionally excludes `node_modules`. Run `npm install` after extracting, then `npm run dev` or `npm run build`.
