export interface Founder {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
  companies: string[]; // Company IDs
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  logoBg?: string; // background color for logo container
  tagline: string;
  description: string;
  website: string;
  foundedYear: number;
  location: string;
  employeeCount: string;
  isVerified: boolean;
  isPrivate: boolean;
  categories: string[];
  fundingTotal: string;
  valuation?: string;
  tags: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  timeline: { year: number; event: string }[];
  fundingTimeline: { round: string; date: string; amount: string; valuation?: string; leadInvestors?: string[] }[];
  ownership: { category: string; percentage: number }[];
  investors: { investorId: string; type: 'seed' | 'series' | 'growth' }[];
  founders: string[]; // Founder IDs
  products: string[]; // Product IDs
  acquisitions?: { company: string; date: string; focus: string; amount?: string }[];
  investments?: { company: string; focus: string; stage: string; amount?: string }[];
  competitors: string[]; // Company IDs
  adjacentCompetitors?: string[]; // Company IDs
  news: string[]; // News IDs
  openJobs?: { title: string; department: string; location: string; type: string }[];
  researchPapers?: { title: string; date: string; link?: string }[];
  patents?: { title: string; category: string; owner: string; filedDate: string; publishedDate: string }[];
  views7d: number;
  growthRate?: number; // e.g. 150 for 150% growth
  isTrending: boolean;
  trendingRank?: number;
  isEmerging: boolean;
  isUnicorn: boolean;
  isFrontierLab: boolean;
  isOpenSourceLeader: boolean;
  rating?: number;
}

export interface Investor {
  id: string;
  name: string;
  logoUrl: string;
  bio: string;
  location: string;
  foundedYear: number;
  type: string[]; // e.g. ['VC', 'Growth Equity']
  isVerified: boolean;
  keyPeople: { name: string; role: string; avatarUrl: string }[];
  stats: {
    deals90d: number;
    leadInvestments: number;
    mostActiveStage: string;
    topPartner: string;
    topFocus: string;
  };
  thesis: string;
  preferredStages: string[];
  portfolioConcentration: { sector: string; percentage: number }[];
  recentInvestments: { companyId: string; stage: string; amount: string; date: string; lead: boolean }[];
  investmentVelocity: { year: number; dealsCount: number }[];
  capitalFlow: { increasing: string[]; decreasing: string[] };
  stageEvolution: { year: number; seed: number; seriesA: number; seriesB: number; growth: number }[];
  portfolioWinners: {
    unicorns: number;
    ipos: number;
    acquisitions: number;
    active: number;
    notable: string[]; // Company IDs
  };
  followOnStrength: {
    raisedNextRound: string; // e.g. "82%"
    avgMonths: number;
    medianGrowth: string; // e.g. "3.8x"
    raisedSeriesBPlus: string;
  };
  networkStrength: {
    mostConnectedFounder: string;
    mostConnectedStartup: string;
    mostActiveCoInvestor: string;
    largestFounderNetwork: string;
    largestCommunityReach: string;
  };
  coInvestors: { name: string; logoUrl?: string; count: number }[];
  marketInfluence: {
    infraRounds: string;
    agentFunding: string;
    devToolsFunding: string;
    mostActiveStage: string;
    seriesARounds: string;
  };
  exitIntelligence: {
    largestExit: string;
    recentIpo: string;
    largestAcquisition: string;
    avgExitTimeYears: number;
    ipos: number;
    acquisitions: number;
  };
  researchList: { title: string; publisher: string; date: string }[];
  relatedInvestors: string[]; // Investor IDs
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description?: string;
  logoUrl: string;
  companyId: string; // Company ID
  categories: string[];
  votesCount: number;
  commentsCount: number;
  upvotedByUser?: boolean;
  bookmarkedByUser?: boolean;
  isTrending: boolean;
  isPopularRightNow: boolean;
  releaseDate: string;
  tags: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  source: string;
  companyId?: string; // Associated company
  url?: string;
}

export interface FundingRound {
  id: string;
  companyId: string;
  companyName: string;
  round: string;
  amount: string;
  date: string;
  leadInvestors: string[];
}

