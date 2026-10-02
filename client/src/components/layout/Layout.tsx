// ═══════════════════════════════════════════
// ANATHEA — Main Layout Component
// ═══════════════════════════════════════════

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useQuery } from '@tanstack/react-query';

import { getAnatomicalSystems } from '../../services/api';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el slug activo basado en la URL (/sistema/:slug)
  const activeSystem = location.pathname.startsWith('/sistema/') 
    ? location.pathname.split('/')[2] 
    : null;

  const { data: systems = [], isLoading } = useQuery({
    queryKey: ['anatomical-systems'],
    queryFn: getAnatomicalSystems,
  });

  const handleSelectSystem = (slug: string) => {
    if (activeSystem === slug) {
      navigate('/');
    } else {
      navigate(`/sistema/${slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isSidebarOpen={sidebarOpen}
      />

      <Sidebar
        isOpen={sidebarOpen}
        systems={systems}
        activeSystem={activeSystem}
        onSelectSystem={handleSelectSystem}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'ml-72' : 'ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
