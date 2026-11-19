# Sistema de Información y Gestión Catastral — Coatzacoalcos, Veracruz

Sistema web integral para el registro, consulta cartográfica, administración de predios, validación automática de expedientes, cálculo de avalúos y recaudación del impuesto predial para el Municipio de Coatzacoalcos, Veracruz (Clave Catastral Municipal `040`).

---

## 👥 Integrantes y Roles

* **Backend:** Miguel, Diony, Cesar
* **Frontend:** Jessica, Katia
* **Mapeo:** Francisco
* **Full Stack:** Evelyn

### Detalle de Roles y Ramas de Trabajo

| Área | Integrante | Responsabilidad Principal | Rama Git |
|---|---|---|---|
| **Backend** | **Miguel** | Arquitectura de servicios, lógica de negocio y APIs REST | `Miguel` |
| **Backend** | **Diony** | Servicios de autenticación, seguridad y permisos por rol | `Diony` |
| **Backend** | **Cesar** | Gestión de datos catastrales, trámites y conexión a base de datos | `Cesar` |
| **Frontend** | **Jessica** | Pantallas de roles, validaciones de formularios y vistas de consulta | `Jessica` |
| **Frontend** | **Katia (Kat)** | Diseño y maquetación UI/UX, vistas de usuario, componentes y flujos | `Kat` |
| **Mapeo** | **Francisco (Paco)** | Capas cartográficas, visores geoespaciales y delimitación de predios | `Paco` |
| **Full Stack** | **Evelyn (Eve)** | Integración frontend-backend, flujos completos y soporte general | `Eve` |

---

## 🌿 Convención y Flujo de Ramas (Git Flow)

* **`main`**: Rama principal y código en producción.
* **`developer`**: Rama de integración y desarrollo continuo del equipo.
* **Ramas individuales:** Cada integrante trabaja sus avances en su rama respectiva (`Kat`, `Jessica`, `Miguel`, `Diony`, `Cesar`, `Paco`, `Eve`) y se integran a `developer` mediante Pull Requests.

---

## 🏛️ Marco Normativo y Legal
* **Ley de Catastro del Estado de Veracruz**
* **Reglamento de la Ley de Catastro del Estado de Veracruz** (Gaceta Oficial núm. 227)
* **Formato Oficial de Cédula Catastral:** Modelo estatal DGCV-015
* **Clave Catastral Oficial (22 dígitos):**
  `Zona (2) · Municipio (3) · Localidad (3) · Región (2) · Manzana (3) · Lote (3) · Nivel (2) · Depto (3) · DV (1)`

---

## 🏗️ Stack Tecnológico

### Frontend
* **Framework:** React 19 + TypeScript
* **Bundler & Tooling:** Vite
* **Estilos:** Tailwind CSS v4
* **Tipografía Oficial:** Plus Jakarta Sans
* **Iconografía:** Lucide React & React Icons
* **Enrutamiento:** React Router DOM v7
* **Validación:** React Hook Form + Zod

### Backend y Base de Datos (Integración)
* **Backend:** Spring Boot (Java) / FastAPI (Python)
* **Base de Datos:** PostgreSQL con extensión espacial **PostGIS**
* **Sistema de Coordenadas:** Almacenamiento en WGS84 (`EPSG:4326`) y proyecciones en UTM Zona 15N (`EPSG:32615`)

---

## 🚀 Inicio Rápido en Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/KatiaChable/Catastro.git
   cd Catastro
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
