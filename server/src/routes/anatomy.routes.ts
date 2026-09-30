// ═══════════════════════════════════════════
// ANATHEA — Anatomy Routes
// ═══════════════════════════════════════════

import { Router } from 'express';
import { getSystems, getSystemBySlug } from '../controllers/anatomy.controller';

const router = Router();

router.get('/systems', getSystems);
router.get('/systems/:slug', getSystemBySlug);

export default router;
