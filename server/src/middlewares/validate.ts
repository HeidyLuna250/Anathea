// ═══════════════════════════════════════════
// ANATHEA — Request Validation Middleware (Zod)
// ═══════════════════════════════════════════

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export interface RequestValidators {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export function validate(schemas: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params) as Record<string, string>;
      }
      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query) as any;
      }
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        next(error);
      }
    }
  };
}
