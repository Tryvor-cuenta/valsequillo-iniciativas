import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Proyectos — Admin" };

export default async function AdminProyectosPage() {
  let projects: Project[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("projects").select("*").order("orden");
    projects = (data as Project[]) ?? [];
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
        <LinkButton href="/admin/proyectos/new" className="bg-[#00695C] hover:bg-[#004D40]">
          <Plus className="h-4 w-4 mr-1.5" /> Nuevo proyecto
        </LinkButton>
      </div>
      <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Título</TableHead>
              <TableHead>Etiqueta</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.titulo}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{p.etiqueta ?? "—"}</Badge></TableCell>
                <TableCell><Badge variant="outline">{p.estado}</Badge></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/proyectos/${p.id}`} className="text-xs text-[#00695C] hover:underline">Editar</Link>
                    <DeleteButton id={p.id} table="projects" />
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
