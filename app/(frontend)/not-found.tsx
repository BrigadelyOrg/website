import Link from "next/link";

/** 404 page for the marketing site and blog, rendered inside the site Header and Footer. */
export default function NotFound() {
  return (
    <main>
      <section className="bg-[#F4EFE4] px-6 pb-24 pt-40 md:pb-32 lg:pt-44">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#007a3d]">
            404
          </p>
          <h1 className="mt-6 font-sans text-5xl font-black leading-[0.93] tracking-[-0.03em] text-[#111111] md:text-6xl">
            This page could not be <span className="text-[#007a3d]">found.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md font-sans text-lg leading-relaxed text-gray-600">
            The link may be broken, or the page may have moved.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-[#007a3d] px-8 py-4 font-sans text-sm font-semibold text-white transition duration-200 hover:bg-[#005a2d]"
            >
              Go to the home page
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-[#111111]/20 px-8 py-4 font-sans text-sm font-semibold text-[#111111] transition duration-200 hover:border-[#111111]/50"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
