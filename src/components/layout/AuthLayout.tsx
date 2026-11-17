import { Outlet, useLocation } from 'react-router-dom';
import logoOficial from '@/assets/images/logo-oficial.png';
import emblemaC from '@/assets/images/emblema-c.png';
import AuthBackground from './AuthBackground';

export default function AuthLayout() {
  const location = useLocation();
  const isRegister = location.pathname.includes('/registro');

  return (
    <AuthBackground>
      {/* 1. Header Institucional Coatzacoalcos */}
      <header className="bg-[#660d26]/90 backdrop-blur-md text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 shadow-sm z-20">
        <div className="flex items-center gap-4 sm:gap-6">
          <img
            src={logoOficial}
            alt="Gobierno de Coatzacoalcos 2026 - 2029"
            className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-sm"
          />
          <div className="hidden md:block pl-5 border-l border-white/20">
            <p className="text-[10px] tracking-widest uppercase text-amber-200/90 font-medium leading-none">
              DIRECCIÓN DE CATASTRO MUNICIPAL
            </p>
            <h1 className="text-sm font-semibold text-white tracking-wide mt-1">
              Visor Cartográfico Catastral
            </h1>
          </div>
        </div>

        <div>
          <span className="text-xs sm:text-sm text-white/90 font-medium tracking-wide">
            Coatzacoalcos, Veracruz
          </span>
        </div>
      </header>

      {/* 2. Cuerpo Central */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[540px]">
          
          {/* Lado Izquierdo: Emblema C + Texto Institucional (Diseño idéntico a la referencia) */}
          <div className="hidden lg:flex lg:col-span-7 items-center gap-7 pl-6 xl:pl-12">
            {/* Emblema "C" oficial nítido */}
            <div className="shrink-0 relative">
              <div className="absolute -inset-4 bg-amber-500/10 rounded-full blur-xl" />
              <img
                src={emblemaC}
                alt="Emblema Catastro Coatzacoalcos"
                className="relative w-36 xl:w-44 h-auto object-contain drop-shadow-xl"
              />
            </div>

            {/* Texto institucional con tipografía limpia */}
            <div className="max-w-[320px] text-white space-y-4">
              <p className="text-[19px] xl:text-[20px] font-normal leading-[1.38] text-white/95 tracking-normal">
                {isRegister
                  ? 'Regístrate con tu correo electrónico y una contraseña para acceder al portal de catastro de Coatzacoalcos.'
                  : 'Inicia sesión con tu correo electrónico y una contraseña para acceder al portal de catastro de Coatzacoalcos.'}
              </p>

              <div className="pt-2 text-white/80 text-xs space-y-0.5 font-light">
                <p className="font-medium text-white/95">
                  Gobierno de la ciudad de Coatzacoalcos
                </p>
                <p className="text-amber-200/80 font-normal">
                  Administración 2026 - 2029
                </p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Tarjeta del formulario (Login / Registro) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end z-20">
            <Outlet />
          </div>

        </div>
      </div>

      {/* 3. Footer Oficial */}
      <footer className="bg-white/95 backdrop-blur-sm text-gray-600 text-xs py-3 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-gray-200 z-20">
        <div>
          <span className="font-medium text-gray-700">© 2026 · Ayuntamiento de Coatzacoalcos</span>
        </div>
        <div className="text-center font-medium text-gray-800">
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
            className="text-gray-600 hover:text-gray-900 hover:underline transition-colors font-medium"
          >
            Aviso de privacidad
          </a>
        </div>
      </footer>
    </AuthBackground>
  );
}
