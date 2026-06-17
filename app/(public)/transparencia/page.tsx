import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { ChevronDown, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparencia",
  description: "Portal de transparencia de Valsequillo Iniciativas de Desarrollo conforme a la Ley 19/2013 de transparencia, acceso a la información pública y buen gobierno.",
};

type Apartado = { titulo: string; estado: "disponible" | "proceso" | "enlace"; contenido: string; url?: string; prevista?: string };
type Seccion = { art: string; titulo: string; apartados: Apartado[] };

const SECCIONES: Seccion[] = [
  {
    art: "Art. 6",
    titulo: "Información institucional, organizativa y de planificación",
    apartados: [
      {
        titulo: "Funciones y normativa aplicable",
        estado: "disponible",
        contenido: "Valsequillo Iniciativas de Desarrollo, S.L.U. es una sociedad pública municipal de capital íntegramente público, constituida por el Ayuntamiento de Valsequillo de Gran Canaria para gestionar y coordinar las políticas locales de empleo, formación, emprendimiento y dinamización económica. Su actividad se rige por sus Estatutos Sociales, la Ley 9/2017 de Contratos del Sector Público, la Ley 7/1985 Reguladora de las Bases del Régimen Local y la normativa autonómica canaria aplicable.",
      },
      {
        titulo: "Estructura organizativa",
        estado: "proceso",
        contenido: "El organigrama y la estructura de los órganos de gobierno y gestión se encuentra en proceso de publicación.",
        prevista: "Tercer trimestre 2025",
      },
      {
        titulo: "Planes y programas anuales",
        estado: "proceso",
        contenido: "Los planes anuales de actuación y los objetivos estratégicos están en proceso de publicación.",
        prevista: "Cuarto trimestre 2025",
      },
    ],
  },
  {
    art: "Art. 7",
    titulo: "Información de relevancia jurídica",
    apartados: [
      {
        titulo: "Instrucciones y respuestas a consultas",
        estado: "proceso",
        contenido: "Las instrucciones, acuerdos, circulares y respuestas a consultas de relevancia jurídica están en proceso de recopilación y publicación.",
        prevista: "Cuarto trimestre 2025",
      },
      {
        titulo: "Proyectos normativos en tramitación",
        estado: "proceso",
        contenido: "En caso de existir proyectos normativos en tramitación, serán publicados en esta sección.",
        prevista: "Cuarto trimestre 2025",
      },
      {
        titulo: "Memorias e informes de impacto",
        estado: "proceso",
        contenido: "Las memorias e informes que obren en poder de la sociedad en tramitación de proyectos normativos serán publicados progresivamente.",
        prevista: "Primer trimestre 2026",
      },
    ],
  },
  {
    art: "Art. 8",
    titulo: "Información económica, presupuestaria y estadística",
    apartados: [
      {
        titulo: "Contratos y licitaciones",
        estado: "enlace",
        contenido: "Consulta las licitaciones y contratos formalizados en el Perfil del Contratante.",
        url: "/perfil-contratante",
      },
      {
        titulo: "Convenios de colaboración",
        estado: "proceso",
        contenido: "Los convenios de colaboración suscritos con otras administraciones y entidades están en proceso de publicación.",
        prevista: "Cuarto trimestre 2025",
      },
      {
        titulo: "Subvenciones y ayudas concedidas",
        estado: "proceso",
        contenido: "La relación de subvenciones concedidas por importe superior a 3.000€ está en proceso de publicación.",
        prevista: "Primer trimestre 2026",
      },
      {
        titulo: "Presupuesto",
        estado: "proceso",
        contenido: "El presupuesto anual aprobado y la ejecución presupuestaria trimestral están en proceso de publicación.",
        prevista: "Cuarto trimestre 2025",
      },
      {
        titulo: "Cuentas anuales e informes de auditoría",
        estado: "proceso",
        contenido: "Las cuentas anuales auditadas y los informes de los órganos de control interno y externo están en proceso de publicación.",
        prevista: "Primer trimestre 2026",
      },
      {
        titulo: "Retribuciones de altos cargos y máximos responsables",
        estado: "proceso",
        contenido: "Las retribuciones anuales de los altos cargos y máximos responsables de la sociedad están en proceso de publicación.",
        prevista: "Cuarto trimestre 2025",
      },
      {
        titulo: "Relación de bienes inmuebles",
        estado: "proceso",
        contenido: "La relación de los bienes inmuebles que son de propiedad o sobre los que se ostenta algún derecho real está en proceso de publicación.",
        prevista: "Primer trimestre 2026",
      },
    ],
  },
  {
    art: "Art. 12-22",
    titulo: "Derecho de acceso a la información pública",
    apartados: [
      {
        titulo: "Cómo ejercer el derecho de acceso",
        estado: "disponible",
        contenido: "Cualquier persona, a título individual o en nombre y representación de una persona jurídica, puede solicitar acceso a la información pública que obre en poder de Valsequillo Iniciativas de Desarrollo, S.L.U. Las solicitudes pueden presentarse a través de la Sede Electrónica del Ayuntamiento de Valsequillo o mediante escrito dirigido a nuestra sede social. La resolución se emitirá en el plazo máximo de un mes desde la recepción de la solicitud, prorrogable por otro mes adicional cuando el volumen o la complejidad de la información lo justifique. Contra la resolución o el silencio administrativo podrá presentarse reclamación ante el Consejo de Transparencia y Buen Gobierno.",
      },
      {
        titulo: "Sede electrónica — presentar solicitud",
        estado: "enlace",
        contenido: "Presenta tu solicitud de acceso a la información a través de la sede electrónica del Ayuntamiento de Valsequillo.",
        url: "https://valsequillodegrancanaria.sedelectronica.es/info",
      },
      {
        titulo: "Límites y causas de inadmisión",
        estado: "disponible",
        contenido: "El derecho de acceso podrá ser limitado cuando la información afecte a la seguridad nacional, la defensa, las relaciones exteriores, la seguridad pública, la prevención, investigación y sanción de infracciones, la igualdad de las partes en procesos judiciales, las funciones administrativas de vigilancia, inspección y control, los intereses económicos y comerciales, la política económica y monetaria, el secreto profesional y la propiedad intelectual e industrial, la garantía de la confidencialidad o el secreto requerido en procesos de toma de decisión, y la protección del medio ambiente (art. 14 Ley 19/2013).",
      },
    ],
  },
];

