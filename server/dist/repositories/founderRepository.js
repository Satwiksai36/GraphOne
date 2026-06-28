"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderRepository = void 0;
const db_1 = require("../config/db");
class FounderRepository {
    static async search(query, limit = 10) {
        return db_1.prisma.founder.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { role: { contains: query, mode: 'insensitive' } },
                    { bio: { contains: query, mode: 'insensitive' } }
                ]
            },
            take: limit,
            include: {
                companies: true
            }
        });
    }
}
exports.FounderRepository = FounderRepository;
