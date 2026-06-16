import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Users, BookOpen, ShoppingBag, TrendingUp, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { createClient } from "@/lib/supabase/server";
import type { Service } from "@/types";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios de Valsequillo Iniciativas: emprendimiento, empleo, formación, dinamización comercial, apoyo a empresas y proyectos comunitarios.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  Briefcase,
  Users,
  BookOpen,
  ShoppingBag,
  TrendingUp,
  Heart,
};

const FALLBACK_SERVICES = [
  { id: "1", icono: "TrendingUp", titulo: "Emprendimiento", descripcion: "Asesoramiento y acompañamiento a personas emprendedoras en las fases de ideación, creación y consolidación de su negocio.", cta: "Más información", orden: 1, activo: true },
  { id: "2", icono: "Users", titulo: "Empleo", descripcion: "Orientación laboral, intermediación y apoyo en la búsqueda de empleo para personas desempleadas del municipio.", cta: "Ver ofertas", orden: 2, activo: true },
  { id: "3", icono: "BookOpen", titulo: "Formación", descripcion: "Cursos, talleres y programas de formación profesional para mejorar la empleabilidad y las competencias de la ciudadanía.", cta: "Ver cursos", orden: 3, activo: true },
  { id: "4", icono: "ShoppingBag", titulo: "Dinamización comercial", descripcion: "Acciones para revitalizar el comercio local, fomentar las compras en el municipio y apoyar a los comerciantes.", cta: "Saber más", orden: 4, activo: true },
  { id: "5", icono: "Briefcase", titulo: "Apoyo a empresas", descripcion: "Servicios de consultoría, financiación, tramitación de subvenciones y acceso a programas de apoyo empresarial.", cta: "Consultar", orden: 5, activo: true },
  { id: "6", icono: "Heart", titulo: "Proyectos comunitarios", descripcion: "Iniciativas de desarrollo comunitario y cohesión social para mejorar la calidad de vida en Valsequillo.", cta: "Ver proyectos", orden: 6, activo: true },
];

async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("activo", true)
      .order("orden");
    if (data && data.length > 0) return data as Service[];
  } catch {}
  return FALLBACK_SERVICES as Service[];
}

export default async function ServiciosPage() {
  const services = await getServices();

  return (
    <div>
      <div className="bg-[#00695C] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Nuestros servicios</h1>
          <p className="text-[#B2DFDB] text-lg max-w-2xl">
            Acompañamos a personas y empresas en cada etapa de su desarrollo con servicios
            especializados y adaptados a la realidad local.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = ICON_MAP[service.icono] ?? Briefcase;
            return (
              <Card key={service.id} className="border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#00695C]/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-[#00695C]" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{service.titulo}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {service.descripcion}
                  </p>
                  {service.cta && (
                    <Link
                      href="/contacto"
                      className="text-sm text-[#00695C] hover:underline flex items-center gap-1 mt-auto"
                    >
                      {service.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">
            ¿Necesitas más información sobre alguno de nuestros servicios?
          </p>
          <LinkButton href="/contacto" className="bg-[#00695C] hover:bg-[#004D40]">
            Contactar con nosotros
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
