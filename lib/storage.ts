/**
 * Construye la URL pública de un archivo en Supabase Storage.
 * Formato: {SUPABASE_URL}/storage/v1/object/public/{bucket}/{path}
 *
 * Usar esta función en lugar de getPublicUrl() del cliente para
 * garantizar que la URL es correcta también en SSR.
 */
export function getStorageUrl(bucket: string, path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base || !path) return "";
  // Evitar doble barra si path empieza con /
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

/**
 * Determina si una URL es de Supabase Storage.
 */
export function isStorageUrl(url: string): boolean {
  return url.includes("/storage/v1/object/");
}
