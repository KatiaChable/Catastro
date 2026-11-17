import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Accessibility, Bot, MapPin, X } from 'lucide-react';
import logoOficial from '@/assets/images/logo-oficial.png';
import emblemaC from '@/assets/images/emblema-c.png';
import AuthBackground from './AuthBackground';

export default function AuthLayout() {
  const location = useLocation();
  const isRegister = location.pathname.includes('/registro');

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <AuthBackground>
      {/* 1. Header Institucional Coatzacoalcos */}
      <header className="bg-[#660d26]/95 backdrop-blur-md text-white px-4 sm:px-8 py-2.5 flex items-center justify-between border-b border-white/10 shadow-sm z-20">
        <div className="flex items-center gap-4 sm:gap-6">
          <img
            src={logoOficial}
            alt="Gobierno de Coatzacoalcos 2026 - 2029"
            className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-sm"
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

      {/* 2. Cuerpo Central: C más grande y formulario desplazado hacia la izquierda */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[520px]">
          
          {/* Lado Izquierdo: Emblema C más grande + Texto Institucional */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 items-center gap-6 xl:gap-8 pl-4 lg:pl-8 xl:pl-12">
            {/* Emblema "C" en tamaño destacado */}
            <div className="shrink-0 relative">
              <div className="absolute -inset-4 bg-amber-500/10 rounded-full blur-2xl" />
              <img
                src={emblemaC}
                alt="Emblema Catastro Coatzacoalcos"
                className="relative w-48 sm:w-56 xl:w-64 h-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Texto descriptivo limpio y elegante */}
            <div className="max-w-[290px] text-white space-y-3.5">
              <p className="text-[18px] xl:text-[19px] font-normal leading-[1.38] text-white/95 tracking-normal">
                {isRegister
                  ? 'Regístrate con tu correo electrónico y una contraseña para acceder al portal de catastro de Coatzacoalcos.'
                  : 'Inicia sesión con tu correo electrónico y una contraseña para acceder al portal de catastro de Coatzacoalcos.'}
              </p>

              <div className="pt-1.5 text-white/80 text-xs space-y-0.5 font-light">
                <p className="font-medium text-white/95">
                  Gobierno de la ciudad de Coatzacoalcos
                </p>
                <p className="text-amber-200/80 font-normal">
                  Administración 2026 - 2029
                </p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Tarjeta del formulario desplazada hacia la izquierda */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-start lg:pl-6 xl:pl-8 z-20">
            <Outlet />
          </div>

        </div>
      </div>

      {/* 3. Footer Institucional Oficial (Fondo oscuro con logo, links y botones flotantes laterales) */}
      <footer className="bg-[#262626] text-white py-5 px-4 sm:px-8 border-t border-black/20 relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Botón Accesibilidad (Inferior Izquierda) */}
          <div className="flex-1 flex justify-start">
            <button
              type="button"
              title="Herramientas de Accesibilidad"
              onClick={() => alert('Menú de Accesibilidad habilitado:\n• Contraste alto\n• Tamaño de fuente adaptable\n• Modo lectura para personas con discapacidad visual.')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#741333] border-2 border-amber-300 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Centro: Logotipo Institucional + Enlaces en Mayúsculas (sin redes sociales) */}
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

          {/* Botón Asistente Virtual / WhatsApp (Inferior Derecha) */}
          <div className="flex-1 flex justify-end">
            <button
              type="button"
              title="Asistente Virtual de Catastro"
              onClick={() => setShowChatModal(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366] border-2 border-emerald-200/50 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

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
                Los datos recabados (nombre, CURP, RFC, datos prediales, escrituras y documentos de propiedad) serán utilizados única y exclusivamente para los fines de inscripción, registro catastral, cálculo de avalúos y recaudación del impuesto predial.
              </p>
              <p>
                No se realizarán transferencias de datos personales, salvo aquellas que sean estrictamente necesarias para atender requerimientos de información de una autoridad competente debidamente fundada y motivada.
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

      {/* Modal: Asistente Virtual */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 text-gray-900 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Asistente Catastral Coatza</h4>
                  <p className="text-[10px] text-emerald-600 font-medium">En línea</p>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-lg text-xs text-emerald-900 leading-normal">
              ¡Hola! Soy el asistente virtual del Catastro Municipal de Coatzacoalcos. ¿En qué trámite catastral te puedo orientar hoy?
            </div>
            <button
              onClick={() => setShowChatModal(false)}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
            >
              Cerrar chat
            </button>
          </div>
        </div>
      )}
    </AuthBackground>
  );
}
