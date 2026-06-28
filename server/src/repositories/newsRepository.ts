import { prisma } from '../config/db';

export class NewsRepository {
  static async findAll(limit = 30) {
    return prisma.news.findMany({
      orderBy: { date: 'desc' },
      take: limit,
      include: {
        company: true
      }
    });
  }

  static async findByCompanySlug(companySlug: string, limit = 10) {
    return prisma.news.findMany({
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
    return prisma.news.findMany({
      orderBy: { date: 'desc' },
      take: limit,
      include: {
        company: true
      }
    });
  }

  static async count() {
    return prisma.news.count();
  }
}
