# VODA Time v1.0.0-rc.4 — Final QA + Manager Dashboard

## Manager Dashboard
Admin Home now uses one compact operational dashboard instead of the older Team Today + duplicate Admin Command Center cards.

Signals shown:
- Employees clocked in (live, after Supabase migration)
- Active jobs
- Total labor hours today
- Employees at 35+ hours this week
- Hours requiring review
- Active employee profiles with no activity yet on weekdays after 8:30 AM Arizona time

The dashboard includes compact disclosures for live employees and attention items, plus one-tap Review, Manage, and History actions.

## Required Supabase upgrade
Run `supabase/MANAGER_LIVE_SHIFTS.sql` once. It creates the lightweight `live_shifts` presence table and Realtime access policies. Clocking continues to work locally if the table is not installed; the Manager Dashboard simply explains that live team presence is unavailable.

## QA performed
`npm run qa` now runs a dependency-free static release suite. RC4 passed all 17 checks covering:
- dark mode default
- splash release timing
- approved-by-default submissions
- admin date moving
- admin deletion
- submit/close navigation
- high-contrast light theme layer
- no-wrap compact UI rules
- strict mobile seven-column pay-period grid
- collapsible Entries
- Manager Dashboard presence + six signals
- shared live-shift syncing
- offline queue
- long-shift warnings
- demo/development label removal
- old duplicate Team Snapshot removal

Additional smoke checks passed:
- package.json parses
- manifest.json parses
- Voda box logo exists
- Voda wordmark exists
- service worker exists
- App.jsx raw delimiter counts are balanced
- no merge-conflict markers remain in source/migrations

## QA limitation
A full Vite production compile could not be executed inside this environment because the available npm registry returns a 404 for `zod-validation-error@4.0.2`, a transitive package required during installation. The source-level QA suite is included so it can run immediately on the development machine with `npm run qa`; run `npm install`, `npm run qa`, and `npm run build` before the final production release.
