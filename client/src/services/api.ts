// ═══════════════════════════════════════════
// ANATHEA — HTTP Client Service (Axios)
// ═══════════════════════════════════════════

import axios from 'axios';
import type { AnatomicalSystem } from '@anathea/shared';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor de Solicitud: Inyecta Token JWT si existe (Preparado para Fase 7)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('anathea_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Respuesta: Manejo uniforme de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Error en la comunicación con el servidor';
    return Promise.reject(new Error(message));
  }
);

// Métodos de Anatomía
export async function getAnatomicalSystems(): Promise<AnatomicalSystem[]> {
  const { data } = await api.get<AnatomicalSystem[]>('/anatomy/systems');
  return data;
}

export async function getAnatomicalSystemBySlug(slug: string): Promise<AnatomicalSystem> {
  const { data } = await api.get<AnatomicalSystem>(`/anatomy/systems/${slug}`);
  return data;
}
