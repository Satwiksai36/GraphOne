import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { cacheMiddleware } from '../utils/cache';

const router = Router();

// Static routes
router.get('/trending', cacheMiddleware(300), ProductController.getTrendingProducts);
router.get('/popular', cacheMiddleware(300), ProductController.getPopularProducts);
router.get('/category/:category', ProductController.getProductsByCategory);

// Parameterized detail route
router.get('/:slug', ProductController.getProductBySlug);

// General listing route
router.get('/', ProductController.getProducts);

export default router;
