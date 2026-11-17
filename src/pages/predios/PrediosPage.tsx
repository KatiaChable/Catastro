import { Building, Plus, FileText, CreditCard } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { formatClaveCatastral } from '@/utils';

export default function PrediosPage() {
  const prediosDemo = [
    {
      id: '1',
      claveCatastral: '0510000104002002000005',
      colonia: 'Centro',
      calle: 'Av. Zaragoza #412',
      superficieM2: 250,
      tipoPredio: 'Urbano',
      uso: 'Habitacional',
      estadoFisico: 'Construido',
      estatusPredial: 'al_corriente',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Predios</h1>
          <p className="text-sm text-gray-500">
            Padrón de bienes inmuebles vinculados a tu RFC / CURP
          </p>
        </div>
        <Link to={ROUTES.TRAMITE_NUEVO}>
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Dar de Alta Nuevo Predio
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prediosDemo.map((predio) => (
          <Card key={predio.id} hoverable className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {predio.calle}
                  </h4>
                  <p className="text-xs text-gray-500">{predio.colonia}</p>
                </div>
              </div>
              <Badge variant="success">Al Corriente</Badge>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg space-y-1 text-xs">
              <p className="text-gray-500">Clave Catastral (22 dígitos):</p>
              <p className="font-mono font-medium text-gray-800">
                {formatClaveCatastral(predio.claveCatastral)}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs border-y border-gray-100 py-2">
              <div>
                <p className="text-gray-400">Área</p>
                <p className="font-semibold text-gray-800">{predio.superficieM2} m²</p>
              </div>
              <div>
                <p className="text-gray-400">Tipo</p>
                <p className="font-semibold text-gray-800">{predio.tipoPredio}</p>
              </div>
              <div>
                <p className="text-gray-400">Uso</p>
                <p className="font-semibold text-gray-800">{predio.uso}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Link to={`/predios/${predio.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full" leftIcon={<FileText className="w-3.5 h-3.5" />}>
                  Ver Ficha
                </Button>
              </Link>
              <Link to={`/predios/${predio.id}/predial`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full" leftIcon={<CreditCard className="w-3.5 h-3.5" />}>
                  Predial
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
