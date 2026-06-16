import type { Metadata } from "next";
import { CalendarDays, Clock, MapPin, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Job, Course } from "@/types";

export const metadata: Metadata = {
  title: "Empleo y Formación",
  description:
    "Ofertas de empleo activas y cursos de formación en Valsequillo Iniciativas. Mejora tu empleabilidad con nuestros programas.",
};

async function getData(): Promise<{ jobs: Job[]; courses: Course[] }> {
  try {
    const supabase = await createClient();
    const [jobsRes, coursesRes] = await Promise.all([
      supabase.from("jobs").select("*").eq("activo", true).order("created_at", { ascending: false }),
      supabase.from("courses").select("*").eq("activo", true).order("fecha_inicio"),
    ]);
    return {
      jobs: (jobsRes.data as Job[]) ?? [],
      courses: (coursesRes.data as Course[]) ?? [],
    };
  } catch {
    return { jobs: [], courses: [] };
  }
}

export default async function EmpleoFormacionPage() {
  const { jobs, courses } = await getData();

  return (
    <div>
      <div className="bg-[#00695C] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Empleo y Formación</h1>
          <p className="text-[#B2DFDB] text-lg max-w-2xl">
            Ofertas de trabajo activas y programas formativos para impulsar tu carrera
            profesional en Valsequillo.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {/* Empleo */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ofertas de empleo activas</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-500 py-8 text-center border border-dashed border-gray-200 rounded-lg">
              No hay ofertas de empleo activas en este momento. Consúltanos para más información.
            </p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="border-gray-200 hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{job.titulo}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          {job.empresa && (
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3.5 w-3.5" /> {job.empresa}
                            </span>
                          )}
                          {job.ubicacion && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" /> {job.ubicacion}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{job.descripcion}</p>
                      </div>
                      {job.deadline && (
                        <div className="shrink-0">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            Hasta {new Date(job.deadline).toLocaleDateString("es-ES")}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Formación */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cursos y formación</h2>
          {courses.length === 0 ? (
            <p className="text-gray-500 py-8 text-center border border-dashed border-gray-200 rounded-lg">
              No hay cursos programados en este momento. Suscríbete a nuestro boletín para recibir novedades.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="border-gray-200 hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">{course.titulo}</h3>
                    <p className="text-sm text-gray-500 mb-3">{course.descripcion}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      {course.horas && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {course.horas}h
                        </span>
                      )}
                      {course.modalidad && (
                        <Badge variant="secondary" className="text-xs">
                          {course.modalidad}
                        </Badge>
                      )}
                      {course.fecha_inicio && (
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          Inicio: {new Date(course.fecha_inicio).toLocaleDateString("es-ES")}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
