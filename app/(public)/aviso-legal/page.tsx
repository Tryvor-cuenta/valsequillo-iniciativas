import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal de Valsequillo Iniciativas, S.L.U.",
};

export default function AvisoLegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Aviso Legal</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Datos identificativos</h2>
          <p>
            En cumplimiento con el deber de información recogido en el artículo 10 de la
            Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y
            del Comercio Electrónico, a continuación se reflejan los datos de identificación
            del titular de este sitio web:
          </p>
          <ul className="mt-3 space-y-1 list-none pl-0">
            <li><strong>Denominación social:</strong> Valsequillo Iniciativas, S.L.U.</li>
            <li><strong>CIF:</strong> B-XXXXXXXX (pendiente de confirmar)</li>
            <li><strong>Domicilio social:</strong> Plaza del Ayuntamiento, s/n, 35310 Valsequillo, Gran Canaria</li>
            <li><strong>Correo electrónico:</strong> info@valsequilloiniciativas.es</li>
            <li><strong>Naturaleza:</strong> Empresa pública municipal de capital íntegramente público</li>
            <li><strong>Socio único:</strong> Ayuntamiento de Valsequillo de Gran Canaria</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Condiciones de uso</h2>
          <p>
            El acceso y uso del sitio web atribuye la condición de usuario, que acepta,
            desde dicho acceso y uso, las presentes condiciones. El usuario se compromete
            a hacer un uso adecuado de los contenidos y servicios que Valsequillo
            Iniciativas ofrece a través del portal.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Propiedad intelectual e industrial</h2>
          <p>
            Los contenidos de este sitio web —incluyendo textos, fotografías, gráficos,
            imágenes, iconos, tecnología, software, links y demás contenidos
            audiovisuales— son propiedad de Valsequillo Iniciativas o de terceros
            debidamente autorizados, y están protegidos por los derechos de propiedad
            intelectual e industrial.
          </p>
          <p>
            Queda prohibida la reproducción, distribución, comunicación pública,
            transformación o cualquier otra actividad que se pueda realizar con los
            contenidos de este sitio web, sin el consentimiento previo y expreso de
            Valsequillo Iniciativas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Exclusión de garantías y responsabilidad</h2>
          <p>
            Valsequillo Iniciativas no se hace responsable, en ningún caso, de los daños
            y perjuicios de cualquier naturaleza que pudieran ocasionar, a título
            enunciativo: errores u omisiones en los contenidos, falta de disponibilidad
            del portal o la transmisión de virus o programas maliciosos en los
            contenidos, a pesar de haber adoptado todas las medidas tecnológicas
            necesarias para evitarlo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Ley aplicable y jurisdicción</h2>
          <p>
            Para la resolución de todas las controversias o cuestiones relacionadas con
            el presente sitio web o de las actividades en él desarrolladas, será de
            aplicación la legislación española, a la que se someten expresamente las
            partes, siendo competentes para la resolución de todos los conflictos
            derivados o relacionados con su uso los Juzgados y Tribunales de Las Palmas
            de Gran Canaria.
          </p>
        </section>
      </div>
    </div>
  );
}
