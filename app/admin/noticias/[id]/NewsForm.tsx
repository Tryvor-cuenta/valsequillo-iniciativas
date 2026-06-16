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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import type { NewsItem } from "@/types";

const schema = z.object({
  titulo: z.string().min(3, "El título es obligatorio"),
  slug: z.string().min(3, "El slug es obligatorio").regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  resumen: z.string().min(10, "El resumen es obligatorio"),
  cuerpo: z.string().min(10, "El contenido es obligatorio"),
  imagen_url: z.string().url("URL inválida").or(z.literal("")),
  etiqueta: z.string(),
  fecha_publicacion: z.string(),
  estado: z.enum(["borrador", "publicado"]),
});

type FormData = z.infer<typeof schema>;

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function NewsForm({ item }: { item: NewsItem | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: item?.titulo ?? "",
      slug: item?.slug ?? "",
      resumen: item?.resumen ?? "",
      cuerpo: item?.cuerpo ?? "",
      imagen_url: item?.imagen_url ?? "",
      etiqueta: item?.etiqueta ?? "",
      fecha_publicacion: item?.fecha_publicacion
        ? item.fecha_publicacion.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      estado: item?.estado ?? "borrador",
    },
  });

  function handleTituloChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setValue("titulo", val);
    if (!item) setValue("slug", toSlug(val));
  }

  async function onSubmit(data: FormData) {
    setSaving(true);
    const supabase = createClient();
    const payload = {
      ...data,
      imagen_url: data.imagen_url || null,
      etiqueta: data.etiqueta || null,
    };

    const { error } = item
      ? await supabase.from("news").update(payload).eq("id", item.id)
      : await supabase.from("news").insert(payload);

    if (error) {
      toast.error("Error al guardar", { description: error.message });
    } else {
      toast.success(item ? "Noticia actualizada" : "Noticia creada");
      router.push("/admin/noticias");
    }
    setSaving(false);
  }

  const estado = watch("estado");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5 bg-white p-6 rounded-lg border border-gray-200">
      <div className="space-y-1.5">
        <Label htmlFor="titulo">Título *</Label>
        <Input
          id="titulo"
          {...register("titulo")}
          onChange={handleTituloChange}
          placeholder="Título de la noticia"
        />
        {errors.titulo && <p className="text-xs text-red-500">{errors.titulo.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug (URL) *</Label>
        <Input id="slug" {...register("slug")} placeholder="url-amigable" />
        {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="resumen">Resumen *</Label>
        <Textarea id="resumen" {...register("resumen")} rows={2} placeholder="Descripción breve..." />
        {errors.resumen && <p className="text-xs text-red-500">{errors.resumen.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cuerpo">Contenido *</Label>
        <Textarea id="cuerpo" {...register("cuerpo")} rows={8} placeholder="Texto completo de la noticia (HTML permitido)..." />
        {errors.cuerpo && <p className="text-xs text-red-500">{errors.cuerpo.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="imagen_url">URL imagen</Label>
          <Input id="imagen_url" {...register("imagen_url")} placeholder="https://..." />
          {errors.imagen_url && <p className="text-xs text-red-500">{errors.imagen_url.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="etiqueta">Etiqueta</Label>
          <Input id="etiqueta" {...register("etiqueta")} placeholder="Empleo, Formación..." />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="fecha_publicacion">Fecha publicación *</Label>
          <Input id="fecha_publicacion" type="date" {...register("fecha_publicacion")} />
        </div>
        <div className="space-y-1.5">
          <Label>Estado *</Label>
          <Select
            value={estado}
            onValueChange={(val) => setValue("estado", val as "borrador" | "publicado")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="borrador">Borrador</SelectItem>
              <SelectItem value="publicado">Publicado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving} className="bg-[#00695C] hover:bg-[#004D40]">
          {saving ? "Guardando..." : item ? "Actualizar noticia" : "Crear noticia"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/noticias")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
