import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge de clases Tailwind con soporte para colisiones */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatear moneda MXN */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Formatear fecha larga */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

/** Formatear fecha corta */
export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}

/** Formatear clave catastral de Veracruz (22 dígitos): 
 *  Zona(2) - Mpio(3) - Loc(3) - Reg(2) - Manz(3) - Lote(3) - Nivel(2) - Depto(3) - DV(1)
 */
export function formatClaveCatastral(clave: string): string {
  const digits = clave.replace(/\D/g, '');
  if (digits.length !== 22) return clave;
  return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 13)}-${digits.slice(13, 16)}-${digits.slice(16, 18)}-${digits.slice(18, 21)}-${digits.slice(21)}`;
}

/** Validar CURP formato estándar mexicano */
export function isValidCURP(curp: string): boolean {
  const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/;
  return regex.test(curp.trim().toUpperCase());
}

/** Validar RFC persona física (13 posiciones) */
export function isValidRFCFisica(rfc: string): boolean {
  const regex = /^[A-ZÑ&]{4}\d{6}[A-Z\d]{3}$/;
  return regex.test(rfc.trim().toUpperCase());
}

/** Validar RFC persona moral (12 posiciones) */
export function isValidRFCMoral(rfc: string): boolean {
  const regex = /^[A-ZÑ&]{3}\d{6}[A-Z\d]{3}$/;
  return regex.test(rfc.trim().toUpperCase());
}

/** Truncar texto */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
}
