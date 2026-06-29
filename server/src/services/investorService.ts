import { InvestorRepository } from '../repositories/investorRepository';
import { mapCompanyToFrontend } from './companyService';

export function mapInvestorToFrontend(dbInvestor: any) {
  if (!dbInvestor) return null;
  return {
    ...dbInvestor,
    keyPeople: dbInvestor.keyPeople || [],
    portfolioConcentration: dbInvestor.portfolioConcentration || [],
    investmentVelocity: dbInvestor.investmentVelocity || [],
    capitalFlow: dbInvestor.capitalFlow || { increasing: [], decreasing: [] },
    stageEvolution: dbInvestor.stageEvolution || [],
    portfolioWinners: dbInvestor.portfolioWinners || { unicorns: 0, ipos: 0, acquisitions: 0, active: 0, notable: [] },
    followOnStrength: dbInvestor.followOnStrength || { raisedNextRound: '0%', avgMonths: 0, medianGrowth: '1x', raisedSeriesBPlus: '0%' },
    networkStrength: dbInvestor.networkStrength || { mostConnectedFounder: '', mostConnectedStartup: '', mostActiveCoInvestor: '', largestFounderNetwork: '', largestCommunityReach: '' },
    coInvestors: dbInvestor.coInvestors || [],
    marketInfluence: dbInvestor.marketInfluence || { infraRounds: '0%', agentFunding: '0%', devToolsFunding: '0%', mostActiveStage: '', seriesARounds: '' },
    exitIntelligence: dbInvestor.exitIntelligence || { largestExit: '', recentIpo: '', largestAcquisition: '', avgExitTimeYears: 0, ipos: 0, acquisitions: 0 },
    stats: dbInvestor.stats || { deals90d: 0, leadInvestments: 0, mostActiveStage: '', topPartner: '', topFocus: '' },
    recentInvestments: dbInvestor.recentInvestments || [],
    researchList: dbInvestor.researchList || [],
    relatedInvestors: dbInvestor.relatedInvestors || [],
  };
}

export class InvestorService {
  static async getInvestors(query: any) {
    const limit = query.limit ? parseInt(query.limit, 10) : 12;
    const cursor = query.cursor;
    const stage = query.stage;
    const location = query.location;
    const search = query.search;

    const result = await InvestorRepository.findAll({
      limit,
      cursor,
      search,
      stage,
      location
    });

    return {
      items: result.items.map(mapInvestorToFrontend),
      nextCursor: result.nextCursor
    };
  }

  static async getInvestorBySlug(slug: string) {
    const investor = await InvestorRepository.findBySlug(slug);
    if (!investor) {
      const error: any = new Error(`Investor with slug '${slug}' not found`);
      error.statusCode = 404;
      error.code = 'INVESTOR_NOT_FOUND';
      throw error;
    }
    return mapInvestorToFrontend(investor);
  }

  static async getTrendingInvestors(limit?: number) {
    const list = await InvestorRepository.findTrending(limit);
    return list.map(mapInvestorToFrontend);
  }

  static async getFeaturedInvestors(limit?: number) {
    const list = await InvestorRepository.findFeatured(limit);
    return list.map(mapInvestorToFrontend);
  }

  static async getRelatedInvestors(slug: string, limit?: number) {
    const list = await InvestorRepository.findRelated(slug, limit);
    return list.map(mapInvestorToFrontend);
  }

  static async getInvestorPortfolio(slug: string) {
    const investor = await InvestorRepository.findBySlug(slug);
    if (!investor) {
      return [];
    }
    return investor.companies.map((ci: any) => mapCompanyToFrontend(ci.company));
  }

  static async getInvestorInvestments(slug: string) {
    const investor = await InvestorRepository.findBySlug(slug);
    if (!investor) {
      return [];
    }
    return investor.recentInvestments || [];
  }
}
