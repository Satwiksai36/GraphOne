'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, DollarSign, Calendar, TrendingUp, Award, Layers, ArrowUpRight, Check, TrendingDown, MapPin } from 'lucide-react';
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

// Convert a USD amount string like "$6.6B" or "$30M" to Indian Rupees label
function toINR(usdStr: string): string {
  const usdRate = 83.5; // approx 1 USD = 83.5 INR
  const numMatch = usdStr.replace(/[^0-9.]/g, '');
  const num = parseFloat(numMatch);
  if (isNaN(num)) return '';
  const isB = usdStr.includes('B');
  const isM = usdStr.includes('M');
  const usd = isB ? num * 1_000_000_000 : isM ? num * 1_000_000 : num;
  const inr = usd * usdRate;
  if (inr >= 1_00_00_00_000) { // >= 1 Lakh Crore
    return `₹${(inr / 1_00_00_00_000).toFixed(1)} L Cr`;
  }
  if (inr >= 1_00_00_000) { // >= 1 Crore (actually Crore = 10M)
    return `₹${(inr / 1_00_00_000).toFixed(0)} Cr`;
  }
  return `₹${(inr / 1_00_000).toFixed(0)} L`;
}

export default function FundingDiscoveryPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('All');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search');
      if (q) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchQuery(q);
      }
    }
  }, []);

  // Stages filter options
  const stages = ['All', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth'];

  // Aggregate Stats
  const stats = useMemo(() => {
    const totalAmountFloat = fundingRounds.reduce((acc, r) => {
      const num = parseFloat(r.amount.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return acc;
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
    <div className="space-y-12 pb-6 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Overview Hero Title */}
      <section className="relative overflow-hidden py-12 px-6 rounded-3xl border bg-card shadow-xs text-center max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider leading-none select-none">
          <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" /> Venture Capital Flow
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-foreground tracking-tight leading-none mt-4">
          AI Funding Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-3">
          Monitor seed rounds, venture backings, and major growth capital events shaping the frontier laboratories of artificial intelligence.
        </p>
      </section>

      {/* Aggregate Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Capital Tracked', value: stats.totalFunding, icon: DollarSign, color: 'text-primary bg-primary/10', desc: 'Aggregate VC flow volume' },
          { label: 'Total Deal Count', value: `${stats.totalDeals} rounds`, icon: Layers, color: 'text-purple-500 bg-purple-500/10', desc: 'Active rounds tracked YTD' },
          { label: 'Average Round Size', value: stats.averageRound, icon: Award, color: 'text-emerald-500 bg-emerald-500/10', desc: 'Mean capital infusion size' }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl border bg-card shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 relative overflow-hidden group">
              <div className="space-y-1.5">
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none block">{item.label}</span>
                <h3 className="text-3xl font-black text-foreground leading-none">{item.value}</h3>
                <p className="text-[10px] text-muted-foreground font-medium">{item.desc}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 stroke-2" />
              </div>
            </div>
          );
        })}
      </section>

      {/* Search and Filters */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-5 border-b pb-6">
        <div className="relative w-full md:max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full p-1 shadow-sm flex items-center">
          <Search className="w-4 h-4 text-zinc-400 shrink-0 ml-3" />
          <input
            type="text"
            placeholder="Search by company name or lead investor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 pl-2.5 pr-4 py-2 text-xs text-zinc-900 dark:text-zinc-100 bg-transparent placeholder-muted-foreground outline-none w-full"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar py-1 text-xs">
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => {
                setSelectedStage(stage);
                toast(`Filtering by round: ${stage}`, 'info');
              }}
              className={`px-4 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer whitespace-nowrap leading-none ${
                selectedStage === stage
                  ? 'bg-primary border-primary text-white shadow-xs'
                  : 'bg-white text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 border-zinc-200'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </section>

      {/* Funding Deals Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
          <span className="font-bold uppercase tracking-wider text-zinc-500">{filteredDeals.length} Deals found</span>
          <span className="flex items-center gap-1.5 text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Sorting: Most Recent
          </span>
        </div>

        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDeals.map((deal) => {
              const company = companies.find(c => c.id === deal.companyId);
              
              return (
                <div 
                  key={deal.id}
                  className="p-6 rounded-3xl border border-zinc-150 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs hover:shadow-lg hover:scale-[1.01] transition-all relative overflow-hidden group flex items-start justify-between gap-5"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <CompanyLogo 
                      id={deal.companyId} 
                      name={deal.companyName} 
                      domain={extractDomain(company?.website)} 
                      className="w-13 h-13 shrink-0 rounded-2xl"
                      noScale
                    />
                    
                    <div className="min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/company/${deal.companyId}`}
                          className="text-sm font-black text-zinc-900 dark:text-zinc-100 hover:text-primary transition-colors truncate"
                        >
                          {deal.companyName}
                        </Link>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded leading-none border uppercase tracking-wider bg-primary/5 text-primary border-primary/20">
                          {deal.round}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
                        <Calendar className="w-3.5 h-3.5 opacity-80" />
                        <span>{deal.date}</span>
                      </div>

                      {/* Lead Investors */}
                      <div className="pt-2">
                        <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider leading-none mb-1.5">Lead Investor(s)</p>
                        <div className="flex flex-wrap gap-1.5">
                          {deal.leadInvestors.map((investor, idx) => (
                            <span 
                              key={idx}
                              className="text-[9.5px] font-bold px-2 py-1 rounded-md border bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                            >
                              {investor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col justify-between h-full min-h-[105px]">
                    <div className="space-y-1">
                      <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider leading-none">Deal Size</p>
                      <p className="text-xl font-black text-primary font-mono leading-none pt-0.5">
                        {deal.amount}
                      </p>
                      <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono leading-none">
                        {toINR(deal.amount)}
                      </p>
                    </div>
                    
                    {company?.location && (
                      <div className="flex items-center justify-end gap-1 text-[9.5px] font-semibold text-zinc-400 dark:text-zinc-500 mt-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[110px]">{company.location}</span>
                      </div>
                    )}

                    <Link 
                      href={`/company/${deal.companyId}`}
                      className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-widest mt-auto select-none hover:underline text-zinc-400 dark:text-zinc-500 hover:text-primary"
                    >
                      Entity <ArrowUpRight className="w-3 h-3" />
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
