import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";
import { getStaffUser } from "@/lib/staff";

export const instant = false;

/**
 * The panel moved to /staff. Staff who still have the old URL bookmarked
 * get sent on; everyone else gets a 404, the same as any other address
 * that doesn't exist here.
 */
export default async function LegacyAdminRedirect() {
  await connection();
  if (await getStaffUser()) redirect("/staff");
  notFound();
}
