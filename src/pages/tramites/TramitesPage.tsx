import { ClipboardList, Plus, Clock, FileCheck } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export default function TramitesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Trámites Catastrales</h1>
          <p className="text-sm text-gray-500">
            Seguimiento en línea de cédulas, constancias de no adeudo y altas
          </p>
        </div>
        <Link to={ROUTES.TRAMITE_NUEVO}>
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Iniciar Nuevo Trámite
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card hoverable className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-gray-500">
              Folio: CAT-2026-0042
            </span>
            <Badge variant="warning">En Revisión</Badge>
          </div>
          <h4 className="font-semibold text-sm text-gray-900">
            Expedición de Cédula Catastral
          </h4>
          <p className="text-xs text-gray-500">
            Predio: Av. Zaragoza #412 · Coatzacoalcos
          </p>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Plazo: 15 días hábiles
            </span>
            <Link to="/tramites/CAT-2026-0042" className="text-blue-600 font-medium hover:underline">
              Ver Detalle →
            </Link>
          </div>
        </Card>

        <Card hoverable className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-gray-500">
              Folio: CAT-2026-0018
            </span>
            <Badge variant="success">Emitido</Badge>
          </div>
          <h4 className="font-semibold text-sm text-gray-900">
            Constancia de No Adeudo Municipal
          </h4>
          <p className="text-xs text-gray-500">
            Predio: Av. Zaragoza #412 · Vigencia: 60 días
          </p>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-green-600" /> Disponible
            </span>
            <Link to="/tramites/CAT-2026-0018" className="text-blue-600 font-medium hover:underline">
              Descargar →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
