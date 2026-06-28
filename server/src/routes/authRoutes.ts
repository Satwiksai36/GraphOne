import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { BookmarkController } from '../controllers/bookmarkController';
import { protect } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validationMiddleware';
import { loginSchema, registerSchema } from '../schemas/validationSchemas';

const router = Router();

router.post('/register', validateBody(registerSchema), AuthController.register);
router.post('/login', validateBody(loginSchema), AuthController.login);
router.get('/me', protect, AuthController.getProfile);

// Bookmark routes
router.get('/bookmarks', protect, BookmarkController.getBookmarks);
router.post('/bookmarks', protect, BookmarkController.addBookmark);
router.delete('/bookmarks/:itemType/:itemId', protect, BookmarkController.removeBookmark);

export default router;
