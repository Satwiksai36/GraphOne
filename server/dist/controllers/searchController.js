"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const searchService_1 = require("../services/searchService");
const response_1 = require("../utils/response");
class SearchController {
    static async globalSearch(req, res, next) {
        try {
            const q = req.query.q || '';
            const userId = req.user?.userId;
            const result = await searchService_1.SearchService.globalSearch(q, userId);
            (0, response_1.sendSuccess)(res, result, 'Global search results fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async getSearchHistory(req, res, next) {
        try {
            if (!req.user) {
                throw new Error('Not authenticated');
            }
            const result = await searchService_1.SearchService.getSearchHistory(req.user.userId);
            (0, response_1.sendSuccess)(res, result, 'Search history fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
    static async clearSearchHistory(req, res, next) {
        try {
            if (!req.user) {
                throw new Error('Not authenticated');
            }
            await searchService_1.SearchService.clearSearchHistory(req.user.userId);
            (0, response_1.sendSuccess)(res, null, 'Search history cleared successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SearchController = SearchController;
