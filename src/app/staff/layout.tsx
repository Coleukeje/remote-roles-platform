import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getStaffUser } from "@/lib/staff";

export const instant = false;

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The staff check reads the session, which is request-time work.
  await connection();

  // Anyone who isn't staff gets the same 404 a made-up URL would give.
  // No redirect to login, no "forbidden" — nothing that confirms the
  // route exists.
  if (!(await getStaffUser())) notFound();

  return <>{children}</>;
}
