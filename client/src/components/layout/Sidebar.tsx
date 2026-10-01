// ═══════════════════════════════════════════
// ANATHEA — Sidebar Component
// ═══════════════════════════════════════════

import {
  Bone,
  Dumbbell,
  BrainCircuit,
  HeartPulse,
  Wind,
  Apple,
  Droplets,
  Activity,
  Shield,
  ShieldCheck,
  Hand,
  Baby,
  ChevronRight,
} from 'lucide-react';
import type { ReactNode } from 'react';

// Map system slug to icon
const SYSTEM_ICONS: Record<string, ReactNode> = {
  esqueletico: <Bone size={18} />,
  muscular: <Dumbbell size={18} />,
  nervioso: <BrainCircuit size={18} />,
  cardiovascular: <HeartPulse size={18} />,
  respiratorio: <Wind size={18} />,
  digestivo: <Apple size={18} />,
  urinario: <Droplets size={18} />,
  endocrino: <Activity size={18} />,
  linfatico: <Shield size={18} />,
  inmunologico: <ShieldCheck size={18} />,
  tegumentario: <Hand size={18} />,
  reproductor: <Baby size={18} />,
};

interface AnatomicalSystem {
  id: string;
  name: string;
  nameEs: string;
  slug: string;
  color: string;
  icon: string;
}

interface SidebarProps {
  isOpen: boolean;
  systems: AnatomicalSystem[];
  activeSystem: string | null;
  onSelectSystem: (slug: string) => void;
  isLoading: boolean;
}

export function Sidebar({ isOpen, systems, activeSystem, onSelectSystem, isLoading }: SidebarProps) {
  return (
    <aside
      id="sidebar"
      className={`fixed top-16 left-0 bottom-0 z-40 w-72 glass transition-transform duration-300 ease-out overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Section Header */}
      <div className="p-4 border-b border-white/5">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-surface-200/50">
          Sistemas Anatómicos
        </h2>
      </div>

      {/* System List */}
      <nav className="p-2">
        {isLoading ? (
          // Loading Skeletons
          <div className="space-y-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-11 rounded-lg bg-white/3 animate-pulse"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-0.5">
            {systems.map((system, index) => {
              const isActive = activeSystem === system.slug;
              return (
                <li key={system.id} style={{ animationDelay: `${index * 40}ms` }} className="animate-slide-right">
                  <button
                    id={`system-${system.slug}`}
                    onClick={() => onSelectSystem(system.slug)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                      isActive
                        ? 'bg-white/8 text-white shadow-sm'
                        : 'text-surface-200/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {/* Icon with system color */}
                    <span
                      className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ color: system.color }}
                    >
                      {SYSTEM_ICONS[system.slug] || <Bone size={18} />}
                    </span>

                    {/* System name */}
                    <span className="flex-1 text-left truncate">{system.nameEs}</span>

                    {/* Active indicator */}
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                        style={{ backgroundColor: system.color }}
                      />
                    )}

                    {/* Chevron */}
                    <ChevronRight
                      size={14}
                      className={`flex-shrink-0 transition-all duration-200 ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/5">
        <p className="text-[10px] text-center text-surface-200/30">
          {systems.length} sistemas · ANATHEA v1.0
        </p>
      </div>
    </aside>
  );
}
