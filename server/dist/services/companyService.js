"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
exports.mapCompanyToFrontend = mapCompanyToFrontend;
const companyRepository_1 = require("../repositories/companyRepository");
function mapCompanyToFrontend(dbCompany) {
    if (!dbCompany)
        return null;
    return {
        ...dbCompany,
        logoUrl: dbCompany.logo,
        location: dbCompany.hq,
        fundingTimeline: (dbCompany.fundingRounds || []).map((r) => ({
            round: r.round,
            date: r.date,
            amount: r.amount,
            valuation: r.valuation || undefined,
            leadInvestors: r.leadInvestors
        })),
        competitors: (dbCompany.competitors || []).map((c) => c.competitorId),
        adjacentCompetitors: (dbCompany.competitors || []).filter((c) => c.isAdjacent).map((c) => c.competitorId),
        founders: (dbCompany.founders || []).map((f) => typeof f === 'string' ? f : f.id),
        products: (dbCompany.products || []).map((p) => typeof p === 'string' ? p : p.id),
        news: (dbCompany.news || []).map((n) => typeof n === 'string' ? n : n.id),
        socialLinks: dbCompany.socialLinks || {},
        ownership: dbCompany.ownership || [],
        openJobs: dbCompany.openJobs || [],
    };
}
class CompanyService {
    static async getCompanies(query) {
        const limit = query.limit ? parseInt(query.limit, 10) : 12;
        const cursor = query.cursor;
        const sortBy = query.sortBy;
        const sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc';
        const stage = query.stage;
        const category = query.category;
        const hq = query.hq;
        const search = query.search;
        const isTrending = query.isTrending === 'true' ? true : query.isTrending === 'false' ? false : undefined;
        const isFeatured = query.isFeatured === 'true' ? true : query.isFeatured === 'false' ? false : undefined;
        const result = await companyRepository_1.CompanyRepository.findAll({
            limit,
            cursor,
            sortBy,
            sortOrder,
            stage,
            category,
            hq,
            search,
            isTrending,
            isFeatured
        });
        return {
            items: result.items.map(mapCompanyToFrontend),
            nextCursor: result.nextCursor
        };
    }
    static async getCompanyBySlug(slug) {
        const company = await companyRepository_1.CompanyRepository.findBySlug(slug);
        if (!company) {
            const error = new Error(`Company with slug '${slug}' not found`);
            error.statusCode = 404;
            error.code = 'COMPANY_NOT_FOUND';
            throw error;
        }
        return mapCompanyToFrontend(company);
    }
    static async getTrendingCompanies(limit) {
        const list = await companyRepository_1.CompanyRepository.findTrending(limit);
        return list.map(mapCompanyToFrontend);
    }
    static async getFeaturedCompanies(limit) {
        const list = await companyRepository_1.CompanyRepository.findFeatured(limit);
        return list.map(mapCompanyToFrontend);
    }
    static async getCompaniesByCategory(category, limit) {
        const list = await companyRepository_1.CompanyRepository.findByCategory(category, limit);
        return list.map(mapCompanyToFrontend);
    }
    static async getCompanyProducts(slug) {
        const company = await companyRepository_1.CompanyRepository.findBySlug(slug);
        if (!company) {
            return [];
        }
        return company.products;
    }
    static async getCompanyInvestors(slug) {
        const company = await companyRepository_1.CompanyRepository.findBySlug(slug);
        if (!company) {
            return [];
        }
        return company.investors.map((ci) => ({
            ...ci.investor,
            investmentType: ci.type
        }));
    }
    static async getCompanyFunding(slug) {
        const company = await companyRepository_1.CompanyRepository.findBySlug(slug);
        if (!company) {
            return [];
        }
        return company.fundingRounds;
    }
    static async getCompanyFounders(slug) {
        const company = await companyRepository_1.CompanyRepository.findBySlug(slug);
        if (!company) {
            return [];
        }
        return company.founders;
    }
    static async getCompanyNews(slug) {
        const company = await companyRepository_1.CompanyRepository.findBySlug(slug);
        if (!company) {
            return [];
        }
        return company.news;
    }
    static async getAllFundingRounds() {
        return companyRepository_1.CompanyRepository.findAllFundingRounds();
    }
    static async getSimilarCompanies(slug, limit) {
        const list = await companyRepository_1.CompanyRepository.findSimilar(slug, limit);
        return list.map(mapCompanyToFrontend);
    }
}
exports.CompanyService = CompanyService;
