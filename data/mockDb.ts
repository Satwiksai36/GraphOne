import { Company, Investor, Product, Founder, NewsArticle } from '../types';

// ==========================================
// 1. FOUNDERS (Target: 25)
// ==========================================
const baseFounders: Founder[] = [
  {
    id: 'sam-altman',
    name: 'Sam Altman',
    role: 'CEO',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'CEO of OpenAI and former president of Y Combinator.',
    linkedin: 'https://linkedin.com/in/samaltman',
    twitter: 'https://twitter.com/sama',
    companies: ['openai']
  },
  {
    id: 'greg-brockman',
    name: 'Greg Brockman',
    role: 'President & Co-founder',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'President and co-founder of OpenAI. Previously CTO of Stripe.',
    linkedin: 'https://linkedin.com/in/gregbrockman',
    twitter: 'https://twitter.com/gdb',
    companies: ['openai']
  },
  {
    id: 'ilya-sutskever',
    name: 'Ilya Sutskever',
    role: 'Co-founder & Former Chief Scientist',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: 'Co-founder of OpenAI and Safe Superintelligence (SSI). Key researcher in deep learning.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com/ilyasut',
    companies: ['openai', 'ssi']
  },
  {
    id: 'dario-amodei',
    name: 'Dario Amodei',
    role: 'CEO & Co-founder',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    bio: 'Co-founder and CEO of Anthropic. Former VP of Research at OpenAI.',
    twitter: 'https://twitter.com/darioamodei',
    companies: ['anthropic']
  },
  {
    id: 'aravind-srinivas',
    name: 'Aravind Srinivas',
    role: 'CEO & Co-founder',
    avatarUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=80',
    bio: 'CEO and Co-founder of Perplexity AI. Former AI Researcher at OpenAI and DeepMind.',
    twitter: 'https://twitter.com/aravsrinivas',
    companies: ['perplexity']
  },
  {
    id: 'arvid-lunnemark',
    name: 'Arvid Lunnemark',
    role: 'Co-founder & CEO',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    bio: 'Co-founder of Cursor (Anysphere). Building the future of coding.',
    twitter: 'https://twitter.com/arvid_l',
    companies: ['cursor']
  },
  {
    id: 'mati-staniszewski',
    name: 'Mati Staniszewski',
    role: 'Co-founder & CEO',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Co-founder and CEO of ElevenLabs, pioneering natural AI voice synthesis.',
    twitter: 'https://twitter.com/mati_stanis',
    companies: ['elevenlabs']
  },
  {
    id: 'clement-delangue',
    name: 'Clément Delangue',
    role: 'Co-founder & CEO',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    bio: 'Co-founder and CEO of Hugging Face, building the open AI community.',
    twitter: 'https://twitter.com/clem_delangue',
    companies: ['huggingface']
  },
  {
    id: 'alexandr-wang',
    name: 'Alexandr Wang',
    role: 'Founder & CEO',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    bio: 'Founder and CEO of Scale AI. The youngest self-made billionaire.',
    twitter: 'https://twitter.com/alexandr_wang',
    companies: ['scale-ai']
  },
  {
    id: 'demis-hassabis',
    name: 'Demis Hassabis',
    role: 'CEO & Co-founder',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bio: 'Co-founder and CEO of Google DeepMind. Pioneer of AI and reinforcement learning.',
    twitter: 'https://twitter.com/demishassabis',
    companies: ['google-deepmind']
  }
];

// Generate extra founders to reach 25
export const founders: Founder[] = [...baseFounders];
const founderNames = [
  'Arthur Mensch', 'Aidan Gomez', 'Cristóbal Valenzuela', 'David Holz', 'Matei Zaharia',
  'Ion Stoica', 'Scott Wu', 'Amjad Masad', 'Victor Riparbelli', 'Jonathan Cohen',
  'Denis Yarats', 'Richard Socher', 'Peter Chen', 'Tri Dao', 'Albert Gu'
];
const founderCompanies = [
  'mistral-ai', 'cohere', 'runway', 'midjourney', 'databricks',
  'databricks', 'cognition', 'replit', 'synthesia', 'groq',
  'perplexity', 'you-com', 'covariant', 'together-ai', 'together-ai'
];

