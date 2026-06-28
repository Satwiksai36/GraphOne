"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepository = void 0;
const db_1 = require("../config/db");
class NewsRepository {
    static async findAll(limit = 30) {
        return db_1.prisma.news.findMany({
            orderBy: { date: 'desc' },
            take: limit,
            include: {
                company: true
            }
        });
    }
    static async findByCompanySlug(companySlug, limit = 10) {
        return db_1.prisma.news.findMany({
            where: {
                company: {
                    slug: companySlug
                }
            },
            orderBy: { date: 'desc' },
            take: limit,
            include: {
                company: true
            }
        });
    }
    static async findTrending(limit = 10) {
        return db_1.prisma.news.findMany({
            orderBy: { date: 'desc' },
            take: limit,
            include: {
                company: true
            }
        });
    }
    static async count() {
        return db_1.prisma.news.count();
    }
}
exports.NewsRepository = NewsRepository;
