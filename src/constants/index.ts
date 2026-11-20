/* =========================================
   Constantes del Sistema de Catastro
   ========================================= */

import { UserRole } from '@/types';

/** Rutas de la aplicación */
export const ROUTES = {
  // Públicas
  LOGIN: '/login',
  REGISTER: '/registro',
  FORGOT_PASSWORD: '/recuperar-contrasena',
  RESET_PASSWORD: '/restablecer-contrasena',
  VERIFY_EMAIL: '/verificar-correo',
  VERIFY_PHONE: '/verificar-celular',
  VERIFICADOR_PUBLICO: '/verificar/:folio',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Mapa
  MAPA: '/mapa',

  // Predios
  PREDIOS: '/predios',
  PREDIO_DETALLE: '/predios/:id',
  PREDIO_PREDIAL: '/predios/:id/predial',

  // Trámites
  TRAMITES: '/tramites',
  TRAMITE_NUEVO: '/tramites/nuevo',
  TRAMITE_DETALLE: '/tramites/:id',

  // Pagos
  PAGOS: '/pagos',
  PAGO_ORDEN: '/pagos/:id',

  // Documentos
  DOCUMENTOS: '/documentos',

  // Gestor
  GESTOR_SOLICITUDES: '/gestor/solicitudes',
  GESTOR_TRAZO: '/gestor/trazo',

  // Autorizador
  AUTORIZADOR_PENDIENTES: '/autorizador/pendientes',

  // Director
  DIRECTOR_PANEL: '/director/panel',

  // Cajero
  CAJERO_CONCILIACION: '/cajero/conciliacion',

  // Administrador
  ADMIN_USUARIOS: '/admin/usuarios',
  ADMIN_CATALOGOS: '/admin/catalogos',
  ADMIN_TARIFAS: '/admin/tarifas',
  ADMIN_BITACORA: '/admin/bitacora',

  // Estadísticas
  ESTADISTICAS: '/estadisticas',
} as const;

/** Configuración de roles y sus rutas de inicio */
export const ROLE_CONFIG: Record<UserRole, {
  label: string;
  labelCorto: string;
  rutaInicio: string;
  color: string;
}> = {
  [UserRole.CIUDADANO]: {
    label: 'Ciudadano',
    labelCorto: 'CIU',
    rutaInicio: ROUTES.MAPA,
    color: 'blue',
  },
  [UserRole.PERSONA_MORAL]: {
    label: 'Persona Moral',
    labelCorto: 'PMO',
    rutaInicio: ROUTES.MAPA,
    color: 'indigo',
  },
  [UserRole.GESTOR]: {
    label: 'Gestor de Casos',
    labelCorto: 'GES',
    rutaInicio: ROUTES.GESTOR_SOLICITUDES,
    color: 'amber',
  },
  [UserRole.AUTORIZADOR]: {
    label: 'Autorizador',
    labelCorto: 'AUT',
    rutaInicio: ROUTES.AUTORIZADOR_PENDIENTES,
    color: 'purple',
  },
  [UserRole.DIRECTOR]: {
    label: 'Director de Catastro',
    labelCorto: 'DIR',
    rutaInicio: ROUTES.DIRECTOR_PANEL,
    color: 'rose',
  },
  [UserRole.CAJERO]: {
    label: 'Cajero de Tesorería',
    labelCorto: 'CAJ',
    rutaInicio: ROUTES.CAJERO_CONCILIACION,
    color: 'green',
  },
  [UserRole.ADMIN]: {
    label: 'Administrador',
    labelCorto: 'ADM',
    rutaInicio: ROUTES.ADMIN_USUARIOS,
    color: 'slate',
  },
};

/** Vigencias en días */
export const VIGENCIAS = {
  CEDULA_CATASTRAL: 90,
  CONSTANCIA_NO_ADEUDO: 60,
  ENLACE_VERIFICACION_CORREO: 1, // 24 horas
  CODIGO_CELULAR_MINUTOS: 5,
  ENLACE_RECUPERACION_MINUTOS: 30,
  SESION_PERSONAL_MINUTOS: 15,
  SESION_CIUDADANO_MINUTOS: 30,
} as const;

/** Tarifas de referencia */
export const TARIFAS_REFERENCIA = {
  CONSTANCIA_CATASTRAL: 969.98,
  CONSTANCIA_NO_ADEUDO: 200.0,
  PLANO_MINIMO: 500.0,
  PLANO_POR_100M2_EXTRA: 50.0,
  PLANO_LIMITE_BASE_M2: 1000,
} as const;

/** Municipio */
export const MUNICIPIO = {
  nombre: 'Coatzacoalcos',
  estado: 'Veracruz',
  clave: '040',
  epsgAlmacenamiento: 4326, // WGS84
  epsgCalculo: 32615,       // UTM zona 15N
} as const;

/** Límite de intentos de login */
export const SEGURIDAD = {
  MAX_INTENTOS_LOGIN: 5,
  MIN_PASSWORD_LENGTH: 12,
  MAX_INTENTOS_CODIGO: 5,
} as const;
