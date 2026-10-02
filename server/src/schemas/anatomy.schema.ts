// ═══════════════════════════════════════════
// ANATHEA — Anatomy Validation Schemas
// ═══════════════════════════════════════════

import { z } from 'zod';

export const systemSlugParamSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, 'El slug debe tener al menos 2 caracteres')
    .max(50, 'El slug no puede exceder 50 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
});

export const systemQuerySchema = z.object({
  activeOnly: z.enum(['true', 'false']).optional(),
});
