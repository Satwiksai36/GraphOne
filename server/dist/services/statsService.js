"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const companyRepository_1 = require("../repositories/companyRepository");
const investorRepository_1 = require("../repositories/investorRepository");
const productRepository_1 = require("../repositories/productRepository");
const newsRepository_1 = require("../repositories/newsRepository");
const db_1 = require("../config/db");
const companyService_1 = require("./companyService");
class StatsService {
    static async getStats() {
        const [companiesCount, investorCount, productsCount, newsCount, trendingCompanies] = await Promise.all([
            companyRepository_1.CompanyRepository.count(),
            investorRepository_1.InvestorRepository.count(),
            productRepository_1.ProductRepository.count(),
            newsRepository_1.NewsRepository.count(),
            companyRepository_1.CompanyRepository.findTrending(5)
        ]);
        // Fetch all funding rounds and compute total sum
        const rounds = await db_1.prisma.fundingRound.findMany({ select: { amount: true } });
        let totalAmountFloat = 0;
        rounds.forEach((r) => {
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
            trendingCompanies: trendingCompanies.map(companyService_1.mapCompanyToFrontend)
        };
    }
}
exports.StatsService = StatsService;