for (let i = 0; i < 15; i++) {
  const name = founderNames[i];
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  founders.push({
    id,
    name,
    role: 'Founder & CEO',
    avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=150&auto=format&fit=crop&q=80`,
    bio: `Co-founder of ${founderCompanies[i] || 'AI startup'}. Pioneering technologies in AI research.`,
    companies: [founderCompanies[i] || 'generic-ai']
  });
}

// ==========================================
// 2. INVESTORS (Target: 30)
// ==========================================
const baseInvestors: Investor[] = [
  {
    id: 'sequoia-capital',
    name: 'Sequoia Capital',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    bio: 'Sequoia partners with visionary founders building category-defining companies. Our focus is on technology and innovation that creates long-term impact.',
    location: 'Menlo Park, California, USA',
    foundedYear: 1972,
    type: ['VC', 'Growth Equity', 'Private Equity'],
    isVerified: true,
    keyPeople: [
      { name: 'Roelof Botha', role: 'Managing Partner', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80' },
      { name: 'Pat Grady', role: 'Managing Partner', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80' },
      { name: 'Doug Leone', role: 'Managing Partner', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
      { name: 'Alfred Lin', role: 'Partner', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' }
    ],
    stats: {
      deals90d: 12,
      leadInvestments: 4,
      mostActiveStage: 'Series A',
      topPartner: 'a16z',
      topFocus: 'AI Agents'
    },
    thesis: 'We partner early with builders. In AI, we believe the infrastructure layer is setting the foundation, but the true breakout value will live in specialized vertical agents and integrated cognitive developer workflows.',
    preferredStages: ['Seed', 'Series A', 'Series B', 'Growth'],
    portfolioConcentration: [
      { sector: 'AI Infrastructure', percentage: 35 },
      { sector: 'AI Agents', percentage: 22 },
      { sector: 'AI Coding', percentage: 18 },
      { sector: 'Healthcare AI', percentage: 15 },
      { sector: 'Other', percentage: 10 }
    ],
    recentInvestments: [
      { companyId: 'harvey', stage: 'Series D', amount: '$150M', date: 'May 2024', lead: true },
      { companyId: 'luma-ai', stage: 'Series C', amount: '$90M', date: 'Apr 2024', lead: false },
      { companyId: 'mistral-ai', stage: 'Series B', amount: '$60M', date: 'Mar 2024', lead: true },
      { companyId: 'perplexity', stage: 'Series B', amount: '$73.6M', date: 'Jan 2024', lead: false },
      { companyId: 'clarity', stage: 'Series A', amount: '$15M', date: 'Jan 2024', lead: true }
    ],
    investmentVelocity: [
      { year: 2022, dealsCount: 14 },
      { year: 2023, dealsCount: 21 },
      { year: 2024, dealsCount: 36 },
      { year: 2025, dealsCount: 48 },
      { year: 2026, dealsCount: 31 }
    ],
    capitalFlow: {
      increasing: ['AI Agents', 'AI Coding', 'AI Infrastructure'],
      decreasing: ['Enterprise AI', 'Traditional SaaS', 'Consumer Apps']
    },
    stageEvolution: [
      { year: 2021, seed: 10, seriesA: 30, seriesB: 40, growth: 20 },
      { year: 2022, seed: 15, seriesA: 35, seriesB: 30, growth: 20 },
      { year: 2023, seed: 25, seriesA: 40, seriesB: 20, growth: 15 },
      { year: 2024, seed: 30, seriesA: 45, seriesB: 15, growth: 10 },
      { year: 2025, seed: 35, seriesA: 45, seriesB: 10, growth: 10 }
    ],
    portfolioWinners: {
      unicorns: 18,
      ipos: 6,
      acquisitions: 24,
      active: 85,
      notable: ['anthropic', 'cursor', 'harvey', 'perplexity', 'databricks', 'scale-ai']
    },
    followOnStrength: {
      raisedNextRound: '82%',
      avgMonths: 14,
      medianGrowth: '3.8x',
      raisedSeriesBPlus: '68%'
    },
    networkStrength: {
      mostConnectedFounder: 'Sam Altman',
      mostConnectedStartup: 'OpenAI',
      mostActiveCoInvestor: 'a16z',
      largestFounderNetwork: 'YC Alumni',
      largestCommunityReach: 'Sequoia Guild'
    },
    coInvestors: [
      { name: 'a16z', count: 24 },
      { name: 'Lightspeed', count: 18 },
      { name: 'Accel', count: 15 },
      { name: 'Index Ventures', count: 12 },
      { name: 'General Catalyst', count: 10 },
      { name: 'Kleiner Perkins', count: 8 }
    ],
    marketInfluence: {
      infraRounds: '18%',
      agentFunding: '14%',
      devToolsFunding: '12%',
      mostActiveStage: 'Series A',
      seriesARounds: 'Top 3'
    },
    exitIntelligence: {
      largestExit: '$10B+',
      recentIpo: 'Databricks',
      largestAcquisition: 'Rockset',
      avgExitTimeYears: 6.2,
      ipos: 6,
      acquisitions: 24
    },
    researchList: [
      { title: 'Top AI Investors 2024', publisher: 'GraphOne Report', date: 'May 2024' },
      { title: 'State of AI Funding', publisher: 'GraphOne Analysis', date: 'Apr 2024' },
      { title: "Sequoia's AI Thesis Deep Dive", publisher: 'GraphOne Research', date: 'Mar 2024' }
    ],
    relatedInvestors: ['andreessen-horowitz', 'lightspeed-venture-partners', 'accel', 'khosla-ventures']
  },
  {
    id: 'andreessen-horowitz',
    name: 'Andreessen Horowitz (a16z)',
    logoUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&auto=format&fit=crop&q=80',
    bio: 'a16z is a venture capital firm that backs bold entrepreneurs building the future through technology.',
    location: 'Menlo Park, California, USA',
    foundedYear: 2009,
    type: ['VC', 'Growth', 'Crypto'],
    isVerified: true,
    keyPeople: [
      { name: 'Marc Andreessen', role: 'Co-founder & General Partner', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80' },
      { name: 'Ben Horowitz', role: 'Co-founder & General Partner', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' }
    ],
    stats: {
      deals90d: 18,
      leadInvestments: 6,
      mostActiveStage: 'Seed/Series A',
      topPartner: 'Sequoia',
      topFocus: 'AI Infrastructure'
    },
    thesis: 'Software is eating the world, and AI is digesting it. We invest heavily in open-source AI, foundation models, and AI agent frameworks.',
    preferredStages: ['Seed', 'Series A', 'Series B', 'Growth'],
    portfolioConcentration: [
      { sector: 'AI Infrastructure', percentage: 42 },
      { sector: 'AI Models', percentage: 25 },
      { sector: 'AI Coding', percentage: 15 },
      { sector: 'Gaming & Consumer', percentage: 10 },
      { sector: 'Other', percentage: 8 }
    ],
    recentInvestments: [
      { companyId: 'mistral-ai', stage: 'Series A', amount: '$110M', date: 'Dec 2023', lead: true },
      { companyId: 'together-ai', stage: 'Series B', amount: '$102M', date: 'Nov 2023', lead: false }
    ],
    investmentVelocity: [
      { year: 2022, dealsCount: 20 },
      { year: 2023, dealsCount: 32 },
      { year: 2024, dealsCount: 45 },
      { year: 2025, dealsCount: 52 },
      { year: 2026, dealsCount: 41 }
    ],
    capitalFlow: {
      increasing: ['AI Infrastructure', 'Open Source Models', 'AI Bio'],
      decreasing: ['Fintech', 'SaaS', 'Web3']
    },
    stageEvolution: [
      { year: 2023, seed: 20, seriesA: 40, seriesB: 20, growth: 20 },
      { year: 2024, seed: 30, seriesA: 40, seriesB: 20, growth: 10 }
    ],
    portfolioWinners: {
      unicorns: 22,
      ipos: 9,
      acquisitions: 31,
      active: 110,
      notable: ['openai', 'mistral-ai', 'together-ai', 'character-ai', 'elevenlabs']
    },
    followOnStrength: {
      raisedNextRound: '85%',
      avgMonths: 12,
      medianGrowth: '4.1x',
      raisedSeriesBPlus: '72%'
    },
    networkStrength: {
      mostConnectedFounder: 'Marc Andreessen',
      mostConnectedStartup: 'Hugging Face',
      mostActiveCoInvestor: 'Sequoia',
      largestFounderNetwork: 'a16z Guild',
      largestCommunityReach: 'Substack & Podcasts'
    },
    coInvestors: [
      { name: 'Sequoia Capital', count: 24 },
      { name: 'Lightspeed', count: 16 }
    ],
    marketInfluence: {
      infraRounds: '22%',
      agentFunding: '15%',
      devToolsFunding: '10%',
      mostActiveStage: 'Series A',
      seriesARounds: 'Top 3'
    },
    exitIntelligence: {
      largestExit: '$15B+',
      recentIpo: 'Coinbase',
      largestAcquisition: 'GitHub',
      avgExitTimeYears: 5.8,
      ipos: 9,
      acquisitions: 31
    },
    researchList: [
      { title: 'The Generative AI Land Grab', publisher: 'a16z Research', date: 'Jan 2024' }
    ],
    relatedInvestors: ['sequoia-capital', 'lightspeed-venture-partners', 'accel', 'founders-fund']
  }
];

// Generate extra investors to reach 30
export const investors: Investor[] = [...baseInvestors];
const investorNames = [
  'Lightspeed Venture Partners', 'Khosla Ventures', 'Accel Partners', 'General Catalyst',
  'Y Combinator', 'Thrive Capital', 'Founders Fund', 'SoftBank Vision Fund', 'Tiger Global Management',
  'Google Ventures (GV)', 'Microsoft Corporation', 'Spark Capital', 'Index Ventures', 'Kleiner Perkins',
  'Bessemer Venture Partners', 'IVP', 'NEA', 'Coatue Management', 'Felicis Ventures', 'Redpoint Ventures',
  'Benchmark', 'Greylock Partners', 'CRV', 'Matrix Partners', 'Bain Capital Ventures', 'Radical Ventures',
  'Conviction', 'Theory Ventures'
];

for (let i = 0; i < 28; i++) {
  const name = investorNames[i];
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const existing = investors.find(inv => inv.id === id);
  if (!existing) {
    investors.push({
      id,
      name,
      logoUrl: `https://images.unsplash.com/photo-${1600000000000 + i * 200000}?w=120&auto=format&fit=crop&q=80`,
      bio: `${name} is a leading global investment firm supporting entrepreneurs at all stages of growth.`,
      location: i % 2 === 0 ? 'San Francisco, California, USA' : 'Menlo Park, California, USA',
      foundedYear: 1980 + (i * 2),
      type: ['VC', 'Growth Equity'],
      isVerified: i % 3 === 0,
      keyPeople: [
        { name: 'Jane Doe', role: 'Partner', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80' }
      ],
      stats: {
        deals90d: 5 + (i % 8),
        leadInvestments: 1 + (i % 4),
        mostActiveStage: i % 2 === 0 ? 'Seed' : 'Series A',
        topPartner: 'a16z',
        topFocus: 'AI Applications'
      },
      thesis: 'We believe AI is transforming every industry vertical. We invest in both foundational models and application software layers.',
      preferredStages: ['Seed', 'Series A', 'Series B'],
      portfolioConcentration: [
        { sector: 'AI Applications', percentage: 40 },
        { sector: 'AI Infrastructure', percentage: 30 },
        { sector: 'Other', percentage: 30 }
      ],
      recentInvestments: [
        { companyId: 'perplexity', stage: 'Series A', amount: '$20M', date: 'Feb 2024', lead: true }
      ],
      investmentVelocity: [
        { year: 2024, dealsCount: 10 + i },
        { year: 2025, dealsCount: 15 + i }
      ],
      capitalFlow: {
        increasing: ['AI Models', 'Healthcare AI'],
        decreasing: ['Traditional SaaS']
      },
      stageEvolution: [
        { year: 2024, seed: 40, seriesA: 40, seriesB: 20, growth: 0 }
      ],
      portfolioWinners: {
        unicorns: 5 + (i % 10),
        ipos: i % 3,
        acquisitions: 2 + (i % 5),
        active: 20 + i,
        notable: ['openai', 'perplexity']
      },
      followOnStrength: {
        raisedNextRound: '78%',
        avgMonths: 15,
        medianGrowth: '3.1x',
        raisedSeriesBPlus: '55%'
      },
      networkStrength: {
        mostConnectedFounder: 'John Doe',
        mostConnectedStartup: 'Scale AI',
        mostActiveCoInvestor: 'Sequoia',
        largestFounderNetwork: 'VC Network',
        largestCommunityReach: 'Newsletter'
      },
      coInvestors: [
        { name: 'Sequoia Capital', count: 10 + (i % 5) }
      ],
      marketInfluence: {
        infraRounds: '10%',
        agentFunding: '8%',
        devToolsFunding: '8%',
        mostActiveStage: 'Series A',
        seriesARounds: 'Top 10'
      },
      exitIntelligence: {
        largestExit: '$2B+',
        recentIpo: 'None',
        largestAcquisition: 'None',
        avgExitTimeYears: 7.1,
        ipos: 1,
        acquisitions: 4
      },
      researchList: [
        { title: 'The AI Economy Report', publisher: `${name} Research`, date: 'Apr 2024' }
      ],
      relatedInvestors: ['sequoia-capital', 'andreessen-horowitz']
    });
  }
}

