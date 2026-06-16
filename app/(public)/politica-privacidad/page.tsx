import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y protección de datos de Valsequillo Iniciativas conforme al RGPD.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Responsable del tratamiento</h2>
          <ul className="space-y-1 list-none pl-0">
            <li><strong>Identidad:</strong> Valsequillo Iniciativas, S.L.U.</li>
            <li><strong>CIF:</strong> B-XXXXXXXX</li>
            <li><strong>Dirección:</strong> Plaza del Ayuntamiento, s/n, 35310 Valsequillo, Gran Canaria</li>
            <li><strong>Contacto:</strong> info@valsequilloiniciativas.es</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Finalidades del tratamiento</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Formulario de contacto:</strong> Gestionar las consultas y comunicaciones
              recibidas a través del formulario del sitio web.
            </li>
            <li>
              <strong>Analytics:</strong> Análisis estadístico del uso del sitio web mediante
              Google Analytics 4 (solo si el usuario acepta cookies analíticas).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Base legal</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Formulario de contacto: <strong>Interés legítimo</strong> (Art. 6.1.f RGPD) para atender consultas.</li>
            <li>Cookies analíticas: <strong>Consentimiento</strong> (Art. 6.1.a RGPD).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Plazo de conservación</h2>
          <p>
            Los datos del formulario de contacto se conservarán durante el tiempo
            necesario para atender su consulta y, en todo caso, durante el tiempo
            legalmente exigible para el cumplimiento de obligaciones legales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Transferencias internacionales</h2>
          <p>
            El uso de Google Analytics 4 implica la transferencia de datos a Google LLC
            (Estados Unidos), amparada en las Cláusulas Contractuales Estándar aprobadas
            por la Comisión Europea.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Sus derechos</h2>
          <p>
            Puede ejercer sus derechos de acceso, rectificación, supresión, oposición,
            limitación del tratamiento y portabilidad dirigiéndose a{" "}
            <a href="mailto:info@valsequilloiniciativas.es" className="text-[#00695C] hover:underline">
              info@valsequilloiniciativas.es
            </a>{" "}
            o a la dirección postal indicada, aportando copia de su DNI.
          </p>
          <p>
            Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española
            de Protección de Datos (www.aepd.es).
          </p>
        </section>
      </div>
    </div>
  );
}
