# Thermae — Weekly Sunday Evening Prompt for Claude Code

> **How to use this file:**
> Every Sunday evening, after receiving the health check email, open Claude Code
> in the Thermae project directory and paste the prompt below. Adjust the date.

---

## PASTE THIS PROMPT INTO CLAUDE CODE:

```
It's Sunday [DATE]. Please run the full Thermae weekly maintenance routine:

**STEP 1 — Read the health report**
Read scripts/health-report.txt and summarise any issues found.

**STEP 2 — Fix dead/broken venue websites**
For each venue flagged as DEAD or ERROR in the health report:
- Search the web for the venue's current website
- If it has moved, update the bookingUrl in src/data/venues.ts
- If the venue appears to have permanently closed, set open:false and add a note in the desc field
- If timeout only (possibly temporary), leave as-is but note it

**STEP 3 — Fix coordinate issues**
For any venue flagged with suspect or missing coordinates in the health report:
- Look up the correct address and coordinates using the venue name and city
- Update lat and lng in src/data/venues.ts

**STEP 4 — Search for new venues**
Run: node scripts/monitor-new-saunas.js
Read scripts/new-venues-found.txt and investigate each potential new venue.

Also manually search the web for:
- "new sauna Ireland 2025" site:irelandsaunas.com
- "new sauna Ireland 2025" site:saunafinder.ie
- New entries at: https://timeout.com/london/wellness (last 7 days)
- New entries at: https://designmynight.com (search "sauna" sorted by date)
- Google News: "sauna opening" past week, UK and Ireland
- Google News: "cold plunge" OR "ice bath" opening past week
- Any wellness/sauna news from Nordic countries (Norway, Sweden, Finland, Denmark)

For each genuine new venue found:
- Verify it is real and open (has a real address and website)
- Find the exact address and get lat/lng coordinates
- Add to src/data/venues.ts with all required fields
- Set featured:false for new entries unless it is exceptionally noteworthy

**STEP 5 — Check blog posts**
Run: node scripts/check-blog-posts.js
Read scripts/blog-report.txt.
For each blog post flagged:
- If a venue no longer exists: update the blog post text to remove or note the reference
- If a venue is now closed: add a note in the blog post

Also review each file in src/content/blog/ for:
- Outdated prices (e.g., "£20 per session" — check if still accurate)
- Outdated hours ("open 9am–9pm" — check venue website to confirm)
- Correct any that have changed

**STEP 6 — Build and deploy**
Run: npm run build
If the build succeeds, commit and push:
git add -A
git commit -m "Weekly update [DATE] — health fixes and new venues"
git push origin main

Report back with a summary of everything changed.
```

---

## Notes

- Replace `[DATE]` with today's date before pasting (e.g., `Sunday 13 April 2025`)
- The health report email arrives automatically every Sunday at 8 PM
- If you haven't set up the scheduler yet, run: `node scripts/weekly-health-check.js` manually
- The full workflow usually takes 20–40 minutes depending on how many issues there are
