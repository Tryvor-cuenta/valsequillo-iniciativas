import { createClient } from "@/lib/supabase/server";
import ProjectForm from "./ProjectForm";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: id === "new" ? "Nuevo proyecto — Admin" : "Editar proyecto — Admin" };
}

export default async function ProjectEditPage({ params }: Props) {
  const { id } = await params;
  let item = null;
  if (id !== "new") {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from("projects").select("*").eq("id", id).single();
      item = data;
    } catch {}
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{id === "new" ? "Nuevo proyecto" : "Editar proyecto"}</h1>
      <ProjectForm item={item} />
    </div>
  );
}
