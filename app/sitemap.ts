import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://valsequilloiniciativas.es";

const STATIC_ROUTES = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" },
  { url: "/quienes-somos", priority: 0.8, changeFrequency: "monthly" },
  { url: "/servicios", priority: 0.9, changeFrequency: "monthly" },
  { url: "/proyectos", priority: 0.8, changeFrequency: "weekly" },
  { url: "/noticias", priority: 0.9, changeFrequency: "daily" },
  { url: "/empleo-formacion", priority: 0.9, changeFrequency: "weekly" },
  { url: "/perfil-contratante", priority: 0.7, changeFrequency: "weekly" },
  { url: "/transparencia", priority: 0.6, changeFrequency: "monthly" },
  { url: "/contacto", priority: 0.7, changeFrequency: "yearly" },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("news")
      .select("slug, fecha_publicacion")
      .eq("estado", "publicado")
      .order("fecha_publicacion", { ascending: false });

    newsEntries = (data ?? []).map((item) => ({
      url: `${BASE_URL}/noticias/${item.slug}`,
      lastModified: new Date(item.fecha_publicacion),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {}

  return [...staticEntries, ...newsEntries];
}
