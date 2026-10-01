// ═══════════════════════════════════════════
// ANATHEA — Anatomy Controller
// ═══════════════════════════════════════════

import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

export const getSystems = async (req: Request, res: Response) => {
  try {
    const systems = await prisma.anatomicalSystem.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(systems);
  } catch (error) {
    logger.error('Error fetching anatomical systems:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSystemBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const system = await prisma.anatomicalSystem.findUnique({
      where: { slug },
      include: {
        organs: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!system) {
      return res.status(404).json({ error: 'System not found' });
    }

    res.json(system);
  } catch (error) {
    logger.error(`Error fetching system ${slug}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


