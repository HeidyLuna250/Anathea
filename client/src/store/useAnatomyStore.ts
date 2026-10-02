// ═══════════════════════════════════════════
// ANATHEA — Global State (Zustand)
// Manejo de Selección 3D, Cámaras, Filtros y Navegación
// ═══════════════════════════════════════════

import { create } from 'zustand';

interface AnatomyState {
  // Selección 3D activa
  selectedPartName: string | null;
  setSelectedPart: (name: string | null) => void;

  // Sistema anatómico activo
  activeSystemSlug: string;
  setActiveSystemSlug: (slug: string) => void;

  // Estado del visor 3D
  wireframe: boolean;
  toggleWireframe: () => void;
  setWireframe: (val: boolean) => void;

  // Disparadores de cámara y encuadre 3D
  cameraResetCount: number;
  triggerResetCamera: () => void;
  focusTargetCount: number;
  triggerFocusTarget: () => void;

  // Modo aislamiento
  isIsolated: boolean;
  toggleIsolate: () => void;
  setIsIsolated: (val: boolean) => void;

  // Visibilidad de paneles en desktop y responsive
  isSidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  toggleSidebar: () => void;

  isInfoPanelOpen: boolean;
  setInfoPanelOpen: (val: boolean) => void;
  toggleInfoPanel: () => void;

  // Búsqueda global
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Favoritos e Historial (persistidos en memoria/localStorage)
  favorites: string[];
  toggleFavorite: (idOrSlug: string) => void;
  history: string[];
  addToHistory: (item: string) => void;
}

export const useAnatomyStore = create<AnatomyState>((set, get) => ({
  selectedPartName: null,
  setSelectedPart: (name) => {
    set({ selectedPartName: name });
    if (name) {
      get().addToHistory(name);
      // Abrir el panel de información si estaba cerrado al seleccionar algo
      set({ isInfoPanelOpen: true });
    }
  },

  activeSystemSlug: 'esqueletico',
  setActiveSystemSlug: (slug) => set({ activeSystemSlug: slug }),

  wireframe: false,
  toggleWireframe: () => set((state) => ({ wireframe: !state.wireframe })),
  setWireframe: (val) => set({ wireframe: val }),

  cameraResetCount: 0,
  triggerResetCamera: () =>
    set((state) => ({ cameraResetCount: state.cameraResetCount + 1 })),

  focusTargetCount: 0,
  triggerFocusTarget: () =>
    set((state) => ({ focusTargetCount: state.focusTargetCount + 1 })),

  isIsolated: false,
  toggleIsolate: () => set((state) => ({ isIsolated: !state.isIsolated })),
  setIsIsolated: (val) => set({ isIsolated: val }),

  isSidebarOpen: true,
  setSidebarOpen: (val) => set({ isSidebarOpen: val }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  isInfoPanelOpen: true,
  setInfoPanelOpen: (val) => set({ isInfoPanelOpen: val }),
  toggleInfoPanel: () =>
    set((state) => ({ isInfoPanelOpen: !state.isInfoPanelOpen })),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  favorites: (() => {
    try {
      const saved = localStorage.getItem('anathea_favorites');
      return saved ? JSON.parse(saved) : ['esqueletico', 'cardiovascular'];
    } catch {
      return ['esqueletico', 'cardiovascular'];
    }
  })(),
  toggleFavorite: (idOrSlug) => {
    const current = get().favorites;
    const next = current.includes(idOrSlug)
      ? current.filter((f) => f !== idOrSlug)
      : [...current, idOrSlug];
    try {
      localStorage.setItem('anathea_favorites', JSON.stringify(next));
    } catch {}
    set({ favorites: next });
  },

  history: (() => {
    try {
      const saved = localStorage.getItem('anathea_history');
      return saved ? JSON.parse(saved) : ['Sistema Esquelético', 'Cráneo'];
    } catch {
      return ['Sistema Esquelético', 'Cráneo'];
    }
  })(),
  addToHistory: (item) => {
    const current = get().history.filter((h) => h !== item);
    const next = [item, ...current].slice(0, 10);
    try {
      localStorage.setItem('anathea_history', JSON.stringify(next));
    } catch {}
    set({ history: next });
  },
}));
