/* =========================================
   Servicio de Autenticación
   ========================================= */

import type {
  AuthResponse,
  LoginCredentials,
  RegisterDataFisica,
  RegisterDataMoral,
  User,
} from '@/types';
import apiClient from './api';

const AUTH_PREFIX = '/auth';

export const authService = {
  /** Iniciar sesión */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      `${AUTH_PREFIX}/login`,
      credentials
    );
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('refresh_token', data.refreshToken);
    return data;
  },

  /** Registro de persona física */
  async registerFisica(datos: RegisterDataFisica): Promise<{ message: string }> {
    const { data } = await apiClient.post(`${AUTH_PREFIX}/registro/fisica`, datos);
    return data;
  },

  /** Registro de persona moral */
  async registerMoral(datos: RegisterDataMoral): Promise<{ message: string }> {
    const { data } = await apiClient.post(`${AUTH_PREFIX}/registro/moral`, datos);
    return data;
  },

  /** Verificar correo electrónico */
  async verificarCorreo(token: string): Promise<{ message: string }> {
    const { data } = await apiClient.post(`${AUTH_PREFIX}/verificar-correo`, { token });
    return data;
  },

  /** Verificar celular con código */
  async verificarCelular(codigo: string): Promise<{ message: string }> {
    const { data } = await apiClient.post(`${AUTH_PREFIX}/verificar-celular`, { codigo });
    return data;
  },

  /** Solicitar recuperación de contraseña */
  async recuperarPassword(identifier: string): Promise<{ message: string }> {
    const { data } = await apiClient.post(`${AUTH_PREFIX}/recuperar-password`, {
      identifier,
    });
    return data;
  },

  /** Cambiar contraseña con el token del enlace del correo (vence en 30 min) */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const { data } = await apiClient.post(`${AUTH_PREFIX}/reset-password`, {
      token,
      newPassword,
    });
    return data;
  },

  /** Reenviar el enlace de verificación de correo (correo, CURP o RFC) */
  async reenviarVerificacion(identifier: string): Promise<{ message: string }> {
    const { data } = await apiClient.post(`${AUTH_PREFIX}/verificar-correo/reenviar`, {
      identifier,
    });
    return data;
  },

  /** Obtener datos del usuario actual */
  async me(): Promise<User> {
    const { data } = await apiClient.get<User>(`${AUTH_PREFIX}/me`);
    return data;
  },

  /** Cerrar sesión */
  async logout(): Promise<void> {
    try {
      await apiClient.post(`${AUTH_PREFIX}/logout`);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    }
  },

  /** Verificar si hay sesión activa */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },
};
