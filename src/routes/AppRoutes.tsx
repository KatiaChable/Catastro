import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { MainLayout, AuthLayout } from '@/components/layout';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';

// Main Pages
import DashboardPage from '@/pages/dashboard/DashboardPage';
import MapaPage from '@/pages/mapa/MapaPage';
import PrediosPage from '@/pages/predios/PrediosPage';
import PredioDetallePage from '@/pages/predios/PredioDetallePage';
import PredialPage from '@/pages/predios/PredialPage';
import TramitesPage from '@/pages/tramites/TramitesPage';
import TramiteNuevoPage from '@/pages/tramites/TramiteNuevoPage';
import TramiteDetallePage from '@/pages/tramites/TramiteDetallePage';
import PagosPage from '@/pages/pagos/PagosPage';
import DocumentosPage from '@/pages/documentos/DocumentosPage';

// Internal Roles
import GestorSolicitudesPage from '@/pages/gestor/GestorSolicitudesPage';
import GestorTrazoPage from '@/pages/gestor/GestorTrazoPage';
import AutorizadorPendientesPage from '@/pages/autorizador/AutorizadorPendientesPage';
import DirectorPanelPage from '@/pages/director/DirectorPanelPage';
import CajeroConciliacionPage from '@/pages/cajero/CajeroConciliacionPage';
import EstadisticasPage from '@/pages/estadisticas/EstadisticasPage';

// Admin
import AdminUsuariosPage from '@/pages/admin/AdminUsuariosPage';
import AdminCatalogosPage from '@/pages/admin/AdminCatalogosPage';
import AdminTarifasPage from '@/pages/admin/AdminTarifasPage';
import AdminBitacoraPage from '@/pages/admin/AdminBitacoraPage';

// Error 404
import NotFoundPage from '@/pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rutas de Autenticación */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      {/* Rutas del Sistema */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.MAPA} element={<MapaPage />} />
        
        {/* Predios */}
        <Route path={ROUTES.PREDIOS} element={<PrediosPage />} />
        <Route path={ROUTES.PREDIO_DETALLE} element={<PredioDetallePage />} />
        <Route path={ROUTES.PREDIO_PREDIAL} element={<PredialPage />} />

        {/* Trámites */}
        <Route path={ROUTES.TRAMITES} element={<TramitesPage />} />
        <Route path={ROUTES.TRAMITE_NUEVO} element={<TramiteNuevoPage />} />
        <Route path={ROUTES.TRAMITE_DETALLE} element={<TramiteDetallePage />} />

        {/* Pagos y Documentos */}
        <Route path={ROUTES.PAGOS} element={<PagosPage />} />
        <Route path={ROUTES.DOCUMENTOS} element={<DocumentosPage />} />

        {/* Roles Internos */}
        <Route path={ROUTES.GESTOR_SOLICITUDES} element={<GestorSolicitudesPage />} />
        <Route path={ROUTES.GESTOR_TRAZO} element={<GestorTrazoPage />} />
        <Route path={ROUTES.AUTORIZADOR_PENDIENTES} element={<AutorizadorPendientesPage />} />
        <Route path={ROUTES.DIRECTOR_PANEL} element={<DirectorPanelPage />} />
        <Route path={ROUTES.CAJERO_CONCILIACION} element={<CajeroConciliacionPage />} />
        <Route path={ROUTES.ESTADISTICAS} element={<EstadisticasPage />} />

        {/* Administración */}
        <Route path={ROUTES.ADMIN_USUARIOS} element={<AdminUsuariosPage />} />
        <Route path={ROUTES.ADMIN_CATALOGOS} element={<AdminCatalogosPage />} />
        <Route path={ROUTES.ADMIN_TARIFAS} element={<AdminTarifasPage />} />
        <Route path={ROUTES.ADMIN_BITACORA} element={<AdminBitacoraPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
