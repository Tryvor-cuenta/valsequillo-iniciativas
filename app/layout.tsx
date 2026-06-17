import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.valsequilloiniciativas.com"),
  title: {
    template: "%s | Valsequillo Iniciativas",
    default: "Valsequillo Iniciativas — Empresa Pública Municipal de Valsequillo",
  },
  description:
    "Empresa pública municipal del Ayuntamiento de Valsequillo que impulsa el empleo, la formación, el emprendimiento y el desarrollo económico local en Gran Canaria.",
  icons: {
    icon: "/images/isotipo.jpg",
    shortcut: "/images/isotipo.jpg",
    apple: "/images/isotipo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Valsequillo Iniciativas",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
