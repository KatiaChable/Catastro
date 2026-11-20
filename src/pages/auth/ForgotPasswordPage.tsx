import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ROUTES } from '@/constants';
import { authService, leerErrorApi } from '@/services';
import { identificadorSchema, type IdentificadorForm } from './schemas';

export default function ForgotPasswordPage() {
  const [mensajeEnviado, setMensajeEnviado] = useState<string | null>(null);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IdentificadorForm>({
    resolver: zodResolver(identificadorSchema),
    defaultValues: { identifier: '' },
  });

  // RF-AUT-05: la respuesta es la misma exista o no la cuenta
  const onSubmit = async (datos: IdentificadorForm) => {
    setErrorGeneral(null);
    try {
      const { message } = await authService.recuperarPassword(datos.identifier);
      setMensajeEnviado(message);
    } catch (error) {
      const { mensaje, campos } = leerErrorApi(error);
      if (campos.identifier) setError('identifier', { message: campos.identifier });
      else setErrorGeneral(mensaje);
    }
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

      {mensajeEnviado ? (
        <div className="space-y-4">
          <div
            role="status"
            className="p-4 bg-green-50 border border-green-200 rounded-lg text-xs text-green-900 flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p>{mensajeEnviado} Si no lo ves, revisa la carpeta de spam.</p>
          </div>
          <Link
            to={ROUTES.LOGIN}
            className="w-full py-2.5 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors block text-center shadow-md"
          >
            Regresar a Iniciar Sesión
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {errorGeneral && (
            <div
              role="alert"
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p>{errorGeneral}</p>
            </div>
          )}

          <div>
            <label htmlFor="identifier" className="block text-xs font-semibold text-gray-700 mb-1.5">
              Correo electrónico o CURP / RFC
            </label>
            <input
              id="identifier"
              type="text"
              autoComplete="username"
              placeholder="nombre@ejemplo.com / CURP / RFC"
              aria-invalid={errors.identifier ? 'true' : 'false'}
              aria-describedby="identifier-error"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#7a1737] focus:ring-1 focus:ring-[#7a1737] transition-colors aria-[invalid=true]:border-red-500"
              {...register('identifier')}
            />
            {errors.identifier && (
              <p id="identifier-error" className="text-xs text-red-600 mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors duration-150 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar enlace de recuperación'}
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
