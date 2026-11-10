import { notFound } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/access-control";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The admin check reads the session, which is request-time work.
  await connection();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Non-admins shouldn't even know this route exists.
  if (!user || !isAdmin(user.email ?? null)) {
    notFound();
  }

  return <>{children}</>;
}