// Mapped verified real-world company IDs/slugs for sorting priority
export const realCompanyKeys = [
  'openai', 'chatgpt', 'gpt-4o', 'codex', 'sora', 'operator', 'openai-agents',
  'anthropic', 'claude-3-5', 'perplexity', 'cursor', 'midjourney', 'xai',
  'huggingface', 'hugging-face', 'mistral-ai', 'mistral', 'google-deepmind',
  'deepmind', 'gemini-1-5', 'databricks', 'cohere', 'pika', 'cognition',
  'devin', 'adept', 'glean', 'lovable', 'reka', 'ollama', 'together-ai',
  'character-ai', 'runway', 'synthesia', 'elevenlabs', 'deci', 'typeface',
  'granola', 'memgpt', 'bria-ai', 'characterx', 'linfty', 'palette',
  'groq', 'scale-ai', 'scale', 'pinecone', 'weights-biases', 'wandb',
  'phind', 'harvey', 'luma-ai', 'luma', 'clarity', 'synthesia', 'rockset',
  'global-illumination', 'safe-superintelligence', 'ssi', 'world-labs',
  'worldlabs', 'unity'
];

// ==========================================
// 3. COMPANIES (Target: 60)
// ==========================================
const baseCompanies: Company[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    logoBg: 'bg-emerald-950',
    tagline: 'Building safe and beneficial artificial general intelligence.',
    description: 'OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity. We develop ChatGPT, GPT-4, DALL-E, Sora, Operator, and other cutting-edge AI systems.',
    website: 'https://openai.com',
    foundedYear: 2015,
    location: 'San Francisco, CA, USA',
    employeeCount: '1,000+ employees',
    isVerified: true,
    isPrivate: true,
    categories: ['AI Models', 'Foundation Models', 'Generative AI', 'AI Agents'],
    fundingTotal: '$17.9B',
    valuation: '$80B+',
    tags: ['Artificial Intelligence', 'Machine Learning', 'Generative AI', 'Foundation Models', 'AI Research'],
    socialLinks: {
      twitter: 'https://twitter.com/openai',
      linkedin: 'https://linkedin.com/company/openai',
      github: 'https://github.com/openai',
      youtube: 'https://youtube.com/openai'
    },
    timeline: [
      { year: 2015, event: 'OpenAI Founded' },
      { year: 2019, event: 'GPT-2 Released' },
      { year: 2020, event: 'GPT-3 Released' },
      { year: 2022, event: 'ChatGPT Launched' },
      { year: 2023, event: 'GPT-4 Released' },
      { year: 2024, event: 'Sora Released' },
      { year: 2025, event: 'Operator Released' }
    ],
    fundingTimeline: [
      { round: 'Seed', date: '2016', amount: '$10M', valuation: '$80M', leadInvestors: ['Y Combinator', 'Sam Altman'] },
      { round: 'Series A', date: '2019', amount: '$100M', valuation: '$1B', leadInvestors: ['Microsoft'] },
      { round: 'Series B', date: '2021', amount: '$300M', valuation: '$14B', leadInvestors: ['Tiger Global'] },
      { round: 'Growth', date: '2023', amount: '$10B', valuation: '$29B', leadInvestors: ['Microsoft'] },
      { round: 'Growth II', date: '2025', amount: '$40B', valuation: '$157B', leadInvestors: ['Thrive Capital', 'SoftBank'] }
    ],
    ownership: [
      { category: 'Microsoft', percentage: 49 },
      { category: 'Employees', percentage: 18 },
      { category: 'Founders', percentage: 12 },
      { category: 'Investors', percentage: 21 }
    ],
    investors: [
      { investorId: 'y-combinator', type: 'seed' },
      { investorId: 'sequoia-capital', type: 'series' },
      { investorId: 'andreessen-horowitz', type: 'series' },
      { investorId: 'microsoft-corporation', type: 'growth' },
      { investorId: 'softbank-vision-fund', type: 'growth' },
      { investorId: 'tiger-global-management', type: 'growth' }
    ],
    founders: ['sam-altman', 'greg-brockman', 'ilya-sutskever'],
    products: ['chatgpt', 'gpt-4o', 'codex', 'sora', 'operator', 'openai-agents'],
    acquisitions: [
      { company: 'Rockset', date: '2024', focus: 'Database technology', amount: '$500M' },
      { company: 'io', date: '2025', focus: 'AI device startup', amount: '$100M' }
    ],
    investments: [
      { company: 'Figure', focus: 'Humanoid Robotics', stage: 'Series B', amount: '$675M' },
      { company: 'Harvey', focus: 'Legal AI', stage: 'Series C', amount: '$80M' },
      { company: 'Physical Intelligence', focus: 'Robotics AI', stage: 'Series A', amount: '$70M' }
    ],
    competitors: ['anthropic', 'google-deepmind', 'xai', 'mistral-ai', 'cohere'],
    adjacentCompetitors: ['perplexity', 'cursor', 'replit'],
    news: ['openai-gpt5-launch', 'openai-raises-6.6b', 'openai-operator-agent'],
    openJobs: [
      { title: 'Research Scientist', department: 'Research', location: 'San Francisco, CA', type: 'Full-time' },
      { title: 'Software Engineer, Infrastructure', department: 'Engineering', location: 'San Francisco, CA', type: 'Full-time' },
      { title: 'Product Manager, ChatGPT', department: 'Product', location: 'San Francisco, CA', type: 'Full-time' },
      { title: 'Safety Systems Engineer', department: 'Safety', location: 'San Francisco, CA', type: 'Full-time' },
      { title: 'ML Engineer, Training', department: 'Engineering', location: 'San Francisco, CA', type: 'Full-time' }
    ],
    researchPapers: [
      { title: 'GPT-4 Technical Report', date: 'Mar 2023' },
      { title: 'GPT-4o System Card', date: 'May 2024' },
      { title: 'Sora: A Review', date: 'Feb 2024' },
      { title: 'DALL-E 3 Technical Report', date: 'Oct 2023' },
      { title: 'Whisper: Robust Speech Recognition', date: 'Sep 2022' }
    ],
    patents: [
      { title: 'System for training large language models', category: 'AI / ML', owner: 'OpenAI', filedDate: '2022-03-14', publishedDate: '2023-09-21' },
      { title: 'Methods for aligning AI models', category: 'AI Safety', owner: 'OpenAI', filedDate: '2022-07-11', publishedDate: '2022-12-28' },
      { title: 'Efficient inference for transformer models', category: 'AI / ML', owner: 'OpenAI', filedDate: '2023-05-09', publishedDate: '2023-11-02' }
    ],
    views7d: 15200,
    growthRate: 210,
    isTrending: true,
    trendingRank: 1,
    isEmerging: false,
    isUnicorn: true,
    isFrontierLab: true,
    isOpenSourceLeader: false
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    logoUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&auto=format&fit=crop&q=80',
    logoBg: 'bg-orange-950',
    tagline: 'AI research and safety that builds helpful, honest, and harmless systems.',
    description: 'Anthropic is an AI safety and research company that builds frontier AI systems. We created Claude, a family of large language models designed to be reliable, safe, and helpful.',
    website: 'https://anthropic.com',
    foundedYear: 2021,
    location: 'San Francisco, CA, USA',
    employeeCount: '500-1,000 employees',
    isVerified: true,
    isPrivate: true,
    categories: ['AI Models', 'Foundation Models', 'AI Agents'],
    fundingTotal: '$7.3B',
    valuation: '$18.4B',
    tags: ['AI Safety', 'Claude', 'Generative AI', 'Large Language Models'],
    socialLinks: { twitter: 'https://twitter.com/anthropic' },
    timeline: [
      { year: 2021, event: 'Anthropic Founded by former OpenAI employees' },
      { year: 2023, event: 'Claude 1.0 Launched' },
      { year: 2024, event: 'Claude 3.5 Sonnet Released' }
    ],
    fundingTimeline: [
      { round: 'Series A', date: '2021', amount: '$124M', valuation: '$800M', leadInvestors: ['Jaan Tallinn'] },
      { round: 'Series B', date: '2022', amount: '$580M', valuation: '$4B', leadInvestors: ['FTX (former)'] },
      { round: 'Series C', date: '2023', amount: '$450M', valuation: '$5B', leadInvestors: ['Spark Capital'] },
      { round: 'Growth', date: '2024', amount: '$4.0B', valuation: '$18B', leadInvestors: ['Amazon', 'Google'] }
    ],
    ownership: [
      { category: 'Amazon', percentage: 25 },
      { category: 'Google', percentage: 12 },
      { category: 'Employees', percentage: 20 },
      { category: 'Founders', percentage: 18 },
      { category: 'Other Investors', percentage: 25 }
    ],
    investors: [
      { investorId: 'spark-capital', type: 'series' },
      { investorId: 'sequoia-capital', type: 'growth' },
      { investorId: 'google-ventures-gv', type: 'growth' }
    ],
    founders: ['dario-amodei'],
    products: ['claude-3-5', 'claude-computer-use'],
    competitors: ['openai', 'google-deepmind', 'xai'],
    news: ['anthropic-claude-computer-use', 'anthropic-amazon-funding'],
    views7d: 14500,
    growthRate: 180,
    isTrending: true,
    trendingRank: 2,
    isEmerging: false,
    isUnicorn: true,
    isFrontierLab: true,
    isOpenSourceLeader: false
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    logoUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=120&auto=format&fit=crop&q=80',
    logoBg: 'bg-teal-950',
    tagline: 'Where knowledge begins. Direct answers, instantly.',
    description: 'Perplexity is a conversational search engine that delivers instant answers with inline citations. It acts as an answer engine that searches the web in real-time to answer complex questions.',
    website: 'https://perplexity.ai',
    foundedYear: 2022,
    location: 'San Francisco, CA, USA',
    employeeCount: '100-250 employees',
    isVerified: true,
    isPrivate: true,
    categories: ['AI Search', 'AI Productivity'],
    fundingTotal: '$165M',
    valuation: '$1B+',
    tags: ['Search Engine', 'LLMs', 'Web Search', 'Conversational AI'],
    socialLinks: { twitter: 'https://twitter.com/perplexity_ai' },
    timeline: [
      { year: 2022, event: 'Perplexity AI Founded' },
      { year: 2023, event: 'Perplexity Pro Launched' },
      { year: 2024, event: 'Perplexity Pages Launched' }
    ],
    fundingTimeline: [
      { round: 'Seed', date: '2022', amount: '$3.1M', valuation: '$15M', leadInvestors: ['Elad Gil'] },
      { round: 'Series A', date: '2023', amount: '$25M', valuation: '$150M', leadInvestors: ['NVIDIA', 'Jeff Bezos'] },
      { round: 'Series B', date: '2024', amount: '$73.6M', valuation: '$520M', leadInvestors: ['IVP'] },
      { round: 'Series C', date: '2024', amount: '$63M', valuation: '$1.0B', leadInvestors: ['Daniel Gross'] }
    ],
    ownership: [
      { category: 'Founders', percentage: 25 },
      { category: 'NVIDIA', percentage: 5 },
      { category: 'Jeff Bezos', percentage: 3 },
      { category: 'VC Investors', percentage: 52 },
      { category: 'Employees', percentage: 15 }
    ],
    investors: [
      { investorId: 'sequoia-capital', type: 'series' },
      { investorId: 'ivp', type: 'series' },
      { investorId: 'nea', type: 'series' }
    ],
    founders: ['aravind-srinivas'],
    products: ['perplexity-pro', 'perplexity-pages'],
    competitors: ['openai', 'google-deepmind'],
    news: ['perplexity-valuation-1b', 'perplexity-revenue-milestone'],
    views7d: 12300,
    growthRate: 340,
    isTrending: true,
    trendingRank: 3,
    isEmerging: false,
    isUnicorn: true,
    isFrontierLab: false,
    isOpenSourceLeader: false
  },
  {
    id: 'cursor',
    name: 'Cursor',
    logoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120&auto=format&fit=crop&q=80',
    logoBg: 'bg-slate-900',
    tagline: 'The AI-first code editor.',
    description: 'Cursor is an AI-powered code editor built on top of VS Code. It helps developers write, edit, search, and understand code much faster through natural language interactions.',
    website: 'https://cursor.com',
    foundedYear: 2022,
    location: 'San Francisco, CA, USA',
    employeeCount: '11-50 employees',
    isVerified: true,
    isPrivate: true,
    categories: ['AI Coding', 'Developer Tools'],
    fundingTotal: '$38M',
    valuation: '$400M',
    tags: ['IDE', 'VS Code', 'AI Coding', 'Autopilot'],
    socialLinks: { twitter: 'https://twitter.com/cursor_ai' },
    timeline: [
      { year: 2022, event: 'Anysphere Founded (Cursor parent)' },
      { year: 2023, event: 'Cursor Code Editor launched' },
      { year: 2024, event: 'Series A funding raised' }
    ],
    fundingTimeline: [
      { round: 'Seed', date: '2023', amount: '$8M', valuation: '$40M', leadInvestors: ['OpenAI Startup Fund'] },
      { round: 'Series A', date: '2024', amount: '$30M', valuation: '$400M', leadInvestors: ['a16z', 'Thrive Capital'] }
    ],
    ownership: [
      { category: 'Founders', percentage: 40 },
      { category: 'OpenAI Fund', percentage: 10 },
      { category: 'a16z', percentage: 15 },
      { category: 'Thrive Capital', percentage: 10 },
      { category: 'Employees & Others', percentage: 25 }
    ],
    investors: [
      { investorId: 'andreessen-horowitz', type: 'series' },
      { investorId: 'thrive-capital', type: 'series' }
    ],
    founders: ['arvid-lunnemark'],
    products: ['cursor-editor'],
    competitors: ['copilot', 'replit'],
    news: ['cursor-raises-30m-series-a', 'cursor-codebase-indexing'],
    views7d: 15200,
    growthRate: 450,
    isTrending: true,
    trendingRank: 4,
    isEmerging: false,
    isUnicorn: false,
    isFrontierLab: false,
    isOpenSourceLeader: false
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    logoUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=120&auto=format&fit=crop&q=80',
    logoBg: 'bg-purple-950',
    tagline: 'Expand the imaginative powers of the human species.',
    description: 'Midjourney is an independent research lab exploring new mediums of thought. It generates beautiful images from text prompts through a Discord bot and web platform.',
    website: 'https://midjourney.com',
    foundedYear: 2021,
    location: 'San Francisco, CA, USA',
    employeeCount: '11-50 employees',
    isVerified: true,
    isPrivate: true,
    categories: ['AI Image', 'Generative AI'],
    fundingTotal: '$0 (Self-funded)',
    valuation: '$1B+',
    tags: ['AI Art', 'Image Generation', 'Text-to-Image', 'Discord'],
    socialLinks: { twitter: 'https://twitter.com/midjourney' },
    timeline: [
      { year: 2021, event: 'Midjourney founded by David Holz' },
      { year: 2022, event: 'Beta launched via Discord' },
      { year: 2023, event: 'Midjourney v5 released' },
      { year: 2024, event: 'Web Alpha editor launched' }
    ],
    fundingTimeline: [],
    ownership: [
      { category: 'Founders', percentage: 80 },
      { category: 'Employees', percentage: 20 }
    ],
    investors: [],
    founders: ['david-holz'],
    products: ['midjourney-v6'],
    competitors: ['dall-e', 'stable-diffusion'],
    news: ['midjourney-web-app-launch'],
    views7d: 9700,
    growthRate: 120,
    isTrending: true,
    trendingRank: 5,
    isEmerging: false,
    isUnicorn: true,
    isFrontierLab: false,
    isOpenSourceLeader: false
  }
];

