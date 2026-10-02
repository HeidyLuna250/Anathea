// ═══════════════════════════════════════════
// ANATHEA — Anatomy Routes
// ═══════════════════════════════════════════

import { Router } from 'express';
import { getSystems, getSystemBySlug } from '../controllers/anatomy.controller';
import { validate } from '../middlewares/validate';
import { systemSlugParamSchema } from '../schemas/anatomy.schema';

const router = Router();

router.get('/systems', getSystems);
router.get('/systems/:slug', validate({ params: systemSlugParamSchema }), getSystemBySlug);

export default router;
