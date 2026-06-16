import { createClient } from "@/lib/supabase/server";
import type { NewsItem } from "@/types";
import NewsForm from "./NewsForm";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: id === "new" ? "Nueva noticia — Admin" : "Editar noticia — Admin" };
}

export default async function NewsEditPage({ params }: Props) {
  const { id } = await params;
  let item: NewsItem | null = null;

  if (id !== "new") {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from("news").select("*").eq("id", id).single();
      item = data as NewsItem | null;
    } catch {}
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {id === "new" ? "Nueva noticia" : "Editar noticia"}
      </h1>
      <NewsForm item={item} />
    </div>
  );
}
