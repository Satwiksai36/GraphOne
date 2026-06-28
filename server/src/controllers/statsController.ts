import { Request, Response, NextFunction } from 'express';
import { StatsService } from '../services/statsService';
import { sendSuccess } from '../utils/response';

export class StatsController {
  static async getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await StatsService.getStats();
      sendSuccess(res, result, 'Dashboard stats fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
