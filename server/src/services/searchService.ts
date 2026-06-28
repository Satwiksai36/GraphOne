import { CompanyRepository } from '../repositories/companyRepository';
import { InvestorRepository } from '../repositories/investorRepository';
import { ProductRepository } from '../repositories/productRepository';
import { FounderRepository } from '../repositories/founderRepository';
import { prisma } from '../config/db';
import { mapCompanyToFrontend } from './companyService';
import { mapInvestorToFrontend } from './investorService';

export class SearchService {
  static async globalSearch(query: string, userId?: string) {
    if (!query) {
      return {
        companies: [],
        investors: [],
        products: [],
        founders: []
      };
    }

    const [companiesRes, investorsRes, productsRes, foundersRes] = await Promise.all([
      CompanyRepository.search(query, 6),
      InvestorRepository.findAll({ search: query, limit: 6 }),
      ProductRepository.findAll({ search: query, limit: 6 }),
      FounderRepository.search(query, 6)
    ]);

    // If userId is provided, save to search history
    if (userId) {
      try {
        await prisma.searchHistory.create({
          data: {
            userId,
            query
          }
        });
      } catch (err) {
        console.error('Failed to log search history:', err);
      }
    }

    return {
      companies: companiesRes.map(mapCompanyToFrontend),
      investors: investorsRes.items.map(mapInvestorToFrontend),
      products: productsRes.items,
      founders: foundersRes
    };
  }

  static async getSearchHistory(userId: string) {
    return prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });
  }

  static async clearSearchHistory(userId: string) {
    return prisma.searchHistory.deleteMany({
      where: { userId }
    });
  }
}
