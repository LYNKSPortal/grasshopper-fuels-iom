import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "gf_admin_session";
export const ADMIN_SESSION_VALUE = "authenticated";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

export function verifyAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}
