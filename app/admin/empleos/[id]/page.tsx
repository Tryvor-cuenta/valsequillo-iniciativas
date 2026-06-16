import { createClient } from "@/lib/supabase/server";
import JobForm from "./JobForm";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: id === "new" ? "Nueva oferta — Admin" : "Editar oferta — Admin" };
}

export default async function JobEditPage({ params }: Props) {
  const { id } = await params;
  let item = null;
  if (id !== "new") {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from("jobs").select("*").eq("id", id).single();
      item = data;
    } catch {}
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{id === "new" ? "Nueva oferta de empleo" : "Editar oferta"}</h1>
      <JobForm item={item} />
    </div>
  );
}
