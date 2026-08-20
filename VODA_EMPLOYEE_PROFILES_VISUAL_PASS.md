# Voda Time — Employee Profiles + Visual Coordination Pass

## Admin Manage
- Added clickable employee summary profiles inside Manage.
- Employee profiles show all-time hours, approved hours, job count, entry count, and job-by-job history.
- Each job in an employee profile expands to show every recorded date and hours entry.
- Added direct employee Print Report access from the profile.
- Redesigned Manage header and team/job sections for clearer hierarchy and responsive layouts.

## Reports / Documentation
- Fixed light-mode hero text contrast so dark hero panels always use white/light text.
- Changed payroll summary breakpoint so metric cards do not compress into unreadable narrow columns.
- Improved metric label sizing and overflow behavior.
- Added coordinated report job-card surfaces for light and dark mode.
- Removed job-name truncation in the labor overview so full job names remain readable.

## Theme coordination
- Added explicit coordinated light/dark surfaces for report cards, employee cards, master-job cards, and employee profile drilldowns.
- Preserved Voda cyan accent treatment for employee identity and reporting metrics.

## Validation
- Static release QA: 17/17 checks passed.
- Full Vite build could not be executed in the sandbox because installed npm dependencies were unavailable. Run `npm install` then `npm run build` locally before deploying.
