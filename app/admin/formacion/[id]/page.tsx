import { createClient } from "@/lib/supabase/server";
import CourseForm from "./CourseForm";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: id === "new" ? "Nuevo curso — Admin" : "Editar curso — Admin" };
}

export default async function CourseEditPage({ params }: Props) {
  const { id } = await params;
  let item = null;
  if (id !== "new") {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from("courses").select("*").eq("id", id).single();
      item = data;
    } catch {}
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{id === "new" ? "Nuevo curso" : "Editar curso"}</h1>
      <CourseForm item={item} />
    </div>
  );
}
