import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { NewsItem } from "@/types";

export const metadata: Metadata = {
  title: "Actualidad",
  description:
    "Últimas noticias y novedades de Valsequillo Iniciativas sobre empleo, formación y desarrollo local.",
};

async function getNews(): Promise<NewsItem[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("news")
      .select("id,titulo,slug,resumen,imagen_url,etiqueta,fecha_publicacion,estado,cuerpo,created_at")
      .eq("estado", "publicado")
      .order("fecha_publicacion", { ascending: false });
    return (data as NewsItem[]) ?? [];
  } catch {
    return [];
  }
}

export default async function NoticiasPage() {
  const news = await getNews();

  return (
    <div>
      <div className="bg-[#00695C] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Noticias</h1>
          <p className="text-[#B2DFDB] text-lg max-w-2xl">
            Mantente al día con las últimas novedades, convocatorias y actividades de
            Valsequillo Iniciativas.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {news.length === 0 ? (
          <p className="text-gray-500 text-center py-16">
            Próximamente publicaremos noticias y novedades.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link key={item.id} href={`/actualidad/${item.slug}`} className="group">
                <Card className="h-full border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
                  {item.imagen_url && (
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={item.imagen_url}
                        alt={item.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-5">
                    {item.etiqueta && (
                      <Badge variant="secondary" className="mb-3 text-xs">
                        {item.etiqueta}
                      </Badge>
                    )}
                    <p className="text-xs text-gray-400 mb-2">
                      {new Date(item.fecha_publicacion).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="font-semibold text-gray-900 leading-snug group-hover:text-[#00695C] transition-colors">
                      {item.titulo}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.resumen}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
