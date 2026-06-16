"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import type { Job } from "@/types";

const schema = z.object({
  titulo: z.string().min(2),
  empresa: z.string(),
  ubicacion: z.string(),
  descripcion: z.string().min(10),
  deadline: z.string(),
  activo: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function JobForm({ item }: { item: Job | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: item?.titulo ?? "",
      empresa: item?.empresa ?? "",
      ubicacion: item?.ubicacion ?? "",
      descripcion: item?.descripcion ?? "",
      deadline: item?.deadline ? item.deadline.slice(0, 10) : "",
      activo: item?.activo ?? true,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true);
    const supabase = createClient();
    const payload = {
      ...data,
      empresa: data.empresa || null,
      ubicacion: data.ubicacion || null,
      deadline: data.deadline || null,
    };
    const { error } = item
      ? await supabase.from("jobs").update(payload).eq("id", item.id)
      : await supabase.from("jobs").insert(payload);
    if (error) { toast.error("Error al guardar"); }
    else { toast.success("Guardado"); router.push("/admin/empleos"); }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5 bg-white p-6 rounded-lg border border-gray-200">
      <div className="space-y-1.5">
        <Label htmlFor="titulo">Título *</Label>
        <Input id="titulo" {...register("titulo")} />
        {errors.titulo && <p className="text-xs text-red-500">{errors.titulo.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="empresa">Empresa</Label>
          <Input id="empresa" {...register("empresa")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ubicacion">Ubicación</Label>
          <Input id="ubicacion" {...register("ubicacion")} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="descripcion">Descripción *</Label>
        <Textarea id="descripcion" {...register("descripcion")} rows={4} />
        {errors.descripcion && <p className="text-xs text-red-500">{errors.descripcion.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="deadline">Fecha límite</Label>
        <Input id="deadline" type="date" {...register("deadline")} />
      </div>
      <div className="flex items-center gap-2">
        <input id="activo" type="checkbox" {...register("activo")} className="h-4 w-4 accent-[#00695C]" />
        <Label htmlFor="activo">Oferta activa</Label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving} className="bg-[#00695C] hover:bg-[#004D40]">
          {saving ? "Guardando..." : item ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/empleos")}>Cancelar</Button>
      </div>
    </form>
  );
}
