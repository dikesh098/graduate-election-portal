"use client";

import { useState } from "react";

type DocFile = { label: string; base64: string; fileName: string };

const DOC_LABELS = ["Degree Certificate", "Address Proof", "Photo ID"];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function RegistrationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    graduationYear: "",
    university: "",
    district: "",
    address: "",
  });
  const [docs, setDocs] = useState<Record<string, DocFile>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  function updateField(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFile(label: string, file: File | null) {
    if (!file) return;
    const base64 = await fileToBase64(file);
    setDocs((d) => ({ ...d, [label]: { label, base64, fileName: file.name } }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          graduationYear: Number(form.graduationYear),
          documents: Object.values(docs),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error?.formErrors?.join(", ") || data.error || "Please check your details and try again.");
        return;
      }

      setTrackingId(data.trackingId);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (trackingId) {
    return (
      <div className="mt-8 rounded-xl bg-green-50 p-6 text-center">
        <h2 className="font-head text-xl font-bold text-green-800">Application Submitted!</h2>
        <p className="mt-2 text-sm text-green-700">Your tracking ID is:</p>
        <p className="mt-1 font-mono text-lg font-bold text-green-900">{trackingId}</p>
        <p className="mt-3 text-xs text-green-700">
          Save this ID — you&apos;ll need it to track your application status.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <Field label="Full Name" value={form.fullName} onChange={(v) => updateField("fullName", v)} required />
      <Field label="Email" type="email" value={form.email} onChange={(v) => updateField("email", v)} required />
      <Field label="Mobile Number" value={form.phone} onChange={(v) => updateField("phone", v)} required placeholder="10-digit mobile number" />
      <Field label="Graduation Year" type="number" value={form.graduationYear} onChange={(v) => updateField("graduationYear", v)} required />
      <Field label="University / College" value={form.university} onChange={(v) => updateField("university", v)} required />
      <Field label="District" value={form.district} onChange={(v) => updateField("district", v)} required />

      <div>
        <label className="block text-sm font-medium text-slate-700">Residential Address</label>
        <textarea
          required
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Documents</label>
        <div className="space-y-2">
          {DOC_LABELS.map((label) => (
            <div key={label} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
              <span className="text-sm text-slate-600">{label}</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleFile(label, e.target.files?.[0] ?? null)}
                className="text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit Registration"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy"
      />
    </div>
  );
}
