# VODA Time — App Store-Ready Hours Update

This build keeps the existing Voda Time workflows and adds the complete mobile/product polish pass requested after the Luxury Admin + Performance update.

## New mobile experience
- iOS-style fixed bottom navigation on phones with Home, Time, Add, Review/Entries, and Team/Updates.
- Large desktop navigation remains available on tablet/desktop.
- Native-style bottom sheets on mobile for review/edit/settings/detail workflows.
- Safe-area-aware spacing for installed iPhone/Android PWAs.
- Haptic/vibration feedback remains active on important taps.
- Skeleton loading surfaces replace blank/loading jumps.

## Hours intelligence
- Week at a Glance: Mon–Sun compact hour bubbles with pending/complete/missing state dots.
- Time Health card: missing weekday detection, projected 40-hour pace, projected overtime, and one-tap missing-hours entry.
- Forgotten-clock-out warning after long running shifts, with Stop & Review action.
- Existing detailed two-week calendar and payroll progress remain intact.

## Admin workflow
- Quick Review card at the top of the approval screen.
- Swipe left/right on mobile (or arrow buttons) to move through pending entries.
- One-tap Approve, Deny, and Edit / Move.
- Existing grouped approval queue remains below Quick Review.
- Delete still immediately removes hours from employee view through Supabase Realtime.
- New Undo Delete restores the deleted time entry and notifies the employee.

## Audit + activity
- Admin audit history records approvals, denials, edits, moves, deletes, restores, and submissions.
- Employee timeline shows submission/status activity available on the device and realtime status changes.
- `supabase/APP_STORE_TIME_AUDIT_UPGRADE.sql` adds a persistent shared audit table and admin restore policy.
- The UI uses a local audit fallback if the migration has not been run yet.

## Required Supabase step
Run `supabase/APP_STORE_TIME_AUDIT_UPGRADE.sql` once in the Voda Time Supabase SQL Editor. This enables shared audit history and admin restore after deletion.

## Install/run
```bash
npm install
npm run dev
```

Production build:
```bash
npm run build
```

For Capacitor/native shell syncing, use the existing `npm run cap:sync` workflow after the production build succeeds.
