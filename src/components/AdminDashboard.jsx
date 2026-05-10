import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminDashboard() {
  const [entries, setEntries] = useState([]);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("time_entries")
      .select("*")
      .order("clock_in", { ascending: false });

    if (error) {
      console.error("Error fetching entries:", error);
      return;
    }

    setEntries(data || []);
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  async function approveEntry(id) {
    await supabase
      .from("time_entries")
      .update({
        approval_status: "approved",
        denial_reason: null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    fetchEntries();
  }

  async function denyEntry(id) {
    const reason = window.prompt("Why are these hours being denied?");

    if (!reason) return;

    await supabase
      .from("time_entries")
      .update({
        approval_status: "denied",
        denial_reason: reason,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    fetchEntries();
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">
        Weekly Hours Review
      </h2>

      <div className="mt-4 space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">
                  {entry.employee_name || entry.employee_id || "Employee"}
                </p>

                <p className="text-sm text-white/60">
                  {entry.job_type || "Job"} · {entry.total_hours || 0} hours
                </p>

                <p className="text-sm text-white/60">
                  Status: {entry.approval_status || "pending"}
                </p>

                {entry.approval_status === "denied" && (
                  <p className="mt-2 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100">
                    Reason: {entry.denial_reason}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => approveEntry(entry.id)}
                  className="rounded-xl border border-green-400/30 bg-green-500/20 px-4 py-2 text-sm text-green-100"
                >
                  Approve
                </button>

                <button
                  onClick={() => denyEntry(entry.id)}
                  className="rounded-xl border border-red-400/30 bg-red-500/20 px-4 py-2 text-sm text-red-100"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        ))}

        {entries.length === 0 && (
          <p className="text-sm text-white/60">No time entries found yet.</p>
        )}
      </div>
    </section>
  );
}