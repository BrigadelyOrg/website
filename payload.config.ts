import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "./cms/collections/Categories";
import { Media } from "./cms/collections/Media";
import { Posts } from "./cms/collections/Posts";
import { Users } from "./cms/collections/Users";
import { editor } from "./cms/editor";
import { blogAnalyticsEndpoint } from "./cms/endpoints/blogAnalytics";
import { generateDescription, generateTitle, generateURL } from "./cms/seo";
import { migrations } from "./migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Uploads go to S3 when all four variables are set. Otherwise (local dev only)
// they are written to ./media, which is gitignored.
const s3 = {
  bucket: process.env.S3_BUCKET ?? "",
  region: process.env.S3_REGION ?? "",
  accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
};
const s3Enabled = Object.values(s3).every(Boolean);
// Only for S3-compatible services (e.g. Neon object storage); unset for AWS S3.
const s3Endpoint = process.env.S3_ENDPOINT || undefined;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
    // Brigadely branding. Colours live in app/(payload)/custom.scss.
    // Always light: by default the admin follows the OS (dark mode = black UI).
    theme: "light",
    components: {
      // GA4 blog analytics above the collection cards on the dashboard.
      beforeDashboard: ["/cms/admin/analytics/BlogAnalyticsDashboard#BlogAnalyticsDashboard"],
      // "Dashboard" link at the top of the sidebar (Payload lists only collections there).
      beforeNavLinks: ["/cms/admin/DashboardNavLink#DashboardNavLink"],
      graphics: {
        Logo: "/cms/admin/BrandLogo#BrandLogo",
        Icon: "/cms/admin/BrandIcon#BrandIcon",
      },
    },
    meta: {
      // Payload adds the space before it: "Dashboard | Brigadely CMS".
      titleSuffix: "| Brigadely CMS",
      // Replaces Payload's favicons (custom icons are used instead, not added).
      icons: [{ rel: "icon", type: "image/x-icon", url: "/favicon.ico" }],
    },
  },
  collections: [Posts, Categories, Media, Users],
  // GET /api/analytics/blog: GA4 numbers for the dashboard (signed-in users only).
  endpoints: [blogAnalyticsEndpoint],
  editor,
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? "",
    },
    // Schema changes only through committed migrations (`npm run migrate:create`),
    // never by auto-syncing a database, which matters when dev and prod share Neon.
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
    // In production, pending migrations run automatically when Payload starts.
    // Locally, run `npm run migrate` after pulling schema changes.
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    seoPlugin({
      generateTitle,
      generateDescription,
      generateURL,
    }),
    s3Storage({
      enabled: s3Enabled,
      // Keep the plugin's columns (media._object_key, media.prefix) in the
      // schema even when S3 is disabled, so migrations generated with or
      // without S3 env vars match the production database.
      alwaysInsertFields: true,
      collections: {
        media: true,
      },
      bucket: s3.bucket,
      config: {
        region: s3.region,
        credentials: {
          accessKeyId: s3.accessKeyId,
          secretAccessKey: s3.secretAccessKey,
        },
        // S3-compatible services address buckets by path (endpoint/bucket/key);
        // Neon's TLS certificate doesn't cover AWS-style bucket subdomains.
        ...(s3Endpoint ? { endpoint: s3Endpoint, forcePathStyle: true } : {}),
      },
    }),
  ],
  onInit: async (payload) => {
    if (!s3Enabled && process.env.NODE_ENV === "production") {
      payload.logger.warn(
        "S3 is not configured (S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY). " +
          "Uploads are being written to the container's disk and will be lost on the next deploy.",
      );
    }
  },
});
