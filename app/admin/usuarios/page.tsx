import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UserRoleButton from "./UserRoleButton";

export const metadata: Metadata = { title: "Usuarios — Admin" };

export default async function AdminUsuariosPage() {
  let users: { id: string; email: string; role: string }[] = [];

  try {
    const supabase = createAdminClient();
    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");

    users = (authUsers?.users ?? []).map((u) => ({
      id: u.id,
      email: u.email ?? "—",
      role: roles?.find((r) => r.user_id === u.id)?.role ?? "editor",
    }));
  } catch {}

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Usuarios</h1>
      <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="w-32">Cambiar rol</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.email}</TableCell>
                <TableCell>
                  <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <UserRoleButton userId={u.id} currentRole={u.role} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
