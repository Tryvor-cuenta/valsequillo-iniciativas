import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Formación — Admin" };

export default async function AdminFormacionPage() {
  let courses: Course[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("courses").select("*").order("fecha_inicio");
    courses = (data as Course[]) ?? [];
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Formación</h1>
        <LinkButton href="/admin/formacion/new" className="bg-[#00695C] hover:bg-[#004D40]">
          <Plus className="h-4 w-4 mr-1.5" /> Nuevo curso
        </LinkButton>
      </div>
      <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Título</TableHead>
              <TableHead>Modalidad</TableHead>
              <TableHead>Horas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.titulo}</TableCell>
                <TableCell className="text-gray-500">{c.modalidad ?? "—"}</TableCell>
                <TableCell className="text-gray-500">{c.horas ? `${c.horas}h` : "—"}</TableCell>
                <TableCell>
                  <Badge variant={c.activo ? "default" : "outline"}
                    className={c.activo ? "bg-green-100 text-green-800 border-green-200" : ""}>
                    {c.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/formacion/${c.id}`} className="text-xs text-[#00695C] hover:underline">Editar</Link>
                    <DeleteButton id={c.id} table="courses" />
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
