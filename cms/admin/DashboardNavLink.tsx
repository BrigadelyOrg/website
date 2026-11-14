"use client";

import { Link, useConfig, useTranslation } from "@payloadcms/ui";
import { usePathname } from "next/navigation";
import { formatAdminURL } from "payload/shared";

/**
 * "Dashboard" at the top of the admin sidebar (admin.components.beforeNavLinks
 * in payload.config.ts). Payload's sidebar lists only collections, so the
 * dashboard (with the blog analytics) was reachable only through the logo.
 *
 * Built from the same pieces and classes as Payload's own nav links, so it
 * looks and behaves the same: bold with the side bar when it's the current
 * page, and plain text instead of a link while you're on it.
 */
export function DashboardNavLink() {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig();
  const { t } = useTranslation();
  const pathname = usePathname();

  const href = formatAdminURL({ adminRoute, path: "" });
  const isCurrent = pathname === href || pathname === `${href}/`;
  const label = (
    <>
      {isCurrent ? <div className="nav__link-indicator" /> : null}
      <span className="nav__link-label">{t("general:dashboard")}</span>
    </>
  );

  return (
    // Same gap as between Payload's nav groups.
    <div style={{ width: "100%", marginBottom: 10 }}>
      {isCurrent ? (
        <div className="nav__link" id="nav-dashboard">
          {label}
        </div>
      ) : (
        <Link className="nav__link" href={href} id="nav-dashboard" prefetch={false}>
          {label}
        </Link>
      )}
    </div>
  );
}
