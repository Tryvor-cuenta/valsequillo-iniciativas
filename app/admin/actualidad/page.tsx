import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import type { NewsItem } from "@/types";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Actualidad — Admin" };

async function getNews(): Promise<NewsItem[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("news")
      .select("id,titulo,slug,resumen,imagen_url,etiqueta,fecha_publicacion,estado,cuerpo,created_at")
      .order("fecha_publicacion", { ascending: false });
    return (data as NewsItem[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AdminNoticiasPage() {
  const news = await getNews();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Actualidad</h1>
        <LinkButton href="/admin/actualidad/new" className="bg-[#00695C] hover:bg-[#004D40]">
          <Plus className="h-4 w-4 mr-1.5" /> Nueva entrada
        </LinkButton>
      </div>

      {news.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No hay noticias todavía.</p>
      ) : (
        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Título</TableHead>
                <TableHead>Etiqueta</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-gray-900 max-w-xs truncate">
                    {item.titulo}
                  </TableCell>
                  <TableCell>
                    {item.etiqueta && (
                      <Badge variant="secondary" className="text-xs">
                        {item.etiqueta}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(item.fecha_publicacion).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.estado === "publicado" ? "default" : "outline"}
                      className={item.estado === "publicado" ? "bg-green-100 text-green-800 border-green-200" : ""}
                    >
                      {item.estado === "publicado" ? "Publicado" : "Borrador"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/actualidad/${item.id}`}
                        className="text-xs text-[#00695C] hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteButton id={item.id} table="news" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
