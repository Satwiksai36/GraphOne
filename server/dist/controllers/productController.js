"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productService_1 = require("../services/productService");
const response_1 = require("../utils/response");
class ProductController {
    static async getProducts(req, res, next) {
        try {
            const result = await productService_1.ProductService.getProducts(req.query);
            (0, response_1.sendSuccess)(res, result, 'Products fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getProductBySlug(req, res, next) {
        try {
            const result = await productService_1.ProductService.getProductBySlug(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Product details fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getProductsByCategory(req, res, next) {
        try {
            const result = await productService_1.ProductService.getProducts({ ...req.query, category: req.params.category });
            (0, response_1.sendSuccess)(res, result, `Products in category ${req.params.category} fetched successfully`);
        }
        catch (error) {
            next(error);
        }
    }
    static async getTrendingProducts(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
            const result = await productService_1.ProductService.getTrendingProducts(limit);
            (0, response_1.sendSuccess)(res, result, 'Trending products fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getPopularProducts(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
            const result = await productService_1.ProductService.getPopularProducts(limit);
            (0, response_1.sendSuccess)(res, result, 'Popular products fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
