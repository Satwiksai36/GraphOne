import { CompanyRepository } from '../repositories/companyRepository';

export function mapCompanyToFrontend(dbCompany: any) {
  if (!dbCompany) return null;
  return {
    ...dbCompany,
    logoUrl: dbCompany.logo,
    location: dbCompany.hq,
    categories: dbCompany.category ? [dbCompany.category] : [],
    fundingTimeline: (dbCompany.fundingRounds || []).map((r: any) => ({
      round: r.round,
      date: r.date,
      amount: r.amount,
      valuation: r.valuation || undefined,
      leadInvestors: r.leadInvestors
    })),
    competitors: (dbCompany.competitors || []).map((c: any) => c.competitorId),
    adjacentCompetitors: (dbCompany.competitors || []).filter((c: any) => c.isAdjacent).map((c: any) => c.competitorId),
    founders: (dbCompany.founders || []).map((f: any) => typeof f === 'string' ? f : f.id),
    products: (dbCompany.products || []).map((p: any) => typeof p === 'string' ? p : p.id),
    news: (dbCompany.news || []).map((n: any) => typeof n === 'string' ? n : n.id),
    socialLinks: dbCompany.socialLinks || {},
    ownership: dbCompany.ownership || [],
    openJobs: dbCompany.openJobs || [],
  };
}

export class CompanyService {
  static async getCompanies(query: any) {
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

    const result = await CompanyRepository.findAll({
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

  static async getCompanyBySlug(slug: string) {
    const company = await CompanyRepository.findBySlug(slug);
    if (!company) {
      const error: any = new Error(`Company with slug '${slug}' not found`);
      error.statusCode = 404;
      error.code = 'COMPANY_NOT_FOUND';
      throw error;
    }
    return mapCompanyToFrontend(company);
  }

  static async getTrendingCompanies(limit?: number) {
    const list = await CompanyRepository.findTrending(limit);
    return list.map(mapCompanyToFrontend);
  }

  static async getFeaturedCompanies(limit?: number) {
    const list = await CompanyRepository.findFeatured(limit);
    return list.map(mapCompanyToFrontend);
  }

  static async getCompaniesByCategory(category: string, limit?: number) {
    const list = await CompanyRepository.findByCategory(category, limit);
    return list.map(mapCompanyToFrontend);
  }

  static async getCompanyProducts(slug: string) {
    const company = await CompanyRepository.findBySlug(slug);
    if (!company) {
      return [];
    }
    return company.products;
  }

  static async getCompanyInvestors(slug: string) {
    const company = await CompanyRepository.findBySlug(slug);
    if (!company) {
      return [];
    }
    return company.investors.map((ci: any) => ({
      ...ci.investor,
      investmentType: ci.type
    }));
  }

  static async getCompanyFunding(slug: string) {
    const company = await CompanyRepository.findBySlug(slug);
    if (!company) {
      return [];
    }
    return company.fundingRounds;
  }

  static async getCompanyFounders(slug: string) {
    const company = await CompanyRepository.findBySlug(slug);
    if (!company) {
      return [];
    }
    return company.founders;
  }

  static async getCompanyNews(slug: string) {
    const company = await CompanyRepository.findBySlug(slug);
    if (!company) {
      return [];
    }
    return company.news;
  }

  static async getAllFundingRounds() {
    return CompanyRepository.findAllFundingRounds();
  }

  static async getSimilarCompanies(slug: string, limit?: number) {
    const list = await CompanyRepository.findSimilar(slug, limit);
    return list.map(mapCompanyToFrontend);
  }
}
