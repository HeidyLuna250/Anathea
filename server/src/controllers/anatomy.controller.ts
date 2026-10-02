// ═══════════════════════════════════════════
// ANATHEA — Anatomy Controller
// ═══════════════════════════════════════════

import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { NotFoundError } from '../utils/errors';

export const getSystems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const systems = await prisma.anatomicalSystem.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(systems);
  } catch (error) {
    next(error);
  }
};

export const getSystemBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug);
    const system = await prisma.anatomicalSystem.findUnique({
      where: { slug },
      include: {
        organs: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!system) {
      throw new NotFoundError(`Sistema anatómico con slug '${slug}' no encontrado`);
    }

    res.json(system);
  } catch (error) {
    next(error);
  }
};


