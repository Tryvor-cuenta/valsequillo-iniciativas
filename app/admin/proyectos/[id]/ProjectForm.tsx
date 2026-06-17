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

const schema = z.object({
  titulo: z.string().min(2),
  resumen: z.string().min(10),
  cuerpo: z.string(),
  imagen_url: z.string().url("URL inválida").or(z.literal("")),
  etiqueta: z.string(),
  estado: z.string().min(1),
  orden: z.string(),
  document_url: z.string().url("URL inválida").or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

interface Project {
  id: string;
  titulo: string;
  resumen: string;
  cuerpo: string | null;
  imagen_url: string | null;
  etiqueta: string | null;
  estado: string;
  orden: number;
  document_url: string | null;
  document_file_url: string | null;
}

export default function ProjectForm({ item }: { item: Project | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>(item?.document_file_url ?? "");

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
      document_url: item?.document_url ?? "",
    },
  });

  async function handleDocUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const fileName = `doc-${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage.from("proyectos-docs").upload(fileName, file, { upsert: false });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("proyectos-docs").getPublicUrl(data.path);
      setFileUrl(publicUrl);
      toast.success("Documento subido");
    } catch {
      toast.error("Error al subir el documento");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(data: FormData) {
    setSaving(true);
    const supabase = createClient();
    const payload = {
      titulo: data.titulo,
      resumen: data.resumen,
      cuerpo: data.cuerpo || null,
      imagen_url: data.imagen_url || null,
      etiqueta: data.etiqueta || null,
      estado: data.estado,
      orden: parseInt(data.orden) || 0,
      // Si hay archivo subido, tiene prioridad; si no, usar URL externa
      document_file_url: fileUrl || null,
      document_url: !fileUrl && data.document_url ? data.document_url : null,
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

      {/* Documento */}
      <div className="p-4 border border-gray-100 rounded-lg bg-gray-50 space-y-3">
        <Label>Documento del proyecto (opcional)</Label>
        <div className="space-y-2">
          <div>
            <Label htmlFor="doc_file" className="text-xs text-gray-500">Subir archivo (PDF, DOC, XLS…)</Label>
            <Input id="doc_file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={handleDocUpload} disabled={uploading} className="mt-1" />
            {uploading && <p className="text-xs text-[#00695C] mt-1">Subiendo…</p>}
            {fileUrl && <p className="text-xs text-green-600 mt-1 truncate">✓ {fileUrl}</p>}
          </div>
          {!fileUrl && (
            <div>
              <Label htmlFor="document_url" className="text-xs text-gray-500">O URL externa del documento</Label>
              <Input id="document_url" {...register("document_url")} placeholder="https://..." className="mt-1" />
              {errors.document_url && <p className="text-xs text-red-500">{errors.document_url.message}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving || uploading} className="bg-[#00695C] hover:bg-[#004D40]">
          {saving ? "Guardando..." : item ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/proyectos")}>Cancelar</Button>
      </div>
    </form>
  );
}
