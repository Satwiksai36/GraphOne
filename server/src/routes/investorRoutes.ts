import { Router } from 'express';
import { InvestorController } from '../controllers/investorController';
import { cacheMiddleware } from '../utils/cache';

const router = Router();

// Static routes
router.get('/trending', cacheMiddleware(300), InvestorController.getTrendingInvestors);
router.get('/featured', InvestorController.getFeaturedInvestors);

// Parameterized routes
router.get('/:slug', InvestorController.getInvestorBySlug);
router.get('/:slug/investments', InvestorController.getInvestorInvestments);
router.get('/:slug/portfolio', InvestorController.getInvestorPortfolio);
router.get('/:slug/related', InvestorController.getRelatedInvestors);

// General listing route
router.get('/', InvestorController.getInvestors);

export default router;
