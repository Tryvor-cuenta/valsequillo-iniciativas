import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (entry && now - entry.ts < WINDOW_MS) {
    if (entry.count >= MAX_REQUESTS) {
      return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });
    }
    entry.count++;
  } else {
    RATE_LIMIT_MAP.set(ip, { count: 1, ts: now });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Formato inválido" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 422 });
  }

  const { nombre, email, asunto, mensaje } = result.data;

  // Si se configura Resend en el futuro, enviar aquí el email.
  // Por ahora registramos en consola para no bloquear el formulario.
  console.info("[contacto]", { nombre, email, asunto, mensaje: mensaje.slice(0, 80) });

  return NextResponse.json({ ok: true });
}
