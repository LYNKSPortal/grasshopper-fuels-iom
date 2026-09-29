import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session";

export { ADMIN_SESSION_COOKIE };

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const expectedUsername = requireEnv("ADMIN_USERNAME");
  const passwordHash = requireEnv("ADMIN_PASSWORD_HASH");

  // Always run the (constant-time) hash comparison, even on a username
  // mismatch, so a wrong username doesn't respond noticeably faster than a
  // wrong password and leak which one was incorrect via timing.
  const passwordMatches = await bcrypt.compare(password, passwordHash);
  return username === expectedUsername && passwordMatches;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}