export default function TransparenciaPage() {
  return (
    <div>
      <PageHero
        title="Transparencia"
        subtitle="Publicidad activa conforme a la Ley 19/2013, de 9 de diciembre, de transparencia, acceso a la información pública y buen gobierno."
        image="/images/hero.jpg"
        objectPosition="center top"
      />

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          La información recogida en esta sección se publica de conformidad con la{" "}
          <strong>Ley 19/2013, de 9 de diciembre</strong>, de transparencia, acceso a la
          información pública y buen gobierno, y la{" "}
          <strong>Ley 12/2014, de 26 de diciembre</strong>, de transparencia y de acceso a la
          información pública de Canarias.
        </div>

        {SECCIONES.map((seccion) => (
          <section key={seccion.art}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold bg-[#00695C]/10 text-[#00695C] px-2.5 py-1 rounded-full">
                {seccion.art}
              </span>
              <h2 className="text-xl font-bold text-gray-900">{seccion.titulo}</h2>
            </div>

            <div className="space-y-3">
              {seccion.apartados.map((ap) => (
                <details key={ap.titulo} className="group border border-gray-200 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none select-none hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        ap.estado === "disponible" ? "bg-green-500" :
                        ap.estado === "enlace" ? "bg-blue-500" : "bg-amber-400"
                      }`} />
                      <h3 className="font-medium text-gray-900 text-sm">{ap.titulo}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {ap.estado === "proceso" && ap.prevista && (
                        <span className="text-xs text-amber-600 hidden sm:block">Previsto: {ap.prevista}</span>
                      )}
                      {ap.estado === "disponible" && (
                        <span className="text-xs text-green-600 hidden sm:block">Disponible</span>
                      )}
                      <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180 shrink-0" />
                    </div>
                  </summary>
                  <div className="px-5 pb-4 pt-1 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed">{ap.contenido}</p>
                    {ap.estado === "proceso" && (
                      <p className="text-xs text-amber-600 mt-2 font-medium">
                        🕐 En proceso de publicación{ap.prevista ? ` — Fecha prevista: ${ap.prevista}` : ""}
                      </p>
                    )}
                    {ap.estado === "enlace" && ap.url && (
                      <a
                        href={ap.url}
                        target={ap.url.startsWith("http") ? "_blank" : undefined}
                        rel={ap.url.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#00695C] hover:underline font-medium"
                      >
                        Ir a la sección
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        {/* Leyenda */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500" />Información disponible</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />En proceso de publicación</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" />Enlace a sección específica</span>
        </div>

        {/* Contacto acceso información */}
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-2">Contacto para solicitudes de información</h2>
          <p className="text-sm text-gray-600">
            Para ejercer tu derecho de acceso a la información, puedes escribirnos a{" "}
            <a href="mailto:info@valsequilloiniciativas.com" className="text-[#00695C] hover:underline">
              info@valsequilloiniciativas.com
            </a>{" "}
            o usar la sede electrónica del Ayuntamiento de Valsequillo.
          </p>
          <a
            href="https://valsequillodegrancanaria.sedelectronica.es/info"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-[#00695C] hover:underline"
          >
            Acceder a la sede electrónica <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
