import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { ROUTES } from '@/constants';
import { authService, leerErrorApi } from '@/services';
import { identificadorSchema, type IdentificadorForm } from './schemas';

type Estado = 'verificando' | 'exito' | 'error';

/** Pantalla que abre el enlace del correo: /verificar-correo?token=... (RF-AUT-02, vence en 24 h) */
export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [token] = useState(() => params.get('token') ?? '');
  const [estado, setEstado] = useState<Estado>(token ? 'verificando' : 'error');
  const [mensaje, setMensaje] = useState(token ? '' : 'El enlace está incompleto.');
  // En desarrollo, StrictMode ejecuta los efectos dos veces. El token es de un solo uso,
  // así que esta bandera evita mandarlo dos veces (la segunda diría "ya se usó").
  const yaEnviado = useRef(false);

  useEffect(() => {
    if (!token || yaEnviado.current) return;
    yaEnviado.current = true;
    navigate({ search: '' }, { replace: true });
    authService
      .verificarCorreo(token)
      .then(({ message }) => {
        setMensaje(message);
        setEstado('exito');
      })
      .catch((error) => {
        setMensaje(leerErrorApi(error).mensaje);
        setEstado('error');
      });
  }, [token, navigate]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[440px] text-gray-900 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {estado === 'verificando'
            ? 'Verificando tu correo'
            : estado === 'exito'
              ? '¡Correo verificado!'
              : 'No pudimos verificar tu correo'}
        </h2>
      </div>

      {estado === 'verificando' && (
        <p role="status" className="text-sm text-gray-500 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[#741333]" />
          Un momento…
        </p>
      )}

      {estado === 'exito' && (
        <div className="space-y-4">
          <div
            role="status"
            className="p-4 bg-green-50 border border-green-200 rounded-lg text-xs text-green-900 flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p>{mensaje}</p>
          </div>
          <Link
            to={ROUTES.LOGIN}
            className="w-full py-2.5 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors block text-center shadow-md"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}

      {estado === 'error' && (
        <div className="space-y-4">
          <div
            role="alert"
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2.5"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p>{mensaje}</p>
          </div>
          <ReenviarEnlace />
        </div>
      )}
    </div>
  );
}

function ReenviarEnlace() {
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IdentificadorForm>({
    resolver: zodResolver(identificadorSchema),
    defaultValues: { identifier: '' },
  });

  const onSubmit = async (datos: IdentificadorForm) => {
    setErrorGeneral(null);
    try {
      const { message } = await authService.reenviarVerificacion(datos.identifier);
      setRespuesta(message);
    } catch (error) {
      setErrorGeneral(leerErrorApi(error).mensaje);
    }
  };

  if (respuesta) {
    return (
      <div
        role="status"
        className="p-4 bg-green-50 border border-green-200 rounded-lg text-xs text-green-900 flex items-start gap-2.5"
      >
        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <p>{respuesta}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
      <p className="text-xs text-gray-600">Escribe tu correo, CURP o RFC y te enviamos un enlace nuevo.</p>
      {errorGeneral && <p className="text-xs text-red-600">{errorGeneral}</p>}
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
        {isSubmitting ? 'Enviando...' : 'Enviar enlace nuevo'}
      </button>
      <div className="text-center pt-1">
        <Link to={ROUTES.LOGIN} className="text-xs text-[#7a1737] hover:underline font-medium">
          Volver al inicio de sesión
        </Link>
      </div>
    </form>
  );
}
