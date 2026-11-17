import { Settings, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Input } from '@/components/ui';

export default function AdminTarifasPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración de Tarifas Municipales</h1>
          <p className="text-sm text-gray-500">
            Valores de referencia para derechos catastrales y fórmulas de cobro
          </p>
        </div>
        <Button leftIcon={<Save className="w-4 h-4" />}>Guardar Tarifas</Button>
      </div>

      <Card className="space-y-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-500" />
            <CardTitle>Derechos por Expedición de Documentos</CardTitle>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Cédula Catastral (Tarifa fija)" defaultValue="969.98" leftIcon={<span>$</span>} helperText="Plazo máx: 15 días hábiles" />
          <Input label="Constancia de No Adeudo (Tarifa fija)" defaultValue="200.00" leftIcon={<span>$</span>} helperText="Plazo máx: 7 días hábiles" />
          <Input label="Trazo de Plano Base (Hasta 1,000 m²)" defaultValue="500.00" leftIcon={<span>$</span>} helperText="Tarifa base acordada" />
          <Input label="Costo por 100 m² Adicionales" defaultValue="50.00" leftIcon={<span>$</span>} helperText="Excedente sobre 1,000 m²" />
        </div>
      </Card>
    </div>
  );
}
