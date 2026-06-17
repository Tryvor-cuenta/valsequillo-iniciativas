import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#E8F5E9] border-t border-[#C8E6C9] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo + nombre */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-ayto.png"
              alt="Ayuntamiento de Valsequillo"
              height={40}
              width={40}
              className="object-contain h-10 w-auto"
            />
            <span className="text-sm font-medium text-gray-700">
              Valsequillo Iniciativas de Desarrollo
            </span>
          </div>

          {/* Legal links */}
          <nav className="flex items-center gap-4 text-xs text-gray-500" aria-label="Legal">
            <Link href="/aviso-legal" className="hover:text-[#00695C] transition-colors">Aviso legal</Link>
            <span>·</span>
            <Link href="/politica-privacidad" className="hover:text-[#00695C] transition-colors">Política de privacidad</Link>
            <span>·</span>
            <Link href="/politica-cookies" className="hover:text-[#00695C] transition-colors">Política de cookies</Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Valsequillo Iniciativas de Desarrollo
          </p>
        </div>
      </div>
    </footer>
  );
}
