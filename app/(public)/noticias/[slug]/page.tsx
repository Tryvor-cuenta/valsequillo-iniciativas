import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import type { NewsItem } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getNewsItem(slug: string): Promise<NewsItem | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .eq("estado", "publicado")
      .single();
    return data as NewsItem | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return { title: "Noticia no encontrada" };
  return {
    title: item.titulo,
    description: item.resumen,
    openGraph: item.imagen_url ? { images: [{ url: item.imagen_url }] } : undefined,
  };
}

export default async function NoticiaDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/noticias"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#00695C] mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a noticias
      </Link>

      {item.imagen_url && (
        <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-gray-100">
          <img
            src={item.imagen_url}
            alt={item.titulo}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        {item.etiqueta && <Badge variant="secondary">{item.etiqueta}</Badge>}
        <time className="text-sm text-gray-400">
          {new Date(item.fecha_publicacion).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.titulo}</h1>
      <p className="text-lg text-gray-500 mb-8 leading-relaxed">{item.resumen}</p>

      <div
        className="prose prose-gray max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: item.cuerpo }}
      />
    </div>
  );
}
