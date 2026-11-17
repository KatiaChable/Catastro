import { CheckSquare, Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';

export default function AutorizadorPendientesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel del Autorizador (AUT)</h1>
        <p className="text-sm text-gray-500">
          Aprobación de planos borrador, cotizaciones propuestas por gestores y altas (Regla de separación de funciones)
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Planos y Precios Pendientes de Autorización</CardTitle>
            <CheckSquare className="w-5 h-5 text-purple-600" />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2.5">Trámite</th>
                <th className="py-2.5">Gestor</th>
                <th className="py-2.5">Plano Borrador</th>
                <th className="py-2.5">Cobro Propuesto</th>
                <th className="py-2.5">Decisión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 font-semibold">Alta de Predio Manzana 004</td>
                <td className="py-3">Ing. Roberto M.</td>
                <td className="py-3">
                  <Badge variant="info">Polígono Validado (0 traslapes)</Badge>
                </td>
                <td className="py-3 font-bold text-gray-900">$650.00 MXN</td>
                <td className="py-3 flex gap-2">
                  <Button size="sm" variant="success" leftIcon={<Check className="w-3.5 h-3.5" />}>
                    Aprobar
                  </Button>
                  <Button size="sm" variant="danger" leftIcon={<X className="w-3.5 h-3.5" />}>
                    Rechazar
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
