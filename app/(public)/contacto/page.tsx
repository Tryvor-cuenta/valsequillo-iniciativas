import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Valsequillo Iniciativas. Estamos aquí para ayudarte con empleo, formación, emprendimiento y servicios municipales.",
};

export default function ContactoPage() {
  return (
    <div>
      <PageHero
        title="Contacto"
        subtitle="Estamos aquí para ayudarte. Escríbenos o visítanos en nuestras oficinas."
        image="/images/vegas-panoramica.jpg"
        objectPosition="bottom center"
      />

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Datos de contacto */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Información de contacto</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#00695C]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-4.5 w-4.5 text-[#00695C]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dirección</p>
                    <p className="text-sm text-gray-500">
                      Plaza del Ayuntamiento, s/n<br />
                      35310 Valsequillo, Gran Canaria
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#00695C]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="h-4.5 w-4.5 text-[#00695C]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Teléfono</p>
                    <a
                      href="tel:+34928000000"
                      className="text-sm text-gray-500 hover:text-[#00695C]"
                    >
                      (+34) 928 000 000
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#00695C]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="h-4.5 w-4.5 text-[#00695C]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Correo electrónico</p>
                    <a
                      href="mailto:info@valsequilloiniciativas.es"
                      className="text-sm text-gray-500 hover:text-[#00695C]"
                    >
                      info@valsequilloiniciativas.es
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#00695C]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="h-4.5 w-4.5 text-[#00695C]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Horario de atención</p>
                    <p className="text-sm text-gray-500">
                      Lunes a viernes: 8:00 – 15:00 h
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Formulario */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
