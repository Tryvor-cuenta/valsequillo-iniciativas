import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/types";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Empleos — Admin" };

export default async function AdminEmpleosPage() {
  let jobs: Job[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    jobs = (data as Job[]) ?? [];
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Empleos</h1>
        <LinkButton href="/admin/empleos/new" className="bg-[#00695C] hover:bg-[#004D40]">
          <Plus className="h-4 w-4 mr-1.5" /> Nueva oferta
        </LinkButton>
      </div>
      <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Título</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((j) => (
              <TableRow key={j.id}>
                <TableCell className="font-medium">{j.titulo}</TableCell>
                <TableCell className="text-gray-500">{j.empresa ?? "—"}</TableCell>
                <TableCell className="text-sm text-gray-500">
                  {j.deadline ? new Date(j.deadline).toLocaleDateString("es-ES") : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={j.activo ? "default" : "outline"}
                    className={j.activo ? "bg-green-100 text-green-800 border-green-200" : ""}>
                    {j.activo ? "Activa" : "Inactiva"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/empleos/${j.id}`} className="text-xs text-[#00695C] hover:underline">Editar</Link>
                    <DeleteButton id={j.id} table="jobs" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
