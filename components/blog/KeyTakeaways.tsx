/** The "Key takeaways" box at the top of an article (set per article in /admin). */
export default function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <section aria-labelledby="key-takeaways-heading" className="rounded-2xl bg-[#F4EFE4] px-6 py-7 md:px-8 md:py-8">
      <h2
        id="key-takeaways-heading"
        className="font-sans text-xl font-extrabold tracking-[-0.01em] text-[#111111]"
      >
        Key takeaways
      </h2>
      <ol className="mt-5 space-y-4">
        {items.map((item, index) => (
          <li key={`${index}-${item}`} className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#111111] font-sans text-xs font-bold text-white"
            >
              {index + 1}
            </span>
            <p className="font-sans text-base leading-relaxed text-gray-700 md:text-[17px]">{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
