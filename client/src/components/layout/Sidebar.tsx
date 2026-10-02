// ═══════════════════════════════════════════
// ANATHEA — Sidebar Component
// Navegación Anatómica Jerárquica & Árbol de Exploración
// ═══════════════════════════════════════════

import { useState, useMemo } from 'react';
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
  ChevronDown,
  ChevronRight,
  Target,
  CircleDot,
  CheckCircle2,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { AnatomicalSystem } from '@anathea/shared';
import { SearchInput } from '../ui/SearchInput';
import { AnatomyTreeSkeleton } from '../ui/Skeleton';
import { useAnatomyStore } from '../../store/useAnatomyStore';

// Mapeo exhaustivo de iconos científicos por sistema
const SYSTEM_ICONS: Record<string, ReactNode> = {
  esqueletico: <Bone size={16} />,
  muscular: <Dumbbell size={16} />,
  nervioso: <BrainCircuit size={16} />,
  cardiovascular: <HeartPulse size={16} />,
  respiratorio: <Wind size={16} />,
  digestivo: <Apple size={16} />,
  urinario: <Droplets size={16} />,
  endocrino: <Activity size={16} />,
  linfatico: <Shield size={16} />,
  inmunologico: <ShieldCheck size={16} />,
  tegumentario: <Hand size={16} />,
  reproductor: <Baby size={16} />,
};

