# ============================================================
# Thermae — Windows Task Scheduler Setup
# Run this script ONCE in PowerShell as Administrator
# It registers a weekly task to run the health check every
# Sunday at 8 PM UK time.
# ============================================================

$ProjectDir  = "C:\Users\kateq\Projects\Thermae"
$NodePath    = (Get-Command node -ErrorAction Stop).Source
$ScriptPath  = Join-Path $ProjectDir "scripts\weekly-health-check.js"
$LogDir      = Join-Path $ProjectDir "scripts\logs"
$TaskName    = "Thermae Weekly Health Check"

# Create logs directory if it doesn't exist
if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir | Out-Null
    Write-Host "Created log directory: $LogDir"
}

# Build the action: run node with the script, capture output to a dated log file
$Action = New-ScheduledTaskAction `
    -Execute "cmd.exe" `
    -Argument "/c `"node `"$ScriptPath`" >> `"$LogDir\health-$(Get-Date -Format 'yyyy-MM-dd').log`" 2>&1`"" `
    -WorkingDirectory $ProjectDir

# Sunday at 8 PM (20:00) — runs weekly
$Trigger = New-ScheduledTaskTrigger `
    -Weekly `
    -DaysOfWeek Sunday `
    -At "20:00"

# Run only if on AC power, allow up to 15 minutes, don't start if on battery
$Settings = New-ScheduledTaskSettingsSet `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 15) `
    -StartWhenAvailable `
    -DontStopIfGoingOnBatteries `
    -WakeToRun $false

# Principal: run as current user with highest privileges
$Principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType Interactive `
    -RunLevel Highest

# Register (or update if it already exists)
if (Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue) {
    Write-Host "Task '$TaskName' already exists — updating it..."
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
}

Register-ScheduledTask `
    -TaskName  $TaskName `
    -Action    $Action `
    -Trigger   $Trigger `
    -Settings  $Settings `
    -Principal $Principal `
    -Description "Weekly Thermae venue website health check. Checks all venues, emails report to hello@thermae.app."

Write-Host ""
Write-Host "✅ Task '$TaskName' registered successfully."
Write-Host ""
Write-Host "Schedule: Every Sunday at 8:00 PM"
Write-Host "Working directory: $ProjectDir"
Write-Host "Log output: $LogDir\health-<date>.log"
Write-Host ""
Write-Host "To test immediately, run:"
Write-Host "  Start-ScheduledTask -TaskName '$TaskName'"
Write-Host ""
Write-Host "To view in Task Scheduler GUI:"
Write-Host "  taskschd.msc"
Write-Host ""
Write-Host "IMPORTANT: Make sure scripts\.env contains your ZOHO_EMAIL and ZOHO_PASSWORD"
Write-Host "           before the first run, or the email step will be skipped."
