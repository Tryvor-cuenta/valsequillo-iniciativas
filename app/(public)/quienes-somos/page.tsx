import type { Metadata } from "next";
import Image from "next/image";
import { Users, Target, Eye, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Conoce Valsequillo Iniciativas de Desarrollo, empresa pública municipal del Ayuntamiento de Valsequillo que impulsa el desarrollo económico y social del municipio.",
};

const VALORES = [
  { icon: Star,   title: "Compromiso público",  desc: "Actuamos con transparencia y responsabilidad al servicio de la ciudadanía." },
  { icon: Users,  title: "Proximidad",           desc: "Atención cercana y personalizada a personas y empresas del municipio." },
  { icon: Target, title: "Orientación a resultados", desc: "Diseñamos programas con impacto real y medible en el territorio." },
  { icon: Eye,    title: "Innovación social",    desc: "Exploramos nuevas fórmulas para dinamizar la economía local." },
];

export default function QuienesSomosPage() {
  return (
    <div>
      {/* Hero con panorámica del pueblo */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src="/images/pueblo-panoramica.jpg"
          alt="Panorámica de Valsequillo"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#00695C]/70" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10 max-w-4xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-white mb-2">Quiénes somos</h1>
          <p className="text-[#B2DFDB] text-lg">
            Una entidad al servicio del desarrollo económico y social de Valsequillo.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">

        {/* Misión + Visión */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Misión</h2>
            <p className="text-gray-600 leading-relaxed">
              Valsequillo Iniciativas de Desarrollo es la empresa pública municipal creada por el
              Ayuntamiento de Valsequillo para gestionar y coordinar las políticas de empleo,
              formación, emprendimiento y dinamización económica del municipio. Actuamos como
              instrumento ágil de la administración local para dar respuesta especializada a las
              necesidades del tejido productivo y de la ciudadanía.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Visión</h2>
            <p className="text-gray-600 leading-relaxed">
              Aspiramos a ser referente en el desarrollo local de Gran Canaria, generando
              oportunidades reales de empleo y crecimiento empresarial, y contribuyendo a la
              cohesión social y económica del municipio de Valsequillo.
            </p>
          </div>
        </section>

        {/* Imagen fachada Ayuntamiento + texto descripción */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-xl overflow-hidden aspect-video shadow-md">
            <Image
              src="/images/fachada-ayuntamiento.jpg"
              alt="Fachada del Ayuntamiento de Valsequillo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Empresa pública municipal de Valsequillo
            </h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-sm">
              <p>
                Constituida como sociedad municipal de capital íntegramente público, Valsequillo
                Iniciativas de Desarrollo opera bajo el control y la tutela del Ayuntamiento de
                Valsequillo, garantizando la alineación de su actividad con los objetivos del Plan
                de Desarrollo Local.
              </p>
              <p>
                Nuestra actividad abarca el ciclo completo de apoyo a personas y empresas: desde
                la orientación laboral y la formación hasta el asesoramiento al emprendedor, la
                gestión de espacios de coworking, y la ejecución de proyectos de dinamización
                comunitaria cofinanciados con fondos europeos, estatales y canarios.
              </p>
              <p>
                Colaboramos con el Servicio Canario de Empleo, el Cabildo de Gran Canaria, la
                Federación Canaria de Municipios y organismos europeos para maximizar el impacto
                de los programas.
              </p>
            </div>
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

        {/* Imagen paisaje vegas */}
        <section className="relative rounded-xl overflow-hidden h-48 sm:h-64 shadow-md">
          <Image
            src="/images/vegas-panoramica.jpg"
            alt="Vegas de Valsequillo, medianías"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#00695C]/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-xl font-semibold text-center px-4 drop-shadow">
              Valsequillo · Gran Canaria
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
