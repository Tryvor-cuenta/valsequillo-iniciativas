"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import type { Course } from "@/types";

interface FormData {
  titulo: string;
  descripcion: string;
  horas: string;
  modalidad: string;
  fecha_inicio: string;
  activo: boolean;
}

export default function CourseForm({ item }: { item: Course | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      titulo: item?.titulo ?? "",
      descripcion: item?.descripcion ?? "",
      horas: item?.horas?.toString() ?? "",
      modalidad: item?.modalidad ?? "",
      fecha_inicio: item?.fecha_inicio ? item.fecha_inicio.slice(0, 10) : "",
      activo: item?.activo ?? true,
    },
  });

  async function onSubmit(data: FormData) {
    if (!data.titulo || data.titulo.length < 2) return;
    if (!data.descripcion || data.descripcion.length < 10) return;

    setSaving(true);
    const supabase = createClient();
    const payload = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      horas: data.horas ? parseInt(data.horas) : null,
      modalidad: data.modalidad || null,
      fecha_inicio: data.fecha_inicio || null,
      activo: data.activo,
    };
    const { error } = item
      ? await supabase.from("courses").update(payload).eq("id", item.id)
      : await supabase.from("courses").insert(payload);
    if (error) { toast.error("Error al guardar"); }
    else { toast.success("Guardado"); router.push("/admin/formacion"); }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5 bg-white p-6 rounded-lg border border-gray-200">
      <div className="space-y-1.5">
        <Label htmlFor="titulo">Título *</Label>
        <Input id="titulo" {...register("titulo", { required: true, minLength: 2 })} />
        {errors.titulo && <p className="text-xs text-red-500">El título es obligatorio</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="descripcion">Descripción *</Label>
        <Textarea id="descripcion" {...register("descripcion", { required: true, minLength: 10 })} rows={3} />
        {errors.descripcion && <p className="text-xs text-red-500">La descripción es obligatoria</p>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="horas">Horas</Label>
          <Input id="horas" type="number" min="0" {...register("horas")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="modalidad">Modalidad</Label>
          <Input id="modalidad" {...register("modalidad")} placeholder="Presencial, Online..." />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fecha_inicio">Fecha inicio</Label>
          <Input id="fecha_inicio" type="date" {...register("fecha_inicio")} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input id="activo" type="checkbox" {...register("activo")} className="h-4 w-4 accent-[#00695C]" />
        <Label htmlFor="activo">Curso activo</Label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving} className="bg-[#00695C] hover:bg-[#004D40]">
          {saving ? "Guardando..." : item ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/formacion")}>Cancelar</Button>
      </div>
    </form>
  );
}
