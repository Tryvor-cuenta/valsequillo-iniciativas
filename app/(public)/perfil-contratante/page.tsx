import type { Metadata } from "next";
import { ExternalLink, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import type { Tender, TenderStatus } from "@/types";

export const metadata: Metadata = {
  title: "Perfil del Contratante",
  description:
    "Perfil del Contratante de Valsequillo Iniciativas. Licitaciones, contratos y información sobre contratación pública.",
};

const STATUS_CONFIG: Record<TenderStatus, { label: string; className: string }> = {
  en_plazo: { label: "En plazo", className: "bg-green-100 text-green-800 border-green-200" },
  adjudicada: { label: "Adjudicada", className: "bg-blue-100 text-blue-800 border-blue-200" },
  cerrada: { label: "Cerrada", className: "bg-gray-100 text-gray-600 border-gray-200" },
};

async function getTenders(): Promise<Tender[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("tenders")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Tender[]) ?? [];
  } catch {
    return [];
  }
}

export default async function PerfilContratantePage() {
  const tenders = await getTenders();

  return (
    <div>
      <div className="bg-[#00695C] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Perfil del Contratante</h1>
          <p className="text-[#B2DFDB] text-lg max-w-2xl">
            Información sobre licitaciones y contratos de Valsequillo Iniciativas conforme
            a la Ley de Contratos del Sector Público.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-800">
          La información publicada en esta sección cumple con los requisitos de publicidad
          activa establecidos por la Ley 9/2017, de 8 de noviembre, de Contratos del Sector
          Público.
        </div>

        {tenders.length === 0 ? (
          <p className="text-gray-500 text-center py-16">
            No hay licitaciones publicadas en este momento.
          </p>
        ) : (
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">Objeto del contrato</TableHead>
                  <TableHead className="font-semibold text-gray-700">Plazo</TableHead>
                  <TableHead className="font-semibold text-gray-700">Estado</TableHead>
                  <TableHead className="font-semibold text-gray-700">Documentación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenders.map((tender) => {
                  const status = STATUS_CONFIG[tender.estado];
                  return (
                    <TableRow key={tender.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {tender.titulo}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {tender.deadline ? (
                          <span className="flex items-center gap-1 text-sm">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {new Date(tender.deadline).toLocaleDateString("es-ES")}
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {tender.url_documento ? (
                          <a
                            href={tender.url_documento}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-[#00695C] hover:underline"
                          >
                            Ver documento <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
