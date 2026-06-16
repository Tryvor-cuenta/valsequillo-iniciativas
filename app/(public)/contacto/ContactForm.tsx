"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Introduce un email válido"),
  asunto: z.string().min(3, "Indica el asunto del mensaje"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  privacidad: z.literal(true, { error: "Debes aceptar la política de privacidad" }),
  honeypot: z.string().max(0),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Mensaje enviado", {
        description: "Nos pondremos en contacto contigo en breve.",
      });
      reset();
    } catch {
      toast.error("Error al enviar", {
        description: "Por favor, inténtalo de nuevo o contáctanos por teléfono.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input {...register("honeypot")} type="text" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="space-y-1.5">
        <Label htmlFor="nombre">Nombre *</Label>
        <Input id="nombre" {...register("nombre")} placeholder="Tu nombre completo" />
        {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Correo electrónico *</Label>
        <Input id="email" type="email" {...register("email")} placeholder="tu@email.es" />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="asunto">Asunto *</Label>
        <Input id="asunto" {...register("asunto")} placeholder="¿En qué podemos ayudarte?" />
        {errors.asunto && <p className="text-xs text-red-500">{errors.asunto.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="mensaje">Mensaje *</Label>
        <Textarea
          id="mensaje"
          {...register("mensaje")}
          placeholder="Escribe tu mensaje aquí..."
          rows={4}
        />
        {errors.mensaje && <p className="text-xs text-red-500">{errors.mensaje.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="privacidad"
          type="checkbox"
          {...register("privacidad")}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00695C] accent-[#00695C]"
        />
        <label htmlFor="privacidad" className="text-sm text-gray-600">
          He leído y acepto la{" "}
          <a href="/politica-privacidad" className="text-[#00695C] hover:underline">
            política de privacidad
          </a>
          {" "}*
        </label>
      </div>
      {errors.privacidad && (
        <p className="text-xs text-red-500">{errors.privacidad.message}</p>
      )}

      <Button
        type="submit"
        disabled={sending}
        className="w-full bg-[#00695C] hover:bg-[#004D40]"
      >
        {sending ? "Enviando..." : "Enviar mensaje"}
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Sin spam. Respondemos en un plazo máximo de 48 horas en días hábiles.
      </p>
    </form>
  );
}
