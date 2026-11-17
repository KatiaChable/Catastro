import { Receipt, CheckCheck, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';

export default function CajeroConciliacionPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Módulo de Tesorería y Caja (CAJ)</h1>
          <p className="text-sm text-gray-500">
            Conciliación de pagos simulados (cédulas, predial, constancias) y cancelación justificada de recibos
          </p>
        </div>
        <Badge variant="success">Rol: CAJ (Cajero)</Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pagos Registrados para Conciliación</CardTitle>
            <Receipt className="w-5 h-5 text-green-600" />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2.5">Folio Recibo</th>
                <th className="py-2.5">Contribuyente</th>
                <th className="py-2.5">Concepto</th>
                <th className="py-2.5">Monto</th>
                <th className="py-2.5">Método SAT</th>
                <th className="py-2.5">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 font-mono font-bold">REC-2026-0091</td>
                <td className="py-3">Constructora del Sur S.A.</td>
                <td className="py-3">Cédula Catastral</td>
                <td className="py-3 font-semibold">$969.98 MXN</td>
                <td className="py-3">03 · Transferencia SPEI</td>
                <td className="py-3 flex gap-2">
                  <Button size="sm" variant="outline" leftIcon={<CheckCheck className="w-3.5 h-3.5 text-green-600" />}>
                    Conciliar
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600" leftIcon={<XCircle className="w-3.5 h-3.5" />}>
                    Cancelar
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