// Generate extra companies to reach 60
export const companies: Company[] = [...baseCompanies];
const extraCompanyNames = [
  'Runway', 'ElevenLabs', 'Pika', 'Lovable', 'Groq', 'Together AI', 'Hugging Face',
  'Scale AI', 'Databricks', 'Pinecone', 'Weights & Biases', 'Cognition', 'Adept', 'Glean',
  'Reka', 'Deci', 'Typeface', 'Granola', 'MemGPT', 'Bria AI', 'CharacterX', 'Unity',
  'Palette', 'Ollama', 'Phind', 'Harvey', 'Luma AI', 'Clarity', 'Synthesia', 'Rockset',
  'Global Illumination', 'Safe Superintelligence (SSI)', 'World Labs', 'Cohere', 'Mistral AI',
  'AgenticLab', 'VectorFlow', 'SemanticMind', 'GraphAI', 'NeuralNets', 'DeepSearch',
  'CodeFlow', 'TensorScale', 'WhisperAI', 'VoiceGen', 'VideoSynth', 'ChatMatrix', 'AgentX',
  'MatrixCompute', 'Synapse', 'CyberCorp', 'ShieldAI', 'AutoCoder', 'DeepFlow', 'CloudBrain'
];

for (let i = 0; i < extraCompanyNames.length; i++) {
  const name = extraCompanyNames[i];
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const existing = companies.find(c => c.id === id);
  if (!existing) {
    const isFrontier = ['cohere', 'mistral-ai', 'safe-superintelligence--ssi-', 'world-labs'].includes(id);
    const isOpenSource = ['hugging-face', 'mistral-ai', 'ollama', 'databricks', 'together-ai'].includes(id);
    const isUnicorn = ['runway', 'elevenlabs', 'scale-ai', 'databricks', 'pinecone', 'cohere', 'mistral-ai'].includes(id);
    const isTrending = i < 10;
    const isEmerging = i >= 10 && i < 20;

    companies.push({
      id,
      name,
      logoUrl: `https://images.unsplash.com/photo-${1610000000000 + i * 300000}?w=120&auto=format&fit=crop&q=80`,
      logoBg: 'bg-zinc-900',
      tagline: `Pioneering technologies in ${name.includes('Voice') || name.includes('Eleven') ? 'AI Voice' : 'AI Models'}.`,
      description: `${name} is pushing the boundaries of AI research and engineering to deliver powerful enterprise systems.`,
      website: `https://${id}.com`,
      foundedYear: 2018 + (i % 6),
      location: i % 2 === 0 ? 'San Francisco, CA, USA' : 'Palo Alto, CA, USA',
      employeeCount: i % 3 === 0 ? '1,000+ employees' : '100-250 employees',
      isVerified: i % 2 === 0,
      isPrivate: id !== 'databricks' && id !== 'unity',
      categories: [
        name.includes('Code') || name.includes('Coder') ? 'AI Coding' :
        name.includes('Search') ? 'AI Search' :
        name.includes('Voice') || name.includes('VoiceGen') ? 'AI Voice' :
        name.includes('Video') || name.includes('Pika') ? 'AI Video' :
        name.includes('Agent') ? 'AI Agents' : 'AI Infrastructure'
      ],
      fundingTotal: isUnicorn ? '$1B+' : '$45M',
      valuation: isUnicorn ? '$2B+' : undefined,
      tags: ['AI', 'Tech', name.includes('Agent') ? 'Agents' : 'Infrastructure'],
      socialLinks: { twitter: `https://twitter.com/${id}` },
      timeline: [{ year: 2022, event: `${name} Founded` }],
      fundingTimeline: [
        { round: 'Series A', date: '2022', amount: '$15M', valuation: '$100M', leadInvestors: ['Sequoia Capital'] },
        { round: 'Series B', date: '2024', amount: '$50M', valuation: '$500M', leadInvestors: ['andreessen-horowitz'] }
      ],
      ownership: [
        { category: 'Founders', percentage: 35 },
        { category: 'Investors', percentage: 45 },
        { category: 'Employees', percentage: 20 }
      ],
      investors: [
        { investorId: 'sequoia-capital', type: 'seed' },
        { investorId: 'andreessen-horowitz', type: 'series' }
      ],
      founders: ['sam-altman'],
      products: [id + '-product'],
      competitors: ['openai', 'anthropic'],
      news: [id + '-news'],
      views7d: 1000 + (i * 250),
      growthRate: 50 + (i * 12),
      isTrending,
      isEmerging,
      isUnicorn,
      isFrontierLab: isFrontier,
      isOpenSourceLeader: isOpenSource
    });
  }
}

