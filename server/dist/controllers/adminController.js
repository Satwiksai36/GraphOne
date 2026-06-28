"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const companyRepository_1 = require("../repositories/companyRepository");
const productRepository_1 = require("../repositories/productRepository");
const investorRepository_1 = require("../repositories/investorRepository");
const response_1 = require("../utils/response");
const cache_1 = require("../utils/cache");
class AdminController {
    // Company CRUD
    static async createCompany(req, res, next) {
        try {
            const company = await companyRepository_1.CompanyRepository.create(req.body);
            (0, cache_1.flushCache)(); // invalidate cache
            (0, response_1.sendSuccess)(res, company, 'Company created successfully', 201);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateCompany(req, res, next) {
        try {
            const company = await companyRepository_1.CompanyRepository.update(req.params.id, req.body);
            (0, cache_1.flushCache)();
            (0, response_1.sendSuccess)(res, company, 'Company updated successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteCompany(req, res, next) {
        try {
            await companyRepository_1.CompanyRepository.delete(req.params.id);
            (0, cache_1.flushCache)();
            (0, response_1.sendSuccess)(res, null, 'Company deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
    // Product CRUD
    static async createProduct(req, res, next) {
        try {
            const product = await productRepository_1.ProductRepository.create(req.body);
            (0, cache_1.flushCache)();
            (0, response_1.sendSuccess)(res, product, 'Product created successfully', 201);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateProduct(req, res, next) {
        try {
            const product = await productRepository_1.ProductRepository.update(req.params.id, req.body);
            (0, cache_1.flushCache)();
            (0, response_1.sendSuccess)(res, product, 'Product updated successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteProduct(req, res, next) {
        try {
            await productRepository_1.ProductRepository.delete(req.params.id);
            (0, cache_1.flushCache)();
            (0, response_1.sendSuccess)(res, null, 'Product deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
    // Investor CRUD
    static async createInvestor(req, res, next) {
        try {
            const investor = await investorRepository_1.InvestorRepository.create(req.body);
            (0, cache_1.flushCache)();
            (0, response_1.sendSuccess)(res, investor, 'Investor created successfully', 201);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateInvestor(req, res, next) {
        try {
            const investor = await investorRepository_1.InvestorRepository.update(req.params.id, req.body);
            (0, cache_1.flushCache)();
            (0, response_1.sendSuccess)(res, investor, 'Investor updated successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteInvestor(req, res, next) {
        try {
            await investorRepository_1.InvestorRepository.delete(req.params.id);
            (0, cache_1.flushCache)();
            (0, response_1.sendSuccess)(res, null, 'Investor deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
