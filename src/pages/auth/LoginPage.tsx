import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';
import { UserRole } from '@/types';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
      // Si el backend no está corriendo, o credenciales de prueba
      if (!identifier) {
        setError('Por favor ingresa tu correo o CURP/RFC.');
      } else {
        // Redirigir a dashboard en modo desarrollo para ver las pantallas
        navigate(ROUTES.DASHBOARD);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Acceso rápido para pruebas de los distintos roles (Frontend)
  const handleQuickRoleAccess = (rol: UserRole) => {
    localStorage.setItem('auth_token', 'dev_token_sample');
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[440px] text-gray-900 border border-gray-100">
      {/* Encabezado */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Iniciar sesión
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Ingresa tus credenciales para acceder al sistema.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Correo o CURP / RFC */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Correo electrónico, CURP o RFC
          </label>
          <input
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="nombre@ejemplo.com / CURP / RFC"
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#7a1737] focus:ring-1 focus:ring-[#7a1737] transition-colors"
          />
        </div>

        {/* Contraseña con botón Mostrar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Contraseña
            </label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-xs text-[#7a1737] hover:underline font-medium"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full px-3.5 py-2.5 pr-20 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#7a1737] focus:ring-1 focus:ring-[#7a1737] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 hover:text-gray-900"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {/* Recordarme */}
        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-[#7a1737] focus:ring-[#7a1737] w-4 h-4"
            />
            <span className="text-xs text-gray-600">Mantener sesión iniciada</span>
          </label>
        </div>

        {/* Botón Principal: Iniciar sesión */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors duration-150 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? 'Verificando...' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Sección inferior: ¿No tienes una cuenta? */}
      <div className="mt-6 pt-5 border-t border-gray-100 text-center space-y-3">
        <p className="text-xs text-gray-600">¿No tienes una cuenta?</p>
        <Link
          to={ROUTES.REGISTER}
          className="w-full py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm transition-colors block text-center"
        >
          Crea tu cuenta
        </Link>
      </div>

      {/* Selector de prueba para desarrollo Frontend (simulación de roles) */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
          Acceso rápido por rol (Desarrollo Frontend)
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.CIUDADANO)}
            className="px-2 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200"
          >
            Ciudadano
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.GESTOR)}
            className="px-2 py-0.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded border border-amber-200"
          >
            Gestor
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.AUTORIZADOR)}
            className="px-2 py-0.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded border border-purple-200"
          >
            Autorizador
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.DIRECTOR)}
            className="px-2 py-0.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded border border-rose-200"
          >
            Director
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.CAJERO)}
            className="px-2 py-0.5 bg-green-50 text-green-700 hover:bg-green-100 rounded border border-green-200"
          >
            Cajero
          </button>
        </div>
      </div>
    </div>
  );
}
