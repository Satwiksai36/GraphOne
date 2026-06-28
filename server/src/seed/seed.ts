import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const templateInvestors = ['Sequoia Capital', 'Andreessen Horowitz', 'Lightspeed', 'Accel', 'General Catalyst'];

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing database records
  console.log('🧹 Cleaning old records...');
  await prisma.companyTimeline.deleteMany({});
  await prisma.companyInvestor.deleteMany({});
  await prisma.fundingRound.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.news.deleteMany({});
  await prisma.researchPaper.deleteMany({});
  await prisma.patent.deleteMany({});
  await prisma.acquisition.deleteMany({});
  await prisma.companyInvestment.deleteMany({});
  await prisma.competitor.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.searchHistory.deleteMany({});
  await prisma.category.deleteMany({});
  
  // Clean companies, founders, investors, users
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Company" CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Founder" CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Investor" CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" CASCADE;');

  // 2. Create Default Admin & Normal User
  console.log('👤 Creating users...');
  const adminPassword = await bcrypt.hash('Password123', 10);
  const userPassword = await bcrypt.hash('Password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@graphone.com',
      password: adminPassword,
      name: 'GraphOne Admin',
      role: 'admin',
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  const demoUser = await prisma.user.create({
    data: {
      email: 'user@graphone.com',
      password: userPassword,
      name: 'Demo User',
      role: 'user',
    },
  });
  console.log(`✅ Demo User created: ${demoUser.email}`);

  // 3. Seed 15 Categories
  console.log('🏷️ Seeding 15 Categories...');
  const categoryNames = [
    'AI Agents', 'AI Coding', 'AI Search', 'AI Video', 'AI Voice',
    'AI Infrastructure', 'Healthcare AI', 'Robotics', 'Computer Vision', 'Speech Synthesis',
    'Data Platforms', 'Dev Tools', 'Enterprise Search', 'Cyber Security', 'Consumer AI'
  ];
  
  const categories = [];
  for (const name of categoryNames) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const cat = await prisma.category.create({
      data: {
        name,
        slug,
        count: Math.floor(Math.random() * 200) + 50,
        icon: slug.split('-')[1] || 'default'
      }
    });
    categories.push(cat);
  }
  console.log(`✅ Seeded ${categories.length} categories.`);

  // 4. Seed 50 Founders
  console.log('👥 Seeding 50 Founders...');
  const baseFounders = [
    { id: 'sam-altman', name: 'Sam Altman', role: 'CEO', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', bio: 'CEO of OpenAI and former president of Y Combinator.', linkedin: 'https://linkedin.com/in/samaltman', twitter: 'https://twitter.com/sama' },
    { id: 'greg-brockman', name: 'Greg Brockman', role: 'President & Co-founder', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', bio: 'President and co-founder of OpenAI. Previously CTO of Stripe.', linkedin: 'https://linkedin.com/in/gregbrockman', twitter: 'https://twitter.com/gdb' },
    { id: 'ilya-sutskever', name: 'Ilya Sutskever', role: 'Co-founder & Former Chief Scientist', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', bio: 'Co-founder of OpenAI and Safe Superintelligence (SSI). Key researcher in deep learning.', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com/ilyasut' },
    { id: 'dario-amodei', name: 'Dario Amodei', role: 'CEO & Co-founder', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', bio: 'Co-founder and CEO of Anthropic. Former VP of Research at OpenAI.', twitter: 'https://twitter.com/darioamodei' },
    { id: 'aravind-srinivas', name: 'Aravind Srinivas', role: 'CEO & Co-founder', avatarUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=80', bio: 'CEO and Co-founder of Perplexity AI. Former AI Researcher at OpenAI and DeepMind.', twitter: 'https://twitter.com/aravsrinivas' },
    { id: 'arvid-lunnemark', name: 'Arvid Lunnemark', role: 'Co-founder & CEO', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', bio: 'Co-founder of Cursor (Anysphere). Building the future of coding.', twitter: 'https://twitter.com/arvid_l' },
    { id: 'mati-staniszewski', name: 'Mati Staniszewski', role: 'Co-founder & CEO', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', bio: 'Co-founder and CEO of ElevenLabs, pioneering natural AI voice synthesis.', twitter: 'https://twitter.com/mati_stanis' },
    { id: 'clement-delangue', name: 'Clément Delangue', role: 'Co-founder & CEO', avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', bio: 'Co-founder and CEO of Hugging Face, building the open AI community.', twitter: 'https://twitter.com/clem_delangue' },
    { id: 'alexandr-wang', name: 'Alexandr Wang', role: 'Founder & CEO', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80', bio: 'Founder and CEO of Scale AI. The youngest self-made billionaire.', twitter: 'https://twitter.com/alexandr_wang' },
    { id: 'demis-hassabis', name: 'Demis Hassabis', role: 'CEO & Co-founder', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', bio: 'Co-founder and CEO of Google DeepMind. Pioneer of AI and reinforcement learning.', twitter: 'https://twitter.com/demishassabis' }
  ];

  const founderNames = [
    'Arthur Mensch', 'Aidan Gomez', 'Cristóbal Valenzuela', 'David Holz', 'Matei Zaharia',
    'Ion Stoica', 'Scott Wu', 'Amjad Masad', 'Victor Riparbelli', 'Jonathan Cohen',
    'Denis Yarats', 'Richard Socher', 'Peter Chen', 'Tri Dao', 'Albert Gu',
    'Daniela Amodei', 'Noam Shazeer', 'Daniel Gross', 'Nat Friedman', 'Sarah Guo',
    'Mustafa Suleyman', 'Karpathy Andrej', 'Gergely Orosz', 'Percy Liang', 'Chris Lattner',
    'Richard Socher', 'Jeff Dean', 'Sanjay Ghemawat', 'Quoc Le', 'Fei-Fei Li',
    'Yann LeCun', 'Yoshua Bengio', 'Geoffrey Hinton', 'Andrew Ng', 'Andrej Karpathy',
    'Shane Legg', 'Mustafa Suleyman', 'Blaise Aguera', 'Daphne Koller', 'Sebastian Thrun'
  ];

  const foundersData = [...baseFounders];
  for (let i = 0; i < 40; i++) {
    const name = founderNames[i] || `Founder ${i + 11}`;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!foundersData.some(f => f.id === id)) {
      foundersData.push({
        id,
        name,
        role: i % 3 === 0 ? 'Co-founder & CTO' : i % 2 === 0 ? 'Co-founder & Chief Scientist' : 'Founder & CEO',
        avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + i * 1234567}?w=150&auto=format&fit=crop&q=80`,
        bio: `Pioneering researcher and co-founder in artificial intelligence and automation.`,
        linkedin: `https://linkedin.com/in/${id}`,
        twitter: `https://twitter.com/${id}`
      });
    }
  }

  // Slice to exactly 50
  const finalFounders = foundersData.slice(0, 50);
  for (const f of finalFounders) {
    await prisma.founder.create({ data: f });
  }
  console.log(`✅ Seeded ${finalFounders.length} founders.`);

  // 5. Seed 30 Investors
  console.log('🏦 Seeding 30 Investors...');
  const baseInvestors = [
    {
      id: 'sequoia-capital',
      name: 'Sequoia Capital',
      slug: 'sequoia-capital',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      bio: 'Sequoia partners with visionary founders building category-defining companies. Our focus is on technology and innovation that creates long-term impact.',
      location: 'Menlo Park, California, USA',
      foundedYear: 1972,
      type: ['VC', 'Growth Equity', 'Private Equity'],
      isVerified: true,
      thesis: 'We partner early with builders. In AI, we believe the infrastructure layer is setting the foundation, but the true breakout value will live in specialized vertical agents and integrated cognitive developer workflows.',
      preferredStages: ['Seed', 'Series A', 'Series B', 'Growth'],
      portfolioConcentration: [
        { sector: 'AI Infrastructure', percentage: 35 },
        { sector: 'AI Agents', percentage: 22 },
        { sector: 'AI Coding', percentage: 18 },
        { sector: 'Healthcare AI', percentage: 15 },
        { sector: 'Other', percentage: 10 }
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
      stats: {
        deals90d: 12,
        leadInvestments: 4,
        mostActiveStage: 'Series A',
        topPartner: 'a16z',
        topFocus: 'AI Agents'
      },
      recentInvestments: [
        { companyId: 'harvey', stage: 'Series D', amount: '$150M', date: 'May 2024', lead: true },
        { companyId: 'luma-ai', stage: 'Series C', amount: '$90M', date: 'Apr 2024', lead: false }
      ],
      relatedInvestors: ['andreessen-horowitz', 'lightspeed-venture-partners', 'accel', 'khosla-ventures']
    },
    {
      id: 'andreessen-horowitz',
      name: 'Andreessen Horowitz (a16z)',
      slug: 'andreessen-horowitz',
      logoUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&auto=format&fit=crop&q=80',
      bio: 'a16z is a venture capital firm that backs bold entrepreneurs building the future through technology.',
      location: 'Menlo Park, California, USA',
      foundedYear: 2009,
      type: ['VC', 'Growth', 'Crypto'],
      isVerified: true,
      thesis: 'Software is eating the world, and AI is digesting it. We invest heavily in open-source AI, foundation models, and AI agent frameworks.',
      preferredStages: ['Seed', 'Series A', 'Series B', 'Growth'],
      portfolioConcentration: [
        { sector: 'AI Infrastructure', percentage: 42 },
        { sector: 'AI Models', percentage: 25 },
        { sector: 'AI Coding', percentage: 15 },
        { sector: 'Gaming & Consumer', percentage: 10 },
        { sector: 'Other', percentage: 8 }
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
      stats: {
        deals90d: 18,
        leadInvestments: 6,
        mostActiveStage: 'Seed/Series A',
        topPartner: 'Sequoia',
        topFocus: 'AI Infrastructure'
      },
      recentInvestments: [
        { companyId: 'mistral-ai', stage: 'Series A', amount: '$110M', date: 'Dec 2023', lead: true }
      ],
      relatedInvestors: ['sequoia-capital', 'lightspeed-venture-partners', 'accel', 'founders-fund']
    }
  ];

  const investorNames = [
    'Lightspeed Venture Partners', 'Khosla Ventures', 'Accel Partners', 'General Catalyst',
    'Y Combinator', 'Thrive Capital', 'Founders Fund', 'SoftBank Vision Fund', 'Tiger Global Management',
    'Google Ventures (GV)', 'Microsoft Corporation', 'Spark Capital', 'Index Ventures', 'Kleiner Perkins',
    'Bessemer Venture Partners', 'IVP', 'NEA', 'Coatue Management', 'Felicis Ventures', 'Redpoint Ventures',
    'Benchmark', 'Greylock Partners', 'CRV', 'Matrix Partners', 'Bain Capital Ventures', 'Radical Ventures',
    'Conviction', 'Theory Ventures'
  ];

  const investorsData = [...baseInvestors];
  for (let i = 0; i < investorNames.length; i++) {
    const name = investorNames[i];
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!investorsData.some(inv => inv.id === id)) {
      investorsData.push({
        id,
        name,
        slug: id,
        logoUrl: `https://images.unsplash.com/photo-${1600000000000 + i * 200000}?w=120&auto=format&fit=crop&q=80`,
        bio: `${name} is a leading global investment firm supporting entrepreneurs at all stages of growth.`,
        location: i % 2 === 0 ? 'San Francisco, California, USA' : 'Menlo Park, California, USA',
        foundedYear: 1980 + (i * 2),
        type: ['VC', 'Growth Equity'],
        isVerified: i % 3 === 0,
        thesis: 'We believe AI is transforming every industry vertical. We invest in both foundational models and application software layers.',
        preferredStages: ['Seed', 'Series A', 'Series B'],
        portfolioConcentration: [
          { sector: 'AI Applications', percentage: 40 },
          { sector: 'AI Infrastructure', percentage: 30 },
          { sector: 'Other', percentage: 30 }
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
        stats: {
          deals90d: 5 + (i % 8),
          leadInvestments: 1 + (i % 4),
          mostActiveStage: i % 2 === 0 ? 'Seed' : 'Series A',
          topPartner: 'a16z',
          topFocus: 'AI Applications'
        },
        recentInvestments: [
          { companyId: 'perplexity', stage: 'Series A', amount: '$20M', date: 'Feb 2024', lead: true }
        ],
        relatedInvestors: ['sequoia-capital', 'andreessen-horowitz']
      });
    }
  }

  const finalInvestors = investorsData.slice(0, 30);
  for (const inv of finalInvestors) {
    await prisma.investor.create({ data: inv });
  }
  console.log(`✅ Seeded ${finalInvestors.length} investors.`);

  // 6. Seed 60 Companies
  console.log('🏢 Seeding 60 Companies...');
  const baseCompanies = [
    {
      id: 'openai',
      name: 'OpenAI',
      slug: 'openai',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      logoBg: 'bg-emerald-950',
      tagline: 'Building safe and beneficial artificial general intelligence.',
      description: 'OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity. We develop ChatGPT, GPT-4, DALL-E, Sora, Operator, and other cutting-edge AI systems.',
      website: 'https://openai.com',
      foundedYear: 2015,
      hq: 'San Francisco, CA, USA',
      employeeCount: '1,000+ employees',
      isVerified: true,
      isPrivate: true,
      category: 'AI Models',
      fundingTotal: '$17.9B',
      valuation: '$80B+',
      tags: ['Artificial Intelligence', 'Machine Learning', 'Generative AI', 'Foundation Models', 'AI Research'],
      socialLinks: {
        twitter: 'https://twitter.com/openai',
        linkedin: 'https://linkedin.com/company/openai',
        github: 'https://github.com/openai',
        youtube: 'https://youtube.com/openai'
      },
      ownership: [
        { category: 'Microsoft', percentage: 49 },
        { category: 'Employees', percentage: 18 },
        { category: 'Founders', percentage: 12 },
        { category: 'Investors', percentage: 21 }
      ],
      openJobs: [
        { title: 'Research Scientist', department: 'Research', location: 'San Francisco, CA', type: 'Full-time' },
        { title: 'Software Engineer, Infrastructure', department: 'Engineering', location: 'San Francisco, CA', type: 'Full-time' },
        { title: 'Product Manager, ChatGPT', department: 'Product', location: 'San Francisco, CA', type: 'Full-time' }
      ],
      views7d: 15200,
      growthRate: 210,
      growthScore: 9.8,
      confidenceScore: 9.5,
      isTrending: true,
      trendingRank: 1,
      isFeatured: true,
      isEmerging: false,
      isUnicorn: true,
      isFrontierLab: true,
      isOpenSourceLeader: false,
      rating: 4.9
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      slug: 'anthropic',
      logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&auto=format&fit=crop&q=80',
      logoBg: 'bg-orange-950',
      tagline: 'AI research and safety that builds helpful, honest, and harmless systems.',
      description: 'Anthropic is an AI safety and research company that builds frontier AI systems. We created Claude, a family of large language models designed to be reliable, safe, and helpful.',
      website: 'https://anthropic.com',
      foundedYear: 2021,
      hq: 'San Francisco, CA, USA',
      employeeCount: '500-1,000 employees',
      isVerified: true,
      isPrivate: true,
      category: 'AI Models',
      fundingTotal: '$7.3B',
      valuation: '$18.4B',
      tags: ['AI Safety', 'Claude', 'Generative AI', 'Large Language Models'],
      socialLinks: { twitter: 'https://twitter.com/anthropic' },
      ownership: [
        { category: 'Amazon', percentage: 25 },
        { category: 'Google', percentage: 12 },
        { category: 'Employees', percentage: 20 },
        { category: 'Founders', percentage: 18 },
        { category: 'Other Investors', percentage: 25 }
      ],
      openJobs: [
        { title: 'Research Engineer', department: 'Research', location: 'San Francisco, CA', type: 'Full-time' }
      ],
      views7d: 14500,
      growthRate: 180,
      growthScore: 8.9,
      confidenceScore: 9.2,
      isTrending: true,
      trendingRank: 2,
      isFeatured: true,
      isEmerging: false,
      isUnicorn: true,
      isFrontierLab: true,
      isOpenSourceLeader: false,
      rating: 4.8
    },
    {
      id: 'perplexity',
      name: 'Perplexity AI',
      slug: 'perplexity',
      logo: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=120&auto=format&fit=crop&q=80',
      logoBg: 'bg-teal-950',
      tagline: 'Where knowledge begins. Direct answers, instantly.',
      description: 'Perplexity is a conversational search engine that delivers instant answers with inline citations. It acts as an answer engine that searches the web in real-time to answer complex questions.',
      website: 'https://perplexity.ai',
      foundedYear: 2022,
      hq: 'San Francisco, CA, USA',
      employeeCount: '100-250 employees',
      isVerified: true,
      isPrivate: true,
      category: 'AI Search',
      fundingTotal: '$165M',
      valuation: '$1B+',
      tags: ['Search Engine', 'LLMs', 'Web Search', 'Conversational AI'],
      socialLinks: { twitter: 'https://twitter.com/perplexity_ai' },
      ownership: [
        { category: 'Founders', percentage: 25 },
        { category: 'NVIDIA', percentage: 5 },
        { category: 'Jeff Bezos', percentage: 3 },
        { category: 'VC Investors', percentage: 52 },
        { category: 'Employees', percentage: 15 }
      ],
      openJobs: [],
      views7d: 12300,
      growthRate: 340,
      growthScore: 9.5,
      confidenceScore: 8.8,
      isTrending: true,
      trendingRank: 3,
      isFeatured: false,
      isEmerging: false,
      isUnicorn: true,
      isFrontierLab: false,
      isOpenSourceLeader: false,
      rating: 4.7
    },
    {
      id: 'cursor',
      name: 'Cursor',
      slug: 'cursor',
      logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120&auto=format&fit=crop&q=80',
      logoBg: 'bg-slate-900',
      tagline: 'The AI-first code editor.',
      description: 'Cursor is an AI-powered code editor built on top of VS Code. It helps developers write, edit, search, and understand code much faster through natural language interactions.',
      website: 'https://cursor.com',
      foundedYear: 2022,
      hq: 'San Francisco, CA, USA',
      employeeCount: '11-50 employees',
      isVerified: true,
      isPrivate: true,
      category: 'AI Coding',
      fundingTotal: '$38M',
      valuation: '$400M',
      tags: ['IDE', 'VS Code', 'AI Coding', 'Autopilot'],
      socialLinks: { twitter: 'https://twitter.com/cursor_ai' },
      ownership: [
        { category: 'Founders', percentage: 40 },
        { category: 'OpenAI Fund', percentage: 10 },
        { category: 'a16z', percentage: 15 },
        { category: 'Thrive Capital', percentage: 10 },
        { category: 'Employees & Others', percentage: 25 }
      ],
      openJobs: [],
      views7d: 15200,
      growthRate: 450,
      growthScore: 9.9,
      confidenceScore: 9.0,
      isTrending: true,
      trendingRank: 4,
      isFeatured: true,
      isEmerging: false,
      isUnicorn: false,
      isFrontierLab: false,
      isOpenSourceLeader: false,
      rating: 4.9
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      slug: 'midjourney',
      logo: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=120&auto=format&fit=crop&q=80',
      logoBg: 'bg-purple-950',
      tagline: 'Expand the imaginative powers of the human species.',
      description: 'Midjourney is an independent research lab exploring new mediums of thought. It generates beautiful images from text prompts through a Discord bot and web platform.',
      website: 'https://midjourney.com',
      foundedYear: 2021,
      hq: 'San Francisco, CA, USA',
      employeeCount: '11-50 employees',
      isVerified: true,
      isPrivate: true,
      category: 'AI Image',
      fundingTotal: '$0 (Self-funded)',
      valuation: '$1B+',
      tags: ['AI Art', 'Image Generation', 'Text-to-Image', 'Discord'],
      socialLinks: { twitter: 'https://twitter.com/midjourney' },
      ownership: [
        { category: 'Founders', percentage: 80 },
        { category: 'Employees', percentage: 20 }
      ],
      openJobs: [],
      views7d: 9700,
      growthRate: 120,
      growthScore: 7.5,
      confidenceScore: 8.5,
      isTrending: true,
      trendingRank: 5,
      isFeatured: false,
      isEmerging: false,
      isUnicorn: true,
      isFrontierLab: false,
      isOpenSourceLeader: false,
      rating: 4.6
    }
  ];

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

  const companiesList: any[] = [...baseCompanies];
  for (let i = 0; i < extraCompanyNames.length; i++) {
    const name = extraCompanyNames[i];
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!companiesList.some(c => c.id === id)) {
      const isFrontier = ['cohere', 'mistral-ai', 'safe-superintelligence--ssi-', 'world-labs', 'safe-superintelligence--ssi'].includes(id);
      const isOpenSource = ['hugging-face', 'mistral-ai', 'ollama', 'databricks', 'together-ai'].includes(id);
      const isUnicorn = ['runway', 'elevenlabs', 'scale-ai', 'databricks', 'pinecone', 'cohere', 'mistral-ai'].includes(id);
      const isTrending = i < 10;
      const isEmerging = i >= 10 && i < 20;

      companiesList.push({
        id,
        name,
        slug: id,
        logo: `https://images.unsplash.com/photo-${1610000000000 + i * 300000}?w=120&auto=format&fit=crop&q=80`,
        logoBg: 'bg-zinc-900',
        tagline: `Pioneering technologies in ${name.includes('Voice') || name.includes('Eleven') ? 'AI Voice' : 'AI Models'}.`,
        description: `${name} is pushing the boundaries of AI research and engineering to deliver powerful enterprise systems.`,
        website: `https://${id}.com`,
        foundedYear: 2018 + (i % 6),
        hq: i % 2 === 0 ? 'San Francisco, CA, USA' : 'Palo Alto, CA, USA',
        employeeCount: i % 3 === 0 ? '1,000+ employees' : '100-250 employees',
        isVerified: i % 2 === 0,
        isPrivate: id !== 'databricks' && id !== 'unity',
        category: name.includes('Code') || name.includes('Coder') ? 'AI Coding' :
                  name.includes('Search') ? 'AI Search' :
                  name.includes('Voice') || name.includes('VoiceGen') ? 'AI Voice' :
                  name.includes('Video') || name.includes('Pika') ? 'AI Video' :
                  name.includes('Agent') ? 'AI Agents' : 'AI Infrastructure',
        fundingTotal: isUnicorn ? '$1B+' : '$45M',
        valuation: isUnicorn ? '$2B+' : undefined,
        tags: ['AI', 'Tech', name.includes('Agent') ? 'Agents' : 'Infrastructure'],
        socialLinks: { twitter: `https://twitter.com/${id}` },
        ownership: [
          { category: 'Founders', percentage: 35 },
          { category: 'Investors', percentage: 45 },
          { category: 'Employees', percentage: 20 }
        ],
        openJobs: [
          { title: 'ML Research Scientist', department: 'Research', location: 'San Francisco, CA', type: 'Full-time' }
        ],
        views7d: 1000 + (i * 250),
        growthRate: 50 + (i * 12),
        growthScore: 6.0 + (i % 4),
        confidenceScore: 7.0 + (i % 3),
        isTrending,
        trendingRank: isTrending ? i + 6 : null,
        isFeatured: i === 0 || i === 2,
        isEmerging,
        isUnicorn,
        isFrontierLab: isFrontier,
        isOpenSourceLeader: isOpenSource,
        rating: 4.0 + ((i % 10) / 10)
      });
    }
  }

  // Adjust count to exactly 60
  const finalCompanies = companiesList.slice(0, 60);

  // Write companies to DB
  for (const comp of finalCompanies) {
    const { ownership, openJobs, ...dbComp } = comp as any;
    await prisma.company.create({
      data: {
        ...dbComp,
        ownership: ownership || [],
        openJobs: openJobs || []
      }
    });
  }
  console.log(`✅ Seeded ${finalCompanies.length} companies.`);

  // 7. Seed relations and child tables (CompanyInvestor, Founders, Timelines)
  console.log('🔗 Seeding Company-Founder, Company-Investor links & Company Timelines...');
  
  // Associate founders to companies
  // OpenAI: sam-altman, greg-brockman, ilya-sutskever
  await prisma.company.update({
    where: { id: 'openai' },
    data: {
      founders: {
        connect: [{ id: 'sam-altman' }, { id: 'greg-brockman' }, { id: 'ilya-sutskever' }]
      }
    }
  });

  // Anthropic: dario-amodei
  await prisma.company.update({
    where: { id: 'anthropic' },
    data: { founders: { connect: [{ id: 'dario-amodei' }] } }
  });

  // Perplexity: aravind-srinivas
  await prisma.company.update({
    where: { id: 'perplexity' },
    data: { founders: { connect: [{ id: 'aravind-srinivas' }] } }
  });

  // Cursor: arvid-lunnemark
  await prisma.company.update({
    where: { id: 'cursor' },
    data: { founders: { connect: [{ id: 'arvid-lunnemark' }] } }
  });

  // Midjourney: david-holz
  // If david-holz is a founder, connect
  const hasDavid = await prisma.founder.findUnique({ where: { id: 'david-holz' } });
  if (hasDavid) {
    await prisma.company.update({
      where: { id: 'midjourney' },
      data: { founders: { connect: [{ id: 'david-holz' }] } }
    });
  }

  // Map remaining founders to remaining companies randomly
  const allFoundersDb = await prisma.founder.findMany({});
  const allCompaniesDb = await prisma.company.findMany({});
  for (let i = 5; i < allFoundersDb.length; i++) {
    const f = allFoundersDb[i];
    const c = allCompaniesDb[i % allCompaniesDb.length];
    if (c && c.id !== 'openai' && c.id !== 'anthropic' && c.id !== 'perplexity' && c.id !== 'cursor' && c.id !== 'midjourney') {
      await prisma.company.update({
        where: { id: c.id },
        data: { founders: { connect: [{ id: f.id }] } }
      });
    }
  }

  // Seed CompanyInvestor table (join table)
  // Sequoia Capital investing in OpenAI (seed/series/growth)
  await prisma.companyInvestor.create({ data: { companyId: 'openai', investorId: 'sequoia-capital', type: 'series' } });
  await prisma.companyInvestor.create({ data: { companyId: 'openai', investorId: 'andreessen-horowitz', type: 'series' } });
  await prisma.companyInvestor.create({ data: { companyId: 'anthropic', investorId: 'sequoia-capital', type: 'growth' } });
  await prisma.companyInvestor.create({ data: { companyId: 'perplexity', investorId: 'sequoia-capital', type: 'series' } });
  await prisma.companyInvestor.create({ data: { companyId: 'cursor', investorId: 'andreessen-horowitz', type: 'series' } });

  // Map remaining investors
  const allInvestorsDb = await prisma.investor.findMany({});
  for (let i = 0; i < allCompaniesDb.length; i++) {
    const c = allCompaniesDb[i];
    const inv1 = allInvestorsDb[i % allInvestorsDb.length];
    const inv2 = allInvestorsDb[(i + 1) % allInvestorsDb.length];
    const typeVal = i % 3 === 0 ? 'seed' : i % 2 === 0 ? 'series' : 'growth';
    
    // Check if link already exists
    const exists = await prisma.companyInvestor.findFirst({
      where: { companyId: c.id, investorId: inv1.id }
    });
    if (!exists) {
      await prisma.companyInvestor.create({
        data: { companyId: c.id, investorId: inv1.id, type: typeVal }
      });
    }
    const exists2 = await prisma.companyInvestor.findFirst({
      where: { companyId: c.id, investorId: inv2.id }
    });
    if (!exists2) {
      await prisma.companyInvestor.create({
        data: { companyId: c.id, investorId: inv2.id, type: typeVal }
      });
    }
  }

  // Seed Timelines
  console.log('⏰ Seeding company timelines...');
  const timelines = [
    { companyId: 'openai', year: 2015, event: 'OpenAI Founded as non-profit' },
    { companyId: 'openai', year: 2019, event: 'Transitioned to capped-profit model & Microsoft partner' },
    { companyId: 'openai', year: 2022, event: 'ChatGPT launched, sparking AI revolution' },
    { companyId: 'openai', year: 2024, event: 'Sora video generator model launched' },
    { companyId: 'anthropic', year: 2021, event: 'Anthropic founded by OpenAI alumni' },
    { companyId: 'anthropic', year: 2023, event: 'Claude LLM launched' },
    { companyId: 'perplexity', year: 2022, event: 'Perplexity founded to redefine Search' },
    { companyId: 'cursor', year: 2022, event: 'Anysphere (parent of Cursor) founded' }
  ];
  for (const t of timelines) {
    await prisma.companyTimeline.create({ data: t });
  }

  // Create random timelines for remaining companies
  for (let i = 0; i < allCompaniesDb.length; i++) {
    const c = allCompaniesDb[i];
    // Check if timeline already seeded
    const count = await prisma.companyTimeline.count({ where: { companyId: c.id } });
    if (count === 0) {
      await prisma.companyTimeline.create({
        data: { companyId: c.id, year: 2022, event: `${c.name} Founded` }
      });
      await prisma.companyTimeline.create({
        data: { companyId: c.id, year: 2024, event: `${c.name} launched v1.0 core engine` }
      });
    }
  }

  // 8. Seed 40 Products
  console.log('🛍️ Seeding 40 Products...');
  const baseProducts = [
    { id: 'chatgpt', name: 'ChatGPT', tagline: 'Conversational AI for any question or task.', description: 'ChatGPT is a conversational language model that can chat, write code, answer questions, draft documents, and perform complex analysis using OpenAI\'s core models.', logoUrl: 'https://images.unsplash.com/photo-1678269137975-47dc939b456d?w=100&auto=format&fit=crop&q=80', companyId: 'openai', categories: ['Chat', 'Productivity'], votesCount: 5120, commentsCount: 341, isTrending: true, isPopularRightNow: true, releaseDate: '2022-11-30', tags: ['Chatbot', 'LLM', 'Writing', 'Code'] },
    { id: 'gpt-4o', name: 'GPT-4o', tagline: 'Omni multimodal foundation model.', description: 'GPT-4o is OpenAI\'s flagship omni model, reasoning across audio, vision, and text in real-time. Powering next-gen conversational and automation workloads.', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80', companyId: 'openai', categories: ['Code', 'Developer Tools'], votesCount: 8340, commentsCount: 173, isTrending: true, isPopularRightNow: true, releaseDate: '2024-05-13', tags: ['Multimodal', 'LLM', 'API', 'Real-time'] },
    { id: 'codex', name: 'Codex', tagline: 'AI system that translates natural language to code.', logoUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=100&auto=format&fit=crop&q=80', companyId: 'openai', categories: ['Code', 'Developer Tools'], votesCount: 3500, commentsCount: 92, isTrending: false, isPopularRightNow: false, releaseDate: '2021-08-10', tags: ['Coding', 'Autocomplete'] },
    { id: 'sora', name: 'Sora', tagline: 'Text-to-video foundation model.', logoUrl: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=100&auto=format&fit=crop&q=80', companyId: 'openai', categories: ['Video', 'Generative AI'], votesCount: 4200, commentsCount: 220, isTrending: true, isPopularRightNow: false, releaseDate: '2024-02-15', tags: ['Video Gen', 'Text-to-Video'] },
    { id: 'operator', name: 'Operator', tagline: 'Autonomous AI agent for browser automation tasks.', logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&auto=format&fit=crop&q=80', companyId: 'openai', categories: ['Agents', 'Productivity'], votesCount: 6800, commentsCount: 410, isTrending: true, isPopularRightNow: true, releaseDate: '2025-01-20', tags: ['Browser Agent', 'RPA', 'Automation'] },
    { id: 'openai-agents', name: 'OpenAI Agents SDK', tagline: 'SDK for building autonomous developer agents.', logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80', companyId: 'openai', categories: ['Agents', 'Developer Tools'], votesCount: 2800, commentsCount: 115, isTrending: false, isPopularRightNow: false, releaseDate: '2025-02-10', tags: ['Agents', 'Developer', 'Node', 'Python'] },
    { id: 'claude-3-5', name: 'Claude 3.5 Sonnet', tagline: 'AI assistant for thoughtful work and collaboration.', description: 'Claude 3.5 Sonnet sets new industry benchmarks for graduate-level reasoning, undergraduate-level knowledge, and coding proficiency.', logoUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80', companyId: 'anthropic', categories: ['Chat', 'Productivity'], votesCount: 6700, commentsCount: 89, isTrending: true, isPopularRightNow: true, releaseDate: '2024-06-21', tags: ['LLM', 'Claude', 'Reasoning', 'Coding'] },
    { id: 'perplexity-pro', name: 'Perplexity Pro', tagline: 'AI search engine for real-time answers with citations.', logoUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=100&auto=format&fit=crop&q=80', companyId: 'perplexity', categories: ['Chat', 'Productivity'], votesCount: 2900, commentsCount: 144, isTrending: true, isPopularRightNow: false, releaseDate: '2023-03-01', tags: ['Search Engine', 'Research', 'AI Assistant'] },
    { id: 'cursor-editor', name: 'Cursor', tagline: 'The AI-first code editor built for speed and productivity.', logoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&auto=format&fit=crop&q=80', companyId: 'cursor', categories: ['Code', 'Developer Tools'], votesCount: 8300, commentsCount: 173, isTrending: true, isPopularRightNow: true, releaseDate: '2023-01-15', tags: ['Editor', 'VS Code', 'Autocomplete', 'Chat'] },
    { id: 'midjourney-v6', name: 'Midjourney v6', tagline: 'Generative AI for beautiful images from text prompts.', logoUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&auto=format&fit=crop&q=80', companyId: 'midjourney', categories: ['Image', 'Design'], votesCount: 5500, commentsCount: 386, isTrending: true, isPopularRightNow: true, releaseDate: '2023-12-21', tags: ['Images', 'Generative Art', 'Text-to-Image'] }
  ];

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

  const productsList = [...baseProducts];
  for (let i = 0; i < extraProductNames.length; i++) {
    const name = extraProductNames[i];
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!productsList.some(p => p.id === id)) {
      const categories = productCategories[i] || ['Productivity'];
      const parentCoId = id.includes('claude') ? 'anthropic' :
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
                        id.includes('mistral') ? 'mistral-ai' : 'openai';
      
      // Make sure parent exists in DB, otherwise assign to openai
      const parentExists = finalCompanies.some(c => c.id === parentCoId);
      const companyId = parentExists ? parentCoId : 'openai';

      productsList.push({
        id,
        name,
        tagline: `Leading tool for ${categories.join(' and ')} workloads.`,
        description: `Autonomous software system designed to optimize workflows in ${categories.join('/')}.`,
        logoUrl: `https://images.unsplash.com/photo-${1550000000000 + i * 400000}?w=100&auto=format&fit=crop&q=80`,
        companyId,
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
  const finalProducts = productsList.slice(0, 40);
  for (const prod of finalProducts) {
    await prisma.product.create({ data: prod });
  }
  console.log(`✅ Seeded ${finalProducts.length} products.`);

  // 9. Seed 150 News
  console.log('📰 Seeding 150 News Articles...');
  const baseNews = [
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

  const templateRounds = ['B', 'C', 'D', 'E'];
  const templateFundings = ['$45M', '$80M', '$150M', '$250M', '$500M'];
  const templateInvestorsLocal = ['Sequoia Capital', 'Andreessen Horowitz', 'Lightspeed', 'Accel', 'General Catalyst'];
  const templateNumbers = ['10,000', '50,000', '100,000', '1M', '10M'];

  const newsList = [...baseNews];
  for (let i = 0; i < 144; i++) {
    const compObj = finalCompanies[i % finalCompanies.length];
    const company = compObj.name;
    const template = newsTemplates[i % newsTemplates.length];
    const title = template
      .replace('{company}', company)
      .replace('{number}', templateNumbers[i % templateNumbers.length])
      .replace('{round}', templateRounds[i % templateRounds.length])
      .replace('{funding}', templateFundings[i % templateFundings.length])
      .replace('{investor}', templateInvestorsLocal[i % templateInvestorsLocal.length]);

    const month = months[i % 12];
    const day = (i % 28) + 1;
    const year = 2024 + (i % 3 === 0 ? 1 : 0);

    newsList.push({
      id: `dynamic-news-${i}`,
      title,
      date: `${month} ${day}, ${year}`,
      source: i % 2 === 0 ? 'TechCrunch' : i % 3 === 0 ? 'VentureBeat' : 'Bloomberg',
      companyId: compObj.id
    });
  }

  // Adjust count to exactly 150
  const finalNews = newsList.slice(0, 150);
  for (const n of finalNews) {
    await prisma.news.create({ data: n });
  }
  console.log(`✅ Seeded ${finalNews.length} news articles.`);

  // 10. Seed 30 Funding Rounds
  console.log('💰 Seeding 30 Funding Rounds...');
  const baseFundingRounds = [
    { id: 'r1', companyId: 'openai', companyName: 'OpenAI', round: 'Growth II', amount: '$6.6B', date: 'May 31, 2025', leadInvestors: ['Thrive Capital', 'SoftBank'] },
    { id: 'r2', companyId: 'openai', companyName: 'OpenAI', round: 'Growth I', amount: '$10B', date: 'Jan 23, 2023', leadInvestors: ['Microsoft'] },
    { id: 'r3', companyId: 'anthropic', companyName: 'Anthropic', round: 'Growth', amount: '$4.0B', date: 'Feb 12, 2024', leadInvestors: ['Amazon', 'Google'] },
    { id: 'r4', companyId: 'perplexity', companyName: 'Perplexity AI', round: 'Series C', amount: '$63M', date: 'Apr 23, 2024', leadInvestors: ['Daniel Gross'] },
    { id: 'r5', companyId: 'cursor', companyName: 'Cursor', round: 'Series A', amount: '$30M', date: 'Aug 22, 2024', leadInvestors: ['a16z', 'Thrive Capital'] }
  ];

  const fundingRoundsList = [...baseFundingRounds];
  for (let i = 5; i < 30; i++) {
    const compObj = finalCompanies[(i + 3) % finalCompanies.length];
    const roundName = i % 2 === 0 ? 'Series B' : 'Series C';
    const amount = `$${25 + i * 8}M`;
    const month = months[i % 12];
    const day = (i % 25) + 1;
    const year = 2025 - (i % 2);

    fundingRoundsList.push({
      id: `r-gen-${i}`,
      companyId: compObj.id,
      companyName: compObj.name,
      round: roundName,
      amount,
      date: `${month} ${day}, ${year}`,
      leadInvestors: [templateInvestors[i % templateInvestors.length]]
    });
  }

  // Adjust count to exactly 30
  const finalFundingRounds = fundingRoundsList.slice(0, 30);
  for (const fr of finalFundingRounds) {
    await prisma.fundingRound.create({ data: fr });
  }
  console.log(`✅ Seeded ${finalFundingRounds.length} funding rounds.`);

  // 11. Seed Research Papers, Patents, Acquisitions, Competitors for each core company
  console.log('📄 Seeding Research Papers, Patents, Acquisitions and Competitors...');
  
  // OpenAI Papers
  const papers = [
    { title: 'GPT-4 Technical Report', date: 'Mar 2023', companyId: 'openai' },
    { title: 'GPT-4o System Card', date: 'May 2024', companyId: 'openai' },
    { title: 'Sora: A Review', date: 'Feb 2024', companyId: 'openai' },
    { title: 'DALL-E 3 Technical Report', date: 'Oct 2023', companyId: 'openai' },
    { title: 'Whisper: Robust Speech Recognition', date: 'Sep 2022', companyId: 'openai' }
  ];
  for (const p of papers) {
    await prisma.researchPaper.create({ data: p });
  }

  // OpenAI Patents
  const patents = [
    { title: 'System for training large language models', category: 'AI / ML', owner: 'OpenAI', filedDate: '2022-03-14', publishedDate: '2023-09-21', companyId: 'openai' },
    { title: 'Methods for aligning AI models', category: 'AI Safety', owner: 'OpenAI', filedDate: '2022-07-11', publishedDate: '2022-12-28', companyId: 'openai' },
    { title: 'Efficient inference for transformer models', category: 'AI / ML', owner: 'OpenAI', filedDate: '2023-05-09', publishedDate: '2023-11-02', companyId: 'openai' }
  ];
  for (const pat of patents) {
    await prisma.patent.create({ data: pat });
  }

  // OpenAI Acquisitions
  const acquisitions = [
    { companyName: 'Rockset', date: '2024', focus: 'Database technology', amount: '$500M', acquirerId: 'openai' },
    { companyName: 'io', date: '2025', focus: 'AI device startup', amount: '$100M', acquirerId: 'openai' }
  ];
  for (const acq of acquisitions) {
    await prisma.acquisition.create({ data: acq });
  }

  // OpenAI Investments
  const investments = [
    { company: 'Figure', focus: 'Humanoid Robotics', stage: 'Series B', amount: '$675M', companyId: 'openai' },
    { company: 'Harvey', focus: 'Legal AI', stage: 'Series C', amount: '$80M', companyId: 'openai' },
    { company: 'Physical Intelligence', focus: 'Robotics AI', stage: 'Series A', amount: '$70M', companyId: 'openai' }
  ];
  for (const inv of investments) {
    await prisma.companyInvestment.create({ data: inv });
  }

  // OpenAI Competitors
  const competitorLinks = [
    { companyId: 'openai', competitorId: 'anthropic', isAdjacent: false },
    { companyId: 'openai', competitorId: 'google-deepmind', isAdjacent: false },
    { companyId: 'openai', competitorId: 'perplexity', isAdjacent: true },
    { companyId: 'openai', competitorId: 'cursor', isAdjacent: true }
  ];
  for (const link of competitorLinks) {
    const compExist = await prisma.company.findUnique({ where: { id: link.companyId } });
    const relExist = await prisma.company.findUnique({ where: { id: link.competitorId } });
    if (compExist && relExist) {
      await prisma.competitor.create({ data: link });
    }
  }

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
