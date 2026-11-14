import { Button } from "@payloadcms/ui";

import type { Ga4EnvKey } from "../../../lib/analytics/types";
import styles from "./dashboard.module.scss";

const ENV_HELP: Record<Ga4EnvKey, string> = {
  GA4_PROPERTY_ID: "the numeric Property ID (GA4 → Admin → Property details), not the G-… measurement ID",
  GA4_CLIENT_EMAIL: "client_email from the service account's JSON key",
  GA4_PRIVATE_KEY: "private_key from the same JSON key",
};

/** Shown until the GA4 Data API variables are set. */
export function SetupBanner({ missing }: { missing: Ga4EnvKey[] }) {
  return (
    <div className={`${styles.banner} ${styles.bannerSetup}`} role="status">
      <h3 className={styles.bannerTitle}>Connect Google Analytics to see how the blog is doing</h3>
      <p>
        Add {missing.length === 1 ? "this environment variable" : "these environment variables"} to <code>.env</code>{" "}
        for local development and to Netlify (Site configuration → Environment variables), then redeploy:
      </p>
      <ul className={styles.envList}>
        {missing.map((key) => (
          <li key={key}>
            <code>{key}</code>: {ENV_HELP[key]}
          </li>
        ))}
      </ul>
      <p>
        First, in Google Cloud, enable the <strong>Google Analytics Data API</strong> and create a service account
        with a JSON key. Then in GA4 → Admin → Property access management, add the service account&rsquo;s email as
        a <strong>Viewer</strong>. The full steps are in <code>.env.example</code>.
      </p>
    </div>
  );
}

/** Shown when Google (or the endpoint) returns an error. */
export function ErrorBanner({ error, hint, onRetry }: { error: string; hint?: string; onRetry: () => void }) {
  return (
    <div className={`${styles.banner} ${styles.bannerError}`} role="alert">
      <h3 className={styles.bannerTitle}>{error}</h3>
      {hint ? <p>{hint}</p> : null}
      <div className={styles.bannerActions}>
        <Button buttonStyle="secondary" size="small" margin={false} onClick={onRetry}>
          Try again
        </Button>
      </div>
    </div>
  );
}
