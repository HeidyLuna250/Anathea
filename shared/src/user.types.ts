// ═══════════════════════════════════════════
// ANATHEA — Tipos de Usuario
// ═══════════════════════════════════════════

/** Usuario de la plataforma */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  isActive: boolean;
  roleId: string;
  createdAt: string;
  updatedAt: string;
}

/** Rol de usuario */
export interface Role {
  id: string;
  name: string;
  description?: string | null;
  permissions: Record<string, boolean>;
}

/** Favorito del usuario */
export interface Favorite {
  id: string;
  entityType: string;
  entityId: string;
  userId: string;
  createdAt: string;
}

/** Historial de navegación del usuario */
export interface UserHistory {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown> | null;
  userId: string;
  createdAt: string;
}
