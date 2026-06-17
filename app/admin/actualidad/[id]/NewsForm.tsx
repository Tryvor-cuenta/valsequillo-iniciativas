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
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  resumen: z.string().min(10),
  cuerpo: z.string().min(10),
  imagen_url: z.string().url("URL inválida").or(z.literal("")),
  etiqueta: z.string(),
  fecha_publicacion: z.string(),
  estado: z.enum(["borrador", "publicado"]),
});

type FormData = z.infer<typeof schema>;

function toSlug(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export default function NewsForm({ item }: { item: NewsItem | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(item?.imagen_url ?? "");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: item?.titulo ?? "",
      slug: item?.slug ?? "",
      resumen: item?.resumen ?? "",
      cuerpo: item?.cuerpo ?? "",
      imagen_url: item?.imagen_url ?? "",
      etiqueta: item?.etiqueta ?? "",
      fecha_publicacion: item?.fecha_publicacion ? item.fecha_publicacion.slice(0, 10) : new Date().toISOString().slice(0, 10),
      estado: item?.estado ?? "borrador",
    },
  });

  function handleTituloChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue("titulo", e.target.value);
    if (!item) setValue("slug", toSlug(e.target.value));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from("actualidad-images").upload(fileName, file, { upsert: false });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("actualidad-images").getPublicUrl(data.path);
      setValue("imagen_url", publicUrl);
      setPreviewUrl(publicUrl);
      toast.success("Imagen subida correctamente");
    } catch {
      toast.error("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(data: FormData) {
    setSaving(true);
    const supabase = createClient();
    const payload = { ...data, imagen_url: data.imagen_url || null, etiqueta: data.etiqueta || null };
    const { error } = item
      ? await supabase.from("news").update(payload).eq("id", item.id)
      : await supabase.from("news").insert(payload);
    if (error) { toast.error("Error al guardar", { description: error.message }); }
    else { toast.success(item ? "Noticia actualizada" : "Noticia creada"); router.push("/admin/actualidad"); }
    setSaving(false);
  }

  const estado = watch("estado");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5 bg-white p-6 rounded-lg border border-gray-200">
      <div className="space-y-1.5">
        <Label htmlFor="titulo">Título *</Label>
        <Input id="titulo" {...register("titulo")} onChange={handleTituloChange} placeholder="Título de la noticia" />
        {errors.titulo && <p className="text-xs text-red-500">{errors.titulo.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug (URL) *</Label>
        <Input id="slug" {...register("slug")} placeholder="url-amigable" />
        {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="resumen">Resumen *</Label>
        <Textarea id="resumen" {...register("resumen")} rows={2} />
        {errors.resumen && <p className="text-xs text-red-500">{errors.resumen.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cuerpo">Contenido *</Label>
        <Textarea id="cuerpo" {...register("cuerpo")} rows={8} placeholder="Texto completo (HTML permitido)..." />
        {errors.cuerpo && <p className="text-xs text-red-500">{errors.cuerpo.message}</p>}
      </div>

      {/* Imagen: subida directa O URL manual */}
      <div className="space-y-3 p-4 border border-gray-100 rounded-lg bg-gray-50">
        <Label>Imagen</Label>
        <div className="space-y-2">
          <div>
            <Label htmlFor="imagen_file" className="text-xs text-gray-500">Subir archivo (bucket: actualidad-images)</Label>
            <Input
              id="imagen_file"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="mt-1"
            />
            {uploading && <p className="text-xs text-[#00695C] mt-1">Subiendo imagen…</p>}
          </div>
          <div>
            <Label htmlFor="imagen_url" className="text-xs text-gray-500">O pegar URL externa</Label>
            <Input
              id="imagen_url"
              {...register("imagen_url")}
              placeholder="https://..."
              onChange={(e) => { register("imagen_url").onChange(e); setPreviewUrl(e.target.value); }}
            />
            {errors.imagen_url && <p className="text-xs text-red-500">{errors.imagen_url.message}</p>}
          </div>
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="h-24 w-auto rounded object-cover mt-1" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="etiqueta">Etiqueta</Label>
          <Input id="etiqueta" {...register("etiqueta")} placeholder="Empleo, Formación..." />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fecha_publicacion">Fecha publicación *</Label>
          <Input id="fecha_publicacion" type="date" {...register("fecha_publicacion")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Estado *</Label>
        <Select value={estado} onValueChange={(v) => setValue("estado", v as "borrador" | "publicado")}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="borrador">Borrador</SelectItem>
            <SelectItem value="publicado">Publicado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving || uploading} className="bg-[#00695C] hover:bg-[#004D40]">
          {saving ? "Guardando..." : item ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/actualidad")}>Cancelar</Button>
      </div>
    </form>
  );
}
