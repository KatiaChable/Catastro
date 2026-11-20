/* =========================================
   Esquemas Zod de recuperación y verificación de cuenta
   ========================================= */

import { z } from 'zod';
import { isValidCURP, isValidRFCFisica, isValidRFCMoral } from '@/utils';

const esCorreo = (valor: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

/** Correo, CURP o RFC (igual que en el login) */
export const identificadorSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Escribe tu correo, CURP o RFC.')
    .max(254, 'El dato es demasiado largo.')
    .refine(
      (v) => esCorreo(v) || isValidCURP(v) || isValidRFCFisica(v) || isValidRFCMoral(v),
      'Escribe un correo, CURP o RFC válido.'
    ),
});
export type IdentificadorForm = z.infer<typeof identificadorSchema>;

/** Nueva contraseña: mínimo 12 caracteres (RF-AUT-01), igual que en el registro y el backend */
export const nuevaContrasenaSchema = z
  .object({
    password: z
      .string()
      .min(12, 'La contraseña debe tener al menos 12 caracteres (RF-AUT-01).')
      .max(128, 'La contraseña no puede pasar de 128 caracteres.'),
    confirmPassword: z.string().min(1, 'Repite tu contraseña.'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden.',
  });
export type NuevaContrasenaForm = z.infer<typeof nuevaContrasenaSchema>;
