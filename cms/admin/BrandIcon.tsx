import Image from "next/image";

/** Brigadely "B" mark in the admin's top-left home link (replaces Payload's icon). */
export function BrandIcon() {
  return (
    <Image
      src="/img/Icon.png"
      alt="Brigadely"
      width={18}
      height={18}
      // Payload's slot is 18px (16px on small screens): scale down, never stretch.
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
    />
  );
}
