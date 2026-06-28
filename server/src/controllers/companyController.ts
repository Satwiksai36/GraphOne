import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/companyService';
import { sendSuccess } from '../utils/response';

export class CompanyController {
  static async getCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await CompanyService.getCompanies(req.query);
      sendSuccess(res, result, 'Companies fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getCompanyBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await CompanyService.getCompanyBySlug(req.params.slug);
      sendSuccess(res, result, 'Company details fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getTrendingCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;
      const result = await CompanyService.getTrendingCompanies(limit);
      sendSuccess(res, result, 'Trending companies fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getFeaturedCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;
      const result = await CompanyService.getFeaturedCompanies(limit);
      sendSuccess(res, result, 'Featured companies fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getCompaniesByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const result = await CompanyService.getCompaniesByCategory(req.params.category, limit);
      sendSuccess(res, result, `Companies in category ${req.params.category} fetched successfully`);
    } catch (error) {
      next(error);
    }
  }

  static async getCompanyProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await CompanyService.getCompanyProducts(req.params.slug);
      sendSuccess(res, result, 'Company products fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getCompanyInvestors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await CompanyService.getCompanyInvestors(req.params.slug);
      sendSuccess(res, result, 'Company investors fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getCompanyFunding(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await CompanyService.getCompanyFunding(req.params.slug);
      sendSuccess(res, result, 'Company funding rounds fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getCompanyFounders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await CompanyService.getCompanyFounders(req.params.slug);
      sendSuccess(res, result, 'Company founders fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getCompanyNews(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await CompanyService.getCompanyNews(req.params.slug);
      sendSuccess(res, result, 'Company news articles fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getAllFundingRounds(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await CompanyService.getAllFundingRounds();
      sendSuccess(res, result, 'All funding rounds fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getSimilarCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 4;
      const result = await CompanyService.getSimilarCompanies(req.params.slug, limit);
      sendSuccess(res, result, 'Similar companies fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
