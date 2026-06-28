"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const companyService_1 = require("../services/companyService");
const response_1 = require("../utils/response");
class CompanyController {
    static async getCompanies(req, res, next) {
        try {
            const result = await companyService_1.CompanyService.getCompanies(req.query);
            (0, response_1.sendSuccess)(res, result, 'Companies fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getCompanyBySlug(req, res, next) {
        try {
            const result = await companyService_1.CompanyService.getCompanyBySlug(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Company details fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getTrendingCompanies(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 5;
            const result = await companyService_1.CompanyService.getTrendingCompanies(limit);
            (0, response_1.sendSuccess)(res, result, 'Trending companies fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getFeaturedCompanies(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 5;
            const result = await companyService_1.CompanyService.getFeaturedCompanies(limit);
            (0, response_1.sendSuccess)(res, result, 'Featured companies fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getCompaniesByCategory(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
            const result = await companyService_1.CompanyService.getCompaniesByCategory(req.params.category, limit);
            (0, response_1.sendSuccess)(res, result, `Companies in category ${req.params.category} fetched successfully`);
        }
        catch (error) {
            next(error);
        }
    }
    static async getCompanyProducts(req, res, next) {
        try {
            const result = await companyService_1.CompanyService.getCompanyProducts(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Company products fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getCompanyInvestors(req, res, next) {
        try {
            const result = await companyService_1.CompanyService.getCompanyInvestors(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Company investors fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getCompanyFunding(req, res, next) {
        try {
            const result = await companyService_1.CompanyService.getCompanyFunding(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Company funding rounds fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getCompanyFounders(req, res, next) {
        try {
            const result = await companyService_1.CompanyService.getCompanyFounders(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Company founders fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getCompanyNews(req, res, next) {
        try {
            const result = await companyService_1.CompanyService.getCompanyNews(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Company news articles fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllFundingRounds(_req, res, next) {
        try {
            const result = await companyService_1.CompanyService.getAllFundingRounds();
            (0, response_1.sendSuccess)(res, result, 'All funding rounds fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getSimilarCompanies(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 4;
            const result = await companyService_1.CompanyService.getSimilarCompanies(req.params.slug, limit);
            (0, response_1.sendSuccess)(res, result, 'Similar companies fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CompanyController = CompanyController;
