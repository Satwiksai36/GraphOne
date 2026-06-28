import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/productService';
import { sendSuccess } from '../utils/response';

export class ProductController {
  static async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await ProductService.getProducts(req.query);
      sendSuccess(res, result, 'Products fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getProductBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await ProductService.getProductBySlug(req.params.slug);
      sendSuccess(res, result, 'Product details fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getProductsByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await ProductService.getProducts({ ...req.query, category: req.params.category });
      sendSuccess(res, result, `Products in category ${req.params.category} fetched successfully`);
    } catch (error) {
      next(error);
    }
  }

  static async getTrendingProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const result = await ProductService.getTrendingProducts(limit);
      sendSuccess(res, result, 'Trending products fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getPopularProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const result = await ProductService.getPopularProducts(limit);
      sendSuccess(res, result, 'Popular products fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
