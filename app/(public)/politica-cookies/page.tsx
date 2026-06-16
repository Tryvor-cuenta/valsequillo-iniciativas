import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies de Valsequillo Iniciativas conforme a la normativa AEPD.",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Cookies</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web guardan en el
            navegador del usuario cuando éste los visita. Se utilizan habitualmente para
            hacer que el sitio web funcione correctamente, así como para proporcionar
            información a los propietarios del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies utilizadas en este sitio</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-2 text-left font-semibold">Nombre</th>
                  <th className="border border-gray-200 p-2 text-left font-semibold">Tipo</th>
                  <th className="border border-gray-200 p-2 text-left font-semibold">Duración</th>
                  <th className="border border-gray-200 p-2 text-left font-semibold">Finalidad</th>
                  <th className="border border-gray-200 p-2 text-left font-semibold">Proveedor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-2">cookie-consent</td>
                  <td className="border border-gray-200 p-2">Propia / Esencial</td>
                  <td className="border border-gray-200 p-2">12 meses</td>
                  <td className="border border-gray-200 p-2">Guarda las preferencias de cookies del usuario</td>
                  <td className="border border-gray-200 p-2">Valsequillo Iniciativas</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">_ga, _ga_*</td>
                  <td className="border border-gray-200 p-2">Tercero / Analítica</td>
                  <td className="border border-gray-200 p-2">2 años / 1 año</td>
                  <td className="border border-gray-200 p-2">Análisis estadístico de uso del sitio (solo con consentimiento)</td>
                  <td className="border border-gray-200 p-2">Google Analytics 4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Gestión de preferencias</h2>
          <p>
            Al acceder por primera vez al sitio web, se muestra un banner de cookies que le
            permite aceptar todas las cookies, rechazarlas o configurarlas por categorías.
            En todo momento puede modificar sus preferencias accediendo a la configuración
            de cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Revocación del consentimiento</h2>
          <p>
            Puede retirar su consentimiento en cualquier momento eliminando las cookies
            desde la configuración de su navegador. Tenga en cuenta que esto puede afectar
            al funcionamiento del sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Más información</h2>
          <p>
            Para más información sobre cookies y privacidad, puede consultar nuestra{" "}
            <a href="/politica-privacidad" className="text-[#00695C] hover:underline">
              Política de Privacidad
            </a>{" "}
            o contactar con nosotros en{" "}
            <a href="mailto:info@valsequilloiniciativas.es" className="text-[#00695C] hover:underline">
              info@valsequilloiniciativas.es
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
