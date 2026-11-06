/**
 * Pure access-control constants and helpers.
 *
 * This module has NO server-only imports, so it is safe to import from
 * client components. Server-side helpers that need Supabase cookies live
 * in `access-control.ts`.
 */

export type AccessLevel = "free" | "full";

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  access_level: AccessLevel;
  payment_status: string;
}

// Free content: everything in w1d1 (Welcome, Syllabus, Points System,
// Telemarketing Fundamentals, Telemarketing Quiz).
// Everything from w1d2 onward requires "full" access.
const FREE_DAYS = new Set(["w1d1"]);

export function isDayFree(dayId: string): boolean {
  return FREE_DAYS.has(dayId);
}

export function isContentLocked(
  dayId: string,
  accessLevel: AccessLevel,
): boolean {
  if (accessLevel === "full") return false;
  return !isDayFree(dayId);
}

/**
 * Admins are identified by email. Add admin emails to this array.
 */
const ADMIN_EMAILS = ["ukejecole@gmail.com"];

export function isAdmin(email: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/** Payment amount in kobo (₦80,000 = 8,000,000 kobo) */
export const PAYMENT_AMOUNT_KOBO = 8_000_000;
export const PAYMENT_AMOUNT_NAIRA = 80_000;
export const PAYMENT_CURRENCY = "NGN";
