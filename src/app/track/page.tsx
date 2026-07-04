"use client";

import { useState } from "react";

const STATUS_LABELS: Record<string, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  documents_pending: "Documents Pending",
  verified: "Verified",
  rejected: "Rejected",
};

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/status/${trackingId.trim()}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Application not found.");
        return;
      }
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Application Tracking</p>
      <h1 className="mt-2 font-head text-3xl font-bold text-navy">Track Your Application</h1>

      <form onSubmit={handleSearch} className="mt-8 flex gap-3">
        <input
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="e.g. GEP-4F8A2B1C"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
        />
        <button
          type="submit"
          disabled={loading || !trackingId.trim()}
          className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Searching…" : "Track"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-8 rounded-xl border border-slate-200 p-6">
          <h2 className="font-head text-lg font-bold text-navy">{result.fullName}</h2>
          <p className="mt-1 text-sm text-slate-500">Tracking ID: {result.trackingId}</p>
          <p className="mt-3 inline-block rounded-full bg-navy/10 px-3 py-1 text-sm font-semibold text-navy">
            {STATUS_LABELS[result.status] || result.status}
          </p>

          <div className="mt-6 space-y-3">
            {result.statusHistory?.slice().reverse().map((h: any, i: number) => (
              <div key={i} className="border-l-2 border-slate-200 pl-4 text-sm">
                <p className="font-semibold text-slate-700">{STATUS_LABELS[h.status] || h.status}</p>
                {h.note && <p className="text-slate-500">{h.note}</p>}
                <p className="text-xs text-slate-400">{new Date(h.at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
