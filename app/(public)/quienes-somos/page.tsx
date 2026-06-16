import type { Metadata } from "next";
import { Users, Target, Eye, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Conoce Valsequillo Iniciativas, empresa pública municipal del Ayuntamiento de Valsequillo que impulsa el desarrollo económico y social del municipio.",
};

const VALORES = [
  { icon: Star, title: "Compromiso público", desc: "Actuamos con transparencia y responsabilidad al servicio de la ciudadanía." },
  { icon: Users, title: "Proximidad", desc: "Atención cercana y personalizada a personas y empresas del municipio." },
  { icon: Target, title: "Orientación a resultados", desc: "Diseñamos programas con impacto real y medible en el territorio." },
  { icon: Eye, title: "Innovación social", desc: "Exploramos nuevas fórmulas para dinamizar la economía local." },
];

export default function QuienesSomosPage() {
  return (
    <div>
      {/* Header section */}
      <div className="bg-[#00695C] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Quiénes somos</h1>
          <p className="text-[#B2DFDB] text-lg max-w-2xl">
            Una entidad al servicio del desarrollo económico y social de Valsequillo.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {/* Misión */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Misión</h2>
            <p className="text-gray-600 leading-relaxed">
              Valsequillo Iniciativas es la empresa pública municipal creada por el
              Ayuntamiento de Valsequillo para gestionar y coordinar las políticas de
              empleo, formación, emprendimiento y dinamización económica del municipio.
              Actuamos como instrumento de la administración local para dar respuesta ágil
              y especializada a las necesidades del tejido productivo y de la ciudadanía.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Visión</h2>
            <p className="text-gray-600 leading-relaxed">
              Aspiramos a ser referente en el desarrollo local de Gran Canaria, generando
              oportunidades reales de empleo y crecimiento empresarial, y contribuyendo a
              la cohesión social y económica del municipio de Valsequillo.
            </p>
          </div>
        </section>

        {/* Descripción */}
        <section className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Empresa pública municipal de Valsequillo
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
            <p>
              Constituida como sociedad municipal de capital íntegramente público,
              Valsequillo Iniciativas opera bajo el control y la tutela del Ayuntamiento
              de Valsequillo, garantizando la alineación de su actividad con los objetivos
              del Plan de Desarrollo Local y las prioridades marcadas por el gobierno
              municipal.
            </p>
            <p>
              Nuestra actividad abarca el ciclo completo de apoyo a personas y empresas:
              desde la orientación laboral y la formación hasta el asesoramiento al
              emprendedor, la gestión de espacios de coworking, y la ejecución de
              proyectos de dinamización comunitaria cofinanciados con fondos europeos,
              estatales y canarios.
            </p>
            <p>
              Colaboramos con el Servicio Canario de Empleo, el Cabildo de Gran Canaria,
              la Federación Canaria de Municipios y organismos europeos para maximizar el
              impacto de los programas y garantizar el acceso de la ciudadanía a todos los
              recursos disponibles.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nuestros valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALORES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#00695C]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-[#00695C]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
