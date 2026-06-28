import { prisma } from '../config/db';

export class InvestorRepository {
  static async findAll(params: {
    limit?: number;
    cursor?: string;
    search?: string;
    stage?: string;
    location?: string;
  }) {
    const { limit = 12, cursor, search, stage, location } = params;

    const where: any = {};

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

    const queryOptions: any = {
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

    const items = await prisma.investor.findMany(queryOptions);

    let nextCursor: string | undefined = undefined;
    if (items.length > limit) {
      const nextItem = items.pop();
      nextCursor = nextItem?.id;
    }

    return {
      items,
      nextCursor
    };
  }

  static async findBySlug(slug: string) {
    return prisma.investor.findUnique({
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

  static async findById(id: string) {
    return prisma.investor.findUnique({
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
    return prisma.investor.findMany({
      where: { isVerified: true },
      orderBy: { foundedYear: 'asc' },
      take: limit
    });
  }

  static async findFeatured(limit = 6) {
    return prisma.investor.findMany({
      where: { isVerified: true },
      take: limit
    });
  }

  static async findRelated(slug: string, limit = 4) {
    const target = await prisma.investor.findUnique({ where: { slug } });
    if (!target) return [];

    return prisma.investor.findMany({
      where: {
        location: target.location,
        id: { not: target.id }
      },
      take: limit
    });
  }

  static async count() {
    return prisma.investor.count();
  }

  static async create(data: any) {
    return prisma.investor.create({ data });
  }

  static async update(id: string, data: any) {
    return prisma.investor.update({
      where: { id },
      data
    });
  }

  static async delete(id: string) {
    return prisma.investor.delete({
      where: { id }
    });
  }
}