// Adjust count to exactly 60 if needed
while (companies.length < 60) {
  const i = companies.length;
  const name = `AI Company ${i}`;
  const id = `ai-company-${i}`;
  companies.push({
    id,
    name,
    logoUrl: `https://images.unsplash.com/photo-${1610000000000 + i * 300000}?w=120&auto=format&fit=crop&q=80`,
    tagline: `Pioneering automation in AI.`,
    description: `Leading developer of intelligent enterprise integrations.`,
    website: `https://${id}.com`,
    foundedYear: 2023,
    location: 'San Francisco, CA',
    employeeCount: '11-50 employees',
    isVerified: false,
    isPrivate: true,
    categories: ['AI Agents'],
    fundingTotal: '$5M',
    tags: ['AI'],
    socialLinks: {},
    timeline: [],
    fundingTimeline: [],
    ownership: [],
    investors: [],
    founders: [],
    products: [],
    competitors: [],
    news: [],
    views7d: 100,
    isTrending: false,
    isEmerging: true,
    isUnicorn: false,
    isFrontierLab: false,
    isOpenSourceLeader: false
  });
}
if (companies.length > 60) {
  companies.splice(60);
}

// Sort companies: verified/real first, generic ones last
companies.sort((a, b) => {
  const aNorm = a.id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const bNorm = b.id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const aReal = realCompanyKeys.some(k => aNorm.includes(k));
  const bReal = realCompanyKeys.some(k => bNorm.includes(k));
  if (aReal && !bReal) return -1;
  if (!aReal && bReal) return 1;
  return 0;
});

