"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const cache_1 = require("../utils/cache");
const router = (0, express_1.Router)();
// Static routes
router.get('/trending', (0, cache_1.cacheMiddleware)(300), productController_1.ProductController.getTrendingProducts);
router.get('/popular', (0, cache_1.cacheMiddleware)(300), productController_1.ProductController.getPopularProducts);
router.get('/category/:category', productController_1.ProductController.getProductsByCategory);
// Parameterized detail route
router.get('/:slug', productController_1.ProductController.getProductBySlug);
// General listing route
router.get('/', productController_1.ProductController.getProducts);
exports.default = router;
