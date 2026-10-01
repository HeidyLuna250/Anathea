// ═══════════════════════════════════════════
// ANATHEA — Navbar Component
// ═══════════════════════════════════════════

import { Brain, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 gap-4">
      {/* Menu Toggle */}
      <button
        id="sidebar-toggle"
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
        aria-label={isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
          <Brain size={20} className="text-white" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-base font-bold tracking-wide bg-gradient-to-r from-primary-300 to-accent-400 bg-clip-text text-transparent">
            ANATHEA
          </h1>
          <p className="text-[10px] text-surface-200/60 -mt-0.5 tracking-widest uppercase">
            Atlas Anatómico 3D
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-200/40 group-focus-within:text-primary-400 transition-colors"
          />
          <input
            id="global-search"
            type="text"
            placeholder="Buscar estructura, órgano, sistema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-white/5 border border-white/8 text-sm text-surface-100 placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-surface-200/40 hidden md:block">v1.0</span>
      </div>
    </header>
  );
}
