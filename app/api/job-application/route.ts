import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().optional(),
  cv_path: z.string().min(1),           // path en Supabase Storage
  supabase_url: z.string().url(),       // para construir enlace admin
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Formato inválido" }, { status: 400 }); }

  const result = schema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: "Datos inválidos" }, { status: 422 });

  const { name, email, phone, position, cv_path, supabase_url } = result.data;

  const adminCvUrl = `${supabase_url}/storage/v1/object/curriculums/${cv_path}`;

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Valsequillo Iniciativas <onboarding@resend.dev>",
        to: ["info@valsequilloiniciativas.com"],
        replyTo: email,
        subject: `[Candidatura] ${name}${position ? ` — ${position}` : ""}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#00695C">Nueva candidatura recibida</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;font-weight:bold;color:#555;width:120px">Nombre</td><td style="padding:8px">${name}</td></tr>
              <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px;font-weight:bold;color:#555">Teléfono</td><td style="padding:8px">${phone}</td></tr>` : ""}
              ${position ? `<tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Puesto</td><td style="padding:8px">${position}</td></tr>` : ""}
            </table>
            <div style="margin-top:20px">
              <a href="${adminCvUrl}"
                 style="display:inline-block;padding:10px 20px;background:#00695C;color:white;text-decoration:none;border-radius:6px;font-weight:bold">
                Ver CV adjunto
              </a>
              <p style="color:#888;font-size:12px;margin-top:8px">
                También puedes acceder al panel de solicitudes en /admin/solicitudes
              </p>
            </div>
            <p style="color:#888;font-size:12px;margin-top:24px">
              Enviado desde el formulario "Trabaja con nosotros" de valsequilloiniciativas.com
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.error("[job-application] Resend error:", err);
    }
  } else {
    console.info("[job-application] (sin RESEND_API_KEY)", { name, email, position });
  }

  return NextResponse.json({ ok: true });
}
