import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return user;
}
