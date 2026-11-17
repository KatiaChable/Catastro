import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button } from '@/components/ui';

export default function EstadisticasPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estadísticas Territoriales y de Servicios</h1>
          <p className="text-sm text-gray-500">
            Inteligencia territorial por colonias, vialidades y cobertura de servicios básicos (RF-EST)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Exportar CSV</Button>
          <Button variant="primary" size="sm">Exportar PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Cobertura de Agua Potable</p>
              <h3 className="text-xl font-bold text-gray-900">92.4%</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <PieChart className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Drenaje y Pavimentación</p>
              <h3 className="text-xl font-bold text-gray-900">84.1%</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-xs text-gray-500">Alumbrado Público</p>
              <h3 className="text-xl font-bold text-gray-900">88.7%</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Calles con Déficit de Servicios Básicos</CardTitle>
        </CardHeader>
        <div className="p-6 text-center text-xs text-gray-500">
          Datos calculados para apoyo en toma de decisiones catastrales e infraestructura pública.
        </div>
      </Card>
    </div>
  );
}
