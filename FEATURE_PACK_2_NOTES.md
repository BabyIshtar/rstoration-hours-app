# VODA Feature Pack 2 Notes

Built into this version:

- Permanent job database inside the admin control center
- Employee-to-job assignment field
- Saved job dropdown on manual hours entry
- Saved job dropdown on live-clock recorded shift review
- Hours now save a `job_id` when a saved job is selected
- Employees can see jobs assigned to them or unassigned/open jobs
- Admins can update job status from the job database panel
- Production build verified with `npm run build`

Before deploying, run `voda_feature_pack_2_jobs_sql.sql` in Supabase SQL Editor so the saved-job linking column and app_jobs policies exist.

Deploy:

```bash
npm install
npm run build
npx vercel --prod
```
