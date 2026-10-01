// ═══════════════════════════════════════════
// ANATHEA — Main Layout Component
// ═══════════════════════════════════════════

import { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useQuery } from '@tanstack/react-query';

interface AnatomicalSystem {
  id: string;
  name: string;
  nameEs: string;
  slug: string;
  color: string;
  icon: string;
  sortOrder: number;
}

async function fetchSystems(): Promise<AnatomicalSystem[]> {
  const res = await fetch('/api/anatomy/systems');
  if (!res.ok) throw new Error('Error al cargar los sistemas');
  return res.json();
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  const { data: systems = [], isLoading } = useQuery({
    queryKey: ['anatomical-systems'],
    queryFn: fetchSystems,
  });

  const handleSelectSystem = (slug: string) => {
    setActiveSystem(slug === activeSystem ? null : slug);
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
