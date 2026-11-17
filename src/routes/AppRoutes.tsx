import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { MainLayout, AuthLayout } from '@/components/layout';

// Páginas de Autenticación
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';

// Dashboard Ciudadano oficial
import CiudadanoDashboardPage from '@/pages/ciudadano/CiudadanoDashboardPage';

// Páginas pendientes (WIP)
import WipPage from '@/pages/common/WipPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* 1. Rutas de Autenticación */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      {/* 2. Dashboard Ciudadano (con barra lateral, consulta oficial y sin mapas) */}
      <Route path={ROUTES.DASHBOARD} element={<CiudadanoDashboardPage />} />
      <Route path="/ciudadano" element={<CiudadanoDashboardPage />} />

      {/* 3. Rutas del Sistema en Proceso (Muestran solo el encabezado oficial, WIP y footer sin chatbot) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.MAPA} element={<WipPage />} />
        
        {/* Predios */}
        <Route path={ROUTES.PREDIOS} element={<WipPage />} />
        <Route path={ROUTES.PREDIO_DETALLE} element={<WipPage />} />
        <Route path={ROUTES.PREDIO_PREDIAL} element={<WipPage />} />

        {/* Trámites */}
        <Route path={ROUTES.TRAMITES} element={<WipPage />} />
        <Route path={ROUTES.TRAMITE_NUEVO} element={<WipPage />} />
        <Route path={ROUTES.TRAMITE_DETALLE} element={<WipPage />} />

        {/* Pagos y Documentos */}
        <Route path={ROUTES.PAGOS} element={<WipPage />} />
        <Route path={ROUTES.DOCUMENTOS} element={<WipPage />} />

        {/* Roles Internos */}
        <Route path={ROUTES.GESTOR_SOLICITUDES} element={<WipPage />} />
        <Route path={ROUTES.GESTOR_TRAZO} element={<WipPage />} />
        <Route path={ROUTES.AUTORIZADOR_PENDIENTES} element={<WipPage />} />
        <Route path={ROUTES.DIRECTOR_PANEL} element={<WipPage />} />
        <Route path={ROUTES.CAJERO_CONCILIACION} element={<WipPage />} />
        <Route path={ROUTES.ESTADISTICAS} element={<WipPage />} />

        {/* Administración */}
        <Route path={ROUTES.ADMIN_USUARIOS} element={<WipPage />} />
        <Route path={ROUTES.ADMIN_CATALOGOS} element={<WipPage />} />
        <Route path={ROUTES.ADMIN_TARIFAS} element={<WipPage />} />
        <Route path={ROUTES.ADMIN_BITACORA} element={<WipPage />} />

        {/* 404 */}
        <Route path="*" element={<WipPage />} />
      </Route>
    </Routes>
  );
}
