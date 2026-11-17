import { Landmark, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';

export default function DirectorPanelPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Despacho del Jefe de la Oficina Municipal (Director)
          </h1>
          <p className="text-sm text-gray-500">
            Firma digital de cédulas, autorización de bajas/fusiones/subdivisiones y resolución de controversias
          </p>
        </div>
        <Badge variant="primary">DIR · Nivel Superior</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-rose-500">
          <p className="text-xs text-gray-500">Controversias de Propiedad</p>
          <h3 className="text-2xl font-bold text-rose-700">1</h3>
          <p className="text-[11px] text-gray-400 mt-1">Reclamaciones concurrentes (Art. 49)</p>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <p className="text-xs text-gray-500">Cédulas por Firmar</p>
          <h3 className="text-2xl font-bold text-blue-700">4</h3>
          <p className="text-[11px] text-gray-400 mt-1">Firma electrónica municipal</p>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <p className="text-xs text-gray-500">Fusiones y Bajas</p>
          <h3 className="text-2xl font-bold text-purple-700">2</h3>
          <p className="text-[11px] text-gray-400 mt-1">Con verificación de no adeudo</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <CardTitle>Predios en Controversia Registral (RF-VIN-07)</CardTitle>
          </div>
        </CardHeader>
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-2">
          <p className="font-semibold text-rose-900">
            Predio: Clave 05-040-001-02-015-001-00-000-8
          </p>
          <p className="text-rose-800">
            Dos solicitantes reclaman la titularidad del inmueble. Conforme a reglamento, la emisión queda suspendida
            hasta la resolución de la autoridad correspondiente.
          </p>
          <Button size="sm" variant="outline" className="mt-2 bg-white">
            Abrir Expediente Notarial
          </Button>
        </div>
      </Card>
    </div>
  );
}
