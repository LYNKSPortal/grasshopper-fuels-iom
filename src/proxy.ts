import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = await verifyAdminSessionToken(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  );

  if (pathname === "/admin/login") {
    if (isAuthed) {
      return NextResponse.redirect(new URL("/admin/orders", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !isAuthed) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
