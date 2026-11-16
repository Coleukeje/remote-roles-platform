import { curriculum } from "@/data/curriculum";

/** Every lesson id in the programme. Completing all of them is what makes
 *  a trainee eligible — so adding a lesson automatically raises the bar. */
export function allLessonIds(): string[] {
  const ids: string[] = [];
  for (const week of curriculum) {
    for (const day of week.days) {
      for (const lesson of day.lessons) ids.push(lesson.id);
    }
  }
  return ids;
}

export const TOTAL_LESSONS = allLessonIds().length;

export type Eligibility = {
  completed: number;
  total: number;
  eligible: boolean;
  missing: string[];
};

export function checkEligibility(completedIds: string[]): Eligibility {
  const done = new Set(completedIds);
  const required = allLessonIds();
  const missing = required.filter((id) => !done.has(id));
  return {
    completed: required.length - missing.length,
    total: required.length,
    eligible: missing.length === 0,
    missing,
  };
}

/** RR-2026-7KQ4D2 — year for readability, the rest random enough that
 *  codes can't be guessed by counting up from someone else's. */
export function generateCertificateCode(): string {
  const alphabet = "ACDEFGHJKLMNPQRTUVWXY3479"; // no 0/O, 1/I, 2/Z, 5/S, 6/G, 8/B
  let body = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) body += alphabet[b % alphabet.length];
  return `RR-${new Date().getFullYear()}-${body}`;
}

export function formatIssueDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
