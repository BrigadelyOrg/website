import type { FieldHook, TextField } from "payload";

import { slugify } from "../../lib/slugify";

function readString(source: unknown, key: string): string | undefined {
  if (typeof source !== "object" || source === null) return undefined;
  const value: unknown = (source as Record<string, unknown>)[key];
  return typeof value === "string" ? value : undefined;
}

type SlugFieldOptions = {
  /**
   * Shortens the source text before it becomes a slug, e.g. drop a spelled-out
   * abbreviation. When the result has nothing to slugify, the full text is used.
   */
  fromSource?: (source: string) => string;
};

/**
 * A unique, URL-safe `slug` field. Writers can type one (it is normalised on
 * save) or leave it blank to have it generated from `sourceField`.
 */
export function slugField(sourceField = "title", { fromSource }: SlugFieldOptions = {}): TextField {
  const slugFromSource = (source: string): string =>
    (fromSource && slugify(fromSource(source))) || slugify(source);

  const generateSlug: FieldHook = ({ value, data, originalDoc, operation }) => {
    const typed = typeof value === "string" ? slugify(value) : "";
    if (typed) return typed;

    // A partial update that doesn't send the slug keeps the stored one, so a
    // live URL never changes just because the title was edited.
    if (value === undefined && operation === "update") return value;

    const source = readString(data, sourceField) ?? readString(originalDoc, sourceField);
    return (source && slugFromSource(source)) || value;
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
      if (slugify(value ?? "") || (source && slugFromSource(source))) return true;
      return `Enter a slug, or a ${sourceField} it can be generated from.`;
    },
  };
}
