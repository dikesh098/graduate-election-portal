import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "gep_admin_token";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  if (!isAdminPage) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Full signature verification happens server-side in API routes / server components
  // (jsonwebtoken needs the Node runtime, not the Edge runtime middleware uses).
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
