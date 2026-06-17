import type { Metadata } from "next";
import JobApplicationForm from "./JobApplicationForm";

export const metadata: Metadata = {
  title: "Trabaja con nosotros",
  description: "Envía tu candidatura a Valsequillo Iniciativas de Desarrollo. Buscamos personas comprometidas con el desarrollo local de Valsequillo.",
};

export default function TrabajaCon() {
  return (
    <div>
      <div className="bg-[#00695C] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Trabaja con nosotros</h1>
          <p className="text-[#B2DFDB] text-lg max-w-2xl">
            Si compartes nuestra misión de impulsar el desarrollo económico y social de
            Valsequillo, envíanos tu candidatura. Revisamos cada solicitud con atención.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-800">
          Los datos que nos facilites se tratarán conforme a nuestra{" "}
          <a href="/politica-privacidad" className="underline hover:text-amber-900">política de privacidad</a>{" "}
          y se conservarán durante 1 año o hasta que retires tu consentimiento.
        </div>
        <JobApplicationForm />
      </div>
    </div>
  );
}
