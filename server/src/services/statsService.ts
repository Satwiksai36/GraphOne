import { CompanyRepository } from '../repositories/companyRepository';
import { InvestorRepository } from '../repositories/investorRepository';
import { ProductRepository } from '../repositories/productRepository';
import { NewsRepository } from '../repositories/newsRepository';
import { prisma } from '../config/db';
import { mapCompanyToFrontend } from './companyService';

export class StatsService {
  static async getStats() {
    const [companiesCount, investorCount, productsCount, newsCount, trendingCompanies] = await Promise.all([
      CompanyRepository.count(),
      InvestorRepository.count(),
      ProductRepository.count(),
      NewsRepository.count(),
      CompanyRepository.findTrending(5)
    ]);

    // Fetch all funding rounds and compute total sum
    const rounds = await prisma.fundingRound.findMany({ select: { amount: true } });
    let totalAmountFloat = 0;
    rounds.forEach((r: any) => {
      const num = parseFloat(r.amount.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) {
        const multiplier = r.amount.includes('B') ? 1000 : 1;
        totalAmountFloat += (num * multiplier);
      }
    });

    const fundingTotal = `$${(totalAmountFloat / 1000).toFixed(1)}B`;

    return {
      companiesCount,
      investorCount,
      fundingTotal,
      productsCount,
      latestNewsCount: newsCount,
      trendingCompanies: trendingCompanies.map(mapCompanyToFrontend)
    };
  }
}
