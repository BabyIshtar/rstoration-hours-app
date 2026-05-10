import { supabase } from "./supabase";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Download,
  ShieldCheck,
  BriefcaseBusiness,
  UserRound,
  Plus,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Button({ children, className = "", variant = "default", size = "default", ...props }) {
  const base = "inline-flex items-center justify-center font-semibold transition disabled:opacity-50";
  const variants = {
    default: "bg-slate-950 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white text-slate-950 hover:bg-slate-50",
  };
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

const employees = [
  { id: "emp-1", name: "Alex Rivera", email: "alex@company.com", role: "employee" },
  { id: "emp-2", name: "Mia Thompson", email: "mia@company.com", role: "employee" },
];

const jobs = [
  "Water Mitigation - Tucson",
  "Fire/Smoke Cleanup - Oro Valley",
  "Biohazard Cleanup - Marana",
  "Mold Remediation - Casas Adobes",
  "Emergency Dry Out - Sahuarita",
];

const initialEntries = [];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function minutesBetween(start, end) {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
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
  return `${value.toFixed(2)} hrs`;
}

function StatusPill({ status }) {
  const styles = {
    Draft: "bg-slate-100 text-slate-700 border-slate-200",
    Submitted: "bg-blue-50 text-blue-700 border-blue-100",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Needs Correction": "bg-amber-50 text-amber-700 border-amber-100",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status] || styles.Draft}`}>
      {status}
    </span>
  );
}

export default function RestorationHoursTracker() {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [entries, setEntries] = useState(initialEntries);
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    date: formatDate(new Date()),
    job: jobs[0],
    start: "08:00",
    end: "17:00",
    lunchTaken: true,
    lunchMinutes: 30,
    notes: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;

      setSession(data.session);

      if (data.session?.user) {
        await loadProfile(data.session.user);
      }

      setAuthLoading(false);
    }

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);

      if (newSession?.user) {
        await loadProfile(newSession.user);
      } else {
        setCurrentUser(null);
      }

      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function loadProfile(user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      setLoginError("Profile not found. Make sure this user exists in the profiles table.");
      setCurrentUser(null);
      return;
    }

    setCurrentUser({
      id: data.id,
      name: data.full_name || user.email,
      email: user.email || "",
      role: data.role || "employee",
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    setAuthLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setLoginError(error.message);
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setCurrentUser(null);
  }

  const weekDates = useMemo(() => weekdays.map((_, index) => addDays(weekStart, index)), [weekStart]);

  const visibleEntries = useMemo(() => {
    if (!currentUser) return [];

    return entries.filter((entry) => {
      const inWeek = weekDates.some((date) => formatDate(date) === entry.date);
      const correctUser =
        currentUser.role === "admin"
          ? selectedEmployeeId === "all" || entry.employeeId === selectedEmployeeId || entry.employeeId === currentUser.id
          : entry.employeeId === currentUser.id;
      const matchesSearch = `${entry.job} ${entry.notes}`.toLowerCase().includes(search.toLowerCase());
      return inWeek && correctUser && matchesSearch;
    });
  }, [entries, weekDates, currentUser, selectedEmployeeId, search]);

  const weeklyTotal = visibleEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
  const submittedCount = visibleEntries.filter((entry) => entry.status === "Submitted").length;
  const approvedCount = visibleEntries.filter((entry) => entry.status === "Approved").length;

  function addEntry() {
    if (!currentUser) return;

    const newEntry = {
      id: crypto.randomUUID(),
      employeeId: currentUser.id,
      ...form,
      status: "Draft",
    };

    setEntries([newEntry, ...entries]);
    setForm({ ...form, notes: "" });
  }

  function updateStatus(id, status) {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, status } : entry)));
  }

  function exportCsv() {
    const rows = [
      ["Employee", "Date", "Job", "Start", "End", "Lunch Taken", "Lunch Minutes", "Hours", "Status", "Notes"],
      ...visibleEntries.map((entry) => {
        const employeeName = entry.employeeId === currentUser?.id ? currentUser?.name : employees.find((person) => person.id === entry.employeeId)?.name;
        return [
          employeeName || "Unknown",
          entry.date,
          entry.job,
          entry.start,
          entry.end,
          entry.lunchTaken ? "Yes" : "No",
          entry.lunchMinutes,
          entryHours(entry).toFixed(2),
          entry.status,
          (entry.notes || "").replaceAll(",", " "),
        ];
      }),
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `restoration-hours-${formatDate(weekStart)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 text-white">
        Loading...
      </div>
    );
  }

  if (!session || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Voda Timesheet Tracker</p>

          <h1 className="mt-3 text-3xl font-bold text-slate-950">Employee Login</h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to track job hours, lunch breaks, and weekly timesheets.
          </p>

          <div className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="input"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="input"
              required
            />

            {loginError && (
              <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{loginError}</p>
            )}

            <Button className="w-full rounded-2xl bg-blue-600 py-4 text-white hover:bg-blue-700" disabled={authLoading}>
              Login
            </Button>
          </div>
        </form>

        <style>{inputStyles}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#eaf6ff,transparent_28%),linear-gradient(180deg,#ffffff,#f6f9fc)] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-xl shadow-blue-950/5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">Restoration Hours Portal</p>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Weekly Job Time Tracking</h1>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm">
              {currentUser.name} · {currentUser.role}
            </div>
            <Button onClick={handleLogout} className="rounded-2xl bg-slate-950 px-5 py-6 text-white hover:bg-slate-800">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </header>

        <main className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard icon={<Clock />} label="Visible Weekly Hours" value={moneylessHours(weeklyTotal)} />
              <MetricCard icon={<AlertCircle />} label="Submitted Entries" value={submittedCount} />
              <MetricCard icon={<CheckCircle2 />} label="Approved Entries" value={approvedCount} />
            </div>

            <Card className="overflow-hidden rounded-[2rem] border-white/80 bg-white/85 shadow-xl shadow-blue-950/5 backdrop-blur">
              <CardContent className="p-5">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-600">Week of {formatDate(weekStart)}</p>
                    <h2 className="text-xl font-bold">Weekly Timesheet</h2>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-2xl" onClick={() => setWeekStart(addDays(weekStart, -7))}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="rounded-2xl" onClick={() => setWeekStart(addDays(weekStart, 7))}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700" onClick={exportCsv}>
                      <Download className="mr-2 h-4 w-4" /> CSV
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-7">
                  {weekDates.map((date, index) => {
                    const dateKey = formatDate(date);
                    const dayEntries = visibleEntries.filter((entry) => entry.date === dateKey);
                    const total = dayEntries.reduce((sum, entry) => sum + entryHours(entry), 0);
                    return (
                      <motion.div
                        key={dateKey}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="min-h-36 rounded-3xl border border-slate-100 bg-slate-50/80 p-3"
                      >
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-bold">{weekdays[index]}</p>
                            <p className="text-xs text-slate-500">{dateKey}</p>
                          </div>
                          <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-blue-700 shadow-sm">{total.toFixed(1)}h</span>
                        </div>
                        <div className="space-y-2">
                          {dayEntries.length === 0 ? (
                            <p className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-3 text-xs text-slate-400">No job entries.</p>
                          ) : (
                            dayEntries.map((entry) => (
                              <div key={entry.id} className="rounded-2xl bg-white p-3 shadow-sm">
                                <p className="line-clamp-2 text-xs font-bold text-slate-900">{entry.job}</p>
                                <p className="mt-1 text-xs text-slate-500">{entry.start}–{entry.end}</p>
                                <p className="text-xs font-bold text-blue-700">{entryHours(entry).toFixed(2)} hrs</p>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/80 bg-white/85 shadow-xl shadow-blue-950/5 backdrop-blur">
              <CardContent className="p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                    <Plus className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Add Job Entry</h2>
                    <p className="text-sm text-slate-500">Split one workday across multiple restoration jobs.</p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Date">
                    <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="input" />
                  </Field>
                  <Field label="Job / Project">
                    <select value={form.job} onChange={(event) => setForm({ ...form, job: event.target.value })} className="input">
                      {jobs.map((job) => (
                        <option key={job}>{job}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Start Time">
                    <input type="time" value={form.start} onChange={(event) => setForm({ ...form, start: event.target.value })} className="input" />
                  </Field>
                  <Field label="End Time">
                    <input type="time" value={form.end} onChange={(event) => setForm({ ...form, end: event.target.value })} className="input" />
                  </Field>
                  <Field label="Lunch Break">
                    <div className="flex gap-2">
                      <Button type="button" variant={form.lunchTaken ? "default" : "outline"} className={`flex-1 rounded-2xl ${form.lunchTaken ? "bg-blue-600 hover:bg-blue-700" : ""}`} onClick={() => setForm({ ...form, lunchTaken: true })}>Yes</Button>
                      <Button type="button" variant={!form.lunchTaken ? "default" : "outline"} className={`flex-1 rounded-2xl ${!form.lunchTaken ? "bg-slate-950 hover:bg-slate-800" : ""}`} onClick={() => setForm({ ...form, lunchTaken: false, lunchMinutes: 0 })}>No</Button>
                    </div>
                  </Field>
                  <Field label="Lunch Minutes">
                    <input type="number" min="0" value={form.lunchMinutes} disabled={!form.lunchTaken} onChange={(event) => setForm({ ...form, lunchMinutes: Number(event.target.value) })} className="input disabled:opacity-40" />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Notes">
                      <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="input min-h-24 resize-none" placeholder="Add work notes, equipment used, or job progress..." />
                    </Field>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-3xl bg-slate-950 p-4 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Calculated Entry</p>
                    <p className="text-2xl font-bold">{entryHours(form).toFixed(2)} hrs</p>
                  </div>
                  <Button onClick={addEntry} className="rounded-2xl bg-white px-5 py-6 font-bold text-slate-950 hover:bg-blue-50">
                    Add Hours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-5">
            <Card className="rounded-[2rem] border-white/80 bg-white/85 shadow-xl shadow-blue-950/5 backdrop-blur">
              <CardContent className="p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-blue-600">Transparency Log</p>
                    <h2 className="text-xl font-bold">All Visible Entries</h2>
                  </div>
                  <CalendarDays className="h-6 w-6 text-blue-600" />
                </div>

                <div className="mb-4 grid gap-3 md:grid-cols-2">
                  {currentUser.role === "admin" && (
                    <select value={selectedEmployeeId} onChange={(event) => setSelectedEmployeeId(event.target.value)} className="input">
                      <option value="all">All employees</option>
                      <option value={currentUser.id}>{currentUser.name}</option>
                      {employees.map((person) => (
                        <option key={person.id} value={person.id}>{person.name}</option>
                      ))}
                    </select>
                  )}
                  <div className="relative md:col-span-2">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} className="input pl-11" placeholder="Search jobs or notes..." />
                  </div>
                </div>

                <div className="space-y-3">
                  {visibleEntries.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">No matching entries for this week.</div>
                  ) : (
                    visibleEntries.map((entry) => {
                      const employee = entry.employeeId === currentUser.id ? currentUser : employees.find((person) => person.id === entry.employeeId);
                      return (
                        <div key={entry.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-bold">{entry.job}</p>
                              <p className="text-xs text-slate-500">{entry.date} · {entry.start}–{entry.end}</p>
                            </div>
                            <StatusPill status={entry.status} />
                          </div>
                          <div className="grid gap-2 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600 sm:grid-cols-2">
                            <p className="flex items-center gap-2"><UserRound className="h-3.5 w-3.5" /> {employee?.name}</p>
                            <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {entryHours(entry).toFixed(2)} total hrs</p>
                            <p className="sm:col-span-2">Lunch: {entry.lunchTaken ? `${entry.lunchMinutes} min` : "No lunch break"}</p>
                            {entry.notes && <p className="sm:col-span-2">Notes: {entry.notes}</p>}
                          </div>
                          {currentUser.role === "admin" && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button size="sm" variant="outline" className="rounded-xl" onClick={() => updateStatus(entry.id, "Submitted")}>Submitted</Button>
                              <Button size="sm" className="rounded-xl bg-emerald-600 hover:bg-emerald-700" onClick={() => updateStatus(entry.id, "Approved")}>Approve</Button>
                              <Button size="sm" className="rounded-xl bg-amber-500 hover:bg-amber-600" onClick={() => updateStatus(entry.id, "Needs Correction")}>Needs Correction</Button>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-blue-100 bg-blue-600 text-white shadow-xl shadow-blue-600/15">
              <CardContent className="p-5">
                <BriefcaseBusiness className="mb-4 h-8 w-8" />
                <h2 className="text-xl font-bold">Built for restoration field teams.</h2>
                <p className="mt-2 text-sm leading-6 text-blue-50">
                  Track daily hours by job, verify lunch breaks, and keep weekly payroll transparent between employees and management.
                </p>
              </CardContent>
            </Card>
          </aside>
        </main>
      </div>
      <style>{inputStyles}</style>
    </div>
  );
}

const inputStyles = `
  .input {
    width: 100%;
    border-radius: 1rem;
    border: 1px solid rgb(226 232 240);
    background: rgba(255,255,255,.9);
    padding: .85rem 1rem;
    font-size: .875rem;
    font-weight: 600;
    outline: none;
    box-shadow: 0 1px 2px rgba(15,23,42,.03);
  }
  .input:focus {
    border-color: rgb(37 99 235);
    box-shadow: 0 0 0 4px rgba(37,99,235,.08);
  }
`;

function MetricCard({ icon, label, value }) {
  return (
    <Card className="rounded-[2rem] border-white/80 bg-white/85 shadow-xl shadow-blue-950/5 backdrop-blur">
      <CardContent className="p-5">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          {React.cloneElement(icon, { className: "h-5 w-5" })}
        </div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>
      {children}
    </label>
  );
}