// ==========================================
// 4. PRODUCTS (Target: 40)
// ==========================================
const baseProducts: Product[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    tagline: 'Conversational AI for any question or task.',
    description: 'ChatGPT is a conversational language model that can chat, write code, answer questions, draft documents, and perform complex analysis using OpenAI\'s core models.',
    logoUrl: 'https://images.unsplash.com/photo-1678269137975-47dc939b456d?w=100&auto=format&fit=crop&q=80',
    companyId: 'openai',
    categories: ['Chat', 'Productivity'],
    votesCount: 5120,
    commentsCount: 341,
    isTrending: true,
    isPopularRightNow: true,
    releaseDate: '2022-11-30',
    tags: ['Chatbot', 'LLM', 'Writing', 'Code']
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    tagline: 'Omni multimodal foundation model.',
    description: 'GPT-4o is OpenAI\'s flagship omni model, reasoning across audio, vision, and text in real-time. Powering next-gen conversational and automation workloads.',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    companyId: 'openai',
    categories: ['Code', 'Developer Tools'],
    votesCount: 8340,
    commentsCount: 173,
    isTrending: true,
    isPopularRightNow: true,
    releaseDate: '2024-05-13',
    tags: ['Multimodal', 'LLM', 'API', 'Real-time']
  },
  {
    id: 'codex',
    name: 'Codex',
    tagline: 'AI system that translates natural language to code.',
    logoUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=100&auto=format&fit=crop&q=80',
    companyId: 'openai',
    categories: ['Code', 'Developer Tools'],
    votesCount: 3500,
    commentsCount: 92,
    isTrending: false,
    isPopularRightNow: false,
    releaseDate: '2021-08-10',
    tags: ['Coding', 'Autocomplete']
  },
  {
    id: 'sora',
    name: 'Sora',
    tagline: 'Text-to-video foundation model.',
    logoUrl: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=100&auto=format&fit=crop&q=80',
    companyId: 'openai',
    categories: ['Video', 'Generative AI'],
    votesCount: 4200,
    commentsCount: 220,
    isTrending: true,
    isPopularRightNow: false,
    releaseDate: '2024-02-15',
    tags: ['Video Gen', 'Text-to-Video']
  },
  {
    id: 'operator',
    name: 'Operator',
    tagline: 'Autonomous AI agent for browser automation tasks.',
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&auto=format&fit=crop&q=80',
    companyId: 'openai',
    categories: ['Agents', 'Productivity'],
    votesCount: 6800,
    commentsCount: 410,
    isTrending: true,
    isPopularRightNow: true,
    releaseDate: '2025-01-20',
    tags: ['Browser Agent', 'RPA', 'Automation']
  },
  {
    id: 'openai-agents',
    name: 'OpenAI Agents SDK',
    tagline: 'SDK for building autonomous developer agents.',
    logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    companyId: 'openai',
    categories: ['Agents', 'Developer Tools'],
    votesCount: 2800,
    commentsCount: 115,
    isTrending: false,
    isPopularRightNow: false,
    releaseDate: '2025-02-10',
    tags: ['Agents', 'Developer', 'Node', 'Python']
  },
  {
    id: 'claude-3-5',
    name: 'Claude 3.5 Sonnet',
    tagline: 'AI assistant for thoughtful work and collaboration.',
    description: 'Claude 3.5 Sonnet sets new industry benchmarks for graduate-level reasoning, undergraduate-level knowledge, and coding proficiency.',
    logoUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80',
    companyId: 'anthropic',
    categories: ['Chat', 'Productivity'],
    votesCount: 6700,
    commentsCount: 89,
    isTrending: true,
    isPopularRightNow: true,
    releaseDate: '2024-06-21',
    tags: ['LLM', 'Claude', 'Reasoning', 'Coding']
  },
  {
    id: 'perplexity-pro',
    name: 'Perplexity Pro',
    tagline: 'AI search engine for real-time answers with citations.',
    logoUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=100&auto=format&fit=crop&q=80',
    companyId: 'perplexity',
    categories: ['Chat', 'Productivity'],
    votesCount: 2900,
    commentsCount: 144,
    isTrending: true,
    isPopularRightNow: false,
    releaseDate: '2023-03-01',
    tags: ['Search Engine', 'Research', 'AI Assistant']
  },
  {
    id: 'cursor-editor',
    name: 'Cursor',
    tagline: 'The AI-first code editor built for speed and productivity.',
    logoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&auto=format&fit=crop&q=80',
    companyId: 'cursor',
    categories: ['Code', 'Developer Tools'],
    votesCount: 8300,
    commentsCount: 173,
    isTrending: true,
    isPopularRightNow: true,
    releaseDate: '2023-01-15',
    tags: ['Editor', 'VS Code', 'Autocomplete', 'Chat']
  },
  {
    id: 'midjourney-v6',
    name: 'Midjourney v6',
    tagline: 'Generative AI for beautiful images from text prompts.',
    logoUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&auto=format&fit=crop&q=80',
    companyId: 'midjourney',
    categories: ['Image', 'Design'],
    votesCount: 5500,
    commentsCount: 386,
    isTrending: true,
    isPopularRightNow: true,
    releaseDate: '2023-12-21',
    tags: ['Images', 'Generative Art', 'Text-to-Image']
  }
];

