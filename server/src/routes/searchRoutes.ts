import { Router } from 'express';
import { SearchController } from '../controllers/searchController';
import { protect } from '../middlewares/authMiddleware';
import { AuthenticatedRequest } from '../types';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const router = Router();

// Optional protection middleware inline/locally
const optionalProtect = async (req: AuthenticatedRequest, _res: any, next: any) => {
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as any;
      req.user = decoded;
    } catch (e) {}
  }
  next();
};

router.get('/history', protect, SearchController.getSearchHistory);
router.delete('/history', protect, SearchController.clearSearchHistory);
router.get('/', optionalProtect, SearchController.globalSearch);

export default router;
