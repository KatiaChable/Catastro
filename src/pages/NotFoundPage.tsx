import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Página No Encontrada</h2>
      <p className="text-xs text-gray-500 max-w-sm mb-6">
        El recurso catastral o la ruta solicitada no existe o no se tienen los permisos requeridos.
      </p>
      <Link to={ROUTES.DASHBOARD}>
        <Button leftIcon={<Home className="w-4 h-4" />}>
          Ir al Inicio
        </Button>
      </Link>
    </div>
  );
}
