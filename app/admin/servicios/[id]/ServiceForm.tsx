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
import type { Service } from "@/types";

const schema = z.object({
  icono: z.string().min(1, "El icono es obligatorio"),
  titulo: z.string().min(2),
  descripcion: z.string().min(10),
  cta: z.string(),
  orden: z.string(),
  activo: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function ServiceForm({ item }: { item: Service | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      icono: item?.icono ?? "Briefcase",
      titulo: item?.titulo ?? "",
      descripcion: item?.descripcion ?? "",
      cta: item?.cta ?? "",
      orden: item?.orden?.toString() ?? "0",
      activo: item?.activo ?? true,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true);
    const supabase = createClient();
    const payload = { ...data, orden: parseInt(data.orden) || 0, cta: data.cta || null };
    const { error } = item
      ? await supabase.from("services").update(payload).eq("id", item.id)
      : await supabase.from("services").insert(payload);
    if (error) { toast.error("Error al guardar"); }
    else { toast.success("Guardado"); router.push("/admin/servicios"); }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5 bg-white p-6 rounded-lg border border-gray-200">
      <div className="space-y-1.5">
        <Label htmlFor="icono">Icono (nombre Lucide) *</Label>
        <Input id="icono" {...register("icono")} placeholder="Briefcase, Users, BookOpen..." />
        {errors.icono && <p className="text-xs text-red-500">{errors.icono.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="titulo">Título *</Label>
        <Input id="titulo" {...register("titulo")} />
        {errors.titulo && <p className="text-xs text-red-500">{errors.titulo.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="descripcion">Descripción *</Label>
        <Textarea id="descripcion" {...register("descripcion")} rows={3} />
        {errors.descripcion && <p className="text-xs text-red-500">{errors.descripcion.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="cta">Texto CTA</Label>
          <Input id="cta" {...register("cta")} placeholder="Más información" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="orden">Orden</Label>
          <Input id="orden" type="number" {...register("orden")} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input id="activo" type="checkbox" {...register("activo")} className="h-4 w-4 accent-[#00695C]" />
        <Label htmlFor="activo">Activo (visible en web)</Label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving} className="bg-[#00695C] hover:bg-[#004D40]">
          {saving ? "Guardando..." : item ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/servicios")}>Cancelar</Button>
      </div>
    </form>
  );
}