// Generate extra products to reach 40
export const products: Product[] = [...baseProducts];
const extraProductNames = [
  'Claude Computer Use', 'Perplexity Pages', 'Runway Gen-3', 'ElevenLabs Reader', 'Pika 2.0',
  'Lovable App Builder', 'Groq LPU', 'Together API', 'Hugging Face Spaces', 'Scale GenAI',
  'DBRX Model', 'Pinecone Serverless', 'W&B Artifacts', 'Devin AI Coder', 'Adept Fuyu',
  'Glean Enterprise Search', 'Reka Flash', 'DeciLM', 'Typeface Marketing', 'Granola Notes',
  'MemGPT OS', 'Bria Creative', 'CharacterX Chat', 'Unity Muse', 'Palette Colorizer',
  'Ollama Local LLM', 'Phind Search', 'Harvey Legal Assistant', 'Luma Dream Machine',
  'Clarity Face Swapper', 'Synthesia Video Creator', 'Rockset Serverless', 'Global Illumination Sandbox',
  'SSI Core Model', 'World Labs Spatial AI', 'Cohere Command R+', 'Mistral Large'
];
const productCategories = [
  ['Agents', 'Productivity'], ['Chat', 'Productivity'], ['Video', 'Design'], ['Voice', 'Productivity'], ['Video', 'Design'],
  ['Code', 'Developer Tools'], ['Code', 'Developer Tools'], ['Code', 'Developer Tools'], ['Chat', 'Developer Tools'], ['Code', 'Developer Tools'],
  ['Chat', 'Developer Tools'], ['Code', 'Developer Tools'], ['Code', 'Developer Tools'], ['Code', 'Developer Tools'], ['Agents', 'Productivity'],
  ['Search', 'Productivity'], ['Chat', 'Productivity'], ['Chat', 'Productivity'], ['Image', 'Design'], ['Voice', 'Productivity'],
  ['Agents', 'Productivity'], ['Image', 'Design'], ['Chat', 'Productivity'], ['Image', 'Design'], ['Image', 'Design'],
  ['Code', 'Developer Tools'], ['Search', 'Productivity'], ['Agents', 'Productivity'], ['Video', 'Design'],
  ['Image', 'Design'], ['Video', 'Design'], ['Code', 'Developer Tools'], ['Image', 'Design'],
  ['Chat', 'Productivity'], ['Image', 'Design'], ['Chat', 'Productivity'], ['Chat', 'Productivity']
];

for (let i = 0; i < extraProductNames.length; i++) {
  const name = extraProductNames[i];
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const existing = products.find(p => p.id === id);
  if (!existing) {
    const categories = productCategories[i] || ['Productivity'];
    products.push({
      id,
      name,
      tagline: `Leading tool for ${categories.join(' and ')} workloads.`,
      logoUrl: `https://images.unsplash.com/photo-${1550000000000 + i * 400000}?w=100&auto=format&fit=crop&q=80`,
      companyId: id.includes('claude') ? 'anthropic' :
                 id.includes('perplexity') ? 'perplexity' :
                 id.includes('runway') ? 'runway' :
                 id.includes('eleven') ? 'elevenlabs' :
                 id.includes('pika') ? 'pika' :
                 id.includes('lovable') ? 'lovable' :
                 id.includes('groq') ? 'groq' :
                 id.includes('together') ? 'together-ai' :
                 id.includes('hugging') ? 'hugging-face' :
                 id.includes('scale') ? 'scale-ai' :
                 id.includes('dbrx') ? 'databricks' :
                 id.includes('pinecone') ? 'pinecone' :
                 id.includes('w-b') ? 'weights-biases' :
                 id.includes('devin') ? 'cognition' :
                 id.includes('adept') ? 'adept' :
                 id.includes('glean') ? 'glean' :
                 id.includes('reka') ? 'reka' :
                 id.includes('deci') ? 'deci' :
                 id.includes('typeface') ? 'typeface' :
                 id.includes('granola') ? 'granola' :
                 id.includes('memgpt') ? 'memgpt' :
                 id.includes('bria') ? 'bria-ai' :
                 id.includes('characterx') ? 'characterx' :
                 id.includes('unity') ? 'unity' :
                 id.includes('palette') ? 'palette' :
                 id.includes('ollama') ? 'ollama' :
                 id.includes('phind') ? 'phind' :
                 id.includes('harvey') ? 'harvey' :
                 id.includes('luma') ? 'luma-ai' :
                 id.includes('clarity') ? 'clarity' :
                 id.includes('synthesia') ? 'synthesia' :
                 id.includes('rockset') ? 'rockset' :
                 id.includes('global') ? 'global-illumination' :
                 id.includes('ssi') ? 'safe-superintelligence--ssi-' :
                 id.includes('world') ? 'world-labs' :
                 id.includes('cohere') ? 'cohere' :
                 id.includes('mistral') ? 'mistral-ai' : 'openai',
      categories,
      votesCount: 1000 + (i * 120),
      commentsCount: 20 + (i * 4),
      isTrending: i < 5,
      isPopularRightNow: i < 8,
      releaseDate: `2024-0${(i % 9) + 1}-10`,
      tags: ['AI', categories[0] || 'App']
    });
  }
}

