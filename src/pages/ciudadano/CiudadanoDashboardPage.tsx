import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  FileText, 
  FolderCheck, 
  CreditCard, 
  ClipboardList, 
  LogOut, 
  Search, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Printer,
  Calendar
} from 'lucide-react';
import logoOficial from '@/assets/images/logo-oficial.png';
import { ROUTES } from '@/constants';
import { formatClaveCatastral, formatCurrency } from '@/utils';

export default function CiudadanoDashboardPage() {
  const navigate = useNavigate();

  // Sección activa en la barra lateral
  const [activeTab, setActiveTab] = useState<'lotes' | 'ficha' | 'expediente' | 'predial' | 'tramites'>('lotes');

  // Búsqueda en mis lotes
  const [searchQuery, setSearchQuery] = useState('Independencia');
  const [selectedLote, setSelectedLote] = useState<string | null>('lote-1');
  const [showFichaModal, setShowFichaModal] = useState(false);

  // Datos reales del contribuyente y sus predios registrados en Coatzacoalcos
  const contribuyente = {
    nombre: 'Roberto Hernández Morales',
    curp: 'HEMR780412HVERRN04',
    rfc: 'HEMR780412XYZ',
    cuenta: 'Padrón Ciudadano Verificado',
  };

  const predios = [
    {
      id: 'lote-1',
      calle: 'Av. Independencia #123',
      colonia: 'Col. Centro',
      superficieM2: 450.0,
      claveCatastral: '0504000102004012000008',
      tipo: 'Urbano',
      uso: 'Habitacional',
      estadoFisico: 'Construido',
      valorCatastral: 1485000.0,
      valorTerreno: 720000.0,
      valorConstruccion: 765000.0,
      estatusPredial: 'Al corriente (Ejercicio 2026)',
      construcciones: [
        { tipo: '02 · Hab. Residencial Media', conservacion: 'Bueno (1)', termino: 'Terminada (1)', anio: 2012, area: 285.0 }
      ]
    }
  ];

  const filteredPredios = predios.filter(
    (p) =>
      p.calle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.claveCatastral.includes(searchQuery.replace(/\D/g, '')) ||
      p.colonia.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f4] text-gray-900 font-sans">
      
      {/* 1. Header Institucional Coatzacoalcos */}
      <header className="bg-[#6e0e29] text-white px-5 sm:px-8 py-3 flex items-center justify-between border-b border-black/15 shadow-sm z-30">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to={ROUTES.LOGIN} className="flex items-center">
            <img
              src={logoOficial}
              alt="Gobierno de Coatzacoalcos 2026 - 2029"
              className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-sm"
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

        <div className="text-right">
          <p className="text-xs sm:text-sm font-semibold text-white tracking-wide uppercase">
            COATZACOALCOS
          </p>
          <p className="text-[10px] text-white/70">Administración 2026-2029</p>
        </div>
      </header>

      {/* 2. Estructura Principal con Barra Lateral */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Barra Lateral (Sidebar Ciudadano) */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200/80 p-5 flex flex-col justify-between shrink-0 shadow-xs">
          <div className="space-y-6">
            
            {/* Encabezado del espacio de trabajo */}
            <div>
              <p className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase mb-1">
                ESPACIO DE TRABAJO
              </p>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Ciudadano
              </h2>
            </div>

            {/* Menú de Áreas que puede consultar */}
            <nav className="space-y-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('lotes')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left font-medium transition-all cursor-pointer ${
                  activeTab === 'lotes'
                    ? 'bg-[#f7edf1] text-[#6e0e29] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                Mis lotes
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ficha')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left font-medium transition-all cursor-pointer ${
                  activeTab === 'ficha'
                    ? 'bg-[#f7edf1] text-[#6e0e29] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                Ficha catastral
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('expediente')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left font-medium transition-all cursor-pointer ${
                  activeTab === 'expediente'
                    ? 'bg-[#f7edf1] text-[#6e0e29] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <FolderCheck className="w-4 h-4 shrink-0" />
                Mi expediente
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('predial')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left font-medium transition-all cursor-pointer ${
                  activeTab === 'predial'
                    ? 'bg-[#f7edf1] text-[#6e0e29] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                Impuesto predial
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tramites')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left font-medium transition-all cursor-pointer ${
                  activeTab === 'tramites'
                    ? 'bg-[#f7edf1] text-[#6e0e29] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <ClipboardList className="w-4 h-4 shrink-0" />
                Mis trámites
              </button>
            </nav>
          </div>

          {/* Bloque Inferior: Consulta Segura y Cerrar Sesión */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                CONSULTA SEGURA
              </p>
              <p className="text-xs text-gray-500">{contribuyente.cuenta}</p>
              <p className="text-xs font-semibold text-gray-900 mt-0.5">
                {contribuyente.nombre}
              </p>
              <p className="text-[11px] font-mono text-gray-500 uppercase mt-0.5">
                {contribuyente.rfc}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2 px-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-gray-500" />
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* 3. Área de Contenido Principal */}
        <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
          
          {/* Breadcrumbs superiores */}
          <nav className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-3">
            CATASTRO / CIUDADANO
          </nav>

          {/* Encabezado del área de consulta */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {activeTab === 'lotes' && 'Buscar mis lotes'}
              {activeTab === 'ficha' && 'Ficha técnica catastral'}
              {activeTab === 'expediente' && 'Expediente digital de documentos'}
              {activeTab === 'predial' && 'Historial de impuesto predial'}
              {activeTab === 'tramites' && 'Seguimiento de trámites'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {activeTab === 'lotes' && 'Padrón oficial de bienes inmuebles vinculados al contribuyente'}
              {activeTab === 'ficha' && 'Valuación oficial, tipología de construcción y datos del terreno (DGCV-015)'}
              {activeTab === 'expediente' && 'Documentación de propiedad validada ante la autoridad catastral municipal'}
              {activeTab === 'predial' && 'Estado de cuenta por ejercicio y vigencia de cuotas fiscales'}
              {activeTab === 'tramites' && 'Estado de solicitudes, asignación de gestor y emisión de constancias'}
            </p>
          </div>

          {/* Tarjeta Principal de Trabajo (Exacta a la imagen de referencia) */}
          {activeTab === 'lotes' && (
            <div className="max-w-3xl">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/70 p-7 sm:p-9 space-y-6">
                
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  Buscar mis lotes
                </h3>

                {/* Caja de consulta y resultados */}
                <div className="bg-[#f8f5f0] border border-gray-200/60 rounded-xl p-5 sm:p-6 space-y-4">
                  
                  {/* Campo de búsqueda */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Clave o dirección:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ingresa clave catastral o nombre de calle..."
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#6e0e29] focus:ring-1 focus:ring-[#6e0e29] transition-colors"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Detalle de los resultados encontrados */}
                  <div className="pt-2 text-xs sm:text-sm text-gray-700 space-y-2">
                    <p className="font-medium text-gray-600">
                      {filteredPredios.length} {filteredPredios.length === 1 ? 'resultado en tus predios' : 'resultados en tus predios'}
                    </p>

                    {filteredPredios.map((predio) => (
                      <div
                        key={predio.id}
                        onClick={() => setSelectedLote(predio.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          selectedLote === predio.id
                            ? 'bg-white border-[#6e0e29] shadow-sm'
                            : 'bg-white/80 border-gray-200 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">
                              {predio.calle} · {predio.colonia} · {predio.superficieM2.toFixed(2)} m²
                            </p>
                            <p className="text-xs font-mono text-gray-500 mt-1">
                              Clave Catastral: {formatClaveCatastral(predio.claveCatastral)}
                            </p>
                          </div>
                          <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                            {predio.estatusPredial}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Nota oficial estricta de seguridad */}
                    <div className="pt-2 flex items-center gap-2 text-xs text-gray-500">
                      <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>No se permite buscar por propietario. Solo se consultan predios legítimamente vinculados a su cuenta.</span>
                    </div>
                  </div>
                </div>

                {/* Botones de acción inferiores */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="py-2.5 px-6 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Cancelar / Volver
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowFichaModal(true)}
                    className="py-2.5 px-7 bg-[#6e0e29] hover:bg-[#560a1f] text-white font-medium rounded-lg text-xs sm:text-sm transition-colors shadow-sm hover:shadow cursor-pointer"
                  >
                    Ver resultado
                  </button>
                </div>
              </div>

              {/* Leyenda de auditoría y bitácora al pie */}
              <p className="text-xs text-gray-500 mt-6 leading-relaxed">
                Toda acción conserva quién, cuándo y por qué. No se eliminan registros ni documentos.
              </p>
            </div>
          )}

          {/* Ficha Catastral Oficial (Formato DGCV-015) */}
          {activeTab === 'ficha' && (
            <div className="max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Cédula y Ficha Catastral (DGCV-015)</h3>
                  <p className="text-xs text-gray-500 mt-1">Clave Única: {formatClaveCatastral('0504000102004012000008')}</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Valor del Terreno</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{formatCurrency(720000)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Valor de Construcciones</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{formatCurrency(765000)}</p>
                </div>
                <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-lg">
                  <p className="text-amber-800 font-semibold">Valor Catastral Total</p>
                  <p className="text-base font-bold text-[#6e0e29] mt-0.5">{formatCurrency(1485000)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Construcciones Declaradas (Art. 39)</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                      <tr>
                        <th className="p-2.5">Tipología</th>
                        <th className="p-2.5">Conservación (E)</th>
                        <th className="p-2.5">Terminación (T)</th>
                        <th className="p-2.5">Año (A)</th>
                        <th className="p-2.5">Área (m²)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2.5 font-medium">02 · Residencial Media</td>
                        <td className="p-2.5">1 (Bueno)</td>
                        <td className="p-2.5">1 (Terminada)</td>
                        <td className="p-2.5">2012</td>
                        <td className="p-2.5 font-bold">285.00 m²</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Expediente Digital */}
          {activeTab === 'expediente' && (
            <div className="max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Expediente Digital del Inmueble</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Escritura Pública Notarial #412</p>
                    <p className="text-gray-500">Inscrita en el Registro Público de la Propiedad Zona Coatzacoalcos</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold">Aprobado</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Identificación Oficial (INE)</p>
                    <p className="text-gray-500">Clave de elector validada · Vigencia 2030</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold">Aprobado</span>
                </div>
              </div>
            </div>
          )}

          {/* Impuesto Predial */}
          {activeTab === 'predial' && (
            <div className="max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Estado de Cuenta del Impuesto Predial</h3>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">Sin adeudo municipal</span>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                    <tr>
                      <th className="p-3">Ejercicio</th>
                      <th className="p-3">Periodo</th>
                      <th className="p-3">Monto Base</th>
                      <th className="p-3">Descuento</th>
                      <th className="p-3">Total Pagado</th>
                      <th className="p-3">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 font-semibold">2026</td>
                      <td className="p-3">Anual</td>
                      <td className="p-3">{formatCurrency(1450)}</td>
                      <td className="p-3 text-emerald-600">-{formatCurrency(290)}</td>
                      <td className="p-3 font-bold text-gray-900">{formatCurrency(1160)}</td>
                      <td className="p-3">12 de enero de 2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mis Trámites */}
          {activeTab === 'tramites' && (
            <div className="max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Trámites y Certificaciones Catastrales</h3>
                <button
                  type="button"
                  onClick={() => alert('Para solicitar un nuevo trámite, se habilita el formulario con el checklist de requisitos oficiales.')}
                  className="px-4 py-2 bg-[#6e0e29] text-white rounded-lg text-xs font-semibold hover:bg-[#560a1f] transition-colors"
                >
                  Nuevo Trámite
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-mono text-gray-400">Folio: CAT-2026-0042</span>
                    <h5 className="font-bold text-gray-900 mt-0.5">Expedición de Cédula Catastral Oficial</h5>
                    <p className="text-gray-500 mt-0.5">Plazo legal: 15 días hábiles · Vigencia de 90 días</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold">En revisión</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 4. Footer Inferior Oficial */}
      <footer className="bg-white text-gray-500 text-xs py-3 px-6 sm:px-8 border-t border-gray-200 text-center">
        © 2026 Ayuntamiento de Coatzacoalcos · Dirección de Catastro Municipal · Aviso de privacidad
      </footer>

      {/* Modal: Ver Resultado / Ficha Rápida del Lote */}
      {showFichaModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-gray-900 shadow-2xl space-y-4">
            <div className="flex justify-between items-start pb-2 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-bold text-[#6e0e29] uppercase tracking-wider">Cédula del Inmueble</span>
                <h3 className="text-base font-bold text-gray-900 mt-0.5">Av. Independencia #123, Col. Centro</h3>
              </div>
              <button onClick={() => setShowFichaModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">
                ✕
              </button>
            </div>
            <div className="text-xs space-y-2.5 text-gray-700">
              <p><strong>Clave Catastral Oficial:</strong> {formatClaveCatastral('0504000102004012000008')}</p>
              <p><strong>Superficie de Terreno:</strong> 450.00 m²</p>
              <p><strong>Superficie de Construcción:</strong> 285.00 m²</p>
              <p><strong>Destino / Uso:</strong> Habitacional</p>
              <p><strong>Estado Físico:</strong> Construido</p>
              <p><strong>Valor Catastral Total:</strong> {formatCurrency(1485000)}</p>
              <p><strong>Estatus del Impuesto Predial:</strong> <span className="text-emerald-700 font-semibold">Al corriente</span></p>
            </div>
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowFichaModal(false);
                  setActiveTab('ficha');
                }}
                className="flex-1 py-2 bg-[#6e0e29] hover:bg-[#560a1f] text-white rounded-lg text-xs font-semibold"
              >
                Abrir Ficha Completa
              </button>
              <button
                type="button"
                onClick={() => setShowFichaModal(false)}
                className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
