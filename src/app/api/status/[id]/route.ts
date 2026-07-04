import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration, { IRegistration } from "@/models/Registration";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const registration = await Registration.findOne({ trackingId: id.toUpperCase() }).lean<IRegistration>();

  if (!registration) {
    return NextResponse.json({ error: "No application found with that tracking ID." }, { status: 404 });
  }

  return NextResponse.json({
    trackingId: registration.trackingId,
    fullName: registration.fullName,
    status: registration.status,
    statusHistory: registration.statusHistory,
    submittedAt: registration.createdAt,
  });
}
