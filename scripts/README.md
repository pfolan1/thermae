# Thermae Scripts

## Weekly Health Check

Checks every venue website in `src/data/venues.ts` and reports which ones are offline, timing out, or missing a URL.

### Run manually

```bash
npm run health-check
```

Or directly:

```bash
node scripts/weekly-health-check.js
```

The report is printed to the console and also saved to `scripts/health-report.txt`.

### What it checks

| Result | Meaning |
|--------|---------|
| ✅ OK | HTTP 200–399 — site is live |
| ❌ Dead | HTTP 4xx / 5xx — site returned an error |
| ⏱ Timeout | No response within 10 seconds |
| ⚠️ Error | Connection refused or DNS failure |
| 🔗 No URL | Venue has no `bookingUrl` set |

Redirects (301/302) are followed once before classifying.

---

## Set up automatic weekly runs on Windows Task Scheduler

1. Open **Task Scheduler** (search for it in the Start menu).

2. Click **Create Basic Task…** in the right panel.

3. Fill in the wizard:
   - **Name:** Thermae Health Check
   - **Description:** Weekly sauna venue website health check
   - **Trigger:** Weekly → Sunday → 9:00 PM
   - **Action:** Start a program

4. In the **Start a Program** step:
   - **Program/script:** `node`
   - **Add arguments:** `scripts/weekly-health-check.js`
   - **Start in:** `C:\Users\kateq\Projects\Thermae`

5. Click **Finish**.

You can verify it works by right-clicking the task and choosing **Run**.

### Alternative: one-line Task Scheduler setup via PowerShell

Open PowerShell as Administrator and run:

```powershell
$action  = New-ScheduledTaskAction -Execute "node" `
             -Argument "scripts/weekly-health-check.js" `
             -WorkingDirectory "C:\Users\kateq\Projects\Thermae"
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "9:00PM"
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Minutes 10)
Register-ScheduledTask -TaskName "Thermae Health Check" `
  -Action $action -Trigger $trigger -Settings $settings -RunLevel Highest
```

The report will be written to `scripts/health-report.txt` each Sunday at 9 PM.
