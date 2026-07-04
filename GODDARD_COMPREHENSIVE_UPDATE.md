# Goddard Comprehensive Update

## Build status
- `npm install` completed successfully after the uploaded ZIP's bundled `node_modules` was found to be broken.
- `npm run build` completed successfully.
- Vite reported the normal large bundle warning only; the production build was created successfully.

## Included updates
- Added safer approval-status normalization so pending, approved, and denied entries are handled consistently.
- Added stable date/time sorting for approval queues and exports.
- Improved the admin Approve All flow:
  - Bulk approves pending entries currently visible in the selected pay period/filter.
  - Approved entries leave the pending queue after refresh.
  - Employees receive portal messages for bulk-approved entries.
  - Browser notification confirms the bulk approval.
- Improved payroll/PDF export data handling:
  - Excludes denied entries from payroll PDF totals.
  - Includes pending and approved entries so employees can export PDFs before admin approval.
  - Keeps notes in the hours PDF.
  - Keeps Week 1 and Week 2 separated.
  - Sorts entries by date/time/customer for cleaner PDF/CSV/notes output.
  - Overtime remains calculated per employee per work week only after 40 worked hours.
- Improved history month filtering using the Phoenix app timezone instead of local browser month math.
- Added comprehensive responsive UI polish in `src/index.css`:
  - Cleaner input styling.
  - Better focus states.
  - Better mobile card radius handling.
  - Stronger text wrapping across cards, job names, notes, tables, and buttons.
  - Reduced tap highlight on mobile.
  - Reduced-motion support.
  - Less overflow risk on small screens.

## Deployment
Use the normal deploy flow:

```bash
npm install
npm run build
git add .
git commit -m "Comprehensive Voda hours app polish"
git push origin main
```

If Vercel is connected to GitHub, the push will trigger the live deployment automatically.
