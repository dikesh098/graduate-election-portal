import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Volunteer from "@/models/Volunteer";
import { volunteerSchema } from "@/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = volunteerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  const volunteer = await Volunteer.create(parsed.data);

  return NextResponse.json({ success: true, id: volunteer._id }, { status: 201 });
}
