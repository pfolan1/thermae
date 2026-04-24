# Thermae Scripts

Utility scripts for weekly site maintenance. Run from the project root unless noted otherwise.

---

## Contents

| Script | npm command | Purpose |
|--------|------------|---------|
| `weekly-health-check.js` | `npm run health-check` | Check all venue websites, email report |
| `monitor-new-saunas.js`  | `npm run monitor`      | Search news for new venue openings |
| `check-blog-posts.js`    | `npm run check-blogs`  | Check blog posts for stale venue references |
| `setup-scheduler.ps1`    | *(run once)*           | Register Windows Task Scheduler job |
| `WEEKLY-PROMPT.md`       | *(read this)*          | Prompt to paste into Claude Code each Sunday |
| `generate-blog-post.js`  | *(GitHub Actions)*     | Auto-generate a blog post using the Anthropic API |
| `blog-schedule.json`     | *(config)*             | Scheduled blog post topics and publish dates |

---

## 1. Environment Setup

Scripts that send email require SMTP credentials.

**Step 1** — Copy the example file:
```
copy scripts\.env.example scripts\.env
```

**Step 2** — Edit `scripts/.env` and fill in your Zoho credentials:
```
ZOHO_EMAIL=hello@thermae.app
ZOHO_PASSWORD=your_zoho_app_password_here
```

> **How to get a Zoho app password:**
> Log in at mail.zoho.eu → My Account → Security → App-Specific Passwords → Generate New Password.
> Use that generated password here (not your main account password).

`scripts/.env` is listed in `.gitignore` and will never be committed to git.

---

## 2. Running Scripts Manually

### Health Check
Checks every venue website, generates a report, and emails it.
```bash
npm run health-check
```
Output: `scripts/health-report.txt` (also printed to console and emailed)

### New Venue Monitor
Searches Google News RSS for sauna/wellness openings in the past 7 days.
```bash
npm run monitor
```
Output: `scripts/new-venues-found.txt`

### Blog Post Checker
Checks blog posts reference venues that still exist in venues.ts.
```bash
npm run check-blogs
```
Output: `scripts/blog-report.txt`

---

## 3. Automatic Weekly Runs — Windows Task Scheduler

### One-time setup

Open **PowerShell as Administrator** and run:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser   # allow local scripts
cd C:\Users\kateq\Projects\Thermae
.\scripts\setup-scheduler.ps1
```

This registers a task called **"Thermae Weekly Health Check"** that runs every **Sunday at 8:00 PM**.

### Verify the task registered
```powershell
Get-ScheduledTask -TaskName "Thermae Weekly Health Check"
```

### Test it immediately (without waiting for Sunday)
```powershell
Start-ScheduledTask -TaskName "Thermae Weekly Health Check"
```

### View logs
Logs are saved to `scripts/logs/health-<date>.log` each time the task runs.

### Add monitor script to the schedule (optional)
If you also want `monitor-new-saunas.js` to run automatically, add a second task:
```powershell
$action  = New-ScheduledTaskAction -Execute "cmd.exe" `
    -Argument "/c `"node scripts\monitor-new-saunas.js >> scripts\logs\monitor-$(Get-Date -Format 'yyyy-MM-dd').log 2>&1`"" `
    -WorkingDirectory "C:\Users\kateq\Projects\Thermae"
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "20:05"
Register-ScheduledTask -TaskName "Thermae Monitor New Saunas" `
    -Action $action -Trigger $trigger -RunLevel Highest
```

---

## 4. Recommended Sunday Evening Workflow

1. **8:00 PM** — Task Scheduler automatically runs the health check and emails the report.
2. **~8:15 PM** — Check your email at hello@thermae.app for the health report.
3. **Open Claude Code** in the Thermae project directory.
4. **Open `scripts/WEEKLY-PROMPT.md`** — copy the prompt, update the date, and paste it into Claude Code.
5. Claude Code will:
   - Fix any dead venue websites
   - Search for new venues and add them
   - Check blog posts for stale content
   - Build and push to GitHub
6. The whole process takes roughly **20–40 minutes**.

---

## 5. Health Report Fields Explained

| Field | Meaning |
|-------|---------|
| ✅ OK | HTTP 200–399 — site is live |
| ❌ Dead | HTTP 4xx / 5xx — site returned an error |
| ⏱ Timeout | No response within 12 seconds |
| ⚠️ Error | Connection refused or DNS failure |
| 🔗 No URL | Venue has no `bookingUrl` set |
| 📍 No coords | Venue is missing lat/lng coordinates |
| 🌊 Suspect coords | Coordinates fall outside the expected country bounding box |

Redirects (301/302/307/308) are followed up to 3 hops before classifying.

---

## 7. Automated Blog Post System

Blog posts are generated automatically every other Monday at 6am BST via the GitHub Action at `.github/workflows/auto-blog.yml`.

### How it works

1. GitHub Actions runs the workflow every Monday at 5am UTC (6am BST).
2. `scripts/generate-blog-post.js` checks `scripts/blog-schedule.json` for a topic scheduled for today.
3. If a topic is due, it calls the Anthropic API (Claude) to write a 1,000+ word blog post.
4. The post is saved as a new TypeScript file in `src/content/blog/`.
5. `src/content/blog/index.ts` is updated to include the new post.
6. The topic is marked `"published": true` in `blog-schedule.json`.
7. Changes are committed and pushed to `main` — Netlify auto-deploys.

### Required: Add the Anthropic API Key as a GitHub Secret

> **You must do this once before the first automated post runs.**

1. Go to: **https://github.com/pfolan1/thermae/settings/secrets/actions**
2. Click **"New repository secret"**
3. Name: `ANTHROPIC_API_KEY`
4. Value: your Anthropic API key (from https://console.anthropic.com/keys)
5. Click **"Add secret"**

Without this secret, the workflow will fail when it tries to call the API.

### Manually trigger a blog post

Go to **Actions → Auto Blog Post → Run workflow** in the GitHub UI, optionally checking "Force generate" to bypass the date check.

### Blog post schedule

Defined in `scripts/blog-schedule.json`. Add new entries following the existing format. The `"published"` field is set to `true` automatically after a post is generated.

### Running the generator locally (for testing)

```bash
ANTHROPIC_API_KEY=your_key_here FORCE_GENERATE=true node scripts/generate-blog-post.js
```

---

## 6. Email Configuration (Zoho)

The health check emails via Zoho Mail SMTP:

| Setting | Value |
|---------|-------|
| Host | `smtp.zoho.eu` |
| Port | `465` (SSL) |
| User | Your `ZOHO_EMAIL` |
| Pass | Your `ZOHO_PASSWORD` (app-specific password) |

If no credentials are set, the script still runs and saves the report locally — it just skips the email step.
