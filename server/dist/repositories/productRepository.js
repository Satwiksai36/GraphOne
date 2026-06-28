"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const db_1 = require("../config/db");
class ProductRepository {
    static async findAll(params) {
        const { limit = 20, cursor, search, category, sortBy = 'trending' } = params;
        const where = {};
        if (category && category !== 'All') {
            where.categories = { has: category };
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { tagline: { contains: search, mode: 'insensitive' } },
                { tags: { has: search } }
            ];
        }
        const orderBy = {};
        if (sortBy === 'votes') {
            orderBy.votesCount = 'desc';
        }
        else if (sortBy === 'comments') {
            orderBy.commentsCount = 'desc';
        }
        else if (sortBy === 'newest') {
            orderBy.releaseDate = 'desc';
        }
        else {
            orderBy.votesCount = 'desc'; // fallback/trending
        }
        const take = limit + 1;
        const queryOptions = {
            where,
            orderBy,
            take,
            include: {
                company: true
            }
        };
        if (cursor) {
            queryOptions.cursor = { id: cursor };
            queryOptions.skip = 1;
        }
        const items = await db_1.prisma.product.findMany(queryOptions);
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
    static async findById(id) {
        return db_1.prisma.product.findUnique({
            where: { id },
            include: {
                company: true
            }
        });
    }
    static async findTrending(limit = 10) {
        return db_1.prisma.product.findMany({
            where: { isTrending: true },
            orderBy: { votesCount: 'desc' },
            take: limit,
            include: {
                company: true
            }
        });
    }
    static async findPopular(limit = 10) {
        return db_1.prisma.product.findMany({
            where: { isPopularRightNow: true },
            orderBy: { votesCount: 'desc' },
            take: limit,
            include: {
                company: true
            }
        });
    }
    static async count() {
        return db_1.prisma.product.count();
    }
    static async create(data) {
        return db_1.prisma.product.create({ data });
    }
    static async update(id, data) {
        return db_1.prisma.product.update({
            where: { id },
            data
        });
    }
    static async delete(id) {
        return db_1.prisma.product.delete({
            where: { id }
        });
    }
}
exports.ProductRepository = ProductRepository;
