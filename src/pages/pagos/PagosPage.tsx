import { CreditCard, Download, Receipt, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { formatCurrency } from '@/utils';

export default function PagosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Módulo de Pagos y Recibos Oficiales</h1>
        <p className="text-sm text-gray-500">
          Pasarela simulada conforme al modelo de Tesorería Municipal de Coatzacoalcos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Órdenes de Pago Pendientes</CardTitle>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <div className="p-4 border border-amber-200 bg-amber-50/50 rounded-xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-sm text-gray-900">Constancia Catastral</p>
                <p className="text-xs text-gray-500 font-mono">Línea: LC-040-2026-991823</p>
              </div>
              <Badge variant="warning">Por Pagar</Badge>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(969.98)}
            </div>
            <Button className="w-full" size="sm">
              Proceder con Pasarela Simulada (SAT 01, 03, 04)
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Historial de Pagos y Recibos</CardTitle>
              <Receipt className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-800">Recibo Oficial Folio #REC-0012</p>
                  <p className="text-gray-500">Constancia de No Adeudo · $200.00 MXN</p>
                </div>
              </div>
              <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                Recibo
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
