import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Acceso al panel",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#00695C] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">VI</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de administración</h1>
          <p className="text-sm text-gray-500 mt-1">Valsequillo Iniciativas</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
