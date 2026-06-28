import { Router } from 'express';
import { StatsController } from '../controllers/statsController';
import { cacheMiddleware } from '../utils/cache';

const router = Router();

router.get('/', cacheMiddleware(300), StatsController.getStats);

export default router;
