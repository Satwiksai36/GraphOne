'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Search, Sparkles, FileText, ArrowRight, Brain, Cpu, Bot, Heart, 
  Terminal, Globe, DollarSign, Users, Briefcase, Flame, ShieldAlert,
  Tv, Compass, Award, Building, UserCheck
} from 'lucide-react';
import { investors, companies } from '@/data/mockDb';
import { useToast } from '@/components/ui/Toast';
import { CompanyLogo, InvestorLogo } from '@/components/common/BrandLogo';

export default function InvestorsDiscoveryPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filtering list based on search
  const filteredInvestors = useMemo(() => {
    if (!searchQuery) return investors;
    return investors.filter(inv => 
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.thesis.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const trendingInvestors = [
    {
      id: 'andreessen-horowitz',
      name: 'a16z',
      fullName: 'Andreessen Horowitz',
      bg: 'bg-linear-to-br from-[#ff4600] to-[#ff007f]',
      shadow: 'shadow-orange-500/20',
      badgeStyle: 'bg-white/10 text-white border-white/20',
      tags: ['AI Infrastructure', 'AI Agents', 'Developer Tools']
    },
    {
      id: 'sequoia-capital',
      name: 'SEQUOIA',
      fullName: 'Sequoia Capital',
      bg: 'bg-linear-to-br from-[#004d3d] to-[#002f23]',
      shadow: 'shadow-emerald-500/20',
      badgeStyle: 'bg-white/10 text-white border-white/20',
      tags: ['AI Infra', 'Enterprise AI', 'Global Scale']
    },
    {
      id: 'lightspeed-venture-partners',
      name: 'Lightspeed',
      fullName: 'Lightspeed Venture Partners',
      bg: 'bg-linear-to-br from-[#1e293b] to-[#0f172a]',
      shadow: 'shadow-blue-500/20',
      badgeStyle: 'bg-white/10 text-white border-white/20',
      tags: ['Early Stage', 'AI/ML', 'Enterprise']
    },
    {
      id: 'khosla-ventures',
      name: 'Khosla Ventures',
      fullName: 'Khosla Ventures',
      bg: 'bg-linear-to-br from-[#111111] to-[#222222]',
      shadow: 'shadow-zinc-500/20',
      badgeStyle: 'bg-white/10 text-white border-white/20',
      tags: ['Deep Tech', 'AI', 'Frontier']
    },
    {
      id: 'accel',
      name: 'Accel',
      fullName: 'Accel Partners',
      bg: 'bg-linear-to-br from-[#df1921] to-[#f43f5e]',
      shadow: 'shadow-rose-500/20',
      badgeStyle: 'bg-white/10 text-white border-white/20',
      tags: ['Early Stage', 'Consumer AI', 'Enterprise']
    },
    {
      id: 'general-catalyst',
      name: 'General Catalyst',
      fullName: 'General Catalyst',
      bg: 'bg-linear-to-br from-[#4b2f89] to-[#6d28d9]',
      shadow: 'shadow-purple-500/20',
      badgeStyle: 'bg-white/10 text-white border-white/20',
      tags: ['Seed to Growth', 'AI First', 'Platform']
    }
  ];

  const collections = [
    { 
      title: 'Investors Backing AI Agents', 
      count: 120, 
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      title: 'Investors Backing Indian AI Startups', 
      count: 96, 
      img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      title: 'Top Seed Investors', 
      count: 216, 
      img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      title: 'Operator Angels', 
      count: 178, 
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      title: 'OpenAI Alumni Investors', 
      count: 64, 
      img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      title: 'Enterprise AI Investors', 
      count: 64, 
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      title: 'Developer Tool Specialists', 
      count: 92, 
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      title: 'Healthcare AI Investors', 
      count: 58, 
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=60' 
    }
  ];

  const types = [
    { name: 'Seed Investors', count: '1,248 Investors', icon: Brain, color: 'text-emerald-500 bg-emerald-500/10' },
    { name: 'Series A Investors', count: '890 Investors', icon: Cpu, color: 'text-purple-500 bg-purple-500/10' },
    { name: 'Angel Investors', count: '2,754 Investors', icon: Bot, color: 'text-pink-500 bg-pink-500/10' },
    { name: 'Corporate Venture Funds', count: '612 Investors', icon: Globe, color: 'text-blue-500 bg-blue-500/10' },
    { name: 'Late Stage Investors', count: '432 Investors', icon: Flame, color: 'text-red-500 bg-red-500/10' },
    { name: 'Family Offices', count: '218 Investors', icon: Building, color: 'text-amber-500 bg-amber-500/10' }
  ];

  const mostActive = [
    {
      id: 'andreessen-horowitz',
      name: 'a16z',
      count: 120,
      portfolio: [
        { id: 'openai', name: 'OpenAI' },
        { id: 'cursor', name: 'Cursor' },
        { id: 'perplexity', name: 'Perplexity' },
        { id: 'harvey', name: 'Harvey' },
        { id: 'anysphere', name: 'Anysphere' }
      ]
    },
    {
      id: 'sequoia-capital',
      name: 'Sequoia Capital',
      count: 98,
      portfolio: [
        { id: 'anthropic', name: 'Anthropic' },
        { id: 'glean', name: 'Glean' },
        { id: 'decagon', name: 'Decagon' },
        { id: 'mercor', name: 'Mercor' },
        { id: 'pika', name: 'Pika' }
      ]
    },
    {
      id: 'lightspeed-venture-partners',
      name: 'Lightspeed',
      count: 86,
      portfolio: [
        { id: 'mistral-ai', name: 'Mistral AI' },
        { id: 'cohere', name: 'Cohere' },
        { id: 'gamma', name: 'Gamma' },
        { id: 'rippling', name: 'Rippling' },
        { id: 'browserbase', name: 'Browserbase' }
      ]
    },
    {
      id: 'accel',
      name: 'Accel',
      count: 72,
      portfolio: [
        { id: 'krutrim', name: 'Krutrim' },
        { id: 'meesho', name: 'Meesho' },
        { id: 'shiprocket', name: 'Shiprocket' },
        { id: 'kloud', name: 'Kloud' },
        { id: 'razorpay', name: 'Razorpay' }
      ]
    }
  ];

  const winners = [
    {
      name: 'OpenAI',
      backedBy: [
        { id: 'microsoft-corporation', name: 'Microsoft' },
        { id: 'thrive-capital', name: 'Thrive Capital' },
        { id: 'khosla-ventures', name: 'Khosla Ventures' },
        { id: 'founders-fund', name: 'Founders Fund' }
      ]
    },
    {
      name: 'Anthropic',
      backedBy: [
        { id: 'google-ventures-gv', name: 'Google Ventures' },
        { id: 'spark-capital', name: 'Spark Capital' },
        { id: 'menlo-ventures', name: 'Menlo Ventures' },
        { id: 'lightspeed-venture-partners', name: 'Lightspeed' }
      ]
    },
    {
      name: 'Perplexity',
      backedBy: [
        { id: 'andreessen-horowitz', name: 'a16z' },
        { id: 'databricks-ventures', name: 'Databricks Ventures' },
        { id: 'nea', name: 'NEA' },
        { id: 'ivp', name: 'IVP' }
      ]
    }
  ];

  const themes = [
    { name: 'AI Agents', icon: Brain, count: '62 Investors', color: 'text-[#ff3366]' },
    { name: 'AI Coding', icon: Terminal, count: '48 Investors', color: 'text-blue-500' },
    { name: 'AI Infrastructure', icon: Cpu, count: '110 Investors', color: 'text-indigo-500' },
    { name: 'Developer Tools', icon: Compass, count: '84 Investors', color: 'text-emerald-500' },
    { name: 'Robotics', icon: Bot, count: '32 Investors', color: 'text-amber-500' },
    { name: 'Healthcare AI', icon: Heart, count: '54 Investors', color: 'text-rose-500' },
    { name: 'Defence AI', icon: UserCheck, count: '36 Investors', color: 'text-zinc-655 font-bold' },
    { name: 'Video AI', icon: Tv, count: '81 Investors', color: 'text-pink-500' }
  ];

  const emerging = [
    { name: 'Theory', type: 'Ventures', stage: 'Early stage AI first', logo: 'Theory' },
    { name: 'Conviction', type: 'Partners', stage: 'Seed to A AI startups', logo: 'Conviction' },
    { name: 'Radical', type: 'Ventures', stage: 'Pre-seed to seed AI + Frontier', logo: 'Radical' },
    { name: 'NFDG', type: 'AI-first fund', stage: 'Global early stage', logo: 'NFDG' },
    { name: 'South Park', type: 'Commons', stage: 'Operator led investments', logo: 'South Park' }
  ];

  const research = [
    { title: 'Top AI Investors 2024', desc: 'GraphOne Report', date: 'May 2024', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=60' },
    { title: 'Who Leads Most Seed Rounds?', desc: 'GraphOne Analysis', date: '2026', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=200&auto=format&fit=crop&q=60' },
    { title: 'The Rise of Operator Angels', desc: 'GraphOne Research', date: '2026', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=60' },
    { title: 'State of AI Venture Capital', desc: 'GraphOne Report', date: '2026', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=60' },
    { title: 'AI Capital Flows Report', desc: 'GraphOne Analysis', date: '2026', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=60' }
  ];

  const floatingLogos = [
    { id: 'andreessen-horowitz', name: 'a16z', fullName: 'Andreessen Horowitz', x: -10, y: -140, w: 170, scale: 1.0 },
    { id: 'sequoia-capital', name: 'SEQUOIA', fullName: 'Sequoia Capital', x: -150, y: -55, w: 170, scale: 1.0 },
    { id: 'lightspeed-venture-partners', name: 'Lightspeed', fullName: 'Lightspeed Venture Partners', x: 135, y: -60, w: 210, scale: 1.0 },
    { id: 'general-catalyst', name: 'General Catalyst', fullName: 'General Catalyst', x: -180, y: 40, w: 170, scale: 1.0 },
    { id: 'accel', name: 'Accel', fullName: 'Accel Partners', x: 85, y: 35, w: 150, scale: 1.0 },
    { id: 'khosla-ventures', name: 'Khosla Ventures', fullName: 'Khosla Ventures', x: -50, y: 135, w: 170, scale: 1.0 }
  ];

  return (
    <div className="space-y-16 pb-6 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative overflow-hidden pt-6 pb-16 lg:pt-8 lg:pb-24 rounded-3xl bg-radial from-primary/5 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-foreground">
              Discover Investors <br />
              Building the AI Economy
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Find VCs, angels, operators, corporate funds and emerging managers backing the next generation of AI companies.
            </p>

            {/* Search Input with Red Circular Button inside - Strictly White Layout */}
            <div className="relative max-w-md w-full bg-white border border-zinc-200 rounded-full p-1.5 shadow-xs flex items-center">
              <input
                type="text"
                placeholder="Search investors, funds, firms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 pl-5 pr-2 py-2 text-sm text-zinc-900 bg-transparent placeholder-zinc-400 outline-none w-full"
              />
              <button 
                onClick={() => toast(`Searching for: ${searchQuery}`, 'info')}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 hover:bg-primary/95 transition-colors cursor-pointer select-none"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-zinc-500 font-semibold">Popular searches:</span>
              {['AI Agents', 'Seed Investors', 'Series A', 'VC Backers', 'India', 'OpenAI Portfolio'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    toast(`Applied filter: ${term}`, 'info');
                  }}
                  className="px-4 py-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-bold transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Glowing Orbit & Floating Logos Scene - Matches VC Constellation Design */}
          <div className="lg:col-span-6 hidden lg:flex justify-center relative h-[380px]">
            <div className="relative w-80 h-80 flex items-center justify-center">
              
              {/* Soft pink/purple glowing background blob in the center */}
              <div className="absolute w-36 h-36 rounded-full bg-radial from-pink-500/15 via-purple-500/8 to-transparent blur-xl pointer-events-none" />
              <div className="absolute w-5 h-5 rounded-full bg-pink-500/35 blur-xs pointer-events-none" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-white pointer-events-none shadow-sm z-10" />

              {/* Constellation connection lines and float dot indicators - Spaced out */}
              <svg className="absolute inset-0 w-full h-full stroke-zinc-200/20 dark:stroke-zinc-800/15 fill-none pointer-events-none" viewBox="-160 -160 320 320">
                {/* Diagonal constellation paths */}
                <line x1="-10" y1="-140" x2="-150" y2="-55" stroke="#fecaca" strokeWidth="1" className="opacity-40" />
                <line x1="-150" y1="-55" x2="-180" y2="40" stroke="#fecaca" strokeWidth="1" className="opacity-40" />
                <line x1="-180" y1="40" x2="-50" y2="135" stroke="#fecaca" strokeWidth="1" className="opacity-40" />
                <line x1="-50" y1="135" x2="85" y2="35" stroke="#fecaca" strokeWidth="1" className="opacity-40" />
                <line x1="85" y1="35" x2="135" y2="-60" stroke="#fecaca" strokeWidth="1" className="opacity-40" />
                <line x1="135" y1="-60" x2="-10" y2="-140" stroke="#fecaca" strokeWidth="1" className="opacity-40" />
                
                <line x1="-150" y1="-55" x2="85" y2="35" stroke="#fecaca" strokeWidth="1" className="opacity-30" />
                <line x1="-180" y1="40" x2="85" y2="35" stroke="#fecaca" strokeWidth="1" className="opacity-30" />
                <line x1="-10" y1="-140" x2="85" y2="35" stroke="#fecaca" strokeWidth="1" className="opacity-30" />
                <line x1="-50" y1="135" x2="135" y2="-60" stroke="#fecaca" strokeWidth="1" className="opacity-30" />
                <line x1="-150" y1="-55" x2="135" y2="-60" stroke="#fecaca" strokeWidth="1" className="opacity-20" />
                
                {/* Tiny constellation dots */}
                <circle cx="-130" cy="-100" r="3" fill="#ef4444" className="opacity-80 animate-pulse" />
                <circle cx="50" cy="-130" r="2.5" fill="#ef4444" className="opacity-80" />
                <circle cx="140" cy="45" r="4.5" fill="#3b82f6" className="opacity-95" />
                <circle cx="100" cy="105" r="3.5" fill="#6366f1" className="opacity-90" />
                <circle cx="55" cy="165" r="2.5" fill="#ef4444" className="opacity-70 animate-pulse" />
                <circle cx="-175" cy="-55" r="2.5" fill="#a855f7" className="opacity-80" />
                <circle cx="-120" cy="110" r="1.5" fill="#fbbf24" className="opacity-80" />
              </svg>

              {/* Floating VC cards (Strictly White Theme with inline logo alignments) */}
              {floatingLogos.map((logo, idx) => {
                const showRightLogo = logo.id === 'sequoia-capital';
                const showLeftLogo = logo.id === 'general-catalyst' || logo.id === 'lightspeed-venture-partners';
                
                return (
                  <motion.div
                    key={logo.id}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.6 }}
                    style={{ 
                      left: `calc(50% + ${logo.x}px - ${logo.w / 2}px)`, 
                      top: `calc(50% + ${logo.y}px - 32px)`,
                      width: `${logo.w}px`,
                      transform: `scale(${logo.scale})` 
                    }}
                    onClick={() => router.push(`/investor/${logo.id}`)}
                    className="absolute bg-white border border-zinc-200/80 shadow-md hover:shadow-lg px-4.5 py-3 rounded-[20px] flex flex-col justify-center gap-1 cursor-pointer select-none transition-all hover:border-zinc-350 h-[64px] shrink-0"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      {showLeftLogo && (
                        <InvestorLogo id={logo.id} name={logo.fullName} className="w-6 h-6 border-none bg-transparent rounded-none shrink-0" />
                      )}
                      
                      <h4 className="text-sm font-black text-zinc-900 tracking-tight leading-none truncate">
                        {logo.name}
                      </h4>
                      
                      {showRightLogo && (
                        <InvestorLogo id={logo.id} name={logo.fullName} className="w-6 h-6 border-none bg-transparent rounded-none shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-400 font-bold leading-none truncate">
                      {logo.fullName}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          1. TRENDING INVESTORS
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">01 Trending Investors</h2>
            <p className="text-xs text-muted-foreground mt-1">VC partners actively issuing term sheets in AI infrastructure and applications.</p>
          </div>
          <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar items-center">
          {trendingInvestors.map((investor) => (
            <Link key={investor.id} href={`/investor/${investor.id}`} className="shrink-0">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`w-[240px] h-[260px] rounded-[24px] p-6 bg-linear-to-br ${investor.bg} bg-[length:200%_200%] animate-gradient-shift text-white flex flex-col justify-between shadow-xl ${investor.shadow} relative overflow-hidden group cursor-pointer transition-all duration-300`}
              >
                {/* Glowing floating fluid circle backdrop inside the card */}
                <span className="absolute -right-12 -top-12 w-28 h-28 rounded-full bg-white/15 blur-xl pointer-events-none animate-card-glow-1 group-hover:scale-150 transition-all duration-700" />
                <span className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full bg-black/10 blur-xl pointer-events-none animate-card-glow-2 group-hover:scale-150 transition-all duration-700" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md overflow-hidden shrink-0">
                      <InvestorLogo id={investor.id} name={investor.fullName} className="w-10 h-10 border-none bg-transparent" />
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-white/95 animate-pulse" />
                  </div>
                  
                  <h3 className="text-base font-black mt-5 leading-tight group-hover:underline text-white">
                    {investor.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {investor.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${investor.badgeStyle}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold relative z-10 text-white/80 group-hover:text-white transition-colors">
                  <span>View portfolio</span>
                  <ArrowRight className="w-4 h-4 transition-all group-hover:translate-x-1.5 text-white" />
                </div>
              </motion.div>
            </Link>
          ))}
          {/* Slider Arrow */}
          <Link href="/investors" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-xs text-foreground hover:bg-secondary shrink-0">
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          2. INVESTOR COLLECTIONS
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">02 Investor Collections</h2>
            <p className="text-xs text-muted-foreground mt-1">Explore subsets of investors backing specific niches.</p>
          </div>
          <Link href="/investors" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((col, idx) => (
            <div
              key={idx}
              onClick={() => router.push(`/investors?search=${encodeURIComponent(col.title)}`)}
              className="relative rounded-2xl overflow-hidden group shadow-xs h-[160px] cursor-pointer"
            >
              <img 
                src={col.img} 
                alt={col.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                <span className="text-[10px] font-black text-white/70 uppercase tracking-wide leading-none">
                  {col.count} Investors
                </span>
                <div className="flex items-end justify-between gap-4">
                  <h4 className="text-sm font-black text-white leading-snug">{col.title}</h4>
                  <span className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. BROWSE BY INVESTOR TYPE
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">03 Browse by Investor Type</h2>
            <p className="text-xs text-muted-foreground mt-1">Narrow down investors by asset class and ticket sizes.</p>
          </div>
          <Link href="/investors" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Grid for Browse by Investor Type, matching mockup's two rows of 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {types.map((type, idx) => {
            const Icon = type.icon;
            return (
              <Link
                key={idx}
                href={`/investors?search=${encodeURIComponent(type.name)}`}
                className="p-5 rounded-2xl border bg-card hover:bg-secondary cursor-pointer transition-colors flex items-center gap-4 select-none"
              >
                <span className={`p-2.5 rounded-xl shrink-0 ${type.color}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-xs font-black truncate leading-none text-foreground">{type.name}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1.5 leading-none">{type.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          4. MOST ACTIVE INVESTORS
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">04 Most Active Investors</h2>
            <p className="text-xs text-muted-foreground mt-1">VC firms with notable momentum and active portfolio allocations.</p>
          </div>
          <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {mostActive.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl border bg-card flex flex-col justify-between h-[280px] shadow-xs relative hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-start justify-between">
                  <InvestorLogo id={item.id} name={item.name} className="w-12 h-12 shrink-0 rounded-xl" />
                  <span className="text-[10px] text-muted-foreground font-black uppercase">
                    {item.count} portfolio
                  </span>
                </div>
                <h3 className="text-base font-black text-foreground mt-5">{item.name}</h3>
                
                {/* Horizontal side-by-side flex wrap tag chips instead of a vertical list */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.portfolio.map((co) => (
                    <Link key={co.id} href={`/company/${co.id}`} className="flex items-center gap-1.5 px-2.5 py-1 border rounded-lg bg-secondary/50 text-xs font-semibold text-foreground hover:bg-secondary transition-colors shrink-0">
                      <CompanyLogo id={co.id} name={co.name} className="w-4 h-4 rounded-md shrink-0" />
                      <span className="text-[10px] font-black">{co.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-auto flex items-center justify-between">
                <Link href={`/investor/${item.id}`} className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline">
                  View portfolio <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          05. INVESTORS BACKING WINNERS
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">05 Investors Backing Winners</h2>
            <p className="text-xs text-muted-foreground mt-1">VC funds backing the most valuable frontier labs and application leaders.</p>
          </div>
          <Link href="/investors" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {winners.map((winner) => (
            <div key={winner.name} className="p-6 rounded-2xl border bg-card flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div>
                <h3 className="text-base font-black text-foreground mb-4">{winner.name}</h3>
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-wider leading-none block mb-3">Backed by</span>
                <div className="space-y-3">
                  {winner.backedBy.map((backer, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <InvestorLogo id={backer.id} name={backer.name} className="w-9 h-9 shrink-0 border border-zinc-100 dark:border-zinc-800" />
                      <span className="text-xs font-semibold text-foreground truncate">{backer.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-6">
                <button 
                  onClick={() => router.push(`/investor/${winner.backedBy[0]?.id || 'andreessen-horowitz'}`)}
                  className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline"
                >
                  View portfolio <ArrowRight className="w-3 h-3" />
                </button>
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
            <h2 className="text-xl font-black text-foreground">06 Capital Themes</h2>
            <p className="text-xs text-muted-foreground mt-1">Explore focus clusters backing thematic AI segments.</p>
          </div>
          <Link href="/investors" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {themes.map((theme, idx) => {
            const Icon = theme.icon;
            return (
              <Link
                key={idx}
                href={`/investors?search=${encodeURIComponent(theme.name)}`}
                className="p-4 rounded-xl border bg-card text-center hover:shadow-xs transition-shadow cursor-pointer flex flex-col items-center justify-center h-[120px]"
              >
                <Icon className={`w-6 h-6 mb-3 ${theme.color}`} />
                <h4 className="text-xs font-black leading-tight text-foreground truncate w-full">{theme.name}</h4>
                <span className="text-[9px] text-muted-foreground font-semibold mt-1.5">{theme.count}</span>
              </Link>
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
            <h2 className="text-xl font-black text-foreground">07 Emerging Investors</h2>
            <p className="text-xs text-muted-foreground mt-1">Specialized, AI-first managers and boutique funds scaling up active portfolios.</p>
          </div>
          <Link href="/investors" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar items-center">
          {emerging.map((firm) => (
            <Link
              key={firm.name}
              href={`/investors?search=${encodeURIComponent(firm.name)}`}
              className="w-[180px] p-5 rounded-2xl border bg-card flex flex-col justify-between h-[155px] shrink-0 hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <InvestorLogo id={firm.logo} name={firm.name} className="w-12 h-12 shrink-0 rounded-xl" />
              <div className="mt-4">
                <h4 className="text-sm font-black text-foreground leading-none">{firm.name}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">{firm.type}</p>
                <p className="text-[9px] text-primary/80 font-bold mt-2.5 uppercase tracking-wide leading-none">{firm.stage}</p>
              </div>
            </Link>
          ))}
          {/* Slider Arrow */}
          <Link href="/investors" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-xs text-foreground hover:bg-secondary shrink-0">
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          08. INVESTOR RESEARCH
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground">08 Investor Research</h2>
            <p className="text-xs text-muted-foreground mt-1">Market flow reports, rankings, and deep dives on syndicate movements.</p>
          </div>
          <Link href="/investors" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {research.map((report, idx) => (
            <div
              key={idx}
              onClick={() => router.push(`/investors?search=${encodeURIComponent(report.title)}`)}
              className="group p-4 rounded-xl border bg-card hover:shadow-xs transition-shadow cursor-pointer flex flex-col justify-between h-[180px] relative overflow-hidden"
            >
              {/* background graphic */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none">
                <img src={report.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 relative z-10">
                <span className="text-[8px] font-bold text-primary uppercase tracking-wide leading-none">{report.desc}</span>
                <h4 className="text-xs font-black leading-snug text-foreground group-hover:underline">{report.title}</h4>
              </div>
              <span className="text-[9px] text-muted-foreground font-semibold mt-auto relative z-10">{report.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          09. EXPLORE THE CAPITAL GRAPH (Visualizer)
          ======================================================== */}
      <section className="p-8 md:p-10 rounded-3xl bg-zinc-950 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#ff3366]/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#ff3366]/20 text-[#ff7fa0] text-[10px] font-black uppercase tracking-wider select-none leading-none">
              Explore the Capital Graph
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Visualize How Capital <br />Moves in the AI Economy
            </h3>
            <p className="text-xs text-white/55 leading-relaxed max-w-sm">
              Explore the relationships between investors, founders, companies, funding rounds and products.
            </p>
            <Link
              href="/funding"
              className="mt-6 inline-flex items-center justify-between px-5 py-3 rounded-full bg-primary text-white hover:bg-primary/90 font-semibold text-xs transition-all cursor-pointer shadow-md select-none"
            >
              Explore Capital Graph <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {/* Interactive node path simulation with SVG flow */}
          <div className="lg:col-span-7 flex justify-center py-4">
            <div className="flex items-center justify-between gap-1 relative w-full max-w-lg select-none">
              {[
                { name: 'Investor', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', icon: DollarSign },
                { name: 'Founder', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30', icon: Users },
                { name: 'Company', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30', icon: Briefcase },
                { name: 'Funding Round', color: 'text-teal-400 bg-teal-500/10 border-teal-500/30', icon: Flame },
                { name: 'Product', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', icon: Cpu }
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.name}>
                    {idx > 0 && (
                      <div className="w-8 h-4 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full text-white/20 overflow-visible" viewBox="0 0 32 16" fill="none">
                          <path
                            id={`flow-path-${idx}`}
                            d="M0 8h32"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="4 4"
                          />
                          {/* Pulsing light particle flowing along the path */}
                          <circle r="3" fill="#ff3366">
                            <animateMotion
                              path="M0 8h32"
                              dur="1.8s"
                              repeatCount="indefinite"
                              begin={`${idx * 0.3}s`}
                            />
                          </circle>
                        </svg>
                      </div>
                    )}
                    <motion.div 
                      className="flex flex-col items-center gap-2 cursor-pointer"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.4
                      }}
                    >
                      <motion.span 
                        className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 shadow-lg ${step.color}`}
                        whileHover={{ scale: 1.2, rotate: 8, borderColor: '#ff3366' }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon className="w-5 h-5 animate-pulse" style={{ animationDuration: '3s' }} />
                      </motion.span>
                      <span className="text-[10px] font-bold text-white/70 text-center truncate w-16">{step.name}</span>
                    </motion.div>
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
      <section className="p-8 rounded-2xl border bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[9px] font-black text-primary uppercase tracking-widest leading-none">Join the GraphOne Investor Network</span>
          <h3 className="text-xl font-black text-foreground mt-2">Unlock better opportunities. Build what&apos;s next.</h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="#" className="px-5 py-2.5 border rounded-lg bg-card text-xs font-bold text-foreground hover:bg-secondary transition-colors whitespace-nowrap shrink-0">
            Log in
          </Link>
          <Link href="#" className="px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/95 transition-colors whitespace-nowrap shrink-0">
            Sign up for free
          </Link>
        </div>
      </section>

    </div>
  );
}
