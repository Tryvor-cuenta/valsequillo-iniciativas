import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, Briefcase, FolderOpen, Users, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard — Admin" };

async function getStats() {
  try {
    const supabase = await createClient();
    const [news, services, projects, jobs, tenders] = await Promise.all([
      supabase.from("news").select("id", { count: "exact" }).eq("estado", "publicado"),
      supabase.from("services").select("id", { count: "exact" }).eq("activo", true),
      supabase.from("projects").select("id", { count: "exact" }),
      supabase.from("jobs").select("id", { count: "exact" }).eq("activo", true),
      supabase.from("tenders").select("id", { count: "exact" }).eq("estado", "en_plazo"),
    ]);
    return {
      news: news.count ?? 0,
      services: services.count ?? 0,
      projects: projects.count ?? 0,
      jobs: jobs.count ?? 0,
      tenders: tenders.count ?? 0,
    };
  } catch {
    return { news: 0, services: 0, projects: 0, jobs: 0, tenders: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const COUNTERS = [
    { label: "Noticias publicadas", value: stats.news, icon: Newspaper, href: "/admin/noticias" },
    { label: "Servicios activos", value: stats.services, icon: Briefcase, href: "/admin/servicios" },
    { label: "Proyectos", value: stats.projects, icon: FolderOpen, href: "/admin/proyectos" },
    { label: "Empleos activos", value: stats.jobs, icon: Users, href: "/admin/empleos" },
    { label: "Licitaciones en plazo", value: stats.tenders, icon: Building2, href: "/admin/licitaciones" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Panel de administración de Valsequillo Iniciativas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {COUNTERS.map(({ label, value, icon: Icon, href }) => (
          <Link key={href} href={href} className="group">
            <Card className="border-gray-200 hover:border-[#00695C] hover:shadow-sm transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-5 w-5 text-[#00695C]" />
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#00695C] transition-colors" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Acciones rápidas</h2>
            <div className="space-y-2">
              {[
                { href: "/admin/noticias/new", label: "Nueva noticia" },
                { href: "/admin/empleos/new", label: "Nueva oferta de empleo" },
                { href: "/admin/licitaciones/new", label: "Nueva licitación" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#00695C]/5 text-sm text-gray-700 hover:text-[#00695C] transition-colors"
                >
                  {label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
