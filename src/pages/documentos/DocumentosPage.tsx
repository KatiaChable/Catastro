import { FileText, Download, QrCode } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';

export default function DocumentosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bóveda de Documentos Oficiales</h1>
        <p className="text-sm text-gray-500">
          Cédulas y constancias emitidas con firma electrónica simulada y código QR de verificación
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <CardHeader className="mb-0 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Cédula Catastral (DGCV-015)</CardTitle>
                <p className="text-xs text-gray-500 mt-1">Folio Oficial: CED-2026-00891</p>
              </div>
              <Badge variant="success">Vigente (90 días)</Badge>
            </div>
          </CardHeader>

          <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-1 text-gray-600">
            <p><strong>Predio:</strong> Av. Zaragoza #412 · Coatzacoalcos</p>
            <p><strong>Clave:</strong> 05-100-001-04-002-002-00-000-5</p>
            <p><strong>Vigencia hasta:</strong> 15 de Mayo de 2026</p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button className="flex-1" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Descargar Cédula PDF
            </Button>
            <Button variant="outline" size="sm" leftIcon={<QrCode className="w-4 h-4" />}>
              Ver QR
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
