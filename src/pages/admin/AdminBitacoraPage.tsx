import { History, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, Input, Badge } from '@/components/ui';

export default function AdminBitacoraPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bitácora Inmutable del Sistema (RF-SEG-02)</h1>
        <p className="text-sm text-gray-500">
          Registro estricto de auditoría: quién, qué, cuándo, valores anteriores y nuevos
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-gray-500" />
              <CardTitle>Eventos de Auditoría Registrados</CardTitle>
            </div>
            <div className="w-full sm:w-64">
              <Input placeholder="Buscar por usuario o entidad..." leftIcon={<Search className="w-4 h-4" />} />
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2.5">Fecha y Hora</th>
                <th className="py-2.5">Usuario</th>
                <th className="py-2.5">Acción</th>
                <th className="py-2.5">Entidad Afectada</th>
                <th className="py-2.5">Detalle / Diferencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 font-mono text-gray-500">2026-11-16 14:22:10</td>
                <td className="py-3 font-medium">gabriela.solis (DIR)</td>
                <td className="py-3"><Badge variant="primary">FIRMA_CEDULA</Badge></td>
                <td className="py-3 font-mono">CED-2026-00891</td>
                <td className="py-3 text-gray-600">Estado: PENDIENTE → VIGENTE (Hash verificado)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
