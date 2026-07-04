import { connectDB } from "@/lib/db";
import Event from "@/models/Event";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  await connectDB();
  const events = await Event.find().sort({ startAt: 1 }).lean();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Upcoming</p>
      <h1 className="mt-2 font-head text-3xl font-bold text-navy">Events</h1>

      <div className="mt-8 space-y-4">
        {events.length === 0 && <p className="text-sm text-slate-500">No upcoming events right now.</p>}
        {events.map((e) => (
          <div key={String(e._id)} className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs text-gold">{new Date(e.startAt).toLocaleDateString()}</p>
            <h2 className="font-head text-lg font-bold text-navy">{e.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{e.description}</p>
            <p className="mt-1 text-xs text-slate-400">{e.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
