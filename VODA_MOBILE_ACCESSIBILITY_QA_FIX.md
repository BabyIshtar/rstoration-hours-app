# Voda Time — Mobile Accessibility QA Fix

This pass addresses the four mobile QA screenshots supplied after the production cleanup.

- Pay-period day cells now keep weekday, compact date, hours, and status on single lines.
- Calendar cell dates use a shorter `Jul 27` format; full dates remain available in day details.
- Payroll summary values and labels use compact, non-wrapping typography.
- Light mode has a dedicated high-contrast surface system instead of inheriting dark-panel styling.
- Employee Today and Pay Period panels are now truly theme-aware.
- Light navigation and glass surfaces use stronger borders, darker body text, and readable cyan accents.
- Employee Entries opens as a collapsed dropdown; individual entries use an additional details disclosure to reduce scrolling.
- Mobile blur, shadows, and spacing remain intentionally light for PWA performance.
