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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import type { Tender } from "@/types";

const schema = z.object({
  titulo: z.string().min(3),
  deadline: z.string(),
  estado: z.enum(["en_plazo", "adjudicada", "cerrada"]),
  url_documento: z.string().url("URL inválida").or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export default function TenderForm({ item }: { item: Tender | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: item?.titulo ?? "",
      deadline: item?.deadline ? item.deadline.slice(0, 10) : "",
      estado: item?.estado ?? "en_plazo",
      url_documento: item?.url_documento ?? "",
    },
  });

  const estado = watch("estado");

  async function onSubmit(data: FormData) {
    setSaving(true);
    const supabase = createClient();
    const payload = {
      ...data,
      deadline: data.deadline || null,
      url_documento: data.url_documento || null,
    };
    const { error } = item
      ? await supabase.from("tenders").update(payload).eq("id", item.id)
      : await supabase.from("tenders").insert(payload);
    if (error) { toast.error("Error al guardar"); }
    else { toast.success("Guardado"); router.push("/admin/licitaciones"); }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5 bg-white p-6 rounded-lg border border-gray-200">
      <div className="space-y-1.5">
        <Label htmlFor="titulo">Título / objeto del contrato *</Label>
        <Input id="titulo" {...register("titulo")} />
        {errors.titulo && <p className="text-xs text-red-500">{errors.titulo.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="deadline">Plazo límite</Label>
          <Input id="deadline" type="date" {...register("deadline")} />
        </div>
        <div className="space-y-1.5">
          <Label>Estado *</Label>
          <Select value={estado} onValueChange={(v) => setValue("estado", v as FormData["estado"])}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en_plazo">En plazo</SelectItem>
              <SelectItem value="adjudicada">Adjudicada</SelectItem>
              <SelectItem value="cerrada">Cerrada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="url_documento">URL documento</Label>
        <Input id="url_documento" {...register("url_documento")} placeholder="https://..." />
        {errors.url_documento && <p className="text-xs text-red-500">{errors.url_documento.message}</p>}
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving} className="bg-[#00695C] hover:bg-[#004D40]">
          {saving ? "Guardando..." : item ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/licitaciones")}>Cancelar</Button>
      </div>
    </form>
  );
}
