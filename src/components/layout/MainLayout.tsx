import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Accessibility, MapPin, X } from 'lucide-react';
import logoOficial from '@/assets/images/logo-oficial.png';
import { ROUTES } from '@/constants';

export default function MainLayout() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* 1. Header Institucional Coatzacoalcos */}
      <header className="bg-[#660d26] text-white px-4 sm:px-8 py-2.5 flex items-center justify-between border-b border-black/15 shadow-sm z-20">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to={ROUTES.LOGIN} className="flex items-center">
            <img
              src={logoOficial}
              alt="Gobierno de Coatzacoalcos 2026 - 2029"
              className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-sm hover:opacity-90 transition-opacity"
            />
          </Link>
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

      {/* 2. Contenido Central (WIP para páginas pendientes) */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* 3. Footer Oficial Gris Oscuro (SIN CHATBOT) */}
      <footer className="bg-[#262626] text-white py-5 px-4 sm:px-8 border-t border-black/20 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Botón Accesibilidad (Izquierda) */}
          <div className="flex-1 flex justify-start">
            <button
              type="button"
              title="Herramientas de Accesibilidad"
              onClick={() => alert('Menú de Accesibilidad habilitado:\n• Contraste alto\n• Tamaño de fuente adaptable\n• Modo lectura.')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#741333] border-2 border-amber-300 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Centro: Logotipo Institucional + Enlaces en Mayúsculas */}
          <div className="flex flex-col items-center justify-center text-center space-y-2.5">
            <img
              src={logoOficial}
              alt="Coatzacoalcos 2026 - 2029"
              className="h-7 sm:h-8 w-auto object-contain opacity-95"
            />
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 pt-0.5">
              <button
                type="button"
                onClick={() => setShowLocationModal(true)}
                className="text-[11px] font-bold text-white/90 hover:text-amber-300 tracking-widest transition-colors uppercase cursor-pointer"
              >
                VER UBICACIÓN
              </button>
              <span className="hidden sm:inline text-white/30">•</span>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="text-[11px] font-bold text-white/90 hover:text-amber-300 tracking-widest transition-colors uppercase cursor-pointer"
              >
                AVISO DE PRIVACIDAD
              </button>
            </div>
          </div>

          {/* Espaciador derecho para equilibrar (SIN CHATBOT) */}
          <div className="flex-1 flex justify-end" />

        </div>
      </footer>

      {/* Modal: Ver Ubicación */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-gray-900 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-[#741333]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-bold text-base">Dirección de Catastro Municipal</h3>
              </div>
              <button onClick={() => setShowLocationModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-600 space-y-2">
              <p><strong>Ubicación Oficial:</strong> Palacio Municipal, Av. Ignacio Zaragoza #404, Col. Centro, C.P. 96400, Coatzacoalcos, Veracruz.</p>
              <p><strong>Horario de Atención:</strong> Lunes a Viernes de 8:30 a 15:00 hrs.</p>
              <p><strong>Teléfono:</strong> (921) 211-2100 Ext. Catastro</p>
            </div>
            <button
              onClick={() => setShowLocationModal(false)}
              className="w-full py-2 bg-[#741333] hover:bg-[#580a22] text-white rounded-lg text-xs font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal: Aviso de Privacidad */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-gray-900 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-base text-[#741333]">Aviso de Privacidad Integral</h3>
              <button onClick={() => setShowPrivacyModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                El <strong>H. Ayuntamiento de Coatzacoalcos</strong>, a través de la Dirección de Catastro Municipal, es el responsable del tratamiento de los datos personales proporcionados por los contribuyentes conforme a la <em>Ley de Catastro del Estado de Veracruz</em>.
              </p>
              <p>
                Los datos recabados serán utilizados única y exclusivamente para los fines de inscripción, registro catastral, cálculo de avalúos y recaudación del impuesto predial.
              </p>
            </div>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-2 bg-[#741333] hover:bg-[#580a22] text-white rounded-lg text-xs font-semibold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
