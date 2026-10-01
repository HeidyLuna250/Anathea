// ═══════════════════════════════════════════
// ANATHEA — Global State (Zustand)
// ═══════════════════════════════════════════

import { create } from 'zustand';

interface AnatomyState {
  selectedPartName: string | null;
  setSelectedPart: (name: string | null) => void;
}

export const useAnatomyStore = create<AnatomyState>((set) => ({
  selectedPartName: null,
  setSelectedPart: (name) => set({ selectedPartName: name }),
}));
