import { Building2, ClipboardList, CreditCard, FileCheck, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido, {user?.persona.nombres || 'Contribuyente'}
          </h1>
          <p className="text-sm text-gray-500">
            Portal Digital de Catastro Municipal — Coatzacoalcos, Veracruz
          </p>
        </div>
        <Link to={ROUTES.MAPA}>
          <Button leftIcon={<MapPin className="w-4 h-4" />}>
            Explorar Mapa Catastral
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Predios Registrados</p>
              <h4 className="text-xl font-bold text-gray-900">1</h4>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Trámites en Curso</p>
              <h4 className="text-xl font-bold text-gray-900">0</h4>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Estatus Predial</p>
              <h4 className="text-xl font-bold text-green-600">Al Corriente</h4>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Cédulas Vigentes</p>
              <h4 className="text-xl font-bold text-gray-900">1</h4>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
            <CardDescription>Trámites y servicios catastrales en línea</CardDescription>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3">
            <Link to={ROUTES.TRAMITE_NUEVO}>
              <Button variant="outline" className="w-full justify-start h-auto py-3">
                <div className="text-left">
                  <p className="font-semibold text-xs">Cédula Catastral</p>
                  <p className="text-[11px] text-gray-500">Expedición oficial DGCV-015</p>
                </div>
              </Button>
            </Link>
            <Link to={ROUTES.TRAMITE_NUEVO}>
              <Button variant="outline" className="w-full justify-start h-auto py-3">
                <div className="text-left">
                  <p className="font-semibold text-xs">Constancia de No Adeudo</p>
                  <p className="text-[11px] text-gray-500">Validez 60 días con QR</p>
                </div>
              </Button>
            </Link>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marco Legal y Requisitos</CardTitle>
            <CardDescription>Coatzacoalcos, Veracruz (Municipio 040)</CardDescription>
          </CardHeader>
          <ul className="text-xs text-gray-600 space-y-2">
            <li>• Cédula catastral: vigencia 90 días naturales (Ley Catastro Art. 24).</li>
            <li>• Constancia de no adeudo: 60 días de vigencia municipal.</li>
            <li>• Clave Catastral única de 22 dígitos conforme a Ley Estatal.</li>
            <li>• Valuación: Valor del terreno + construcciones tipificadas (Art. 14 y 39).</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
