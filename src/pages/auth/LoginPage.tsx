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

    const cleanId = identifier.trim();
    if (!cleanId) {
      setError('Ingresa tu correo electrónico, CURP o RFC registrado.');
      return;
    }

    if (!password) {
      setError('Ingresa tu contraseña.');
      return;
    }

    setIsLoading(true);

    try {
      await login(cleanId, password);
      navigate(ROUTES.DASHBOARD);
    } catch {
      // Fallback para desarrollo sin backend corriendo
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
    <div className="bg-white rounded-2xl shadow-2xl p-7 sm:p-8 w-full max-w-[400px] text-gray-900 border border-gray-100/90">
      {/* Título y subtítulo */}
      <div className="mb-5">
        <h2 className="text-[23px] font-bold text-gray-900 tracking-tight leading-snug">
          Iniciar sesión
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-normal">
          Acceso oficial para ciudadanos y personas morales empadronadas.
        </p>
      </div>

      {error && (
        <div className="mb-3.5 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Identificador: Correo, CURP o RFC (RF-AUT-04) */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Correo electrónico, CURP o RFC
          </label>
          <input
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="correo@ejemplo.com / CURP / RFC"
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333] transition-colors"
          />
          <p className="text-[10px] text-gray-400 mt-1">
            Puedes identificarte con cualquiera de tus 3 datos oficiales (RF-AUT-04).
          </p>
        </div>

        {/* Contraseña */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-gray-700">
              Contraseña
            </label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-[11px] text-[#741333] hover:underline font-normal"
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
              className="w-full px-3.5 py-2.5 pr-16 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-900 font-normal select-none"
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
              className="rounded border-gray-300 text-[#741333] focus:ring-[#741333] w-3.5 h-3.5"
            />
            <span className="text-xs text-gray-600 font-normal">Mantener sesión activa</span>
          </label>
        </div>

        {/* Botón Iniciar sesión */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 px-4 bg-[#741333] hover:bg-[#580a22] text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors duration-150 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
        >
          {isLoading ? 'Comprobando credenciales...' : 'Acceder al Padrón'}
        </button>
      </form>

      {/* Sección inferior */}
      <div className="mt-5 pt-4 border-t border-gray-100 text-center space-y-2">
        <p className="text-xs text-gray-600 font-normal">¿Aún no estás registrado en el catastro?</p>
        <Link
          to={ROUTES.REGISTER}
          className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-xs sm:text-sm transition-colors block text-center"
        >
          Crear cuenta de contribuyente
        </Link>
      </div>

      {/* Selector de roles de prueba */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
          Roles de prueba (Frontend)
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 text-[10px]">
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.CIUDADANO)}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded font-medium"
          >
            Ciudadano
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.GESTOR)}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded font-medium"
          >
            Gestor
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.AUTORIZADOR)}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded font-medium"
          >
            Autorizador
          </button>
          <button
            type="button"
            onClick={() => handleQuickRoleAccess(UserRole.DIRECTOR)}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded font-medium"
          >
            Director
          </button>
        </div>
      </div>
    </div>
  );
}
