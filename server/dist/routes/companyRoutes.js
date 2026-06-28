"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyController_1 = require("../controllers/companyController");
const cache_1 = require("../utils/cache");
const router = (0, express_1.Router)();
// Static / Specific routes
router.get('/trending', (0, cache_1.cacheMiddleware)(300), companyController_1.CompanyController.getTrendingCompanies);
router.get('/featured', companyController_1.CompanyController.getFeaturedCompanies);
router.get('/category/:category', companyController_1.CompanyController.getCompaniesByCategory);
router.get('/funding-rounds', companyController_1.CompanyController.getAllFundingRounds);
// Parameterized detail routes
router.get('/:slug', companyController_1.CompanyController.getCompanyBySlug);
router.get('/:slug/products', companyController_1.CompanyController.getCompanyProducts);
router.get('/:slug/investors', companyController_1.CompanyController.getCompanyInvestors);
router.get('/:slug/funding', companyController_1.CompanyController.getCompanyFunding);
router.get('/:slug/founders', companyController_1.CompanyController.getCompanyFounders);
router.get('/:slug/news', companyController_1.CompanyController.getCompanyNews);
router.get('/:slug/similar', companyController_1.CompanyController.getSimilarCompanies);
// General listing route (support pagination/filters)
router.get('/', companyController_1.CompanyController.getCompanies);
exports.default = router;
