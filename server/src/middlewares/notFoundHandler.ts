// ═══════════════════════════════════════════
// ANATHEA — 404 Route Not Found Middleware
// ═══════════════════════════════════════════

import { Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}
