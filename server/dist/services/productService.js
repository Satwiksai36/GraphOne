"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const productRepository_1 = require("../repositories/productRepository");
class ProductService {
    static async getProducts(query) {
        const limit = query.limit ? parseInt(query.limit, 10) : 20;
        const cursor = query.cursor;
        const search = query.search;
        const category = query.category;
        const sortBy = query.sortBy;
        return productRepository_1.ProductRepository.findAll({
            limit,
            cursor,
            search,
            category,
            sortBy
        });
    }
    static async getProductBySlug(slug) {
        const product = await productRepository_1.ProductRepository.findById(slug);
        if (!product) {
            const error = new Error(`Product with ID '${slug}' not found`);
            error.statusCode = 404;
            error.code = 'PRODUCT_NOT_FOUND';
            throw error;
        }
        return product;
    }
    static async getTrendingProducts(limit) {
        return productRepository_1.ProductRepository.findTrending(limit);
    }
    static async getPopularProducts(limit) {
        return productRepository_1.ProductRepository.findPopular(limit);
    }
}
exports.ProductService = ProductService;
