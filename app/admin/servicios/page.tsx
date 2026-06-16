import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import type { Service } from "@/types";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Servicios — Admin" };

export default async function AdminServiciosPage() {
  let services: Service[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("services").select("*").order("orden");
    services = (data as Service[]) ?? [];
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Servicios</h1>
        <LinkButton href="/admin/servicios/new" className="bg-[#00695C] hover:bg-[#004D40]">
          <Plus className="h-4 w-4 mr-1.5" /> Nuevo servicio
        </LinkButton>
      </div>
      <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Orden</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="text-gray-500">{s.orden}</TableCell>
                <TableCell className="font-medium">{s.titulo}</TableCell>
                <TableCell>
                  <Badge variant={s.activo ? "default" : "outline"}
                    className={s.activo ? "bg-green-100 text-green-800 border-green-200" : ""}>
                    {s.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/servicios/${s.id}`} className="text-xs text-[#00695C] hover:underline">Editar</Link>
                    <DeleteButton id={s.id} table="services" />
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
