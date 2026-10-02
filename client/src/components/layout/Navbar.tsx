// ═══════════════════════════════════════════
// ANATHEA — Navbar Component
// Barra de navegación médica compacta de alta precisión
// ═══════════════════════════════════════════

import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Bookmark,
  History,
  User,
  Activity,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { Tooltip } from '../ui/Tooltip';
import { Badge } from '../ui/Badge';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado del store
  const activeSystemSlug = useAnatomyStore((state) => state.activeSystemSlug);
  const favorites = useAnatomyStore((state) => state.favorites);
  const history = useAnatomyStore((state) => state.history);
  const setSelectedPart = useAnatomyStore((state) => state.setSelectedPart);

  // Menús desplegables contextuales
  const [activeDropdown, setActiveDropdown] = useState<'favorites' | 'history' | 'profile' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar desplegables al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAnatomyActive = location.pathname.startsWith('/sistema');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0A1628]/85 backdrop-blur-md border-b border-white/8 select-none">
      <div className="h-full px-4 flex items-center justify-between gap-4 max-w-[1920px] mx-auto">
        
        {/* Lado Izquierdo: Botón Menú + Marca ANATHEA */}
        <div className="flex items-center gap-3">
          <button
            id="sidebar-toggle-btn"
            onClick={onToggleSidebar}
            className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
              isSidebarOpen
                ? 'bg-white/5 text-[#00D4FF] hover:bg-white/10'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
            }`}
            aria-label={isSidebarOpen ? 'Ocultar navegación anatómica' : 'Mostrar navegación anatómica'}
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 cursor-pointer group py-1"
          >
            {/* Isotipo Anatómico estilizado */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#0A1628] p-[1px] shadow-[0_0_15px_rgba(0,212,255,0.25)] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.45)] transition-all">
              <div className="w-full h-full bg-[#0A1628] rounded-[7px] flex items-center justify-center">
                <span className="font-bold text-[#00D4FF] text-xs font-mono tracking-tighter">AN</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-wider text-[#F8FAFC] group-hover:text-[#00D4FF] transition-colors">
                  ANATHEA
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/25">
                  Atlas 3D
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-[#64748B] -mt-0.5 tracking-wider uppercase">
                Anatomía Humana Médica
              </p>
            </div>
          </div>
        </div>

        {/* Centro: Enlaces Principales de Navegación */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0F1E36]/60 p-1 rounded-xl border border-white/5">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#162846] text-[#00D4FF] shadow-sm font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
              }`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to={`/sistema/${activeSystemSlug || 'esqueletico'}`}
            className={() =>
              `px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                isAnatomyActive
                  ? 'bg-[#162846] text-[#00D4FF] shadow-sm font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
              }`
            }
          >
            Anatomía
          </NavLink>

          {/* Botón Buscar en Navbar */}
          <button
            onClick={() => {
              if (!isAnatomyActive) navigate(`/sistema/${activeSystemSlug || 'esqueletico'}`);
              const searchInput = document.getElementById('anatomy-search-input');
              if (searchInput) searchInput.focus();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Search size={13} className="text-[#00D4FF]" />
            <span>Buscar</span>
          </button>

          {/* Menú Favoritos */}
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === 'favorites' ? null : 'favorites')
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer relative ${
              activeDropdown === 'favorites'
                ? 'bg-[#162846] text-[#00D4FF]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
            }`}
          >
            <Bookmark size={13} />
            <span>Favoritos</span>
            {favorites.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] text-[9px] flex items-center justify-center font-mono">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Menú Historial */}
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === 'history' ? null : 'history')
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeDropdown === 'history'
                ? 'bg-[#162846] text-[#00D4FF]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
            }`}
          >
            <History size={13} />
            <span>Historial</span>
          </button>

          {/* Menú Perfil */}
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeDropdown === 'profile'
                ? 'bg-[#162846] text-[#00D4FF]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
            }`}
          >
            <User size={13} />
            <span>Perfil</span>
          </button>
        </nav>

        {/* Lado Derecho: Estado Científico + Acceso Rápido */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0F1E36] border border-white/8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-[11px] font-mono text-[#94A3B8]">Modo Clínico Activo</span>
          </div>

          <Tooltip content="Plataforma Médica y Educativa ANATHEA v1.0">
            <div className="w-8 h-8 rounded-full bg-[#162846] border border-white/10 flex items-center justify-center text-xs font-mono text-[#00D4FF] cursor-default">
              MD
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Desplegables flotantes */}
      <div ref={dropdownRef}>
        {/* Desplegable de Favoritos */}
        {activeDropdown === 'favorites' && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 lg:left-auto lg:right-48 w-80 bg-[#0F1E36] border border-white/10 rounded-xl shadow-2xl p-4 animate-fade-in z-50">
            <div className="flex items-center justify-between pb-3 border-b border-white/8 mb-3">
              <div className="flex items-center gap-2">
                <Bookmark size={15} className="text-[#00D4FF]" />
                <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
                  Estructuras Guardadas
                </h4>
              </div>
              <span className="text-[10px] text-[#64748B] font-mono">{favorites.length} guardadas</span>
            </div>

            {favorites.length === 0 ? (
              <p className="text-xs text-[#94A3B8] py-4 text-center">
                Aún no has marcado estructuras como favoritas.
              </p>
            ) : (
              <ul className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {favorites.map((fav) => (
                  <li
                    key={fav}
                    onClick={() => {
                      if (fav.startsWith('esqueletico') || fav.startsWith('cardio')) {
                        navigate(`/sistema/${fav}`);
                      } else {
                        setSelectedPart(fav);
                        if (!isAnatomyActive) navigate(`/sistema/${activeSystemSlug}`);
                      }
                      setActiveDropdown(null);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/3 hover:bg-[#162846] border border-white/5 text-xs text-[#F8FAFC] cursor-pointer transition-colors"
                  >
                    <span className="capitalize">{fav.replace(/_/g, ' ')}</span>
                    <ChevronRight size={13} className="text-[#64748B]" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Desplegable de Historial */}
        {activeDropdown === 'history' && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 lg:left-auto lg:right-32 w-80 bg-[#0F1E36] border border-white/10 rounded-xl shadow-2xl p-4 animate-fade-in z-50">
            <div className="flex items-center justify-between pb-3 border-b border-white/8 mb-3">
              <div className="flex items-center gap-2">
                <History size={15} className="text-[#00D4FF]" />
                <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
                  Historial de Exploración
                </h4>
              </div>
              <span className="text-[10px] text-[#64748B] font-mono">{history.length} visitas</span>
            </div>

            <ul className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {history.map((item, idx) => (
                <li
                  key={`${item}-${idx}`}
                  onClick={() => {
                    setSelectedPart(item);
                    if (!isAnatomyActive) navigate(`/sistema/${activeSystemSlug}`);
                    setActiveDropdown(null);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/3 hover:bg-[#162846] border border-white/5 text-xs text-[#F8FAFC] cursor-pointer transition-colors"
                >
                  <span className="truncate">{item.replace(/_/g, ' ')}</span>
                  <span className="text-[10px] text-[#64748B] font-mono">Ver</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Desplegable de Perfil */}
        {activeDropdown === 'profile' && (
          <div className="absolute top-14 right-4 w-72 bg-[#0F1E36] border border-white/10 rounded-xl shadow-2xl p-4 animate-fade-in z-50">
            <div className="flex items-center gap-3 pb-3 border-b border-white/8 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#162846] border border-[#00D4FF]/30 flex items-center justify-center text-sm font-bold text-[#00D4FF]">
                DR
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#F8FAFC]">Estudiante / Investigador</h4>
                <p className="text-[10px] text-[#64748B]">Acceso Médico Abierto</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#94A3B8] mb-3">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Modo de estudio:</span>
                <span className="text-[#00D4FF] font-medium">Anatomía 3D</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Versión:</span>
                <span className="font-mono text-[#F8FAFC]">1.0.0 (Fase 6.5)</span>
              </div>
            </div>

            <p className="text-[10px] text-[#64748B] italic">
              La sincronización de cuentas multi-usuario y evaluaciones se activará en la Fase 7.
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
