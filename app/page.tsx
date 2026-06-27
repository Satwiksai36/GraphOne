'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, ArrowRight, Grid, List, Sparkles, Filter, 
  RefreshCw, TrendingUp, DollarSign, Award, Bot, Code, Info
} from 'lucide-react';

// Import mock data
import { companies, fundingRounds, news } from '@/data/mockDb';
import { Company } from '@/types';

// Import custom cards
import { TrendingCardFeatured, TrendingCardSimple } from '@/components/cards/TrendingCard';
import { GrowthCard } from '@/components/cards/GrowthCard';
import { EmergingCard } from '@/components/cards/EmergingCard';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { LeaderboardCard, LeaderboardItem } from '@/components/cards/LeaderboardCard';
import { UnicornCard } from '@/components/cards/UnicornCard';
import { CompanyListCard } from '@/components/cards/CompanyListCard';
import { useToast } from '@/components/ui/Toast';

export default function CompaniesHomePage() {
  const { toast } = useToast();
  const directoryRef = useRef<HTMLDivElement>(null);

  // States for directory filtering and searching
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(12);

  // ----------------------------------------------------
  // Static lists based on mock database properties
  // ----------------------------------------------------
  
  // Trending Section (top 5)
  const trendingFeatured = useMemo(() => companies.filter(c => c.isTrending).slice(0, 3), []);
  const trendingSimple = useMemo(() => companies.filter(c => c.isTrending).slice(3, 5), []);

  // Fastest Growing Section (top 5)
  const fastestGrowing = useMemo(() => companies.filter(c => c.growthRate && c.growthRate > 100).slice(0, 5), []);

  // Emerging section
  const emergingCompanies = useMemo(() => companies.filter(c => c.isEmerging).slice(0, 4), []);

  // AI Unicorns
  const unicorns = useMemo(() => companies.filter(c => c.isUnicorn).slice(0, 8), []);

  // Frontier AI Labs
  const frontierLabs = useMemo(() => companies.filter(c => c.isFrontierLab).slice(0, 6), []);

  // Open Source Leaders
  const openSourceLeaders = useMemo(() => companies.filter(c => c.isOpenSourceLeader).slice(0, 5), []);

  // ----------------------------------------------------
  // Dynamic categories with counts
  // ----------------------------------------------------
  const categoriesList = [
    { name: 'AI Agents', count: 1248, iconName: 'agents' },
    { name: 'AI Coding', count: 862, iconName: 'coding' },
    { name: 'AI Search', count: 324, iconName: 'search' },
    { name: 'AI Video', count: 582, iconName: 'video' },
    { name: 'AI Voice', count: 412, iconName: 'voice' },
    { name: 'AI Infrastructure', count: 972, iconName: 'infra' },
    { name: 'Healthcare AI', count: 687, iconName: 'health' },
    { name: 'Robotics', count: 398, iconName: 'robotics' }
  ];

  // ----------------------------------------------------
  // Leaderboards Mock Lists (Breakout, Funding, Watch)
  // ----------------------------------------------------
  const breakoutItems: LeaderboardItem[] = [
    { id: 'pika', name: 'Pika', subtitle: 'Launched new 1.0 video editor model', badge: 'Video AI', route: '/company/pika' },
    { id: 'cognition', name: 'Cognition', subtitle: 'Closed $175M Series B funding', badge: 'Dev Tools', route: '/company/cognition' },
    { id: 'adept', name: 'Adept', subtitle: 'Enterprise agent adoption surged 200%', badge: 'Agents', route: '/company/adept' }
  ];

  const fundingItems: LeaderboardItem[] = useMemo(() => {
    return fundingRounds.slice(0, 3).map(r => ({
      id: r.id,
      name: r.companyName,
      subtitle: `${r.amount} ${r.round}`,
      badge: 'Rounds',
      route: `/company/${r.companyId}`
    }));
  }, []);

  const watchItems: LeaderboardItem[] = [
    { id: 'deci', name: 'Deci', subtitle: 'AI inference optimization engine', badge: 'High Perf', route: '/company/deci' },
    { id: 'typeface', name: 'Typeface', subtitle: 'AI marketing content creation suite', badge: 'Creative', route: '/company/typeface' },
    { id: 'granola', name: 'Granola', subtitle: 'AI meeting notes companion for teams', badge: 'Voice AI', route: '/company/granola' }
  ];

  // ----------------------------------------------------
  // Filtering & Sorting Directory logic
  // ----------------------------------------------------
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      // Search text match
      const matchesSearch = 
        searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category match
      const matchesCategory = 
        selectedCategory === 'All' ||
        c.categories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase().replace('ai ', '')));
      
      // Funding stage match
      const matchesStage = 
        selectedStage === 'All' ||
        c.fundingTimeline.some(r => r.round.toLowerCase().includes(selectedStage.toLowerCase()));

      // Country/Location match (simplistic logic matching USA vs Europe)
      const matchesCountry = 
        selectedCountry === 'All' ||
        (selectedCountry === 'USA' && c.location.toLowerCase().includes('usa')) ||
        (selectedCountry === 'International' && !c.location.toLowerCase().includes('usa'));

      return matchesSearch && matchesCategory && matchesStage && matchesCountry;
    }).sort((a, b) => {
      // Sort logic
      if (sortBy === 'valuation') {
        const valA = parseFloat(a.valuation?.replace(/[^0-9.]/g, '') || '0');
        const valB = parseFloat(b.valuation?.replace(/[^0-9.]/g, '') || '0');
        return valB - valA;
      }
      if (sortBy === 'growth') {
        return (b.growthRate || 0) - (a.growthRate || 0);
      }
      // Default: trending (views count)
      return b.views7d - a.views7d;
    });
  }, [searchQuery, selectedCategory, selectedStage, selectedCountry, sortBy]);

  // Click handler for category explorer: updates filter and scrolls to directory
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    toast(`Filtering directory by: ${categoryName}`, 'info');
    
    setTimeout(() => {
      directoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedStage('All');
    setSelectedCountry('All');
    setSortBy('trending');
    setSearchQuery('');
    toast('Filters reset successfully', 'success');
  };

  return (
    <div className="space-y-16 py-6">
      
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="relative overflow-hidden py-12 md:py-20 rounded-3xl bg-radial from-primary/5 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider select-none leading-none">
              <Sparkles className="w-3.5 h-3.5" /> AI Companies Hub
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-foreground">
              Discover the world&apos;s <br />
              <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">most innovative</span> <br />
              AI companies
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Explore AI startups, unicorns, frontier labs, and emerging teams shaping the future of artificial intelligence. Monitor growth velocity, funding stages, and tech stacks.
            </p>

            {/* Hero Search Box (rounded input with absolute pink search button) */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search companies, categories, founders, investors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 text-sm border rounded-full bg-card text-foreground placeholder-muted-foreground outline-0 focus:border-primary transition-colors shadow-sm"
              />
              <button 
                onClick={() => {
                  directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
                  toast('Search parameters applied to directory', 'info');
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#ff385c] hover:bg-[#e0314f] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer select-none"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Badges shortcuts */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {['AI Agents', 'AI Coding', 'AI Search', 'AI Video', 'AI Voice', 'AI Infrastructure', 'More'].map((badge) => (
                <button
                  key={badge}
                  onClick={() => {
                    if (badge === 'More') {
                      directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      handleCategorySelect(badge);
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-full border bg-card hover:bg-secondary text-xs text-muted-foreground font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  {badge === 'AI Agents' && <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                  {badge === 'AI Coding' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  {badge === 'AI Search' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                  {badge === 'AI Video' && <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />}
                  {badge === 'AI Voice' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                  {badge === 'AI Infrastructure' && <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
                  {badge}
                </button>
              ))}
            </div>
          </div>

          {/* Right Floating Diagram Column */}
          <div className="lg:col-span-5 hidden lg:flex justify-center relative select-none">
            {/* Custom SVG Nodes Simulation */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              <div className="absolute inset-0 border border-dashed rounded-full border-muted-foreground/20 animate-spin [animation-duration:40s]" />
              <div className="absolute inset-8 border border-dashed rounded-full border-muted-foreground/30 animate-spin [animation-duration:20s] [animation-direction:reverse]" />
              
              {/* Central Core */}
              <div className="w-16 h-16 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 flex items-center justify-center z-10">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 22h20L12 2zm0 4.8l6.4 12.4H5.6L12 6.8z"/>
                </svg>
              </div>

              {/* Orbiting Points */}
              {[
                { label: 'OpenAI', angle: 0, delay: 0 },
                { label: 'Anthropic', angle: 72, delay: 0.5 },
                { label: 'Perplexity', angle: 144, delay: 1 },
                { label: 'Midjourney', angle: 216, delay: 1.5 },
                { label: 'Cursor', angle: 288, delay: 2 }
              ].map((orbit, i) => {
                const radian = (orbit.angle * Math.PI) / 180;
                const radius = 110;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <motion.div
                    key={orbit.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, delay: orbit.delay }}
                    style={{ x, y }}
                    className="absolute w-10 h-10 rounded-xl bg-card border shadow-md flex items-center justify-center font-bold text-xs text-foreground cursor-pointer"
                  >
                    {orbit.label[0]}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 1: TRENDING COMPANIES
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c] text-[11px] font-black shrink-0">
              1
            </span>
            <div>
              <h2 className="text-xl font-black text-foreground">Trending AI Companies</h2>
              <p className="text-xs text-muted-foreground mt-0.5">The most searched, viewed and discussed AI companies right now.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setSortBy('trending');
              directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5 cursor-pointer leading-none"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top 3 Featured Cards (Grid Col 8) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingFeatured.map((company, index) => (
              <TrendingCardFeatured 
                key={company.id} 
                company={company} 
                rank={index + 1} 
              />
            ))}
          </div>

          {/* Simple Trending List (Grid Col 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            {trendingSimple.map((company, index) => (
              <TrendingCardSimple 
                key={company.id} 
                company={company} 
                rank={index + 4}
              />
            ))}
            <div className="flex-1 rounded-2xl border border-dashed border-muted-foreground/20 flex flex-col items-center justify-center p-6 text-center text-xs text-muted-foreground">
              <Info className="w-6 h-6 opacity-40 mb-2" />
              <span>Trending updates live <br />every 24 hours.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: FASTEST GROWING COMPANIES
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c] text-[11px] font-black shrink-0">
              2
            </span>
            <div>
              <h2 className="text-xl font-black text-foreground">Fastest Growing AI Companies</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Companies showing strong momentum across key growth signals.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setSortBy('growth');
              directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5 cursor-pointer leading-none"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          {/* Growth Cards (Col 3) */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {fastestGrowing.slice(0, 3).map((company, index) => (
              <GrowthCard 
                key={company.id} 
                company={company} 
                index={index} 
              />
            ))}
          </div>

          {/* Marketing/Callout Side Panel */}
          <div className="rounded-2xl bg-linear-to-br from-indigo-900 to-purple-800 text-white p-6 flex flex-col justify-between shadow-xl min-h-[170px]">
            <div>
              <h3 className="text-lg font-bold leading-tight">Explore tomorrow&apos;s market leaders today.</h3>
              <p className="text-xs text-white/70 mt-2 leading-relaxed">Discover companies with the highest growth potential across the AI landscape.</p>
            </div>
            <button 
              onClick={() => {
                setSortBy('growth');
                directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
                toast('Sorted directory by growth rate', 'info');
              }}
              className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-full bg-white text-indigo-950 hover:bg-white/95 font-semibold text-xs transition-all cursor-pointer select-none"
            >
              Explore Growth Leaders <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: EMERGING AI STARTUPS
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c] text-[11px] font-black shrink-0">
              3
            </span>
            <div>
              <h2 className="text-xl font-black text-foreground">Emerging AI Startups to Watch</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Promising early-stage companies gaining real traction.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setSortBy('trending');
              directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5 cursor-pointer leading-none"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 (Featured Wide - Col-Span 2) */}
          {emergingCompanies[0] && (
            <EmergingCard company={emergingCompanies[0]} featured={true} />
          )}
          {/* Card 2 (Standard Square) */}
          {emergingCompanies[1] && (
            <EmergingCard company={emergingCompanies[1]} />
          )}
          {/* Card 3 (Standard Square) */}
          {emergingCompanies[2] && (
            <EmergingCard company={emergingCompanies[2]} />
          )}
          {/* Card 4 (Featured Wide - Col-Span 2) */}
          {emergingCompanies[3] && (
            <EmergingCard company={emergingCompanies[3]} featured={true} />
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION 4: BROWSE BY CATEGORY
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c] text-[11px] font-black shrink-0">
              4
            </span>
            <div>
              <h2 className="text-xl font-black text-foreground">Browse by Category</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Explore companies by what they&apos;re building.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoriesList.map((cat) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              count={cat.count}
              iconName={cat.iconName}
              selected={selectedCategory === cat.name}
              onClick={() => handleCategorySelect(cat.name)}
            />
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 5: LEADERBOARD TRIPLE COLUMNS
          ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LeaderboardCard 
          title="Breakout Companies" 
          number="6"
          subtitle="Companies making big moves."
          items={breakoutItems}
        />
        <LeaderboardCard 
          title="Recently Funded AI Startups" 
          number="6"
          subtitle="Latest funding announcements."
          items={fundingItems}
        />
        <LeaderboardCard 
          title="Startups to Watch" 
          number="7"
          subtitle="High-potential companies to keep an eye on."
          items={watchItems}
        />
      </section>

      {/* ========================================================
          SECTION 8: AI UNICORNS
          ======================================================== */}
      <section className="p-8 rounded-3xl bg-pink-50/30 border border-pink-100/50 dark:bg-pink-950/5 dark:border-pink-900/20 space-y-6">
        <div className="border-b border-pink-100/80 dark:border-pink-900/30 pb-4 flex items-center gap-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c] text-[11px] font-black shrink-0">
            8
          </span>
          <div>
            <h2 className="text-xl font-black text-foreground">AI Unicorns</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Private companies valued at $1B+.</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-1 no-scrollbar">
          {unicorns.map((company) => (
            <UnicornCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 9: FRONTIER LABS (Dark Horizontal Strip)
          ======================================================== */}
      <section className="bg-zinc-950 text-white rounded-3xl p-8 overflow-hidden shadow-2xl relative">
        <div className="absolute right-0 bottom-0 top-0 w-1/4 opacity-15 pointer-events-none">
          <svg className="w-full h-full text-indigo-500" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0 100 Q 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white text-[11px] font-black shrink-0">
              9
            </span>
            <div>
              <h3 className="text-lg font-black tracking-tight">Frontier AI Labs</h3>
              <p className="text-xs text-white/50 mt-0.5">Organizations advancing the state-of-the-art.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {frontierLabs.map((lab) => (
              <Link key={lab.id} href={`/company/${lab.id}`} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center font-bold text-xs select-none">
                  {lab.name[0]}
                </span>
                <span className="text-xs font-semibold">{lab.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 10: OPEN SOURCE LEADERS (Dark Horizontal Strip)
          ======================================================== */}
      <section className="bg-zinc-950 text-white rounded-3xl p-8 overflow-hidden shadow-2xl relative">
        <div className="absolute left-0 bottom-0 top-0 w-1/4 opacity-15 pointer-events-none">
          <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0 0 Q 50 100 100 0 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white text-[11px] font-black shrink-0">
              10
            </span>
            <div>
              <h3 className="text-lg font-black tracking-tight">Open Source AI Leaders</h3>
              <p className="text-xs text-white/50 mt-0.5">Leading the open source movement.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {openSourceLeaders.map((lab) => (
              <Link key={lab.id} href={`/company/${lab.id}`} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center font-bold text-xs select-none">
                  {lab.name[0]}
                </span>
                <span className="text-xs font-semibold">{lab.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 11: CURATED COLLECTIONS
          ======================================================== */}
      <section className="space-y-6">
        <div className="border-b pb-4 flex items-center gap-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c] text-[11px] font-black shrink-0">
            11
          </span>
          <div>
            <h2 className="text-xl font-black text-foreground">Curated Collections</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Handpicked lists for faster discovery.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { title: 'OpenAI Alumni Startups', count: 42, bg: 'from-pink-500/10 to-rose-500/10 border-pink-500/20' },
            { title: 'YC AI Startups', count: 260, bg: 'from-orange-500/10 to-amber-500/10 border-orange-500/20' },
            { title: 'AI Agent Leaders', count: 121, bg: 'from-violet-500/10 to-indigo-500/10 border-violet-500/20' },
            { title: 'AI Infrastructure Leaders', count: 196, bg: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20' },
            { title: 'Most Funded Startups', count: 184, bg: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20' }
          ].map((col, idx) => (
            <div
              key={idx}
              onClick={() => {
                toast(`Loading Curated Collection: ${col.title}`, 'info');
              }}
              className={`rounded-xl border bg-linear-to-br ${col.bg} p-4 flex flex-col justify-between h-[120px] hover:shadow-xs transition-shadow cursor-pointer`}
            >
              <h4 className="text-xs font-bold leading-normal text-foreground group-hover:text-primary">{col.title}</h4>
              <p className="text-[10px] text-muted-foreground font-semibold">{col.count} companies</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 12: NEW ON GRAPHONE
          ======================================================== */}
      <section className="space-y-6">
        <div className="border-b pb-4 flex items-center gap-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c] text-[11px] font-black shrink-0">
            12
          </span>
          <div>
            <h2 className="text-xl font-black text-foreground">New on GraphOne</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Recently added companies.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {companies.slice(15, 22).map((c) => (
            <Link key={c.id} href={`/company/${c.id}`} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full border bg-card hover:border-primary transition-all flex items-center justify-center font-bold text-sm text-muted-foreground shadow-xs shrink-0 select-none">
                {c.name[0]}
              </div>
              <span className="text-[10px] font-bold text-muted-foreground group-hover:text-primary transition-colors leading-none">{c.name.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 13: INTERACTIVE EXPLORE DIRECTORY
          ======================================================== */}
      <section ref={directoryRef} className="space-y-8 scroll-mt-20">
        
        {/* Header and Controls */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center justify-between border-b pb-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c] text-[11px] font-black shrink-0">
              13
            </span>
            <div>
              <h2 className="text-2xl font-black text-foreground">Explore All Companies</h2>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">Find, filter, and sort over 60+ AI companies in the network.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Reset Filters Icon */}
            {(selectedCategory !== 'All' || selectedStage !== 'All' || selectedCountry !== 'All' || searchQuery !== '') && (
              <button
                onClick={handleResetFilters}
                title="Reset all filters"
                className="p-2 border rounded-lg bg-card hover:bg-secondary text-rose-500 cursor-pointer flex items-center justify-center shrink-0"
              >
                <RefreshCw className="w-4.5 h-4.5" />
              </button>
            )}

            {/* List / Grid Toggles */}
            <div className="flex border rounded-lg overflow-hidden bg-card p-0.5 shrink-0 select-none">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Category Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                toast(`Category set to: ${e.target.value}`, 'info');
              }}
              className="px-3.5 py-2.5 rounded-xl border bg-card text-foreground text-xs outline-0 focus:border-primary shadow-xs"
            >
              <option value="All">All Categories</option>
              <option value="AI Agents">AI Agents</option>
              <option value="AI Coding">AI Coding</option>
              <option value="AI Search">AI Search</option>
              <option value="AI Video">AI Video</option>
              <option value="AI Voice">AI Voice</option>
              <option value="AI Infrastructure">AI Infrastructure</option>
              <option value="AI Models">AI Models</option>
            </select>
          </div>

          {/* Funding Stage Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Funding Stage</label>
            <select
              value={selectedStage}
              onChange={(e) => {
                setSelectedStage(e.target.value);
                toast(`Stage set to: ${e.target.value}`, 'info');
              }}
              className="px-3.5 py-2.5 rounded-xl border bg-card text-foreground text-xs outline-0 focus:border-primary shadow-xs"
            >
              <option value="All">All Stages</option>
              <option value="Seed">Seed Round</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
              <option value="Growth">Growth / Late</option>
            </select>
          </div>

          {/* Country/Geography */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Geography</label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                toast(`Location set to: ${e.target.value}`, 'info');
              }}
              className="px-3.5 py-2.5 rounded-xl border bg-card text-foreground text-xs outline-0 focus:border-primary shadow-xs"
            >
              <option value="All">All Locations</option>
              <option value="USA">United States</option>
              <option value="International">International</option>
            </select>
          </div>

          {/* Sort Toggles */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                toast(`Sorting by: ${e.target.value}`, 'info');
              }}
              className="px-3.5 py-2.5 rounded-xl border bg-card text-foreground text-xs outline-0 focus:border-primary shadow-xs"
            >
              <option value="trending">Trending (Views)</option>
              <option value="valuation">Valuation</option>
              <option value="growth">Growth Velocity</option>
            </select>
          </div>
        </div>

        {/* Results grid/list renderer */}
        {filteredCompanies.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" 
            : "flex flex-col gap-3"
          }>
            {filteredCompanies.slice(0, visibleCount).map((company) => (
              <CompanyListCard
                key={company.id}
                company={company}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 border rounded-2xl bg-card text-center text-muted-foreground">
            <p className="text-sm font-semibold">No companies match your active filters.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 border rounded-full bg-background hover:bg-secondary text-xs font-bold text-foreground cursor-pointer"
            >
              Reset Search Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredCompanies.length > visibleCount && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-6 py-3 border rounded-full bg-card hover:bg-secondary text-xs font-bold text-foreground transition-all cursor-pointer flex items-center gap-1 shadow-xs"
            >
              Load more companies &middot; {filteredCompanies.length - visibleCount} remaining
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
