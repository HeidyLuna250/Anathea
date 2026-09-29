// ═══════════════════════════════════════════
// ANATHEA — Tipos de API (Request/Response)
// ═══════════════════════════════════════════

/** Respuesta genérica de la API */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/** Respuesta con paginación */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/** Respuesta de error de la API */
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

/** Request de login */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Request de registro */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

/** Respuesta de autenticación */
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

/** Request para crear favorito */
export interface CreateFavoriteRequest {
  entityType: string;
  entityId: string;
}

/** Parámetros de búsqueda */
export interface SearchParams {
  q: string;
  type?: 'system' | 'organ' | 'structure' | 'all';
  limit?: number;
  offset?: number;
}
