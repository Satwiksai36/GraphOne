"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkController = void 0;
const db_1 = require("../config/db");
const response_1 = require("../utils/response");
class BookmarkController {
    static async getBookmarks(req, res, next) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new Error('Not authenticated');
            }
            const bookmarks = await db_1.prisma.bookmark.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' }
            });
            (0, response_1.sendSuccess)(res, bookmarks, 'Bookmarks fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async addBookmark(req, res, next) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new Error('Not authenticated');
            }
            const { itemType, itemId } = req.body;
            if (!itemType || !itemId) {
                (0, response_1.sendError)(res, 'BAD_REQUEST', 'itemType and itemId are required', 400);
                return;
            }
            const bookmark = await db_1.prisma.bookmark.upsert({
                where: {
                    userId_itemType_itemId: {
                        userId,
                        itemType,
                        itemId
                    }
                },
                update: {},
                create: {
                    userId,
                    itemType,
                    itemId
                }
            });
            (0, response_1.sendSuccess)(res, bookmark, 'Bookmark added successfully', 201);
        }
        catch (error) {
            next(error);
        }
    }
    static async removeBookmark(req, res, next) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new Error('Not authenticated');
            }
            const { itemType, itemId } = req.params;
            await db_1.prisma.bookmark.deleteMany({
                where: {
                    userId,
                    itemType,
                    itemId
                }
            });
            (0, response_1.sendSuccess)(res, null, 'Bookmark removed successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BookmarkController = BookmarkController;
