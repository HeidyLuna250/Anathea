// ═══════════════════════════════════════════
// ANATHEA — System 3D Page
// Espacio Tridimensional & Panel Anatómico Clínico
// ═══════════════════════════════════════════

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Info, PanelRightOpen, Layers } from 'lucide-react';
import { Viewer3D } from '../components/viewer3d/Viewer3D';
import { InfoPanel } from '../components/layout/InfoPanel';
import { useAnatomyStore } from '../store/useAnatomyStore';
import { getAnatomicalSystemBySlug } from '../services/api';
import { ErrorState } from '../components/ui/ErrorState';
import { Skeleton } from '../components/ui/Skeleton';

export function SystemPage() {
  const { slug } = useParams<{ slug: string }>();

  // Store global de ANATHEA
  const setSelectedPart = useAnatomyStore((state) => state.setSelectedPart);
  const setActiveSystemSlug = useAnatomyStore((state) => state.setActiveSystemSlug);
  const isInfoPanelOpen = useAnatomyStore((state) => state.isInfoPanelOpen);
  const setInfoPanelOpen = useAnatomyStore((state) => state.setInfoPanelOpen);
  const toggleInfoPanel = useAnatomyStore((state) => state.toggleInfoPanel);

  // Sincronizar slug activo con el store
  useEffect(() => {
    if (slug) {
      setActiveSystemSlug(slug);
      setSelectedPart(null); // Limpiar selección al cambiar de sistema
    }
  }, [slug, setActiveSystemSlug, setSelectedPart]);

  const {
    data: system,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['anatomical-system', slug],
    queryFn: () => getAnatomicalSystemBySlug(slug!),
    enabled: !!slug,
  });

  // Estado de carga con Skeleton UI Médico
  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center medical-grid relative select-none">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#0F1E36]/80 border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-[#00D4FF]/20 border-t-[#00D4FF] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-sm font-semibold text-[#F8FAFC]">
              Inicializando Visor 3D y Datos Anatómicos
            </h3>
            <p className="text-xs text-[#94A3B8] font-mono">
              Calibrando mallas y coordenadas biomédicas...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Estado de error clínico
  if (error || !system) {
    return (
      <div className="w-full h-[calc(100vh-3.5rem)] flex items-center justify-center p-6 medical-grid">
        <ErrorState
          title="Error al cargar el sistema anatómico"
          message={`No se pudo obtener la información anatómica para el parámetro "${slug}". Verifica la conexión con el servidor.`}
          onRetry={() => refetch()}
          className="max-w-md bg-[#0F1E36]/90 backdrop-blur-md shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div className="relative flex w-full h-[calc(100vh-3.5rem)] overflow-hidden select-none bg-[#0A1628]">
      {/* 1. Visor 3D Central (Protagonista principal de ANATHEA) */}
      <div className="flex-1 relative h-full">
        <Viewer3D
          modelPath="/models/placeholder.glb"
          color={system.color || '#E8D44D'}
          systemName={system.nameEs}
        />

        {/* Botón flotante para abrir panel en móvil si está cerrado */}
        {!isInfoPanelOpen && (
          <button
            onClick={() => setInfoPanelOpen(true)}
            className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F1E36]/90 hover:bg-[#162846] text-[#00D4FF] border border-[#00D4FF]/40 shadow-xl backdrop-blur-md text-xs font-semibold cursor-pointer transition-all hover:scale-105"
            aria-label="Abrir panel de información médica"
          >
            <Info size={15} />
            <span>Ficha Médica</span>
          </button>
        )}
      </div>

      {/* 2. Panel de Información Derecho (Ficha clínica, biomecánica y bibliográfica) */}
      <div
        className={`fixed lg:relative right-0 top-14 lg:top-0 bottom-0 z-40 transition-all duration-300 ease-in-out ${
          isInfoPanelOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none lg:w-0'
        }`}
      >
        <InfoPanel
          system={system}
          isOpen={isInfoPanelOpen}
          onClose={() => setInfoPanelOpen(false)}
        />
      </div>

      {/* Backdrop overlay para dispositivos móviles cuando el panel de información está abierto */}
      {isInfoPanelOpen && (
        <div
          onClick={() => setInfoPanelOpen(false)}
          className="fixed inset-0 top-14 bg-black/60 backdrop-blur-xs z-30 lg:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
