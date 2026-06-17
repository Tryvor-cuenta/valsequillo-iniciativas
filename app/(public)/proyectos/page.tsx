import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de desarrollo económico y social de Valsequillo Iniciativas de Desarrollo en Gran Canaria.",
};

interface Project {
  id: string;
  titulo: string;
  resumen: string;
  imagen_url: string | null;
  etiqueta: string | null;
  estado: string;
  orden: number;
  document_url: string | null;
  document_file_url: string | null;
}

async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("projects").select("*").order("orden");
    return (data as Project[]) ?? [];
  } catch { return []; }
}

export default async function ProyectosPage() {
  const projects = await getProjects();

  return (
    <div>
      <PageHero
        title="Proyectos"
        subtitle="Iniciativas y programas que transforman el tejido económico y social de Valsequillo."
        image="/images/fachada-ayuntamiento.jpg"
        objectPosition="center center"
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-16">Próximamente publicaremos información sobre nuestros proyectos en curso.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const docUrl = project.document_file_url || project.document_url;
              return (
                <Card key={project.id} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
                  {project.imagen_url && (
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img src={project.imagen_url} alt={project.titulo} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      {project.etiqueta && <Badge variant="secondary" className="text-xs">{project.etiqueta}</Badge>}
                      <Badge variant="outline" className="text-xs capitalize">{project.estado}</Badge>
                    </div>
                    <h2 className="font-semibold text-gray-900 mb-2">{project.titulo}</h2>
                    <p className="text-sm text-gray-500 line-clamp-3">{project.resumen}</p>
                    {docUrl && (
                      <a
                        href={docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-sm text-[#00695C] hover:underline font-medium"
                      >
                        <FileText className="h-4 w-4" />
                        Ver documento
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
