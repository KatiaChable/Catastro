import { Outlet, useLocation } from 'react-router-dom';
import gobiernoLogo from '@/assets/images/gobierno-logo.png';
import authBg from '@/assets/images/auth-bg.jpg';

export default function AuthLayout() {
  const location = useLocation();
  const isRegister = location.pathname.includes('/registro');

  return (
    <div className="min-h-screen flex flex-col bg-[#6e0e29]">
      {/* 1. Header Institucional Coatzacoalcos */}
      <header className="bg-[#6e0e29] text-white px-4 sm:px-8 py-2.5 flex items-center justify-between z-10 border-b border-black/15 shadow-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          <img
            src={gobiernoLogo}
            alt="Gobierno de Coatzacoalcos 2026-2029"
            className="h-8 sm:h-9 object-contain"
          />
          <div className="hidden md:block pl-5 border-l border-white/20">
            <p className="text-[10px] tracking-wider uppercase text-white/70 font-medium leading-none">
              DIRECCIÓN DE CATASTRO MUNICIPAL
            </p>
            <h1 className="text-sm font-semibold text-white tracking-tight mt-0.5">
              Visor Cartográfico Catastral
            </h1>
          </div>
        </div>

        <div>
          <span className="text-xs text-white/85 font-normal">
            Coatzacoalcos, Veracruz
          </span>
        </div>
      </header>

      {/* 2. Cuerpo con el fondo oficial y tarjeta a la derecha */}
      <main
        className="flex-1 relative flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundColor: '#6e0e29',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[560px]">
          
          {/* Lado Izquierdo: Texto elegante y proporcionado junto al emblema C */}
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-center pl-28 xl:pl-36">
            <div className="max-w-[310px] space-y-4">
              <p className="text-[17px] text-white font-normal leading-[1.4] tracking-normal">
                {isRegister
                  ? 'Regístrate con tu correo electrónico y una contraseña para acceder al portal de catastro de Coatzacoalcos.'
                  : 'Inicia sesión con tu correo electrónico y contraseña para acceder al portal de catastro de Coatzacoalcos.'}
              </p>

              <div className="pt-2 text-white/80 text-[11px] leading-tight space-y-0.5">
                <p className="font-normal text-white/90">
                  Gobierno de la ciudad de Coatzacoalcos
                </p>
                <p className="text-white/70">
                  Administración 2026 - 2029
                </p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Tarjeta del formulario (Login / Registro) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Outlet />
          </div>

        </div>
      </main>

      {/* 3. Footer Oficial */}
      <footer className="bg-white text-gray-600 text-[11px] py-2.5 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-gray-200 z-10">
        <div>
          <span>© 2026 · Ayuntamiento de Coatzacoalcos</span>
        </div>
        <div className="text-center font-normal text-gray-600">
          <span>Dirección de Catastro Municipal</span>
        </div>
        <div>
          <a
            href="#privacidad"
            onClick={(e) => {
              e.preventDefault();
              alert(
                'Aviso de Privacidad Simplificado:\nEl Ayuntamiento de Coatzacoalcos y la Dirección de Catastro Municipal protegen sus datos personales conforme a la Ley de Catastro del Estado de Veracruz.'
              );
            }}
            className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
          >
            Aviso de privacidad
          </a>
        </div>
      </footer>
    </div>
  );
}
