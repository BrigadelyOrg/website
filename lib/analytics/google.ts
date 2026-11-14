/**
 * Server only: the Google service account shared by GA4 and Search Console
 * (GA4_CLIENT_EMAIL / GA4_PRIVATE_KEY), and the errors both APIs have in common.
 *
 * payload.config.ts imports this (through the analytics endpoint), so it must
 * stay cheap to load: google-auth-library is imported on first use only.
 */
import type { JWT } from "google-auth-library";

export type ServiceAccountKey = "GA4_CLIENT_EMAIL" | "GA4_PRIVATE_KEY";

export interface ServiceAccount {
  clientEmail: string;
  privateKey: string;
}

export function readServiceAccount(env: NodeJS.ProcessEnv = process.env): ServiceAccount & {
  missing: ServiceAccountKey[];
} {
  const clientEmail = (env.GA4_CLIENT_EMAIL ?? "").trim();
  const privateKey = normalizePrivateKey(env.GA4_PRIVATE_KEY ?? "");
  const missing: ServiceAccountKey[] = [];
  if (!clientEmail) missing.push("GA4_CLIENT_EMAIL");
  if (!privateKey) missing.push("GA4_PRIVATE_KEY");
  return { clientEmail, privateKey, missing };
}

/**
 * Accepts the key the way people paste it: with real line breaks, or with the
 * literal "\n" escapes from the JSON key file, with or without wrapping quotes.
 */
export function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  const quote = key[0];
  if (key.length > 1 && (quote === '"' || quote === "'") && key.endsWith(quote)) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
}

// One client per account and scope per server instance; each caches its own access tokens.
const clients = new Map<string, JWT>();

/** A read-only service-account client for one Google API scope. */
export async function serviceAccountClient(account: ServiceAccount, scope: string): Promise<JWT> {
  const key = `${account.clientEmail} ${scope}`;
  const existing = clients.get(key);
  if (existing) return existing;
  const { JWT } = await import("google-auth-library");
  const client = new JWT({ email: account.clientEmail, key: account.privateKey, scopes: [scope] });
  clients.set(key, client);
  return client;
}

/** A setting that is present but unusable. */
export class GoogleConfigError extends Error {
  readonly hint: string;

  constructor(message: string, hint: string) {
    super(message);
    this.name = "GoogleConfigError";
    this.hint = hint;
  }
}

export interface GoogleProblem {
  error: string;
  /** What to do about it, when we can tell. */
  hint?: string;
}

export const messageOf = (error: unknown): string => (error instanceof Error ? error.message : String(error));

/** gRPC status code (GA4 SDK). */
export const grpcCodeOf = (error: unknown): unknown =>
  typeof error === "object" && error !== null && "code" in error ? error.code : undefined;

/** HTTP status (Search Console SDK and token endpoint). */
export const httpStatusOf = (error: unknown): number | undefined => {
  if (typeof error !== "object" || error === null) return undefined;
  if ("status" in error && typeof error.status === "number") return error.status;
  if ("response" in error && typeof error.response === "object" && error.response !== null) {
    const { response } = error;
    if ("status" in response && typeof response.status === "number") return response.status;
  }
  return undefined;
};

/**
 * Problems both APIs share: an unreadable key, rejected credentials, the API not
 * enabled in Google Cloud, a timeout. Null for anything API-specific.
 */
export function describeCommonGoogleError(error: unknown, apiName: string): GoogleProblem | null {
  if (error instanceof GoogleConfigError) return { error: error.message, hint: error.hint };

  const message = messageOf(error);
  if (/DECODER routines|PEM|private key|no start line|asn1/i.test(message)) {
    return {
      error: "GA4_PRIVATE_KEY couldn't be read.",
      hint: "Copy the private_key value from the service account's JSON key exactly, including the BEGIN and END lines.",
    };
  }
  if (/has not been used|is disabled|SERVICE_DISABLED|accessNotConfigured/i.test(message)) {
    return {
      error: `The ${apiName} isn't enabled for the service account's Google Cloud project.`,
      hint: `Google Cloud console → APIs & Services → enable “${apiName}”, then try again in a few minutes.`,
    };
  }
  if (
    grpcCodeOf(error) === 16 ||
    httpStatusOf(error) === 401 ||
    /invalid_grant|invalid jwt|account not found|invalid authentication credentials/i.test(message)
  ) {
    return {
      error: "Google rejected the service account credentials.",
      hint: "Check that GA4_CLIENT_EMAIL and GA4_PRIVATE_KEY come from the same JSON key and that the key hasn't been deleted.",
    };
  }
  if (grpcCodeOf(error) === 4 || /timed? ?out|deadline|ETIMEDOUT|ECONNRESET/i.test(message)) {
    return { error: `The ${apiName} took too long to respond.`, hint: "Try again in a moment." };
  }
  return null;
}
