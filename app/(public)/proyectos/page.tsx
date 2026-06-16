import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de desarrollo económico y social de Valsequillo Iniciativas en Gran Canaria.",
};

async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("orden");
    return (data as Project[]) ?? [];
  } catch {
    return [];
  }
}

export default async function ProyectosPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="bg-[#00695C] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Proyectos</h1>
          <p className="text-[#B2DFDB] text-lg max-w-2xl">
            Iniciativas y programas que transforman el tejido económico y social de
            Valsequillo.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-16">
            Próximamente publicaremos información sobre nuestros proyectos en curso.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
                {project.imagen_url && (
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={project.imagen_url}
                      alt={project.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {project.etiqueta && (
                      <Badge variant="secondary" className="text-xs">
                        {project.etiqueta}
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="text-xs capitalize"
                    >
                      {project.estado}
                    </Badge>
                  </div>
                  <h2 className="font-semibold text-gray-900 mb-2">{project.titulo}</h2>
                  <p className="text-sm text-gray-500 line-clamp-3">{project.resumen}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
