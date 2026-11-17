import { ClipboardList, UserCheck, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';

export default function GestorSolicitudesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bandeja de Solicitudes — Gestor de Casos</h1>
          <p className="text-sm text-gray-500">
            Revisión de documentos, órdenes de trabajo, visitas físicas y propuesta de cobros (RF-EDI)
          </p>
        </div>
        <Badge variant="warning">Rol: GES (Control)</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-xs text-gray-500">Solicitudes Asignadas</p>
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Visitas de Campo Pendientes</p>
          <h3 className="text-2xl font-bold text-amber-600">1</h3>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-gray-500">Propuestas de Cobro por Autorizar</p>
          <h3 className="text-2xl font-bold text-blue-600">2</h3>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cola de Trabajo Activa</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2.5">Folio</th>
                <th className="py-2.5">Trámite</th>
                <th className="py-2.5">Solicitante</th>
                <th className="py-2.5">Orden de Trabajo (OT)</th>
                <th className="py-2.5">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 font-mono font-semibold">SOL-2026-019</td>
                <td className="py-3">Alta de Predio Urbano</td>
                <td className="py-3">María Elena Rosas</td>
                <td className="py-3">
                  <Badge variant="primary">OT-040-2026-11</Badge>
                </td>
                <td className="py-3 flex gap-2">
                  <Button size="sm" variant="outline" leftIcon={<UserCheck className="w-3.5 h-3.5" />}>
                    Validar Docs
                  </Button>
                  <Button size="sm" variant="secondary" leftIcon={<Calendar className="w-3.5 h-3.5" />}>
                    Agendar Visita
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
