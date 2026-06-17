"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  position: z.string().optional(),
  message: z.string().optional(),
  privacy: z.literal(true, { error: "Debes aceptar la política de privacidad" }),
});

type FormData = z.infer<typeof schema>;

export default function JobApplicationForm() {
  const [sending, setSending] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    if (!cvFile) { setCvError("El CV es obligatorio"); return; }
    setCvError("");
    setSending(true);

    try {
      const supabase = createClient();

      // 1. Subir CV a Storage
      const ext = cvFile.name.split(".").pop();
      const fileName = `cv-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("curriculums")
        .upload(fileName, cvFile, { upsert: false });

      if (uploadError) throw new Error("Error al subir el CV: " + uploadError.message);

      // 2. Obtener URL pública (bucket privado → URL firmada temporal, o path para admin)
      const cvUrl = uploadData.path;

      // 3. Insertar solicitud en BD
      const { error: insertError } = await supabase.from("job_applications").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        position: data.position || null,
        message: data.message || null,
        cv_url: cvUrl,
      });

      if (insertError) throw new Error(insertError.message);

      // 4. Notificación por email (no bloqueante)
      fetch("/api/job-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          position: data.position || undefined,
          cv_path: cvUrl,
          supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        }),
      }).catch(() => {}); // silencioso — no afecta UX

      toast.success("Candidatura enviada", {
        description: "Hemos recibido tu solicitud. Te contactaremos si tu perfil encaja.",
      });
      reset();
      setCvFile(null);
      setSent(true);
    } catch (err: unknown) {
      toast.error("Error al enviar", {
        description: err instanceof Error ? err.message : "Inténtalo de nuevo.",
      });
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center py-12 px-6 bg-green-50 rounded-xl border border-green-200">
        <p className="text-2xl mb-2">✅</p>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">¡Candidatura recibida!</h2>
        <p className="text-gray-500 text-sm">
          Hemos recibido tu solicitud correctamente. Si tu perfil encaja con nuestras necesidades, nos pondremos en contacto contigo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="name">Nombre completo *</Label>
        <Input id="name" {...register("name")} placeholder="Tu nombre y apellidos" />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="tu@email.es" />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" type="tel" {...register("phone")} placeholder="600 000 000" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="position">Puesto al que opta</Label>
        <Input id="position" {...register("position")} placeholder="Ej: Técnico de empleo, Agente de desarrollo..." />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Mensaje / motivación</Label>
        <Textarea id="message" {...register("message")} rows={4} placeholder="Cuéntanos por qué quieres trabajar con nosotros..." />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cv">Adjuntar CV *</Label>
        <Input
          id="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => { setCvFile(e.target.files?.[0] ?? null); setCvError(""); }}
        />
        <p className="text-xs text-gray-400">Formatos aceptados: PDF, DOC, DOCX. Máx. 5 MB.</p>
        {cvError && <p className="text-xs text-red-500">{cvError}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input id="privacy" type="checkbox" {...register("privacy")} className="mt-1 h-4 w-4 accent-[#00695C]" />
        <label htmlFor="privacy" className="text-sm text-gray-600">
          He leído y acepto la{" "}
          <a href="/politica-privacidad" className="text-[#00695C] hover:underline">política de privacidad</a> *
        </label>
      </div>
      {errors.privacy && <p className="text-xs text-red-500">{errors.privacy.message}</p>}

      <Button type="submit" disabled={sending} className="w-full bg-[#00695C] hover:bg-[#004D40]">
        {sending ? "Enviando candidatura..." : "Enviar candidatura"}
      </Button>
    </form>
  );
}