// Estructuras y regiones anatómicas representativas por sistema
const SYSTEM_HIERARCHY: Record<string, { region: string; structures: string[] }[]> = {
  esqueletico: [
    { region: 'Esqueleto Axial', structures: ['Cráneo', 'Columna Vertebral', 'Caja Torácica', 'Tronco'] },
    { region: 'Esqueleto Apendicular', structures: ['Cintura Escapular', 'Brazo Izquierdo', 'Brazo Derecho', 'Pelvis', 'Fémur'] },
  ],
  muscular: [
    { region: 'Músculos de la Cabeza y Cuello', structures: ['Frontal', 'Masetero', 'Esternocleidomastoideo'] },
    { region: 'Músculos del Tronco', structures: ['Pectoral Mayor', 'Dorsal Ancho', 'Recto Abdominal'] },
    { region: 'Músculos Apendiculares', structures: ['Bíceps Braquial', 'Tríceps', 'Cuádriceps', 'Gastrocnemio'] },
  ],
  nervioso: [
    { region: 'Sistema Nervioso Central', structures: ['Cerebro', 'Cerebelo', 'Tronco Encefálico', 'Médula Espinal'] },
    { region: 'Sistema Nervioso Periférico', structures: ['Nervios Craneales', 'Plexo Braquial', 'Nervio Ciático'] },
  ],
  cardiovascular: [
    { region: 'Estructuras Cardíacas', structures: ['Ventrículo Izquierdo', 'Aurícula Derecha', 'Miocardio', 'Válvula Aórtica'] },
    { region: 'Vasos Principales', structures: ['Arteria Aorta', 'Vena Cava Superior', 'Arterias Coronarias'] },
  ],
  respiratorio: [
    { region: 'Vías Superiores', structures: ['Cavidad Nasal', 'Faringe', 'Laringe'] },
    { region: 'Vías Inferiores y Pulmones', structures: ['Tráquea', 'Bronquios Principales', 'Pulmón Derecho', 'Pulmón Izquierdo', 'Diafragma'] },
  ],
  digestivo: [
    { region: 'Tracto Gastrointestinal Superior', structures: ['Esófago', 'Estómago', 'Duodeno'] },
    { region: 'Tracto Inferior y Glándulas', structures: ['Hígado', 'Páncreas', 'Intestino Delgado', 'Colon'] },
  ],
  urinario: [
    { region: 'Estructuras Renales', structures: ['Riñón Derecho', 'Riñón Izquierdo', 'Nefronas'] },
    { region: 'Vías Urinarias', structures: ['Uréteres', 'Vejiga Urinaria', 'Uretra'] },
  ],
  endocrino: [
    { region: 'Glándulas Craneales', structures: ['Hipófisis', 'Glándula Pineal', 'Hipotálamo'] },
    { region: 'Glándulas Periféricas', structures: ['Glándula Tiroides', 'Glándulas Suprarrenales', 'Islotes Pancreáticos'] },
  ],
  linfatico: [
    { region: 'Órganos Linfáticos', structures: ['Timo', 'Bazo', 'Ganglios Linfáticos Cervicales'] },
    { region: 'Vasos y Conductos', structures: ['Conducto Torácico', 'Capilares Linfáticos'] },
  ],
  inmunologico: [
    { region: 'Barreras e Inmunidad', structures: ['Médula Ósea Roja', 'Placas de Peyer', 'Amígdalas'] },
  ],
  tegumentario: [
    { region: 'Capas de la Piel', structures: ['Epidermis', 'Dermis', 'Hipodermis', 'Folículos Pilosos'] },
  ],
  reproductor: [
    { region: 'Estructuras Anatómicas', structures: ['Gónadas', 'Conductos Reproductores', 'Glándulas Accesorias'] },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  systems: AnatomicalSystem[];
  activeSystem: string | null;
  onSelectSystem: (slug: string) => void;
  isLoading: boolean;
}

export function Sidebar({
  isOpen,
  systems,
  activeSystem,
  onSelectSystem,
  isLoading,
}: SidebarProps) {
  // Estado local para búsqueda y expansión del árbol
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedSystems, setExpandedSystems] = useState<Record<string, boolean>>({
    esqueletico: true, // expandido por defecto para exploración inicial
  });

  // Estado global de anatomía
  const selectedPartName = useAnatomyStore((state) => state.selectedPartName);
  const setSelectedPart = useAnatomyStore((state) => state.setSelectedPart);
  const setActiveSystemSlug = useAnatomyStore((state) => state.setActiveSystemSlug);

  // Alternar expansión de rama
  const toggleExpand = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSystems((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  // Filtrado reactivo en tiempo real
  const filteredSystems = useMemo(() => {
    if (!searchFilter.trim()) return systems;
    const query = searchFilter.toLowerCase().trim();

    return systems.filter((sys) => {
      const matchSystemName = sys.nameEs.toLowerCase().includes(query);
      const hierarchy = SYSTEM_HIERARCHY[sys.slug] || [];
      const matchStructure = hierarchy.some(
        (h) =>
          h.region.toLowerCase().includes(query) ||
          h.structures.some((s) => s.toLowerCase().includes(query))
      );
      return matchSystemName || matchStructure;
    });
  }, [systems, searchFilter]);

  const handleSystemClick = (slug: string) => {
    onSelectSystem(slug);
    setActiveSystemSlug(slug);
    // Expandir automáticamente al hacer clic
    setExpandedSystems((prev) => ({ ...prev, [slug]: true }));
  };

  const handleStructureClick = (structureName: string, systemSlug: string) => {
    // Si no está en el sistema correspondiente, navega a él
    if (activeSystem !== systemSlug) {
      onSelectSystem(systemSlug);
      setActiveSystemSlug(systemSlug);
    }
    // Mapea a nombres del modelo 3D si aplica
    let modelTargetName = structureName;
    if (structureName === 'Cráneo') modelTargetName = 'Cráneo_Placeholder';
    if (structureName === 'Tronco') modelTargetName = 'Tronco_Placeholder';
    if (structureName === 'Brazo Izquierdo') modelTargetName = 'Brazo_Izquierdo';
    if (structureName === 'Brazo Derecho') modelTargetName = 'Brazo_Derecho';

    setSelectedPart(modelTargetName);
  };

  return (
    <aside
      id="anatomy-sidebar"
      className={`fixed top-14 left-0 bottom-0 z-40 w-72 bg-[#0A1628]/95 backdrop-blur-xl border-r border-white/8 transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0 opacity-100 shadow-2xl' : '-translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Cabecera Técnica de la Sidebar */}
      <div className="p-3.5 border-b border-white/8 bg-[#0F1E36]/40">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Navegación Anatómica
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#64748B] bg-white/5 px-1.5 py-0.5 rounded">
            {filteredSystems.length} sistemas
          </span>
        </div>

        {/* Input de Búsqueda Integrada */}
        <SearchInput
          id="anatomy-search-input"
          size="sm"
          value={searchFilter}
          onChangeValue={setSearchFilter}
          placeholder="Buscar sistemas o estructuras..."
          shortcutHint="Filtrar"
        />
      </div>

      {/* Árbol Jerárquico de Sistemas y Estructuras */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 scrollbar-thin">
        {isLoading ? (
          <AnatomyTreeSkeleton count={10} />
        ) : filteredSystems.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#94A3B8]">
            <p>No se encontraron resultados para &ldquo;{searchFilter}&rdquo;.</p>
          </div>
        ) : (
          filteredSystems.map((system, index) => {
            const isActive = activeSystem === system.slug;
            const isExpanded = !!expandedSystems[system.slug] || !!searchFilter.trim();
            const hierarchy = SYSTEM_HIERARCHY[system.slug] || [];
            const indexNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={system.id}
                className="rounded-lg transition-colors select-none"
              >
                {/* Nivel 1: Sistema Principal */}
                <div
                  onClick={() => handleSystemClick(system.slug)}
                  className={`group flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-[#162846] text-[#F8FAFC] border border-[#00D4FF]/30 shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Botón de expansión */}
                    <button
                      type="button"
                      onClick={(e) => toggleExpand(system.slug, e)}
                      className="p-0.5 rounded hover:bg-white/10 text-[#64748B] group-hover:text-[#94A3B8] transition-colors"
                      aria-label="Expandir o colapsar sistema"
                    >
                      {isExpanded ? (
                        <ChevronDown size={13} className="text-[#00D4FF]" />
                      ) : (
                        <ChevronRight size={13} />
                      )}
                    </button>

                    {/* Número de orden científico */}
                    <span className="text-[10px] font-mono text-[#64748B]">
                      {indexNumber}.
                    </span>

                    {/* Icono con color normalizado del sistema */}
                    <span
                      className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                      style={{ color: system.color || '#00D4FF' }}
                    >
                      {SYSTEM_ICONS[system.slug] || <Bone size={16} />}
                    </span>

                    {/* Nombre del Sistema */}
                    <span className="text-xs font-semibold truncate tracking-tight">
                      {system.nameEs}
                    </span>
                  </div>

                  {/* Indicador Activo */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_6px_rgba(0,212,255,0.8)]" />
                  )}
                </div>

                {/* Nivel 2 y 3: Ramas y Estructuras Expandibles (Árbol) */}
                {isExpanded && hierarchy.length > 0 && (
                  <div className="relative ml-5 pl-3 my-1 border-l border-white/10 space-y-2">
                    {hierarchy.map((regionGroup) => (
                      <div key={regionGroup.region} className="pt-1">
                        {/* Subtítulo de Región */}
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-[#64748B] mb-1">
                          <CircleDot size={8} className="text-[#00D4FF]/60" />
                          <span>{regionGroup.region}</span>
                        </div>

                        {/* Lista de Estructuras Clínicas */}
                        <ul className="space-y-0.5 pl-2">
                          {regionGroup.structures.map((structure) => {
                            const isStructureSelected =
                              selectedPartName === structure ||
                              (structure === 'Cráneo' && selectedPartName === 'Cráneo_Placeholder') ||
                              (structure === 'Tronco' && selectedPartName === 'Tronco_Placeholder') ||
                              (structure === 'Brazo Izquierdo' && selectedPartName === 'Brazo_Izquierdo') ||
                              (structure === 'Brazo Derecho' && selectedPartName === 'Brazo_Derecho');

                            return (
                              <li key={structure}>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStructureClick(structure, system.slug);
                                  }}
                                  className={`w-full flex items-center justify-between text-left px-2 py-1 rounded text-xs transition-all duration-150 cursor-pointer ${
                                    isStructureSelected
                                      ? 'bg-[#00D4FF]/15 text-[#00D4FF] font-semibold border-l-2 border-[#00D4FF]'
                                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                                  }`}
                                >
                                  <div className="flex items-center gap-1.5 truncate">
                                    <span className="w-1 h-1 rounded-full bg-white/30" />
                                    <span className="truncate">{structure}</span>
                                  </div>

                                  {isStructureSelected && (
                                    <Target size={11} className="text-[#00D4FF] flex-shrink-0 animate-pulse" />
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pie de la Barra Lateral */}
      <div className="p-3 border-t border-white/8 bg-[#0F1E36]/30 text-[10px] text-[#64748B] flex items-center justify-between font-mono">
        <span className="flex items-center gap-1">
          <CheckCircle2 size={12} className="text-[#00D4FF]" /> Atlas Verificado
        </span>
        <span>v1.0 Médico</span>
      </div>
    </aside>
  );
}
