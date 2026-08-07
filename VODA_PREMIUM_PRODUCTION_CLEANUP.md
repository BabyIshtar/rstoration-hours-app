# VODA Time — Premium Production Cleanup

This pass focuses on final-product fit and finish rather than adding dashboard clutter.

## Changes
- Removed the large Voda wordmark from the authenticated app header.
- Header now uses only the compact Voda mark with a restrained `Employee / Portal` identity.
- Removed the oversized branded promotional card from the employee home screen.
- New manual hours and recorded shifts now submit as **Approved** by default.
- Offline queued entries retain Approved status when they sync.
- Duplicated hour entries default to Approved.
- Admin edits and date moves preserve the current approval state instead of forcing the entry back to Pending.
- The admin correction sheet explicitly labels the date field **Move To Date**.
- Employee `Entries` history was moved off the Home screen and remains available from the Entries tab, reducing duplicate information on Home.
- Replaced the mostly-redundant Pending home metric with Entries.
- Reduced panel radius, padding, shadows, and blur cost on mobile.
- Tightened the pay-period controls and summary panel.
- Reduced pay-period day-card height further on phones while retaining seven-day symmetry.
- Removed a global mobile heading-size override that could make panel titles much larger than their component styles intended.
- Added safer no-mid-word wrapping rules for UI labels, menus, dates, and compact controls.
- Preserved the existing 1.5-second Voda box-mark loading animation, dark-mode default, light-mode contrast fixes, offline support, realtime sync, audit history, exports, and admin delete/status controls.

## Supabase
The app explicitly sends `approved` for new time entries, so the UI works without a database migration. For defense-in-depth, run `supabase/DEFAULT_HOURS_APPROVED.sql` once so direct/database-created time entries also default to Approved.

The SQL intentionally does **not** mass-approve existing Pending entries.
