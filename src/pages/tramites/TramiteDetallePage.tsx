import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge, Input } from '@/components/ui';
import { ROUTES } from '@/constants';

export default function TramiteDetallePage() {
  const { id } = useParams();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <Link to={ROUTES.TRAMITES}>
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Volver a Trámites
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Expediente del Trámite {id}
          </h1>
          <p className="text-xs text-gray-500">
            Seguimiento de validación de documentos y comunicación con el gestor catastral
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Estado de Documentos (Checklist)</CardTitle>
                <Badge variant="warning">En Revisión Manual</Badge>
              </div>
            </CardHeader>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-xs">
                <div>
                  <p className="font-semibold text-gray-800">1. Identificación Oficial (INE)</p>
                  <p className="text-gray-500">Vigente al 2030 · Nombre coincide con CURP</p>
                </div>
                <Badge variant="success">Aprobado Auto</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-xs">
                <div>
                  <p className="font-semibold text-gray-800">2. Título de Propiedad o Escritura</p>
                  <p className="text-gray-500">Registro Público de la Propiedad Zona Coatzacoalcos</p>
                </div>
                <Badge variant="warning">En Revisión</Badge>
              </div>
            </div>
          </Card>

          {/* Chat con el Gestor (RF-EDI-02) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <CardTitle>Canal de Comunicación con el Gestor</CardTitle>
              </div>
            </CardHeader>
            <div className="h-48 border border-gray-100 rounded-lg p-3 overflow-y-auto space-y-2 bg-gray-50/50 mb-3 text-xs">
              <div className="bg-blue-100/70 p-2.5 rounded-lg max-w-sm">
                <p className="font-semibold text-blue-900">Gestor Catastral:</p>
                <p className="text-blue-800">
                  Buen día, hemos recibido su documentación. Se está cotejando la superficie con el plano cartográfico.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Escribe un mensaje al gestor..." />
              <Button leftIcon={<Send className="w-4 h-4" />}>Enviar</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Línea de Captura</CardTitle>
            </CardHeader>
            <div className="p-3 bg-blue-50 rounded-lg text-center space-y-1">
              <p className="text-xs text-blue-700 font-semibold">Monto Autorizado</p>
              <h3 className="text-2xl font-black text-blue-900">$969.98 MXN</h3>
              <p className="text-[11px] text-blue-600">Línea de captura única simulación</p>
            </div>
            <Link to={ROUTES.PAGOS} className="block mt-4">
              <Button className="w-full">Pagar en Línea (Simulado)</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
