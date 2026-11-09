"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ActiveLesson = {
  /** Lesson currently open in the viewer, or null before anything is chosen. */
  activeLessonId: string | null;
  /** Called by whichever panel the person clicked in. */
  setActiveLessonId: (id: string) => void;
};

const Ctx = createContext<ActiveLesson>({
  activeLessonId: null,
  setActiveLessonId: () => {},
});

/**
 * Keeps the left sidebar and the lesson page pointing at the same lesson.
 *
 * The sidebar used to read the open lesson from ?lesson= in the URL, while
 * the viewer's own rail and Next button only moved local state — so clicking
 * in one panel left the other behind. Both now read and write this context.
 *
 * The URL is still kept in step via history.replaceState so a refresh or a
 * shared link lands on the same lesson, but that write deliberately does not
 * go through the router: a router navigation would re-render the server
 * component on every lesson change and make stepping through a day crawl.
 */
export function ActiveLessonProvider({ children }: { children: ReactNode }) {
  const [activeLessonId, setActive] = useState<string | null>(null);

  const setActiveLessonId = useCallback((id: string) => {
    setActive(id);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.get("lesson") !== id) {
        url.searchParams.set("lesson", id);
        window.history.replaceState(null, "", url.toString());
      }
    }
  }, []);

  return (
    <Ctx.Provider value={{ activeLessonId, setActiveLessonId }}>
      {children}
    </Ctx.Provider>
  );
}

export function useActiveLesson() {
  return useContext(Ctx);
}
