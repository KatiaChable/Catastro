import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ROUTES } from '@/constants';
import { authService, leerErrorApi } from '@/services';
import { nuevaContrasenaSchema, type NuevaContrasenaForm } from './schemas';

/** Pantalla que abre el enlace del correo: /restablecer-contrasena?token=... (vence en 30 min) */
export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  // Se lee una vez y se quita de la barra de direcciones para que no quede en el historial
  const [token] = useState(() => params.get('token') ?? '');
  const [listo, setListo] = useState<string | null>(null);
  const [errorEnlace, setErrorEnlace] = useState<string | null>(
    token ? null : 'El enlace está incompleto. Solicita uno nuevo.'
  );

  useEffect(() => {
    if (params.has('token')) navigate({ search: '' }, { replace: true });
  }, [params, navigate]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NuevaContrasenaForm>({
    resolver: zodResolver(nuevaContrasenaSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (datos: NuevaContrasenaForm) => {
    try {
      const { message } = await authService.resetPassword(token, datos.password);
      setListo(message);
    } catch (error) {
      const { mensaje, campos } = leerErrorApi(error);
      if (campos.newPassword) setError('password', { message: campos.newPassword });
      else setErrorEnlace(mensaje);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[440px] text-gray-900 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {listo ? 'Contraseña actualizada' : errorEnlace ? 'Enlace no válido' : 'Nueva Contraseña'}
        </h2>
        {!listo && !errorEnlace && (
          <p className="text-sm text-gray-500 mt-1">Crea una contraseña de al menos 12 caracteres.</p>
        )}
      </div>

      {listo ? (
        <div className="space-y-4">
          <div
            role="status"
            className="p-4 bg-green-50 border border-green-200 rounded-lg text-xs text-green-900 flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p>{listo}</p>
          </div>
          <Link
            to={ROUTES.LOGIN}
            className="w-full py-2.5 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors block text-center shadow-md"
          >
            Iniciar Sesión
          </Link>
        </div>
      ) : errorEnlace ? (
        <div className="space-y-4">
          <div
            role="alert"
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2.5"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p>{errorEnlace}</p>
          </div>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="w-full py-2.5 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors block text-center shadow-md"
          >
            Solicitar un enlace nuevo
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <CampoContrasena
            id="password"
            etiqueta="Nueva contraseña (Mínimo 12 caracteres)"
            placeholder="Mínimo 12 caracteres oficiales"
            error={errors.password?.message}
            registro={register('password')}
          />
          <CampoContrasena
            id="confirmPassword"
            etiqueta="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            error={errors.confirmPassword?.message}
            registro={register('confirmPassword')}
          />
          <p className="text-[10px] text-gray-500 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#741333]" />
            Al guardar cerramos todas tus sesiones abiertas (RF-AUT-05).
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-[#7a1737] hover:bg-[#600f29] text-white font-medium rounded-lg text-sm transition-colors duration-150 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar nueva contraseña'}
          </button>

          <div className="text-center pt-2">
            <Link to={ROUTES.LOGIN} className="text-xs text-[#7a1737] hover:underline font-medium">
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

function CampoContrasena(props: {
  id: string;
  etiqueta: string;
  placeholder: string;
  error?: string;
  registro: UseFormRegisterReturn;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={props.id} className="block text-xs font-semibold text-gray-700 mb-1.5">
        {props.etiqueta} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          id={props.id}
          type={visible ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder={props.placeholder}
          aria-invalid={props.error ? 'true' : 'false'}
          aria-describedby={`${props.id}-error`}
          className="w-full px-3.5 py-2.5 pr-16 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333] aria-[invalid=true]:border-red-500"
          {...props.registro}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-900 font-normal select-none"
        >
          {visible ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      {props.error && (
        <p id={`${props.id}-error`} className="text-xs text-red-600 mt-1">
          {props.error}
        </p>
      )}
    </div>
  );
}
