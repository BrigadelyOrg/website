import Image from "next/image";

/** Brigadely wordmark on the admin's login and password screens (replaces Payload's logo). */
export function BrandLogo() {
  return <Image src="/img/logo1.png" alt="Brigadely" width={200} height={51} preload />;
}
