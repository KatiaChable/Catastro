/* =========================================
   Componente: Sidebar de navegación
   ========================================= */

import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  Map,
  Settings,
  Users,
  Building2,
  CheckSquare,
  Landmark,
  Receipt,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '@/hooks';
import { UserRole } from '@/types';
import { ROUTES } from '@/constants';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    label: 'Inicio',
    to: ROUTES.DASHBOARD,
    icon: <Home className="w-5 h-5" />,
    roles: Object.values(UserRole),
  },
  {
    label: 'Mapa',
    to: ROUTES.MAPA,
    icon: <Map className="w-5 h-5" />,
    roles: Object.values(UserRole),
  },
  {
    label: 'Mis Predios',
    to: ROUTES.PREDIOS,
    icon: <Building2 className="w-5 h-5" />,
    roles: [UserRole.CIUDADANO, UserRole.PERSONA_MORAL],
  },
  {
    label: 'Trámites',
    to: ROUTES.TRAMITES,
    icon: <ClipboardList className="w-5 h-5" />,
    roles: [UserRole.CIUDADANO, UserRole.PERSONA_MORAL],
  },
  {
    label: 'Pagos',
    to: ROUTES.PAGOS,
    icon: <CreditCard className="w-5 h-5" />,
    roles: [UserRole.CIUDADANO, UserRole.PERSONA_MORAL],
  },
  {
    label: 'Documentos',
    to: ROUTES.DOCUMENTOS,
    icon: <FileText className="w-5 h-5" />,
    roles: [UserRole.CIUDADANO, UserRole.PERSONA_MORAL],
  },
  // Gestor
  {
    label: 'Solicitudes',
    to: ROUTES.GESTOR_SOLICITUDES,
    icon: <ClipboardList className="w-5 h-5" />,
    roles: [UserRole.GESTOR],
  },
  {
    label: 'Editor de Trazo',
    to: ROUTES.GESTOR_TRAZO,
    icon: <Map className="w-5 h-5" />,
    roles: [UserRole.GESTOR],
  },
  // Autorizador
  {
    label: 'Pendientes',
    to: ROUTES.AUTORIZADOR_PENDIENTES,
    icon: <CheckSquare className="w-5 h-5" />,
    roles: [UserRole.AUTORIZADOR],
  },
  // Director
  {
    label: 'Panel Director',
    to: ROUTES.DIRECTOR_PANEL,
    icon: <Landmark className="w-5 h-5" />,
    roles: [UserRole.DIRECTOR],
  },
  // Cajero
  {
    label: 'Conciliación',
    to: ROUTES.CAJERO_CONCILIACION,
    icon: <Receipt className="w-5 h-5" />,
    roles: [UserRole.CAJERO],
  },
  // Estadísticas
  {
    label: 'Estadísticas',
    to: ROUTES.ESTADISTICAS,
    icon: <BarChart3 className="w-5 h-5" />,
    roles: [UserRole.AUTORIZADOR, UserRole.DIRECTOR],
  },
  // Admin
  {
    label: 'Usuarios',
    to: ROUTES.ADMIN_USUARIOS,
    icon: <Users className="w-5 h-5" />,
    roles: [UserRole.ADMIN],
  },
  {
    label: 'Catálogos',
    to: ROUTES.ADMIN_CATALOGOS,
    icon: <BookOpen className="w-5 h-5" />,
    roles: [UserRole.ADMIN],
  },
  {
    label: 'Tarifas',
    to: ROUTES.ADMIN_TARIFAS,
    icon: <Settings className="w-5 h-5" />,
    roles: [UserRole.ADMIN],
  },
  {
    label: 'Bitácora',
    to: ROUTES.ADMIN_BITACORA,
    icon: <FileText className="w-5 h-5" />,
    roles: [UserRole.ADMIN],
  },
];

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const filteredItems = navItems.filter((item) =>
    item.roles.includes(user.rol)
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] hidden lg:block">
      <nav className="p-4 space-y-1">
        {filteredItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
