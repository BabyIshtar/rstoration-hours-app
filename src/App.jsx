import { supabase } from "./supabase";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Fingerprint,
  Edit3,
  LogOut,
  MessageSquare,
  Moon,
  PenLine,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Upload,
  UserRound,
  Users,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";

const jobTypes = [
  "Water Mitigation",
  "Fire / Smoke Cleanup",
  "Mold Remediation",
  "Biohazard Cleanup",
  "Trauma Cleanup",
  "Odor Removal",
  "Contents Cleaning",
  "Emergency Dry Out",
  "Storm Damage",
  "Reconstruction / Repairs",
  "Inspection / Estimate",
  "Other",
];

const brandLogo = "/TUCSON VODA COLORED PNG 1600X1600.png";
const iconLogo = "/VODA CIRCLE W DOTS PNG.png";
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const employeeRoles = ["admin", "manager", "tech", "employee"];
const jobStatuses = ["active", "scheduled", "in progress", "on hold", "completed", "closed"];

const loginTips = [
  { title: "Water Damage Tip", text: "Start drying within the first 24–48 hours whenever possible. Fast airflow and moisture checks help prevent hidden secondary damage." },
  { title: "Mold Remediation Tip", text: "Mold can grow behind baseboards and drywall when moisture sits too long. Always verify dry readings before closing a job." },
  { title: "Field Documentation Tip", text: "Take clear photos before moving equipment. Good documentation protects the customer, the team, and the final job file." },
  { title: "Dry Out Tip", text: "Place air movers with purpose. Direction, spacing, and dehumidifier support matter more than simply filling a room with equipment." },
  { title: "Moisture Tip", text: "A surface can feel dry while framing, insulation, or padding is still wet. Trust moisture readings over appearance alone." },
  { title: "Safety Tip", text: "For suspected microbial growth, limit disturbance until containment and PPE are in place. A clean workflow keeps the job controlled." },
  { title: "Customer Care Tip", text: "A calm explanation of the drying plan can reduce customer stress and make the entire job feel more professional." },
  { title: "Equipment Tip", text: "Check that dehumidifiers have clear airflow around intake and exhaust areas. Blocked airflow can slow drying performance." },
  { title: "Mold Prevention Tip", text: "Moisture control is mold control. Fix the water source first, then dry and verify the affected materials." },
  { title: "Water Loss Tip", text: "Always identify the category of water before starting work. Clean water, gray water, and black water require different safety steps." },
  { title: "Containment Tip", text: "Containment should separate affected and unaffected areas while still allowing the team to work safely and efficiently." },
  { title: "Humidity Tip", text: "High indoor humidity can slow drying even when air movers are running. Dehumidification is what removes moisture from the air." },
  { title: "Inspection Tip", text: "Look beyond the obvious wet spot. Water can travel under flooring, behind trim, and through wall cavities." },
  { title: "Baseboard Tip", text: "Baseboards can hide trapped moisture behind the wall line. Always check readings near trim and corners." },
  { title: "Drying Tip", text: "Drying is a system: air movement lifts moisture, dehumidifiers remove it, and monitoring confirms progress." },
  { title: "Mold Awareness Tip", text: "A musty odor can be an early sign of hidden moisture or microbial activity, even before visible growth appears." },
  { title: "Jobsite Tip", text: "Keep cords organized and walkways clear. A clean jobsite feels professional and reduces trip hazards." },
  { title: "Customer Update Tip", text: "Short daily updates help customers feel informed. Explain what was checked, what changed, and what happens next." },
  { title: "Moisture Mapping Tip", text: "Moisture maps make progress easier to prove. Mark affected areas, readings, and equipment placement clearly." },
  { title: "Airflow Tip", text: "More air is not always better. The right angle and placement can dry materials faster with less clutter." },
  { title: "Mold Remediation Tip", text: "Avoid dry sweeping suspected mold. Disturbance can aerosolize particles and make cleanup harder to control." },
  { title: "PPE Tip", text: "Choose PPE based on the job conditions. Respirators, gloves, and eye protection help keep the work safe." },
  { title: "Water Damage Tip", text: "Porous materials absorb water quickly. Carpet pad, insulation, and drywall may hold moisture longer than expected." },
  { title: "Monitoring Tip", text: "Take consistent readings at the same locations each visit so progress is easy to compare over time." },
  { title: "Photo Tip", text: "Wide shots show the room context, close-ups show the damage, and equipment photos show the drying setup." },
  { title: "Odor Tip", text: "Odor often follows moisture. Source removal and verified drying usually matter more than masking smells." },
  { title: "Flooring Tip", text: "Water can move under plank flooring and tile edges. Check transitions, seams, and perimeter walls." },
  { title: "Dry Standard Tip", text: "The goal is not just 'feels dry.' The goal is returning materials to an appropriate dry standard." },
  { title: "Mold Control Tip", text: "Lowering humidity and removing wet materials when needed helps stop microbial conditions from worsening." },
  { title: "Documentation Tip", text: "Record equipment added, removed, or moved. It keeps billing, progress, and communication clean." },
  { title: "Wall Cavity Tip", text: "Exterior walls, plumbing walls, and cabinet areas can hold hidden moisture. Check them carefully." },
  { title: "Ceiling Leak Tip", text: "Ceiling stains may show where water exited, not where it started. Trace the source before assuming the path." },
  { title: "Cabinet Tip", text: "Toe kicks and cabinet backs can trap water. Inspect low areas where moisture may sit unnoticed." },
  { title: "HVAC Tip", text: "Avoid spreading contaminants through air movement. Think about air path before turning equipment on." },
  { title: "Dehumidifier Tip", text: "Empty drains, confirm power, and check that units are operating before leaving the jobsite." },
  { title: "Emergency Tip", text: "Stopping the source is priority one. Drying cannot truly begin until the active leak or intrusion is controlled." },
  { title: "Mold Inspection Tip", text: "Visible mold is often only part of the story. Moisture history helps explain why it appeared." },
  { title: "Clean Work Tip", text: "Keep clean tools and dirty tools separated. It helps prevent cross-contamination and keeps the job professional." },
  { title: "Thermal Camera Tip", text: "Thermal imaging can guide inspection, but it does not replace moisture meter readings." },
  { title: "Material Tip", text: "Different materials dry at different speeds. Wood, drywall, carpet, and concrete all need different expectations." },
  { title: "Concrete Tip", text: "Concrete can hold moisture for a long time. Check conditions before assuming it is dry." },
  { title: "Contents Tip", text: "Move contents carefully and document their original location. It helps customers feel respected and organized." },
  { title: "Communication Tip", text: "Customers remember how calm and organized the team felt. A clean explanation can be just as important as the equipment." },
  { title: "Containment Check", text: "Before work begins, check that barriers are sealed, access points are clear, and the work area is controlled." },
  { title: "Drying Progress Tip", text: "If readings are not improving, reassess the setup. Equipment placement, humidity, or hidden moisture may be the issue." },
  { title: "Mold Remediation Tip", text: "HEPA vacuuming and controlled cleaning are key steps when microbial conditions are present." },
  { title: "Job Closeout Tip", text: "Final photos, final readings, and a short summary make the job file feel complete and professional." },
  { title: "Water Migration Tip", text: "Water follows the path of least resistance. Check adjacent rooms, closets, and wall bases near the loss." },
  { title: "Professional Tip", text: "A neat equipment layout, labeled notes, and clean communication make the portal and the jobsite feel premium." },
  { title: "VODA Team Tip", text: "Small details create trust: clean photos, accurate hours, clear notes, and verified readings all tell the story." },
];

const spring = { duration: 0.42, ease: [0.22, 1, 0.36, 1] };
const smoothSpring = { type: "spring", stiffness: 170, damping: 24, mass: 0.75 };

const floatingAnimation = {
  animate: { y: [0, -3, 0] },
  transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
};
const softMotion = {
  initial: { opacity: 0, y: 14, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: smoothSpring,
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const APP_TIME_ZONE = "America/Phoenix";
const PHOENIX_OFFSET = "-07:00";

function phoenixDateKeyToDate(dateKey) {
  return new Date(`${dateKey}T12:00:00${PHOENIX_OFFSET}`);
}

function getPhoenixParts(date, options = {}) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: APP_TIME_ZONE,
    ...options,
  }).formatToParts(date);
}

function getPhoenixPart(date, type, options = {}) {
  return getPhoenixParts(date, options).find((part) => part.type === type)?.value || "";
}

function getMonday(date = new Date()) {
  const d = phoenixDateKeyToDate(formatDate(date));
  const day = d.getUTCDay();
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1);
  d.setUTCDate(diff);
  d.setUTCHours(19, 0, 0, 0);
  return d;
}

function getPayPeriodStart(date = new Date()) {
  const anchor = phoenixDateKeyToDate("2026-06-01");
  const monday = getMonday(date);
  const daysSinceAnchor = Math.floor((monday.getTime() - anchor.getTime()) / (1000 * 60 * 60 * 24));
  const periodIndex = Math.floor(daysSinceAnchor / 14);
  return addDays(anchor, periodIndex * 14);
}

function getWeeklyJobSuggestions(entries = [], selectedDate, currentUser, selectedEmployeeId = "all") {
  if (!selectedDate) return [];
  const selectedKey = formatDate(selectedDate);
  const weekStartKey = formatDate(getMonday(selectedDate));
  const names = entries
    .filter((entry) => {
      const entryDate = entry.date;
      const sameWeekBeforeSelectedDate = entryDate >= weekStartKey && entryDate < selectedKey;
      const correctEmployee = currentUser?.role === "admin"
        ? selectedEmployeeId === "all" || entry.employeeId === selectedEmployeeId
        : entry.employeeId === currentUser?.id;
      return sameWeekBeforeSelectedDate && correctEmployee && String(entry.customerName || "").trim();
    })
    .map((entry) => String(entry.customerName || "").trim());
  return [...new Set(names)].sort((a, b) => a.localeCompare(b));
}

function getSmartJobSuggestions(entries = [], activeJobs = [], selectedDate, currentUser, selectedEmployeeId = "all") {
  const weekly = getWeeklyJobSuggestions(entries, selectedDate, currentUser, selectedEmployeeId);
  const active = activeJobs
    .map((job) => String(job.customerName || job.name || job.title || "").trim())
    .filter(Boolean);
  return [...new Set([...weekly, ...active])].sort((a, b) => a.localeCompare(b));
}


function formatDate(date = new Date()) {
  const target = date instanceof Date ? date : phoenixDateKeyToDate(String(date));
  const year = getPhoenixPart(target, "year", { year: "numeric", month: "2-digit", day: "2-digit" });
  const month = getPhoenixPart(target, "month", { year: "numeric", month: "2-digit", day: "2-digit" });
  const day = getPhoenixPart(target, "day", { year: "numeric", month: "2-digit", day: "2-digit" });
  return `${year}-${month}-${day}`;
}

function formatPhoenixTime(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: APP_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")?.value || "00";
  const minute = parts.find((part) => part.type === "minute")?.value || "00";
  return `${hour === "24" ? "00" : hour}:${minute}`;
}

function ordinalSuffix(day) {
  const value = Number(day);
  if (value % 100 >= 11 && value % 100 <= 13) return "th";
  if (value % 10 === 1) return "st";
  if (value % 10 === 2) return "nd";
  if (value % 10 === 3) return "rd";
  return "th";
}

