import { supabase } from "./supabase";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  MapPin,
  MessageSquare,
  Moon,
  PenLine,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Smartphone,
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
const softMotion = {
  initial: { opacity: 0, y: 14, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: spring,
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getMonday(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
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
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(value);
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}${ordinalSuffix(day)}, ${year}`;
}

function displayShortDate(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(value);
  const month = date.toLocaleDateString(undefined, { month: "short" });
  return `${month} ${date.getDate()}${ordinalSuffix(date.getDate())}`;
}


function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getMonthStart(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function monthLabel(date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
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

const deniedEntryShell = "border-slate-200 bg-slate-200/55 opacity-35 grayscale shadow-none ring-slate-200/60 hover:opacity-45 dark:border-white/10 dark:bg-white/5 dark:ring-white/10";
const deniedText = "text-slate-400 line-through decoration-slate-400/50 dark:text-slate-500";

function normalizeEntry(entry) {
  const approvalStatus = entry.approval_status || entry.status || "pending";
  return {
    id: entry.id,
    employeeId: entry.employee_id,
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
        "inline-flex items-center justify-center rounded-2xl font-bold tracking-[-0.01em] transition duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
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

function Card({ children, className = "" }) {
  return <div className={cx("rounded-[1.6rem] border border-white/55 bg-slate-100/64 shadow-xl shadow-slate-950/8 backdrop-blur-2xl ring-1 ring-white/45 dark:border-white/10 dark:bg-slate-900/62 dark:shadow-black/20 dark:ring-white/10", className)}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={cx("p-4 sm:p-5", className)}>{children}</div>;
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

  return <span className={cx("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-black capitalize", styles[normalized] || styles.pending)}>{normalized}</span>;
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

function EntryDetails({ entry, employee }) {
  return (
    <div className="grid gap-2 rounded-2xl bg-slate-50/80 p-3 text-xs font-semibold text-slate-600 sm:grid-cols-2 dark:bg-white/5 dark:text-slate-300">
      <p className="flex items-center gap-2"><UserRound className="h-3.5 w-3.5" /> {employee?.name || "Employee"}</p>
      <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {entryHours(entry).toFixed(2)} total hrs</p>
      <p className="sm:col-span-2">Lunch: {entry.lunchTaken ? `${entry.lunchMinutes} min` : "No lunch break"}</p>
      {entry.notes && <p className="sm:col-span-2">Notes: {entry.notes}</p>}
      {entry.approvalStatus === "denied" && entry.denialReason && (
        <p className="sm:col-span-2 rounded-2xl border border-red-300 bg-red-100 p-3 font-black text-red-800 shadow-sm dark:border-red-300/20 dark:bg-red-500/20 dark:text-red-100">
          Denial reason: {entry.denialReason}
        </p>
      )}
    </div>
  );
}

export default function RestorationHoursTracker() {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [appLoading, setAppLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [signupMessage, setSignupMessage] = useState("");
  const [signupForm, setSignupForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
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
  const loginTip = useMemo(() => loginTips[Math.floor(Math.random() * loginTips.length)], []);

  const [employees, setEmployees] = useState([]);
  const [entries, setEntries] = useState([]);
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  const [historyMonth, setHistoryMonth] = useState(getMonthStart(new Date()));
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
  const [search, setSearch] = useState("");
  const [reviewModal, setReviewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [dayDetail, setDayDetail] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageForm, setMessageForm] = useState({ recipientId: "all", title: "", body: "" });
  const [profileForm, setProfileForm] = useState({ firstName: "", lastName: "", phone: "", avatarUrl: "" });
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteNote, setInviteNote] = useState("");
  const [form, setForm] = useState({
    date: formatDate(new Date()),
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
  const pendingProfiles = useMemo(() => employees.filter((employee) => employee.approvalStatus === "pending"), [employees]);
  const weekDates = useMemo(() => weekdays.map((_, index) => addDays(weekStart, index)), [weekStart]);
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
    const role = data.role || "employee";
    const approvalStatus = data.approval_status || (role === "admin" ? "approved" : "pending");

    if (role !== "admin" && approvalStatus !== "approved") {
      setCurrentUser(null);
      setLoginError(
        approvalStatus === "denied"
          ? "Your employee account request was denied. Please contact an admin."
          : "Your employee account is pending admin approval. You will be able to access the portal once an admin approves it."
      );
      await supabase.auth.signOut();
      return;
    }

    const displayName = data.full_name || `${firstName} ${lastName}`.trim() || user.email;
    setLoginError("");
    setCurrentUser({
      id: data.id,
      name: displayName,
      firstName,
      lastName,
      phone: data.phone || "",
      avatarUrl: data.avatar_url || "",
      email: data.email || user.email || "",
      role,
      approvalStatus,
    });
    setProfileForm({ firstName, lastName, phone: data.phone || "", avatarUrl: data.avatar_url || "" });
  }

  async function loadAppData() {
    setAppLoading(true);
    setAppError("");

    const isAdmin = currentUser?.role === "admin";
    const profilesQuery = isAdmin
      ? supabase.from("profiles").select("id, full_name, first_name, last_name, email, phone, avatar_url, role, approval_status, approved_by, approved_at").order("full_name", { ascending: true })
      : Promise.resolve({ data: [{ id: currentUser.id, full_name: currentUser.name, first_name: currentUser.firstName, last_name: currentUser.lastName, phone: currentUser.phone, avatar_url: currentUser.avatarUrl, role: currentUser.role, email: currentUser.email, approval_status: currentUser.approvalStatus || "approved" }], error: null });
    const entriesQuery = isAdmin
      ? supabase.from("time_entries").select("*").order("work_date", { ascending: false })
      : supabase.from("time_entries").select("*").eq("employee_id", currentUser.id).order("work_date", { ascending: false });
    const messagesQuery = isAdmin
      ? supabase.from("portal_messages").select("*").order("created_at", { ascending: false }).limit(25)
      : supabase.from("portal_messages").select("*").or(`recipient_id.eq.${currentUser.id},recipient_id.is.null`).order("created_at", { ascending: false }).limit(12);

    const [profilesResponse, entriesResponse, messagesResponse] = await Promise.all([profilesQuery, entriesQuery, messagesQuery]);

    if (profilesResponse.error) setAppError(profilesResponse.error.message);
    if (entriesResponse.error) setAppError(entriesResponse.error.message);
    if (messagesResponse.error && !String(messagesResponse.error.message || "").includes("portal_messages")) setAppError(messagesResponse.error.message);

    setEmployees((profilesResponse.data || []).map((profile) => ({
      id: profile.id,
      name: profile.full_name || `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "Unnamed Employee",
      firstName: profile.first_name || "",
      lastName: profile.last_name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      avatarUrl: profile.avatar_url || "",
      role: profile.role || "employee",
      approvalStatus: profile.approval_status || (profile.role === "admin" ? "approved" : "pending"),
      approvedBy: profile.approved_by || null,
      approvedAt: profile.approved_at || null,
    })));
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

  async function handleSignup(e) {
    e.preventDefault();
    setLoginError("");
    setSignupMessage("");

    const firstName = signupForm.firstName.trim();
    const lastName = signupForm.lastName.trim();
    const email = signupForm.email.trim().toLowerCase();
    const phone = signupForm.phone.trim();
    const password = signupForm.password;

    if (!firstName || !lastName || !email || !password) {
      setLoginError("Please fill out first name, last name, email, and password.");
      return;
    }
    if (password.length < 6) {
      setLoginError("Password must be at least 6 characters.");
      return;
    }
    if (password !== signupForm.confirmPassword) {
      setLoginError("Passwords do not match.");
      return;
    }

    setAuthLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          phone,
          role: "employee",
          approval_status: "pending",
        },
      },
    });

    if (error) {
      setLoginError(error.message);
      setAuthLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        email,
        phone: phone || null,
        role: "employee",
        approval_status: "pending",
      });
    }

    await supabase.auth.signOut();
    setSession(null);
    setCurrentUser(null);
    setSignupForm({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
    setSignupMessage("Your employee account request was submitted. An admin must approve it before you can access the portal.");
    setAuthMode("login");
    setAuthLoading(false);
  }

  async function approvePendingEmployee(employeeId) {
    if (currentUser?.role !== "admin") return;
    setAppError("");
    const { error } = await supabase
      .from("profiles")
      .update({ approval_status: "approved", approved_by: currentUser.id, approved_at: new Date().toISOString() })
      .eq("id", employeeId);
    if (error) return setAppError(error.message);
    const employee = employees.find((person) => person.id === employeeId);
    if (employee) {
      await createPortalMessage({ recipientId: employeeId, title: "Account approved", body: "Your VODA employee portal account has been approved. You can now access the portal." });
    }
    await loadAppData();
  }

  async function denyPendingEmployee(employeeId) {
    if (currentUser?.role !== "admin") return;
    const reason = window.prompt("Reason for denying this employee request? This is optional.") || "";
    setAppError("");
    const { error } = await supabase
      .from("profiles")
      .update({ approval_status: "denied", approved_by: currentUser.id, approved_at: new Date().toISOString(), denial_reason: reason || null })
      .eq("id", employeeId);
    if (error) return setAppError(error.message);
    await loadAppData();
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
      const inWeek = weekDates.some((date) => formatDate(date) === entry.date);
      const correctUser = currentUser.role === "admin" ? selectedEmployeeId === "all" || entry.employeeId === selectedEmployeeId : entry.employeeId === currentUser.id;
      const matchesSearch = !searchValue || `${entry.jobType} ${entry.customerName} ${entry.notes}`.toLowerCase().includes(searchValue);
      return inWeek && correctUser && matchesSearch;
    });
  }, [entries, weekDates, currentUser, selectedEmployeeId, search]);

  const weeklyTotal = visibleEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
  const pendingCount = visibleEntries.filter((entry) => !["approved", "denied"].includes(String(entry.approvalStatus).toLowerCase())).length;
  const approvedPayrollTotal = visibleEntries.filter((entry) => String(entry.approvalStatus).toLowerCase() === "approved").reduce((sum, entry) => sum + entryHours(entry), 0);
  const deniedHoursTotal = visibleEntries.filter((entry) => String(entry.approvalStatus).toLowerCase() === "denied").reduce((sum, entry) => sum + entryHours(entry), 0);

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
      const entryDate = new Date(`${entry.date}T00:00:00`);
      const sameMonth = entryDate.getFullYear() === historyMonth.getFullYear() && entryDate.getMonth() === historyMonth.getMonth();
      const correctEmployee = selectedEmployeeId === "all" || entry.employeeId === selectedEmployeeId;
      return sameMonth && correctEmployee;
    });
  }, [currentUser, entries, historyMonth, selectedEmployeeId]);

  const historyTotal = historyEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
  const historyApprovedTotal = historyEntries.filter((entry) => entry.approvalStatus === "approved").reduce((sum, entry) => sum + entryHours(entry), 0);
  const selectedHistoryEmployeeName = selectedEmployeeId === "all" ? "All employees" : employeeById.get(selectedEmployeeId)?.name || "Selected employee";

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
      jobType: form.jobType,
      customerName: form.customerName || "",
    });
    setForm((current) => ({ ...current, date: formatDate(startedAt), start: startedAt.toTimeString().slice(0, 5) }));
  }

  function stopLiveShiftAndFillForm() {
    if (!liveShift) return;
    const endedAt = new Date();
    const startedAt = new Date(liveShift.startedAt);
    setForm((current) => ({
      ...current,
      date: formatDate(startedAt),
      start: startedAt.toTimeString().slice(0, 5),
      end: endedAt.toTimeString().slice(0, 5),
      jobType: liveShift.jobType || current.jobType,
      customerName: liveShift.customerName || current.customerName,
    }));
    setLiveShift(null);
  }

  function liveShiftElapsed() {
    if (!liveShift?.startedAt) return "0:00";
    const diff = Math.max(0, Math.floor((now.getTime() - new Date(liveShift.startedAt).getTime()) / 1000));
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours}:${String(minutes).padStart(2, "0")}`;
  }

  async function uploadJobPhoto(file) {
    if (!file || !currentUser) return;
    setAppError("");
    const extension = file.name.split(".").pop() || "jpg";
    const filePath = `${currentUser.id}/job-photo-${Date.now()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("job-photos").upload(filePath, file, { upsert: true });
    if (uploadError) return setAppError(uploadError.message);
    const { data } = supabase.storage.from("job-photos").getPublicUrl(filePath);
    setForm((current) => ({ ...current, photoUrl: data.publicUrl }));
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
    const approved = visibleEntries.filter((entry) => String(entry.approvalStatus).toLowerCase() === "approved");
    const rows = approved.map((entry) => {
      const employee = employeeById.get(entry.employeeId)?.name || currentUser?.name || "Employee";
      return `<tr><td>${employee}</td><td>${displayDate(entry.date)}</td><td>${entry.customerName}</td><td>${entry.start}–${entry.end}</td><td>${entryHours(entry).toFixed(2)}</td></tr>`;
    }).join("");
    const html = `<!doctype html><html><head><title>VODA Payroll ${displayDate(weekStart)}</title><style>body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;padding:32px;color:#0f172a}h1{letter-spacing:-.04em}table{width:100%;border-collapse:collapse;margin-top:24px}th,td{text-align:left;border-bottom:1px solid #e2e8f0;padding:12px;font-size:13px}.pill{display:inline-block;background:#ecfeff;color:#0e7490;border-radius:999px;padding:6px 12px;font-weight:800}</style></head><body><p class="pill">VODA Of Tucson</p><h1>Approved Payroll Report</h1><p>Week of ${displayDate(weekStart)} · Total approved hours: ${approved.reduce((sum, entry) => sum + entryHours(entry), 0).toFixed(2)}</p><table><thead><tr><th>Employee</th><th>Date</th><th>Job</th><th>Time</th><th>Hours</th></tr></thead><tbody>${rows || '<tr><td colspan="5">No approved entries for this week.</td></tr>'}</tbody></table></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `voda-approved-payroll-${formatDate(weekStart)}.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function addEntry() {
    if (!currentUser || !form.customerName.trim()) {
      setAppError("Please enter a job name or customer name before adding hours.");
      return;
    }
    setAppError("");
    const payload = {
      employee_id: currentUser.id,
      job_type: form.jobType,
      customer_name: form.customerName.trim(),
      work_date: form.date,
      start_time: form.start,
      end_time: form.end,
      lunch_taken: form.lunchTaken,
      lunch_minutes: form.lunchTaken ? Number(form.lunchMinutes || 0) : 0,
      notes: form.notes,
      photo_url: form.photoUrl || null,
      employee_signature: form.employeeSignature || null,
      gps_lat: form.gpsLat || null,
      gps_lng: form.gpsLng || null,
      status: "pending",
      approval_status: "pending",
    };

    if (!navigator.onLine) {
      setOfflineQueue((current) => [...current, payload]);
      setForm({ ...form, customerName: "", notes: "", photoUrl: "", employeeSignature: "", gpsLat: "", gpsLng: "" });
      setAppError("You are offline, so this entry was saved locally and will sync when the connection returns.");
      return;
    }

    const { error } = await supabase.from("time_entries").insert(payload);
    if (error) return setAppError(error.message);
    notifyUser("Hours submitted", `${form.customerName.trim()} was added to your timesheet.`);
    setForm({ ...form, customerName: "", notes: "", photoUrl: "", employeeSignature: "", gpsLat: "", gpsLng: "" });
    await loadAppData();
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
    setReviewModal(null);
    await loadAppData();
  }

  function openEditModal(entry) {
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
    setEditModal(null);
    await loadAppData();
  }

  function openDayDetail(dateValue, dayEntries = []) {
    const dateKey = dateValue instanceof Date ? formatDate(dateValue) : String(dateValue);
    setDayDetail({
      date: dateKey,
      entries: [...dayEntries].sort((a, b) => `${a.start || ""}`.localeCompare(`${b.start || ""}`)),
    });
  }

  function exportCsv(onlyApproved = false) {
    const source = onlyApproved ? visibleEntries.filter((entry) => entry.approvalStatus === "approved") : visibleEntries;
    const rows = [
      ["Employee", "Date", "Job", "Start", "End", "Lunch Taken", "Lunch Minutes", "Hours", "Approval Status", "Denial Reason", "Notes"],
      ...source.map((entry) => {
        const employeeName = entry.employeeId === currentUser?.id ? currentUser?.name : employeeById.get(entry.employeeId)?.name;
        return [
          employeeName || "Unknown",
          entry.date,
          entry.job,
          entry.start,
          entry.end,
          entry.lunchTaken ? "Yes" : "No",
          entry.lunchMinutes,
          entryHours(entry).toFixed(2),
          entry.approvalStatus,
          (entry.denialReason || "").replaceAll(",", " "),
          (entry.notes || "").replaceAll(",", " "),
        ];
      }),
    ];
    const blob = new Blob([rows.map((row) => row.join(",")).join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${onlyApproved ? "approved-payroll" : "restoration-hours"}-${formatDate(weekStart)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function createInviteDraft() {
    if (!inviteEmail.trim()) return setInviteNote("Enter an employee email first.");
    setInviteNote(`Invite prepared for ${inviteEmail.trim()}. Create this user in Supabase Auth, then add their profile row with role employee.`);
    setInviteEmail("");
  }

  if (authLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">Loading account...</div>;
  }

  if (!session || !currentUser) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-[radial-gradient(circle_at_top_left,#d8eef4,transparent_30%),radial-gradient(circle_at_bottom_right,#d9e2ea,transparent_34%),linear-gradient(135deg,#f4f6f7,#e9eef1_48%,#f7f8f8)] px-3 py-5 font-[Inter,ui-sans-serif,system-ui]">
        <div className="pointer-events-none absolute -left-28 top-20 h-64 w-64 rounded-full bg-cyan-300/18 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-slate-500/12 blur-3xl" />
        <motion.form {...softMotion} onSubmit={authMode === "signup" ? handleSignup : handleLogin} className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/55 bg-slate-100/70 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl ring-1 ring-white/60 sm:p-7">
          <div className="mb-7 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-[2rem] bg-slate-50/70 p-4 shadow-2xl shadow-slate-950/10 ring-1 ring-white/80 backdrop-blur-xl">
              <img src={iconLogo} alt="Voda icon" className="h-full w-full object-contain" />
            </motion.div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-600">Voda Of Tucson Portal</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Secure employee timesheets</p>
          </div>
          <h1 className="text-center text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">{authMode === "signup" ? "Request access." : "Welcome back."}</h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-6 text-slate-500">
            {authMode === "signup" ? "Create an employee request. An admin will approve your profile before you can use the portal." : "Track job hours, lunch breaks, and weekly payroll records in one calm mobile dashboard."}
          </p>
          <div className="mt-5 space-y-3">
            {authMode === "signup" ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="First name" value={signupForm.firstName} onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })} className="input" required />
                  <input type="text" placeholder="Last name" value={signupForm.lastName} onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })} className="input" required />
                </div>
                <input type="email" placeholder="Email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} className="input" required />
                <input type="tel" placeholder="Phone number" value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} className="input" />
                <input type="password" placeholder="Password" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} className="input" required />
                <input type="password" placeholder="Confirm password" value={signupForm.confirmPassword} onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })} className="input" required />
              </>
            ) : (
              <>
                <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="input" required />
                <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="input" required />
              </>
            )}
            {loginError && <p className="rounded-xl border border-red-300 bg-red-100 p-3 text-sm font-black text-red-800 shadow-sm dark:border-red-300/20 dark:bg-red-500/20 dark:text-red-100">{loginError}</p>}
            {signupMessage && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-black text-emerald-800 shadow-sm">{signupMessage}</p>}
            <Button className="w-full py-4" disabled={authLoading}>{authMode === "signup" ? "Submit Access Request" : "Login"}</Button>
            <button type="button" onClick={() => { setAuthMode(authMode === "signup" ? "login" : "signup"); setLoginError(""); setSignupMessage(""); }} className="w-full rounded-2xl py-2 text-sm font-black text-cyan-700 transition hover:bg-cyan-50">
              {authMode === "signup" ? "Already approved? Back to login" : "New employee? Request access"}
            </button>
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
    <div className={cx("relative min-h-screen overflow-hidden font-[Inter,ui-sans-serif,system-ui] text-slate-950 transition duration-500 dark:text-white", darkMode && "dark", darkMode ? "bg-[radial-gradient(circle_at_top_left,#263846,transparent_28%),radial-gradient(circle_at_bottom_right,#17202b,transparent_32%),linear-gradient(180deg,#0e141b,#141b24)]" : "bg-[radial-gradient(circle_at_top_left,#d8eef4,transparent_26%),radial-gradient(circle_at_bottom_right,#cfd9e1,transparent_30%),linear-gradient(180deg,#f4f7f8,#e3e9ed)]")}>
      <div className="pointer-events-none fixed -left-28 top-20 h-80 w-80 rounded-full bg-cyan-300/14 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 top-1/2 h-96 w-96 rounded-full bg-slate-600/12 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
        <motion.header {...softMotion} className="sticky top-2 z-20 mb-4 flex flex-col gap-3 rounded-[1.6rem] border border-white/55 bg-slate-100/72 p-3 shadow-xl shadow-slate-950/8 backdrop-blur-2xl ring-1 ring-white/45 sm:top-4 sm:mb-5 sm:p-4 md:flex-row md:items-center md:justify-between dark:border-white/10 dark:bg-slate-900/68 dark:ring-white/10">
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
              <div><span>{currentUser.name}</span><span className="mx-2 text-slate-300">/</span><span className="capitalize text-cyan-600 dark:text-cyan-300">{currentUser.role}</span></div>
            </div>
            <Button variant="outline" onClick={() => setSettingsOpen(true)} className="gap-2"><Settings className="h-4 w-4" /> Settings</Button>
            <Button variant="outline" onClick={() => setDarkMode((value) => !value)} className="gap-2">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} {darkMode ? "Light" : "Dark"}
            </Button>
            <Button onClick={handleLogout} className="gap-2"><LogOut className="h-4 w-4" /> Logout</Button>
          </div>
        </motion.header>

        {appError && <div className="mb-5 rounded-3xl border border-red-300 bg-red-100 p-4 text-sm font-black text-red-800 shadow-sm dark:border-red-300/20 dark:bg-red-500/20 dark:text-red-100">{appError}</div>}

        <PortalMessages messages={messages} employees={employees} currentUser={currentUser} messageForm={messageForm} setMessageForm={setMessageForm} sendAdminMessage={sendAdminMessage} />

        {currentUser.role === "admin" && <PendingEmployeeApprovals pendingProfiles={pendingProfiles} approvePendingEmployee={approvePendingEmployee} denyPendingEmployee={denyPendingEmployee} />}

        <CapabilityDock
          installPrompt={installPrompt}
          installApp={installApp}
          notificationPermission={notificationPermission}
          requestNotifications={requestNotifications}
          offlineQueue={offlineQueue}
          syncOfflineQueue={syncOfflineQueue}
          exportPayrollPdf={exportPayrollPdf}
          isAdmin={currentUser.role === "admin"}
        />

        <main className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-5">
          <motion.section {...softMotion} transition={{ ...spring, delay: 0.06 }} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
              <MetricCard icon={<Clock />} label="Weekly Hours" value={moneylessHours(weeklyTotal)} />
              <MetricCard icon={<AlertCircle />} label="Pending" value={pendingCount} />
              <MetricCard icon={<CheckCircle2 />} label="Approved Payroll" value={moneylessHours(approvedPayrollTotal)} />
              <MetricCard icon={<ShieldCheck />} label="Denied Hours" value={moneylessHours(deniedHoursTotal)} />
            </div>

            <Card className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950 text-white shadow-2xl shadow-slate-950/25 dark:border-white/10">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-[2.25rem] bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,.18),transparent_28%),linear-gradient(135deg,#111827,#1f2937_52%,#0f172a)]">
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,.08),transparent_34%)]" />

                  <div className="relative flex flex-col gap-5 border-b border-white/10 px-5 py-6 sm:px-7 sm:py-7 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,.85)]" />
                        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-cyan-300">Week of</p>
                      </div>
                      <h2 className="text-3xl font-black tracking-[-0.06em] text-white sm:text-5xl">{displayDate(weekStart)}</h2>
                      <p className="mt-2 text-base font-extrabold tracking-[-0.03em] text-slate-300 sm:text-lg">Weekly Timesheet</p>
                      {appLoading && <p className="mt-2 text-xs font-bold text-cyan-200/80">Syncing with Supabase...</p>}
                    </div>

                    <div className="grid grid-cols-[54px_54px_1fr] gap-2 sm:flex sm:items-center sm:gap-3">
                      <Button variant="outline" aria-label="Previous week" onClick={() => setWeekStart(addDays(weekStart, -7))} className="h-14 rounded-[1.25rem] border-white/15 bg-white/10 p-0 text-white hover:bg-white/15"><ChevronLeft className="h-5 w-5" /></Button>
                      <Button variant="outline" aria-label="Next week" onClick={() => setWeekStart(addDays(weekStart, 7))} className="h-14 rounded-[1.25rem] border-white/15 bg-white/10 p-0 text-white hover:bg-white/15"><ChevronRight className="h-5 w-5" /></Button>
                      <Button variant="cool" onClick={() => exportCsv(false)} className="h-14 gap-2 rounded-[1.25rem] px-5 text-base"><Download className="h-5 w-5" /> Export</Button>
                      {currentUser.role === "admin" && <Button variant="outline" onClick={exportPayrollPdf} className="h-14 gap-2 rounded-[1.25rem] border-white/15 bg-white/10 px-5 text-white hover:bg-white/15"><FileText className="h-5 w-5" /> PDF</Button>}
                    </div>
                  </div>

                  <div className="relative p-4 sm:p-6">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                      {weekDates.map((date, index) => {
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
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03, ...spring }}
                            className={cx(
                              "group relative min-h-[252px] rounded-[1.35rem] border p-3 text-center shadow-xl backdrop-blur-2xl transition duration-300 sm:min-h-[270px]",
                              "border-white/15 bg-white/[0.075] hover:-translate-y-0.5 hover:bg-white/[0.105] hover:shadow-2xl hover:shadow-cyan-950/20",
                              isToday && "border-cyan-400/90 ring-2 ring-cyan-400/60"
                            )}
                          >
                            {isToday && (
                              <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-cyan-400 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-cyan-500/25">
                                Today
                              </span>
                            )}

                            <div className="flex min-h-[64px] flex-col items-start justify-start gap-1 text-left">
                              <p className="text-[13px] font-black leading-none tracking-[-0.025em] text-white sm:text-[14px]">{shortDay}</p>
                              <p className="whitespace-normal break-words text-[10px] font-extrabold leading-[1.15] text-slate-400 sm:text-[10.5px]">{displayDate(date)}</p>
                            </div>

                            <div className="my-3 h-px w-full bg-white/12" />

                            <div className="flex h-[72px] flex-col items-center justify-center sm:h-[78px]">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/25 shadow-inner shadow-slate-950/30 sm:h-10 sm:w-10">
                                <Clock className="h-4 w-4 text-cyan-300" />
                              </div>
                              <p className="mt-2 text-[22px] font-black leading-none tracking-[-0.055em] text-cyan-300 sm:text-[24px]">{total.toFixed(1)}h</p>
                              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500">Logged</p>
                            </div>

                            <div className="mt-3 min-h-[70px]">
                              {dayEntries.length === 0 ? (
                                <div className="flex min-h-[70px] flex-col items-center justify-center rounded-[1.1rem] border border-dashed border-white/18 bg-white/[0.035] px-2 text-slate-400">
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
                                          <p className={cx("truncate text-[10px] font-black tracking-[-0.02em] text-white", isDeniedEntry(entry) && "text-red-100")}>{entry.customerName}</p>
                                          <p className="mt-0.5 truncate text-[9px] font-bold text-slate-400">{entry.start}–{entry.end}</p>
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

                    <div className="mt-5 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.06] px-5 py-4 text-slate-300">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/30 text-cyan-300">i</span>
                        <p className="text-sm font-bold sm:text-base">Click any day to view details, job entries, and time logs.</p>
                      </div>
                      <ChevronRight className="hidden h-5 w-5 text-slate-400 sm:block" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {currentUser.role === "admin" && (
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
                              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">{date.toLocaleDateString(undefined, { weekday: "short" })}</p>
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

            <LiveShiftPanel
              liveShift={liveShift}
              elapsed={liveShiftElapsed()}
              startLiveShift={startLiveShift}
              stopLiveShiftAndFillForm={stopLiveShiftAndFillForm}
              captureGpsLocation={captureGpsLocation}
              form={form}
            />

            <Card>
              <CardContent>
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200"><Plus className="h-5 w-5" /></div>
                  <div><h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">Add Job Entry</h2><p className="text-sm text-slate-500 dark:text-slate-400">Split one workday across multiple jobs.</p></div>
                </div>
                <div className="grid gap-2.5 md:grid-cols-2">
                  <Field label="Date"><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" /></Field>
                  <Field label="Job Type"><select value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })} className="input">{jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></Field>
                  <Field label="Job / Customer Name"><input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="input" placeholder="Example: Smith Residence" /></Field>
                  <Field label="Start Time"><input type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="input" /></Field>
                  <Field label="End Time"><input type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="input" /></Field>
                  <Field label="Lunch Break"><div className="flex gap-2"><Button type="button" variant={form.lunchTaken ? "cool" : "outline"} className="flex-1" onClick={() => setForm({ ...form, lunchTaken: true })}>Yes</Button><Button type="button" variant={!form.lunchTaken ? "default" : "outline"} className="flex-1" onClick={() => setForm({ ...form, lunchTaken: false, lunchMinutes: 0 })}>No</Button></div></Field>
                  <Field label="Lunch Minutes"><input type="number" min="0" value={form.lunchMinutes} disabled={!form.lunchTaken} onChange={(e) => setForm({ ...form, lunchMinutes: Number(e.target.value) })} className="input disabled:opacity-40" /></Field>
                  <div className="md:col-span-2"><Field label="Notes"><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input min-h-24 resize-none" placeholder="Add work notes, equipment used, or job progress..." /></Field></div>
                  <Field label="Photo / Job Documentation"><div className="space-y-2"><div className="relative"><Camera className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} className="input pl-11" placeholder="Paste photo/job folder link or upload below" /></div><input type="file" accept="image/*" onChange={(e) => uploadJobPhoto(e.target.files?.[0])} className="block w-full rounded-2xl border border-slate-200 bg-white/70 p-2 text-xs font-bold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300" /></div></Field>
                  <Field label="GPS Verification"><Button type="button" variant="outline" onClick={captureGpsLocation} className="w-full py-3"><MapPin className="mr-2 h-4 w-4" />{form.gpsLat && form.gpsLng ? `${form.gpsLat}, ${form.gpsLng}` : "Capture Location"}</Button></Field>
                  <div className="md:col-span-2"><Field label="Employee Signature / Confirmation"><div className="relative"><PenLine className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={form.employeeSignature} onChange={(e) => setForm({ ...form, employeeSignature: e.target.value })} className="input pl-11" placeholder="Type employee name to confirm this entry" /></div></Field></div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-4 text-white shadow-xl shadow-slate-950/10 dark:from-slate-800 dark:to-cyan-950">
                  <div><p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Calculated Entry</p><p className="text-2xl font-black">{entryHours(form).toFixed(2)} hrs</p></div>
                  <Button onClick={addEntry} variant="outline" className="bg-white px-5 py-4 text-slate-950 hover:bg-cyan-50" disabled={appLoading}>Add Hours</Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.aside {...softMotion} transition={{ ...spring, delay: 0.12 }} className="space-y-4 sm:space-y-5">
            {currentUser.role === "admin" && (
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

            <Card>
              <CardContent>
                <div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">Transparency Log</p><h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">All Visible Entries</h2></div><CalendarDays className="h-6 w-6 text-cyan-700 dark:text-cyan-300" /></div>
                <div className="mb-4 grid gap-3 md:grid-cols-2">
                  {currentUser.role === "admin" && <select value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} className="input"><option value="all">All employees</option>{employees.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</select>}
                  <div className="relative md:col-span-2"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-11" placeholder="Search jobs or notes..." /></div>
                </div>

                {currentUser.role === "admin" && (
                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    {employeeSummaries.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-4 text-sm font-bold text-slate-500 sm:col-span-2 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">No employee hours to review for this week.</div> : employeeSummaries.map((employee) => (
                      <button key={employee.id} type="button" onClick={() => setSelectedEmployeeId(employee.id)} className="rounded-3xl border border-white/70 bg-white/75 p-4 text-left shadow-sm ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
                        <p className="text-sm font-black">{employee.name}</p><p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">Total: {employee.totalHours.toFixed(2)} hrs</p>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-black"><span className="rounded-2xl bg-amber-50 px-2 py-2 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">{employee.pendingCount} pending</span><span className="rounded-2xl bg-emerald-50 px-2 py-2 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{employee.approvedHours.toFixed(1)} approved</span><span className="rounded-2xl bg-red-100 px-2 py-2 text-red-800 shadow-sm dark:bg-red-500/20 dark:text-red-100">{employee.deniedHours.toFixed(1)} denied</span></div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  {visibleEntries.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">No matching entries for this week.</div> : visibleEntries.map((entry) => {
                    const employee = entry.employeeId === currentUser.id ? currentUser : employeeById.get(entry.employeeId);
                    return (
                      <div key={entry.id} className={cx("rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition duration-300 dark:border-white/10 dark:bg-slate-950/30", isDeniedEntry(entry) && "border-slate-200 bg-slate-100/70 opacity-45 grayscale shadow-none dark:bg-white/5")}>
                        <div className="mb-3 flex items-start justify-between gap-3"><div><p className="text-sm font-black">{entry.customerName}</p><p className="text-xs font-bold text-cyan-700 dark:text-cyan-300">{entry.jobType}</p><p className="text-xs text-slate-500 dark:text-slate-400">{displayDate(entry.date)} · {entry.start}–{entry.end}</p></div><StatusPill status={entry.approvalStatus} /></div>
                        <EntryDetails entry={entry} employee={employee} />
                        {(entry.photoUrl || entry.gpsLat || entry.employeeSignature) && <div className="mt-3 grid gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{entry.photoUrl && <a className="text-cyan-700 underline dark:text-cyan-300" href={entry.photoUrl} target="_blank" rel="noreferrer">View photo/job documentation</a>}{entry.gpsLat && entry.gpsLng && <a className="flex items-center gap-2 text-cyan-700 underline dark:text-cyan-300" href={`https://www.google.com/maps?q=${entry.gpsLat},${entry.gpsLng}`} target="_blank" rel="noreferrer"><MapPin className="h-3.5 w-3.5" /> View GPS location</a>}{entry.employeeSignature && <p className="flex items-center gap-2"><PenLine className="h-3.5 w-3.5" /> Signed: {entry.employeeSignature}</p>}</div>}
                        {currentUser.role === "admin" && <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5"><Button size="sm" variant="success" onClick={() => updateStatus(entry.id, "approved")}>Approve</Button><Button size="sm" variant="danger" onClick={() => setReviewModal({ entry, reason: "" })}>Deny</Button><Button size="sm" variant="outline" onClick={() => openEditModal(entry)}><Edit3 className="mr-1 h-3.5 w-3.5" /> Edit</Button></div>}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-slate-500/15 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-800 text-white shadow-2xl shadow-cyan-700/15">
              <CardContent className="relative p-5"><div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-300/14 blur-2xl" /><img src={brandLogo} alt="Voda Of Tucson" className="mb-5 max-h-14 w-auto object-contain brightness-0 invert sm:max-h-16" /><BriefcaseBusiness className="mb-4 h-8 w-8 text-cyan-200" /><h2 className="text-xl font-black tracking-[-0.03em]">Built for Voda Of Tucson field teams.</h2><p className="mt-2 text-sm leading-6 text-cyan-50">Track daily hours by job, verify lunch breaks, and keep weekly payroll transparent between employees and management.</p></CardContent>
            </Card>
          </motion.aside>
        </main>
      </div>

      {settingsOpen && <SettingsModal currentUser={currentUser} profileForm={profileForm} setProfileForm={setProfileForm} setSettingsOpen={setSettingsOpen} saveProfile={saveProfile} uploadProfilePicture={uploadProfilePicture} />}
      {reviewModal && <ReviewModal reviewModal={reviewModal} setReviewModal={setReviewModal} updateStatus={updateStatus} setAppError={setAppError} />}
      {editModal && <EditHoursModal editModal={editModal} setEditModal={setEditModal} saveEditedHours={saveEditedHours} />}
      {dayDetail && <DayDetailModal dayDetail={dayDetail} setDayDetail={setDayDetail} currentUser={currentUser} employeeById={employeeById} updateStatus={updateStatus} openEditModal={openEditModal} setReviewModal={setReviewModal} />}
      <style>{inputStyles}</style>
    </div>
  );
}


function CapabilityDock({ installPrompt, installApp, notificationPermission, requestNotifications, offlineQueue, syncOfflineQueue, exportPayrollPdf, isAdmin }) {
  const online = typeof navigator === "undefined" ? true : navigator.onLine;
  const items = [
    { icon: online ? <Wifi /> : <WifiOff />, label: online ? "Online" : "Offline", value: offlineQueue.length ? `${offlineQueue.length} queued` : "Synced", action: offlineQueue.length ? syncOfflineQueue : null },
    { icon: <Bell />, label: "Notifications", value: notificationPermission === "granted" ? "Enabled" : "Enable", action: notificationPermission !== "granted" && notificationPermission !== "unsupported" ? requestNotifications : null },
    { icon: <Smartphone />, label: "iPhone App Feel", value: installPrompt ? "Install" : "Ready", action: installPrompt ? installApp : null },
    ...(isAdmin ? [{ icon: <FileText />, label: "Payroll PDF", value: "Export", action: exportPayrollPdf }] : []),
  ];

  return (
    <motion.div {...softMotion} className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
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

function LiveShiftPanel({ liveShift, elapsed, startLiveShift, stopLiveShiftAndFillForm, captureGpsLocation, form }) {
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
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{liveShift ? (liveShift.customerName || form.customerName || "Active job timer") : "Start a timer, stop it, then submit the prefilled hours."}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <Button type="button" variant="outline" onClick={captureGpsLocation} className="gap-2"><MapPin className="h-4 w-4" /> GPS</Button>
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

function DayDetailModal({ dayDetail, setDayDetail, currentUser, employeeById, updateStatus, openEditModal, setReviewModal }) {
  const dayEntries = dayDetail.entries || [];
  const activeEntries = dayEntries.filter((entry) => !isDeniedEntry(entry));
  const deniedEntries = dayEntries.filter((entry) => isDeniedEntry(entry));
  const totalHours = activeEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
  const approvedHours = activeEntries.filter((entry) => String(entry.approvalStatus).toLowerCase() === "approved").reduce((sum, entry) => sum + entryHours(entry), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-sm sm:items-center">
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={spring}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/70 bg-slate-50/95 p-4 shadow-2xl shadow-slate-950/25 ring-1 ring-white/80 backdrop-blur-2xl sm:p-5 dark:border-white/10 dark:bg-slate-900/95 dark:ring-white/10"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">Day detail</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">{displayDate(dayDetail.date)}</h2>
            <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">Full job and hours breakdown for this date.</p>
          </div>
          <Button variant="ghost" onClick={() => setDayDetail(null)}><X className="h-5 w-5" /></Button>
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
                    <p className="truncate text-base font-black tracking-[-0.02em] text-slate-950 dark:text-white">{entry.customerName}</p>
                    <p className="text-xs font-black uppercase tracking-[0.1em] text-cyan-700 dark:text-cyan-300">{entry.jobType}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{entry.start}–{entry.end} · {entryHours(entry).toFixed(2)} hrs</p>
                  </div>
                  <StatusPill status={entry.approvalStatus} />
                </div>

                <EntryDetails entry={entry} employee={employee} />

                {(entry.photoUrl || entry.gpsLat || entry.employeeSignature) && (
                  <div className="mt-3 grid gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    {entry.photoUrl && <a className="text-cyan-700 underline dark:text-cyan-300" href={entry.photoUrl} target="_blank" rel="noreferrer">View photo/job documentation</a>}
                    {entry.gpsLat && entry.gpsLng && <a className="flex items-center gap-2 text-cyan-700 underline dark:text-cyan-300" href={`https://www.google.com/maps?q=${entry.gpsLat},${entry.gpsLng}`} target="_blank" rel="noreferrer"><MapPin className="h-3.5 w-3.5" /> View GPS location</a>}
                    {entry.employeeSignature && <p className="flex items-center gap-2"><PenLine className="h-3.5 w-3.5" /> Signed: {entry.employeeSignature}</p>}
                  </div>
                )}

                {currentUser?.role === "admin" && (
                  <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                    <Button size="sm" variant="success" onClick={() => updateStatus(entry.id, "approved")}>Approve</Button>
                    <Button size="sm" variant="danger" onClick={() => setReviewModal({ entry, reason: "" })}>Deny</Button>
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

function PendingEmployeeApprovals({ pendingProfiles, approvePendingEmployee, denyPendingEmployee }) {
  if (!pendingProfiles.length) return null;

  return (
    <motion.div {...softMotion} className="mb-4 rounded-[1.6rem] border border-cyan-200/70 bg-cyan-50/75 p-4 shadow-xl shadow-cyan-950/8 backdrop-blur-2xl ring-1 ring-white/50 dark:border-cyan-300/15 dark:bg-cyan-400/10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">Admin Approval Queue</p>
          <h2 className="text-lg font-black tracking-[-0.03em] text-slate-950 dark:text-white">Pending employee requests</h2>
        </div>
        <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-black text-white">{pendingProfiles.length}</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {pendingProfiles.map((employee) => (
          <div key={employee.id} className="rounded-3xl border border-white/70 bg-white/72 p-4 shadow-sm dark:border-white/10 dark:bg-white/8">
            <div className="mb-3 flex items-center gap-3">
              <AvatarBadge person={employee} />
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-slate-950 dark:text-white">{employee.name}</p>
                <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">{employee.email || "No email saved"}</p>
                {employee.phone && <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">{employee.phone}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="button" variant="success" className="flex-1 gap-2" onClick={() => approvePendingEmployee(employee.id)}><CheckCircle2 className="h-4 w-4" /> Approve</Button>
              <Button type="button" variant="danger" className="flex-1 gap-2" onClick={() => denyPendingEmployee(employee.id)}><X className="h-4 w-4" /> Deny</Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
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
                <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">{message.recipientId === "all" ? "All employees" : recipient?.name || "Employee"} · {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : "New"}</p>
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

        <div className="mt-5 flex gap-2">
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
  return <div className="rounded-3xl bg-white/75 p-4 shadow-sm ring-1 ring-white/80 dark:bg-white/5 dark:ring-white/10"><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</p><p className={cx("mt-1 text-2xl font-black", tones[tone])}>{value}</p></div>;
}

function ReviewModal({ reviewModal, setReviewModal, updateStatus, setAppError }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-sm sm:items-center">
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-slate-50/92 p-5 shadow-2xl shadow-slate-950/20 ring-1 ring-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/92 dark:ring-white/10">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-red-600 dark:text-red-300">Private admin review</p><h2 className="mt-1 text-2xl font-black tracking-[-0.03em]">Deny hours?</h2><p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">This reason will only be visible to admins and the employee who submitted the entry.</p>
        <div className="mt-4 rounded-3xl bg-white/80 p-4 text-sm shadow-sm dark:bg-white/5"><p className="font-black">{reviewModal.entry.customerName}</p><p className="text-slate-500 dark:text-slate-400">{displayDate(reviewModal.entry.date)} · {entryHours(reviewModal.entry).toFixed(2)} hrs</p></div>
        <textarea value={reviewModal.reason} onChange={(e) => setReviewModal((current) => ({ ...current, reason: e.target.value }))} className="input mt-4 min-h-32 resize-none" placeholder="Example: Clocked out after leaving the jobsite / wrong job selected / hours do not match schedule." />
        <div className="mt-4 flex gap-2"><Button type="button" variant="outline" onClick={() => setReviewModal(null)} className="flex-1 py-3">Cancel</Button><Button type="button" variant="danger" className="flex-1 py-3" onClick={() => { const reason = (reviewModal.reason || "").trim(); if (!reason) return setAppError("Please enter a denial reason before denying hours."); updateStatus(reviewModal.entry.id, "denied", reason); }}>Deny Entry</Button></div>
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
        <div className="mt-4 flex gap-2"><Button variant="outline" onClick={() => setEditModal(null)} className="flex-1 py-3">Cancel</Button><Button variant="cool" onClick={saveEditedHours} className="flex-1 py-3"><Edit3 className="mr-2 h-4 w-4" /> Save Changes</Button></div>
      </motion.div>
    </div>
  );
}

const inputStyles = `
  .input {
    width: 100%;
    border-radius: 1rem;
    border: 1px solid rgb(203 213 225 / .92);
    background: rgba(248,250,252,.78);
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
`;
