import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building, ArrowRight } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(identifier, password);
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Credenciales inválidas o cuenta temporalmente bloqueada por 5 intentos fallidos.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-white/20 p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
        <p className="text-sm text-gray-500 mt-1">
          Ingresa con tu correo electrónico, CURP o RFC
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Identificador"
          type="text"
          placeholder="correo@ejemplo.com / CURP / RFC"
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          helperText="Ciudadanos o personal interno autorizado"
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-600 text-xs">Recordarme</span>
          </label>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Acceder al Sistema
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta catastral?{' '}
          <Link
            to={ROUTES.REGISTER}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
          >
            <Building className="w-3.5 h-3.5" />
            Regístrate aquí
          </Link>
        </p>
      </div>
    </Card>
  );
}
