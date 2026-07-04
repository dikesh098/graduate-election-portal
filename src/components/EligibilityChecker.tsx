"use client";

import { useState } from "react";

export default function EligibilityChecker() {
  const [graduationYear, setGraduationYear] = useState("");
  const [residesInMaharashtra, setResidesInMaharashtra] = useState(true);
  const [district, setDistrict] = useState("Nagpur");
  const [result, setResult] = useState<{ eligible: boolean; reasons: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  async function checkEligibility() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          graduationYear: Number(graduationYear),
          residesInMaharashtra,
          district,
        }),
      });
      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Graduation Year</label>
        <input
          type="number"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          placeholder="e.g. 2020"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">District</label>
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={residesInMaharashtra}
          onChange={(e) => setResidesInMaharashtra(e.target.checked)}
        />
        I am ordinarily resident in Maharashtra
      </label>

      <button
        onClick={checkEligibility}
        disabled={!graduationYear || loading}
        className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Checking…" : "Check Eligibility"}
      </button>

      {result && (
        <div
          className={`rounded-md p-4 text-sm ${
            result.eligible ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"
          }`}
        >
          <p className="font-semibold">
            {result.eligible ? "You appear to be eligible!" : "You may not currently be eligible."}
          </p>
          {result.reasons?.length > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {result.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
