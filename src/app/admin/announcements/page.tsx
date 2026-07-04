"use client";

import { useEffect, useState } from "react";

type Announcement = { _id: string; title: string; body: string; category: string; publishedAt: string };

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("general");
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/announcements");
    const data = await res.json();
    setItems(data.items || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, category }),
      });
      setTitle("");
      setBody("");
      load();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="font-head text-2xl font-bold text-navy">Announcements</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Announcement text"
          required
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
          <option value="general">General</option>
          <option value="news">News</option>
          <option value="deadline">Deadline</option>
          <option value="event">Event</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-navy px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {submitting ? "Publishing…" : "Publish Announcement"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {items.map((a) => (
          <div key={a._id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-navy/10 px-2 py-0.5 text-xs font-semibold text-navy">{a.category}</span>
              <span className="text-xs text-slate-400">{new Date(a.publishedAt).toLocaleDateString()}</span>
            </div>
            <h3 className="mt-1 font-semibold text-slate-800">{a.title}</h3>
            <p className="text-sm text-slate-600">{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
