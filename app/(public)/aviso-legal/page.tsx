import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal de Valsequillo Iniciativas de Desarrollo, S.L.U.",
};

export default function AvisoLegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Aviso Legal</h1>
      <p className="text-sm text-gray-400 mb-10">Última actualización: junio de 2025</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Datos identificativos del titular</h2>
          <p>
            En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE),
            se facilitan a continuación los datos identificativos del titular del sitio web:
          </p>
          <table className="w-full text-sm border-collapse mt-4">
            <tbody>
              {[
                ["Denominación social", "VALSEQUILLO INICIATIVAS DE DESARROLLO, S.L.U."],
                ["NIF", "[NIF]"],
                ["Domicilio social", "[DIRECCIÓN]"],
                ["Correo electrónico", "info@valsequilloiniciativas.com"],
                ["Sitio web", "https://valsequillo-iniciativas-sigma.vercel.app"],
                ["Naturaleza jurídica", "Sociedad de Responsabilidad Limitada Unipersonal (S.L.U.) de capital íntegramente público"],
                ["Socio único", "Ayuntamiento de Valsequillo de Gran Canaria"],
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
          <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Objeto y ámbito de aplicación</h2>
          <p>
            El presente Aviso Legal regula el acceso y la utilización del sitio web titularidad de
            Valsequillo Iniciativas de Desarrollo, S.L.U. (en adelante, «la Sociedad»). El acceso
            al sitio web implica la aceptación plena y sin reservas de las presentes condiciones.
            La Sociedad se reserva el derecho a modificar el presente Aviso Legal en cualquier
            momento, siendo responsabilidad del usuario su lectura periódica.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Condiciones de uso</h2>
          <p>
            El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que la
            Sociedad ofrece a través del sitio web, con sujeción a la ley, la moral, las buenas
            costumbres y el orden público. Queda expresamente prohibido:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Reproducir, distribuir o modificar los contenidos del sitio web sin autorización expresa.</li>
            <li>Utilizar el sitio web con fines ilícitos o que puedan causar daños a terceros.</li>
            <li>Introducir o difundir en la red programas maliciosos o cualquier otro contenido que pueda causar daños en los sistemas informáticos.</li>
            <li>Intentar acceder o utilizar las cuentas de correo electrónico de otros usuarios o áreas restringidas de los sistemas informáticos.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del sitio web —incluyendo, a título enunciativo y no limitativo,
            textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y
            demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos
            fuente— son propiedad intelectual de la Sociedad o de terceros que han autorizado
            expresamente su uso, y están protegidos por la normativa española e internacional
            sobre propiedad intelectual e industrial.
          </p>
          <p className="mt-3">
            El acceso al sitio web no otorga al usuario derecho alguno sobre los derechos de
            propiedad intelectual e industrial. Queda expresamente prohibida la reproducción,
            distribución, comunicación pública, transformación o cualquier otra forma de
            explotación de los contenidos del sitio web sin consentimiento previo y expreso de
            la Sociedad.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Exclusión de garantías y responsabilidad</h2>
          <p>
            La Sociedad no garantiza la disponibilidad y continuidad del funcionamiento del sitio
            web. Cuando ello sea razonablemente posible, la Sociedad advertirá previamente de las
            interrupciones en el funcionamiento del mismo. La Sociedad tampoco garantiza la
            utilidad del sitio web para la realización de ninguna actividad en particular, ni su
            infalibilidad y, en particular, aunque no de modo exclusivo, que los usuarios puedan
            efectivamente utilizar el sitio web, acceder a las distintas páginas web que forman el
            sitio web o utilizar los servicios.
          </p>
          <p className="mt-3">
            La Sociedad excluye, con toda la extensión permitida por el ordenamiento jurídico,
            cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan
            deberse a la falta de disponibilidad o de continuidad del funcionamiento del sitio web,
            a la defraudación de la utilidad que los usuarios hubieren podido atribuir al sitio web,
            a la falibilidad del sitio web, y en particular, aunque no de modo exclusivo, a los
            fallos en el acceso a las distintas páginas web o a aquellas desde las que, en su caso,
            se prestan los servicios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Protección de datos personales</h2>
          <p>
            El tratamiento de los datos personales que el usuario facilite a través del sitio web
            se rige por lo dispuesto en la{" "}
            <a href="/politica-privacidad" className="text-[#00695C] hover:underline">
              Política de Privacidad
            </a>
            , que el usuario debe leer y aceptar antes de proporcionar sus datos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Cookies</h2>
          <p>
            El sitio web utiliza cookies propias y de terceros. Para más información, consulte la{" "}
            <a href="/politica-cookies" className="text-[#00695C] hover:underline">
              Política de Cookies
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Ley aplicable y jurisdicción</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para la resolución de
            cualquier controversia que pudiera suscitarse en relación con el acceso o el uso del
            sitio web, la Sociedad y el usuario, con renuncia expresa a cualquier otro fuero que
            pudiera corresponderles, se someten a la jurisdicción de los Juzgados y Tribunales de
            Las Palmas de Gran Canaria.
          </p>
        </section>

      </div>
    </div>
  );
}
