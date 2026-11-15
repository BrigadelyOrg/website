import { useEffect, useState } from "react";

/** A section counts as "being read" once its heading passes this line (just below the fixed header). */
const READING_LINE_PX = 140;

/**
 * The id of the section being read, for a table of contents: the last of `ids`
 * whose element has scrolled past the reading line. At the very bottom of the
 * page it's the last one, since a short final section can't reach the line.
 * Pass a stable array (e.g. from useMemo).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= READING_LINE_PX) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActiveId(atBottom ? ids[ids.length - 1] : current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return activeId;
}
