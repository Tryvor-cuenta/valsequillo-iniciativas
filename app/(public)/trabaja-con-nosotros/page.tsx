import type { Metadata } from "next";
import JobApplicationForm from "./JobApplicationForm";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Trabaja con nosotros",
  description: "Envía tu candidatura a Valsequillo Iniciativas de Desarrollo. Buscamos personas comprometidas con el desarrollo local de Valsequillo.",
};

export default function TrabajaCon() {
  return (
    <div>
      <PageHero
        title="Trabaja con nosotros"
        subtitle="Si compartes nuestra misión de impulsar el desarrollo económico y social de Valsequillo, envíanos tu candidatura."
        image="/images/pueblo-panoramica.jpg"
        objectPosition="center bottom"
      />

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
