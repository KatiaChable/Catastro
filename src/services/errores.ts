/* =========================================
   Lectura de errores de la API (ProblemDetail)
   ========================================= */

import { isAxiosError } from 'axios';

/** Error del backend: mensaje general y errores por campo del formulario */
export interface ErrorApi {
  mensaje: string;
  campos: Record<string, string>;
}

/** Convierte cualquier error de Axios en un mensaje que se puede mostrar al usuario */
export function leerErrorApi(error: unknown): ErrorApi {
  if (isAxiosError(error)) {
    if (!error.response) {
      return { mensaje: 'No hay conexión con el servidor. Intenta de nuevo.', campos: {} };
    }
    const data = error.response.data as { detail?: string; campos?: Record<string, string> } | undefined;
    return {
      mensaje: data?.detail ?? 'Ocurrió un error. Intenta de nuevo.',
      campos: data?.campos ?? {},
    };
  }
  return { mensaje: 'Ocurrió un error inesperado.', campos: {} };
}
