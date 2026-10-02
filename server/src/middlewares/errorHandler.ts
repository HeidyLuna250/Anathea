// ═══════════════════════════════════════════
// ANATHEA — Centralized Error Handling Middleware
// ═══════════════════════════════════════════

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';

export function errorHandler(
  err: Error | AppError | ZodError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  const isProduction = process.env.NODE_ENV === 'production';

  // 1. Zod Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.issues.map((e: any) => ({
      field: Array.isArray(e.path) ? e.path.join('.') : '',
      message: e.message,
    }));

    res.status(400).json({
      success: false,
      error: 'Error de validación de datos',
      details: formattedErrors,
    });
    return;
  }

  // 2. Custom App Operational Errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
    return;
  }

  // 3. Prisma Known Request Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    logger.error(`[Prisma Error ${err.code}]:`, err.message);

    if (err.code === 'P2002') {
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'campo';
      res.status(409).json({
        success: false,
        error: `Ya existe un registro con el valor especificado para: ${target}`,
      });
      return;
    }

    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        error: 'El recurso solicitado no fue encontrado en la base de datos',
      });
      return;
    }

    res.status(400).json({
      success: false,
      error: 'Error en la operación de base de datos',
    });
    return;
  }

  // 4. Unexpected / Unhandled Errors
  logger.error('Unhandled Server Error:', {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(500).json({
    success: false,
    error: isProduction ? 'Error interno del servidor' : err.message || 'Error interno del servidor',
    ...(!isProduction && err.stack ? { stack: err.stack } : {}),
  });
}
