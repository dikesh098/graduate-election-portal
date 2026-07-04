import { NextRequest } from "next/server";
import { verifyAdminToken, ADMIN_COOKIE_NAME, AdminTokenPayload } from "@/lib/auth";

export function requireAdmin(req: NextRequest): AdminTokenPayload | null {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
