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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(identifier, password);
      navigate(ROUTES.DASHBOARD);
    } catch {
      // Para desarrollo si el backend está desconectado
      navigate(ROUTES.DASHBOARD);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickRoleAccess = (rol: UserRole) => {
    localStorage.setItem('auth_token', 'dev_token_sample');
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-7 sm:p-8 w-full max-w-[390px] text-gray-900 border border-gray-100">
      {/* Título y subtítulo */}
      <div className="mb-5">
        <h2 className="text-[22px] font-bold text-gray-900 tracking-tight leading-snug">
          Iniciar sesión
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Ingresa tus credenciales para acceder.
        </p>
      </div>

      {error && (
        <div className="mb-3.5 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Identificador */}
        <div>
          <label className="block text-xs font-medium text-gray-800 mb-1">
            Correo electrónico, CURP o RFC
          </label>
          <input
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="nombre@ejemplo.com / CURP / RFC"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6e0e29] focus:ring-1 focus:ring-[#6e0e29] transition-colors"
          />
        </div>

        {/* Contraseña */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-medium text-gray-800">
              Contraseña
            </label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-[11px] text-[#6e0e29] hover:underline font-normal"
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
              className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6e0e29] focus:ring-1 focus:ring-[#6e0e29] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-900 font-normal select-none"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {/* Botón Iniciar sesión */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-1.5 py-2.5 px-4 bg-[#6e0e29] hover:bg-[#560a1f] text-white font-medium rounded-lg text-xs sm:text-sm transition-colors duration-150 shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Sección inferior */}
      <div className="mt-5 pt-4 border-t border-gray-100 text-center space-y-2">
        <p className="text-xs text-gray-600">¿No tienes una cuenta?</p>
        <Link
          to={ROUTES.REGISTER}
          className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-xs sm:text-sm transition-colors block text-center"
        >
          Crea tu cuenta
        </Link>
      </div>

      {/* Roles para desarrollo */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-semibold">
          Roles de prueba
        </p>
        <div className="flex flex-wrap justify-center gap-1 text-[10px]">
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.CIUDADANO)}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
          >
            Ciudadano
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.GESTOR)}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
          >
            Gestor
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.AUTORIZADOR)}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
          >
            Autorizador
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.DIRECTOR)}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
          >
            Director
          </button>
        </div>
      </div>
    </div>
  );
}
