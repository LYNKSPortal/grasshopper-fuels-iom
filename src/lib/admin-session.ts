// Signed, expiring admin session tokens. Implemented with the Web Crypto API
// (available as a global in both the Node.js and Edge runtimes) so this
// module can be safely imported from src/proxy.ts, which runs on the Edge
// runtime, as well as from Node-only route handlers.

export const ADMIN_SESSION_COOKIE = "gf_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours, in seconds

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toBase64Url(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

async function sign(payload: string): Promise<string> {
  const key = await hmacKey(requireEnv("ADMIN_SESSION_SECRET"));
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(signature);
}

export async function createAdminSessionToken(): Promise<string> {
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = String(expiresAt);
  return `${payload}.${await sign(payload)}`;
}

export async function verifyAdminSessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  try {
    const expectedSignature = await sign(payload);
    return timingSafeEqual(signature, expectedSignature);
  } catch {
    return false;
  }
}
