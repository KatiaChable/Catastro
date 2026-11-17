/* =========================================
   Layout para páginas de autenticación
   ========================================= */

import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-white">C</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Catastro Municipal
          </h1>
          <p className="text-primary-200 text-sm mt-1">
            Coatzacoalcos, Veracruz
          </p>
        </div>

        {/* Contenido */}
        <Outlet />
      </div>
    </div>
  );
}
