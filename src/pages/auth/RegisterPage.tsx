import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';
import { isValidCURP, isValidRFCFisica, isValidRFCMoral } from '@/utils';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Tipo de persona: física o moral (RF-AUT-01)
  const [tipoPersona, setTipoPersona] = useState<'fisica' | 'moral'>('fisica');

  // Campos Persona Física
  const [nombres, setNombres] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [curp, setCurp] = useState('');
  const [rfc, setRfc] = useState('');

  // Campos Persona Moral
  const [razonSocial, setRazonSocial] = useState('');
  const [rfcMoral, setRfcMoral] = useState('');
  const [repLegalNombre, setRepLegalNombre] = useState('');
  const [repLegalCurp, setRepLegalCurp] = useState('');

  // Campos comunes de acceso y contacto
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados de proceso y errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Validación de contraseña mínima de 12 caracteres (RF-AUT-01)
    if (password.length < 12) {
      setError('Por seguridad oficial (RF-AUT-01), la contraseña debe tener al menos 12 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // 2. Validación de celular a 10 dígitos
    const celLimpio = celular.replace(/\D/g, '');
    if (celLimpio.length !== 10) {
      setError('El número celular debe contener exactamente 10 dígitos.');
      return;
    }

    // 3. Validaciones específicas según el tipo de persona (RF-AUT-02)
    if (tipoPersona === 'fisica') {
      const curpUpper = curp.trim().toUpperCase();
      if (!isValidCURP(curpUpper)) {
        setError('El CURP ingresado no cumple con la estructura oficial de 18 caracteres (RF-AUT-02).');
        return;
      }
      if (rfc.trim() && !isValidRFCFisica(rfc.trim().toUpperCase())) {
        setError('El RFC de persona física debe tener estructura válida de 13 caracteres.');
        return;
      }
    } else {
      const rfcMoralUpper = rfcMoral.trim().toUpperCase();
      if (!isValidRFCMoral(rfcMoralUpper)) {
        setError('El RFC de persona moral debe tener exactamente 12 caracteres oficiales (RF-AUT-01).');
        return;
      }
      if (!isValidCURP(repLegalCurp.trim().toUpperCase())) {
        setError('El CURP del representante legal debe ser válido (18 caracteres).');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Simulación de guardado seguro con hash Argon2id / bcrypt en backend
      await new Promise((res) => setTimeout(res, 700));

      setRegistroExitoso(true);
      setTimeout(async () => {
        try {
          await login(correo, password);
        } catch {
          // Fallback desarrollo
        }
        navigate(ROUTES.DASHBOARD);
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrar la cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-7 w-full max-w-[430px] text-gray-900 border border-gray-100/90 max-h-[88vh] overflow-y-auto">
      
      {/* Encabezado */}
      <div className="mb-4">
        <h2 className="text-[22px] font-bold text-gray-900 tracking-tight leading-snug">
          Registro de Contribuyente
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Padrón Catastral Oficial · Coatzacoalcos, Ver.
        </p>
      </div>

      {error && (
        <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg leading-normal">
          {error}
        </div>
      )}

      {registroExitoso && (
        <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Cuenta creada con éxito. Redirigiendo a tu espacio de trabajo...</span>
        </div>
      )}

      {/* Selector de Tipo de Persona (RF-AUT-01) */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg mb-4 text-xs font-semibold">
        <button
          type="button"
          onClick={() => {
            setTipoPersona('fisica');
            setError(null);
          }}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all cursor-pointer ${
            tipoPersona === 'fisica'
              ? 'bg-white text-[#741333] shadow-xs font-bold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Persona Física
        </button>

        <button
          type="button"
          onClick={() => {
            setTipoPersona('moral');
            setError(null);
          }}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all cursor-pointer ${
            tipoPersona === 'moral'
              ? 'bg-white text-[#741333] shadow-xs font-bold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          Persona Moral
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        
        {/* BLOQUE PERSONA FÍSICA */}
        {tipoPersona === 'fisica' ? (
          <>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Nombre(s) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Ej. Roberto"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Primer Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={apellidoPaterno}
                  onChange={(e) => setApellidoPaterno(e.target.value)}
                  placeholder="Hernández"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Segundo Apellido
                </label>
                <input
                  type="text"
                  value={apellidoMaterno}
                  onChange={(e) => setApellidoMaterno(e.target.value)}
                  placeholder="Morales"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  CURP (18 car.) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={18}
                  value={curp}
                  onChange={(e) => setCurp(e.target.value.toUpperCase())}
                  placeholder="HEMR780412HVERRN04"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 font-mono uppercase focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  RFC (Opcional, 13 car.)
                </label>
                <input
                  type="text"
                  maxLength={13}
                  value={rfc}
                  onChange={(e) => setRfc(e.target.value.toUpperCase())}
                  placeholder="HEMR780412XYZ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 font-mono uppercase focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
                />
              </div>
            </div>
          </>
        ) : (
          /* BLOQUE PERSONA MORAL */
          <>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Razón Social <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                placeholder="Inmobiliaria Olmeca S.A. de C.V."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                RFC Persona Moral (12 caracteres) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={12}
                value={rfcMoral}
                onChange={(e) => setRfcMoral(e.target.value.toUpperCase())}
                placeholder="IOL980315ABC"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 font-mono uppercase focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Representante Legal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={repLegalNombre}
                  onChange={(e) => setRepLegalNombre(e.target.value)}
                  placeholder="Nombre completo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  CURP Representante <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={18}
                  value={repLegalCurp}
                  onChange={(e) => setRepLegalCurp(e.target.value.toUpperCase())}
                  placeholder="18 caracteres"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 font-mono uppercase focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
                />
              </div>
            </div>
          </>
        )}

        {/* DATOS DE CONTACTO Y ACCESO */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="nombre@ejemplo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Celular (10 dígitos) <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              maxLength={10}
              value={celular}
              onChange={(e) => setCelular(e.target.value.replace(/\D/g, ''))}
              placeholder="9211234567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 font-mono focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
            />
          </div>
        </div>

        {/* CONTRASEÑA (Mínimo 12 caracteres RF-AUT-01) */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
            Contraseña (Mínimo 12 caracteres) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={12}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 12 caracteres oficiales"
              className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
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

        <div>
          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
            Confirmar contraseña <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              minLength={12}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#741333] focus:ring-1 focus:ring-[#741333]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-900 font-normal select-none"
            >
              {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#741333]" />
            Cifrado obligatorio con Argon2id / bcrypt (RF-AUT-01).
          </p>
        </div>

        {/* Botón Principal: Crear cuenta */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 px-4 bg-[#741333] hover:bg-[#580a22] text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors duration-150 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
        >
          {isLoading ? 'Registrando en padrón...' : 'Completar Registro Catastral'}
        </button>

        {/* Disclaimer */}
        <p className="text-[10px] text-gray-500 text-center leading-tight">
          Al registrarte, declaras bajo protesta de decir verdad conforme a la Ley de Catastro de Veracruz.
        </p>
      </form>

      {/* Sección inferior: ¿Ya tienes una cuenta? */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-center space-y-1.5">
        <p className="text-xs text-gray-600">¿Ya tienes una cuenta?</p>
        <Link
          to={ROUTES.LOGIN}
          className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-xs transition-colors block text-center"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
