import { Outlet, useLocation } from 'react-router-dom';
import gobiernoLogo from '@/assets/images/gobierno-logo.png';
import authBg from '@/assets/images/auth-bg.jpg';

export default function AuthLayout() {
  const location = useLocation();
  const isRegister = location.pathname.includes('/registro');

  return (
    <div className="min-h-screen flex flex-col bg-[#7a1737]">
      {/* 1. Header Institucional Coatzacoalcos */}
      <header className="bg-[#7a1737] text-white px-4 sm:px-8 py-2.5 border-b border-black/10 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          <img
            src={gobiernoLogo}
            alt="Gobierno de Coatzacoalcos 2026-2029"
            className="h-9 sm:h-11 object-contain"
          />
          <div className="hidden md:block pl-4 border-l border-white/20">
            <p className="text-[10px] tracking-wider uppercase text-white/80 font-medium">
              Dirección de Catastro Municipal
            </p>
            <h1 className="text-sm font-bold text-white tracking-wide">
              Visor Cartográfico Catastral
            </h1>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs sm:text-sm font-medium text-white/90">
            Coatzacoalcos, Veracruz
          </span>
        </div>
      </header>

      {/* 2. Cuerpo con imagen de fondo y tarjeta flotante */}
      <main
        className="flex-1 relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundColor: '#640322',
        }}
      >
        {/* Contenedor responsivo a 2 columnas */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
          
          {/* Lado Izquierdo: Mensaje Institucional adaptado */}
          <div className="lg:col-span-7 flex flex-col justify-center text-white p-4 sm:p-8 lg:pl-12">
            <div className="max-w-xl space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug drop-shadow-sm">
                {isRegister
                  ? 'Regístrate con tu correo electrónico y una contraseña para acceder al portal de catastro de Coatzacoalcos.'
                  : 'Inicia sesión con tu correo electrónico y una contraseña para acceder al portal de catastro de Coatzacoalcos.'}
              </h2>

              <div className="pt-4 text-white/90 text-xs sm:text-sm font-light space-y-0.5">
                <p className="font-medium text-white">Gobierno de la ciudad de Coatzacoalcos</p>
                <p className="text-white/75">Administración 2026 - 2029</p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Formulario (Login / Registro) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Outlet />
          </div>

        </div>
      </main>

      {/* 3. Footer Institucional */}
      <footer className="bg-white text-gray-600 text-xs py-3 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-gray-200">
        <div>
          <span>© 2026 · Ayuntamiento de Coatzacoalcos</span>
        </div>
        <div className="text-center font-medium text-gray-700">
          <span>Dirección de Catastro Municipal</span>
        </div>
        <div>
          <a
            href="#privacidad"
            onClick={(e) => {
              e.preventDefault();
              alert(
                'Aviso de Privacidad Simplificado:\nEl Ayuntamiento de Coatzacoalcos y la Dirección de Catastro Municipal protegen sus datos personales conforme a la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y la Ley de Catastro del Estado de Veracruz.'
              );
            }}
            className="hover:underline hover:text-gray-900 transition-colors"
          >
            Aviso de privacidad
          </a>
        </div>
      </footer>
    </div>
  );
}
