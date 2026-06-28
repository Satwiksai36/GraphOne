import { prisma } from '../config/db';

export class ProductRepository {
  static async findAll(params: {
    limit?: number;
    cursor?: string;
    search?: string;
    category?: string;
    sortBy?: 'votes' | 'comments' | 'trending' | 'newest';
  }) {
    const { limit = 20, cursor, search, category, sortBy = 'trending' } = params;

    const where: any = {};

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

    const orderBy: any = {};
    if (sortBy === 'votes') {
      orderBy.votesCount = 'desc';
    } else if (sortBy === 'comments') {
      orderBy.commentsCount = 'desc';
    } else if (sortBy === 'newest') {
      orderBy.releaseDate = 'desc';
    } else {
      orderBy.votesCount = 'desc'; // fallback/trending
    }

    const take = limit + 1;

    const queryOptions: any = {
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

    const items = await prisma.product.findMany(queryOptions);

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

  static async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        company: true
      }
    });
  }

  static async findTrending(limit = 10) {
    return prisma.product.findMany({
      where: { isTrending: true },
      orderBy: { votesCount: 'desc' },
      take: limit,
      include: {
        company: true
      }
    });
  }

  static async findPopular(limit = 10) {
    return prisma.product.findMany({
      where: { isPopularRightNow: true },
      orderBy: { votesCount: 'desc' },
      take: limit,
      include: {
        company: true
      }
    });
  }

  static async count() {
    return prisma.product.count();
  }

  static async create(data: any) {
    return prisma.product.create({ data });
  }

  static async update(id: string, data: any) {
    return prisma.product.update({
      where: { id },
      data
    });
  }

  static async delete(id: string) {
    return prisma.product.delete({
      where: { id }
    });
  }
}
