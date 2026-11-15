import {
  APIError,
  type CollectionBeforeChangeHook,
  type CollectionBeforeDeleteHook,
  type CollectionConfig,
  type PayloadRequest,
} from "payload";

import { adminsOnly, adminsOnlyField, adminsOrSelf, ROLES, signedIn } from "../access";
import { revalidateBlogHooks } from "../hooks/revalidateBlog";

const LAST_ADMIN = "There must always be at least one admin. Make someone else an admin first.";

async function countAdmins(req: PayloadRequest): Promise<number> {
  const { totalDocs } = await req.payload.count({
    collection: "users",
    where: { role: { equals: "admin" } },
    req,
  });
  return totalDocs;
}

/** The first account on an empty database is an admin, so someone can manage the others. */
const firstAccountIsAdmin: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== "create") return data;
  const { totalDocs } = await req.payload.count({ collection: "users", req });
  return totalDocs === 0 ? { ...data, role: "admin" } : data;
};

/** Nobody can demote the last admin (which would leave no one able to manage accounts). */
const keepAnAdmin: CollectionBeforeChangeHook = async ({ data, operation, originalDoc, req }) => {
  const demoting = operation === "update" && originalDoc?.role === "admin" && data.role && data.role !== "admin";
  if (demoting && (await countAdmins(req)) <= 1) throw new APIError(LAST_ADMIN, 400, null, true);
  return data;
};

/** …or delete them. */
const keepAnAdminOnDelete: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const account = await req.payload.findByID({ collection: "users", id, depth: 0, req });
  if (account.role === "admin" && (await countAdmins(req)) <= 1) {
    throw new APIError(LAST_ADMIN, 400, null, true);
  }
};

/**
 * Writers and admins who sign in to /admin; also the authors shown on articles.
 * Admins manage every account. Writers can only edit their own profile, and
 * can't change their role.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role", "roleTitle"],
  },
  access: {
    read: signedIn,
    create: adminsOnly,
    update: adminsOrSelf,
    delete: adminsOnly,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Shown as the author on blog articles.",
      },
    },
    {
      name: "roleTitle",
      type: "text",
      label: "Role title",
      admin: {
        description: 'Shown under your name on articles, e.g. "Finance Ops Lead".',
      },
    },
    {
      name: "bio",
      type: "textarea",
      maxLength: 400,
      admin: {
        description:
          'Two or three sentences about you, in the third person, shown in "About the author" at the end of your articles, e.g. "Ada Obi is a payroll specialist who…".',
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "writer",
      options: [...ROLES],
      access: {
        create: adminsOnlyField,
        update: adminsOnlyField,
      },
      admin: {
        position: "sidebar",
        description: "Admins manage every account, promos and settings. Writers can only edit their own profile.",
      },
    },
  ],
  hooks: {
    ...revalidateBlogHooks,
    beforeChange: [firstAccountIsAdmin, keepAnAdmin],
    beforeDelete: [keepAnAdminOnDelete],
  },
};
