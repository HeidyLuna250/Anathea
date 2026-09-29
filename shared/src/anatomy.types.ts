// ═══════════════════════════════════════════
// ANATHEA — Tipos de Entidades Anatómicas
// ═══════════════════════════════════════════

/** Sistema anatómico (ej: Esquelético, Muscular, Nervioso) */
export interface AnatomicalSystem {
  id: string;
  name: string;
  nameEs: string;
  nameLa?: string | null;
  description?: string | null;
  slug: string;
  sortOrder: number;
  color?: string | null;
  icon?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Región anatómica (ej: Cabeza, Tórax, Extremidad Superior) */
export interface Region {
  id: string;
  name: string;
  nameEs: string;
  nameLa?: string | null;
  description?: string | null;
  slug: string;
  sortOrder: number;
  parentId?: string | null;
}

/** Órgano (ej: Fémur, Corazón, Pulmón) */
export interface Organ {
  id: string;
  name: string;
  nameEs: string;
  nameLa?: string | null;
  description?: string | null;
  slug: string;
  sortOrder: number;
  systemId: string;
  regionId?: string | null;
}

/** Estructura anatómica (ej: Trocánter Mayor, Ventrículo Izquierdo) */
export interface Structure {
  id: string;
  name: string;
  nameEs: string;
  nameLa?: string | null;
  description?: string | null;
  slug: string;
  sortOrder: number;
  tissueType?: string | null;
  organId?: string | null;
  regionId?: string | null;
  parentId?: string | null;
}

/** Relación entre estructuras anatómicas */
export interface AnatomicalRelation {
  id: string;
  relationType: string;
  description?: string | null;
  fromStructureId: string;
  toStructureId: string;
}

/** Capa anatómica (ej: Piel, Fascia, Músculo, Hueso) */
export interface Layer {
  id: string;
  name: string;
  nameEs: string;
  depth: number;
  color?: string | null;
  opacity: number;
  systemId?: string | null;
}

/** Condición clínica educativa */
export interface ClinicalCondition {
  id: string;
  name: string;
  nameEs: string;
  description?: string | null;
  category?: string | null;
  severity?: string | null;
}

/** Referencia bibliográfica */
export interface BibliographicReference {
  id: string;
  title: string;
  authors?: string | null;
  source: string;
  year?: number | null;
  edition?: string | null;
  isbn?: string | null;
  doi?: string | null;
  url?: string | null;
  type: string;
}

/** Modelo 3D */
export interface Model3D {
  id: string;
  filename: string;
  format: string;
  path: string;
  fileSize?: number | null;
  author?: string | null;
  source?: string | null;
  license?: string | null;
  version?: string | null;
  organId?: string | null;
  structureId?: string | null;
}

/** Imagen anatómica */
export interface AnatomyImage {
  id: string;
  filename: string;
  path: string;
  altText?: string | null;
  caption?: string | null;
  author?: string | null;
  source?: string | null;
  license?: string | null;
  organId?: string | null;
  structureId?: string | null;
}
