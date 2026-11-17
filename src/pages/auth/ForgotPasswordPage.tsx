import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ROUTES } from '@/constants';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[440px] text-gray-900 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Recuperar Contraseña
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Ingresa tu correo o CURP/RFC registrado.
        </p>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-xs text-green-900 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p>
              Si la cuenta existe en el padrón catastral, hemos enviado un enlace temporal de 30 minutos y un código SMS a tu teléfono celular registrado (RF-AUT-05).
            </p>
          </div>
          <Link
            to={ROUTES.LOGIN}
            className="w-full py-2.5 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors block text-center shadow-md"
          >
            Regresar a Iniciar Sesión
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Correo electrónico o CURP / RFC
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors duration-150 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </button>

          <div className="text-center pt-2">
            <Link
              to={ROUTES.LOGIN}
              className="text-xs text-[#7a1737] hover:underline font-medium inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Cancelar y volver al inicio de sesión
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
