import { Search } from "lucide-react";
import Form from "next/form";

/**
 * Compact search on a term's page. Submitting opens /glossary?q=…, where the
 * directory's instant search takes over (a plain GET form, so it also works
 * before JavaScript loads).
 */
export default function QuickSearch() {
  return (
    <Form action="/glossary" role="search" className="relative w-full sm:w-72">
      <label htmlFor="glossary-quick-search" className="sr-only">
        Search the glossary
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      />
      <input
        id="glossary-quick-search"
        name="q"
        type="search"
        required
        placeholder="Search the glossary"
        autoComplete="off"
        enterKeyHint="search"
        className="h-11 w-full rounded-full border border-black/10 bg-white pl-11 pr-4 font-sans text-sm text-[#111111] outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </Form>
  );
}
