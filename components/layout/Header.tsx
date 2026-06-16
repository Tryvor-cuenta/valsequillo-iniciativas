"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/noticias", label: "Noticias" },
  { href: "/empleo-formacion", label: "Empleo y Formación" },
  { href: "/perfil-contratante", label: "Perfil del Contratante" },
  { href: "/transparencia", label: "Transparencia" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 relative">
              <Image
                src="/logo.svg"
                alt="Valsequillo Iniciativas"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-semibold text-gray-900 text-sm leading-tight hidden sm:block">
              Valsequillo<br />Iniciativas
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-700 hover:text-[#00695C] hover:bg-[#00695C]/5 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LinkButton
              href="/contacto"
              size="sm"
              className="hidden lg:flex bg-[#00695C] hover:bg-[#004D40]"
            >
              Contactar
            </LinkButton>
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden border-t border-gray-200 bg-white transition-all duration-200",
          open ? "block" : "hidden"
        )}
      >
        <nav className="px-4 py-3 space-y-1" aria-label="Menú móvil">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm text-gray-700 hover:text-[#00695C] hover:bg-[#00695C]/5 rounded-md"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <LinkButton
              href="/contacto"
              size="sm"
              className="w-full bg-[#00695C] hover:bg-[#004D40]"
              onClick={() => setOpen(false)}
            >
              Contactar
            </LinkButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
