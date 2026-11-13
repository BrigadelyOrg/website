import type { FieldHook, TextField } from "payload";

const MAX_SLUG_LENGTH = 80;

/** "PAYE in 2026: A Guide" → "paye-in-2026-a-guide" */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents: "é" → "e"
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/g, "");
}

function readString(source: unknown, key: string): string | undefined {
  if (typeof source !== "object" || source === null) return undefined;
  const value: unknown = (source as Record<string, unknown>)[key];
  return typeof value === "string" ? value : undefined;
}

/**
 * A unique, URL-safe `slug` field. Writers can type one (it is normalised on
 * save) or leave it blank to have it generated from `sourceField`.
 */
export function slugField(sourceField = "title"): TextField {
  const generateSlug: FieldHook = ({ value, data, originalDoc, operation }) => {
    const typed = typeof value === "string" ? slugify(value) : "";
    if (typed) return typed;

    // A partial update that doesn't send the slug keeps the stored one, so a
    // live URL never changes just because the title was edited.
    if (value === undefined && operation === "update") return value;

    const source = readString(data, sourceField) ?? readString(originalDoc, sourceField);
    return (source && slugify(source)) || value;
  };

  return {
    name: "slug",
    type: "text",
    // `required` keeps the column NOT NULL and the generated type non-optional.
    required: true,
    unique: true,
    admin: {
      position: "sidebar",
      description: `Used in the URL. Leave blank to generate it from the ${sourceField}.`,
    },
    hooks: {
      beforeValidate: [generateSlug],
    },
    // Accept a blank slug as long as one can be generated, because the admin
    // form validates before the hook above has had a chance to fill it in.
    validate: (value, { data, siblingData }) => {
      const source = readString(siblingData, sourceField) ?? readString(data, sourceField);
      if (slugify(value ?? "") || (source && slugify(source))) return true;
      return `Enter a slug, or a ${sourceField} it can be generated from.`;
    },
  };
}
