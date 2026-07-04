import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Volunteer from "@/models/Volunteer";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const items = await Volunteer.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function PATCH(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  await connectDB();
  const volunteer = await Volunteer.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json({ success: true, volunteer });
}
