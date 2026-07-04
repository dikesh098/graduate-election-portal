import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import OtpToken from "@/models/OtpToken";

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json();

  if (!phone || !code) {
    return NextResponse.json({ error: "Phone and code are required." }, { status: 400 });
  }

  await connectDB();

  const token = await OtpToken.findOne({
    phone,
    code,
    consumed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!token) {
    return NextResponse.json({ error: "Invalid or expired code." }, { status: 400 });
  }

  token.consumed = true;
  await token.save();

  return NextResponse.json({ verified: true });
}
