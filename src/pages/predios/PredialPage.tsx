import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { ROUTES } from '@/constants';
import { formatCurrency } from '@/utils';

export default function PredialPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={ROUTES.PREDIOS}>
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Historial de Impuesto Predial — Predio #{id}
          </h1>
          <p className="text-xs text-gray-500">
            Registro fiscal por ejercicio y periodos (Ley de Catastro de Veracruz)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-green-50/50">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-xs text-green-700 font-semibold">Estado de Cuenta</p>
              <h3 className="text-lg font-bold text-green-900">Sin Adeudos</h3>
              <p className="text-[11px] text-green-600">Ejercicio 2026 Pagado</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos de Predial (Últimos 5 años)</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-3">Ejercicio</th>
                <th className="py-3">Periodo</th>
                <th className="py-3">Importe Base</th>
                <th className="py-3">Descuento</th>
                <th className="py-3">Total Pagado</th>
                <th className="py-3">Fecha de Pago</th>
                <th className="py-3">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 font-semibold">2026</td>
                <td className="py-3">Anual</td>
                <td className="py-3">{formatCurrency(1250)}</td>
                <td className="py-3 text-green-600">-{formatCurrency(250)} (Pronto Pago)</td>
                <td className="py-3 font-bold">{formatCurrency(1000)}</td>
                <td className="py-3">15 de enero de 2026</td>
                <td className="py-3">
                  <Badge variant="success">Pagado</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
