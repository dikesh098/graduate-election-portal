import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";
import Volunteer from "@/models/Volunteer";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const [total, verified, pending, byDistrict, activeVolunteers] = await Promise.all([
    Registration.countDocuments(),
    Registration.countDocuments({ status: "verified" }),
    Registration.countDocuments({ status: { $in: ["submitted", "under_review", "documents_pending"] } }),
    Registration.aggregate([
      { $group: { _id: "$district", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
    Volunteer.countDocuments({ status: "approved" }),
  ]);

  return NextResponse.json({
    total,
    verified,
    pending,
    activeVolunteers,
    byDistrict: byDistrict.map((d) => ({ district: d._id || "Unspecified", count: d.count })),
  });
}
