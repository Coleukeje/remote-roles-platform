import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/access-control";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
