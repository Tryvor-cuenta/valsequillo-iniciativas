import { createClient } from "@/lib/supabase/server";
import ServiceForm from "./ServiceForm";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: id === "new" ? "Nuevo servicio — Admin" : "Editar servicio — Admin" };
}

export default async function ServiceEditPage({ params }: Props) {
  const { id } = await params;
  let item = null;
  if (id !== "new") {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from("services").select("*").eq("id", id).single();
      item = data;
    } catch {}
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{id === "new" ? "Nuevo servicio" : "Editar servicio"}</h1>
      <ServiceForm item={item} />
    </div>
  );
}
