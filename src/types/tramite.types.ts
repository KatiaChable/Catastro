/* =========================================
   Tipos - Trámites y documentos
   ========================================= */

/** Tipo de trámite */
export type TipoTramite =
  | 'cedula_catastral'
  | 'constancia_no_adeudo'
  | 'alta_predio'
  | 'baja_predio'
  | 'cambio_propietario'
  | 'fusion'
  | 'subdivision'
  | 'asesoria';

/** Estado del trámite */
export type EstadoTramite =
  | 'recibido'
  | 'en_revision'
  | 'observaciones'
  | 'pagado'
  | 'emitido'
  | 'rechazado'
  | 'vencido';

/** Estado del documento */
export type EstadoDocumento =
  | 'solicitado'
  | 'pendiente'
  | 'aprobado_automatico'
  | 'en_revision_manual'
  | 'rechazado'
  | 'vencido';

/** Estado del pago */
export type EstadoPago =
  | 'por_autorizar'
  | 'pendiente'
  | 'pagado'
  | 'rechazado'
  | 'cancelado'
  | 'expirado';

/** Trámite */
export interface Tramite {
  id: string;
  folio: string;
  tipo: TipoTramite;
  estado: EstadoTramite;
  predioId: string;
  claveCatastral: string;
  solicitanteId: string;
  gestorId?: string;
  fechaSolicitud: string;
  fechaLimite: string;
  requiereVisita: boolean;
  fechaVisita?: string;
  documentos: Documento[];
  mensajes: Mensaje[];
  ordenesPago: OrdenPago[];
}

/** Documento del expediente */
export interface Documento {
  id: string;
  tipoDocumento: string;
  nombre: string;
  archivo?: string;
  estado: EstadoDocumento;
  motivoRechazo?: string;
  fechaVigencia?: string;
  datosCapturados?: Record<string, unknown>;
}

/** Mensaje en el chat del trámite */
export interface Mensaje {
  id: string;
  texto: string;
  fechaHora: string;
  emisorId: string;
  emisorNombre: string;
  leido: boolean;
}

/** Orden de pago */
export interface OrdenPago {
  id: string;
  lineaCaptura: string;
  conceptos: ConceptoPago[];
  montoTotal: number;
  fechaLimite: string;
  estado: EstadoPago;
}

/** Concepto dentro de una orden de pago */
export interface ConceptoPago {
  descripcion: string;
  monto: number;
}

/** Cédula catastral */
export interface CedulaCatastral {
  id: string;
  folio: string;
  fechaEmision: string;
  fechaVencimiento: string;
  estado: 'vigente' | 'vencida' | 'sustituida';
  predioId: string;
  datosFormato: Record<string, unknown>; // Campos DGCV-015
}

/** Constancia de no adeudo */
export interface ConstanciaNoAdeudo {
  id: string;
  folio: string;
  fechaEmision: string;
  fechaVencimiento: string;
  estado: 'vigente' | 'vencida' | 'cancelada';
  predioId: string;
  periodosVerificados: string;
}

/** Historial de predial */
export interface HistorialPredial {
  id: string;
  predioId: string;
  ejercicio: number;
  periodo: string;
  importeBase: number;
  recargos: number;
  descuentos: number;
  pagado: number;
  saldo: number;
  fechaLimite: string;
  fechaPago?: string;
  estado: 'por_pagar' | 'pagado' | 'exento';
}
