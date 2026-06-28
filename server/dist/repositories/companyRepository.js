"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const db_1 = require("../config/db");
class CompanyRepository {
    static async findAll(params) {
        const { limit = 12, cursor, sortBy = 'name', sortOrder = 'asc', stage, category, hq, search, isTrending, isFeatured } = params;
        const where = {};
        if (stage && stage !== 'All') {
            where.stage = { contains: stage, mode: 'insensitive' };
        }
        if (category && category !== 'All') {
            where.category = { contains: category, mode: 'insensitive' };
        }
        if (hq && hq !== 'All') {
            where.hq = { contains: hq, mode: 'insensitive' };
        }
        if (isTrending !== undefined) {
            where.isTrending = isTrending;
        }
        if (isFeatured !== undefined) {
            where.isFeatured = isFeatured;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { tagline: { contains: search, mode: 'insensitive' } },
                { tags: { has: search } }
            ];
        }
        const orderBy = {};
        if (sortBy === 'valuation') {
            orderBy.valuation = sortOrder;
        }
        else if (sortBy === 'fundingTotal') {
            orderBy.fundingTotal = sortOrder;
        }
        else if (sortBy === 'growthScore' || sortBy === 'growthRate') {
            orderBy.growthRate = sortOrder;
        }
        else if (sortBy === 'createdAt') {
            orderBy.createdAt = sortOrder;
        }
        else {
            orderBy.name = sortOrder;
        }
        const take = limit + 1; // Fetch one extra to determine if there is a next page
        const queryOptions = {
            where,
            orderBy,
            take,
            include: {
                founders: true,
                fundingRounds: true,
                products: true
            }
        };
        if (cursor) {
            queryOptions.cursor = { id: cursor };
            queryOptions.skip = 1; // Skip the cursor itself
        }
        const items = await db_1.prisma.company.findMany(queryOptions);
        let nextCursor = undefined;
        if (items.length > limit) {
            const nextItem = items.pop();
            nextCursor = nextItem?.id;
        }
        return {
            items,
            nextCursor
        };
    }
    static async findBySlug(slug) {
        return db_1.prisma.company.findUnique({
            where: { slug },
            include: {
                founders: true,
                products: true,
                news: true,
                fundingRounds: true,
                researchPapers: true,
                patents: true,
                acquisitions: true,
                investments: true,
                timeline: true,
                competitors: {
                    include: {
                        competitor: true
                    }
                },
                investors: {
                    include: {
                        investor: true
                    }
                }
            }
        });
    }
    static async findById(id) {
        return db_1.prisma.company.findUnique({
            where: { id },
            include: {
                founders: true,
                products: true,
                news: true,
                fundingRounds: true,
                researchPapers: true,
                patents: true,
                acquisitions: true,
                investments: true,
                timeline: true,
                competitors: {
                    include: {
                        competitor: true
                    }
                },
                investors: {
                    include: {
                        investor: true
                    }
                }
            }
        });
    }
    static async findTrending(limit = 5) {
        return db_1.prisma.company.findMany({
            where: { isTrending: true },
            orderBy: { trendingRank: 'asc' },
            take: limit,
            include: {
                founders: true,
                products: true
            }
        });
    }
    static async findFeatured(limit = 5) {
        return db_1.prisma.company.findMany({
            where: { isFeatured: true },
            take: limit
        });
    }
    static async findByCategory(category, limit = 10) {
        return db_1.prisma.company.findMany({
            where: { category: { contains: category, mode: 'insensitive' } },
            take: limit
        });
    }
    static async search(query, limit = 10) {
        return db_1.prisma.company.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { tagline: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } }
                ]
            },
            take: limit
        });
    }
    static async findSimilar(slug, limit = 4) {
        const target = await db_1.prisma.company.findUnique({ where: { slug } });
        if (!target)
            return [];
        return db_1.prisma.company.findMany({
            where: {
                category: target.category,
                id: { not: target.id }
            },
            take: limit
        });
    }
    static async findAllFundingRounds() {
        return db_1.prisma.fundingRound.findMany({
            orderBy: { date: 'desc' }
        });
    }
    static async count() {
        return db_1.prisma.company.count();
    }
    static async create(data) {
        return db_1.prisma.company.create({
            data
        });
    }
    static async update(id, data) {
        return db_1.prisma.company.update({
            where: { id },
            data
        });
    }
    static async delete(id) {
        return db_1.prisma.company.delete({
            where: { id }
        });
    }
}
exports.CompanyRepository = CompanyRepository;
