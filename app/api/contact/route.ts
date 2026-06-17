import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  asunto: z.string().min(3).max(200),
  mensaje: z.string().min(10).max(2000),
  privacidad: z.literal(true),
  honeypot: z.string().max(0),
});

const RATE_LIMIT_MAP = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);
  if (entry && now - entry.ts < WINDOW_MS) {
    if (entry.count >= MAX_REQUESTS)
      return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });
    entry.count++;
  } else {
    RATE_LIMIT_MAP.set(ip, { count: 1, ts: now });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Formato inválido" }, { status: 400 }); }

  const result = schema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: "Datos inválidos" }, { status: 422 });

  const { nombre, email, asunto, mensaje } = result.data;

  // Enviar con Resend si hay API key
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Valsequillo Iniciativas <onboarding@resend.dev>",
        to: ["info@valsequilloiniciativas.com"],
        replyTo: email,
        subject: `[Contacto web] ${asunto}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#00695C">Nuevo mensaje de contacto</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;font-weight:bold;color:#555;width:120px">Nombre</td><td style="padding:8px">${nombre}</td></tr>
              <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#555">Asunto</td><td style="padding:8px">${asunto}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#f0f9f7;border-left:4px solid #00695C;border-radius:4px">
              <p style="margin:0;white-space:pre-wrap">${mensaje}</p>
            </div>
            <p style="color:#888;font-size:12px;margin-top:24px">
              Enviado desde el formulario de contacto de valsequilloiniciativas.com
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.error("[contact] Resend error:", err);
      // No bloqueamos la respuesta si Resend falla
    }
  } else {
    console.info("[contacto] (sin RESEND_API_KEY)", { nombre, email, asunto });
  }

  return NextResponse.json({ ok: true });
}
