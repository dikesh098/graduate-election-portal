import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { adminLoginSchema } from "@/types";
import { comparePassword, signAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = adminLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password format." }, { status: 400 });
  }

  await connectDB();

  const { email, password } = parsed.data;
  const user = await AdminUser.findOne({ email: email.toLowerCase() });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = signAdminToken({ id: user._id.toString(), email: user.email, role: user.role });

  const res = NextResponse.json({ success: true, name: user.name, role: user.role });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}
