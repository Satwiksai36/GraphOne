"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const bookmarkController_1 = require("../controllers/bookmarkController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const validationSchemas_1 = require("../schemas/validationSchemas");
const router = (0, express_1.Router)();
router.post('/register', (0, validationMiddleware_1.validateBody)(validationSchemas_1.registerSchema), authController_1.AuthController.register);
router.post('/login', (0, validationMiddleware_1.validateBody)(validationSchemas_1.loginSchema), authController_1.AuthController.login);
router.get('/me', authMiddleware_1.protect, authController_1.AuthController.getProfile);
// Bookmark routes
router.get('/bookmarks', authMiddleware_1.protect, bookmarkController_1.BookmarkController.getBookmarks);
router.post('/bookmarks', authMiddleware_1.protect, bookmarkController_1.BookmarkController.addBookmark);
router.delete('/bookmarks/:itemType/:itemId', authMiddleware_1.protect, bookmarkController_1.BookmarkController.removeBookmark);
exports.default = router;
