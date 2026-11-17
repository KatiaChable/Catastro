/* =========================================
   Tipos - Roles del sistema
   ========================================= */

/** Roles del sistema de catastro */
export enum UserRole {
  /** Ciudadano - Persona física */
  CIUDADANO = 'CIU',
  /** Persona moral - Empresas, inmobiliarias, notarías */
  PERSONA_MORAL = 'PMO',
  /** Gestor de casos */
  GESTOR = 'GES',
  /** Autorizador */
  AUTORIZADOR = 'AUT',
  /** Director - Jefe de la Oficina Municipal de Catastro */
  DIRECTOR = 'DIR',
  /** Cajero de Tesorería */
  CAJERO = 'CAJ',
  /** Administrador del sistema */
  ADMIN = 'ADM',
}

/** Tipo de persona */
export type TipoPersona = 'fisica' | 'moral';

/** Estado de la cuenta de usuario */
export type EstadoUsuario =
  | 'pendiente'
  | 'verificada'
  | 'sin_predios'
  | 'con_predios'
  | 'bloqueada';

/** Datos de usuario del sistema */
export interface User {
  id: string;
  correo: string;
  celular: string;
  rol: UserRole;
  tipoPersona: TipoPersona;
  estado: EstadoUsuario;
  persona: Persona;
  createdAt: string;
  lastLogin?: string;
}

/** Datos de persona */
export interface Persona {
  id: string;
  tipoPersona: TipoPersona;
  nombres?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  razonSocial?: string;
  curp?: string;
  rfc?: string;
  representanteLegal?: {
    nombre: string;
    curp: string;
  };
}

/** Datos para login */
export interface LoginCredentials {
  identifier: string; // Correo, CURP o RFC
  password: string;
}

/** Datos de registro - persona física */
export interface RegisterDataFisica {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  rfc?: string;
  correo: string;
  celular: string;
  password: string;
  confirmPassword: string;
}

/** Datos de registro - persona moral */
export interface RegisterDataMoral {
  razonSocial: string;
  rfc: string;
  representanteLegal: string;
  curpRepresentante: string;
  correo: string;
  celular: string;
  password: string;
  confirmPassword: string;
}

/** Respuesta de autenticación */
export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: string;
}
