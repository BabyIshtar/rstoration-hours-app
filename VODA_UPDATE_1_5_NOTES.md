# VODA Web App Update 1.5

## Implemented
- Payroll export naming now uses `FirstName_LastName_PayPeriodStartDate_Payroll`.
- Payroll report title matches the filename so browser “Save as PDF” dialogs inherit the intended name where supported.
- Job notes now appear immediately beneath each related job row instead of in one oversized notes column.
- Settings now includes password updates through Supabase Auth.
- Password rules: minimum 6 characters, at least 1 special character, and matching confirmation.
- Recorded-shift review includes “Submit & Start Next”.
- A searchable next-job picker starts the new timer immediately after the previous job is submitted.
- Manual next-job timing remains available when a saved job is not listed.
- Existing iOS glass styling, Phoenix timezone handling, approvals, offline queue, and web/PWA workflow are preserved.

## Validation
- `src/App.jsx` passed Babel JSX parsing.
- A full Vite production build could not be run in this environment because the uploaded dependency bundle targets a different native platform and the available package registry did not contain one locked optional package. Run `npm install` and `npm run build` in the normal development environment before deployment.
