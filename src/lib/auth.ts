import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET as string;
const COOKIE_NAME = "gep_admin_token";
const TOKEN_TTL = "8h";

export type AdminTokenPayload = {
  id: string;
  email: string;
  role: "super_admin" | "staff";
};

export function signAdminToken(payload: AdminTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 12);
}

export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
