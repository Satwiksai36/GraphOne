import { Response, NextFunction } from 'express';
import { SearchService } from '../services/searchService';
import { sendSuccess } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class SearchController {
  static async globalSearch(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = req.query.q as string || '';
      const userId = req.user?.userId;
      const result = await SearchService.globalSearch(q, userId);
      sendSuccess(res, result, 'Global search results fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getSearchHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new Error('Not authenticated');
      }
      const result = await SearchService.getSearchHistory(req.user.userId);
      sendSuccess(res, result, 'Search history fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async clearSearchHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new Error('Not authenticated');
      }
      await SearchService.clearSearchHistory(req.user.userId);
      sendSuccess(res, null, 'Search history cleared successfully');
    } catch (error) {
      next(error);
    }
  }
}
