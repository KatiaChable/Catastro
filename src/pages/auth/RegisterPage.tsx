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

  const [tipoPersona, setTipoPersona] = useState<'fisica' | 'moral'>('fisica');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [curp, setCurp] = useState('');
  const [rfc, setRfc] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('La contraseña debe contener al menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulación de registro exitoso
      await new Promise((res) => setTimeout(res, 800));
      // Auto-login o redirección
      try {
        await login(email, password);
      } catch {
        // En caso de mock en desarrollo
      }
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Error al procesar el registro. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[440px] text-gray-900 border border-gray-100">
      {/* Encabezado de la tarjeta */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Crea tu cuenta
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Completa tus datos para registrarte.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      {/* Selector rápido: Persona Física / Moral (Requisito RF-AUT-01) */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-2 border-b border-gray-100">
        <span className="font-medium text-gray-700">Tipo de contribuyente:</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTipoPersona('fisica')}
            className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
              tipoPersona === 'fisica'
                ? 'bg-[#7a1737] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Física
          </button>
          <button
            type="button"
            onClick={() => setTipoPersona('moral')}
            className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
              tipoPersona === 'moral'
                ? 'bg-[#7a1737] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Moral / Notaría
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Correo electrónico */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Correo electrónico
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@ejemplo.com"
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#7a1737] focus:ring-1 focus:ring-[#7a1737] transition-colors"
          />
        </div>

        {/* Contraseña con botón Mostrar */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crea una contraseña"
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
          <p className="text-[11px] text-gray-500 mt-1">Usa al menos 8 caracteres.</p>
        </div>

        {/* Confirmar contraseña con botón Mostrar */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              className="w-full px-3.5 py-2.5 pr-20 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#7a1737] focus:ring-1 focus:ring-[#7a1737] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 hover:text-gray-900"
            >
              {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {/* Datos fiscales opcionales / desplegables (RF-AUT-01) */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-[#7a1737] hover:underline font-medium inline-flex items-center gap-1"
          >
            {showAdvanced
              ? '− Ocultar datos fiscales de vinculación'
              : '+ Agregar CURP / RFC para vincular predios automáticamente'}
          </button>

          {showAdvanced && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2.5 text-xs border border-gray-200">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  {tipoPersona === 'fisica' ? 'Nombre Completo' : 'Razón Social'}
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={tipoPersona === 'fisica' ? 'Juan Carlos Pérez' : 'Inmobiliaria Coatza S.A.'}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    {tipoPersona === 'fisica' ? 'CURP (18 car.)' : 'RFC (12 car.)'}
                  </label>
                  <input
                    type="text"
                    value={curp}
                    onChange={(e) => setCurp(e.target.value.toUpperCase())}
                    placeholder={tipoPersona === 'fisica' ? 'ABCD010203HVER...' : 'COA010203ABC'}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded bg-white text-xs font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Celular</label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="10 dígitos"
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded bg-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botón Principal: Crear cuenta */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors duration-150 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        {/* Términos y privacidad */}
        <p className="text-[11px] text-gray-500 text-center pt-1">
          Al crear tu cuenta, aceptas el aviso de privacidad.
        </p>
      </form>

      {/* Sección inferior: ¿Ya tienes una cuenta? */}
      <div className="mt-6 pt-5 border-t border-gray-100 text-center space-y-3">
        <p className="text-xs text-gray-600">¿Ya tienes una cuenta?</p>
        <Link
          to={ROUTES.LOGIN}
          className="w-full py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm transition-colors block text-center"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
