"use client";

import { useState } from "react";

export default function VolunteerPage() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", district: "", availability: "", message: "" });
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error?.formErrors?.join(", ") || "Please check your details.");
        return;
      }
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <h1 className="font-head text-2xl font-bold text-navy">Thank you for volunteering!</h1>
        <p className="mt-3 text-sm text-slate-600">The office will reach out to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Get Involved</p>
      <h1 className="mt-2 font-head text-3xl font-bold text-navy">Volunteer Registration</h1>
      <p className="mt-3 text-sm text-slate-600">Help fellow graduates understand and complete their registration.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Input label="Full Name" value={form.fullName} onChange={(v) => update("fullName", v)} />
        <Input label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
        <Input label="Mobile Number" value={form.phone} onChange={(v) => update("phone", v)} placeholder="10-digit mobile number" />
        <Input label="District" value={form.district} onChange={(v) => update("district", v)} />
        <Input label="Availability" value={form.availability} onChange={(v) => update("availability", v)} placeholder="e.g. Weekends, evenings" />

        <div>
          <label className="block text-sm font-medium text-slate-700">Message (optional)</label>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Sign Up to Volunteer"}
        </button>
      </form>
    </div>
  );
}

function Input({
  label, value, onChange, type = "text", placeholder,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
      />
    </div>
  );
}
