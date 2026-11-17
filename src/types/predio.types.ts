/* =========================================
   Tipos - Predios
   ========================================= */

import type { Geometry } from 'geojson';

/** Tipo de predio */
export type TipoPredio = 'urbano' | 'suburbano' | 'rural';

/** Uso o destino del predio */
export type UsoPredio = 'habitacional' | 'comercial' | 'industrial' | 'indefinido';

/** Estado físico del predio (urbanos y suburbanos) */
export type EstadoFisico = 'baldio' | 'construido' | 'en_proceso' | 'precario';

/** Calidad del suelo (rurales) */
export type TipoSuelo = 'temporal' | 'riego' | 'humedad' | 'arido' | 'pantanoso';

/** Tipo de registro */
export type TipoRegistro = 'privado' | 'dominio_publico_municipal' | 'ejido' | 'institucion';

/** Estado del predio */
export type EstadoPredio = 'activo' | 'en_tramite' | 'en_controversia' | 'baja';

/** Tipo de vínculo propietario-predio */
export type TipoVinculo = 'propietario' | 'copropietario' | 'poseedor' | 'seguimiento';

/** Clave catastral de 22 dígitos */
export interface ClaveCatastral {
  zona: string;         // 2 dígitos (01-15)
  municipio: string;    // 3 dígitos (040 = Coatzacoalcos)
  localidad: string;    // 3 dígitos
  region: string;       // 2 dígitos
  manzana: string;      // 3 dígitos
  lote: string;         // 3 dígitos
  nivel: string;        // 2 dígitos (00 si no es condominio)
  departamento: string; // 3 dígitos (000 si no es condominio)
  digitoVerificador: string; // 1 dígito
}

/** Datos del predio */
export interface Predio {
  id: string;
  claveCatastral: string;
  claveCatastralDesglosada: ClaveCatastral;
  tipoPredio: TipoPredio;
  uso: UsoPredio;
  estadoFisico: EstadoFisico;
  tipoSuelo?: TipoSuelo;
  superficieM2: number;
  tipoRegistro: TipoRegistro;
  estado: EstadoPredio;
  fechaAlta: string;
  valorCatastral?: number;
  valorTerreno?: number;
  valorConstrucciones?: number;
  geometria?: Geometry;
  ubicacion: UbicacionPredio;
  construcciones: Construccion[];
  propietarios: VinculoPropietario[];
}

/** Ubicación del predio */
export interface UbicacionPredio {
  calle: string;
  numeroPostal: string;
  colonia: string;
  codigoPostal?: string;
  localidad: string;
  municipio: string;
}

/** Construcción en un predio */
export interface Construccion {
  id: string;
  tipo: string;        // Tipología del Reglamento Art. 39
  estadoConservacion: string; // E
  terminacionObra: string;    // T
  antiguedadAnio: number;     // A (año de construcción)
  areaM2: number;             // ÁREA
}

/** Vínculo propietario-predio */
export interface VinculoPropietario {
  id: string;
  personaId: string;
  nombreCompleto: string;
  tipoVinculo: TipoVinculo;
  porcentaje?: number;
  fechaInicio: string;
  fechaFin?: string;
  estado: 'activo' | 'inactivo';
}

/** Datos para la ficha de predio al hacer click en el mapa */
export interface FichaPredio {
  claveCatastral: string;
  propietario: string;
  ubicacion: string;
  superficie: number;
  tipoPredio: TipoPredio;
  uso: UsoPredio;
  estadoFisico: EstadoFisico;
  valorCatastral: number;
  estatusPredial: 'al_corriente' | 'con_adeudo';
}
