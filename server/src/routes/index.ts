import { Router } from 'express';
import authRoutes from './authRoutes';
import companyRoutes from './companyRoutes';
import investorRoutes from './investorRoutes';
import productRoutes from './productRoutes';
import newsRoutes from './newsRoutes';
import searchRoutes from './searchRoutes';
import statsRoutes from './statsRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/investors', investorRoutes);
router.use('/products', productRoutes);
router.use('/news', newsRoutes);
router.use('/search', searchRoutes);
router.use('/stats', statsRoutes);
router.use('/admin', adminRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

export default router;
