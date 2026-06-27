'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Sparkles, ShieldCheck, FileText, ArrowRight, Brain, Cpu, Bot, Heart, Shield, Terminal, Film, ArrowDownRight, Globe, DollarSign, Users, Briefcase, Flame } from 'lucide-react';
import { investors, companies } from '@/data/mockDb';
import { InvestorCard } from '@/components/cards/InvestorCard';
import { MostActiveCard } from '@/components/cards/MostActiveCard';
import { useToast } from '@/components/ui/Toast';
import { CompanyLogo, InvestorLogo } from '@/components/common/BrandLogo';

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
          05. INVESTORS BACKING WINNERS
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">05. Investors Backing Winners</h2>
            <p className="text-xs text-muted-foreground mt-1">VC funds backing the most valuable frontier labs and application leaders.</p>
          </div>
          <button className="text-xs font-bold text-primary hover:underline">View all</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'OpenAI',
              backedBy: [
                { name: 'Microsoft', logo: 'MSFT' },
                { name: 'Thrive Capital', logo: 'TC' },
                { name: 'Khosla Ventures', logo: 'KV' },
                { name: 'Founders Fund', logo: 'FF' }
              ]
            },
            {
              name: 'Anthropic',
              backedBy: [
                { name: 'Google Ventures', logo: 'GV' },
                { name: 'Spark Capital', logo: 'SC' },
                { name: 'Menlo Ventures', logo: 'MV' },
                { name: 'Lightspeed', logo: 'LS' }
              ]
            },
            {
              name: 'Perplexity',
              backedBy: [
                { name: 'a16z', logo: 'a16z' },
                { name: 'Databricks Ventures', logo: 'DB' },
                { name: 'NEA', logo: 'NEA' },
                { name: 'IVP', logo: 'IVP' }
              ]
            }
          ].map((winner) => (
            <div key={winner.name} className="p-6 rounded-2xl border bg-card flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div>
                <h3 className="text-base font-black text-foreground mb-4">{winner.name}</h3>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none block mb-3">Backed by</span>
                <div className="space-y-3">
                  {winner.backedBy.map((backer, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <InvestorLogo id={backer.logo} name={backer.name} className="w-8 h-8 shrink-0" />
                      <span className="text-xs font-semibold text-foreground truncate">{backer.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          06. CAPITAL THEMES
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">06. Capital Themes</h2>
            <p className="text-xs text-muted-foreground mt-1">Explore focus clusters backing thematic AI segments.</p>
          </div>
          <button className="text-xs font-bold text-primary hover:underline">View all</button>
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
          07. EMERGING INVESTORS
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">07. Emerging Investors</h2>
            <p className="text-xs text-muted-foreground mt-1">Specialized, AI-first managers and boutique funds scaling up active portfolios.</p>
          </div>
          <button className="text-xs font-bold text-primary hover:underline">View all</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[
            { name: 'Theory', type: 'Ventures', stage: 'Early stage AI first', logo: 'T' },
            { name: 'Conviction', type: 'Partners', stage: 'Seed to A AI startups', logo: 'C' },
            { name: 'Radical', type: 'Ventures', stage: 'Pre-seed to seed AI + Frontier', logo: 'R' },
            { name: 'NFDG', type: 'AI-first fund', stage: 'Global early stage', logo: 'N' },
            { name: 'South Park', type: 'Commons', stage: 'Operator led investments', logo: 'S' }
          ].map((firm) => (
            <div key={firm.name} className="w-[180px] p-5 rounded-2xl border bg-card flex flex-col justify-between h-[155px] shrink-0 hover:shadow-xs transition-shadow">
              <InvestorLogo id={firm.name} name={firm.name} className="w-10 h-10 shrink-0" />
              <div className="mt-4">
                <h4 className="text-sm font-black text-foreground leading-none">{firm.name}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">{firm.type}</p>
                <p className="text-[9px] text-primary/80 font-bold mt-2.5 uppercase tracking-wide leading-none">{firm.stage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          08. INVESTOR RESEARCH
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">08. Investor Research</h2>
            <p className="text-xs text-muted-foreground mt-1">Market flow reports, rankings, and deep dives on syndicate movements.</p>
          </div>
          <button className="text-xs font-bold text-primary hover:underline">View all</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { title: 'Top AI Investors 2024', desc: 'GraphOne Report', date: 'May 2024', bg: 'from-blue-600/10 to-indigo-600/10 border-blue-500/20' },
            { title: 'Who Leads Most Seed Rounds?', desc: 'GraphOne Analysis', date: '2026', bg: 'from-purple-600/10 to-pink-600/10 border-purple-500/20' },
            { title: 'The Rise of Operator Angels', desc: 'GraphOne Research', date: '2026', bg: 'from-amber-600/10 to-orange-600/10 border-amber-500/20' },
            { title: 'State of AI Venture Capital', desc: 'GraphOne Report', date: '2026', bg: 'from-emerald-600/10 to-teal-600/10 border-emerald-500/20' },
            { title: 'AI Capital Flows Report', desc: 'GraphOne Analysis', date: '2026', bg: 'from-rose-600/10 to-pink-600/10 border-rose-500/20' }
          ].map((report, idx) => (
            <div
              key={idx}
              onClick={() => toast(`Opening Report: ${report.title}`, 'info')}
              className={`p-4 rounded-xl border bg-gradient-to-br ${report.bg} flex flex-col justify-between h-[180px] hover:shadow-xs transition-shadow cursor-pointer relative overflow-hidden`}
            >
              <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-20 pointer-events-none">
                <FileText className="w-full h-full" />
              </div>
              <div className="space-y-2">
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide leading-none">{report.desc}</span>
                <h4 className="text-xs font-black leading-snug text-foreground">{report.title}</h4>
              </div>
              <span className="text-[9px] text-muted-foreground font-semibold mt-auto">{report.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          09. EXPLORE THE CAPITAL GRAPH (Visualizer)
          ======================================================== */}
      <section className="p-8 rounded-3xl bg-zinc-950 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-red-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-500/20 text-red-300 text-[10px] font-black uppercase tracking-wider select-none leading-none">
              Explore the Capital Graph
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Visualize How Capital <br />Moves in the AI Economy
            </h3>
            <p className="text-xs text-white/55 leading-relaxed max-w-sm">
              Explore the relationships between investors, founders, companies, funding rounds and products.
            </p>
            <button 
              onClick={() => toast('Initializing Capital Graph engine...', 'info')}
              className="mt-6 flex items-center justify-between px-5 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 font-semibold text-xs transition-all cursor-pointer shadow-md select-none"
            >
              Explore Capital Graph <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>

          {/* Interactive node path simulation with SVG flow */}
          <div className="lg:col-span-7 flex justify-center py-4">
            <div className="flex items-center justify-between gap-2 relative w-full max-w-lg select-none">
              {[
                { name: 'Investor', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30', icon: DollarSign },
                { name: 'Founder', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30', icon: Users },
                { name: 'Company', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: Briefcase },
                { name: 'Funding Round', bg: 'bg-teal-500/10 text-teal-400 border-teal-500/30', icon: Flame },
                { name: 'Product', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: Cpu }
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.name}>
                    {idx > 0 && (
                      <span className="text-white/20 font-mono text-sm shrink-0">&rarr;</span>
                    )}
                    <div className="flex flex-col items-center gap-2">
                      <span className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 shadow-lg ${step.bg}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-bold text-white/70 text-center truncate w-16">{step.name}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. JOIN NETWORK BANNER
          ======================================================== */}
      <section className="p-6 rounded-2xl border bg-secondary/35 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[9px] font-black text-primary uppercase tracking-widest leading-none">Join the GraphOne Investor Network</span>
          <h3 className="text-lg font-black text-foreground mt-2">Unlock better opportunities. Build what&apos;s next.</h3>
        </div>
        <div className="flex items-center gap-3">
          <Link href="#" className="px-4 py-2 border rounded-lg bg-card text-xs font-bold text-foreground hover:bg-secondary transition-colors">
            Log in
          </Link>
          <Link href="#" className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors">
            Sign up for free
          </Link>
        </div>
      </section>

    </div>
  );
}
