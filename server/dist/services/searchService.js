"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const companyRepository_1 = require("../repositories/companyRepository");
const investorRepository_1 = require("../repositories/investorRepository");
const productRepository_1 = require("../repositories/productRepository");
const founderRepository_1 = require("../repositories/founderRepository");
const db_1 = require("../config/db");
const companyService_1 = require("./companyService");
const investorService_1 = require("./investorService");
class SearchService {
    static async globalSearch(query, userId) {
        if (!query) {
            return {
                companies: [],
                investors: [],
                products: [],
                founders: []
            };
        }
        const [companiesRes, investorsRes, productsRes, foundersRes] = await Promise.all([
            companyRepository_1.CompanyRepository.search(query, 6),
            investorRepository_1.InvestorRepository.findAll({ search: query, limit: 6 }),
            productRepository_1.ProductRepository.findAll({ search: query, limit: 6 }),
            founderRepository_1.FounderRepository.search(query, 6)
        ]);
        // If userId is provided, save to search history
        if (userId) {
            try {
                await db_1.prisma.searchHistory.create({
                    data: {
                        userId,
                        query
                    }
                });
            }
            catch (err) {
                console.error('Failed to log search history:', err);
            }
        }
        return {
            companies: companiesRes.map(companyService_1.mapCompanyToFrontend),
            investors: investorsRes.items.map(investorService_1.mapInvestorToFrontend),
            products: productsRes.items,
            founders: foundersRes
        };
    }
    static async getSearchHistory(userId) {
        return db_1.prisma.searchHistory.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10
        });
    }
    static async clearSearchHistory(userId) {
        return db_1.prisma.searchHistory.deleteMany({
            where: { userId }
        });
    }
}
exports.SearchService = SearchService;
