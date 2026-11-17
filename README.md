# Sistema de Información y Gestión Catastral — Coatzacoalcos, Veracruz

Sistema web integral para el registro, consulta cartográfica, administración de predios, validación automática de expedientes, cálculo de avalúos y recaudación simulada para el Municipio de Coatzacoalcos, Veracruz (Clave Catastral Municipal `040`).

---

## 🏛️ Marco Normativo y Legal
- **Ley de Catastro del Estado de Veracruz**
- **Reglamento de la Ley de Catastro del Estado de Veracruz** (Gaceta Oficial núm. 227, 25 de septiembre de 2006)
- **Formato Oficial de Cédula Catastral:** Modelo estatal DGCV-015
- **Estructura Oficial de la Clave Catastral (22 dígitos):**
  `Zona (2) · Municipio (3) · Localidad (3) · Región (2) · Manzana (3) · Lote (3) · Nivel (2) · Depto (3) · DV (1)`

---

## 👥 Equipo y Distribución de Roles por Rama Git

| # | Rol | Responsabilidad Principal | Rama Asignada |
|---|-----|---------------------------|---------------|
| 1 | **Líder Técnico y Arquitectura** | Diseño del sistema, modelo de datos, API, code review, control Git | `feat/01-lider-tecnico-arquitectura` |
| 2 | **Full Stack** | Autenticación, vinculación de predios, flujo trámite → pago → doc | `feat/02-fullstack-flujos` |
| 3 | **Frontend (Tú)** | Pantallas de cada rol, formularios con validación, historiales y comprobantes | `feat/03-frontend-pantallas-vistas` |
| 4 | **Frontend de Mapas** | MapLibre GL: capas de predios, manzanas, satélite/plano, editor de trazos | `feat/04-frontend-mapas-trazo` |
| 5 | **Backend y GIS** | Spring Boot / FastAPI, PostGIS, validación topológica (traslapes), OTs | `feat/05-backend-gis-servicios` |
| 6 | **Documentos y Validaciones**| Cédula DGCV-015, recibo oficial, constancia con QR, motor de validación | `feat/06-documentos-validaciones` |
| 7 | **QA y DevOps** | Pruebas unitarias/E2E, Docker Compose, CI/CD GitHub Actions, seed data | `feat/07-qa-devops-pruebas` |

---

## 🏗️ Stack Tecnológico

### Frontend
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Estilos:** Tailwind CSS v4
- **Iconografía:** Lucide React & React Icons
- **Enrutamiento:** React Router DOM v7
- **Formularios & Validación:** React Hook Form + Zod
- **Cartografía:** MapLibre GL / Leaflet (EPSG:4326 WGS84 con proyecciones métricas en EPSG:32615 UTM Zona 15N)

### Backend & Base de Datos (Integración)
- **Backend:** Java Spring Boot / Python FastAPI
- **Base de Datos:** PostgreSQL con extensión PostGIS
- **Autenticación:** JWT con cifrado de contraseñas (Argon2id / BCrypt)

---

## 📁 Estructura del Proyecto

```text
Catastro/
├── docs/                     # Documentación de arquitectura y requisitos
├── public/                   # Activos estáticos públicos
├── src/
│   ├── assets/               # Imágenes, fuentes e iconos
│   ├── components/
│   │   ├── common/           # Componentes genéricos reutilizables
│   │   ├── forms/            # Componentes de formulario y validadores
│   │   ├── layout/           # Navbar, Sidebar, MainLayout, AuthLayout
│   │   ├── map/              # Visor y controles cartográficos
│   │   └── ui/               # Botones, Cards, Inputs, Badges, Modales
│   ├── constants/            # Rutas, roles, vigencias y tarifas
│   ├── context/              # Contextos de React (AuthContext)
│   ├── hooks/                # Custom hooks
│   ├── pages/
│   │   ├── admin/            # Vistas de Administrador (usuarios, catálogos, tarifas, bitácora)
│   │   ├── auth/             # Login, Registro (física/moral), Recuperación
│   │   ├── autorizador/      # Aprobación de planos, cotizaciones y altas
│   │   ├── cajero/           # Conciliación de pagos y recibos oficiales
│   │   ├── ciudadano/        # Vistas de contribuyentes
│   │   ├── dashboard/        # Pantalla principal del portal
│   │   ├── director/         # Despacho: controversias, bajas/fusiones, firmas
│   │   ├── documentos/       # Bóveda de cédulas y constancias emitidas
│   │   ├── estadisticas/     # Inteligencia territorial y cobertura de servicios
│   │   ├── gestor/           # Bandeja de trámites y editor de trazo
│   │   ├── mapa/             # Visor cartográfico interactivo
│   │   ├── pagos/            # Pasarela y comprobantes de pago
│   │   ├── predios/          # Mis predios, ficha técnica e historial predial
│   │   └── tramites/         # Checklist de expedientes y solicitud
│   ├── routes/               # Configuración central de rutas (AppRoutes)
│   ├── services/             # Clientes de API Axios y servicios por módulo
│   ├── types/                # Definiciones de TypeScript (Auth, Predios, Trámites)
│   └── utils/                # Formateadores (moneda, fecha, clave catastral, CURP)
└── package.json
```

---

## 🚀 Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
3. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## 🌿 Convención de Ramas y Git Flow
- Rama principal protegida: `main`
- Rama de integración continua: `develop`
- Ramas por funcionalidad: `feat/<numero-rol>-<descripcion-corta>`
