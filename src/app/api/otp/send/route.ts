import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import OtpToken from "@/models/OtpToken";
import { generateOtp, sendOtpSms } from "@/lib/otp";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
  }

  await connectDB();

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await OtpToken.create({ phone, code, expiresAt });
  await sendOtpSms(phone, code);

  return NextResponse.json({ sent: true });
}
