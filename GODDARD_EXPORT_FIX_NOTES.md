# Voda Export + Daily Hours Fix

## Fixed
- Rebuilt the Payroll PDF export so it opens a clean print/PDF window instead of downloading a rough demo-looking HTML file.
- Grouped PDF output by Week -> Employee/Job with readable day rows and a full notes section.
- Rebuilt the Job Notes report so submitted notes are included and easy to read.
- Added fallback note-field support for `notes`, `job_notes`, `note`, or `description` from Supabase.
- Cleaned up daily hours card text so dates and job names wrap more professionally instead of looking cramped/misaligned.

## Important
Use the browser print dialog to save as PDF. The report window auto-opens print so you can choose "Save as PDF".
