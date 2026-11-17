import { Map as MapIcon, Layers, Search, Eye } from 'lucide-react';
import { Card, Button, Input, Badge } from '@/components/ui';

export default function MapaPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visor Cartográfico Interactivo</h1>
          <p className="text-sm text-gray-500">
            Coatzacoalcos, Ver. · EPSG:4326 (WGS84) / Cálculo UTM Zona 15N
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="primary">Modo Plano</Badge>
          <Badge variant="secondary">Modo Satélite</Badge>
        </div>
      </div>

      {/* Controles de mapa y búsqueda */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            placeholder="Buscar por clave catastral (22 dígitos)..."
            leftIcon={<Search className="w-4 h-4" />}
          />
          <Input placeholder="Filtrar por Colonia / Manzana..." />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" leftIcon={<Layers className="w-4 h-4" />}>
              Capas (Art. 11)
            </Button>
            <Button variant="primary" leftIcon={<Eye className="w-4 h-4" />}>
              Ver Predio
            </Button>
          </div>
        </div>
      </Card>

      {/* Contenedor del mapa (Placeholder para el Rol #4 MapLibre) */}
      <div className="h-[600px] w-full bg-slate-900 rounded-xl border border-gray-300 relative flex items-center justify-center overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative text-center p-6 max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white shadow-2xl">
          <MapIcon className="w-12 h-12 mx-auto text-blue-400 mb-3" />
          <h3 className="text-lg font-bold">Lienzo Cartográfico (MapLibre GL)</h3>
          <p className="text-xs text-gray-300 mt-2">
            Asignado a: <strong>Rol #4 - Frontend de Mapas</strong>
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            Vista plana y satélite conmutable, capas de manzanas, predios, bloques de construcción
            y filtro de servidor para mostrar sólo los predios del contribuyente.
          </p>
        </div>
      </div>
    </div>
  );
}
