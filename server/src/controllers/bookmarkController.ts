import { Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class BookmarkController {
  static async getBookmarks(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('Not authenticated');
      }

      const bookmarks = await prisma.bookmark.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });

      sendSuccess(res, bookmarks, 'Bookmarks fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async addBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('Not authenticated');
      }

      const { itemType, itemId } = req.body;
      if (!itemType || !itemId) {
        sendError(res, 'BAD_REQUEST', 'itemType and itemId are required', 400);
        return;
      }

      const bookmark = await prisma.bookmark.upsert({
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

      sendSuccess(res, bookmark, 'Bookmark added successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async removeBookmark(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new Error('Not authenticated');
      }

      const { itemType, itemId } = req.params;

      await prisma.bookmark.deleteMany({
        where: {
          userId,
          itemType,
          itemId
        }
      });

      sendSuccess(res, null, 'Bookmark removed successfully');
    } catch (error) {
      next(error);
    }
  }
}
