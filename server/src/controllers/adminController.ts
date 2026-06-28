import { Response, NextFunction } from 'express';
import { CompanyRepository } from '../repositories/companyRepository';
import { ProductRepository } from '../repositories/productRepository';
import { InvestorRepository } from '../repositories/investorRepository';
import { sendSuccess } from '../utils/response';
import { flushCache } from '../utils/cache';
import { AuthenticatedRequest } from '../types';

export class AdminController {
  // Company CRUD
  static async createCompany(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const company = await CompanyRepository.create(req.body);
      flushCache(); // invalidate cache
      sendSuccess(res, company, 'Company created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateCompany(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const company = await CompanyRepository.update(req.params.id, req.body);
      flushCache();
      sendSuccess(res, company, 'Company updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteCompany(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await CompanyRepository.delete(req.params.id);
      flushCache();
      sendSuccess(res, null, 'Company deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  // Product CRUD
  static async createProduct(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductRepository.create(req.body);
      flushCache();
      sendSuccess(res, product, 'Product created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductRepository.update(req.params.id, req.body);
      flushCache();
      sendSuccess(res, product, 'Product updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await ProductRepository.delete(req.params.id);
      flushCache();
      sendSuccess(res, null, 'Product deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  // Investor CRUD
  static async createInvestor(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const investor = await InvestorRepository.create(req.body);
      flushCache();
      sendSuccess(res, investor, 'Investor created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateInvestor(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const investor = await InvestorRepository.update(req.params.id, req.body);
      flushCache();
      sendSuccess(res, investor, 'Investor updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteInvestor(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await InvestorRepository.delete(req.params.id);
      flushCache();
      sendSuccess(res, null, 'Investor deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
