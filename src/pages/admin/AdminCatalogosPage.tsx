import { BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button } from '@/components/ui';

export default function AdminCatalogosPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catálogos del Sistema Catastral</h1>
          <p className="text-sm text-gray-500">
            Regiones, Manzanas, Colonias, Vialidades Oficiales y Tipologías del Art. 39
          </p>
        </div>
        <Button>Agregar Elemento</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Tipologías Constructivas (Art. 39)', 'Catálogo de Calles con Código', 'Regiones Catastrales (01 a 15)', 'Colonias y Asentamientos', 'Tipos de Suelo Rural', 'Servicios Municipales'].map((cat) => (
          <Card key={cat} hoverable className="p-4 space-y-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h4 className="font-bold text-sm text-gray-800">{cat}</h4>
            <p className="text-xs text-gray-500">Gestión de códigos y valores normalizados.</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
