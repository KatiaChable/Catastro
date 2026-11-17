/* =========================================
   Componente: Navbar principal
   ========================================= */

import { Link } from 'react-router-dom';
import { LogOut, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks';
import { ROLE_CONFIG, ROUTES } from '@/constants';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const roleConfig = user ? ROLE_CONFIG[user.rol] : null;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={ROUTES.DASHBOARD} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  Catastro Coatzacoalcos
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Sistema de Consulta y Gestión Catastral
                </p>
              </div>
            </Link>
          </div>

          {/* Usuario */}
          <div className="flex items-center gap-4">
            {user && roleConfig && (
              <div className="hidden sm:flex items-center gap-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${roleConfig.color}-100 text-${roleConfig.color}-700`}>
                  {roleConfig.label}
                </span>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {user.persona.nombres} {user.persona.apellidoPaterno}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Menú móvil */}
            <button
              className="sm:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-3">
          {user && (
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                {user.persona.nombres} {user.persona.apellidoPaterno}
              </p>
              <button
                onClick={logout}
                className="w-full text-left text-sm text-red-600 hover:text-red-700"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
