import path from "node:path";
import { fileURLToPath } from "node:url";

import { withPayload } from "@payloadcms/next/withPayload";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the project root: a stray package-lock.json in a parent folder
  // (e.g. the home directory) would otherwise make Next guess the root.
  turbopack: {
    root: projectRoot,
  },
  // The GA4 Data API client loads Google's API definitions from its own files at
  // runtime, so require it (and the auth library it shares) from node_modules
  // instead of bundling them.
  serverExternalPackages: ["@google-analytics/data", "google-auth-library"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",         value: "1; mode=block" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

// withPayload wires Payload's admin (/admin) and REST API (/api) into Next.js.
export default withPayload(nextConfig, { devBundleServerPackages: false });