function displayDate(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : phoenixDateKeyToDate(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  const month = getPhoenixPart(date, "month", { month: "long", day: "numeric", year: "numeric" });
  const day = Number(getPhoenixPart(date, "day", { month: "long", day: "numeric", year: "numeric" }));
  const year = getPhoenixPart(date, "year", { month: "long", day: "numeric", year: "numeric" });
  return `${month} ${day}${ordinalSuffix(day)}, ${year}`;
}

function displayShortDate(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : phoenixDateKeyToDate(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  const month = getPhoenixPart(date, "month", { month: "short", day: "numeric" });
  const day = Number(getPhoenixPart(date, "day", { month: "short", day: "numeric" }));
  return `${month} ${day}${ordinalSuffix(day)}`;
}


function addDays(date, days) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function getMonthStart(date = new Date()) {
  const target = date instanceof Date ? date : phoenixDateKeyToDate(String(date));
  const year = Number(getPhoenixPart(target, "year", { year: "numeric", month: "2-digit", day: "2-digit" }));
  const month = getPhoenixPart(target, "month", { year: "numeric", month: "2-digit", day: "2-digit" });
  return phoenixDateKeyToDate(`${year}-${month}-01`);
}

function addMonths(date, months) {
  const target = date instanceof Date ? date : phoenixDateKeyToDate(String(date));
  const year = Number(getPhoenixPart(target, "year", { year: "numeric", month: "2-digit", day: "2-digit" }));
  const month = Number(getPhoenixPart(target, "month", { year: "numeric", month: "2-digit", day: "2-digit" }));
  return new Date(Date.UTC(year, month - 1 + months, 1, 19, 0, 0, 0));
}

function monthLabel(date) {
  return new Intl.DateTimeFormat("en-US", { timeZone: APP_TIME_ZONE, month: "long", year: "numeric" }).format(date);
}

function getCalendarGridDates(monthDate) {
  const first = getMonthStart(monthDate);
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

function minutesBetween(start, end) {
  if (!start || !end) return 0;
  const [sh, sm] = String(start).split(":").map(Number);
  const [eh, em] = String(end).split(":").map(Number);
  let minutes = eh * 60 + em - (sh * 60 + sm);
  if (minutes < 0) minutes += 24 * 60;
  return minutes;
}

function entryHours(entry) {
  const raw = minutesBetween(entry.start, entry.end);
  const lunch = entry.lunchTaken ? Number(entry.lunchMinutes || 0) : 0;
  return Math.max(0, (raw - lunch) / 60);
}

function moneylessHours(value) {
  return `${Number(value || 0).toFixed(2)} hrs`;
}

function isDeniedEntry(entry) {
  return String(entry?.approvalStatus || entry?.status || "").toLowerCase() === "denied";
}

function isVacationEntry(entry) {
  const text = `${entry?.jobType || ""} ${entry?.customerName || ""} ${entry?.notes || ""}`.toLowerCase();
  return text.includes("vacation") || text.includes("pto") || text.includes("paid time off");
}

function summarizePayroll(entries = []) {
  const activeEntries = entries.filter((entry) => !isDeniedEntry(entry));
  const totalHours = activeEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
  const vacationHours = activeEntries.filter(isVacationEntry).reduce((sum, entry) => sum + entryHours(entry), 0);

  // Overtime is calculated per employee, per work week.
  // This prevents a normal two-week pay period like 40h + 40h from showing 40h overtime.
  const workedByEmployeeWeek = activeEntries.reduce((groups, entry) => {
    if (isVacationEntry(entry)) return groups;
    const employeeKey = entry.employeeId || entry.employee_id || "unknown";
    const weekKey = entry.date ? formatDate(getMonday(phoenixDateKeyToDate(entry.date))) : "unknown-week";
    const key = `${employeeKey}__${weekKey}`;
    groups[key] = (groups[key] || 0) + entryHours(entry);
    return groups;
  }, {});

  const workedSummaries = Object.values(workedByEmployeeWeek).reduce((summary, hours) => {
    summary.regularHours += Math.min(40, hours);
    summary.overtimeHours += Math.max(0, hours - 40);
    return summary;
  }, { regularHours: 0, overtimeHours: 0 });

  return {
    totalHours,
    regularHours: workedSummaries.regularHours,
    overtimeHours: workedSummaries.overtimeHours,
    vacationHours,
  };
}

const deniedEntryShell = "border-slate-200 bg-slate-200/55 opacity-35 grayscale shadow-none ring-slate-200/60 hover:opacity-45 dark:border-white/10 dark:bg-white/5 dark:ring-white/10";
const deniedText = "text-slate-400 line-through decoration-slate-400/50 dark:text-slate-500";

function normalizeEntry(entry) {
  const approvalStatus = entry.approval_status || entry.status || "pending";
  return {
    id: entry.id,
    employeeId: entry.employee_id,
    jobId: entry.job_id || null,
    jobType: entry.job_type || "Other",
    customerName: entry.customer_name || "Unnamed Job",
    job: `${entry.job_type || "Other"} · ${entry.customer_name || "Unnamed Job"}`,
    date: entry.work_date,
    start: String(entry.start_time || "").slice(0, 5),
    end: String(entry.end_time || "").slice(0, 5),
    lunchTaken: Boolean(entry.lunch_taken),
    lunchMinutes: Number(entry.lunch_minutes || 0),
    notes: entry.notes || "",
    status: approvalStatus,
    approvalStatus,
    denialReason: entry.denial_reason || "",
    reviewedAt: entry.reviewed_at || null,
    photoUrl: entry.photo_url || "",
    employeeSignature: entry.employee_signature || "",
    gpsLat: entry.gps_lat || null,
    gpsLng: entry.gps_lng || null,
  };
}

function Button({ children, className = "", variant = "default", size = "default", ...props }) {
  const variants = {
    default: "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
    cool: "bg-cyan-600 text-white hover:bg-cyan-700",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-slate-200/80 bg-white/75 text-slate-950 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10",
  };
  const sizes = {
    default: "px-4 py-2.5 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-5 py-3.5 text-sm",
  };

  return (
    <button
      className={cx(
        "inline-flex min-w-0 items-center justify-center gap-2 rounded-2xl text-center font-bold leading-snug tracking-[-0.01em] transition-all duration-300 ease-out will-change-transform hover:-translate-y-0.5 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0",
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "", ...props }) {
  return <div {...props} className={cx("ios-glass max-w-full rounded-[1.6rem] border border-white/65 bg-white/70 shadow-xl shadow-slate-950/10 backdrop-blur-2xl ring-1 ring-white/55 transition-all duration-300 ease-out will-change-transform dark:border-white/10 dark:bg-slate-900/62 dark:shadow-black/20 dark:ring-white/10", className)}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={cx("max-w-full p-4 sm:p-5", className)}>{children}</div>;
}

function StatusPill({ status }) {
  const normalized = String(status || "pending").toLowerCase();
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-400/12 dark:text-amber-200 dark:border-amber-300/15",
    draft: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/10 dark:text-slate-200 dark:border-white/10",
    submitted: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-400/12 dark:text-blue-200 dark:border-blue-300/15",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-400/12 dark:text-emerald-200 dark:border-emerald-300/15",
    denied: "bg-red-100 text-red-800 border-red-300 shadow-sm dark:bg-red-500/20 dark:text-red-100 dark:border-red-300/20",
  };

  return <span className={cx("inline-flex shrink-0 items-center justify-center rounded-full border px-2.5 py-1 text-center text-[10px] font-black leading-none capitalize sm:text-xs", styles[normalized] || styles.pending)}>{normalized}</span>;
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <Card>
      <CardContent className="p-3.5 sm:p-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
          {React.cloneElement(icon, { className: "h-5 w-5" })}
        </div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-lg font-black tracking-tight text-slate-950 sm:text-2xl dark:text-white">{value}</p>
      </CardContent>
    </Card>
  );
}

function SectionNav({ activeSection, setActiveSection, isAdmin }) {
  const items = [
    { id: "dashboard", label: "Home", icon: <Activity /> },
    { id: "timesheets", label: "Timesheets", icon: <CalendarDays /> },
    { id: "exports", label: "Docs", icon: <FileText /> },
    { id: "add", label: "Add Hours", icon: <Plus /> },
    { id: "review", label: isAdmin ? "Review" : "Entries", icon: <CheckCircle2 /> },
    ...(isAdmin ? [{ id: "manage", label: "Manage", icon: <Users /> }, { id: "history", label: "History", icon: <Clock /> }] : []),
    { id: "updates", label: "Updates", icon: <MessageSquare /> },
    { id: "tools", label: "Tools", icon: <Sparkles /> },
  ];

  return (
    <motion.nav {...softMotion} className="mb-4 rounded-[1.6rem] border border-white/55 bg-white/72 p-2 shadow-xl shadow-slate-950/8 backdrop-blur-2xl ring-1 ring-white/45 dark:border-white/10 dark:bg-slate-900/66 dark:ring-white/10">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-9">
        {items.map((item) => {
          const selected = activeSection === item.id;
          return (
            <button key={item.id} type="button" onClick={() => setActiveSection(item.id)} className={cx("bubble-fit flex min-h-[64px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-[1.15rem] px-2 py-3 text-center text-[9.5px] font-black uppercase leading-none tracking-[0.04em] transition-all duration-500 sm:min-h-[70px] sm:text-[10.5px]", selected ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950" : "bg-white/55 text-slate-500 hover:bg-white hover:text-slate-950 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white")}>
              {React.cloneElement(item.icon, { className: "h-4 w-4" })}
              <span className="block max-w-full leading-snug">{item.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

function EntryDetails({ entry, employee }) {
  return (
    <div className="grid min-w-0 gap-2 rounded-2xl bg-slate-50/80 p-3 text-xs font-semibold text-slate-600 sm:grid-cols-2 dark:bg-white/5 dark:text-slate-300">
      <p className="clean-wrap flex min-w-0 items-center gap-2 leading-snug"><UserRound className="h-3.5 w-3.5 shrink-0" /> <span className="min-w-0 break-normal">{employee?.name || "Employee"}</span></p>
      <p className="clean-wrap flex min-w-0 items-center gap-2 leading-snug"><Clock className="h-3.5 w-3.5 shrink-0" /> <span className="min-w-0 break-normal">{entryHours(entry).toFixed(2)} total hrs</span></p>
      <p className="clean-wrap sm:col-span-2 leading-snug">Lunch: {entry.lunchTaken ? `${entry.lunchMinutes} min` : "No lunch break"}</p>
      {entry.notes && <div className="min-w-0 sm:col-span-2 rounded-2xl border border-slate-200/70 bg-white/80 p-3 dark:border-white/10 dark:bg-slate-950/30"><p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Job Notes</p><p className="note-wrap leading-5 text-slate-700 dark:text-slate-200">{entry.notes}</p></div>}
      {entry.approvalStatus === "denied" && entry.denialReason && (
        <p className="note-wrap sm:col-span-2 rounded-2xl border border-red-300 bg-red-100 p-3 font-black leading-snug text-red-800 shadow-sm dark:border-red-300/20 dark:bg-red-500/20 dark:text-red-100">
          Denial reason: {entry.denialReason}
        </p>
      )}
    </div>
  );
}


function AdminApprovalQueue({ approvalGroups, expandedApprovalGroups, toggleApprovalGroup, updateStatus, approveAllPendingEntries, setReviewModal, openEditModal, setSelectedEmployeeId, setActiveSection, search, setSearch, approvingAll }) {
  const pendingTotal = approvalGroups.reduce((sum, group) => sum + group.entries.length, 0);
  const pendingHours = approvalGroups.reduce((sum, group) => sum + group.totalHours, 0);

  return (
    <Card>
      <CardContent>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">Admin Approval Queue</p>
            <h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">Hours Needing Approval</h2>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">Grouped by employee. Approved or denied hours leave this queue automatically, but remain available in Timesheets, History, and Docs.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:min-w-56">
            <MiniStat label="Pending" value={pendingTotal} tone="amber" />
            <MiniStat label="Hours" value={`${pendingHours.toFixed(2)}h`} tone="cyan" />
          </div>
        </div>

        <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input aria-label="Search pending approvals" value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-11" placeholder="Search pending jobs, notes, or employees..." /></div>
          <Button type="button" variant="success" disabled={!pendingTotal || approvingAll} onClick={approveAllPendingEntries} className="min-h-12">{approvingAll ? "Approving..." : `Approve All (${pendingTotal})`}</Button>
          <Button type="button" variant="outline" onClick={() => { setSelectedEmployeeId("all"); setActiveSection("history"); }} className="min-h-12">Find Approved / History</Button>
        </div>

        <div className="space-y-3">
          {approvalGroups.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 text-center dark:border-white/10 dark:bg-white/5">
              <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-emerald-600 dark:text-emerald-300" />
              <p className="text-sm font-black text-slate-800 dark:text-white">No approvals needed right now.</p>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">Approved entries can still be reviewed from History, Timesheets, or Docs.</p>
            </div>
          ) : approvalGroups.map(({ employee, entries, totalHours }) => {
            const isOpen = expandedApprovalGroups[employee.id] !== false;
            return (
              <section key={employee.id} className="overflow-hidden rounded-[1.55rem] border border-slate-200 bg-white/82 shadow-lg shadow-slate-950/5 ring-1 ring-white/80 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
                <button type="button" onClick={() => toggleApprovalGroup(employee.id)} className="flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-white/5" aria-expanded={isOpen}>
                  <div className="flex min-w-0 items-center gap-3">
                    <AvatarBadge person={employee} />
                    <div className="min-w-0">
                      <h3 className="clean-wrap text-sm font-black leading-snug text-slate-950 dark:text-white">{employee.name}</h3>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{entries.length} pending · {totalHours.toFixed(2)} hrs awaiting review</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700 dark:border-amber-300/15 dark:bg-amber-400/10 dark:text-amber-200">{entries.length}</span>
                    <ChevronRight className={cx("h-5 w-5 text-slate-400 transition-transform", isOpen && "rotate-90")} />
                  </div>
                </button>

                {isOpen && (
                  <div className="space-y-3 border-t border-slate-100 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-slate-950/20 sm:p-4">
                    {entries.map((entry) => (
                      <article key={entry.id} className="min-w-0 rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
                        <div className="mb-3 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <p className="clean-wrap text-sm font-black leading-snug text-slate-950 dark:text-white">{entry.customerName}</p>
                            <p className="clean-wrap text-xs font-bold leading-snug text-cyan-700 dark:text-cyan-300">{entry.jobType}</p>
                            <p className="clean-wrap text-xs font-semibold leading-snug text-slate-500 dark:text-slate-400">{displayDate(entry.date)} · {entry.start}–{entry.end} · {entryHours(entry).toFixed(2)} hrs</p>
                          </div>
                          <StatusPill status={entry.approvalStatus} />
                        </div>
                        <EntryDetails entry={entry} employee={employee} />
                        {(entry.photoUrl || entry.employeeSignature) && <div className="mt-3 grid gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{entry.photoUrl && <a className="text-cyan-700 underline dark:text-cyan-300" href={entry.photoUrl} target="_blank" rel="noreferrer">View photo/job documentation</a>}{entry.employeeSignature && <p className="flex items-center gap-2"><PenLine className="h-3.5 w-3.5" /> Signed: {entry.employeeSignature}</p>}</div>}
                        <div className="mt-3 grid gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5 sm:grid-cols-3">
                          <Button size="sm" variant="success" onClick={() => updateStatus(entry.id, "approved")}>Approve</Button>
                          <Button size="sm" variant="danger" onClick={() => setReviewModal(entry)}>Deny</Button>
                          <Button size="sm" variant="outline" onClick={() => openEditModal(entry)}><Edit3 className="mr-1 h-3.5 w-3.5" /> Edit</Button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function AdminControlCenter({
  employees,
  jobs,
  inviteEmail,
  setInviteEmail,
  inviteNote,
  createInviteDraft,
  employeeDrafts,
  updateEmployeeDraft,
  saveEmployeeControls,
  jobForm,
  setJobForm,
  createJobRecord,
  updateJobStatus,
}) {
  return (
    <Card>
      <CardContent>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">Admin Control Center</p>
            <h2 className="text-xl font-black tracking-[-0.04em] sm:text-2xl">Employees & Jobs</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">Manage hours access, roles, active employees, and job records from inside the app.</p>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-black text-cyan-700 dark:border-cyan-300/15 dark:bg-cyan-400/10 dark:text-cyan-200">Feature Pack 1</div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[1.5rem] border border-white/70 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-black tracking-[-0.03em]">Employee management</h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Set role, status, hourly rate, and approval access.</p>
              </div>
              <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
            </div>

            <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
              <input className="input" type="email" placeholder="employee@email.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
              <Button onClick={createInviteDraft} className="gap-2"><Plus className="h-4 w-4" /> Invite draft</Button>
            </div>
            {inviteNote && <p className="mb-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-3 text-xs font-bold text-cyan-800 dark:border-cyan-300/15 dark:bg-cyan-400/10 dark:text-cyan-100">{inviteNote}</p>}

            <div className="space-y-3">
              {employees.map((employee) => {
                const draft = employeeDrafts[employee.id] || employee;
                const isActive = draft.active !== false;
                return (
                  <div key={employee.id} className="rounded-[1.35rem] border border-slate-200/80 bg-slate-50/75 p-3 dark:border-white/10 dark:bg-slate-950/25">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="clean-wrap text-sm font-black leading-snug text-slate-950 dark:text-white">{employee.name}</p>
                        <p className="clean-wrap text-xs font-bold leading-snug text-slate-500 dark:text-slate-400">{employee.email || "No email saved"}</p>
                      </div>
                      <span className={cx("rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em]", isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200" : "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400")}>{isActive ? "Active" : "Inactive"}</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-4">
                      <select className="input" value={draft.role || "employee"} onChange={(e) => updateEmployeeDraft(employee.id, { role: e.target.value })}>{employeeRoles.map((role) => <option key={role} value={role}>{role}</option>)}</select>
                      <select className="input" value={String(draft.active !== false)} onChange={(e) => updateEmployeeDraft(employee.id, { active: e.target.value === "true" })}><option value="true">Active</option><option value="false">Inactive</option></select>
                      <input className="input" type="number" min="0" step="0.01" placeholder="Hourly rate" value={draft.hourlyRate ?? ""} onChange={(e) => updateEmployeeDraft(employee.id, { hourlyRate: e.target.value })} />
                      <Button variant="outline" onClick={() => saveEmployeeControls(employee.id)} className="gap-2"><CheckCircle2 className="h-4 w-4" /> Save</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/70 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-black tracking-[-0.03em]">Job database</h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Create permanent job records for hours tracking.</p>
              </div>
              <BriefcaseBusiness className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
            </div>
            <div className="grid gap-2">
              <input className="input" placeholder="Customer / job name" value={jobForm.customerName} onChange={(e) => setJobForm((current) => ({ ...current, customerName: e.target.value }))} />
              <div className="grid gap-2 sm:grid-cols-2">
                <input className="input" placeholder="Job number" value={jobForm.jobNumber} onChange={(e) => setJobForm((current) => ({ ...current, jobNumber: e.target.value }))} />
                <select className="input" value={jobForm.jobType} onChange={(e) => setJobForm((current) => ({ ...current, jobType: e.target.value }))}>{jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>
              </div>
              <input className="input" placeholder="Customer address" value={jobForm.address} onChange={(e) => setJobForm((current) => ({ ...current, address: e.target.value }))} />
              <div className="grid gap-2 sm:grid-cols-2">
                <input className="input" placeholder="Insurance / carrier" value={jobForm.carrier} onChange={(e) => setJobForm((current) => ({ ...current, carrier: e.target.value }))} />
                <input className="input" placeholder="Claim number" value={jobForm.claimNumber} onChange={(e) => setJobForm((current) => ({ ...current, claimNumber: e.target.value }))} />
              </div>
              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <select className="input" value={jobForm.assignedEmployeeId} onChange={(e) => setJobForm((current) => ({ ...current, assignedEmployeeId: e.target.value }))}>
                  <option value="">Unassigned</option>{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
                </select>
                <Button onClick={createJobRecord} className="gap-2"><Plus className="h-4 w-4" /> Create job</Button>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {jobs.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-center text-sm font-bold text-slate-400 dark:border-white/10 dark:text-slate-500">No jobs created yet.</div> : jobs.map((job) => (
                <div key={job.id} className="rounded-[1.35rem] border border-slate-200/80 bg-slate-50/75 p-3 dark:border-white/10 dark:bg-slate-950/25">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0"><p className="clean-wrap text-sm font-black leading-snug text-slate-950 dark:text-white">{job.customerName}</p><p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{job.jobType} {job.jobNumber ? `• ${job.jobNumber}` : ""}</p>{job.address && <p className="mt-1 truncate text-xs font-semibold text-slate-400 dark:text-slate-500">{job.address}</p>}</div>
                    <select className="input max-w-[150px]" value={job.status || "active"} onChange={(e) => updateJobStatus(job.id, e.target.value)}>{jobStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RestorationHoursTracker() {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [appLoading, setAppLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [appError, setAppError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [now, setNow] = useState(new Date());
  const [installPrompt, setInstallPrompt] = useState(null);
  const [notificationPermission, setNotificationPermission] = useState(typeof Notification !== "undefined" ? Notification.permission : "unsupported");
  const [offlineQueue, setOfflineQueue] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vodaOfflineQueue") || "[]"); } catch { return []; }
  });
  const [liveShift, setLiveShift] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vodaLiveShift") || "null"); } catch { return null; }
  });
  const [stoppedShiftReview, setStoppedShiftReview] = useState(null);
  const [showSplash, setShowSplash] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const swipeStartX = useRef(null);
  const refreshStartY = useRef(null);
  const loginTip = useMemo(() => loginTips[Math.floor(Math.random() * loginTips.length)], []);

  const [employees, setEmployees] = useState([]);
  const [entries, setEntries] = useState([]);
  const [weekStart, setWeekStart] = useState(getPayPeriodStart(new Date()));
  const [historyMonth, setHistoryMonth] = useState(getMonthStart(new Date()));
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
  const [search, setSearch] = useState("");
  const [reviewModal, setReviewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [dayDetail, setDayDetail] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => localStorage.getItem("vodaActiveSection") || "dashboard");
  const [expandedApprovalGroups, setExpandedApprovalGroups] = useState({});
  const [messages, setMessages] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [employeeDrafts, setEmployeeDrafts] = useState({});
  const [jobForm, setJobForm] = useState({ customerName: "", jobNumber: "", jobType: jobTypes[0], address: "", carrier: "", claimNumber: "", assignedEmployeeId: "" });
  const [messageForm, setMessageForm] = useState({ recipientId: "all", title: "", body: "" });
  const [profileForm, setProfileForm] = useState({ firstName: "", lastName: "", phone: "", avatarUrl: "" });
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteNote, setInviteNote] = useState("");
  const [form, setForm] = useState({
    date: formatDate(new Date()),
    jobId: "",
    jobType: jobTypes[0],
    customerName: "",
    start: "08:00",
    end: "17:00",
    lunchTaken: true,
    lunchMinutes: 30,
    notes: "",
    photoUrl: "",
    employeeSignature: "",
    gpsLat: "",
    gpsLng: "",
  });

  const employeeById = useMemo(() => new Map(employees.map((employee) => [employee.id, employee])), [employees]);
  const getEmployeeName = (employeeId) => employeeId === currentUser?.id ? currentUser?.name : employeeById.get(employeeId)?.name || "Unknown Employee";
  const activeJobs = useMemo(() => {
    const openStatuses = new Set(["active", "scheduled", "in progress", "on hold"]);
    return jobs.filter((job) => openStatuses.has(String(job.status || "active").toLowerCase()));
  }, [jobs]);

  const weeklyJobSuggestions = useMemo(
    () => getWeeklyJobSuggestions(entries, form.date, currentUser, selectedEmployeeId),
    [entries, form.date, currentUser, selectedEmployeeId]
  );
  const smartJobSuggestions = useMemo(
    () => getSmartJobSuggestions(entries, activeJobs, form.date, currentUser, selectedEmployeeId),
    [entries, activeJobs, form.date, currentUser, selectedEmployeeId]
  );
  const weekDates = useMemo(() => weekdays.map((_, index) => addDays(weekStart, index)), [weekStart]);
  const weekTwoDates = useMemo(() => weekdays.map((_, index) => addDays(weekStart, index + 7)), [weekStart]);
  const payPeriodDates = useMemo(() => [...weekDates, ...weekTwoDates], [weekDates, weekTwoDates]);
  const historyCalendarDays = useMemo(() => getCalendarGridDates(historyMonth), [historyMonth]);

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!isMounted) return;
        if (error) throw error;
        setSession(data.session);
        if (data.session?.user) await loadProfile(data.session.user);
      } catch (error) {
        if (isMounted) {
          setLoginError(error.message || "Unable to load account.");
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    }

    initAuth();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        loadProfile(newSession.user).finally(() => setAuthLoading(false));
      } else {
        setCurrentUser(null);
        setEntries([]);
        setAuthLoading(false);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser) loadAppData();
  }, [currentUser]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (liveShift) localStorage.setItem("vodaLiveShift", JSON.stringify(liveShift));
    else localStorage.removeItem("vodaLiveShift");
  }, [liveShift]);

  useEffect(() => {
    localStorage.setItem("vodaOfflineQueue", JSON.stringify(offlineQueue));
  }, [offlineQueue]);

  useEffect(() => {
    localStorage.setItem("vodaActiveSection", activeSection);
  }, [activeSection]);


  useEffect(() => {
    const lastOpened = Number(localStorage.getItem("vodaLastOpenedAt") || 0);
    const nowMs = Date.now();
    const awayForAWhile = nowMs - lastOpened > 1000 * 60 * 30;
    if (awayForAWhile) {
      setShowSplash(true);
      const splashTimer = window.setTimeout(() => setShowSplash(false), 1500);
      localStorage.setItem("vodaLastOpenedAt", String(nowMs));
      return () => window.clearTimeout(splashTimer);
    }
    localStorage.setItem("vodaLastOpenedAt", String(nowMs));
  }, []);

  useEffect(() => {
    const syncWhenOnline = () => syncOfflineQueue();
    window.addEventListener("online", syncWhenOnline);
    return () => window.removeEventListener("online", syncWhenOnline);
  }, [offlineQueue, currentUser]);

  async function loadProfile(user) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (error) {
      setLoginError("Profile not found. Make sure this user exists in the profiles table.");
      setCurrentUser(null);
      return;
    }
    const firstName = data.first_name || "";
    const lastName = data.last_name || "";
    const displayName = data.full_name || `${firstName} ${lastName}`.trim() || user.email;
    setLoginError("");
    setCurrentUser({
      id: data.id,
      name: displayName,
      firstName,
      lastName,
      phone: data.phone || "",
      avatarUrl: data.avatar_url || "",
      email: user.email || "",
      role: data.role || "employee",
    });
    setProfileForm({ firstName, lastName, phone: data.phone || "", avatarUrl: data.avatar_url || "" });
  }

  async function loadAppData() {
    setAppLoading(true);
    setAppError("");

    const isAdmin = currentUser?.role === "admin";
    const profilesQuery = isAdmin
      ? supabase.from("profiles").select("id, full_name, first_name, last_name, phone, avatar_url, role").order("full_name", { ascending: true })
      : Promise.resolve({ data: [{ id: currentUser.id, full_name: currentUser.name, first_name: currentUser.firstName, last_name: currentUser.lastName, phone: currentUser.phone, avatar_url: currentUser.avatarUrl, role: currentUser.role }], error: null });
    const entriesQuery = isAdmin
      ? supabase.from("time_entries").select("*").order("work_date", { ascending: false })
      : supabase.from("time_entries").select("*").eq("employee_id", currentUser.id).order("work_date", { ascending: false });
    const messagesQuery = isAdmin
      ? supabase.from("portal_messages").select("*").order("created_at", { ascending: false }).limit(25)
      : supabase.from("portal_messages").select("*").or(`recipient_id.eq.${currentUser.id},recipient_id.is.null`).order("created_at", { ascending: false }).limit(12);
    const jobsQuery = isAdmin
      ? supabase.from("app_jobs").select("*").order("created_at", { ascending: false }).limit(150)
      : supabase.from("app_jobs").select("*").or(`assigned_employee_id.eq.${currentUser.id},assigned_employee_id.is.null`).neq("status", "closed").order("created_at", { ascending: false }).limit(100);

    const [profilesResponse, entriesResponse, messagesResponse, jobsResponse] = await Promise.all([profilesQuery, entriesQuery, messagesQuery, jobsQuery]);

    if (profilesResponse.error) setAppError(profilesResponse.error.message);
    if (entriesResponse.error) setAppError(entriesResponse.error.message);
    if (messagesResponse.error && !String(messagesResponse.error.message || "").includes("portal_messages")) setAppError(messagesResponse.error.message);
    if (jobsResponse.error && !String(jobsResponse.error.message || "").includes("app_jobs")) setAppError(jobsResponse.error.message);

    const mappedEmployees = (profilesResponse.data || []).map((profile) => ({
      id: profile.id,
      name: profile.full_name || `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "Unnamed Employee",
      firstName: profile.first_name || "",
      lastName: profile.last_name || "",
      phone: profile.phone || "",
      avatarUrl: profile.avatar_url || "",
      email: profile.email || "",
      role: profile.role || "employee",
      active: profile.active !== false,
      hourlyRate: profile.hourly_rate ?? "",
    }));
    setEmployees(mappedEmployees);
    setEmployeeDrafts(Object.fromEntries(mappedEmployees.map((employee) => [employee.id, employee])));
    setEntries((entriesResponse.data || []).map(normalizeEntry));
    setMessages((messagesResponse.data || []).map((message) => ({
      id: message.id,
      title: message.title || "Portal update",
      body: message.body || "",
      recipientId: message.recipient_id || "all",
      createdBy: message.created_by,
      relatedEntryId: message.related_entry_id || null,
      createdAt: message.created_at,
    })));
    setJobs((jobsResponse.data || []).map((job) => ({ id: job.id, customerName: job.customer_name || "Unnamed Job", jobNumber: job.job_number || "", jobType: job.job_type || "Other", address: job.address || "", carrier: job.carrier || "", claimNumber: job.claim_number || "", assignedEmployeeId: job.assigned_employee_id || "", status: job.status || "active", createdAt: job.created_at })));
    setAppLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
    if (error) {
      setLoginError(error.message);
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setCurrentUser(null);
    setEntries([]);
  }

  const visibleEntries = useMemo(() => {
    if (!currentUser) return [];
    const searchValue = search.toLowerCase().trim();
    return entries.filter((entry) => {
      const inWeek = payPeriodDates.some((date) => formatDate(date) === entry.date);
      const correctUser = currentUser.role === "admin" ? selectedEmployeeId === "all" || entry.employeeId === selectedEmployeeId : entry.employeeId === currentUser.id;
      const matchesSearch = !searchValue || `${entry.jobType} ${entry.customerName} ${entry.notes}`.toLowerCase().includes(searchValue);
      return inWeek && correctUser && matchesSearch;
    });
  }, [entries, payPeriodDates, currentUser, selectedEmployeeId, search]);

  const weeklyTotal = visibleEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
  const pendingCount = visibleEntries.filter((entry) => !["approved", "denied"].includes(String(entry.approvalStatus).toLowerCase())).length;
  const approvedPayrollTotal = visibleEntries.filter((entry) => String(entry.approvalStatus).toLowerCase() === "approved").reduce((sum, entry) => sum + entryHours(entry), 0);
  const deniedHoursTotal = visibleEntries.filter((entry) => String(entry.approvalStatus).toLowerCase() === "denied").reduce((sum, entry) => sum + entryHours(entry), 0);
  const [approvingAll, setApprovingAll] = useState(false);
  const pendingApprovalEntries = useMemo(() => visibleEntries.filter((entry) => !["approved", "denied"].includes(String(entry.approvalStatus).toLowerCase())), [visibleEntries]);
  const approvalGroups = useMemo(() => {
    if (currentUser?.role !== "admin") return [];
    return employees
      .map((employee) => {
        const employeeEntries = pendingApprovalEntries
          .filter((entry) => entry.employeeId === employee.id)
          .sort((a, b) => `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`));
        return {
          employee,
          entries: employeeEntries,
          totalHours: employeeEntries.reduce((sum, entry) => sum + entryHours(entry), 0),
        };
      })
      .filter((group) => group.entries.length > 0);
  }, [currentUser, employees, pendingApprovalEntries]);
  const toggleApprovalGroup = (employeeId) => setExpandedApprovalGroups((current) => ({ ...current, [employeeId]: current[employeeId] === false ? true : false }));
  const weekOneEntries = visibleEntries.filter((entry) => weekDates.some((date) => formatDate(date) === entry.date));
  const weekTwoEntries = visibleEntries.filter((entry) => weekTwoDates.some((date) => formatDate(date) === entry.date));
  const weekOneSummary = summarizePayroll(weekOneEntries);
  const weekTwoSummary = summarizePayroll(weekTwoEntries);
  const payPeriodSummary = {
    totalHours: weekOneSummary.totalHours + weekTwoSummary.totalHours,
    regularHours: weekOneSummary.regularHours + weekTwoSummary.regularHours,
    overtimeHours: weekOneSummary.overtimeHours + weekTwoSummary.overtimeHours,
    vacationHours: weekOneSummary.vacationHours + weekTwoSummary.vacationHours,
  };

  const employeeSummaries = useMemo(() => {
    if (currentUser?.role !== "admin") return [];
    const sourceEmployees = selectedEmployeeId === "all" ? employees : employees.filter((person) => person.id === selectedEmployeeId);
    return sourceEmployees
      .map((employee) => {
        const employeeEntries = visibleEntries.filter((entry) => entry.employeeId === employee.id);
        return {
          ...employee,
          totalHours: employeeEntries.reduce((sum, entry) => sum + entryHours(entry), 0),
          approvedHours: employeeEntries.filter((entry) => entry.approvalStatus === "approved").reduce((sum, entry) => sum + entryHours(entry), 0),
          deniedHours: employeeEntries.filter((entry) => entry.approvalStatus === "denied").reduce((sum, entry) => sum + entryHours(entry), 0),
          pendingCount: employeeEntries.filter((entry) => !["approved", "denied"].includes(String(entry.approvalStatus).toLowerCase())).length,
        };
      })
      .filter((employee) => employee.totalHours > 0 || selectedEmployeeId !== "all");
  }, [currentUser, employees, visibleEntries, selectedEmployeeId]);

  const historyEntries = useMemo(() => {
    if (currentUser?.role !== "admin") return [];
    return entries.filter((entry) => {
      const entryDate = phoenixDateKeyToDate(entry.date);
      const sameMonth = entryDate.getFullYear() === historyMonth.getFullYear() && entryDate.getMonth() === historyMonth.getMonth();
      const correctEmployee = selectedEmployeeId === "all" || entry.employeeId === selectedEmployeeId;
      return sameMonth && correctEmployee;
    });
  }, [currentUser, entries, historyMonth, selectedEmployeeId]);

  const historyTotal = historyEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
  const historyApprovedTotal = historyEntries.filter((entry) => entry.approvalStatus === "approved").reduce((sum, entry) => sum + entryHours(entry), 0);
  const selectedHistoryEmployeeName = selectedEmployeeId === "all" ? "All employees" : employeeById.get(selectedEmployeeId)?.name || "Selected employee";

  function applyJobSelection(jobId, updater = setForm) {
    const selectedJob = jobs.find((job) => job.id === jobId);
    updater((current) => ({
      ...current,
      jobId,
      jobType: selectedJob?.jobType || current.jobType,
      customerName: selectedJob?.customerName || current.customerName,
    }));
  }

  async function saveProfile() {
    if (!currentUser) return;
    setAppError("");
    const firstName = profileForm.firstName.trim();
    const lastName = profileForm.lastName.trim();
    const fullName = `${firstName} ${lastName}`.trim() || currentUser.email;
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName || null,
        last_name: lastName || null,
        full_name: fullName,
        phone: profileForm.phone.trim() || null,
        avatar_url: profileForm.avatarUrl.trim() || null,
      })
      .eq("id", currentUser.id);
    if (error) return setAppError(error.message);
    setCurrentUser((user) => ({ ...user, name: fullName, firstName, lastName, phone: profileForm.phone.trim(), avatarUrl: profileForm.avatarUrl.trim() }));
    setSettingsOpen(false);
    await loadAppData();
  }

  async function uploadProfilePicture(file) {
    if (!file || !currentUser) return;
    setAppError("");
    const extension = file.name.split(".").pop() || "jpg";
    const filePath = `${currentUser.id}/avatar-${Date.now()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("profile-pictures").upload(filePath, file, { upsert: true });
    if (uploadError) return setAppError(uploadError.message);
    const { data } = supabase.storage.from("profile-pictures").getPublicUrl(filePath);
    setProfileForm((current) => ({ ...current, avatarUrl: data.publicUrl }));
  }

  async function createPortalMessage({ recipientId = null, title, body, relatedEntryId = null }) {
    const cleanTitle = String(title || "Portal update").trim();
    const cleanBody = String(body || "").trim();
    if (!cleanBody) return;
    const { error } = await supabase.from("portal_messages").insert({
      recipient_id: recipientId === "all" ? null : recipientId,
      title: cleanTitle,
      body: cleanBody,
      related_entry_id: relatedEntryId,
      created_by: currentUser?.id || null,
    });
    if (error) setAppError(error.message);
  }

  async function sendAdminMessage() {
    if (currentUser?.role !== "admin") return;
    if (!messageForm.title.trim() || !messageForm.body.trim()) return setAppError("Add a message title and message before posting an update.");
    await createPortalMessage({ recipientId: messageForm.recipientId, title: messageForm.title, body: messageForm.body });
    setMessageForm({ recipientId: "all", title: "", body: "" });
    await loadAppData();
  }

  function notifyUser(title, body) {
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification(title, { body, icon: iconLogo });
    }
  }

  async function requestNotifications() {
    if (typeof Notification === "undefined") {
      setNotificationPermission("unsupported");
      setAppError("Push-style browser notifications are not supported on this device/browser.");
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === "granted") notifyUser("VODA notifications enabled", "You will be able to receive portal-style updates while the app is open.");
  }

  async function installApp() {
    if (!installPrompt) return setAppError("Install prompt is not available yet. Open the app in Chrome/Edge and refresh once, or use Add to Home Screen on iPhone.");
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  function startLiveShift() {
    const startedAt = new Date();
    setLiveShift({
      startedAt: startedAt.toISOString(),
      date: formatDate(startedAt),
      jobId: form.jobId || null,
      jobType: form.jobType,
      customerName: form.customerName || "",
    });
    setForm((current) => ({ ...current, date: formatDate(startedAt), start: formatPhoenixTime(startedAt) }));
  }

  function stopLiveShiftAndFillForm() {
    if (!liveShift) return;

    const endedAt = new Date();
    const startedAt = new Date(liveShift.startedAt);
    const reviewEntry = {
      date: formatDate(startedAt),
      jobId: liveShift.jobId || form.jobId || null,
      jobType: liveShift.jobType || form.jobType,
      customerName: liveShift.customerName || form.customerName || "",
      start: formatPhoenixTime(startedAt),
      end: formatPhoenixTime(endedAt),
      lunchTaken: form.lunchTaken,
      lunchMinutes: form.lunchTaken ? Number(form.lunchMinutes || 0) : 0,
      notes: form.notes || "",
      photoUrl: form.photoUrl || "",
      employeeSignature: form.employeeSignature || "",
    };

    setReviewModal(null);
    setEditModal(null);
    setDayDetail(null);
    setStoppedShiftReview(reviewEntry);
    setForm((current) => ({ ...current, ...reviewEntry }));
    setLiveShift(null);
  }

  function liveShiftElapsed() {
    if (!liveShift?.startedAt) return "0:00:00";
    const diff = Math.max(0, Math.floor((now.getTime() - new Date(liveShift.startedAt).getTime()) / 1000));
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  async function uploadJobPhoto(file) {
    if (!file || !currentUser) return;
    setAppError("");
    setIsPhotoUploading(true);
    try {
      const uploadFile = await compressImageFile(file);
      const extension = uploadFile.name.split(".").pop() || "jpg";
      const filePath = `${currentUser.id}/job-photo-${Date.now()}.${extension}`;
      const { error: uploadError } = await supabase.storage.from("job-photos").upload(filePath, uploadFile, { upsert: true });
      if (uploadError) return setAppError(uploadError.message);
      const { data } = supabase.storage.from("job-photos").getPublicUrl(filePath);
      setForm((current) => ({ ...current, photoUrl: data.publicUrl }));
      notifyUser("Photo attached", "The job photo was compressed and added to this entry.");
    } catch (error) {
      setAppError(error.message || "Unable to upload photo.");
    } finally {
      setIsPhotoUploading(false);
    }
  }

  async function syncOfflineQueue() {
    if (!navigator.onLine || !currentUser || offlineQueue.length === 0) return;
    const queue = [...offlineQueue];
    setOfflineQueue([]);
    for (const item of queue) {
      const { error } = await supabase.from("time_entries").insert(item);
      if (error) {
        setOfflineQueue((current) => [...current, item]);
        setAppError(`Some offline entries could not sync yet: ${error.message}`);
        return;
      }
    }
    notifyUser("Offline hours synced", `${queue.length} saved entr${queue.length === 1 ? "y" : "ies"} synced to Supabase.`);
    await loadAppData();
  }

  function exportPayrollPdf() {
    const approved = visibleEntries.filter((entry) => String(entry.approvalStatus || entry.status || "").toLowerCase() === "approved");
    const escapeHtml = (value) => String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

    const approvedWeekOne = approved.filter((entry) => weekDates.some((date) => formatDate(date) === entry.date));
    const approvedWeekTwo = approved.filter((entry) => weekTwoDates.some((date) => formatDate(date) === entry.date));
    const weekOneSummary = summarizePayroll(approvedWeekOne);
    const weekTwoSummary = summarizePayroll(approvedWeekTwo);
    const approvedPeriodSummary = summarizePayroll(approved);

    const employeeName = (entry) => employeeById.get(entry.employeeId)?.name || currentUser?.name || "Employee";
    const timeRange = (entry) => `${entry.start || "--:--"} - ${entry.end || "--:--"}`;

    const renderRows = (weekEntries) => weekEntries.map((entry) => {
      const notes = String(entry.notes || "").trim();
      return `<tr>
        <td><b>${escapeHtml(employeeName(entry))}</b><small>${escapeHtml(entry.jobType || "Job")}</small></td>
        <td>${escapeHtml(displayShortDate(entry.date))}</td>
        <td><b>${escapeHtml(entry.customerName || "Unnamed Job")}</b></td>
        <td>${escapeHtml(timeRange(entry))}</td>
        <td class="hours">${entryHours(entry).toFixed(2)}</td>
        <td class="notes">${notes ? escapeHtml(notes) : "No notes submitted."}</td>
      </tr>`;
    }).join("");

    const renderWeek = (label, range, entries, summary) => `
      <section class="week">
        <div class="week-title">
          <div>
            <p>${escapeHtml(label)}</p>
            <h2>${escapeHtml(range)}</h2>
          </div>
          <div class="week-total"><small>Week Total</small><b>${summary.totalHours.toFixed(2)} hrs</b></div>
        </div>
        <table>
          <thead><tr><th>Employee</th><th>Date</th><th>Job</th><th>Time</th><th>Hours</th><th>Job Notes</th></tr></thead>
          <tbody>${entries.length ? renderRows(entries) : '<tr><td colspan="6" class="empty">No approved entries for this week.</td></tr>'}</tbody>
        </table>
      </section>`;

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>VODA Payroll ${displayDate(weekStart)}</title><style>
      *{box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Arial,sans-serif;margin:0;background:#f5f8fa;color:#0f172a;padding:28px}.sheet{max-width:1180px;margin:0 auto}.hero{background:linear-gradient(135deg,#0f172a 0%,#173a44 52%,#0e7490 100%);color:white;border-radius:30px;padding:30px;box-shadow:0 22px 70px rgba(15,23,42,.18)}.pill{display:inline-flex;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);border-radius:999px;padding:8px 13px;font-size:11px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}h1{margin:16px 0 8px;font-size:36px;letter-spacing:-.055em;line-height:1}.subtitle{margin:0;color:#d7fbff;font-weight:750}.summary{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin:18px 0 10px}.box{background:white;border:1px solid #e2e8f0;border-radius:22px;padding:14px;box-shadow:0 10px 30px rgba(15,23,42,.06)}.box small,.week-total small,td small{display:block;color:#64748b;font-size:10px;font-weight:950;letter-spacing:.14em;text-transform:uppercase}.box b{display:block;margin-top:5px;font-size:22px;letter-spacing:-.04em}.box.ot-zero b{color:#64748b}.week{break-inside:avoid;margin-top:24px;background:white;border:1px solid #dbeafe;border-radius:26px;padding:18px;box-shadow:0 12px 36px rgba(15,23,42,.07)}.week-title{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:12px}.week-title p{margin:0;color:#0891b2;font-size:11px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.week-title h2{margin:4px 0 0;font-size:24px;letter-spacing:-.05em}.week-total{text-align:right;background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:10px 12px;min-width:150px}.week-total b{font-size:18px}table{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;overflow:hidden;border-radius:18px;border:1px solid #e2e8f0}th{background:#0f172a;color:white;text-align:left;font-size:10px;letter-spacing:.14em;text-transform:uppercase;padding:11px 10px}td{vertical-align:top;border-top:1px solid #e2e8f0;padding:12px 10px;font-size:12px;line-height:1.45;color:#1e293b;overflow-wrap:anywhere;word-break:normal}td:nth-child(1){width:17%}td:nth-child(2){width:10%}td:nth-child(3){width:18%}td:nth-child(4){width:11%}.hours{width:8%;font-weight:950;color:#0e7490}.notes{width:36%;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.55;color:#0f172a}.empty{text-align:center;color:#64748b;font-weight:800;padding:22px}.foot{margin:18px 0;color:#64748b;font-size:11px;font-weight:700}.no-print{display:block;margin-top:18px;color:#64748b;font-size:12px;font-weight:700}@media print{body{background:white;padding:0}.hero,.box,.week{box-shadow:none}.no-print{display:none}.sheet{max-width:none}.summary{grid-template-columns:repeat(3,1fr)}.week{page-break-inside:avoid}}@media(max-width:800px){body{padding:12px}.summary{grid-template-columns:repeat(2,1fr)}.week-title{align-items:flex-start;flex-direction:column}.week-total{text-align:left}table{table-layout:auto}.notes{min-width:260px}}
    </style></head><body><main class="sheet"><section class="hero"><span class="pill">VODA Of Tucson</span><h1>Approved Payroll Report</h1><p class="subtitle">Two-week pay period: ${displayShortDate(weekStart)} - ${displayShortDate(addDays(weekStart, 13))} • Approved hours only • Phoenix time</p></section><section class="summary"><div class="box"><small>Week 1</small><b>${weekOneSummary.totalHours.toFixed(2)}h</b></div><div class="box"><small>Week 2</small><b>${weekTwoSummary.totalHours.toFixed(2)}h</b></div><div class="box"><small>Period Total</small><b>${approvedPeriodSummary.totalHours.toFixed(2)}h</b></div><div class="box"><small>Regular</small><b>${approvedPeriodSummary.regularHours.toFixed(2)}h</b></div><div class="box ${approvedPeriodSummary.overtimeHours <= 0 ? "ot-zero" : ""}"><small>Overtime</small><b>${approvedPeriodSummary.overtimeHours.toFixed(2)}h</b></div><div class="box"><small>Vacation</small><b>${approvedPeriodSummary.vacationHours.toFixed(2)}h</b></div></section>${renderWeek(`Week 1`, `${displayShortDate(weekStart)} - ${displayShortDate(addDays(weekStart, 6))}`, approvedWeekOne, weekOneSummary)}${renderWeek(`Week 2`, `${displayShortDate(addDays(weekStart, 7))} - ${displayShortDate(addDays(weekStart, 13))}`, approvedWeekTwo, weekTwoSummary)}<p class="foot">Overtime is calculated per employee per week only after 40 worked hours. Vacation/PTO is tracked separately and does not create overtime.</p><p class="no-print">Use your browser print option and select Save as PDF.</p></main></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `voda-approved-payroll-pay-period-${formatDate(weekStart)}.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function addEntry() {
    if (!currentUser || !form.customerName.trim()) {
      setAppError("Please enter a job name or customer name before adding hours.");
      return;
    }
    if (!form.notes.trim()) {
      setAppError("Please add job notes before submitting hours. Employees must explain what was completed for the day.");
      return;
    }
    setAppError("");
    const payload = {
      employee_id: currentUser.id,
      job_id: form.jobId || null,
      job_type: form.jobType,
      customer_name: form.customerName.trim(),
      work_date: form.date,
      start_time: form.start,
      end_time: form.end,
      lunch_taken: form.lunchTaken,
      lunch_minutes: form.lunchTaken ? Number(form.lunchMinutes || 0) : 0,
      notes: form.notes.trim(),
      photo_url: form.photoUrl || null,
      employee_signature: form.employeeSignature || null,
      status: "pending",
      approval_status: "pending",
    };

    if (!navigator.onLine) {
      setOfflineQueue((current) => [...current, payload]);
      setForm({ ...form, jobId: "", customerName: "", notes: "", photoUrl: "", employeeSignature: "" });
      setActiveSection("timesheets");
      setAppError("You are offline, so this entry was saved locally and will sync when the connection returns.");
      return;
    }

    const { error } = await supabase.from("time_entries").insert(payload);
    if (error) return setAppError(error.message);
    notifyUser("Hours submitted", `${form.customerName.trim()} was added to your timesheet.`);
    setForm({ ...form, jobId: "", customerName: "", notes: "", photoUrl: "", employeeSignature: "" });
    setActiveSection("timesheets");
    await loadAppData();
  }

  async function submitRecordedShift() {
    if (!currentUser || !stoppedShiftReview) return;
    if (!stoppedShiftReview.customerName.trim()) {
      setAppError("Please enter a job name or customer name before submitting the recorded shift.");
      return;
    }
    if (!String(stoppedShiftReview.notes || "").trim()) {
      setAppError("Please add job notes before submitting the recorded shift. Employees must explain what was completed for the day.");
      return;
    }

    setAppError("");

    const payload = {
      employee_id: currentUser.id,
      job_id: stoppedShiftReview.jobId || null,
      job_type: stoppedShiftReview.jobType,
      customer_name: stoppedShiftReview.customerName.trim(),
      work_date: stoppedShiftReview.date,
      start_time: stoppedShiftReview.start,
      end_time: stoppedShiftReview.end,
      lunch_taken: stoppedShiftReview.lunchTaken,
      lunch_minutes: stoppedShiftReview.lunchTaken ? Number(stoppedShiftReview.lunchMinutes || 0) : 0,
      notes: String(stoppedShiftReview.notes || "").trim(),
      photo_url: stoppedShiftReview.photoUrl || null,
      employee_signature: stoppedShiftReview.employeeSignature || null,
      status: "pending",
      approval_status: "pending",
    };

    if (!navigator.onLine) {
      setOfflineQueue((current) => [...current, payload]);
      setStoppedShiftReview(null);
      setForm({
        ...form,
        jobId: "",
        customerName: "",
        notes: "",
        photoUrl: "",
        employeeSignature: "",
      });
      setActiveSection("timesheets");
      setAppError("You are offline, so this recorded shift was saved locally and will sync when the connection returns.");
      return;
    }

    const { error } = await supabase.from("time_entries").insert(payload);
    if (error) return setAppError(error.message);

    notifyUser("Recorded shift submitted", `${stoppedShiftReview.customerName.trim()} was added to your timesheet.`);
    setStoppedShiftReview(null);
    setForm({
      ...form,
      customerName: "",
      notes: "",
      photoUrl: "",
      employeeSignature: "",
    });
    setActiveSection("timesheets");
    await loadAppData();
  }

  function closeTransientPanels() {
    setStoppedShiftReview(null);
    setReviewModal(null);
    setEditModal(null);
    setDayDetail(null);
  }

  function goToSection(section) {
    closeTransientPanels();
    setAppError("");
    setActiveSection(section);
  }

  function openDenyModal(entry) {
    setStoppedShiftReview(null);
    setEditModal(null);
    setDayDetail(null);
    setReviewModal({ entry, reason: "" });
  }

  async function captureGpsLocation() {
    setAppError("");
    if (!navigator.geolocation) return setAppError("GPS is not available on this device or browser.");
    navigator.geolocation.getCurrentPosition(
      (position) => setForm((current) => ({ ...current, gpsLat: Number(position.coords.latitude).toFixed(6), gpsLng: Number(position.coords.longitude).toFixed(6) })),
      () => setAppError("Could not capture GPS. Make sure location access is allowed."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function updateStatus(id, approvalStatus, denialReason = "") {
    setAppError("");
    const { error } = await supabase
      .from("time_entries")
      .update({
        approval_status: approvalStatus,
        status: approvalStatus,
        reviewed_at: new Date().toISOString(),
        denial_reason: approvalStatus === "denied" ? denialReason : null,
      })
      .eq("id", id);
    if (error) return setAppError(error.message);
    const entry = entries.find((item) => item.id === id);
    if (entry) {
      const employee = employeeById.get(entry.employeeId);
      const friendlyStatus = approvalStatus === "approved" ? "approved" : approvalStatus === "denied" ? "denied" : "updated";
      await createPortalMessage({
        recipientId: entry.employeeId,
        title: `Hours ${friendlyStatus}`,
        body: `${entry.customerName} on ${displayDate(entry.date)} was ${friendlyStatus}.${denialReason ? ` Reason: ${denialReason}` : ""}`,
        relatedEntryId: id,
      });
    }
    closeTransientPanels();
    await loadAppData();
  }



  async function approveAllPendingEntries() {
    setAppError("");
    const ids = pendingApprovalEntries.map((entry) => entry.id).filter(Boolean);
    if (!ids.length) return;
    setApprovingAll(true);
    const { error } = await supabase
      .from("time_entries")
      .update({
        approval_status: "approved",
        status: "approved",
        reviewed_at: new Date().toISOString(),
        denial_reason: null,
      })
      .in("id", ids);
    if (error) {
      setApprovingAll(false);
      return setAppError(error.message);
    }
    await loadAppData();
    setApprovingAll(false);
  }

  function openEditModal(entry) {
    setStoppedShiftReview(null);
    setReviewModal(null);
    setDayDetail(null);
    setEditModal({
      id: entry.id,
      employeeName: employeeById.get(entry.employeeId)?.name || currentUser?.name || "Employee",
      date: entry.date,
      jobType: entry.jobType,
      customerName: entry.customerName,
      start: entry.start,
      end: entry.end,
      lunchTaken: entry.lunchTaken,
      lunchMinutes: entry.lunchMinutes,
      notes: entry.notes || "",
    });
  }

  async function saveEditedHours() {
    if (!editModal) return;
    setAppError("");
    const { error } = await supabase
      .from("time_entries")
      .update({
        work_date: editModal.date,
        job_type: editModal.jobType,
        customer_name: editModal.customerName.trim() || "Unnamed Job",
        start_time: editModal.start,
        end_time: editModal.end,
        lunch_taken: editModal.lunchTaken,
        lunch_minutes: editModal.lunchTaken ? Number(editModal.lunchMinutes || 0) : 0,
        notes: editModal.notes,
        approval_status: "pending",
        status: "pending",
        denial_reason: null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", editModal.id);
    if (error) return setAppError(error.message);
    const entry = entries.find((item) => item.id === editModal.id);
    if (entry) {
      await createPortalMessage({
        recipientId: entry.employeeId,
        title: "Hours edited by admin",
        body: `${editModal.customerName || "A time entry"} was edited by admin and returned to pending review. New total: ${entryHours(editModal).toFixed(2)} hrs.`,
        relatedEntryId: editModal.id,
      });
    }
    closeTransientPanels();
    setActiveSection(currentUser?.role === "admin" ? "review" : "timesheets");
    await loadAppData();
  }

  function openDayDetail(dateValue, dayEntries = []) {
    setStoppedShiftReview(null);
    setReviewModal(null);
    setEditModal(null);
    const dateKey = dateValue instanceof Date ? formatDate(dateValue) : String(dateValue);
    setDayDetail({
      date: dateKey,
      entries: [...dayEntries].sort((a, b) => `${a.start || ""}`.localeCompare(`${b.start || ""}`)),
    });
  }


  function openQuickAddForDate(dateValue) {
    const dateKey = dateValue instanceof Date ? formatDate(dateValue) : String(dateValue);
    setStoppedShiftReview(null);
    setReviewModal(null);
    setEditModal(null);
    setDayDetail(null);
    setForm((current) => ({
      ...current,
      date: dateKey,
      jobId: "",
      customerName: "",
      notes: "",
      photoUrl: "",
      employeeSignature: "",
    }));
    setActiveSection("add");
  }


  function handleRefreshTouchStart(event) {
    if (window.scrollY > 4) {
      refreshStartY.current = null;
      return;
    }
    refreshStartY.current = event.touches?.[0]?.clientY ?? null;
  }

  function handleRefreshTouchEnd(event) {
    if (refreshStartY.current === null || appLoading) return;
    const endY = event.changedTouches?.[0]?.clientY ?? refreshStartY.current;
    const pulledDown = endY - refreshStartY.current > 84;
    refreshStartY.current = null;
    if (pulledDown) loadAppData();
  }

  function handleSwipeStart(event) {
    swipeStartX.current = event.touches?.[0]?.clientX ?? null;
  }

  function handlePayPeriodSwipeEnd(event) {
    if (swipeStartX.current === null) return;
    const endX = event.changedTouches?.[0]?.clientX ?? swipeStartX.current;
    const delta = endX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(delta) < 56) return;
    setWeekStart((current) => addDays(current, delta > 0 ? -14 : 14));
  }

  function handleHistorySwipeEnd(event) {
    if (swipeStartX.current === null) return;
    const endX = event.changedTouches?.[0]?.clientX ?? swipeStartX.current;
    const delta = endX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(delta) < 56) return;
    setHistoryMonth((current) => addMonths(current, delta > 0 ? -1 : 1));
  }

  function exportCsv(onlyApproved = false) {
    const source = onlyApproved ? visibleEntries.filter((entry) => entry.approvalStatus === "approved") : visibleEntries;
    const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const makeRows = (label, weekEntries, summary) => [
      [label],
      ["Employee", "Date", "Job Type", "Job / Customer", "Start", "End", "Lunch Taken", "Lunch Minutes", "Hours", "Approval Status", "Denial Reason", "Photo / Documentation Link", "Employee Signature", "Full Job Notes"],
      ...weekEntries.map((entry) => [
        getEmployeeName(entry.employeeId),
        displayDate(entry.date),
        entry.jobType,
        entry.customerName,
        entry.start,
        entry.end,
        entry.lunchTaken ? "Yes" : "No",
        entry.lunchMinutes,
        entryHours(entry).toFixed(2),
        entry.approvalStatus,
        entry.denialReason || "",
        entry.photoUrl || "",
        entry.employeeSignature || "",
        entry.notes || "",
      ]),
      [],
      ["Summary", "Total Hours", summary.totalHours.toFixed(2), "Regular Hours", summary.regularHours.toFixed(2), "Overtime Hours", summary.overtimeHours.toFixed(2), "Vacation Hours", summary.vacationHours.toFixed(2)],
      [],
    ];
    const weekOneSource = source.filter((entry) => weekDates.some((date) => formatDate(date) === entry.date));
    const weekTwoSource = source.filter((entry) => weekTwoDates.some((date) => formatDate(date) === entry.date));
    const periodSummary = summarizePayroll(source);
    const rows = [
      ["VODA Of Tucson Two-Week Timesheet + Job Notes Export"],
      [`Pay Period: ${displayShortDate(weekStart)} - ${displayShortDate(addDays(weekStart, 13))}`],
      [`Generated in Phoenix time (${APP_TIME_ZONE})`],
      [currentUser?.role === "admin" ? `Admin view: ${selectedEmployeeId === "all" ? "All employees" : getEmployeeName(selectedEmployeeId)}` : `Employee view: ${currentUser?.name}`],
      ["Pay Period Summary", "Total Hours", periodSummary.totalHours.toFixed(2), "Regular Hours", periodSummary.regularHours.toFixed(2), "Overtime Hours", periodSummary.overtimeHours.toFixed(2), "Vacation Hours", periodSummary.vacationHours.toFixed(2)],
      [],
      ...makeRows(`Week 1: ${displayShortDate(weekStart)} - ${displayShortDate(addDays(weekStart, 6))}`, weekOneSource, summarizePayroll(weekOneSource)),
      ...makeRows(`Week 2: ${displayShortDate(addDays(weekStart, 7))} - ${displayShortDate(addDays(weekStart, 13))}`, weekTwoSource, summarizePayroll(weekTwoSource)),
    ];
    const blob = new Blob([rows.map((row) => row.map(csvCell).join(",")).join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${onlyApproved ? "approved-payroll" : "voda-job-notes"}-pay-period-${formatDate(weekStart)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportDocumentationReport(onlyApproved = false) {
    const source = onlyApproved ? visibleEntries.filter((entry) => entry.approvalStatus === "approved") : visibleEntries;
    const weekOneSource = source.filter((entry) => weekDates.some((date) => formatDate(date) === entry.date));
    const weekTwoSource = source.filter((entry) => weekTwoDates.some((date) => formatDate(date) === entry.date));
    const summary = summarizePayroll(source);
    const renderEntryCard = (entry) => `
      <article class="entry">
        <div class="entry-head"><div><small>${escapeHtml(getEmployeeName(entry.employeeId))}</small><h3>${escapeHtml(entry.customerName)}</h3><p>${escapeHtml(entry.jobType)} • ${escapeHtml(displayDate(entry.date))} • ${escapeHtml(entry.start)}-${escapeHtml(entry.end)} • ${entryHours(entry).toFixed(2)} hrs</p></div><span class="status ${escapeHtml(String(entry.approvalStatus || "pending").toLowerCase())}">${escapeHtml(entry.approvalStatus || "pending")}</span></div>
        <div class="meta"><span>Lunch: ${entry.lunchTaken ? `${escapeHtml(String(entry.lunchMinutes))} min` : "No"}</span><span>Signature: ${escapeHtml(entry.employeeSignature || "Not signed")}</span>${entry.denialReason ? `<span>Denial: ${escapeHtml(entry.denialReason)}</span>` : ""}</div>
        ${entry.photoUrl ? `<p class="doc-link">Documentation link: ${escapeHtml(entry.photoUrl)}</p>` : ""}
        <section class="notes"><small>Full Job Notes</small><p>${escapeHtml(entry.notes || "No notes submitted.")}</p></section>
      </article>`;
    const renderWeek = (title, entriesForWeek) => `<section class="week"><h2>${escapeHtml(title)}</h2>${entriesForWeek.length ? entriesForWeek.map(renderEntryCard).join("") : '<div class="empty">No entries for this week.</div>'}</section>`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>VODA Job Documentation Export</title><style>
      body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;margin:0;background:#f3f7f9;color:#0f172a;padding:28px}.shell{max-width:1120px;margin:0 auto}.hero{background:linear-gradient(135deg,#0f172a,#164e63);color:white;border-radius:28px;padding:28px;box-shadow:0 22px 60px rgba(15,23,42,.18)}.pill{display:inline-block;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);border-radius:999px;padding:7px 12px;font-size:11px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}h1{margin:14px 0 8px;font-size:34px;letter-spacing:-.05em}.subtitle{color:#cffafe;font-weight:700}.summary{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin:18px 0}.box{background:white;border:1px solid #e2e8f0;border-radius:20px;padding:14px;box-shadow:0 8px 24px rgba(15,23,42,.06)}.box small,.notes small,.entry small{display:block;color:#64748b;font-weight:900;text-transform:uppercase;font-size:10px;letter-spacing:.14em}.box b{display:block;margin-top:5px;font-size:22px}.week{margin-top:22px}.week h2{letter-spacing:-.035em}.entry{break-inside:avoid;background:white;border:1px solid #dbeafe;border-radius:24px;padding:18px;margin:12px 0;box-shadow:0 12px 34px rgba(15,23,42,.07)}.entry-head{display:flex;justify-content:space-between;gap:14px;align-items:flex-start}.entry h3{margin:4px 0 4px;font-size:21px;letter-spacing:-.035em}.entry p{margin:0;color:#475569;font-weight:700}.status{border-radius:999px;padding:7px 10px;font-size:11px;text-transform:uppercase;font-weight:900;background:#fef3c7;color:#92400e}.status.approved{background:#dcfce7;color:#166534}.status.denied{background:#fee2e2;color:#991b1b}.meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.meta span,.doc-link{border-radius:14px;background:#f1f5f9;padding:8px 10px;color:#334155;font-size:12px;font-weight:800}.notes{margin-top:12px;border:1px solid #cbd5e1;background:#f8fafc;border-radius:18px;padding:14px}.notes p{white-space:pre-wrap;word-break:break-word;overflow:visible;line-height:1.55;color:#0f172a}.empty{border:1px dashed #cbd5e1;border-radius:20px;padding:22px;text-align:center;color:#64748b;font-weight:800}@media print{body{background:white;padding:0}.hero,.entry,.box{box-shadow:none}.summary{grid-template-columns:repeat(3,1fr)}}@media(max-width:760px){body{padding:12px}.summary{grid-template-columns:repeat(2,1fr)}.entry-head{flex-direction:column}}
    </style></head><body><main class="shell"><section class="hero"><span class="pill">VODA Of Tucson</span><h1>Job Documentation Export</h1><p class="subtitle">Two-week pay period: ${displayShortDate(weekStart)} - ${displayShortDate(addDays(weekStart, 13))} • Phoenix time • ${currentUser?.role === "admin" ? (selectedEmployeeId === "all" ? "All employees" : escapeHtml(getEmployeeName(selectedEmployeeId))) : escapeHtml(currentUser?.name || "Employee")}</p></section><section class="summary"><div class="box"><small>Week 1</small><b>${summarizePayroll(weekOneSource).totalHours.toFixed(2)}h</b></div><div class="box"><small>Week 2</small><b>${summarizePayroll(weekTwoSource).totalHours.toFixed(2)}h</b></div><div class="box"><small>Period</small><b>${summary.totalHours.toFixed(2)}h</b></div><div class="box"><small>Regular</small><b>${summary.regularHours.toFixed(2)}h</b></div><div class="box"><small>Overtime</small><b>${summary.overtimeHours.toFixed(2)}h</b></div><div class="box"><small>Vacation</small><b>${summary.vacationHours.toFixed(2)}h</b></div></section>${renderWeek(`Week 1: ${displayShortDate(weekStart)} - ${displayShortDate(addDays(weekStart, 6))}`, weekOneSource)}${renderWeek(`Week 2: ${displayShortDate(addDays(weekStart, 7))} - ${displayShortDate(addDays(weekStart, 13))}`, weekTwoSource)}</main></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${onlyApproved ? "approved-" : ""}voda-job-documentation-${formatDate(weekStart)}.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function updateEmployeeDraft(employeeId, updates) {
    setEmployeeDrafts((current) => ({ ...current, [employeeId]: { ...(current[employeeId] || {}), ...updates } }));
  }

  async function saveEmployeeControls(employeeId) {
    if (currentUser?.role !== "admin") return;
    const draft = employeeDrafts[employeeId];
    if (!draft) return;
    setAppError("");
    const { error } = await supabase.from("profiles").update({
      role: draft.role || "employee",
      active: draft.active !== false,
      approval_status: draft.active === false ? "inactive" : "approved",
      hourly_rate: draft.hourlyRate === "" || draft.hourlyRate === null ? null : Number(draft.hourlyRate),
    }).eq("id", employeeId);
    if (error) return setAppError(error.message);
    await loadAppData();
  }

  async function createJobRecord() {
    if (currentUser?.role !== "admin") return;
    if (!jobForm.customerName.trim()) return setAppError("Add a customer or job name before creating a job.");
    setAppError("");
    const { error } = await supabase.from("app_jobs").insert({ customer_name: jobForm.customerName.trim(), job_number: jobForm.jobNumber.trim() || null, job_type: jobForm.jobType, address: jobForm.address.trim() || null, carrier: jobForm.carrier.trim() || null, claim_number: jobForm.claimNumber.trim() || null, assigned_employee_id: jobForm.assignedEmployeeId || null, status: "active", created_by: currentUser.id });
    if (error) return setAppError(error.message);
    setJobForm({ customerName: "", jobNumber: "", jobType: jobTypes[0], address: "", carrier: "", claimNumber: "", assignedEmployeeId: "" });
    await loadAppData();
  }

  async function updateJobStatus(jobId, status) {
    if (currentUser?.role !== "admin") return;
    setAppError("");
    const { error } = await supabase.from("app_jobs").update({ status }).eq("id", jobId);
    if (error) return setAppError(error.message);
    setJobs((current) => current.map((job) => job.id === jobId ? { ...job, status } : job));
  }

  function createInviteDraft() {
    if (!inviteEmail.trim()) return setInviteNote("Enter an employee email first.");
    setInviteNote(`Invite prepared for ${inviteEmail.trim()}. Create this user in Supabase Auth, then add their profile row with role employee. This panel can manage their role/status once the profile exists.`);
    setInviteEmail("");
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-950 px-4 text-white">
        <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          <img src={iconLogo} alt="VODA Logo" className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col items-center"><div className="mb-3 h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,.9)]" /><p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Loading Portal</p></div>
      </div>
    );
  }

  if (!session || !currentUser) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-[radial-gradient(circle_at_top_left,#d8eef4,transparent_30%),radial-gradient(circle_at_bottom_right,#d9e2ea,transparent_34%),linear-gradient(135deg,#f4f6f7,#e9eef1_48%,#f7f8f8)] px-3 py-5 font-[Inter,ui-sans-serif,system-ui]">
        <div className="pointer-events-none absolute -left-28 top-20 h-64 w-64 rounded-full bg-cyan-300/18 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-slate-500/12 blur-3xl" />
        <motion.form {...softMotion} onSubmit={handleLogin} className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/55 bg-slate-100/70 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl ring-1 ring-white/60 sm:p-7">
          <div className="mb-7 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-[2rem] bg-slate-50/70 p-4 shadow-2xl shadow-slate-950/10 ring-1 ring-white/80 backdrop-blur-xl">
              <img src={iconLogo} alt="Voda icon" className="h-full w-full object-contain" />
            </motion.div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-600">Voda Of Tucson Portal</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Secure employee timesheets</p>
          </div>
          <h1 className="text-center text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">Welcome back.</h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-6 text-slate-500">Track job hours, lunch breaks, and weekly payroll records in one calm mobile dashboard.</p>
          <div className="mt-5 space-y-3">
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="input" required />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="input" required />
            {loginError && <p className="rounded-xl border border-red-300 bg-red-100 p-3 text-sm font-black text-red-800 shadow-sm dark:border-red-300/20 dark:bg-red-500/20 dark:text-red-100">{loginError}</p>}
            <Button className="w-full py-4" disabled={authLoading}>Login</Button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md overflow-hidden rounded-[1.65rem] border border-white/60 bg-white/48 p-4 shadow-xl shadow-slate-950/8 backdrop-blur-2xl ring-1 ring-white/55 sm:p-5"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/18 blur-2xl" />
          <div className="relative flex items-start gap-3">
            <motion.div
              animate={{ y: [0, -3, 0], opacity: [0.86, 1, 0.86] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-slate-50/80 text-cyan-600 shadow-sm"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-700">VODA Field Tip</p>
              <h2 className="mt-1 text-sm font-black tracking-[-0.02em] text-slate-950 sm:text-base">{loginTip.title}</h2>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-slate-600">{loginTip.text}</p>
            </div>
          </div>
        </motion.div>
        <style>{inputStyles}</style>
      </div>
    );
  }

  return (
    <div className={cx("relative min-h-screen w-full overflow-x-hidden mobile-safe font-[Inter,ui-sans-serif,system-ui] text-slate-950 transition-all duration-500 dark:text-white", darkMode && "dark", darkMode ? "bg-[radial-gradient(circle_at_top_left,#263846,transparent_28%),radial-gradient(circle_at_bottom_right,#17202b,transparent_32%),linear-gradient(180deg,#0e141b,#141b24)]" : "bg-[radial-gradient(circle_at_top_left,#d8eef4,transparent_26%),radial-gradient(circle_at_bottom_right,#cfd9e1,transparent_30%),linear-gradient(180deg,#f4f7f8,#e3e9ed)]")} onTouchStart={handleRefreshTouchStart} onTouchEnd={handleRefreshTouchEnd}>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 14, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, scale: 1.04, filter: "blur(8px)" }}
              transition={{ duration: 1.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={brandLogo} alt="Voda Of Tucson" className="h-28 w-auto object-contain brightness-0 invert sm:h-36" />
              <div className="h-1 w-28 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-cyan-300" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.25, ease: "easeOut" }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pointer-events-none fixed -left-28 top-20 h-80 w-80 rounded-full bg-cyan-300/14 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 top-1/2 h-96 w-96 rounded-full bg-slate-600/12 blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1540px] overflow-x-hidden px-3 py-3 sm:px-4 sm:py-4 lg:px-5 mobile-padding">
        <motion.header {...softMotion} className="sticky top-2 z-20 mb-4 flex max-w-full flex-col gap-3 overflow-hidden rounded-[1.6rem] border border-white/55 bg-white/74 p-3 shadow-xl shadow-slate-950/8 backdrop-blur-2xl ring-1 ring-white/45 sm:top-4 sm:mb-5 sm:p-4 md:flex-row md:items-center md:justify-between dark:border-white/10 dark:bg-slate-900/68 dark:ring-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-cyan-700/10 ring-1 ring-white/80 sm:h-12 sm:w-12">
              <img src={iconLogo} alt="Voda icon" className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300 sm:text-xs">Voda Of Tucson</p>
              <h1 className="text-xl font-black tracking-[-0.04em] sm:text-2xl md:text-3xl">Hours Tracking</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <div className="col-span-2 flex items-center gap-2 rounded-2xl border border-white/70 bg-slate-50/75 px-3 py-2.5 text-xs font-bold shadow-sm sm:col-span-1 sm:text-sm dark:border-white/10 dark:bg-white/10">
              <AvatarBadge person={currentUser} />
              <div className="min-w-0 break-words leading-tight"><span>{currentUser.name}</span><span className="mx-2 text-slate-300">/</span><span className="capitalize text-cyan-600 dark:text-cyan-300">{currentUser.role}</span></div>
            </div>
            <Button variant="outline" onClick={() => setSettingsOpen(true)} className="gap-2"><Settings className="h-4 w-4" /> Settings</Button>
            <Button variant="outline" onClick={() => setDarkMode((value) => !value)} className="gap-2">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} {darkMode ? "Light" : "Dark"}
            </Button>
            <Button onClick={handleLogout} className="gap-2"><LogOut className="h-4 w-4" /> Logout</Button>
          </div>
        </motion.header>

        {appError && <div className="mb-5 rounded-3xl border border-red-300 bg-red-100 p-4 text-sm font-black text-red-800 shadow-sm dark:border-red-300/20 dark:bg-red-500/20 dark:text-red-100">{appError}</div>}
        {appLoading && <div className="mb-4 rounded-3xl border border-cyan-200/70 bg-cyan-50/75 p-3 text-center text-xs font-black uppercase tracking-[0.16em] text-cyan-800 shadow-sm dark:border-cyan-300/15 dark:bg-cyan-400/10 dark:text-cyan-200">Syncing latest hours...</div>}

        <SectionNav activeSection={activeSection} setActiveSection={goToSection} isAdmin={currentUser.role === "admin"} />

        {activeSection === "updates" && <PortalMessages messages={messages} employees={employees} currentUser={currentUser} messageForm={messageForm} setMessageForm={setMessageForm} sendAdminMessage={sendAdminMessage} />}

        {activeSection === "tools" && <CapabilityDock
          installPrompt={installPrompt}
          installApp={installApp}
          notificationPermission={notificationPermission}
          requestNotifications={requestNotifications}
          offlineQueue={offlineQueue}
          syncOfflineQueue={syncOfflineQueue}
          exportPayrollPdf={exportPayrollPdf}
          exportDocumentationReport={exportDocumentationReport}
          isAdmin={currentUser.role === "admin"}
        />}

        <main className="grid w-full max-w-full gap-4 overflow-x-hidden xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-5">
          <motion.section {...softMotion} transition={{ ...spring, delay: 0.06 }} className="min-w-0 space-y-4 sm:space-y-5">
            {activeSection === "dashboard" && appLoading && <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
              {Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>}

            {activeSection === "dashboard" && !appLoading && <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
              <MetricCard icon={<Clock />} label="Pay Period Total" value={moneylessHours(payPeriodSummary.totalHours)} />
              <MetricCard icon={<CheckCircle2 />} label="Regular Hours" value={moneylessHours(payPeriodSummary.regularHours)} />
              <MetricCard icon={<Activity />} label="Overtime Hours" value={moneylessHours(payPeriodSummary.overtimeHours)} />
              <MetricCard icon={<CalendarDays />} label="Vacation Hours" value={moneylessHours(payPeriodSummary.vacationHours)} />
              <MetricCard icon={<Clock />} label="Week 1 Total" value={moneylessHours(weekOneSummary.totalHours)} />
              <MetricCard icon={<Clock />} label="Week 2 Total" value={moneylessHours(weekTwoSummary.totalHours)} />
              <MetricCard icon={<AlertCircle />} label="Pending" value={pendingCount} />
              <MetricCard icon={<ShieldCheck />} label="Denied Hours" value={moneylessHours(deniedHoursTotal)} />
            </div>}

            <Card className={cx("overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950 text-white shadow-2xl shadow-slate-950/25 dark:border-white/10", !["dashboard", "timesheets"].includes(activeSection) && "hidden")}>
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-[2.25rem] bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,.18),transparent_28%),linear-gradient(135deg,#111827,#1f2937_52%,#0f172a)]">
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,.08),transparent_34%)]" />

                  <div className="relative flex flex-col gap-5 border-b border-white/10 px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,.85)]" />
                        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-cyan-300">Pay period</p>
                      </div>
                      <h2 className="text-2xl font-black tracking-[-0.06em] text-white sm:text-4xl">{displayShortDate(weekStart)} – {displayShortDate(addDays(weekStart, 13))}</h2>
                      <p className="mt-2 text-base font-extrabold tracking-[-0.03em] text-slate-300 sm:text-lg">Two-Week Timesheet</p>
                      {appLoading && <p className="mt-2 text-xs font-bold text-cyan-200/80">Syncing with Supabase...</p>}
                    </div>

                    <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end sm:gap-3">
                      <Button variant="outline" aria-label="Previous pay period" onClick={() => setWeekStart(addDays(weekStart, -14))} className="h-12 w-12 rounded-[1.25rem] border-white/15 bg-white/10 p-0 text-white hover:bg-white/15 sm:h-14 sm:w-14"><ChevronLeft className="h-5 w-5" /></Button>
                      <Button variant="outline" aria-label="Next pay period" onClick={() => setWeekStart(addDays(weekStart, 14))} className="h-12 w-12 rounded-[1.25rem] border-white/15 bg-white/10 p-0 text-white hover:bg-white/15 sm:h-14 sm:w-14"><ChevronRight className="h-5 w-5" /></Button>
                      <Button variant="cool" onClick={() => exportCsv(false)} className="h-12 gap-2 rounded-[1.25rem] px-4 text-sm sm:h-14 sm:px-5 sm:text-base"><Download className="h-5 w-5" /> CSV</Button>
                      <Button variant="outline" onClick={() => exportDocumentationReport(false)} className="h-12 gap-2 rounded-[1.25rem] border-white/15 bg-white/10 px-4 text-sm text-white hover:bg-white/15 sm:h-14 sm:px-5"><FileText className="h-5 w-5" /> Notes</Button>
                      {currentUser.role === "admin" && <Button variant="outline" onClick={exportPayrollPdf} className="h-12 gap-2 rounded-[1.25rem] border-white/15 bg-white/10 px-4 text-sm text-white hover:bg-white/15 sm:h-14 sm:px-5"><FileText className="h-5 w-5" /> PDF</Button>}
                    </div>
                  </div>

                  <div className="relative p-3 sm:p-5">
                    {[weekDates, weekTwoDates].map((datesForWeek, weekIndex) => (
                      <div key={weekIndex} className={cx(weekIndex > 0 && "mt-5")}>
                        <div className="mb-3 flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.055] px-4 py-3">
                          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-200">Week {weekIndex + 1}</p>
                          <p className="text-xs font-extrabold text-slate-300">{displayShortDate(datesForWeek[0])} – {displayShortDate(datesForWeek[6])}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                      {datesForWeek.map((date, index) => {
                        const dateKey = formatDate(date);
                        const dayEntries = visibleEntries.filter((entry) => entry.date === dateKey);
                        const activeEntries = dayEntries.filter((entry) => !isDeniedEntry(entry));
                        const total = activeEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
                        const deniedCount = dayEntries.length - activeEntries.length;
                        const isToday = dateKey === formatDate(new Date());
                        const shortDay = weekdays[index];

                        return (
                          <motion.button
                            key={dateKey}
                            type="button"
                            onClick={() => openDayDetail(dateKey, dayEntries)}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03, ...spring }}
                            className={cx(
                              "group relative min-h-[224px] w-full overflow-hidden rounded-[1.35rem] border p-3 pt-10 text-center shadow-xl backdrop-blur-2xl transition-all duration-500 ease-out will-change-transform sm:min-h-[242px]",
                              "border-white/15 bg-white/[0.075] hover:-translate-y-0.5 hover:bg-white/[0.105] hover:shadow-2xl hover:shadow-cyan-950/20",
                              isToday && "border-cyan-400/90 ring-2 ring-cyan-400/60"
                            )}
                          >
                            {isToday && (
                              <span className="absolute left-3 top-3 z-10 inline-flex h-6 min-w-[58px] items-center justify-center rounded-full border border-cyan-200/70 bg-cyan-400 px-3 text-[9px] font-black uppercase leading-none tracking-[0.08em] text-slate-950 shadow-lg shadow-cyan-500/25 sm:h-7 sm:min-w-[64px] sm:text-[10px]">
                                Today
                              </span>
                            )}

                            <div className="flex min-h-[58px] flex-col items-start justify-start gap-1 text-left">
                              <p className="text-[13px] font-black leading-none tracking-[-0.025em] text-white sm:text-[14px]">{shortDay}</p>
                              <p className="max-w-full text-[10px] font-extrabold leading-tight text-slate-400 sm:text-[10.5px]">{displayDate(date)}</p>
                            </div>

                            <div className="my-3 h-px w-full bg-white/12" />

                            <div className="flex h-[62px] flex-col items-center justify-center sm:h-[68px]">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/25 shadow-inner shadow-slate-950/30 sm:h-10 sm:w-10">
                                <Clock className="h-4 w-4 text-cyan-300" />
                              </div>
                              <p className="mt-2 text-[22px] font-black leading-none tracking-[-0.055em] text-cyan-300 sm:text-[24px]">{total.toFixed(1)}h</p>
                              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500">Logged</p>
                            </div>

                            <div className="mt-2 min-h-[60px]">
                              {dayEntries.length === 0 ? (
                                <div className="flex min-h-[60px] flex-col items-center justify-center rounded-[1.1rem] border border-dashed border-white/18 bg-white/[0.035] px-2 text-slate-400">
                                  <BriefcaseBusiness className="mb-1.5 h-4 w-4 opacity-75" />
                                  <p className="text-[10px] font-extrabold leading-tight">No entries</p>
                                </div>
                              ) : (
                                <div className="space-y-1.5 text-left">
                                  {dayEntries.slice(0, 2).map((entry) => (
                                    <div
                                      key={entry.id}
                                      className={cx(
                                        "rounded-[1rem] border border-white/12 bg-slate-950/20 px-2.5 py-2 shadow-sm",
                                        isDeniedEntry(entry) && "border-red-300/20 bg-red-500/15 opacity-80"
                                      )}
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                          <p className={cx("line-clamp-2 job-text text-[10.5px] font-black leading-snug tracking-[-0.02em] text-white", isDeniedEntry(entry) && "text-red-100")}>{entry.customerName}</p>
                                          <p className="mt-0.5 job-text text-[9.5px] font-bold leading-snug text-slate-400">{entry.start}–{entry.end}</p>
                                        </div>
                                        <span className={cx("shrink-0 rounded-full bg-cyan-400/12 px-1.5 py-0.5 text-[9px] font-black text-cyan-200", isDeniedEntry(entry) && "bg-red-400/15 text-red-100")}>{isDeniedEntry(entry) ? "Denied" : `${entryHours(entry).toFixed(2)}h`}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {(dayEntries.length > 2 || deniedCount > 0) && (
                              <div className="mt-2 flex min-h-[22px] flex-wrap items-center justify-center gap-1 text-[9px] font-black">
                                {dayEntries.length > 2 && <span className="rounded-full bg-white/8 px-2 py-0.5 text-slate-300">+{dayEntries.length - 2} more</span>}
                                {deniedCount > 0 && <span className="rounded-full bg-red-400/18 px-2 py-0.5 text-red-100">{deniedCount} denied logged</span>}
                              </div>
                            )}
                          </motion.button>
                        );
                      })}
                        </div>
                      </div>
                    ))}

                    <div className="mt-5 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.06] px-5 py-4 text-slate-300">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/30 text-cyan-300">i</span>
                        <p className="text-sm font-bold sm:text-base">Click any day to view details. The export keeps Week 1 and Week 2 separated on one worksheet.</p>
                      </div>
                      <ChevronRight className="hidden h-5 w-5 text-slate-400 sm:block" />
                    </div>

                    <div className="mt-4 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/[0.08] p-4 text-white">
                      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">Payroll Summary</p>
                          <h3 className="text-lg font-black tracking-[-0.03em]">Two-week pay period</h3>
                        </div>
                        <p className="text-xs font-bold text-slate-300">{displayShortDate(weekStart)} – {displayShortDate(addDays(weekStart, 13))}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                        <MiniStat label="Week 1" value={`${weekOneSummary.totalHours.toFixed(2)}h`} tone="cyan" />
                        <MiniStat label="Week 2" value={`${weekTwoSummary.totalHours.toFixed(2)}h`} tone="cyan" />
                        <MiniStat label="Period" value={`${payPeriodSummary.totalHours.toFixed(2)}h`} tone="emerald" />
                        <MiniStat label="Regular" value={`${payPeriodSummary.regularHours.toFixed(2)}h`} tone="emerald" />
                        <MiniStat label="Overtime" value={`${payPeriodSummary.overtimeHours.toFixed(2)}h`} tone="amber" />
                        <MiniStat label="Vacation" value={`${payPeriodSummary.vacationHours.toFixed(2)}h`} tone="red" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {currentUser.role === "admin" && activeSection === "manage" && (
              <AdminControlCenter
                employees={employees}
                jobs={jobs}
                inviteEmail={inviteEmail}
                setInviteEmail={setInviteEmail}
                inviteNote={inviteNote}
                createInviteDraft={createInviteDraft}
                employeeDrafts={employeeDrafts}
                updateEmployeeDraft={updateEmployeeDraft}
                saveEmployeeControls={saveEmployeeControls}
                jobForm={jobForm}
                setJobForm={setJobForm}
                createJobRecord={createJobRecord}
                updateJobStatus={updateJobStatus}
              />
            )}

            {currentUser.role === "admin" && activeSection === "history" && (
              <Card>
                <CardContent>
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">Employee Calendar History</p>
                      <h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">{selectedHistoryEmployeeName}</h2>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{moneylessHours(historyTotal)} total / {moneylessHours(historyApprovedTotal)} approved</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setHistoryMonth(addMonths(historyMonth, -1))}><ChevronLeft className="h-4 w-4" /></Button>
                      <Button variant="outline" onClick={() => setHistoryMonth(addMonths(historyMonth, 1))}><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <p className="mb-3 text-sm font-black">{monthLabel(historyMonth)}</p>
                  <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day}>{day}</div>)}
                  </div>
                  <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2">
                    {historyCalendarDays.map((date) => {
                      const dateKey = formatDate(date);
                      const dayEntries = historyEntries.filter((entry) => entry.date === dateKey);
                      const activeEntries = dayEntries.filter((entry) => !isDeniedEntry(entry));
                      const deniedCount = dayEntries.length - activeEntries.length;
                      const total = activeEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
                      const inMonth = date.getMonth() === historyMonth.getMonth();
                      return (
                        <button
                          type="button"
                          key={dateKey}
                          onClick={() => openDayDetail(dateKey, dayEntries)}
                          className={cx(
                            "min-h-[96px] rounded-2xl border p-2.5 text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:min-h-[110px] sm:p-3",
                            inMonth ? "border-white/70 bg-white/70 dark:border-white/10 dark:bg-white/5" : "border-transparent bg-transparent opacity-25"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[13px] font-black leading-none text-slate-900 dark:text-white">{date.getDate()}</p>
                              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">{new Intl.DateTimeFormat("en-US", { timeZone: APP_TIME_ZONE, weekday: "short" }).format(date)}</p>
                            </div>
                            {dayEntries.length > 0 && <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,.55)]" />}
                          </div>

                          <div className="mt-3 min-h-[25px]">
                            {total > 0 ? (
                              <div className="rounded-xl bg-cyan-50 px-2 py-1.5 text-center text-[10px] font-black leading-none text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
                                {total.toFixed(1)}h
                              </div>
                            ) : (
                              <div className="rounded-xl border border-dashed border-slate-200/70 px-2 py-1.5 text-center text-[9px] font-black text-slate-300 dark:border-white/10 dark:text-slate-600">—</div>
                            )}
                          </div>

                          {dayEntries.length > 0 && (
                            <div className="mt-2 flex min-h-[10px] items-center justify-center gap-1">
                              {activeEntries.slice(0, 3).map((entry) => <span key={entry.id} className="h-1.5 w-1.5 rounded-full bg-cyan-500/70" />)}
                              {deniedCount > 0 && <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />}
                              {dayEntries.length > 4 && <span className="ml-1 text-[9px] font-black text-slate-400">+{dayEntries.length - 4}</span>}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {["dashboard", "add"].includes(activeSection) && <LiveShiftPanel
              liveShift={liveShift}
              elapsed={liveShiftElapsed()}
              startLiveShift={startLiveShift}
              stopLiveShiftAndFillForm={stopLiveShiftAndFillForm}
              form={form}
            />}

            {activeSection === "add" && <Card>
              <CardContent>
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200"><Plus className="h-5 w-5" /></div>
                  <div><h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">Add Job Entry</h2><p className="text-sm text-slate-500 dark:text-slate-400">Split one workday across multiple jobs.</p></div>
                </div>
                <div className="grid gap-2.5 md:grid-cols-2">
                  <Field label="Date"><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" /></Field>
                  <Field label="Saved Job"><select value={form.jobId} onChange={(e) => applyJobSelection(e.target.value)} className="input"><option value="">Manual / one-time job</option>{activeJobs.map((job) => <option key={job.id} value={job.id}>{job.customerName}{job.jobNumber ? ` • ${job.jobNumber}` : ""}</option>)}</select></Field>
                  <Field label="Job Type"><select value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })} className="input">{jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></Field>
                  <Field label="Job / Customer Name">
                    <input
                      list="weekly-job-suggestions"
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value, jobId: "" })}
                      className="input"
                      placeholder="Example: Smith Residence"
                    />
                    <datalist id="weekly-job-suggestions">
                      {smartJobSuggestions.map((job) => <option key={job} value={job} />)}
                    </datalist>
                    {smartJobSuggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {smartJobSuggestions.slice(0, 6).map((job) => (
                          <button key={job} type="button" onClick={() => setForm({ ...form, customerName: job, jobId: "" })} className="bubble-fit rounded-full border border-cyan-200/70 bg-cyan-50/80 px-2.5 py-1.5 text-[10px] font-black text-cyan-800 transition hover:-translate-y-0.5 hover:bg-cyan-100 dark:border-cyan-300/15 dark:bg-cyan-400/10 dark:text-cyan-200">
                            {job}
                          </button>
                        ))}
                      </div>
                    )}
                    {weeklyJobSuggestions.length > 0 && <p className="mt-2 text-xs font-bold text-cyan-700 dark:text-cyan-300">Top suggestions are jobs already entered earlier this same week.</p>}
                  </Field>
                  <Field label="Start Time"><input type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="input" /></Field>
                  <Field label="End Time"><input type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="input" /></Field>
                  <Field label="Lunch Break"><div className="flex gap-2"><Button type="button" variant={form.lunchTaken ? "cool" : "outline"} className="flex-1" onClick={() => setForm({ ...form, lunchTaken: true })}>Yes</Button><Button type="button" variant={!form.lunchTaken ? "default" : "outline"} className="flex-1" onClick={() => setForm({ ...form, lunchTaken: false, lunchMinutes: 0 })}>No</Button></div></Field>
                  <Field label="Lunch Minutes"><input type="number" min="0" value={form.lunchMinutes} disabled={!form.lunchTaken} onChange={(e) => setForm({ ...form, lunchMinutes: Number(e.target.value) })} className="input disabled:opacity-40" /></Field>
                  <div className="md:col-span-2"><Field label="Job Notes Required"><textarea required aria-required="true" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input min-h-28 resize-none" placeholder="Required: explain what you completed on this job today, equipment used, progress, or next steps..." /></Field><p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">Notes are required before hours can be submitted.</p></div>
                  <Field label="Photo / Job Documentation"><div className="space-y-2"><div className="relative"><Camera className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} className="input pl-11" placeholder="Paste photo/job folder link or upload below" /></div>{form.photoUrl && <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/65 p-2 dark:border-white/10 dark:bg-white/5"><img src={form.photoUrl} alt="Job documentation preview" className="h-32 w-full rounded-xl object-cover" /></div>}<label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-cyan-200 bg-cyan-50/60 p-3 text-xs font-black text-cyan-800 transition hover:bg-cyan-100 dark:border-cyan-300/15 dark:bg-cyan-400/10 dark:text-cyan-200"><Upload className="h-4 w-4" />{isPhotoUploading ? "Compressing + uploading..." : "Upload compressed photo"}<input type="file" accept="image/*" onChange={(e) => uploadJobPhoto(e.target.files?.[0])} className="hidden" disabled={isPhotoUploading} /></label></div></Field>
                  <div className="md:col-span-2"><Field label="Employee Signature / Confirmation"><div className="relative"><PenLine className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={form.employeeSignature} onChange={(e) => setForm({ ...form, employeeSignature: e.target.value })} className="input pl-11" placeholder="Type employee name to confirm this entry" /></div></Field></div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-4 text-white shadow-xl shadow-slate-950/10 dark:from-slate-800 dark:to-cyan-950">
                  <div><p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Calculated Entry</p><p className="text-2xl font-black">{entryHours(form).toFixed(2)} hrs</p></div>
                  <Button onClick={addEntry} variant="outline" className="bg-white px-5 py-4 text-slate-950 hover:bg-cyan-50" disabled={appLoading || !form.customerName.trim() || !form.notes.trim()}>Add Hours</Button>
                </div>
              </CardContent>
            </Card>}
          </motion.section>

          <motion.aside {...softMotion} transition={{ ...spring, delay: 0.12 }} className="min-w-0 space-y-4 sm:space-y-5">
            {currentUser.role === "admin" && activeSection === "dashboard" && (
              <Card>
                <CardContent>
                  <div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">Admin Command Center</p><h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">Payroll + Team Controls</h2></div><Sparkles className="h-6 w-6 text-cyan-700 dark:text-cyan-300" /></div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <MiniStat label="Approved" value={`${approvedPayrollTotal.toFixed(2)}h`} tone="emerald" />
                    <MiniStat label="Pending" value={pendingCount} tone="amber" />
                    <MiniStat label="Denied" value={`${deniedHoursTotal.toFixed(2)}h`} tone="red" />
                  </div>
                  <div className="mt-4 rounded-3xl border border-white/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="mb-3 flex items-center gap-2"><Users className="h-4 w-4 text-cyan-700 dark:text-cyan-300" /><p className="text-sm font-black">Employee Invite Helper</p></div>
                    <div className="flex flex-col gap-2 sm:flex-row"><input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="input" placeholder="employee@email.com" /><Button type="button" onClick={createInviteDraft}>Prepare</Button></div>
                    {inviteNote && <p className="mt-3 rounded-2xl bg-cyan-50 p-3 text-xs font-bold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">{inviteNote}</p>}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "exports" && <DocumentationExportPanel
              currentUser={currentUser}
              employees={employees}
              visibleEntries={visibleEntries}
              selectedEmployeeId={selectedEmployeeId}
              setSelectedEmployeeId={setSelectedEmployeeId}
              search={search}
              setSearch={setSearch}
              employeeById={employeeById}
              weekStart={weekStart}
              setWeekStart={setWeekStart}
              weekDates={weekDates}
              weekTwoDates={weekTwoDates}
              exportCsv={exportCsv}
              exportDocumentationReport={exportDocumentationReport}
              exportPayrollPdf={exportPayrollPdf}
              openDayDetail={openDayDetail}
            />}

            {currentUser.role === "admin" && activeSection === "review" && <AdminApprovalQueue
              approvalGroups={approvalGroups}
              expandedApprovalGroups={expandedApprovalGroups}
              toggleApprovalGroup={toggleApprovalGroup}
              updateStatus={updateStatus}
              approveAllPendingEntries={approveAllPendingEntries}
              approvingAll={approvingAll}
              setReviewModal={openDenyModal}
              openEditModal={openEditModal}
              setSelectedEmployeeId={setSelectedEmployeeId}
              setActiveSection={goToSection}
              search={search}
              setSearch={setSearch}
            />}

            {(activeSection === "dashboard" || (activeSection === "review" && currentUser.role !== "admin")) && <Card>
              <CardContent>
                <div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">Transparency Log</p><h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">All Visible Entries</h2></div><CalendarDays className="h-6 w-6 text-cyan-700 dark:text-cyan-300" /></div>
                <div className="mb-4 grid gap-3 md:grid-cols-2">
                  {currentUser.role === "admin" && <select value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} className="input"><option value="all">All employees</option>{employees.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</select>}
                  <div className="relative md:col-span-2"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-11" placeholder="Search jobs or notes..." /></div>
                </div>

                {currentUser.role === "admin" && (
                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    {employeeSummaries.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-4 text-sm font-bold text-slate-500 sm:col-span-2 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">No employee hours to review for this pay period.</div> : employeeSummaries.map((employee) => (
                      <button key={employee.id} type="button" onClick={() => setSelectedEmployeeId(employee.id)} className="rounded-3xl border border-white/70 bg-white/75 p-4 text-left shadow-sm ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
                        <p className="text-sm font-black">{employee.name}</p><p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">Total: {employee.totalHours.toFixed(2)} hrs</p>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-black"><span className="rounded-2xl bg-amber-50 px-2 py-2 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">{employee.pendingCount} pending</span><span className="rounded-2xl bg-emerald-50 px-2 py-2 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{employee.approvedHours.toFixed(1)} approved</span><span className="rounded-2xl bg-red-100 px-2 py-2 text-red-800 shadow-sm dark:bg-red-500/20 dark:text-red-100">{employee.deniedHours.toFixed(1)} denied</span></div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  {visibleEntries.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">No matching entries for this pay period.</div> : visibleEntries.map((entry) => {
                    const employee = entry.employeeId === currentUser.id ? currentUser : employeeById.get(entry.employeeId);
                    return (
                      <div key={entry.id} className={cx("rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition duration-300 dark:border-white/10 dark:bg-slate-950/30", isDeniedEntry(entry) && "border-slate-200 bg-slate-100/70 opacity-45 grayscale shadow-none dark:bg-white/5")}>
                        <div className="mb-3 flex min-w-0 items-start justify-between gap-3"><div className="min-w-0"><p className="clean-wrap text-sm font-black leading-snug">{entry.customerName}</p><p className="clean-wrap text-xs font-bold leading-snug text-cyan-700 dark:text-cyan-300">{entry.jobType}</p><p className="clean-wrap text-xs leading-snug text-slate-500 dark:text-slate-400">{displayDate(entry.date)} · {entry.start}–{entry.end}</p></div><StatusPill status={entry.approvalStatus} /></div>
                        <EntryDetails entry={entry} employee={employee} />
                        {(entry.photoUrl || entry.employeeSignature) && <div className="mt-3 grid gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{entry.photoUrl && <a className="text-cyan-700 underline dark:text-cyan-300" href={entry.photoUrl} target="_blank" rel="noreferrer">View photo/job documentation</a>}{entry.employeeSignature && <p className="flex items-center gap-2"><PenLine className="h-3.5 w-3.5" /> Signed: {entry.employeeSignature}</p>}</div>}
                        {currentUser.role === "admin" && <div className="mt-3 grid grid-cols-1 gap-2 rounded-2xl sm:grid-cols-3 border border-slate-100 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5"><Button size="sm" variant="success" onClick={() => updateStatus(entry.id, "approved")}>Approve</Button><Button size="sm" variant="danger" onClick={() => openDenyModal(entry)}>Deny</Button><Button size="sm" variant="outline" onClick={() => openEditModal(entry)}><Edit3 className="mr-1 h-3.5 w-3.5" /> Edit</Button></div>}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>}

            {activeSection === "dashboard" && <Card className="overflow-hidden border-slate-500/15 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-800 text-white shadow-2xl shadow-cyan-700/15">
              <CardContent className="relative p-5"><div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-300/14 blur-2xl" /><img src={brandLogo} alt="Voda Of Tucson" className="mb-5 max-h-14 w-auto object-contain brightness-0 invert sm:max-h-16" /><BriefcaseBusiness className="mb-4 h-8 w-8 text-cyan-200" /><h2 className="text-xl font-black tracking-[-0.03em]">Built for Voda Of Tucson field teams.</h2><p className="mt-2 text-sm leading-6 text-cyan-50">Track daily hours by job, verify lunch breaks, and keep weekly payroll transparent between employees and management.</p></CardContent>
            </Card>}
          </motion.aside>
        </main>
      </div>

      {settingsOpen && <SettingsModal currentUser={currentUser} profileForm={profileForm} setProfileForm={setProfileForm} setSettingsOpen={setSettingsOpen} saveProfile={saveProfile} uploadProfilePicture={uploadProfilePicture} />}
      {stoppedShiftReview && <RecordedShiftModal stoppedShiftReview={stoppedShiftReview} setStoppedShiftReview={setStoppedShiftReview} submitRecordedShift={submitRecordedShift} activeJobs={activeJobs} jobs={jobs} />}
      {reviewModal && <ReviewModal reviewModal={reviewModal} setReviewModal={setReviewModal} updateStatus={updateStatus} setAppError={setAppError} />}
      {editModal && <EditHoursModal editModal={editModal} setEditModal={setEditModal} saveEditedHours={saveEditedHours} />}
      {dayDetail && <DayDetailModal dayDetail={dayDetail} setDayDetail={setDayDetail} currentUser={currentUser} employeeById={employeeById} updateStatus={updateStatus} openEditModal={openEditModal} setReviewModal={openDenyModal} openQuickAddForDate={openQuickAddForDate} />}
      <style>{inputStyles}</style>
    </div>
  );
}


function CapabilityDock({ installPrompt, installApp, notificationPermission, requestNotifications, offlineQueue, syncOfflineQueue, exportPayrollPdf, exportDocumentationReport, isAdmin }) {
  const online = typeof navigator === "undefined" ? true : navigator.onLine;
  const items = [
    { icon: online ? <Wifi /> : <WifiOff />, label: online ? "Online" : "Offline", value: offlineQueue.length ? `${offlineQueue.length} queued` : "Synced", action: offlineQueue.length ? syncOfflineQueue : null },
    { icon: <Bell />, label: "Notifications", value: notificationPermission === "granted" ? "Enabled" : "Enable", action: notificationPermission !== "granted" && notificationPermission !== "unsupported" ? requestNotifications : null },
    { icon: <FileText />, label: "Job Notes", value: "Export", action: () => exportDocumentationReport(false) },
    ...(isAdmin ? [{ icon: <FileText />, label: "Payroll PDF", value: "Export", action: exportPayrollPdf }] : []),
  ];

  return (
    <motion.div {...softMotion} className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
      {items.map((item) => (
        <button key={item.label} type="button" onClick={item.action || undefined} className="group rounded-[1.4rem] border border-white/60 bg-white/65 p-3 text-left shadow-lg shadow-slate-950/5 ring-1 ring-white/60 transition hover:-translate-y-0.5 hover:bg-white/85 dark:border-white/10 dark:bg-white/7 dark:ring-white/10">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-cyan-200 dark:bg-cyan-400/10 dark:text-cyan-200">{React.cloneElement(item.icon, { className: "h-4 w-4" })}</div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
          <p className="mt-1 text-sm font-black tracking-[-0.02em] text-slate-950 dark:text-white">{item.value}</p>
        </button>
      ))}
    </motion.div>
  );
}

function LiveShiftPanel({ liveShift, elapsed, startLiveShift, stopLiveShiftAndFillForm, form }) {
  return (
    <Card className="overflow-hidden border-cyan-200/70 bg-gradient-to-br from-white/80 via-slate-50/70 to-cyan-50/50 dark:border-cyan-300/10 dark:from-slate-950/60 dark:via-slate-900/60 dark:to-cyan-950/30">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950 text-cyan-200 shadow-lg shadow-cyan-900/10 dark:bg-cyan-400/10">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Live clock-in timer</p>
              <h2 className="text-xl font-black tracking-[-0.04em]">{liveShift ? elapsed : "Ready"}</h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{liveShift ? (liveShift.customerName || form.customerName || "Active job timer") : "Start a timer and it will keep running until you stop and review it."}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:flex">
            {!liveShift ? (
              <Button type="button" onClick={startLiveShift} className="gap-2"><Fingerprint className="h-4 w-4" /> Start</Button>
            ) : (
              <Button type="button" variant="cool" onClick={stopLiveShiftAndFillForm} className="gap-2"><Clock className="h-4 w-4" /> Stop</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RecordedShiftModal({ stoppedShiftReview, setStoppedShiftReview, submitRecordedShift, activeJobs = [], jobs = [] }) {
  function applyRecordedJob(jobId) {
    const selectedJob = jobs.find((job) => job.id === jobId);
    setStoppedShiftReview((current) => ({
      ...current,
      jobId,
      jobType: selectedJob?.jobType || current.jobType,
      customerName: selectedJob?.customerName || current.customerName,
    }));
  }
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-3 backdrop-blur-md sm:items-center">
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-[2rem] border border-white/60 bg-slate-50/95 p-5 shadow-2xl shadow-slate-950/25 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95 sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">Recorded shift ready</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">Submit recorded hours</h2>
            <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">Review the time captured by the live clock before sending it for admin approval.</p>
          </div>
          <Button variant="ghost" onClick={() => setStoppedShiftReview(null)}><X className="h-5 w-5" /></Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Date"><input type="date" value={stoppedShiftReview.date} onChange={(e) => setStoppedShiftReview({ ...stoppedShiftReview, date: e.target.value })} className="input" /></Field>
          <Field label="Saved Job"><select value={stoppedShiftReview.jobId || ""} onChange={(e) => applyRecordedJob(e.target.value)} className="input"><option value="">Manual / one-time job</option>{activeJobs.map((job) => <option key={job.id} value={job.id}>{job.customerName}{job.jobNumber ? ` • ${job.jobNumber}` : ""}</option>)}</select></Field>
          <Field label="Job Type"><select value={stoppedShiftReview.jobType} onChange={(e) => setStoppedShiftReview({ ...stoppedShiftReview, jobType: e.target.value })} className="input">{jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></Field>
          <div><Field label="Job / Customer Name"><input value={stoppedShiftReview.customerName} onChange={(e) => setStoppedShiftReview({ ...stoppedShiftReview, customerName: e.target.value })} className="input" placeholder="Example: Smith Residence" /></Field></div>
          <Field label="Start Time"><input type="time" value={stoppedShiftReview.start} onChange={(e) => setStoppedShiftReview({ ...stoppedShiftReview, start: e.target.value })} className="input" /></Field>
          <Field label="End Time"><input type="time" value={stoppedShiftReview.end} onChange={(e) => setStoppedShiftReview({ ...stoppedShiftReview, end: e.target.value })} className="input" /></Field>
          <Field label="Lunch Break"><div className="flex gap-2"><Button type="button" variant={stoppedShiftReview.lunchTaken ? "cool" : "outline"} className="flex-1" onClick={() => setStoppedShiftReview({ ...stoppedShiftReview, lunchTaken: true })}>Yes</Button><Button type="button" variant={!stoppedShiftReview.lunchTaken ? "default" : "outline"} className="flex-1" onClick={() => setStoppedShiftReview({ ...stoppedShiftReview, lunchTaken: false, lunchMinutes: 0 })}>No</Button></div></Field>
          <Field label="Lunch Minutes"><input type="number" min="0" value={stoppedShiftReview.lunchMinutes} disabled={!stoppedShiftReview.lunchTaken} onChange={(e) => setStoppedShiftReview({ ...stoppedShiftReview, lunchMinutes: Number(e.target.value) })} className="input disabled:opacity-40" /></Field>
          <div className="sm:col-span-2"><Field label="Job Notes Required"><textarea required aria-required="true" value={stoppedShiftReview.notes} onChange={(e) => setStoppedShiftReview({ ...stoppedShiftReview, notes: e.target.value })} className="input min-h-32 resize-none" placeholder="Required: explain what you completed on this job today before submitting..." /></Field><p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">Notes are required before this recorded shift can be submitted.</p></div>
          <div className="sm:col-span-2"><Field label="Employee Signature / Confirmation"><div className="relative"><PenLine className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={stoppedShiftReview.employeeSignature} onChange={(e) => setStoppedShiftReview({ ...stoppedShiftReview, employeeSignature: e.target.value })} className="input pl-11" placeholder="Type your name to confirm this recorded shift" /></div></Field></div>
        </div>

        <div className="mt-5 rounded-3xl bg-slate-900 p-4 text-white shadow-xl shadow-slate-950/10 dark:bg-white/10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Recorded Total</p>
          <p className="mt-1 text-3xl font-black tracking-[-0.04em]">{entryHours(stoppedShiftReview).toFixed(2)} hrs</p>
          <p className="mt-1 text-xs font-bold text-slate-300">This will be submitted as pending until an admin approves it.</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => setStoppedShiftReview(null)} className="py-3">Cancel</Button>
          <Button variant="cool" onClick={submitRecordedShift} className="py-3" disabled={!stoppedShiftReview.customerName.trim() || !String(stoppedShiftReview.notes || "").trim()}><Send className="mr-2 h-4 w-4" /> Submit Hours</Button>
        </div>
      </motion.div>
    </div>
  );
}


function DocumentationExportPanel({ currentUser, employees, visibleEntries, selectedEmployeeId, setSelectedEmployeeId, search, setSearch, employeeById, weekStart, setWeekStart, weekDates, weekTwoDates, exportCsv, exportDocumentationReport, exportPayrollPdf, openDayDetail }) {
  const weekOneEntries = visibleEntries.filter((entry) => weekDates.some((date) => formatDate(date) === entry.date));
  const weekTwoEntries = visibleEntries.filter((entry) => weekTwoDates.some((date) => formatDate(date) === entry.date));
  const periodSummary = summarizePayroll(visibleEntries);
  const weekOneSummary = summarizePayroll(weekOneEntries);
  const weekTwoSummary = summarizePayroll(weekTwoEntries);
  const noteCount = visibleEntries.filter((entry) => String(entry.notes || "").trim()).length;
  const documentationCount = visibleEntries.filter((entry) => entry.photoUrl || entry.employeeSignature || String(entry.notes || "").trim()).length;
  const groupedDays = [...weekDates, ...weekTwoDates].map((date) => {
    const dateKey = formatDate(date);
    return { date, dateKey, entries: visibleEntries.filter((entry) => entry.date === dateKey) };
  }).filter((group) => group.entries.length > 0);
  const getName = (employeeId) => employeeId === currentUser?.id ? currentUser?.name : employeeById.get(employeeId)?.name || "Unknown Employee";

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 p-5 text-white sm:p-6">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Job documentation export</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] sm:text-3xl">Clean two-week notes review</h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-300">Full job notes stay expanded, Week 1 and Week 2 stay separated, and payroll totals are ready for admin review or employee records.</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">Phoenix time • {displayShortDate(weekStart)} – {displayShortDate(addDays(weekStart, 13))}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <Button variant="outline" onClick={() => setWeekStart(addDays(weekStart, -14))} className="border-white/15 bg-white/10 text-white hover:bg-white/15"><ChevronLeft className="mr-1 h-4 w-4" /> Prev</Button>
              <Button variant="outline" onClick={() => setWeekStart(getMonday(new Date()))} className="border-white/15 bg-white/10 text-white hover:bg-white/15">Current</Button>
              <Button variant="outline" onClick={() => setWeekStart(addDays(weekStart, 14))} className="border-white/15 bg-white/10 text-white hover:bg-white/15">Next <ChevronRight className="ml-1 h-4 w-4" /></Button>
              <Button variant="cool" onClick={() => exportDocumentationReport(false)}><FileText className="mr-2 h-4 w-4" /> Export Notes</Button>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto_auto]">
            {currentUser.role === "admin" && <select aria-label="Filter documentation by employee" value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} className="input"><option value="all">All employees</option>{employees.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</select>}
            <div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input aria-label="Search job documentation" value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-11" placeholder="Search job, notes, employee..." /></div>
            <Button variant="outline" onClick={() => exportCsv(false)} className="min-h-[48px]"><Download className="mr-2 h-4 w-4" /> CSV</Button>
            {currentUser.role === "admin" && <Button variant="outline" onClick={exportPayrollPdf} className="min-h-[48px]"><FileText className="mr-2 h-4 w-4" /> Payroll PDF</Button>}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-8">
            <MiniStat label="Week 1" value={`${weekOneSummary.totalHours.toFixed(2)}h`} tone="cyan" />
            <MiniStat label="Week 2" value={`${weekTwoSummary.totalHours.toFixed(2)}h`} tone="cyan" />
            <MiniStat label="Period" value={`${periodSummary.totalHours.toFixed(2)}h`} tone="emerald" />
            <MiniStat label="Regular" value={`${periodSummary.regularHours.toFixed(2)}h`} tone="emerald" />
            <MiniStat label="Overtime" value={`${periodSummary.overtimeHours.toFixed(2)}h`} tone="amber" />
            <MiniStat label="Vacation" value={`${periodSummary.vacationHours.toFixed(2)}h`} tone="red" />
            <MiniStat label="Notes" value={noteCount} tone="cyan" />
            <MiniStat label="Docs" value={documentationCount} tone="cyan" />
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <DocumentationWeek title={`Week 1 • ${displayShortDate(weekStart)} – ${displayShortDate(addDays(weekStart, 6))}`} entries={weekOneEntries} getName={getName} openDayDetail={openDayDetail} />
            <DocumentationWeek title={`Week 2 • ${displayShortDate(addDays(weekStart, 7))} – ${displayShortDate(addDays(weekStart, 13))}`} entries={weekTwoEntries} getName={getName} openDayDetail={openDayDetail} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentationWeek({ title, entries, getName, openDayDetail }) {
  return (
    <section className="rounded-[1.65rem] border border-white/70 bg-white/72 p-4 shadow-sm ring-1 ring-white/70 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div><p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">{title}</p><h3 className="text-lg font-black tracking-[-0.03em]">{entries.length} documented entries</h3></div>
      </div>
      <div className="space-y-3">
        {entries.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-6 text-center text-sm font-bold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">No entries found for this week.</div> : entries.map((entry) => (
          <article key={entry.id} className={cx("rounded-3xl border border-slate-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/30", isDeniedEntry(entry) && "opacity-60 grayscale")}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0"><p className="text-sm font-black text-slate-950 dark:text-white">{entry.customerName}</p><p className="mt-0.5 text-xs font-bold text-cyan-700 dark:text-cyan-300">{entry.jobType} · {getName(entry.employeeId)}</p><p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{displayDate(entry.date)} · {entry.start}–{entry.end} · {entryHours(entry).toFixed(2)} hrs</p></div>
              <StatusPill status={entry.approvalStatus} />
            </div>
            <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Full Job Notes</p>
              <p className="whitespace-pre-wrap break-words text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">{entry.notes || "No notes submitted."}</p>
            </div>
            {(entry.photoUrl || entry.employeeSignature || entry.denialReason) && <div className="mt-3 grid gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">{entry.photoUrl && <a className="rounded-2xl bg-cyan-50 px-3 py-2 text-cyan-700 underline dark:bg-cyan-400/10 dark:text-cyan-300" href={entry.photoUrl} target="_blank" rel="noreferrer">Open photo/job documentation</a>}{entry.employeeSignature && <p className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-white/5">Signed: {entry.employeeSignature}</p>}{entry.denialReason && <p className="rounded-2xl bg-red-50 px-3 py-2 text-red-700 dark:bg-red-500/10 dark:text-red-100">Denied reason: {entry.denialReason}</p>}</div>}
            <Button size="sm" variant="ghost" onClick={() => openDayDetail(entry.date, entries.filter((item) => item.date === entry.date))} className="mt-3 w-full">Open day details</Button>
          </article>
        ))}
      </div>
    </section>
  );
}

function DayDetailModal({ dayDetail, setDayDetail, currentUser, employeeById, updateStatus, openEditModal, setReviewModal, openQuickAddForDate }) {
  const dayEntries = dayDetail.entries || [];
  const activeEntries = dayEntries.filter((entry) => !isDeniedEntry(entry));
  const deniedEntries = dayEntries.filter((entry) => isDeniedEntry(entry));
  const totalHours = activeEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
  const approvedHours = activeEntries.filter((entry) => String(entry.approvalStatus).toLowerCase() === "approved").reduce((sum, entry) => sum + entryHours(entry), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-sm sm:items-center">
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.965 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={smoothSpring}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/70 bg-slate-50/95 p-4 shadow-2xl shadow-slate-950/25 ring-1 ring-white/80 backdrop-blur-2xl sm:p-5 dark:border-white/10 dark:bg-slate-900/95 dark:ring-white/10"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">Day detail</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">{displayDate(dayDetail.date)}</h2>
            <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">Full job and hours breakdown for this date.</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="cool" onClick={() => openQuickAddForDate(dayDetail.date)}><Plus className="h-4 w-4" /> Quick Add</Button>
            <Button variant="ghost" onClick={() => setDayDetail(null)}><X className="h-5 w-5" /></Button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <MiniStat label="Active" value={`${totalHours.toFixed(2)}h`} tone="cyan" />
          <MiniStat label="Approved" value={`${approvedHours.toFixed(2)}h`} tone="emerald" />
          <MiniStat label="Denied" value={`${deniedEntries.length}`} tone="red" />
        </div>

        <div className="space-y-3">
          {dayEntries.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-sm font-bold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              No job entries were logged for this day.
            </div>
          ) : dayEntries.map((entry) => {
            const employee = entry.employeeId === currentUser?.id ? currentUser : employeeById.get(entry.employeeId);
            return (
              <div key={entry.id} className={cx("rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5", isDeniedEntry(entry) && "bg-slate-100/65 opacity-60 grayscale dark:bg-white/[0.035]")}> 
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="clean-wrap text-base font-black leading-snug tracking-[-0.02em] text-slate-950 dark:text-white">{entry.customerName}</p>
                    <p className="text-xs font-black uppercase tracking-[0.1em] text-cyan-700 dark:text-cyan-300">{entry.jobType}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{entry.start}–{entry.end} · {entryHours(entry).toFixed(2)} hrs</p>
                  </div>
                  <StatusPill status={entry.approvalStatus} />
                </div>

                <EntryDetails entry={entry} employee={employee} />

                {(entry.photoUrl || entry.employeeSignature) && (
                  <div className="mt-3 grid gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    {entry.photoUrl && <a className="text-cyan-700 underline dark:text-cyan-300" href={entry.photoUrl} target="_blank" rel="noreferrer">View photo/job documentation</a>}
                    {entry.employeeSignature && <p className="flex items-center gap-2"><PenLine className="h-3.5 w-3.5" /> Signed: {entry.employeeSignature}</p>}
                  </div>
                )}

                {currentUser?.role === "admin" && (
                  <div className="mt-3 grid grid-cols-1 gap-2 rounded-2xl sm:grid-cols-3 border border-slate-100 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                    <Button size="sm" variant="success" onClick={() => updateStatus(entry.id, "approved")}>Approve</Button>
                    <Button size="sm" variant="danger" onClick={() => setReviewModal(entry)}>Deny</Button>
                    <Button size="sm" variant="outline" onClick={() => openEditModal(entry)}><Edit3 className="mr-1 h-3.5 w-3.5" /> Edit</Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function AvatarBadge({ person, size = "md" }) {
  const dims = size === "lg" ? "h-20 w-20 text-2xl" : "h-10 w-10 text-sm";
  const initials = `${person?.firstName || ""} ${person?.lastName || ""}`.trim().split(" " ).map((part) => part[0]).join("").slice(0, 2) || String(person?.name || "V").slice(0, 1);
  return person?.avatarUrl ? (
    <img src={person.avatarUrl} alt={person.name || "Profile"} className={cx(dims, "rounded-2xl object-cover shadow-sm ring-1 ring-white/70 dark:ring-white/10")} />
  ) : (
    <div className={cx(dims, "flex items-center justify-center rounded-2xl bg-cyan-50 font-black text-cyan-700 shadow-sm ring-1 ring-white/70 dark:bg-cyan-400/10 dark:text-cyan-200 dark:ring-white/10")}>{initials}</div>
  );
}

function PortalMessages({ messages, employees, currentUser, messageForm, setMessageForm, sendAdminMessage }) {
  const recentMessages = messages.slice(0, 5);
  return (
    <Card className="mb-4">
      <CardContent>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">Portal Updates</p>
            <h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">Message Center</h2>
          </div>
          <MessageSquare className="h-6 w-6 text-cyan-700 dark:text-cyan-300" />
        </div>

        {currentUser.role === "admin" && (
          <div className="mb-4 rounded-3xl border border-white/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-3 sm:grid-cols-[0.8fr_1fr]">
              <Field label="Send To">
                <select value={messageForm.recipientId} onChange={(e) => setMessageForm({ ...messageForm, recipientId: e.target.value })} className="input">
                  <option value="all">All employees</option>
                  {employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
                </select>
              </Field>
              <Field label="Update Title">
                <input value={messageForm.title} onChange={(e) => setMessageForm({ ...messageForm, title: e.target.value })} className="input" placeholder="Example: Schedule update" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message">
                  <textarea value={messageForm.body} onChange={(e) => setMessageForm({ ...messageForm, body: e.target.value })} className="input min-h-24 resize-none" placeholder="Write an update employees will see on their portal home page." />
                </Field>
              </div>
            </div>
            <div className="mt-3 flex justify-end"><Button type="button" variant="cool" onClick={sendAdminMessage} className="gap-2"><Send className="h-4 w-4" /> Post Update</Button></div>
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          {recentMessages.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-4 text-sm font-bold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">No portal updates yet.</div>
          ) : recentMessages.map((message) => {
            const recipient = message.recipientId === "all" ? null : employees.find((employee) => employee.id === message.recipientId);
            return (
              <div key={message.id} className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-black">{message.title}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{message.body}</p>
                <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">{message.recipientId === "all" ? "All employees" : recipient?.name || "Employee"} · {message.createdAt ? new Intl.DateTimeFormat("en-US", { timeZone: APP_TIME_ZONE }).format(new Date(message.createdAt)) : "New"}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SettingsModal({ currentUser, profileForm, setProfileForm, setSettingsOpen, saveProfile, uploadProfilePicture }) {
  const previewUser = { ...currentUser, firstName: profileForm.firstName, lastName: profileForm.lastName, avatarUrl: profileForm.avatarUrl, name: `${profileForm.firstName} ${profileForm.lastName}`.trim() || currentUser.name };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-sm sm:items-center">
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/70 bg-slate-50/95 p-5 shadow-2xl shadow-slate-950/20 ring-1 ring-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95 dark:ring-white/10">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">Login profile</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">Settings</h2>
            <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">Update your profile info for the VODA portal.</p>
          </div>
          <Button variant="ghost" onClick={() => setSettingsOpen(false)}><X className="h-5 w-5" /></Button>
        </div>

        <div className="mb-5 flex items-center gap-4 rounded-3xl border border-white/70 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
          <AvatarBadge person={previewUser} size="lg" />
          <div>
            <p className="text-lg font-black">{previewUser.name}</p>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{currentUser.email}</p>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">{currentUser.role}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="First Name"><input value={profileForm.firstName} onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })} className="input" placeholder="First name" /></Field>
          <Field label="Last Name"><input value={profileForm.lastName} onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })} className="input" placeholder="Last name" /></Field>
          <Field label="Phone Number"><input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="input" placeholder="(520) 000-0000" /></Field>
          <Field label="Profile Picture URL"><input value={profileForm.avatarUrl} onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })} className="input" placeholder="Paste image URL or upload below" /></Field>
          <div className="sm:col-span-2">
            <Field label="Upload Profile Picture">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-4 py-4 text-sm font-black text-slate-600 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
                <Upload className="h-4 w-4" /> Choose Image
                <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadProfilePicture(e.target.files?.[0])} />
              </label>
            </Field>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => setSettingsOpen(false)} className="flex-1 py-3">Cancel</Button>
          <Button variant="cool" onClick={saveProfile} className="flex-1 py-3">Save Profile</Button>
        </div>
      </motion.div>
    </div>
  );
}

function MiniStat({ label, value, tone }) {
  const tones = {
    emerald: "text-emerald-700 dark:text-emerald-200",
    amber: "text-amber-700 dark:text-amber-200",
    red: "text-red-700 dark:text-red-200",
  };
  return <div className="min-w-0 rounded-3xl bg-white/75 p-3 shadow-sm ring-1 ring-white/80 sm:p-4 dark:bg-white/5 dark:ring-white/10"><p className="break-words text-[10px] font-black uppercase leading-tight tracking-[0.12em] text-slate-400 sm:text-xs">{label}</p><p className={cx("mt-1 break-words text-xl font-black leading-tight sm:text-2xl", tones[tone])}>{value}</p></div>;
}

function ReviewModal({ reviewModal, setReviewModal, updateStatus, setAppError }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-sm sm:items-center">
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-slate-50/92 p-5 shadow-2xl shadow-slate-950/20 ring-1 ring-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/92 dark:ring-white/10">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-red-600 dark:text-red-300">Private admin review</p><h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">Deny hours?</h2><p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">This reason will only be visible to admins and the employee who submitted the entry.</p>
        <div className="mt-4 rounded-3xl bg-white/80 p-4 text-sm shadow-sm dark:bg-white/5"><p className="font-black">{reviewModal.entry.customerName}</p><p className="text-slate-500 dark:text-slate-400">{displayDate(reviewModal.entry.date)} · {entryHours(reviewModal.entry).toFixed(2)} hrs</p></div>
        <textarea value={reviewModal.reason} onChange={(e) => setReviewModal((current) => ({ ...current, reason: e.target.value }))} className="input mt-4 min-h-32 resize-none" placeholder="Example: Clocked out after leaving the jobsite / wrong job selected / hours do not match schedule." />
        <div className="mt-4 flex flex-col gap-2 sm:flex-row"><Button type="button" variant="outline" onClick={() => setReviewModal(null)} className="flex-1 py-3">Cancel</Button><Button type="button" variant="danger" className="flex-1 py-3" onClick={() => { const reason = (reviewModal.reason || "").trim(); if (!reason) return setAppError("Please enter a denial reason before denying hours."); updateStatus(reviewModal.entry.id, "denied", reason); }}>Deny Entry</Button></div>
      </motion.div>
    </div>
  );
}

function EditHoursModal({ editModal, setEditModal, saveEditedHours }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-sm sm:items-center">
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/70 bg-slate-50/92 p-5 shadow-2xl shadow-slate-950/20 ring-1 ring-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/92 dark:ring-white/10">
        <div className="mb-4 flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">Admin hour correction</p><h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">Edit employee hours</h2><p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{editModal.employeeName}</p></div><Button variant="ghost" onClick={() => setEditModal(null)}><X className="h-5 w-5" /></Button></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Date"><input type="date" value={editModal.date} onChange={(e) => setEditModal({ ...editModal, date: e.target.value })} className="input" /></Field>
          <Field label="Job Type"><select value={editModal.jobType} onChange={(e) => setEditModal({ ...editModal, jobType: e.target.value })} className="input">{jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></Field>
          <Field label="Job / Customer Name"><input value={editModal.customerName} onChange={(e) => setEditModal({ ...editModal, customerName: e.target.value })} className="input" /></Field>
          <Field label="Start Time"><input type="time" value={editModal.start} onChange={(e) => setEditModal({ ...editModal, start: e.target.value })} className="input" /></Field>
          <Field label="End Time"><input type="time" value={editModal.end} onChange={(e) => setEditModal({ ...editModal, end: e.target.value })} className="input" /></Field>
          <Field label="Lunch Break"><div className="flex gap-2"><Button type="button" variant={editModal.lunchTaken ? "cool" : "outline"} className="flex-1" onClick={() => setEditModal({ ...editModal, lunchTaken: true })}>Yes</Button><Button type="button" variant={!editModal.lunchTaken ? "default" : "outline"} className="flex-1" onClick={() => setEditModal({ ...editModal, lunchTaken: false, lunchMinutes: 0 })}>No</Button></div></Field>
          <Field label="Lunch Minutes"><input type="number" min="0" value={editModal.lunchMinutes} disabled={!editModal.lunchTaken} onChange={(e) => setEditModal({ ...editModal, lunchMinutes: Number(e.target.value) })} className="input disabled:opacity-40" /></Field>
          <div className="sm:col-span-2"><Field label="Admin Notes / Correction Reason"><textarea value={editModal.notes} onChange={(e) => setEditModal({ ...editModal, notes: e.target.value })} className="input min-h-28 resize-none" /></Field></div>
        </div>
        <div className="mt-4 rounded-3xl bg-slate-900 p-4 text-white dark:bg-white/10"><p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Corrected Total</p><p className="text-2xl font-black">{entryHours(editModal).toFixed(2)} hrs</p><p className="mt-1 text-xs font-bold text-slate-300">Saving edits returns this entry to pending so it can be reviewed again.</p></div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row"><Button variant="outline" onClick={() => setEditModal(null)} className="flex-1 py-3">Cancel</Button><Button variant="cool" onClick={saveEditedHours} className="flex-1 py-3"><Edit3 className="mr-2 h-4 w-4" /> Save Changes</Button></div>
      </motion.div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="ios-glass min-h-[112px] rounded-[1.6rem] border border-white/60 bg-white/55 p-4 shadow-xl shadow-slate-950/8 ring-1 ring-white/45 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
      <div className="h-10 w-10 animate-pulse rounded-2xl bg-slate-200/80 dark:bg-white/10" />
      <div className="mt-4 h-3 w-24 animate-pulse rounded-full bg-slate-200/80 dark:bg-white/10" />
      <div className="mt-2 h-6 w-20 animate-pulse rounded-full bg-slate-300/80 dark:bg-white/15" />
    </div>
  );
}

const inputStyles = `
  .input {
    width: 100%;
    border-radius: 1rem;
    border: 1px solid rgb(203 213 225 / .92);
    background: rgba(255,255,255,.88);
    padding: .78rem .9rem;
    font-size: .875rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    outline: none;
    box-shadow: 0 1px 2px rgba(15,23,42,.03);
    color: rgb(15 23 42);
  }
  .input.pl-10,
  .input.pl-11,
  .input.pl-12,
  .input.icon-input {
    padding-left: 3rem;
  }
  .input.pr-10,
  .input.pr-11,
  .input.pr-12 {
    padding-right: 3rem;
  }
  .input:focus {
    border-color: rgb(8 145 178);
    box-shadow: 0 0 0 4px rgba(8,145,178,.10);
  }
  .dark .input {
    border-color: rgba(255,255,255,.10);
    background: rgba(255,255,255,.07);
    color: white;
  }
  .dark .input::placeholder { color: rgb(148 163 184); }
  .input option { color: rgb(15 23 42); }

  html, body, #root {
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
  }
  body {
    margin: 0;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
  * { box-sizing: border-box; }

/* Global viewport + professional responsive polish */
html, body, #root {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
body {
  margin: 0;
  overscroll-behavior: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*, *::before, *::after { box-sizing: border-box; }
img, svg, video, canvas { max-width: 100%; height: auto; }
button, input, textarea, select { max-width: 100%; font: inherit; }
button svg, .button-icon { flex: 0 0 auto; }
.min-w-0 { min-width: 0; }
.input {
  width: 100%;
  min-width: 0;
  font-size: 16px;
  line-height: 1.35;
}
.ios-glass { transform: translateZ(0); }
.ios-glass:hover { box-shadow: 0 22px 56px rgba(15, 23, 42, .12); }
.clean-wrap,
.entry-text,
.job-text {
  min-width: 0;
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: none;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
h1, h2, h3 {
  letter-spacing: -0.035em;
  line-height: 1.05;
}
p { line-height: 1.45; }
@supports (text-wrap: balance) {
  h1, h2, h3 { text-wrap: balance; }
}
@supports (text-wrap: pretty) {
  p, label { text-wrap: pretty; }
}
@supports (-webkit-touch-callout: none) {
  .ios-glass { -webkit-backdrop-filter: blur(22px); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}
@media (max-width: 768px) {
  .mobile-padding {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
  .grid { min-width: 0; }
  h1 { font-size: clamp(1.8rem, 8vw, 2.45rem); }
  h2 { font-size: clamp(1.35rem, 5.6vw, 1.8rem); }
  button { line-height: 1.2; }
}
`;
