import { Router } from 'express';
import { NewsController } from '../controllers/newsController';

const router = Router();

router.get('/trending', NewsController.getTrendingNews);
router.get('/company/:slug', NewsController.getNewsByCompany);
router.get('/', NewsController.getNews);

export default router;
