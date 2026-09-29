import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminCredentials } from "@/lib/admin-auth";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
} from "@/lib/admin-session";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const username = body?.username;
  const password = body?.password;

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!(await verifyAdminCredentials(username, password))) {
    // Small fixed delay to slow down naive brute-force attempts.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return NextResponse.json(
      { error: "Incorrect username or password." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, await createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  return NextResponse.json({ success: true });
}
