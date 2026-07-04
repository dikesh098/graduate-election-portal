"use client";

import { useEffect, useState } from "react";

type EventItem = { _id: string; title: string; description: string; location: string; startAt: string };

export default function AdminEventsPage() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [form, setForm] = useState({ title: "", description: "", location: "", startAt: "" });
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/events");
    const data = await res.json();
    setItems(data.items || []);
  }

  useEffect(() => {
    load();
  }, []);

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ title: "", description: "", location: "", startAt: "" });
      load();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="font-head text-2xl font-bold text-navy">Events</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Event title"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Description"
          required
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="Location"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="datetime-local"
          value={form.startAt}
          onChange={(e) => update("startAt", e.target.value)}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-navy px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {submitting ? "Adding…" : "Add Event"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {items.map((e) => (
          <div key={e._id} className="rounded-lg bg-white p-4 shadow-sm">
            <p className="text-xs text-gold">{new Date(e.startAt).toLocaleString()}</p>
            <h3 className="font-semibold text-slate-800">{e.title}</h3>
            <p className="text-sm text-slate-600">{e.description}</p>
            <p className="text-xs text-slate-400">{e.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
