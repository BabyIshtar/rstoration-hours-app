import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "src", "App.jsx"), "utf8");
const css = fs.readFileSync(path.join(root, "src", "index.css"), "utf8");
const checks = [];
const assert = (name, condition, detail = "") => checks.push({ name, ok: Boolean(condition), detail });

assert("Dark mode is default", app.includes('localStorage.getItem("vodaTheme") !== "light"'));
assert("Splash releases after 1.5 seconds", app.includes('setTimeout(() => setShowSplash(false), 1500)'));
assert("Manual entries default approved", /approval_status:\s*"approved"/.test(app) && /status:\s*"approved"/.test(app));
assert("Admin can move hours between dates", app.includes('work_date: editModal.date') && app.includes('Hours moved to another date'));
assert("Admin can delete hours", app.includes('deleteHoursEntry') && app.includes('.from("time_entries").delete()'));
assert("Entry submission closes transient UI", app.includes('goToSection("timesheets")') && app.includes('setStoppedShiftReview(null)'));
assert("Light mode has centralized high contrast tokens", css.includes('--voda-light-text: #0b1526') && css.includes('.light :where(.card'));
assert("Compact UI prevents text fracture", css.includes('white-space: nowrap !important') && css.includes('word-break: normal !important'));
assert("Pay period uses strict seven-column mobile grid", css.includes('grid-template-columns:repeat(7,minmax(0,1fr))'));
assert("Entries view remains collapsible", app.includes('entriesOpen') && app.includes('entries-dropdown-trigger'));
assert("Manager Dashboard exists", app.includes('function ManagerDashboard(') && app.includes('Employees clocked in'));
assert("Manager Dashboard exposes six core signals", ["Clocked in", "Active jobs", "Labor today", "35h+", "Review", "No activity"].every((token) => app.includes(`label=\"${token}\"`)));
assert("Shared live shifts sync is implemented", app.includes('.from("live_shifts").upsert') && app.includes('table: "live_shifts"'));
assert("Offline queue is preserved", app.includes('vodaOfflineQueue') && app.includes('syncOfflineQueue'));
assert("Long shift warning is preserved", app.includes('elapsedHours >= 11'));
assert("No visible demo/development labels", !/\b(demo mode|demo|feature pack)\b/i.test(app));
assert("No obsolete AdminTeamSnapshot component", !app.includes('function AdminTeamSnapshot('));

const failed = checks.filter((check) => !check.ok);
for (const check of checks) console.log(`${check.ok ? "PASS" : "FAIL"}  ${check.name}${check.detail ? ` — ${check.detail}` : ""}`);
console.log(`\n${checks.length - failed.length}/${checks.length} static release checks passed.`);
if (failed.length) process.exit(1);
