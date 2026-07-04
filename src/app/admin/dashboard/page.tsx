"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
} from "recharts";

type Stats = {
  total: number;
  verified: number;
  pending: number;
  activeVolunteers: number;
  byDistrict: { district: string; count: number }[];
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  return (
    <div>
      <h1 className="font-head text-2xl font-bold text-navy">Overview — Nagpur Graduates&apos; Constituency</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Registrations" value={stats?.total ?? "—"} />
        <StatCard label="Verified" value={stats?.verified ?? "—"} />
        <StatCard label="Pending Review" value={stats?.pending ?? "—"} />
        <StatCard label="Active Volunteers" value={stats?.activeVolunteers ?? "—"} />
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">Registrations by District</h2>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={stats?.byDistrict ?? []}>
              <XAxis dataKey="district" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#0B2A5E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
