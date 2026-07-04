"use client";

import { useEffect, useState } from "react";

type Volunteer = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  availability: string;
  status: string;
};

export default function AdminVolunteersPage() {
  const [items, setItems] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/volunteers");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/volunteers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  return (
    <div>
      <h1 className="font-head text-2xl font-bold text-navy">Volunteers</h1>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} className="px-4 py-6 text-center text-slate-400">Loading…</td></tr>}
            {!loading && items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-slate-400">No volunteers yet.</td></tr>
            )}
            {items.map((v) => (
              <tr key={v._id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{v.fullName}</p>
                  <p className="text-xs text-slate-400">{v.email} · {v.phone}</p>
                </td>
                <td className="px-4 py-3">{v.district}</td>
                <td className="px-4 py-3">{v.availability}</td>
                <td className="px-4 py-3">
                  <select
                    value={v.status}
                    onChange={(e) => updateStatus(v._id, e.target.value)}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
