'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, DollarSign, Calendar, TrendingUp, Award, Layers, ArrowUpRight } from 'lucide-react';
import { fundingRounds, companies } from '@/data/mockDb';
import { CompanyLogo } from '@/components/common/BrandLogo';
import { useToast } from '@/components/ui/Toast';

const extractDomain = (url?: string) => {
  if (!url) return undefined;
  try {
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.split('/')[0];
  } catch (e) {
    return undefined;
  }
};

export default function FundingDiscoveryPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('All');

  // Stages filter options
  const stages = ['All', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth'];

  // Aggregate Stats
  const stats = useMemo(() => {
    // Parse round values safely
    const totalAmountFloat = fundingRounds.reduce((acc, r) => {
      const num = parseFloat(r.amount.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return acc;
      // Handle Billions vs Millions
      const multiplier = r.amount.includes('B') ? 1000 : 1;
      return acc + (num * multiplier);
    }, 0);

    const totalFundingStr = `$${(totalAmountFloat / 1000).toFixed(1)}B`;
    const avgRoundStr = `$${(totalAmountFloat / fundingRounds.length).toFixed(1)}M`;

    return {
      totalFunding: totalFundingStr,
      totalDeals: fundingRounds.length,
      averageRound: avgRoundStr
    };
  }, []);

  // Filter deals
  const filteredDeals = useMemo(() => {
    return fundingRounds.filter(round => {
      const company = companies.find(c => c.id === round.companyId);
      const matchesSearch = 
        round.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        round.leadInvestors.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStage = 
        selectedStage === 'All' || 
        round.round.toLowerCase().includes(selectedStage.toLowerCase());

      return matchesSearch && matchesStage;
    });
  }, [searchQuery, selectedStage]);

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Overview Hero Title */}
      <section className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest leading-none select-none">
          <TrendingUp className="w-3.5 h-3.5" /> Venture Capital Flow
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-none">
          AI Funding Intelligence
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Monitor seed rounds, venture backings, and major growth capital events shaping the frontier laboratories of artificial intelligence.
        </p>
      </section>

      {/* Aggregate Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border bg-card shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Total Capital Tracked</p>
            <h3 className="text-2xl font-black text-foreground mt-2 leading-none">{stats.totalFunding}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl border bg-card shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-black">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Total Deal Count</p>
            <h3 className="text-2xl font-black text-foreground mt-2 leading-none">{stats.totalDeals} rounds</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl border bg-card shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Average Round Size</p>
            <h3 className="text-2xl font-black text-foreground mt-2 leading-none">{stats.averageRound}</h3>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-6">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by company name or lead investor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border rounded-xl bg-background text-foreground placeholder-muted-foreground outline-0 focus:border-primary transition-colors"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => {
                setSelectedStage(stage);
                toast(`Filtering by round: ${stage}`, 'info');
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer whitespace-nowrap leading-none ${
                selectedStage === stage
                  ? 'bg-primary border-primary text-white shadow-xs'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </section>

      {/* Funding Deals Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
          <span className="font-bold uppercase tracking-wider">{filteredDeals.length} Deals found</span>
          <span>Sorting: Most Recent</span>
        </div>

        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDeals.map((deal) => {
              const company = companies.find(c => c.id === deal.companyId);
              return (
                <div 
                  key={deal.id}
                  className="p-5 rounded-2xl border bg-card flex items-start justify-between gap-4 hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <CompanyLogo 
                      id={deal.companyId} 
                      name={deal.companyName} 
                      domain={extractDomain(company?.website)} 
                      className="w-12 h-12 shrink-0" 
                    />
                    <div className="min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/company/${deal.companyId}`}
                          className="text-sm font-black text-foreground hover:text-primary transition-colors truncate"
                        >
                          {deal.companyName}
                        </Link>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border uppercase tracking-wider">
                          {deal.round}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {deal.date}
                        </span>
                      </div>

                      {/* Lead Investors */}
                      <div className="pt-2">
                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Lead Investor(s)</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {deal.leadInvestors.map((investor, idx) => (
                            <span 
                              key={idx}
                              className="text-[10px] font-semibold px-2 py-0.5 border rounded-md bg-secondary/35 text-foreground"
                            >
                              {investor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-lg font-black text-primary leading-none">
                      {deal.amount}
                    </p>
                    <Link 
                      href={`/company/${deal.companyId}`}
                      className="inline-flex items-center gap-0.5 text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors mt-4 select-none"
                    >
                      Entity Profile <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground border border-dashed rounded-2xl bg-card">
            No funding rounds found matching the criteria.
          </div>
        )}
      </section>

    </div>
  );
}
