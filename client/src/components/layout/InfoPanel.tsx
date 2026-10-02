// ═══════════════════════════════════════════
// ANATHEA — InfoPanel Component
// Panel de Información Médica, Clínica & Bibliográfica
// ═══════════════════════════════════════════

import { useState } from 'react';
import {
  FileText,
  Activity,
  Maximize2,
  GitBranch,
  AlertTriangle,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  X,
  Target,
  Share2,
  Stethoscope,
  Info,
} from 'lucide-react';
import type { AnatomicalSystem } from '@anathea/shared';
import { Tabs } from '../ui/Tabs';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { getMedicalInfoForSelection } from '../../services/anatomyData';

interface InfoPanelProps {
  system: AnatomicalSystem;
  isOpen: boolean;
  onClose: () => void;
}

export function InfoPanel({ system, isOpen, onClose }: InfoPanelProps) {
  // Pestaña activa
  const [activeTab, setActiveTab] = useState('general');

  // Estado del store global
  const selectedPartName = useAnatomyStore((state) => state.selectedPartName);
  const setSelectedPart = useAnatomyStore((state) => state.setSelectedPart);
  const favorites = useAnatomyStore((state) => state.favorites);
  const toggleFavorite = useAnatomyStore((state) => state.toggleFavorite);

  // Obtener información médica estructurada
  const structureInfo = getMedicalInfoForSelection(selectedPartName);

  // Identificador para favoritos
  const currentEntityId = selectedPartName || system.slug;
  const isBookmarked = favorites.includes(currentEntityId);

  // Definición de pestañas clínicas
  const tabs = [
    { id: 'general', label: 'General', icon: <FileText size={14} /> },
    { id: 'funcion', label: 'Función', icon: <Activity size={14} /> },
    { id: 'caracteristicas', label: 'Características', icon: <Info size={14} /> },
    { id: 'relaciones', label: 'Relaciones', icon: <GitBranch size={14} /> },
    { id: 'clinica', label: 'Clínica', icon: <Stethoscope size={14} /> },
    { id: 'referencias', label: 'Referencias', icon: <BookOpen size={14} /> },
  ];

  if (!isOpen) return null;

  return (
    <aside
      id="anatomy-info-panel"
      className="w-full sm:w-[390px] xl:w-[420px] h-[calc(100vh-3.5rem)] bg-[#0A1628]/95 backdrop-blur-xl border-l border-white/8 flex flex-col z-30 shadow-2xl overflow-hidden select-none animate-fade-in"
    >
      {/* Cabecera del Panel */}
      <div className="p-4 border-b border-white/8 bg-[#0F1E36]/40">
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Badge de Sistema o Selección */}
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: system.color || '#00D4FF',
                boxShadow: system.color ? `0 0 8px ${system.color}` : 'none',
              }}
            />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
              {selectedPartName ? 'Estructura Quirúrgica' : 'Sistema Anatómico'}
            </span>
          </div>

          {/* Acciones de Cabecera */}
          <div className="flex items-center gap-1">
            <Tooltip content={isBookmarked ? 'Quitar de favoritos' : 'Guardar en favoritos'}>
              <button
                type="button"
                onClick={() => toggleFavorite(currentEntityId)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#00D4FF]/15 text-[#00D4FF] border-[#00D4FF]/40'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 border-transparent'
                }`}
                aria-label="Alternar favorito"
              >
                {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              </button>
            </Tooltip>

            <Tooltip content="Ocultar panel derecho">
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Cerrar panel de información"
              >
                <X size={16} />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Título Principal */}
        <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight leading-snug">
          {selectedPartName ? structureInfo.nameEs : system.nameEs}
        </h2>

        {/* Término Anatómico Internacional en Latín */}
        <p className="text-xs font-mono text-[#00D4FF] mt-0.5 italic">
          {selectedPartName ? structureInfo.nameLa : system.nameLa || system.name}
        </p>

        {/* Selector rápido si hay una parte seleccionada */}
        {selectedPartName && (
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-[#94A3B8] flex items-center gap-1.5">
              <Target size={12} className="text-[#00D4FF]" /> Vista específica activa
            </span>
            <button
              onClick={() => setSelectedPart(null)}
              className="text-[#00D4FF] hover:underline cursor-pointer text-[11px] font-medium"
            >
              Ver descripción general &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Barra de Pestañas Segmentadas */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="px-2 bg-[#0F1E36]/30"
      />

      {/* Contenido Dinámico con Scroll Independiente */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-[#94A3B8] scrollbar-thin">
        
        {/* PESTAÑA: INFORMACIÓN GENERAL */}
        {activeTab === 'general' && (
          <div className="space-y-4 animate-fade-in">
            <section className="bg-[#0F1E36]/50 p-3.5 rounded-xl border border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC] mb-2 flex items-center gap-1.5">
                <FileText size={13} className="text-[#00D4FF]" />
                Descripción General
              </h3>
              <p className="leading-relaxed text-[#CBD5E1] text-justify">
                {selectedPartName
                  ? structureInfo.general.description
                  : system.description || 'Sin descripción detallada registrada para este sistema.'}
              </p>
            </section>

            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3 rounded-lg bg-[#0F1E36]/30 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] block mb-0.5">
                  Clasificación
                </span>
                <span className="text-xs text-[#F8FAFC] font-medium">
                  {selectedPartName ? structureInfo.general.classification : 'Sistema Orgánico Principal'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#0F1E36]/30 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] block mb-0.5">
                  Localización Topográfica
                </span>
                <span className="text-xs text-[#F8FAFC] font-medium">
                  {selectedPartName ? structureInfo.general.location : 'Distribución anatómica corporal global'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#0F1E36]/30 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] block mb-0.5">
                  Desarrollo Embriológico
                </span>
                <span className="text-xs text-[#F8FAFC] font-medium">
                  {selectedPartName ? structureInfo.general.development : 'Derivado de capas germinativas primarias'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: FUNCIÓN */}
        {activeTab === 'funcion' && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="p-3.5 rounded-xl bg-[#0F1E36]/50 border border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#00D4FF] block mb-1.5">
                Función Primaria
              </span>
              <p className="leading-relaxed text-[#F8FAFC]">
                {selectedPartName
                  ? structureInfo.function.primary
                  : 'Soporte estructural, protección visceral y regulación de la homeostasis fisiológica.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0F1E36]/50 border border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#00D4FF] block mb-1.5">
                Biomecánica y Movimiento
              </span>
              <p className="leading-relaxed text-[#CBD5E1]">
                {selectedPartName
                  ? structureInfo.function.biomechanics
                  : 'Transmisión y amortiguación de cargas mecánicas coordinadas por el sistema osteomuscular.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0F1E36]/50 border border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#00D4FF] block mb-1.5">
                Rol Fisiológico
              </span>
              <p className="leading-relaxed text-[#CBD5E1]">
                {selectedPartName
                  ? structureInfo.function.physiology
                  : 'Participación en el equilibrio metabólico e intercambio iónico tisular.'}
              </p>
            </div>
          </div>
        )}

        {/* PESTAÑA: CARACTERÍSTICAS */}
        {activeTab === 'caracteristicas' && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-3 rounded-lg bg-[#0F1E36]/40 border border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] block mb-1">
                Morfología Tisular
              </span>
              <p className="text-xs text-[#F8FAFC] leading-relaxed">
                {selectedPartName ? structureInfo.features.morphology : 'Tejido altamente especializado y vascularizado.'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#0F1E36]/40 border border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] block mb-1">
                Irrigación Vascular
              </span>
              <p className="text-xs text-[#F8FAFC] leading-relaxed">
                {selectedPartName ? structureInfo.features.vascularization : 'Red anastomótica nutricia principal y perióstica.'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#0F1E36]/40 border border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] block mb-1">
                Inervación
              </span>
              <p className="text-xs text-[#F8FAFC] leading-relaxed">
                {selectedPartName ? structureInfo.features.innervation : 'Ramas sensitivas y autónomas del sistema nervioso.'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#0F1E36]/40 border border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] block mb-1">
                Dimensiones y Parámetros
              </span>
              <p className="text-xs font-mono text-[#00D4FF]">
                {selectedPartName ? structureInfo.features.dimensions : 'Variables antropométricas estándar'}
              </p>
            </div>
          </div>
        )}

        {/* PESTAÑA: RELACIONES ANATÓMICAS */}
        {activeTab === 'relaciones' && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-3 rounded-lg bg-[#0F1E36]/40 border border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#00D4FF] block">
                Topografía Espacial
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-black/20">
                  <span className="text-[10px] text-[#64748B] block">Superior:</span>
                  <span className="text-[#F8FAFC] text-[11px]">{structureInfo.relations.superior || 'Límite craneal'}</span>
                </div>
                <div className="p-2 rounded bg-black/20">
                  <span className="text-[10px] text-[#64748B] block">Inferior:</span>
                  <span className="text-[#F8FAFC] text-[11px]">{structureInfo.relations.inferior || 'Límite caudal'}</span>
                </div>
                <div className="p-2 rounded bg-black/20">
                  <span className="text-[10px] text-[#64748B] block">Anterior:</span>
                  <span className="text-[#F8FAFC] text-[11px]">{structureInfo.relations.anterior || 'Límite ventral'}</span>
                </div>
                <div className="p-2 rounded bg-black/20">
                  <span className="text-[10px] text-[#64748B] block">Posterior:</span>
                  <span className="text-[#F8FAFC] text-[11px]">{structureInfo.relations.posterior || 'Límite dorsal'}</span>
                </div>
              </div>
            </div>

            {structureInfo.relations.articulations && (
              <div className="p-3 rounded-lg bg-[#0F1E36]/40 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] block mb-2">
                  Articulaciones Principales
                </span>
                <ul className="space-y-1">
                  {structureInfo.relations.articulations.map((art, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                      <span>{art}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {structureInfo.relations.insertions && (
              <div className="p-3 rounded-lg bg-[#0F1E36]/40 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] block mb-2">
                  Inserciones Musculares y Tendinosas
                </span>
                <ul className="space-y-1">
                  {structureInfo.relations.insertions.map((ins, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA: CONDICIONES CLÍNICAS */}
        {activeTab === 'clinica' && (
          <div className="space-y-3 animate-fade-in">
            <div className="space-y-2.5">
              {structureInfo.clinical.conditions.map((cond, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#0F1E36]/50 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-[#F8FAFC]">{cond.name}</h4>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                        cond.severity === 'critica'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : cond.severity === 'moderada'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      {cond.severity}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#94A3B8]">{cond.description}</p>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5 font-bold">
                <AlertTriangle size={13} />
                Consideraciones Quirúrgicas
              </span>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {structureInfo.clinical.surgicalConsiderations}
              </p>
            </div>
          </div>
        )}

        {/* PESTAÑA: REFERENCIAS BIBLIOGRÁFICAS */}
        {activeTab === 'referencias' && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-[11px] text-[#64748B]">
              Fuentes biomédicas estandarizadas utilizadas para la validación anatómica:
            </p>

            <div className="space-y-2">
              {structureInfo.references.map((ref, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#0F1E36]/40 border border-white/5 space-y-1"
                >
                  <h4 className="text-xs font-semibold text-[#F8FAFC]">{ref.title}</h4>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                    <span>{ref.author}</span>
                    <span>{ref.edition} · {ref.year}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-white/3 border border-white/5 text-[10px] text-[#64748B] flex items-center justify-between font-mono">
              <span>Terminologia Anatomica (FICAT)</span>
              <span className="text-[#00D4FF]">Verificada</span>
            </div>
          </div>
        )}
      </div>

      {/* Pie del Panel */}
      <div className="p-3 border-t border-white/8 bg-[#0F1E36]/30 text-[10px] text-[#64748B] flex items-center justify-between font-mono">
        <span>ANATHEA Atlas Clínico</span>
        <span className="text-[#00D4FF]">Español (ES)</span>
      </div>
    </aside>
  );
}
