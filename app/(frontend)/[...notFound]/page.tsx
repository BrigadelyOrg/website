import { notFound } from "next/navigation";

// With two root layouts, (frontend) and (payload), there is no app-wide layout,
// so a URL matching no route would get Next's unstyled default 404. Catching it
// here renders (frontend)/not-found.tsx inside the site Header and Footer instead.
// Every real route (/admin, /api/*, /blog, ...) outranks this catch-all.
export default function UnmatchedRoute(): never {
  notFound();
}
