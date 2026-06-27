'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Check, MapPin, Calendar, Users, Briefcase, Plus, BookMarked, 
  TrendingUp, Award, DollarSign, ArrowUpRight, ArrowDownRight,
  TrendingDown, Globe, Flame, Brain, Cpu, Bot, Heart, Terminal, FileText, ChevronRight, ArrowRight, Sparkles
} from 'lucide-react';

import { investors, companies } from '@/data/mockDb';
import { OwnershipDonutChart } from '@/components/charts/OwnershipDonutChart';
import { useToast } from '@/components/ui/Toast';
import { CompanyLogo, InvestorLogo } from '@/components/common/BrandLogo';

const extractDomain = (url?: string) => {
  if (!url) return undefined;
  try {
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.split('/')[0];
  } catch (e) {
    return undefined;
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InvestorProfilePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const investorId = resolvedParams.id;
  const { toast } = useToast();

  const investor = useMemo(() => {
    return investors.find(i => i.id === investorId);
  }, [investorId]);

  if (!investor) {
    notFound();
  }

  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast(isFollowing ? `Unfollowed ${investor.name}` : `Following ${investor.name}`, 'success');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast(isBookmarked ? `Removed ${investor.name} bookmark` : `Bookmarked ${investor.name}`, 'success');
  };

  return (
    <div className="space-y-12 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb path navigation */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground select-none">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/investors" className="hover:text-foreground">Investors</Link>
        <span>&rsaquo;</span>
        <span className="text-foreground font-semibold">{investor.name}</span>
      </nav>

      {/* ========================================================
          1. PROFILE HEADER
          ======================================================== */}
      <section className="p-6 md:p-8 rounded-2xl border bg-card shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Logo & Bio Info */}
          <div className="flex flex-col sm:flex-row items-start gap-5 min-w-0 flex-1">
            <InvestorLogo id={investor.id} name={investor.name} className="w-24 h-24 shrink-0 border shadow-xs rounded-2xl" />
            
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none">
                  {investor.name}
                </h1>
                {investor.isVerified && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 select-none">
                    <Check className="w-3 h-3 stroke-[3]" /> Verified Investor
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-foreground leading-snug max-w-xl">
                Backing the daring from idea to iconic.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-muted-foreground/80" /> {investor.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-muted-foreground/80" /> Founded in {investor.foundedYear}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {investor.type.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md bg-secondary text-[10px] font-bold text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key People */}
          <div className="flex flex-col gap-2 shrink-0">
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none">Key people</p>
            <div className="flex items-center gap-2 mt-1">
              {investor.keyPeople.map((person, idx) => (
                <div key={idx} className="w-10 h-10 rounded-full border bg-secondary overflow-hidden shadow-xs shrink-0" title={`${person.name} (${person.role})`}>
                  <img src={person.avatarUrl} alt={person.name} className="w-full h-full object-cover" />
                </div>
              ))}
              <button className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-xs text-foreground hover:bg-secondary shrink-0 cursor-pointer">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <Link href="#" className="text-[10px] font-bold text-primary hover:underline mt-1.5 flex items-center gap-0.5 leading-none">
              View all team members <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-auto">
            <button
              onClick={handleFollow}
              className={`px-5 py-2.5 text-xs font-bold rounded-lg border transition-all cursor-pointer select-none leading-none shadow-xs flex items-center gap-1.5 ${
                isFollowing 
                  ? 'bg-primary border-primary text-white' 
                  : 'bg-[#ff3366] text-white border-[#ff3366] hover:bg-[#ff3366]/95'
              }`}
            >
              {isFollowing ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {isFollowing ? 'Following' : 'Follow Investor'}
            </button>
            <button
              onClick={handleBookmark}
              className={`p-2.5 rounded-lg border bg-card hover:bg-secondary cursor-pointer transition-colors shadow-xs ${
                isBookmarked ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <BookMarked className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. STATISTICS CARDS GRID (6 Cards total matching Screen 2)
          ======================================================== */}
      <section className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: 'Deals Last 90 Days', value: `+${investor.stats.deals90d}`, icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10' },
          { label: 'Lead Investments', value: `+${investor.stats.leadInvestments}`, icon: Award, color: 'text-blue-500 bg-blue-500/10' },
          { label: 'Most Active Stage', value: investor.stats.mostActiveStage, icon: Briefcase, color: 'text-purple-500 bg-purple-500/10' },
          { label: 'Top Partner', value: investor.stats.topPartner, icon: Users, color: 'text-orange-500 bg-orange-500/10' },
          { label: 'AI Deals Share', value: '38%', icon: Cpu, color: 'text-indigo-500 bg-indigo-500/10' },
          { label: 'Top Focus Area', value: investor.stats.topFocus, icon: Flame, color: 'text-rose-500 bg-rose-500/10' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-4 rounded-xl border bg-card flex flex-col justify-between h-[100px] shadow-xs hover:shadow-md transition-shadow">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold leading-none">{stat.label}</span>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-xl font-black text-foreground leading-none">{stat.value}</span>
                <span className={`p-1.5 rounded-lg shrink-0 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================================
          3. THESIS & PORTFOLIO CONCENTRATION
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Thesis & Stages */}
        <div className="lg:col-span-8 p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-foreground mb-4">Investment Thesis</h3>
            <blockquote className="text-sm text-muted-foreground border-l-2 border-primary pl-4 italic leading-relaxed">
              &ldquo;{investor.thesis}&rdquo;
            </blockquote>
          </div>

          <div className="mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Preferred Stages</p>
              <div className="flex items-center gap-1.5 mt-2">
                {investor.preferredStages.map((stage) => (
                  <span key={stage} className="px-2 py-0.5 rounded bg-secondary text-[10px] font-bold text-foreground">
                    {stage}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Sectors Tracked</p>
              <div className="flex items-center gap-1.5 mt-2">
                {investor.portfolioConcentration.slice(0, 3).map((item) => (
                  <span key={item.sector} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                    {item.sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Concentration Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl border bg-card shadow-xs">
          <h3 className="text-base font-black text-foreground mb-4">Portfolio Concentration</h3>
          <OwnershipDonutChart 
            data={investor.portfolioConcentration.map(item => ({
              category: item.sector,
              percentage: item.percentage
            }))} 
          />
        </div>
      </div>

      {/* ========================================================
          4. RECENT INVESTMENTS (Premium Dark Cards matching Screen 2)
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <h3 className="text-base font-black text-foreground">Recent Investments</h3>
          <button 
            onClick={() => toast('Displaying all historical investments', 'info')}
            className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline"
          >
            View all investments <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar items-center">
          {investor.recentInvestments.map((deal, idx) => {
            const companyName = deal.companyId.replace('-', ' ');
            const coObj = companies.find(c => c.id === deal.companyId);
            return (
              <div key={idx} className="w-[220px] p-5 rounded-[20px] bg-linear-to-br from-zinc-900 to-zinc-950 text-white border border-zinc-800 flex flex-col justify-between h-[155px] shrink-0 hover:shadow-lg hover:border-zinc-700 transition-all relative overflow-hidden group">
                {/* Glow effect on hover */}
                <div className="absolute -right-8 -top-8 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300" />
                
                <div>
                  <div className="flex items-center justify-between">
                    <CompanyLogo id={deal.companyId} name={companyName} domain={extractDomain(coObj?.website)} className="w-8 h-8 shrink-0 bg-white p-1 rounded-lg" />
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded leading-none border ${
                      deal.lead 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    }`}>
                      {deal.lead ? 'Lead' : 'Co-led'}
                    </span>
                  </div>
                  <h4 className="text-sm font-black mt-4 leading-none truncate capitalize text-white">
                    {companyName}
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-1.5 leading-none">
                    {deal.stage} &middot; {deal.date}
                  </p>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold leading-none">Deal Size</span>
                  <span className="text-sm font-black text-primary font-mono leading-none">{deal.amount}</span>
                </div>
              </div>
            );
          })}
          {/* Slider Arrow */}
          <button className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-xs text-foreground hover:bg-secondary shrink-0 cursor-pointer">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================
          5. VELOCITY, FLOW & EVOLUTION (Three Columns Layout)
          ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Investment Velocity Progress Bars */}
        <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-base font-black text-foreground mb-4">Investment Velocity</h3>
            <div className="space-y-4">
              {[
                { year: 2022, count: 14, label: 'AI Deals' },
                { year: 2023, count: 21, label: 'AI Deals' },
                { year: 2024, count: 36, label: 'AI Deals' },
                { year: 2025, count: 48, label: 'AI Deals' },
                { year: 2026, count: 31, label: 'Deals YTD' }
              ].map((row) => (
                <div key={row.year} className="flex items-center gap-3 text-xs">
                  <span className="w-8 text-muted-foreground font-mono font-bold">{row.year}</span>
                  <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full" 
                      style={{ width: `${(row.count / 48) * 100}%` }}
                    />
                  </div>
                  <span className="w-16 text-right font-bold text-foreground">
                    {row.count} <span className="font-medium text-muted-foreground text-[10px]">{row.label.split(' ')[1]}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Capital Flow Increasing/Decreasing */}
        <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-base font-black text-foreground mb-4">Capital Flow</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Increasing */}
              <div className="space-y-3">
                <span className="text-[10px] text-emerald-500 uppercase font-black tracking-wider flex items-center gap-1 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Increasing
                </span>
                <div className="space-y-2">
                  {investor.capitalFlow.increasing.map((s) => (
                    <div key={s} className="px-2.5 py-1.5 rounded-lg border bg-emerald-500/5 text-[10px] font-bold text-foreground truncate">
                      &uarr; {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decreasing */}
              <div className="space-y-3">
                <span className="text-[10px] text-rose-500 uppercase font-black tracking-wider flex items-center gap-1 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Decreasing
                </span>
                <div className="space-y-2">
                  {investor.capitalFlow.decreasing.map((s) => (
                    <div key={s} className="px-2.5 py-1.5 rounded-lg border bg-rose-500/5 text-[10px] font-bold text-foreground truncate">
                      &darr; {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Stage Evolution */}
        <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-base font-black text-foreground mb-4">Stage Evolution</h3>
            <div className="space-y-4 relative pl-4 border-l">
              {[
                { year: 2021, text: 'Seed Heavy' },
                { year: 2022, text: 'Seed + Series A' },
                { year: 2023, text: 'Series A Focus' },
                { year: 2024, text: 'Series A + Growth' },
                { year: 2025, text: 'Growth Equity Expansion' }
              ].map((row) => (
                <div key={row.year} className="relative text-xs flex flex-col gap-0.5">
                  <span className="absolute left-[-21px] top-1 w-2.5 h-2.5 rounded-full bg-primary border border-white dark:border-zinc-950" />
                  <span className="font-bold text-foreground leading-none">{row.year}</span>
                  <span className="text-muted-foreground text-[10px] leading-relaxed">{row.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================
          6. PORTFOLIO WINNERS & FOLLOW-ON STRENGTH (Row 3)
          ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Portfolio Winners */}
        {investor.portfolioWinners && (
          <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-foreground mb-4">Portfolio Winners</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { value: investor.portfolioWinners.unicorns, label: 'Unicorns' },
                  { value: investor.portfolioWinners.ipos, label: 'IPOs' },
                  { value: investor.portfolioWinners.acquisitions, label: 'Acquisitions' },
                  { value: investor.portfolioWinners.active, label: 'Active Companies' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-secondary rounded-xl text-center">
                    <span className="block text-lg font-black text-foreground">{item.value}</span>
                    <span className="text-[9px] text-muted-foreground font-bold uppercase">{item.label}</span>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mb-3">Notable winners</p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {investor.portfolioWinners.notable.map((coId) => (
                    <Link 
                      key={coId} 
                      href={`/company/${coId}`} 
                      className="flex items-center gap-2 p-1.5 border rounded-xl bg-white dark:bg-zinc-800 hover:shadow-xs hover:border-zinc-350 transition-all shadow-xs"
                    >
                      <CompanyLogo id={coId} name={coId} className="w-7 h-7 border-none shrink-0 rounded-lg" />
                      <span className="capitalize text-xs font-bold text-foreground pr-2">{coId.replace('-', ' ')}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Follow-On Strength */}
        {investor.followOnStrength && (
          <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-foreground mb-4">Follow-On Strength</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: investor.followOnStrength.raisedNextRound, label: 'Raised Next Round' },
                  { value: `${investor.followOnStrength.avgMonths} Months`, label: 'Average Time' },
                  { value: investor.followOnStrength.medianGrowth, label: 'Median Funding Growth' },
                  { value: investor.followOnStrength.raisedSeriesBPlus, label: 'Raised Series B+' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-xl flex flex-col justify-between h-[90px] shadow-xs">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold leading-none">{item.label}</span>
                    <span className="text-xl font-black text-primary mt-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </section>

      {/* ========================================================
          7. NETWORK STRENGTH & CO-INVESTOR NETWORK (Row 4)
          ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Network Strength with custom layout */}
        {investor.networkStrength && (
          <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-foreground mb-4">Network Strength</h3>
              <div className="space-y-3.5">
                {[
                  { label: 'Most Connected Founder', value: investor.networkStrength.mostConnectedFounder, icon: Users, color: 'text-emerald-500 bg-emerald-500/10' },
                  { label: 'Most Connected Startup', value: investor.networkStrength.mostConnectedStartup, icon: Briefcase, color: 'text-blue-500 bg-blue-500/10' },
                  { label: 'Most Active Co-Investor', value: investor.networkStrength.mostActiveCoInvestor, icon: Flame, color: 'text-rose-500 bg-rose-500/10' },
                  { label: 'Largest Founder Network', value: investor.networkStrength.largestFounderNetwork, icon: Globe, color: 'text-purple-500 bg-purple-500/10' },
                  { label: 'Largest Community Reach', value: investor.networkStrength.largestCommunityReach, icon: Sparkles, color: 'text-orange-500 bg-orange-500/10' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b last:border-0 pb-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`p-1.5 rounded-lg shrink-0 ${item.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-muted-foreground font-semibold">{item.label}</span>
                      </div>
                      <span className="font-bold text-foreground">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Co-Investor Network - Grid of detailed boxes with logos and joint deal counts */}
        <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-foreground mb-4">Co-Investor Network</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {investor.coInvestors.map((co, idx) => (
                <div key={idx} className="p-3.5 border rounded-xl bg-secondary/30 text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:bg-secondary/50 transition-colors">
                  <InvestorLogo id={co.name} name={co.name} className="w-11 h-11 rounded-lg" />
                  <span className="text-xs font-black text-foreground truncate w-full">{co.name}</span>
                  <span className="text-[10px] text-muted-foreground font-semibold leading-none">{co.count} joint deals</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================
          8. AI MARKET INFLUENCE & EXIT INTELLIGENCE (Row 5)
          ======================================================== */}
      {investor.marketInfluence && investor.exitIntelligence && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* AI Market Influence */}
          <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-foreground mb-4">AI Market Influence</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { value: investor.marketInfluence.infraRounds, label: 'AI Infrastructure' },
                  { value: investor.marketInfluence.agentFunding, label: 'AI Agent Funding' },
                  { value: investor.marketInfluence.devToolsFunding, label: 'Dev Tools Funding' },
                  { value: investor.marketInfluence.mostActiveStage, label: 'Most Active Stage' },
                  { value: investor.marketInfluence.seriesARounds, label: 'Series A Rounds' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-xl flex flex-col justify-between h-[90px] shadow-xs">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold leading-none">{item.label}</span>
                    <span className="text-lg font-black text-foreground mt-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exit Intelligence */}
          <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-foreground mb-4">Exit Intelligence</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: investor.exitIntelligence.largestExit, label: 'Largest Exit' },
                  { value: investor.exitIntelligence.recentIpo, label: 'Recent IPO' },
                  { value: `${investor.exitIntelligence.avgExitTimeYears} Years`, label: 'Avg Exit Time' },
                  { value: investor.exitIntelligence.ipos, label: 'Total IPOs' },
                  { value: investor.exitIntelligence.acquisitions, label: 'Acquisitions' },
                  { value: investor.exitIntelligence.largestAcquisition || 'None', label: 'Large Buyout' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-secondary rounded-xl text-center flex flex-col justify-between h-[80px]">
                    <span className="text-[9px] text-muted-foreground font-bold uppercase">{item.label}</span>
                    <span className="block text-sm font-black text-foreground mt-auto truncate w-full">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>
      )}

      {/* ========================================================
          9. RESEARCH & MENTIONS & RELATED INVESTORS (Row 6)
          ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Research & Mentions */}
        <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-base font-black text-foreground">Research & Mentions</h3>
              <button className="text-xs font-bold text-primary hover:underline">View all research</button>
            </div>
            <div className="space-y-4">
              {investor.researchList.map((report, idx) => (
                <div key={idx} className="flex items-center justify-between border-b last:border-0 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <FileText className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate hover:underline cursor-pointer">{report.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{report.publisher}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold shrink-0">{report.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Investors */}
        <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-foreground mb-4">Related Investors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {investor.relatedInvestors.map((relId) => {
                const relObj = investors.find(i => i.id === relId);
                const relName = relObj ? relObj.name : relId.replace('-', ' ');
                return (
                  <Link 
                    key={relId} 
                    href={`/investor/${relId}`} 
                    className="flex flex-col items-center justify-center p-4 border rounded-xl bg-card hover:bg-secondary hover:shadow-xs transition-all text-center gap-2.5 h-[110px]"
                  >
                    <InvestorLogo id={relId} name={relName} className="w-10 h-10 shrink-0" />
                    <h4 className="text-[10px] font-black text-foreground leading-tight truncate w-full capitalize">{relName}</h4>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
