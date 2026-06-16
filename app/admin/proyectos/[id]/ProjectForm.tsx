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
import type { Project } from "@/types";

const schema = z.object({
  titulo: z.string().min(2),
  resumen: z.string().min(10),
  cuerpo: z.string(),
  imagen_url: z.string().url("URL inválida").or(z.literal("")),
  etiqueta: z.string(),
  estado: z.string().min(1),
  orden: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function ProjectForm({ item }: { item: Project | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: item?.titulo ?? "",
      resumen: item?.resumen ?? "",
      cuerpo: item?.cuerpo ?? "",
      imagen_url: item?.imagen_url ?? "",
      etiqueta: item?.etiqueta ?? "",
      estado: item?.estado ?? "en_curso",
      orden: item?.orden?.toString() ?? "0",
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true);
    const supabase = createClient();
    const payload = {
      ...data,
      orden: parseInt(data.orden) || 0,
      cuerpo: data.cuerpo || null,
      imagen_url: data.imagen_url || null,
      etiqueta: data.etiqueta || null,
    };
    const { error } = item
      ? await supabase.from("projects").update(payload).eq("id", item.id)
      : await supabase.from("projects").insert(payload);
    if (error) { toast.error("Error al guardar"); }
    else { toast.success("Guardado"); router.push("/admin/proyectos"); }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5 bg-white p-6 rounded-lg border border-gray-200">
      <div className="space-y-1.5">
        <Label htmlFor="titulo">Título *</Label>
        <Input id="titulo" {...register("titulo")} />
        {errors.titulo && <p className="text-xs text-red-500">{errors.titulo.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="resumen">Resumen *</Label>
        <Textarea id="resumen" {...register("resumen")} rows={2} />
        {errors.resumen && <p className="text-xs text-red-500">{errors.resumen.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cuerpo">Descripción completa</Label>
        <Textarea id="cuerpo" {...register("cuerpo")} rows={5} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="imagen_url">URL imagen</Label>
          <Input id="imagen_url" {...register("imagen_url")} placeholder="https://..." />
          {errors.imagen_url && <p className="text-xs text-red-500">{errors.imagen_url.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="etiqueta">Etiqueta</Label>
          <Input id="etiqueta" {...register("etiqueta")} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="estado">Estado</Label>
          <Input id="estado" {...register("estado")} placeholder="en_curso, finalizado..." />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="orden">Orden</Label>
          <Input id="orden" type="number" {...register("orden")} />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving} className="bg-[#00695C] hover:bg-[#004D40]">
          {saving ? "Guardando..." : item ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/proyectos")}>Cancelar</Button>
      </div>
    </form>
  );
}
