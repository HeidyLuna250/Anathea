// ═══════════════════════════════════════════
// ANATHEA — Main Layout Component
// ═══════════════════════════════════════════

import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useQuery } from '@tanstack/react-query';
import { getAnatomicalSystems } from '../../services/api';
import { useAnatomyStore } from '../../store/useAnatomyStore';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado del store global
  const isSidebarOpen = useAnatomyStore((state) => state.isSidebarOpen);
  const toggleSidebar = useAnatomyStore((state) => state.toggleSidebar);
  const setSidebarOpen = useAnatomyStore((state) => state.setSidebarOpen);
  const setActiveSystemSlug = useAnatomyStore((state) => state.setActiveSystemSlug);

  // Obtener el slug activo basado en la URL (/sistema/:slug)
  const activeSystem = location.pathname.startsWith('/sistema/')
    ? location.pathname.split('/')[2]
    : null;

  const { data: systems = [], isLoading } = useQuery({
    queryKey: ['anatomical-systems'],
    queryFn: getAnatomicalSystems,
  });

  const handleSelectSystem = (slug: string) => {
    setActiveSystemSlug(slug);
    if (activeSystem === slug) {
      navigate('/');
    } else {
      navigate(`/sistema/${slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#F8FAFC] overflow-x-hidden selection:bg-[#00D4FF]/30 selection:text-[#00D4FF]">
      {/* Barra de navegación superior fija */}
      <Navbar
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Barra Lateral Anatómica */}
      <Sidebar
        isOpen={isSidebarOpen}
        systems={systems}
        activeSystem={activeSystem}
        onSelectSystem={handleSelectSystem}
        isLoading={isLoading}
      />

      {/* Backdrop overlay para dispositivos móviles cuando el menú está abierto */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 top-14 bg-black/60 backdrop-blur-xs z-30 lg:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}

      {/* Área de Contenido Principal */}
      <main
        className={`pt-14 min-h-[calc(100vh-3.5rem)] transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-72 ml-0' : 'ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
