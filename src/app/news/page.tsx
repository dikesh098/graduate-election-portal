import { connectDB } from "@/lib/db";
import Announcement from "@/models/Announcement";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  news: "News",
  deadline: "Deadline",
  event: "Event",
  general: "General",
};

export default async function NewsPage() {
  await connectDB();
  const items = await Announcement.find().sort({ publishedAt: -1 }).limit(50).lean();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Stay Updated</p>
      <h1 className="mt-2 font-head text-3xl font-bold text-navy">News &amp; Announcements</h1>

      <div className="mt-8 space-y-4">
        {items.length === 0 && <p className="text-sm text-slate-500">No announcements yet. Check back soon.</p>}
        {items.map((a) => (
          <div key={String(a._id)} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-navy/10 px-2 py-0.5 text-xs font-semibold text-navy">
                {CATEGORY_LABELS[a.category] || a.category}
              </span>
              <span className="text-xs text-slate-400">{new Date(a.publishedAt).toLocaleDateString()}</span>
            </div>
            <h2 className="mt-2 font-head text-lg font-bold text-navy">{a.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
