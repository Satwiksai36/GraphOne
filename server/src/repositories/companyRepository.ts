import { prisma } from '../config/db';

export class CompanyRepository {
  static async findAll(params: {
    limit?: number;
    cursor?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    stage?: string;
    category?: string;
    hq?: string;
    search?: string;
    isTrending?: boolean;
    isFeatured?: boolean;
  }) {
    const {
      limit = 12,
      cursor,
      sortBy = 'name',
      sortOrder = 'asc',
      stage,
      category,
      hq,
      search,
      isTrending,
      isFeatured
    } = params;

    const where: any = {};

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

    const orderBy: any = {};
    if (sortBy === 'valuation') {
      orderBy.valuation = sortOrder;
    } else if (sortBy === 'fundingTotal') {
      orderBy.fundingTotal = sortOrder;
    } else if (sortBy === 'growthScore' || sortBy === 'growthRate') {
      orderBy.growthRate = sortOrder;
    } else if (sortBy === 'createdAt') {
      orderBy.createdAt = sortOrder;
    } else {
      orderBy.name = sortOrder;
    }

    const take = limit + 1; // Fetch one extra to determine if there is a next page

    const queryOptions: any = {
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

    const items = await prisma.company.findMany(queryOptions);

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
    return prisma.company.findUnique({
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

  static async findById(id: string) {
    return prisma.company.findUnique({
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
    return prisma.company.findMany({
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
    return prisma.company.findMany({
      where: { isFeatured: true },
      take: limit
    });
  }

  static async findByCategory(category: string, limit = 10) {
    return prisma.company.findMany({
      where: { category: { contains: category, mode: 'insensitive' } },
      take: limit
    });
  }

  static async search(query: string, limit = 10) {
    return prisma.company.findMany({
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

  static async findSimilar(slug: string, limit = 4) {
    const target = await prisma.company.findUnique({ where: { slug } });
    if (!target) return [];

    return prisma.company.findMany({
      where: {
        category: target.category,
        id: { not: target.id }
      },
      take: limit
    });
  }

  static async findAllFundingRounds() {
    return prisma.fundingRound.findMany({
      orderBy: { date: 'desc' }
    });
  }

  static async count() {
    return prisma.company.count();
  }

  static async create(data: any) {
    return prisma.company.create({
      data
    });
  }

  static async update(id: string, data: any) {
    return prisma.company.update({
      where: { id },
      data
    });
  }

  static async delete(id: string) {
    return prisma.company.delete({
      where: { id }
    });
  }
}
