"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Briefcase,
  FolderOpen,
  Users,
  BookOpen,
  Building2,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/noticias", icon: Newspaper, label: "Noticias" },
  { href: "/admin/servicios", icon: Briefcase, label: "Servicios" },
  { href: "/admin/proyectos", icon: FolderOpen, label: "Proyectos" },
  { href: "/admin/empleos", icon: Users, label: "Empleos" },
  { href: "/admin/formacion", icon: BookOpen, label: "Formación" },
  { href: "/admin/licitaciones", icon: Building2, label: "Licitaciones" },
  { href: "/admin/usuarios", icon: Users, label: "Usuarios" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="w-56 shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00695C] flex items-center justify-center">
            <span className="text-white font-bold text-xs">VI</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900 leading-tight">Valsequillo</p>
            <p className="text-xs text-gray-400 leading-tight">Iniciativas</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {NAV.map(({ href, icon: Icon, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-[#00695C]/10 text-[#00695C] font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 border-t border-gray-100 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
        >
          <ExternalLink className="h-4 w-4" /> Ver sitio público
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
