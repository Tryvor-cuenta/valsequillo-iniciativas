"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function UserRoleButton({ userId, currentRole }: { userId: string; currentRole: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const newRole = currentRole === "admin" ? "editor" : "admin";

  async function toggleRole() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("user_roles")
      .upsert({ user_id: userId, role: newRole }, { onConflict: "user_id" });
    if (error) { toast.error("Error al cambiar rol"); }
    else { toast.success(`Rol cambiado a ${newRole}`); router.refresh(); }
    setLoading(false);
  }

  return (
    <Button size="sm" variant="outline" onClick={toggleRole} disabled={loading}>
      {loading ? "..." : `Hacer ${newRole}`}
    </Button>
  );
}
