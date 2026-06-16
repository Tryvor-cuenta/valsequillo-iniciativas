import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import type { Tender, TenderStatus } from "@/types";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Licitaciones — Admin" };

const STATUS_LABELS: Record<TenderStatus, string> = {
  en_plazo: "En plazo",
  adjudicada: "Adjudicada",
  cerrada: "Cerrada",
};

export default async function AdminLicitacionesPage() {
  let tenders: Tender[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("tenders").select("*").order("created_at", { ascending: false });
    tenders = (data as Tender[]) ?? [];
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Licitaciones</h1>
        <LinkButton href="/admin/licitaciones/new" className="bg-[#00695C] hover:bg-[#004D40]">
          <Plus className="h-4 w-4 mr-1.5" /> Nueva licitación
        </LinkButton>
      </div>
      <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Título</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenders.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium max-w-xs truncate">{t.titulo}</TableCell>
                <TableCell className="text-sm text-gray-500">
                  {t.deadline ? new Date(t.deadline).toLocaleDateString("es-ES") : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{STATUS_LABELS[t.estado]}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/licitaciones/${t.id}`} className="text-xs text-[#00695C] hover:underline">Editar</Link>
                    <DeleteButton id={t.id} table="tenders" />
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
