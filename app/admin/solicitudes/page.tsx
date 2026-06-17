import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Solicitudes — Admin" };

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  position: string | null;
  message: string | null;
  cv_url: string;
  created_at: string;
}

export default async function AdminSolicitudesPage() {
  let applications: Application[] = [];
  let cvUrls: Record<string, string> = {};

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });
    applications = (data as Application[]) ?? [];

    // Generar URLs firmadas para cada CV (bucket privado)
    const adminClient = createAdminClient();
    for (const app of applications) {
      const { data: signed } = await adminClient.storage
        .from("curriculums")
        .createSignedUrl(app.cv_url, 3600);
      if (signed?.signedUrl) cvUrls[app.id] = signed.signedUrl;
    }
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solicitudes de empleo</h1>
          <p className="text-sm text-gray-500 mt-1">{applications.length} solicitud{applications.length !== 1 ? "es" : ""} recibida{applications.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No hay solicitudes todavía.</p>
      ) : (
        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Puesto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>CV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell className="text-sm">
                    <a href={`mailto:${app.email}`} className="text-[#00695C] hover:underline">{app.email}</a>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{app.phone ?? "—"}</TableCell>
                  <TableCell className="text-sm text-gray-500 max-w-xs truncate">{app.position ?? "—"}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(app.created_at).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    {cvUrls[app.id] ? (
                      <a
                        href={cvUrls[app.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#00695C] hover:underline"
                      >
                        Ver CV <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">No disponible</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
