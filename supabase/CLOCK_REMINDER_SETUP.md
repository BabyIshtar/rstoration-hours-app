# 7:55 AM weekday reminder setup

1. Run `supabase/migrations/20260729_push_reminders.sql` in the Supabase SQL editor.
2. Generate VAPID keys with `npx web-push generate-vapid-keys`.
3. Add the public key to Vercel as `VITE_VAPID_PUBLIC_KEY`.
4. Add `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `VAPID_SUBJECT` as Supabase Edge Function secrets.
5. Deploy: `supabase functions deploy send-clock-reminders --no-verify-jwt`.
6. Schedule the function for 7:55 AM America/Phoenix, Monday-Friday. Supabase Cron runs in UTC; Arizona is UTC-7 year-round, so use `55 14 * * 1-5`.

The app also includes a foreground fallback that checks once per minute while open.
