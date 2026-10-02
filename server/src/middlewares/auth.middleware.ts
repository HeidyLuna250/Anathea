// ═══════════════════════════════════════════
// ANATHEA — Authentication & Authorization Middleware
// ═══════════════════════════════════════════

import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/auth';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { prisma } from '../utils/prisma';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  roleId: string;
  role: {
    name: string;
    permissions: any;
  };
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token de autenticación no proporcionado');
    }

    const token = authHeader.split(' ')[1];
    let payload: TokenPayload;

    try {
      payload = verifyToken(token);
    } catch {
      throw new UnauthorizedError('Token de autenticación inválido o expirado');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        roleId: true,
        isActive: true,
        role: {
          select: {
            name: true,
            permissions: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedError('Usuario no encontrado o cuenta desactivada');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Se requiere autenticación'));
    }

    if (!allowedRoles.includes(req.user.role.name)) {
      return next(new ForbiddenError('No tienes los permisos necesarios para realizar esta acción'));
    }

    next();
  };
}
