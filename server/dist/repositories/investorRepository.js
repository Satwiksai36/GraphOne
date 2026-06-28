"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorRepository = void 0;
const db_1 = require("../config/db");
class InvestorRepository {
    static async findAll(params) {
        const { limit = 12, cursor, search, stage, location } = params;
        const where = {};
        if (location && location !== 'All') {
            where.location = { contains: location, mode: 'insensitive' };
        }
        if (stage && stage !== 'All') {
            where.preferredStages = { has: stage };
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { bio: { contains: search, mode: 'insensitive' } },
                { thesis: { contains: search, mode: 'insensitive' } }
            ];
        }
        const take = limit + 1;
        const queryOptions = {
            where,
            orderBy: { name: 'asc' },
            take,
            include: {
                companies: {
                    include: {
                        company: true
                    }
                }
            }
        };
        if (cursor) {
            queryOptions.cursor = { id: cursor };
            queryOptions.skip = 1;
        }
        const items = await db_1.prisma.investor.findMany(queryOptions);
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
        return db_1.prisma.investor.findUnique({
            where: { slug },
            include: {
                companies: {
                    include: {
                        company: true
                    }
                }
            }
        });
    }
    static async findById(id) {
        return db_1.prisma.investor.findUnique({
            where: { id },
            include: {
                companies: {
                    include: {
                        company: true
                    }
                }
            }
        });
    }
    static async findTrending(limit = 6) {
        return db_1.prisma.investor.findMany({
            where: { isVerified: true },
            orderBy: { foundedYear: 'asc' },
            take: limit
        });
    }
    static async findFeatured(limit = 6) {
        return db_1.prisma.investor.findMany({
            where: { isVerified: true },
            take: limit
        });
    }
    static async findRelated(slug, limit = 4) {
        const target = await db_1.prisma.investor.findUnique({ where: { slug } });
        if (!target)
            return [];
        return db_1.prisma.investor.findMany({
            where: {
                location: target.location,
                id: { not: target.id }
            },
            take: limit
        });
    }
    static async count() {
        return db_1.prisma.investor.count();
    }
    static async create(data) {
        return db_1.prisma.investor.create({ data });
    }
    static async update(id, data) {
        return db_1.prisma.investor.update({
            where: { id },
            data
        });
    }
    static async delete(id) {
        return db_1.prisma.investor.delete({
            where: { id }
        });
    }
}
exports.InvestorRepository = InvestorRepository;
