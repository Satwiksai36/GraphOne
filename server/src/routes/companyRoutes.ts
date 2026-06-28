import { Router } from 'express';
import { CompanyController } from '../controllers/companyController';
import { cacheMiddleware } from '../utils/cache';

const router = Router();

// Static / Specific routes
router.get('/trending', cacheMiddleware(300), CompanyController.getTrendingCompanies);
router.get('/featured', CompanyController.getFeaturedCompanies);
router.get('/category/:category', CompanyController.getCompaniesByCategory);
router.get('/funding-rounds', CompanyController.getAllFundingRounds);

// Parameterized detail routes
router.get('/:slug', CompanyController.getCompanyBySlug);
router.get('/:slug/products', CompanyController.getCompanyProducts);
router.get('/:slug/investors', CompanyController.getCompanyInvestors);
router.get('/:slug/funding', CompanyController.getCompanyFunding);
router.get('/:slug/founders', CompanyController.getCompanyFounders);
router.get('/:slug/news', CompanyController.getCompanyNews);
router.get('/:slug/similar', CompanyController.getSimilarCompanies);

// General listing route (support pagination/filters)
router.get('/', CompanyController.getCompanies);

export default router;
