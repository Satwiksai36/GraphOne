"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorController = void 0;
const investorService_1 = require("../services/investorService");
const response_1 = require("../utils/response");
class InvestorController {
    static async getInvestors(req, res, next) {
        try {
            const result = await investorService_1.InvestorService.getInvestors(req.query);
            (0, response_1.sendSuccess)(res, result, 'Investors fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getInvestorBySlug(req, res, next) {
        try {
            const result = await investorService_1.InvestorService.getInvestorBySlug(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Investor details fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getTrendingInvestors(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;
            const result = await investorService_1.InvestorService.getTrendingInvestors(limit);
            (0, response_1.sendSuccess)(res, result, 'Trending investors fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getFeaturedInvestors(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;
            const result = await investorService_1.InvestorService.getFeaturedInvestors(limit);
            (0, response_1.sendSuccess)(res, result, 'Featured investors fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getInvestorPortfolio(req, res, next) {
        try {
            const result = await investorService_1.InvestorService.getInvestorPortfolio(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Investor portfolio companies fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getInvestorInvestments(req, res, next) {
        try {
            const result = await investorService_1.InvestorService.getInvestorInvestments(req.params.slug);
            (0, response_1.sendSuccess)(res, result, 'Investor recent investments fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getRelatedInvestors(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 4;
            const result = await investorService_1.InvestorService.getRelatedInvestors(req.params.slug, limit);
            (0, response_1.sendSuccess)(res, result, 'Related investors fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.InvestorController = InvestorController;
