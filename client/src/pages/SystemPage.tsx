// ═══════════════════════════════════════════
// ANATHEA — System 3D Page
// ═══════════════════════════════════════════

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Viewer3D } from '../components/viewer3d/Viewer3D';
import { Layers, Activity, FileText, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAnatomyStore } from '../store/useAnatomyStore';

// API Fetcher
async function fetchSystem(slug: string) {
  const res = await fetch(`/api/anatomy/systems/${slug}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Sistema no encontrado');
    throw new Error('Error de red');
  }
  return res.json();
}

export function SystemPage() {
  const { slug } = useParams<{ slug: string }>();
  const [wireframe, setWireframe] = useState(false);
  
  // Estado global para la parte seleccionada
  const selectedPartName = useAnatomyStore((state) => state.selectedPartName);
  const setSelectedPart = useAnatomyStore((state) => state.setSelectedPart);
  
  // Limpiar selección cuando cambias de sistema
  useEffect(() => {
    setSelectedPart(null);
  }, [slug, setSelectedPart]);

  const { data: system, isLoading, error } = useQuery({
    queryKey: ['anatomical-system', slug],
    queryFn: () => fetchSystem(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-surface-200/50 text-sm animate-pulse">Cargando atlas 3D...</p>
        </div>
      </div>
    );
  }

  if (error || !system) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-surface-200/50">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p>No se pudo cargar el sistema anatómico.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-[calc(100vh-4rem)] animate-fade-in relative">
      
      {/* 3D Canvas Area */}
      <div className="flex-1 relative bg-surface-950">
        <Viewer3D 
          modelPath="/models/placeholder.glb" 
          wireframe={wireframe}
          color={system.color}
        />
        
        {/* Floating Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full flex gap-4">
          <button 
            onClick={() => setWireframe(!wireframe)}
            className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${wireframe ? 'bg-primary-500 text-white' : 'hover:bg-white/10'}`}
          >
            <Layers size={14} />
            Malla (Wireframe)
          </button>
        </div>
      </div>

      {/* Information Panel (Right Side) */}
      <div className="w-80 glass border-l border-white/5 p-6 flex flex-col gap-6 overflow-y-auto">
        <header>
          <div className="flex items-center gap-3 mb-2">
            <span 
              className="w-3 h-3 rounded-full shadow-glow"
              style={{ backgroundColor: system.color, boxShadow: `0 0 10px ${system.color}` }}
            />
            <h1 className="text-xl font-bold text-white">{system.nameEs}</h1>
          </div>
          <p className="text-xs text-surface-200/60 font-mono">{system.nameLa || system.name}</p>
        </header>

        {/* 🎯 SECCIÓN INTERACTIVA (PILOTO 3D) */}
        {selectedPartName && (
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 animate-slide-up">
            <h3 className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Target size={14} /> Selección Activa
            </h3>
            <p className="text-lg font-semibold text-white">{selectedPartName.replace(/_/g, ' ')}</p>
            <p className="text-xs text-surface-200/60 mt-1">
              Información específica del órgano no encontrada en la base de datos temporal.
            </p>
          </div>
        )}

        <section>
          <h3 className="text-sm font-semibold text-primary-300 flex items-center gap-2 mb-2">
            <FileText size={16} /> Descripción General
          </h3>
          <p className="text-sm text-surface-200/80 leading-relaxed text-justify">
            {system.description}
          </p>
        </section>

        {system.organs && system.organs.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-accent-400 flex items-center gap-2 mb-3">
              <Activity size={16} /> Órganos Principales
            </h3>
            <ul className="space-y-2">
              {system.organs.map((organ: any) => (
                <li key={organ.id} className="text-sm bg-white/5 px-3 py-2 rounded-lg border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                  {organ.nameEs}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

    </div>
  );
}
