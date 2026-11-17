import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Usa al menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 600));
      try {
        await login(email, password);
      } catch {
        // En modo frontend
      }
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Error al procesar el registro.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-7 sm:p-8 w-full max-w-[390px] text-gray-900 border border-gray-100">
      {/* Título y subtítulo */}
      <div className="mb-5">
        <h2 className="text-[22px] font-bold text-gray-900 tracking-tight leading-snug">
          Crea tu cuenta
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Completa tus datos para registrarte.
        </p>
      </div>

      {error && (
        <div className="mb-3.5 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Correo electrónico */}
        <div>
          <label className="block text-xs font-medium text-gray-800 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@ejemplo.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6e0e29] focus:ring-1 focus:ring-[#6e0e29] transition-colors"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-xs font-medium text-gray-800 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crea una contraseña"
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
          <p className="text-[11px] text-gray-500 mt-1">Usa al menos 8 caracteres.</p>
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label className="block text-xs font-medium text-gray-800 mb-1">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6e0e29] focus:ring-1 focus:ring-[#6e0e29] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-900 font-normal select-none"
            >
              {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {/* Botón Crear cuenta */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-1.5 py-2.5 px-4 bg-[#6e0e29] hover:bg-[#560a1f] text-white font-medium rounded-lg text-xs sm:text-sm transition-colors duration-150 shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        {/* Disclaimer */}
        <p className="text-[11px] text-gray-500 text-center pt-1 leading-tight">
          Al crear tu cuenta, aceptas el aviso de privacidad.
        </p>
      </form>

      {/* Sección inferior */}
      <div className="mt-5 pt-4 border-t border-gray-100 text-center space-y-2">
        <p className="text-xs text-gray-600">¿Ya tienes una cuenta?</p>
        <Link
          to={ROUTES.LOGIN}
          className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-xs sm:text-sm transition-colors block text-center"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
