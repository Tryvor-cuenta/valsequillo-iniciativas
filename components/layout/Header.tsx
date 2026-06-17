"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/transparencia", label: "Transparencia" },
  { href: "/trabaja-con-nosotros", label: "Trabaja con nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/actualidad", label: "Actualidad" },
  {
    href: "https://valsequillodegrancanaria.sedelectronica.es/info",
    label: "Sede electrónica",
    external: true,
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Valsequillo Iniciativas"
              width={360}
              height={100}
              className="object-contain h-16 w-auto [mix-blend-mode:multiply]"
              priority
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="px-2.5 py-2 text-xs font-medium text-gray-600 hover:text-[#00695C] hover:bg-[#00695C]/5 rounded-md transition-colors flex items-center gap-1"
              >
                {link.label}
                {link.external && <ExternalLink className="h-3 w-3 opacity-60" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LinkButton href="/contacto" size="sm" className="hidden xl:flex bg-[#00695C] hover:bg-[#004D40] text-xs">
              Contactar
            </LinkButton>
            <button
              className="xl:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={cn("xl:hidden border-t border-gray-200 bg-white", open ? "block" : "hidden")}>
        <nav className="px-4 py-3 space-y-1" aria-label="Menú móvil">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-[#00695C] hover:bg-[#00695C]/5 rounded-md"
              onClick={() => setOpen(false)}
            >
              {link.label}
              {link.external && <ExternalLink className="h-3.5 w-3.5 opacity-60" />}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <LinkButton href="/contacto" size="sm" className="w-full bg-[#00695C] hover:bg-[#004D40]" onClick={() => setOpen(false)}>
              Contactar
            </LinkButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
