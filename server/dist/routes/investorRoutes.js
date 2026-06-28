"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const investorController_1 = require("../controllers/investorController");
const cache_1 = require("../utils/cache");
const router = (0, express_1.Router)();
// Static routes
router.get('/trending', (0, cache_1.cacheMiddleware)(300), investorController_1.InvestorController.getTrendingInvestors);
router.get('/featured', investorController_1.InvestorController.getFeaturedInvestors);
// Parameterized routes
router.get('/:slug', investorController_1.InvestorController.getInvestorBySlug);
router.get('/:slug/investments', investorController_1.InvestorController.getInvestorInvestments);
router.get('/:slug/portfolio', investorController_1.InvestorController.getInvestorPortfolio);
router.get('/:slug/related', investorController_1.InvestorController.getRelatedInvestors);
// General listing route
router.get('/', investorController_1.InvestorController.getInvestors);
exports.default = router;
