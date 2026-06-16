import { createClient } from "@/lib/supabase/server";
import TenderForm from "./TenderForm";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: id === "new" ? "Nueva licitación — Admin" : "Editar licitación — Admin" };
}

export default async function TenderEditPage({ params }: Props) {
  const { id } = await params;
  let item = null;
  if (id !== "new") {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from("tenders").select("*").eq("id", id).single();
      item = data;
    } catch {}
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{id === "new" ? "Nueva licitación" : "Editar licitación"}</h1>
      <TenderForm item={item} />
    </div>
  );
}
