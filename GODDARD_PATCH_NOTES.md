# Voda App Patch Notes

Build verified with `npm run build`.

Added/refined:
- smoother iOS-style glass motion and reduced-motion support
- persistent active app section after refresh/reopen
- Voda inactivity splash remains in place
- live clock localStorage persistence remains in place
- pay-period swipe navigation on touch devices
- history calendar swipe navigation on touch devices
- smarter job suggestions combining same-week prior jobs, recent jobs, and saved active jobs
- quick suggestion chips under job/customer entry
- compressed image upload before Supabase storage upload
- image preview for attached job documentation
- cleaner upload state messaging

Unchanged:
- Supabase environment variables are not included in this zip
- database tables/policies are not changed
- payroll logic still uses current app rules: regular up to 40 worked hours, overtime after 40, vacation/PTO separated by text detection
