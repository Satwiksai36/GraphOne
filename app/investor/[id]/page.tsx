'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Check, MapPin, Calendar, Users, Briefcase, Plus, BookMarked, 
  TrendingUp, Award, DollarSign, ArrowUpRight, ArrowDownRight,
  TrendingDown, Globe, Flame
} from 'lucide-react';

import { investors, companies } from '@/data/mockDb';
import { OwnershipDonutChart } from '@/components/charts/OwnershipDonutChart';
import { useToast } from '@/components/ui/Toast';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

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
    <div className="space-y-12 py-4">
      {/* ========================================================
          1. HERO HEADER
          ======================================================== */}
      <section className="p-6 rounded-2xl border bg-card shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          {/* Logo & Bio Info */}
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div className="w-16 h-16 rounded-xl border bg-secondary flex items-center justify-center font-black text-xl shrink-0 select-none text-muted-foreground">
              {investor.name[0]}
            </div>
            
            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight leading-none">
                  {investor.name}
                </h1>
                {investor.isVerified && (
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-500 text-white shrink-0" title="Verified AI Investor">
                    <Check className="w-2.5 h-2.5 stroke-3" />
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-muted-foreground max-w-xl">
                {investor.bio}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {investor.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Founded {investor.foundedYear}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" /> {investor.type.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Key Partners */}
          <div className="flex flex-col gap-2 shrink-0">
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none">Key Partners</p>
            <div className="flex items-center gap-2 mt-1">
              {investor.keyPeople.slice(0, 4).map((person, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full border bg-secondary overflow-hidden" title={`${person.name} (${person.role})`}>
                  <img src={person.avatarUrl} alt={person.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
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
            >
              <BookMarked className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. STATISTICS CARDS GRID
          ======================================================== */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Deals (90d)', value: `+${investor.stats.deals90d}`, icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10' },
          { label: 'Lead Investments', value: `+${investor.stats.leadInvestments}`, icon: Award, color: 'text-blue-500 bg-blue-500/10' },
          { label: 'Most Active Stage', value: investor.stats.mostActiveStage, icon: Briefcase, color: 'text-purple-500 bg-purple-500/10' },
          { label: 'Top Co-Investor', value: investor.stats.topPartner, icon: Users, color: 'text-orange-500 bg-orange-500/10' },
          { label: 'Primary Focus', value: investor.stats.topFocus, icon: Flame, color: 'text-rose-500 bg-rose-500/10' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-4 rounded-xl border bg-card flex flex-col justify-between h-[100px]">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold leading-none">{stat.label}</span>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-black text-foreground leading-none">{stat.value}</span>
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
            <h3 className="text-lg font-black text-foreground mb-4">Investment Thesis</h3>
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
                  <span key={item.sector} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">
                    {item.sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Concentration Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl border bg-card shadow-xs">
          <h3 className="text-lg font-black text-foreground mb-4">Portfolio Concentration</h3>
          <OwnershipDonutChart 
            data={investor.portfolioConcentration.map(item => ({
              category: item.sector,
              percentage: item.percentage
            }))} 
          />
        </div>
      </div>

      {/* ========================================================
          4. RECENT INVESTMENTS
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <h3 className="text-lg font-black text-foreground">Recent Investments</h3>
          <span className="text-xs font-semibold text-muted-foreground leading-none">
            {investor.recentInvestments.length} deals total
          </span>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {investor.recentInvestments.map((deal, idx) => {
            const companyName = deal.companyId.replace('-', ' ');
            return (
              <div key={idx} className="w-[220px] p-5 rounded-xl border bg-card flex flex-col justify-between h-[150px] shrink-0">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-secondary border flex items-center justify-center font-bold text-xs text-muted-foreground shrink-0 select-none capitalize">
                      {companyName[0]}
                    </span>
                    {deal.lead && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 leading-none">
                        Lead
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-foreground mt-4 leading-none truncate capitalize">
                    {companyName}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-none">
                    {deal.stage} &middot; {deal.date}
                  </p>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold leading-none">Deal Size</span>
                  <span className="text-sm font-black text-primary font-mono leading-none">{deal.amount}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          5. VELOCITY & Evolution CHARTS
          ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Investment Velocity Bar Chart */}
        <div className="p-6 rounded-2xl border bg-card shadow-xs">
          <h3 className="text-lg font-black text-foreground mb-4">Investment Velocity</h3>
          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investor.investmentVelocity}>
                <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={10} />
                <YAxis stroke="var(--muted-foreground)" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    color: 'var(--foreground)',
                    borderRadius: '8px',
                    fontSize: '11px'
                  }} 
                />
                <Bar dataKey="dealsCount" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Capital flow indicators */}
        <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-foreground mb-4">Capital Flow Trends</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Tracking sector capitalization shifts dynamically over 12 months.</p>
            
            <div className="grid grid-cols-2 gap-6 mt-6">
              {/* Increasing */}
              <div className="space-y-3">
                <span className="text-[10px] text-emerald-500 uppercase font-black tracking-widest flex items-center gap-1 leading-none">
                  <TrendingUp className="w-4.5 h-4.5" /> Increasing
                </span>
                <div className="space-y-1.5">
                  {investor.capitalFlow.increasing.map((s) => (
                    <div key={s} className="px-2.5 py-1.5 rounded-lg border bg-emerald-500/5 text-xs font-semibold text-foreground">
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decreasing */}
              <div className="space-y-3">
                <span className="text-[10px] text-rose-500 uppercase font-black tracking-widest flex items-center gap-1 leading-none">
                  <TrendingDown className="w-4.5 h-4.5" /> Decreasing
                </span>
                <div className="space-y-1.5">
                  {investor.capitalFlow.decreasing.map((s) => (
                    <div key={s} className="px-2.5 py-1.5 rounded-lg border bg-rose-500/5 text-xs font-semibold text-foreground">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end text-xs text-muted-foreground font-semibold">
            Based on active VC syndicate reports.
          </div>
        </div>
      </section>

      {/* ========================================================
          6. CO-INVESTOR NETWORK
          ======================================================== */}
      <section className="p-6 rounded-2xl border bg-card shadow-xs">
        <h3 className="text-lg font-black text-foreground mb-6">Co-Investor Network</h3>
        <div className="flex flex-wrap items-center gap-4">
          {investor.coInvestors.map((co, idx) => (
            <div key={idx} className="flex items-center gap-2 px-4 py-2 border rounded-xl bg-secondary/30 text-xs font-bold text-foreground">
              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-[9px] select-none">
                {co.name[0]}
              </span>
              <span>{co.name}</span>
              <span className="text-[10px] font-bold text-muted-foreground ml-1.5">({co.count} joints)</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
