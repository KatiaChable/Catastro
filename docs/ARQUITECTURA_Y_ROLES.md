# Arquitectura y Matriz de Roles — Catastro Municipal de Coatzacoalcos

## 1. Alcance y Contexto Municipal
- **Municipio:** Coatzacoalcos, Veracruz (Clave `040`).
- **Sistema Geodésico:** WGS84 (`EPSG:4326`) para almacenamiento; distancias y superficies en UTM Zona 15N (`EPSG:32615`).
- **Límite Municipal:** Toda coordenada y polígono debe caer dentro del polígono oficial del municipio.
- **Clave Catastral (22 dígitos):**
  - Zona (2): Catálogo 01-15 SEFIPLAN.
  - Municipio (3): 040 (Coatzacoalcos).
  - Localidad (3): Catálogo de localidades estatal.
  - Región (2): Consecutivo progresivo (~150 manzanas).
  - Manzana (3): Número de manzana dentro de la región.
  - Lote (3): Numeración en espiral horaria.
  - Nivel (2): Condominios (00 si es predio único).
  - Departamento (3): Condominios (000 en predio único).
  - Dígito Verificador (1): Algoritmo ponderado Módulo 10.

---

## 2. Matriz de Permisos por Rol

| Capacidad / Módulo | CIU (Física) | PMO (Moral) | GES (Gestor) | AUT (Autorizador) | DIR (Director) | CAJ (Cajero) | ADM (Admin) |
|---|---|---|---|---|---|---|---|
| Ver mapa (sólo sus predios resaltados) | ✔ | ✔ | — | — | — | — | — |
| Ver todos los predios y ficha (solo lectura) | — | — | ✔ | ✔ | ✔ | ✔ | ✔ |
| Solicitar alta, baja, cédula y no adeudo | ✔ | ✔ | — | — | — | — | — |
| Pagar predial y derechos | ✔ | ✔ | — | — | — | — | — |
| Agregar predio para solo seguimiento | — | ✔ | — | — | — | — | — |
| Llevar solicitudes (docs, chat, visitas) | — | — | ✔ | — | — | — | — |
| Proponer cobros por concepto | — | — | ✔ | — | — | — | — |
| Trazar planos y zonas (borrador) | — | — | ✔ | — | — | — | — |
| Autorizar planos, precios y altas | — | — | — | ✔ | ✔ | — | — |
| Autorizar bajas, fusiones y subdivisiones | — | — | — | — | ✔ | — | — |
| Firmar cédulas y aprobar valores de suelo | — | — | — | — | ✔ | — | — |
| Conciliar o cancelar pagos con motivo | — | — | — | — | — | ✔ | — |
| Estadísticas territoriales y de servicios | — | — | — | ✔ | ✔ | — | — |
| Usuarios, catálogos, tarifas y bitácora | — | — | — | — | — | — | ✔ |

### Regla de Oro (Separación de Funciones):
- Quien traza o propone cobros (Gestor) **no autoriza**.
- El Administrador **no autoriza trámites catastrales**, solo configura usuarios, tarifas y catálogos.

---

## 3. Trámites Clave y Plazos
1. **Cédula Catastral (RF-CED):**
   - Vigencia: 90 días naturales (Art. 24).
   - Formato DGCV-015 estricto en orden de campos.
   - Tarifa fija: $969.98 MXN. Plazo máximo: 15 días hábiles.
2. **Constancia de No Adeudo (RF-NAD):**
   - Vigencia: 60 días naturales.
   - Condición dura: Cualquier adeudo municipal bloquea la emisión y no se cobra.
   - Tarifa fija: $200.00 MXN. Plazo: 7 días hábiles.
3. **Altas y Modificaciones (RF-EDI / RF-BAJ):**
   - No tienen costo inicial.
   - Requieren Orden de Trabajo (OT) previa.
   - Traslape bloquea automáticamente el guardado.
