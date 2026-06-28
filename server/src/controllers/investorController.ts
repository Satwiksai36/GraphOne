import { Request, Response, NextFunction } from 'express';
import { InvestorService } from '../services/investorService';
import { sendSuccess } from '../utils/response';

export class InvestorController {
  static async getInvestors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await InvestorService.getInvestors(req.query);
      sendSuccess(res, result, 'Investors fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getInvestorBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await InvestorService.getInvestorBySlug(req.params.slug);
      sendSuccess(res, result, 'Investor details fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getTrendingInvestors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 6;
      const result = await InvestorService.getTrendingInvestors(limit);
      sendSuccess(res, result, 'Trending investors fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getFeaturedInvestors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 6;
      const result = await InvestorService.getFeaturedInvestors(limit);
      sendSuccess(res, result, 'Featured investors fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getInvestorPortfolio(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await InvestorService.getInvestorPortfolio(req.params.slug);
      sendSuccess(res, result, 'Investor portfolio companies fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getInvestorInvestments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await InvestorService.getInvestorInvestments(req.params.slug);
      sendSuccess(res, result, 'Investor recent investments fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getRelatedInvestors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 4;
      const result = await InvestorService.getRelatedInvestors(req.params.slug, limit);
      sendSuccess(res, result, 'Related investors fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
