import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y protección de datos de Valsequillo Iniciativas de Desarrollo conforme al RGPD y la LOPDGDD.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Privacidad</h1>
      <p className="text-sm text-gray-400 mb-10">Última actualización: junio de 2025</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Responsable del tratamiento</h2>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                ["Identidad", "VALSEQUILLO INICIATIVAS DE DESARROLLO, S.L.U."],
                ["NIF", "[NIF]"],
                ["Domicilio social", "[DIRECCIÓN]"],
                ["Correo electrónico", "info@valsequilloiniciativas.com"],
                ["Delegado de Protección de Datos (DPD)", "[DPD si aplica — en caso contrario, eliminar este campo]"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium text-gray-600 whitespace-nowrap align-top">{k}</td>
                  <td className="py-2 text-gray-700">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Finalidades, base legal y plazos de conservación</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-1">Formulario de contacto</h3>
              <p><strong>Finalidad:</strong> Gestión y respuesta a las consultas o peticiones enviadas a través del formulario de contacto del sitio web.</p>
              <p className="mt-1"><strong>Base legal:</strong> Interés legítimo del responsable en atender las comunicaciones recibidas (art. 6.1.f RGPD).</p>
              <p className="mt-1"><strong>Conservación:</strong> Los datos se conservarán durante el tiempo necesario para atender la solicitud y, como máximo, durante <strong>1 año</strong> desde su recepción.</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-1">Formulario «Trabaja con nosotros»</h3>
              <p><strong>Finalidad:</strong> Gestión del proceso de selección de personal y evaluación de candidaturas espontáneas.</p>
              <p className="mt-1"><strong>Base legal:</strong> Consentimiento del interesado (art. 6.1.a RGPD), que puede retirar en cualquier momento.</p>
              <p className="mt-1"><strong>Conservación:</strong> Los datos y el CV adjunto se conservarán durante <strong>1 año</strong> desde su envío, o hasta que el interesado retire su consentimiento, lo que ocurra primero.</p>
              <p className="mt-1"><strong>Datos especialmente sensibles:</strong> Le rogamos que no incluya en su CV datos especialmente protegidos (salud, religión, ideología, etc.) que no sean relevantes para la candidatura.</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-1">Cookies técnicas</h3>
              <p><strong>Finalidad:</strong> Funcionamiento técnico del sitio web y mantenimiento de la sesión del usuario.</p>
              <p className="mt-1"><strong>Base legal:</strong> Interés legítimo (art. 6.1.f RGPD). Las cookies estrictamente necesarias no requieren consentimiento previo.</p>
              <p className="mt-1"><strong>Conservación:</strong> Hasta el cierre de la sesión del navegador o según la duración indicada en la Política de Cookies.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Destinatarios de los datos</h2>
          <p>
            Los datos personales no serán cedidos a terceros, salvo obligación legal o en los casos
            en que sea estrictamente necesario para la prestación del servicio solicitado. El sitio
            web utiliza infraestructura técnica de <strong>Supabase</strong> (alojamiento de base de
            datos y almacenamiento de archivos, con servidores en la Unión Europea) y{" "}
            <strong>Vercel</strong> (alojamiento web, servidores en EE. UU. bajo cláusulas
            contractuales tipo aprobadas por la Comisión Europea).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Transferencias internacionales</h2>
          <p>
            El uso de Vercel Inc. implica la transferencia de datos a los Estados Unidos. Dicha
            transferencia está amparada en las Cláusulas Contractuales Estándar (SCC) aprobadas
            por la Comisión Europea mediante Decisión de Ejecución (UE) 2021/914.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Derechos de los interesados</h2>
          <p>Puede ejercer en cualquier momento los siguientes derechos:</p>
          <ul className="mt-2 space-y-1 list-disc pl-5">
            <li><strong>Acceso:</strong> conocer qué datos personales tratamos sobre usted.</li>
            <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
            <li><strong>Oposición:</strong> oponerse al tratamiento basado en interés legítimo.</li>
            <li><strong>Limitación:</strong> solicitar que se suspenda el tratamiento de sus datos.</li>
            <li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado y de uso común.</li>
            <li><strong>Retirada del consentimiento:</strong> en los tratamientos basados en consentimiento, sin que ello afecte a la licitud del tratamiento previo.</li>
          </ul>
          <p className="mt-3">
            Para ejercer sus derechos, dirija un escrito a{" "}
            <a href="mailto:info@valsequilloiniciativas.com" className="text-[#00695C] hover:underline">
              info@valsequilloiniciativas.com
            </a>{" "}
            o a la dirección postal indicada, aportando copia de su DNI u otro documento
            identificativo equivalente.
          </p>
          <p className="mt-2">
            Si considera que el tratamiento de sus datos no se ajusta a la normativa vigente, puede
            presentar una reclamación ante la{" "}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00695C] hover:underline"
            >
              Agencia Española de Protección de Datos (AEPD)
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Seguridad</h2>
          <p>
            Valsequillo Iniciativas de Desarrollo, S.L.U. ha adoptado las medidas técnicas y
            organizativas necesarias para garantizar la seguridad de los datos personales y evitar
            su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado
            de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están
            expuestos, de conformidad con lo establecido en el RGPD y la LOPDGDD.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Cambios en la política de privacidad</h2>
          <p>
            Valsequillo Iniciativas de Desarrollo, S.L.U. se reserva el derecho a modificar la
            presente política de privacidad para adaptarla a novedades legislativas,
            jurisprudenciales o de práctica empresarial. En dichos supuestos, se anunciará con
            antelación razonable en esta página la fecha de entrada en vigor de los cambios.
          </p>
        </section>

      </div>
    </div>
  );
}
