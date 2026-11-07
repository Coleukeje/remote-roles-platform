"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type ProgressState = {
  completed: Set<string>;
  confirmed: Set<string>;
  loading: boolean;
  toggleComplete: (lessonId: string) => void;
  toggleConfirm: (lessonId: string) => void;
};

/**
 * Loads and persists a trainee's per-lesson progress.
 *
 * Writes are optimistic: the tick flips immediately and the upsert
 * happens behind it. If the write fails we roll the local state back,
 * so the UI never claims progress the database didn't keep.
 */
export function useLessonProgress(): ProgressState {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (!cancelled) setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed, confirmed")
        .eq("user_id", user.id);

      if (cancelled) return;

      setUserId(user.id);

      if (error) {
        console.error("Could not load lesson progress", error.message);
      } else if (data) {
        setCompleted(
          new Set(data.filter((r) => r.completed).map((r) => r.lesson_id)),
        );
        setConfirmed(
          new Set(data.filter((r) => r.confirmed).map((r) => r.lesson_id)),
        );
      }

      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(
    async (
      lessonId: string,
      field: "completed" | "confirmed",
      value: boolean,
      rollback: () => void,
    ) => {
      if (!userId) return;

      const supabase = createClient();
      const { error } = await supabase.from("lesson_progress").upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          [field]: value,
          ...(field === "completed"
            ? { completed_at: value ? new Date().toISOString() : null }
            : {}),
        },
        { onConflict: "user_id,lesson_id" },
      );

      if (error) {
        console.error("Could not save lesson progress", error.message);
        rollback();
      }
    },
    [userId],
  );

  const toggleComplete = useCallback(
    (lessonId: string) => {
      let nextValue = false;
      setCompleted((prev) => {
        const next = new Set(prev);
        if (next.has(lessonId)) {
          next.delete(lessonId);
          nextValue = false;
        } else {
          next.add(lessonId);
          nextValue = true;
        }
        return next;
      });

      persist(lessonId, "completed", !completed.has(lessonId), () =>
        setCompleted((prev) => {
          const back = new Set(prev);
          if (nextValue) back.delete(lessonId);
          else back.add(lessonId);
          return back;
        }),
      );
    },
    [completed, persist],
  );

  const toggleConfirm = useCallback(
    (lessonId: string) => {
      let nextValue = false;
      setConfirmed((prev) => {
        const next = new Set(prev);
        if (next.has(lessonId)) {
          next.delete(lessonId);
          nextValue = false;
        } else {
          next.add(lessonId);
          nextValue = true;
        }
        return next;
      });

      persist(lessonId, "confirmed", !confirmed.has(lessonId), () =>
        setConfirmed((prev) => {
          const back = new Set(prev);
          if (nextValue) back.delete(lessonId);
          else back.add(lessonId);
          return back;
        }),
      );
    },
    [confirmed, persist],
  );

  return { completed, confirmed, loading, toggleComplete, toggleConfirm };
}
