import { Request, Response, NextFunction } from 'express';
import { NewsService } from '../services/newsService';
import { sendSuccess } from '../utils/response';

export class NewsController {
  static async getNews(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 150;
      const result = await NewsService.getNews(limit);
      sendSuccess(res, result, 'News articles fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getTrendingNews(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const result = await NewsService.getTrendingNews(limit);
      sendSuccess(res, result, 'Trending news articles fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getNewsByCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const result = await NewsService.getNewsByCompany(req.params.slug, limit);
      sendSuccess(res, result, `News articles for company ${req.params.slug} fetched successfully`);
    } catch (error) {
      next(error);
    }
  }
}
