import { Users, UserPlus, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administración de Usuarios y Roles</h1>
          <p className="text-sm text-gray-500">
            Control de altas de personal interno, asignación de permisos y estado de cuentas (RF-AUT-06)
          </p>
        </div>
        <Button leftIcon={<UserPlus className="w-4 h-4" />}>
          Dar de Alta Funcionario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Padrón de Servidores Públicos y Contribuyentes</CardTitle>
            <Shield className="w-5 h-5 text-slate-500" />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2.5">Nombre</th>
                <th className="py-2.5">Correo</th>
                <th className="py-2.5">Rol</th>
                <th className="py-2.5">Estado</th>
                <th className="py-2.5">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 font-semibold">Lic. Roberto Méndez</td>
                <td className="py-3">roberto.mendez@coatzacoalcos.gob.mx</td>
                <td className="py-3"><Badge variant="warning">GES · Gestor</Badge></td>
                <td className="py-3"><Badge variant="success">Activo</Badge></td>
                <td className="py-3"><Button size="sm" variant="ghost">Editar</Button></td>
              </tr>
              <tr>
                <td className="py-3 font-semibold">Arq. Gabriela Solís</td>
                <td className="py-3">gabriela.solis@coatzacoalcos.gob.mx</td>
                <td className="py-3"><Badge variant="primary">DIR · Directora</Badge></td>
                <td className="py-3"><Badge variant="success">Activo</Badge></td>
                <td className="py-3"><Button size="sm" variant="ghost">Editar</Button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
