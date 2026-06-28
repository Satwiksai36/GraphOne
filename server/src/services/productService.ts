import { ProductRepository } from '../repositories/productRepository';

export class ProductService {
  static async getProducts(query: any) {
    const limit = query.limit ? parseInt(query.limit, 10) : 20;
    const cursor = query.cursor;
    const search = query.search;
    const category = query.category;
    const sortBy = query.sortBy;

    return ProductRepository.findAll({
      limit,
      cursor,
      search,
      category,
      sortBy
    });
  }

  static async getProductBySlug(slug: string) {
    const product = await ProductRepository.findById(slug);
    if (!product) {
      const error: any = new Error(`Product with ID '${slug}' not found`);
      error.statusCode = 404;
      error.code = 'PRODUCT_NOT_FOUND';
      throw error;
    }
    return product;
  }

  static async getTrendingProducts(limit?: number) {
    return ProductRepository.findTrending(limit);
  }

  static async getPopularProducts(limit?: number) {
    return ProductRepository.findPopular(limit);
  }
}
