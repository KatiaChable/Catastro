import { PenTool, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';

export default function GestorTrazoPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editor Cartográfico de Trazos y Lotes</h1>
          <p className="text-sm text-gray-500">
            Trazo por coordenadas, dibujo e importación bajo Orden de Trabajo abierta (RF-EDI-05)
          </p>
        </div>
        <Badge variant="info">Modo Edición Habilitado</Badge>
      </div>

      <Card className="h-96 flex flex-col items-center justify-center border-dashed border-2 bg-gray-50 text-center">
        <PenTool className="w-12 h-12 text-gray-400 mb-2" />
        <h4 className="font-bold text-gray-800">Lienzo de Trazo Cartográfico</h4>
        <p className="text-xs text-gray-500 max-w-md mt-1">
          Validación automática: sin traslape, dentro de manzana/región catastral, linderos acotados,
          tolerancia de superficie contra plano y frente a vialidad oficial.
        </p>
        <Button className="mt-4" size="sm" leftIcon={<CheckCircle className="w-4 h-4" />}>
          Enviar Plano a Aprobación (Autorizador)
        </Button>
      </Card>
    </div>
  );
}
