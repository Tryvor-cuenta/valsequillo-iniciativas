import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparencia",
  description:
    "Portal de transparencia de Valsequillo Iniciativas conforme a la Ley 19/2013 de transparencia, acceso a la información pública y buen gobierno.",
};

const SECTIONS = [
  {
    title: "Información organizativa y de planificación",
    items: [
      "Estatutos y escritura de constitución de la sociedad",
      "Organigrama y estructura organizativa",
      "Plan de actuación anual",
      "Memoria de actividades",
      "Convenios de colaboración suscritos",
    ],
  },
  {
    title: "Retribuciones y personal",
    items: [
      "Relación de puestos de trabajo (RPT)",
      "Retribuciones de altos cargos y directivos",
      "Oferta de Empleo Público",
      "Estadísticas de personal",
    ],
  },
  {
    title: "Contratos y licitaciones",
    items: [
      "Contratos formalizados",
      "Procedimientos de licitación activos",
      "Actas de la Mesa de Contratación",
      "Convenios de colaboración",
    ],
  },
  {
    title: "Subvenciones y ayudas",
    items: [
      "Subvenciones concedidas",
      "Bases reguladoras de subvenciones",
      "Convocatorias de ayudas públicas",
      "Fondos europeos gestionados",
    ],
  },
  {
    title: "Presupuesto y cuentas anuales",
    items: [
      "Presupuesto anual",
      "Cuentas anuales auditadas",
      "Informes de auditoría externa",
      "Ejecución presupuestaria trimestral",
    ],
  },
];

export default function TransparenciaPage() {
  return (
    <div>
      <div className="bg-[#00695C] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Transparencia</h1>
          <p className="text-[#B2DFDB] text-lg max-w-2xl">
            Información pública conforme a la Ley 19/2013 de transparencia, acceso a la
            información pública y buen gobierno.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-10 text-sm text-blue-800">
          La información recogida en esta sección se publica de conformidad con la Ley
          19/2013, de 9 de diciembre, de transparencia, acceso a la información pública y
          buen gobierno, y la Ley 12/2014, de 26 de diciembre, de transparencia y de acceso
          a la información pública de Canarias.
        </div>

        <div className="space-y-4">
          {SECTIONS.map((section) => (
            <details key={section.title} className="group border border-gray-200 rounded-lg">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none hover:bg-gray-50 rounded-lg">
                <h2 className="font-semibold text-gray-900">{section.title}</h2>
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5">
                <ul className="space-y-2 pt-2 border-t border-gray-100">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#00695C] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-gray-400">
                  Para solicitar acceso a estos documentos, contacte con nosotros en{" "}
                  <a
                    href="mailto:transparencia@valsequilloiniciativas.es"
                    className="text-[#00695C] hover:underline"
                  >
                    transparencia@valsequilloiniciativas.es
                  </a>
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="font-semibold text-gray-900 mb-2">Derecho de acceso a la información</h2>
          <p className="text-sm text-gray-600 mb-3">
            Cualquier persona puede ejercer su derecho de acceso a la información pública
            mediante solicitud dirigida a Valsequillo Iniciativas. Puede presentar su
            solicitud por correo electrónico o de forma presencial en nuestras oficinas.
          </p>
          <p className="text-sm text-gray-500">
            Plazo máximo de resolución: <strong>30 días hábiles</strong> desde la recepción
            de la solicitud.
          </p>
        </div>
      </div>
    </div>
  );
}
