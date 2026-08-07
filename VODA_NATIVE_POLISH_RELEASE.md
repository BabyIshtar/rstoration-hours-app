# VODA Time — Native Polish Release

This build applies the full user-accessibility and App-Store-style polish pass while preserving the existing timekeeping, approval, export, offline, and admin flows.

## Included in this release
- One-tap Clock In from the employee home screen.
- Persistent floating live timer with immediate Clock Out access.
- Daily visual timeline for the current day.
- Smart unified search across jobs, dates, time entries, notes, and employees (admin).
- Dynamic time-of-day greeting.
- Week at a Glance with missing-day cues and overtime forecasting.
- Offline time-entry queue + sync state.
- Long-shift / forgotten clock-out warning after 11 hours.
- Quick admin actions for Approve, Deny, Edit/Move, Duplicate, and Delete.
- Undo Delete and shared admin audit trail retained.
- Bottom native-style mobile navigation and bottom sheets retained.
- Larger touch targets and stronger one-hand mobile usability.
- 180–250ms style interaction transitions, spring sheet motion, subtle button press scale, and haptic feedback where supported.
- Refined typography hierarchy, spacing, card radius consistency, edge lighting, glass borders, internal highlight, and lightweight shadows.
- Mobile blur capped to protect scrolling and input performance.
- Reduced-transparency and reduced-motion accessibility fallbacks.
- Skeleton loaders retained instead of generic spinners.
- Employee activity timeline retained for submission/edit/approval history.
- VODA logo pulse loading/splash experience retained.
- No development-mode presentation text in the runtime UI.

## Supabase
Keep the existing migrations in `supabase/`, including `APP_STORE_TIME_AUDIT_UPGRADE.sql` and `ADMIN_HOURS_CONTROLS.sql`.

## Deployment
Run `npm install`, then `npm run build`. Do not commit or deploy `node_modules`.
