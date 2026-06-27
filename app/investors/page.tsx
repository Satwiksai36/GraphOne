'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Sparkles, ShieldCheck, FileText, ArrowRight, Brain, Cpu, Bot, Heart, Shield, Terminal, Film, ArrowDownRight, Globe } from 'lucide-react';
import { investors, companies } from '@/data/mockDb';
import { InvestorCard } from '@/components/cards/InvestorCard';
import { MostActiveCard } from '@/components/cards/MostActiveCard';
import { useToast } from '@/components/ui/Toast';

export default function InvestorsDiscoveryPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering list based on search
  const filteredInvestors = useMemo(() => {
    return investors.filter(inv => 
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.thesis.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const trendingInvestors = useMemo(() => investors.slice(0, 6), []);
  const mostActiveInvestors = useMemo(() => investors.slice(0, 4), []);
  
  const collections = [
    { title: 'Investors Backing AI Agents', count: 120, desc: 'VCs driving autonomy.' },
    { title: 'Investors Backing Indian AI Startups', count: 96, desc: 'Fostering emerging markets.' },
    { title: 'Top Seed Investors', count: 216, desc: 'Early-stage visionaries.' },
    { title: 'Operator Angels', count: 178, desc: 'Founders backing founders.' },
    { title: 'OpenAI Alumni Investors', count: 64, desc: 'Specialized ecosystem networks.' },
    { title: 'Enterprise AI Investors', count: 92, desc: 'Enterprise SaaS automation.' }
  ];

  const types = [
    { name: 'Seed Investors', count: '1,248 VCs', icon: Brain },
    { name: 'Series A Investors', count: '890 VCs', icon: Cpu },
    { name: 'Angel Investors', count: '2,754 Angels', icon: Bot },
    { name: 'Corporate Venture Funds', count: '612 Funds', icon: Globe }
  ];

  const themes = [
    { name: 'AI Agents', icon: Brain, count: '62 Investors' },
    { name: 'AI Coding', icon: Terminal, count: '48 Investors' },
    { name: 'AI Infrastructure', icon: Cpu, count: '110 Investors' },
    { name: 'Developer Tools', icon: Terminal, count: '84 Investors' },
    { name: 'Robotics', icon: Bot, count: '32 Investors' },
    { name: 'Healthcare AI', icon: Heart, count: '54 Investors' }
  ];

  return (
    <div className="space-y-16 py-6">
      
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative overflow-hidden py-12 md:py-20 rounded-3xl bg-radial from-primary/5 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider select-none leading-none">
              <Sparkles className="w-3.5 h-3.5" /> Investor Discovery
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-foreground">
              Discover Investors <br />
              Building the <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">AI Economy</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Find VCs, angels, and corporate funds backing the next generation of artificial intelligence, model infrastructure, and vertical agents.
            </p>

            {/* Search inputs */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search investors, thesis, stages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm border rounded-full bg-card text-foreground placeholder-muted-foreground outline-0 focus:border-primary transition-colors shadow-xs"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground font-semibold">Popular:</span>
              {['a16z', 'Sequoia', 'Lightspeed', 'Seed Stage', 'OpenAI backs'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    toast(`Applied filter: ${term}`, 'info');
                  }}
                  className="px-3 py-1 rounded-full border bg-card hover:bg-secondary text-xs text-muted-foreground font-medium transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Floating Investor Logos Grid */}
          <div className="lg:col-span-5 hidden lg:flex justify-center relative">
            <div className="relative w-80 h-80 flex items-center justify-center">
              {[
                { label: 'Sequoia', x: -60, y: -70, bg: 'bg-emerald-950/20 text-emerald-500 border-emerald-500/20' },
                { label: 'a16z', x: 70, y: -90, bg: 'bg-orange-950/20 text-orange-500 border-orange-500/20' },
                { label: 'Lightspeed', x: -100, y: 30, bg: 'bg-blue-950/20 text-blue-500 border-blue-500/20' },
                { label: 'Accel', x: 80, y: 40, bg: 'bg-purple-950/20 text-purple-500 border-purple-500/20' },
                { label: 'Khosla', x: 0, y: 100, bg: 'bg-rose-950/20 text-rose-500 border-rose-500/20' }
              ].map((logo, idx) => (
                <motion.div
                  key={logo.label}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.7 }}
                  style={{ left: `calc(50% + ${logo.x}px)`, top: `calc(50% + ${logo.y}px)` }}
                  className={`absolute px-4 py-2 border rounded-xl shadow-md font-bold text-xs shrink-0 select-none ${logo.bg}`}
                >
                  {logo.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          1. TRENDING INVESTORS
          ======================================================== */}
      <section className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-xl font-black text-foreground">01. Trending Investors</h2>
          <p className="text-xs text-muted-foreground mt-1">VC partners actively issuing term sheets in AI infrastructure and applications.</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {trendingInvestors.map((investor, idx) => (
            <InvestorCard 
              key={investor.id} 
              investor={investor} 
              index={idx} 
            />
          ))}
        </div>
      </section>

      {/* ========================================================
          2. INVESTOR COLLECTIONS
          ======================================================== */}
      <section className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-xl font-black text-foreground">02. Curated Collections</h2>
          <p className="text-xs text-muted-foreground mt-1">Explore subsets of investors backing specific niches.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, idx) => (
            <div
              key={idx}
              onClick={() => toast(`Opening collection: ${col.title}`, 'info')}
              className="p-5 rounded-2xl border bg-card hover:shadow-xs transition-shadow cursor-pointer flex flex-col justify-between h-[120px]"
            >
              <div>
                <h4 className="text-sm font-bold text-foreground leading-none">{col.title}</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{col.desc}</p>
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wide leading-none">{col.count} Investors</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. BROWSE BY INVESTOR TYPE
          ======================================================== */}
      <section className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-xl font-black text-foreground">03. Browse by Investor Type</h2>
          <p className="text-xs text-muted-foreground mt-1">Narrow down investors by asset class and ticket sizes.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type, idx) => {
            const Icon = type.icon;
            return (
              <div
                key={idx}
                onClick={() => toast(`Filtering by: ${type.name}`, 'info')}
                className="p-5 rounded-2xl border bg-card hover:bg-secondary cursor-pointer transition-colors flex items-center gap-4 select-none"
              >
                <span className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold truncate leading-none text-foreground">{type.name}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1.5 leading-none">{type.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          4. MOST ACTIVE INVESTORS
          ======================================================== */}
      <section className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-xl font-black text-foreground">04. Most Active Investors</h2>
          <p className="text-xs text-muted-foreground mt-1">Investors with high velocity and notable portfolios.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mostActiveInvestors.map((investor) => (
            <MostActiveCard key={investor.id} investor={investor} />
          ))}
        </div>
      </section>

      {/* ========================================================
          5. CAPITAL THEMES
          ======================================================== */}
      <section className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-xl font-black text-foreground">05. Capital Themes</h2>
          <p className="text-xs text-muted-foreground mt-1">Explore focus clusters backing thematic AI segments.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {themes.map((theme, idx) => {
            const Icon = theme.icon;
            return (
              <div
                key={idx}
                onClick={() => toast(`Thematic cluster: ${theme.name}`, 'info')}
                className="p-4 rounded-xl border bg-card text-center hover:shadow-xs transition-shadow cursor-pointer flex flex-col items-center justify-center h-[120px]"
              >
                <Icon className="w-6 h-6 text-primary mb-3" />
                <h4 className="text-xs font-bold leading-normal text-foreground">{theme.name}</h4>
                <span className="text-[9px] text-muted-foreground font-semibold mt-1">{theme.count}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          9. CAPITAL FLOW GRAPH SIMULATION
          ======================================================== */}
      <section className="p-8 rounded-3xl bg-zinc-950 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-wider select-none leading-none">
              Capital Visualization
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Visualize How Capital Moves <br />in the AI Economy
            </h3>
            <p className="text-xs text-white/55 leading-relaxed max-w-sm">
              Explore complex interconnections mapping VC funds to founders, startups, funding stages, and upvotable consumer assets.
            </p>
            <button 
              onClick={() => toast('Loading Capital Graph Engine...', 'info')}
              className="mt-6 flex items-center justify-between px-5 py-3 rounded-full bg-primary text-white hover:bg-primary/95 font-semibold text-xs transition-all cursor-pointer shadow-md select-none"
            >
              Explore Capital Graph <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Interactive node path simulation */}
          <div className="lg:col-span-7 flex justify-center py-4">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 relative w-full max-w-lg">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2 p-3 border border-white/10 bg-white/5 rounded-xl text-center w-24 shrink-0">
                <span className="text-[10px] uppercase font-bold text-white/50">Investor</span>
                <span className="text-xs font-black text-white">VC Firm</span>
              </div>
              <span className="text-white/20 font-mono text-sm shrink-0">&rarr;</span>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2 p-3 border border-white/10 bg-white/5 rounded-xl text-center w-24 shrink-0">
                <span className="text-[10px] uppercase font-bold text-white/50">Founder</span>
                <span className="text-xs font-black text-white">CEO</span>
              </div>
              <span className="text-white/20 font-mono text-sm shrink-0">&rarr;</span>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2 p-3 border border-primary/40 bg-primary/20 rounded-xl text-center w-24 shrink-0 shadow-lg shadow-primary/20">
                <span className="text-[10px] uppercase font-bold text-white/50">Company</span>
                <span className="text-xs font-black text-white">Startup</span>
              </div>
              <span className="text-white/20 font-mono text-sm shrink-0">&rarr;</span>

              {/* Step 4 */}
              <div className="flex flex-col items-center gap-2 p-3 border border-white/10 bg-white/5 rounded-xl text-center w-24 shrink-0">
                <span className="text-[10px] uppercase font-bold text-white/50">Asset</span>
                <span className="text-xs font-black text-white">Product</span>
              </div>
              
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
