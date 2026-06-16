import Link from "next/link";
import { ArrowRight, Briefcase, Users, BookOpen, Building2, TrendingUp, Heart } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import type { NewsItem } from "@/types";

const QUICK_ACCESS = [
  { href: "/servicios", icon: Briefcase, label: "Servicios", desc: "Apoyo al emprendimiento y empresas" },
  { href: "/proyectos", icon: TrendingUp, label: "Proyectos", desc: "Iniciativas comunitarias activas" },
  { href: "/empleo-formacion", icon: BookOpen, label: "Empleo y Formación", desc: "Ofertas y cursos disponibles" },
  { href: "/perfil-contratante", icon: Building2, label: "Perfil del Contratante", desc: "Licitaciones y contratos públicos" },
];

async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("news")
      .select("id,titulo,slug,resumen,imagen_url,etiqueta,fecha_publicacion,estado,cuerpo,created_at")
      .eq("estado", "publicado")
      .order("fecha_publicacion", { ascending: false })
      .limit(3);
    return (data as NewsItem[]) ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const news = await getLatestNews();

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#00695C] text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#A5D6A7] text-sm font-medium uppercase tracking-widest mb-4">
              Empresa Pública Municipal · Ayuntamiento de Valsequillo
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Impulsamos el desarrollo económico y social de Valsequillo
            </h1>
            <p className="text-lg text-[#B2DFDB] max-w-2xl mx-auto mb-8">
              Acompañamos a personas y empresas en su crecimiento a través del empleo, la
              formación, el emprendimiento y la dinamización del tejido productivo local.
            </p>
            <LinkButton
              href="/servicios"
              size="lg"
              className="bg-white text-[#00695C] hover:bg-gray-100 font-semibold"
            >
              Conoce nuestros servicios <ArrowRight className="ml-2 h-5 w-5" />
            </LinkButton>
          </div>
        </section>

        {/* Accesos rápidos */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              Áreas de actuación
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUICK_ACCESS.map(({ href, icon: Icon, label, desc }) => (
                <Link key={href} href={href} className="group">
                  <Card className="h-full border-gray-200 hover:border-[#00695C] hover:shadow-md transition-all">
                    <CardContent className="p-6 flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00695C]/10 flex items-center justify-center group-hover:bg-[#00695C]/20 transition-colors">
                        <Icon className="h-5 w-5 text-[#00695C]" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{label}</h3>
                      <p className="text-sm text-gray-500">{desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Últimas noticias */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Últimas noticias</h2>
              <Link
                href="/noticias"
                className="text-sm text-[#00695C] hover:underline flex items-center gap-1"
              >
                Ver todas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {news.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                Próximamente publicaremos noticias y novedades.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item) => (
                  <Link key={item.id} href={`/noticias/${item.slug}`} className="group">
                    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                      {item.imagen_url && (
                        <div className="aspect-video bg-gray-100 overflow-hidden">
                          <img
                            src={item.imagen_url}
                            alt={item.titulo}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-5">
                        {item.etiqueta && (
                          <Badge variant="secondary" className="mb-3 text-xs">
                            {item.etiqueta}
                          </Badge>
                        )}
                        <p className="text-xs text-gray-400 mb-2">
                          {new Date(item.fecha_publicacion).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-[#00695C] transition-colors">
                          {item.titulo}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.resumen}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 border-t border-gray-200 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-8 w-8 text-[#00695C] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Tienes un proyecto o necesitas orientación?
            </h2>
            <p className="text-gray-500 mb-6">
              Nuestro equipo está aquí para ayudarte. Contacta con nosotros y te asesoraremos
              sin compromiso.
            </p>
            <LinkButton href="/contacto" size="lg" className="bg-[#00695C] hover:bg-[#004D40]">
              Ponerse en contacto
            </LinkButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