// Adjust count to exactly 40
if (products.length > 40) {
  products.splice(40);
}

// Sort products: real/verified parent companies first, generic ones last
products.sort((a, b) => {
  const aNorm = a.companyId.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const bNorm = b.companyId.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const aReal = realCompanyKeys.some(k => aNorm.includes(k));
  const bReal = realCompanyKeys.some(k => bNorm.includes(k));
  if (aReal && !bReal) return -1;
  if (!aReal && bReal) return 1;
  return 0;
});

// ==========================================
// 5. NEWS ARTICLES (Target: 150)
// ==========================================
export const news: NewsArticle[] = [
  { id: 'openai-gpt5-launch', title: 'OpenAI begins training next-generation frontier model GPT-5', date: 'May 10, 2025', source: 'TechCrunch', companyId: 'openai' },
  { id: 'openai-raises-6.6b', title: 'OpenAI raises $6.6B in new funding round led by Thrive Capital at $157B valuation', date: 'May 31, 2025', source: 'Wall Street Journal', companyId: 'openai' },
  { id: 'openai-operator-agent', title: 'OpenAI releases Operator: an AI agent for everyday digital browser tasks', date: 'Jan 23, 2025', source: 'The Verge', companyId: 'openai' },
  { id: 'anthropic-claude-computer-use', title: 'Anthropic announces Claude Computer Use, allowing AI to control desktops', date: 'Oct 22, 2024', source: 'Wired', companyId: 'anthropic' },
  { id: 'perplexity-valuation-1b', title: 'Perplexity AI reaches $1B valuation backing from NVIDIA and Jeff Bezos', date: 'Jan 15, 2024', source: 'Bloomberg', companyId: 'perplexity' },
  { id: 'cursor-raises-30m-series-a', title: 'Anysphere, maker of Cursor code editor, raises $30M Series A from a16z', date: 'Aug 22, 2024', source: 'Forbes', companyId: 'cursor' }
];

const newsTemplates = [
  '{company} launches new multimodal agent for developer workflows',
  '{company} announces strategic partnership with Microsoft for compute scaling',
  '{company} surpasses {number} active enterprise customers in landmark milestone',
  '{company} releases state-of-the-art open source model with {number}B parameters',
  '{company} raises Series {round} funding of {funding} led by {investor}',
  '{company} introduces real-time voice synthesis API with sub-100ms latency',
  '{company} hires key researchers from OpenAI and Google DeepMind',
  '{company} opens new research hub in Paris to tap into European talent pool',
  '{company} hits $100M annual recurring revenue (ARR) running rate',
  '{company} launches mobile application with offline vector search capacity'
];
const templateCompanies = companies.map(c => c.name);
const templateRounds = ['B', 'C', 'D', 'E'];
const templateFundings = ['$45M', '$80M', '$150M', '$250M', '$500M'];
const templateInvestors = ['Sequoia Capital', 'Andreessen Horowitz', 'Lightspeed', 'Accel', 'General Catalyst'];
const templateNumbers = ['10,000', '50,000', '100,000', '1M', '10M'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

for (let i = 0; i < 144; i++) {
  const companyObj = companies[i % companies.length] || companies[0];
  const company = companyObj.name;
  const template = newsTemplates[i % newsTemplates.length];
  let title = template
    .replace('{company}', company)
    .replace('{number}', templateNumbers[i % templateNumbers.length])
    .replace('{round}', templateRounds[i % templateRounds.length])
    .replace('{funding}', templateFundings[i % templateFundings.length])
    .replace('{investor}', templateInvestors[i % templateInvestors.length]);

  const month = months[i % 12];
  const day = (i % 28) + 1;
  const year = 2024 + (i % 3 === 0 ? 1 : 0);

  news.push({
    id: `dynamic-news-${i}`,
    title,
    date: `${month} ${day}, ${year}`,
    source: i % 2 === 0 ? 'TechCrunch' : i % 3 === 0 ? 'VentureBeat' : 'Bloomberg',
    companyId: companyObj.id
  });
}

// ==========================================
// 6. FUNDING ROUNDS (Target: 20)
// ==========================================
export interface FundingRound {
  id: string;
  companyId: string;
  companyName: string;
  round: string;
  amount: string;
  date: string;
  leadInvestors: string[];
}

export const fundingRounds: FundingRound[] = [
  { id: 'r1', companyId: 'openai', companyName: 'OpenAI', round: 'Growth II', amount: '$6.6B', date: 'May 31, 2025', leadInvestors: ['Thrive Capital', 'SoftBank'] },
  { id: 'r2', companyId: 'openai', companyName: 'OpenAI', round: 'Growth I', amount: '$10B', date: 'Jan 23, 2023', leadInvestors: ['Microsoft'] },
  { id: 'r3', companyId: 'anthropic', companyName: 'Anthropic', round: 'Growth', amount: '$4.0B', date: 'Feb 12, 2024', leadInvestors: ['Amazon', 'Google'] },
  { id: 'r4', companyId: 'perplexity', companyName: 'Perplexity AI', round: 'Series C', amount: '$63M', date: 'Apr 23, 2024', leadInvestors: ['Daniel Gross'] },
  { id: 'r5', companyId: 'cursor', companyName: 'Cursor', round: 'Series A', amount: '$30M', date: 'Aug 22, 2024', leadInvestors: ['a16z', 'Thrive Capital'] }
];

for (let i = 5; i < 20; i++) {
  const companyObj = companies[(i + 3) % companies.length] || companies[0];
  const roundName = i % 2 === 0 ? 'Series B' : 'Series C';
  const amount = `$${25 + i * 8}M`;
  const month = months[i % 12];
  const day = (i % 25) + 1;
  const year = 2025 - (i % 2);

  fundingRounds.push({
    id: `r-gen-${i}`,
    companyId: companyObj.id,
    companyName: companyObj.name,
    round: roundName,
    amount,
    date: `${month} ${day}, ${year}`,
    leadInvestors: [templateInvestors[i % templateInvestors.length]]
  });
}
