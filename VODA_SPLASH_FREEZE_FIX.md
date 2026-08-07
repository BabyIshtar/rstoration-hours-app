# Voda Time — Splash Freeze Fix

## Fixed
- Corrected a launch-screen state bug that could leave the app permanently stuck on the Voda pulse screen when reopening the app within 30 minutes.
- The Voda box-logo splash now runs for a predictable 1.5 seconds on launch and then releases the main application.
- Existing branding, dark-mode default, compact mobile calendar, and minimalist UI are unchanged.

## Technical cause
`showSplash` initialized to `true`, but the prior effect only created the `setShowSplash(false)` timeout when the previous app-open timestamp was more than 30 minutes old. On a normal refresh/reopen inside that window, the state never changed.

## Fix
The splash timeout is now scheduled on every mount and cleaned up normally on unmount.
