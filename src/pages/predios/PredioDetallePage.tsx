import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Layers, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { ROUTES } from '@/constants';
import { formatClaveCatastral } from '@/utils';

export default function PredioDetallePage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={ROUTES.PREDIOS}>
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Volver a Mis Predios
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Ficha Catastral del Inmueble #{id}
          </h1>
          <p className="text-xs text-gray-500">
            Datos técnicos, colindancias y tipologías constructivas (Reglamento Art. 14 y 39)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Identificación Catastral</CardTitle>
                <Badge variant="primary">Activo</Badge>
              </div>
            </CardHeader>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Clave Catastral Oficial (22 dígitos)</p>
                <p className="font-mono font-bold text-gray-800">
                  {formatClaveCatastral('0510000104002002000005')}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Municipio y Zona</p>
                <p className="font-medium text-gray-800">Coatzacoalcos (040) · Zona 05</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Ubicación</p>
                <p className="font-medium text-gray-800">Av. Ignacio Zaragoza #412, Col. Centro</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Superficie Terreno</p>
                <p className="font-bold text-gray-800">250 m²</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Construcciones y Tipologías (Art. 39)</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-2">Tipo</th>
                    <th className="py-2">E (Conservación)</th>
                    <th className="py-2">T (Terminación)</th>
                    <th className="py-2">A (Año)</th>
                    <th className="py-2">Área (m²)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 font-medium">02 · Habitacional media</td>
                    <td className="py-2.5">1 (Bueno)</td>
                    <td className="py-2.5">1 (Terminada)</td>
                    <td className="py-2.5">2010</td>
                    <td className="py-2.5 font-bold">180 m²</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acciones del Predio</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              <Link to={ROUTES.TRAMITE_NUEVO}>
                <Button className="w-full" leftIcon={<Building2 className="w-4 h-4" />}>
                  Solicitar Cédula Catastral
                </Button>
              </Link>
              <Link to={ROUTES.TRAMITE_NUEVO}>
                <Button variant="outline" className="w-full" leftIcon={<Layers className="w-4 h-4" />}>
                  Constancia de No Adeudo
                </Button>
              </Link>
              <Link to={ROUTES.MAPA}>
                <Button variant="secondary" className="w-full" leftIcon={<MapPin className="w-4 h-4" />}>
                  Ubicar en el Mapa
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
