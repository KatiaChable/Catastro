import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Building2, ArrowLeft } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';
import type { TipoPersona } from '@/types';

export default function RegisterPage() {
  const [tipoPersona, setTipoPersona] = useState<TipoPersona>('fisica');

  return (
    <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-white/20 p-8 max-w-lg mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Registro de Contribuyente</h2>
        <p className="text-sm text-gray-500 mt-1">
          Catastro Municipal de Coatzacoalcos
        </p>
      </div>

      {/* Selector de Tipo de Persona */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg mb-6">
        <button
          type="button"
          onClick={() => setTipoPersona('fisica')}
          className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-all ${
            tipoPersona === 'fisica'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="w-4 h-4" />
          Persona Física
        </button>
        <button
          type="button"
          onClick={() => setTipoPersona('moral')}
          className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-all ${
            tipoPersona === 'moral'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Persona Moral
        </button>
      </div>

      {tipoPersona === 'fisica' ? (
        <form className="space-y-3">
          <Input label="Nombre(s)" placeholder="Ej. Juan Carlos" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Primer Apellido" placeholder="Pérez" required />
            <Input label="Segundo Apellido" placeholder="Gómez" />
          </div>
          <Input
            label="CURP"
            placeholder="18 caracteres alfanuméricos"
            required
            helperText="Formato oficial RENAPO"
          />
          <Input label="RFC (Opcional)" placeholder="13 caracteres" />
          <Input label="Correo Electrónico" type="email" placeholder="usuario@correo.com" required />
          <Input label="Número Celular" type="tel" placeholder="10 dígitos" required />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 12 caracteres"
            required
            helperText="Cifrado con Argon2id / bcrypt"
          />
          <Button type="submit" className="w-full mt-4">
            Completar Registro
          </Button>
        </form>
      ) : (
        <form className="space-y-3">
          <Input label="Razón Social" placeholder="Empresa S.A. de C.V." required />
          <Input label="RFC" placeholder="12 caracteres oficiales" required />
          <Input label="Representante Legal" placeholder="Nombre completo" required />
          <Input label="CURP Representante" placeholder="18 caracteres" required />
          <Input label="Correo Institucional" type="email" placeholder="contacto@empresa.com" required />
          <Input label="Celular de Contacto" type="tel" placeholder="10 dígitos" required />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 12 caracteres"
            required
          />
          <Button type="submit" className="w-full mt-4">
            Completar Registro Moral
          </Button>
        </form>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <Link
          to={ROUTES.LOGIN}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al inicio de sesión
        </Link>
      </div>
    </Card>
  );
}
