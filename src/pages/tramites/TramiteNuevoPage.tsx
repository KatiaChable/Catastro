import { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';

export default function TramiteNuevoPage() {
  const [tramiteTipo, setTramiteTipo] = useState<'cedula' | 'no_adeudo' | 'alta'>('cedula');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link to={ROUTES.TRAMITES}>
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Iniciar Nuevo Trámite Catastral</h1>
          <p className="text-xs text-gray-500">
            Validador automático de expediente digital (PDF / JPG / PNG máx. 10MB)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setTramiteTipo('cedula')}
          className={`p-4 rounded-xl border text-left transition-all ${
            tramiteTipo === 'cedula'
              ? 'border-blue-500 bg-blue-50/50 shadow-sm'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <FileText className="w-6 h-6 text-blue-600 mb-2" />
          <h4 className="font-bold text-sm text-gray-900">Cédula Catastral</h4>
          <p className="text-xs text-gray-500 mt-1">Tarifa Fija: $969.98 MXN</p>
          <p className="text-[10px] text-gray-400">Vigencia 90 días</p>
        </button>

        <button
          type="button"
          onClick={() => setTramiteTipo('no_adeudo')}
          className={`p-4 rounded-xl border text-left transition-all ${
            tramiteTipo === 'no_adeudo'
              ? 'border-blue-500 bg-blue-50/50 shadow-sm'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
          <h4 className="font-bold text-sm text-gray-900">Constancia de No Adeudo</h4>
          <p className="text-xs text-gray-500 mt-1">Tarifa Fija: $200.00 MXN</p>
          <p className="text-[10px] text-gray-400">Vigencia 60 días</p>
        </button>

        <button
          type="button"
          onClick={() => setTramiteTipo('alta')}
          className={`p-4 rounded-xl border text-left transition-all ${
            tramiteTipo === 'alta'
              ? 'border-blue-500 bg-blue-50/50 shadow-sm'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <Upload className="w-6 h-6 text-purple-600 mb-2" />
          <h4 className="font-bold text-sm text-gray-900">Alta de Predio</h4>
          <p className="text-xs text-gray-500 mt-1">Sin cobro inicial</p>
          <p className="text-[10px] text-gray-400">Asignación de gestor</p>
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requisitos y Documentación Obligatoria</CardTitle>
        </CardHeader>
        <form className="space-y-4">
          <Input label="Clave Catastral o Predio" placeholder="Selecciona un predio registrado" required />
          
          <div className="space-y-3 pt-2">
            <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Documentos requeridos
            </h5>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">
                Arrastra aquí los archivos o haz click para explorar
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Escritura, Identificación Oficial INE, Croquis o Plano (máx 10MB)
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link to={ROUTES.TRAMITES}>
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button type="submit">Enviar Solicitud</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
