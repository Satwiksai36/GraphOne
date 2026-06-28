"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const newsRepository_1 = require("../repositories/newsRepository");
class NewsService {
    static async getNews(limit = 150) {
        return newsRepository_1.NewsRepository.findAll(limit);
    }
    static async getTrendingNews(limit = 10) {
        return newsRepository_1.NewsRepository.findTrending(limit);
    }
    static async getNewsByCompany(slug, limit = 10) {
        return newsRepository_1.NewsRepository.findByCompanySlug(slug, limit);
    }
}
exports.NewsService = NewsService;
