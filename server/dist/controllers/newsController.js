"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const newsService_1 = require("../services/newsService");
const response_1 = require("../utils/response");
class NewsController {
    static async getNews(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 150;
            const result = await newsService_1.NewsService.getNews(limit);
            (0, response_1.sendSuccess)(res, result, 'News articles fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getTrendingNews(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
            const result = await newsService_1.NewsService.getTrendingNews(limit);
            (0, response_1.sendSuccess)(res, result, 'Trending news articles fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getNewsByCompany(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
            const result = await newsService_1.NewsService.getNewsByCompany(req.params.slug, limit);
            (0, response_1.sendSuccess)(res, result, `News articles for company ${req.params.slug} fetched successfully`);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NewsController = NewsController;
