import { awsCredentialsProvider } from "@vercel/oidc-aws-credentials-provider";
import { attachDatabasePool } from "@vercel/functions";
import { Signer } from "@aws-sdk/rds-signer";
import { Pool, type ClientBase, type QueryResultRow } from "pg";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const region = requireEnv("AWS_REGION");
const host = requireEnv("DB_HOST");
const port = Number(process.env.DB_PORT ?? 5432);
const user = requireEnv("DB_USER");
const database = process.env.DB_NAME || "postgres";
const roleArn = requireEnv("AWS_ROLE_ARN");

// No static database password is used. Vercel's OIDC token is exchanged for
// short-lived AWS credentials (STS AssumeRoleWithWebIdentity), which are then
// used to mint a short-lived RDS IAM auth token per connection.
const signer = new Signer({
  hostname: host,
  port,
  username: user,
  region,
  credentials: awsCredentialsProvider({
    roleArn,
    clientConfig: { region },
  }),
});

const pool = new Pool({
  host,
  port,
  user,
  database,
  password: () => signer.getAuthToken(),
  // This cluster's endpoint presents a publicly trusted Amazon certificate
  // chain (Amazon Root CA 1 / Starfield), not the RDS-specific CA bundle, so
  // Node's default trusted CA store is used to verify it.
  ssl: { rejectUnauthorized: true },
  max: 20,
});

attachDatabasePool(pool);

export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: unknown[]
) {
  return pool.query<T>(sql, params);
}

export async function withConnection<T>(
  fn: (client: ClientBase) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}
