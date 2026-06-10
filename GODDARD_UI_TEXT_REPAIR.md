# Goddard UI Text Repair

This patch fixes the previous over-aggressive text wrapping pass.

What changed:
- Removed global `overflow-wrap: anywhere` from all text elements.
- Removed forced shrinking/wrapping on every button and pill.
- Restored clean natural word wrapping.
- Added targeted wrapping only for job names, notes, and entry text.
- Kept mobile-safe layout rules without making text look broken.
- Kept smoother button/card transitions and dark-mode readability polish.
- Verified production build passes with `npm run build`.
