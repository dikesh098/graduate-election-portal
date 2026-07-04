import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  await connectDB();
  const items = await Event.find().sort({ startAt: 1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, location, startAt, endAt } = await req.json();
  if (!title || !description || !location || !startAt) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();
  const event = await Event.create({ title, description, location, startAt, endAt });
  return NextResponse.json({ success: true, event }, { status: 201 });
}
