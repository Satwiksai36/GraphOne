import { prisma } from '../config/db';

export class FounderRepository {
  static async search(query: string, limit = 10) {
    return prisma.founder.findMany({
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
