import type { Access, FieldAccess } from "payload";

/**
 * The two kinds of CMS account (the `role` field on users): admins manage
 * everything, including other people's accounts, promos and site settings;
 * writers manage articles and glossary entries, and only their own profile.
 */
export const ROLES = [
  { label: "Admin", value: "admin" },
  { label: "Writer", value: "writer" },
] as const;

export type Role = (typeof ROLES)[number]["value"];

type AccountLike = { id: number | string; role?: Role | null } | null | undefined;

export function isAdmin(user: AccountLike): boolean {
  return user?.role === "admin";
}

/** Any signed-in account. */
export const signedIn: Access = ({ req: { user } }) => Boolean(user);

export const adminsOnly: Access = ({ req: { user } }) => isAdmin(user);

/** Admins: every account. Writers: only their own. */
export const adminsOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (isAdmin(user)) return true;
  return { id: { equals: user.id } };
};

/** Field level: only admins may set or change the field; others see it read-only. */
export const adminsOnlyField: FieldAccess = ({ req: { user } }) => isAdmin(user);
