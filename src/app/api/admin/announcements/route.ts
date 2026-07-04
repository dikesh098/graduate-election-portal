import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Announcement from "@/models/Announcement";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  await connectDB();
  const items = await Announcement.find().sort({ publishedAt: -1 }).limit(50).lean();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, body, category } = await req.json();
  if (!title || !body) {
    return NextResponse.json({ error: "title and body are required" }, { status: 400 });
  }

  await connectDB();
  const announcement = await Announcement.create({
    title,
    body,
    category: category || "general",
    createdBy: admin.email,
  });

  return NextResponse.json({ success: true, announcement }, { status: 201 });
}
