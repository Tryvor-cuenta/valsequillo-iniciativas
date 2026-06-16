import Link from "next/link";

const QUICK_LINKS = [
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/noticias", label: "Noticias" },
  { href: "/empleo-formacion", label: "Empleo y Formación" },
  { href: "/perfil-contratante", label: "Perfil del Contratante" },
  { href: "/transparencia", label: "Transparencia" },
];

const LEGAL_LINKS = [
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/politica-privacidad", label: "Política de Privacidad" },
  { href: "/politica-cookies", label: "Política de Cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">Valsequillo Iniciativas</h3>
            <p className="text-sm leading-relaxed">
              Empresa pública municipal del Ayuntamiento de Valsequillo. Impulsamos el
              empleo, la formación y el desarrollo económico local en Gran Canaria.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Accesos rápidos</h3>
            <ul className="space-y-1.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Contacto</h3>
            <address className="not-italic text-sm space-y-1.5">
              <p>Ayuntamiento de Valsequillo</p>
              <p>35310 Valsequillo, Gran Canaria</p>
              <p>
                <a href="tel:+34928000000" className="hover:text-white transition-colors">
                  (+34) 928 000 000
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@valsequilloiniciativas.es"
                  className="hover:text-white transition-colors"
                >
                  info@valsequilloiniciativas.es
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>
            © {new Date().getFullYear()} Valsequillo Iniciativas. Todos los derechos
            reservados.
          </p>
          <nav className="flex items-center gap-4" aria-label="Legal">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
          Web realizada por{" "}
          <a
            href="https://3com.es"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            3COM
          </a>
        </p>
      </div>
    </footer>
  );
}
