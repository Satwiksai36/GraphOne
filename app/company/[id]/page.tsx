'use client';

import React, { useState, useMemo, useRef, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Check, Globe, Calendar, MapPin, Users, Lock, Unlock, 
  ArrowUpRight, ArrowRight, TrendingUp, Activity, FileText, 
  Award, Briefcase, Plus, BookMarked
} from 'lucide-react';

import { companies, investors, founders, products, news, fundingRounds } from '@/data/mockDb';
import { CompanySubNavbar } from '@/components/company/CompanySubNavbar';
import { OwnershipDonutChart } from '@/components/charts/OwnershipDonutChart';
import { CompanyEcosystemGraph } from '@/components/company/CompanyEcosystemGraph';
import { useToast } from '@/components/ui/Toast';
import { formatValuation } from '@/lib/utils';
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

export default function CompanyDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const companyId = resolvedParams.id;
  const { toast } = useToast();

  // Find the target company
  const company = useMemo(() => {
    return companies.find((c) => c.id === companyId);
  }, [companyId]);

  if (!company) {
    notFound();
  }

  // Find related data dynamically
  const companyFounders = useMemo(() => {
    return founders.filter((f) => f.companies.includes(company.id));
  }, [company.id]);

  const companyProducts = useMemo(() => {
    return products.filter((p) => p.companyId === company.id);
  }, [company.id]);

  const companyNews = useMemo(() => {
    return news.filter((n) => n.companyId === company.id).slice(0, 5);
  }, [company.id]);

  // Section Refs for scroll jumping
  const overviewRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const fundingRef = useRef<HTMLDivElement>(null);
  const investorsRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  const tabsRefMap = {
    overview: overviewRef,
    timeline: timelineRef,
    funding: fundingRef,
    investors: investorsRef,
    leadership: leadershipRef,
    products: productsRef,
    ecosystem: ecosystemRef,
    news: newsRef
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast(isFollowing ? `Unfollowed ${company.name}` : `Following ${company.name}`, 'success');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast(isBookmarked ? `Removed ${company.name} bookmark` : `Bookmarked ${company.name}`, 'success');
  };

  return (
    <div className="space-y-12 py-4">
      {/* ========================================================
          1. COMPANY HEADER & OVERVIEW
          ======================================================== */}
      <section ref={overviewRef} className="p-6 rounded-2xl border bg-card shadow-xs relative overflow-hidden">
        {/* Background gradient blur */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4 min-w-0">
            {/* Logo */}
            <CompanyLogo id={company.id} name={company.name} domain={extractDomain(company.website)} className="w-20 h-20 shrink-0" />
            
            {/* Metadata info */}
            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none">
                  {company.name}
                </h1>
                {company.isVerified && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white shrink-0" title="Verified AI Entity">
                    <Check className="w-3 h-3 stroke-3" />
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {company.tagline}
              </p>

              {/* Icon Rows */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-1">
                <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Globe className="w-4 h-4" /> {company.website.replace('https://', '')}
                </a>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Founded {company.foundedYear}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {company.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {company.employeeCount}
                </span>
                <span className="flex items-center gap-1">
                  {company.isPrivate ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  {company.isPrivate ? 'Privately Held' : 'Publicly Traded'}
                </span>
              </div>

              {/* Social links row */}
              <div className="flex items-center gap-3 pt-2 text-muted-foreground">
                <a href={company.socialLinks.twitter || "#"} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" aria-label="Twitter">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href={company.socialLinks.linkedin || "#"} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href={company.socialLinks.github || "#"} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" aria-label="GitHub">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Action buttons (Follow, bookmark) */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              onClick={handleFollow}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer select-none leading-none ${
                isFollowing 
                  ? 'bg-primary border-primary text-white' 
                  : 'bg-card text-foreground hover:bg-secondary'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg border hover:bg-secondary cursor-pointer transition-colors ${
                isBookmarked ? 'text-primary' : 'text-muted-foreground'
              }`}
              title="Bookmark Company"
            >
              <BookMarked className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Detailed description */}
        <p className="text-sm text-muted-foreground mt-6 leading-relaxed max-w-4xl">
          {company.description}
        </p>

        {/* Sector tags */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {company.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full border bg-secondary text-[10px] font-bold text-muted-foreground uppercase tracking-wide leading-none">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ========================================================
          SUB NAVIGATION TABS
          ======================================================== */}
      <CompanySubNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabsRefMap={tabsRefMap} 
      />

      {/* ========================================================
          2. TIMELINE SECTION
          ======================================================== */}
      <section ref={timelineRef} className="p-6 rounded-2xl border bg-card shadow-xs scroll-mt-32">
        <h3 className="text-lg font-black text-foreground mb-6">2. Timeline</h3>
        
        {/* Horizontal Timeline flow */}
        <div className="relative flex gap-8 overflow-x-auto pb-4 no-scrollbar">
          {/* Connector Line */}
          <div className="absolute top-[17px] left-8 right-8 h-0.5 bg-border z-0" />
          
          {company.timeline.map((event, index) => (
            <div key={index} className="flex flex-col items-center text-center min-w-[140px] relative z-10">
              <span className="w-9 h-9 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center text-xs font-mono font-black select-none shadow-xs shrink-0">
                {event.year.toString().slice(2)}
              </span>
              <span className="text-xs font-bold text-foreground mt-3 leading-none">
                {event.year}
              </span>
              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed max-w-[130px]">
                {event.event}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. FUNDING & OWNERSHIP CHARTS
          ======================================================== */}
      <div ref={fundingRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-32">
        
        {/* Funding History Table */}
        <div className="lg:col-span-8 p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-foreground mb-4">3. Funding Timeline</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b text-muted-foreground uppercase font-bold tracking-wider">
                    <th className="pb-3 font-semibold">Round</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Valuation</th>
                    <th className="pb-3 font-semibold hidden sm:table-cell">Lead Investors</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {company.fundingTimeline.map((round, idx) => (
                    <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3.5 font-bold text-foreground">{round.round}</td>
                      <td className="py-3.5 text-muted-foreground">{round.date}</td>
                      <td className="py-3.5 font-mono font-black text-primary">{round.amount}</td>
                      <td className="py-3.5 text-muted-foreground">{round.valuation || 'N/A'}</td>
                      <td className="py-3.5 text-muted-foreground hidden sm:table-cell">
                        {round.leadInvestors?.join(', ') || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pt-4 border-t flex items-center justify-end text-xs font-semibold text-primary">
            <span>Total Raised: {company.fundingTotal}</span>
          </div>
        </div>

        {/* Ownership Donut Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-foreground mb-4">4. Ownership</h3>
            <OwnershipDonutChart data={company.ownership} />
          </div>
          <div className="pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
            <span>Type: {company.isPrivate ? 'Private' : 'Public'}</span>
            <span>Valuation: <strong>{formatValuation(company.valuation)}</strong></span>
          </div>
        </div>
      </div>

      {/* ========================================================
          5. INVESTORS SECTOR
          ======================================================== */}
      <section ref={investorsRef} className="p-6 rounded-2xl border bg-card shadow-xs scroll-mt-32">
        <h3 className="text-lg font-black text-foreground mb-6">5. Investors</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Seed Tier */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest leading-none border-b pb-2">Seed Investors</h4>
            <div className="space-y-2">
              {company.investors.filter(i => i.type === 'seed').map((inv, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg border bg-secondary/30 text-xs font-bold text-foreground">
                  <InvestorLogo id={inv.investorId} name={inv.investorId.replace('-', ' ')} className="w-5 h-5 shrink-0" />
                  {inv.investorId.replace('-', ' ')}
                </div>
              ))}
            </div>
          </div>

          {/* Series Tier */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest leading-none border-b pb-2">Series Investors</h4>
            <div className="space-y-2">
              {company.investors.filter(i => i.type === 'series').map((inv, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg border bg-secondary/30 text-xs font-bold text-foreground">
                  <InvestorLogo id={inv.investorId} name={inv.investorId.replace('-', ' ')} className="w-5 h-5 shrink-0" />
                  {inv.investorId.replace('-', ' ')}
                </div>
              ))}
            </div>
          </div>

          {/* Growth Tier */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest leading-none border-b pb-2">Growth Investors</h4>
            <div className="space-y-2">
              {company.investors.filter(i => i.type === 'growth').map((inv, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg border bg-secondary/30 text-xs font-bold text-foreground">
                  <InvestorLogo id={inv.investorId} name={inv.investorId.replace('-', ' ')} className="w-5 h-5 shrink-0" />
                  {inv.investorId.replace('-', ' ')}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. LEADERSHIP (FOUNDERS)
          ======================================================== */}
      <section ref={leadershipRef} className="p-6 rounded-2xl border bg-card shadow-xs scroll-mt-32">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-foreground">6. Founders & Leadership</h3>
          <button className="text-xs font-semibold hover:text-primary leading-none cursor-pointer">
            View all leadership &middot; {companyFounders.length} founders
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {companyFounders.map((founder) => (
            <div key={founder.id} className="flex items-center gap-4 p-4 rounded-xl border bg-card shadow-xs">
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full border bg-secondary overflow-hidden shrink-0">
                <img 
                  src={founder.avatarUrl} 
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-foreground truncate leading-none">
                  {founder.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-none">
                  {founder.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. PRODUCTS
          ======================================================== */}
      <section ref={productsRef} className="p-6 rounded-2xl border bg-card shadow-xs scroll-mt-32">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-foreground">7. Products</h3>
          <Link href="/products" className="text-xs font-semibold hover:text-primary flex items-center gap-0.5 leading-none">
            View products page <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {companyProducts.map((p) => (
            <div key={p.id} className="p-5 rounded-2xl border bg-card hover:shadow-xs transition-shadow flex flex-col justify-between min-h-[140px] group">
              <div>
                <div className="flex items-center justify-between">
                  <CompanyLogo id={p.id} name={p.name} className="w-8 h-8 shrink-0" />
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-secondary text-muted-foreground uppercase tracking-wide leading-none">
                    {p.categories[0] || 'AI'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mt-4 leading-none">
                  {p.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {p.tagline}
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t pt-3 mt-4 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider leading-none">
                <span>{p.votesCount} Upvotes</span>
                <span className="text-primary hover:underline cursor-pointer flex items-center gap-0.5">
                  Launch <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          11. AI ECOSYSTEM GRAPH
          ======================================================== */}
      <div ref={ecosystemRef} className="scroll-mt-32">
        <CompanyEcosystemGraph company={company} />
      </div>

      {/* ========================================================
          12. NEWS & RESEARCH PAPERS
          ======================================================== */}
      <section ref={newsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-32">
        
        {/* Latest News Feed */}
        <div className="lg:col-span-7 p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-foreground mb-4">12. Latest News</h3>
            
            <div className="space-y-4">
              {companyNews.map((article) => (
                <div key={article.id} className="flex items-start justify-between gap-4 border-b pb-3 hover:bg-secondary/10 transition-colors px-1">
                  <div>
                    <h4 className="text-xs font-bold text-foreground leading-normal hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground font-medium mt-1 block">
                      {article.source} &middot; {article.date}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground hover:text-primary shrink-0 transition-colors" />
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t flex items-center justify-end text-xs font-semibold text-primary">
            <span className="cursor-pointer hover:underline">View all coverage</span>
          </div>
        </div>

        {/* Research Papers & Patents */}
        <div className="lg:col-span-5 p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-foreground mb-4">14. Research Papers</h3>
            
            <div className="space-y-4">
              {company.researchPapers?.slice(0, 3).map((paper, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs border-b pb-3">
                  <div className="min-w-0">
                    <p className="font-bold text-foreground truncate leading-normal">
                      {paper.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-1 block uppercase tracking-wide">
                      {paper.date}
                    </span>
                  </div>
                  <FileText className="w-4.5 h-4.5 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t flex items-center justify-end text-xs font-semibold text-primary">
            <span className="cursor-pointer hover:underline">View all papers</span>
          </div>
        </div>
      </section>
    </div>
  );
}
