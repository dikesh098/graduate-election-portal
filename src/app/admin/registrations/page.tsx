"use client";

import { useEffect, useState } from "react";

type Registration = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  trackingId: string;
  status: string;
  createdAt: string;
};

const STATUSES = ["submitted", "under_review", "documents_pending", "verified", "rejected"];

export default function AdminRegistrationsPage() {
  const [items, setItems] = useState<Registration[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (status) params.set("status", status);
      const res = await fetch(`/api/admin/registrations?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateStatus(id: string, newStatus: string) {
    await fetch("/api/admin/registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    load();
  }

  return (
    <div>
      <h1 className="font-head text-2xl font-bold text-navy">Registrations</h1>

      <div className="mt-4 flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, tracking ID…"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace("_", " ")}</option>
          ))}
        </select>
        <button onClick={load} className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white">
          Search
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Tracking ID</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-400">Loading…</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-400">No registrations found.</td></tr>
            )}
            {items.map((r) => (
              <tr key={r._id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{r.fullName}</p>
                  <p className="text-xs text-slate-400">{r.email}</p>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{r.trackingId}</td>
                <td className="px-4 py-3">{r.district}</td>
                <td className="px-4 py-3">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r._id, e.target.value)}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s.replace("_", " ")}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
