import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const district = searchParams.get("district");
  const status = searchParams.get("status");
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "25", 10);

  await connectDB();

  const filter: Record<string, unknown> = {};
  if (district) filter.district = district;
  if (status) filter.status = status;
  if (q) {
    filter.$or = [
      { fullName: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { trackingId: { $regex: q, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Registration.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Registration.countDocuments(filter),
  ]);

  return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
}

export async function PATCH(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status, note } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: "id and status are required" }, { status: 400 });
  }

  await connectDB();

  const registration = await Registration.findByIdAndUpdate(
    id,
    {
      status,
      $push: { statusHistory: { status, note, at: new Date() } },
    },
    { new: true }
  );

  if (!registration) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, registration });
}
