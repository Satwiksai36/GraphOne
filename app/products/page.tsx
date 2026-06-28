'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ArrowUp, MessageSquare, Flame, Star, Trophy, Sparkles, 
  ChevronRight, Send, Compass, Cpu, Bot, Terminal, Code, ArrowRight
} from 'lucide-react';

import { products, companies } from '@/data/mockDb';
import { Product } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { CompanyLogo } from '@/components/common/BrandLogo';

const extractDomain = (url?: string) => {
  if (!url) return undefined;
  try {
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.split('/')[0];
  } catch (e) {
    return undefined;
  }
};

export default function ProductsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular');
  const [visibleCount, setVisibleCount] = useState(10);
  const [email, setEmail] = useState('');

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

  // Track upvoted states locally for rich interactive feed
  const [localProducts, setLocalProducts] = useState<Product[]>(products);

  const handleVote = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLocalProducts((prev) => 
      prev.map((p) => {
        if (p.id === productId) {
          const isUpvoted = !p.upvotedByUser;
          const delta = isUpvoted ? 1 : -1;
          
          toast(
            isUpvoted ? `Upvoted ${p.name}!` : `Removed upvote for ${p.name}`, 
            isUpvoted ? 'success' : 'info'
          );
          
          return {
            ...p,
            upvotedByUser: isUpvoted,
            votesCount: p.votesCount + delta
          };
        }
        return p;
      })
    );
  };

  const handleBookmark = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLocalProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const isBookmarked = !p.bookmarkedByUser;
          toast(
            isBookmarked ? `Bookmarked ${p.name}!` : `Removed ${p.name} bookmark`,
            'success'
          );
          return { ...p, bookmarkedByUser: isBookmarked };
        }
        return p;
      })
    );
  };

  // Filter & Sort list
  const filteredProducts = useMemo(() => {
    return localProducts.filter((p) => {
      const coObj = companies.find(c => c.id === p.companyId);
      const companyName = coObj ? coObj.name : '';

      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'All' ||
        p.categories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()));

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
      return b.votesCount - a.votesCount;
    });
  }, [localProducts, searchQuery, selectedCategory, sortBy]);

  const popularRightNow = useMemo(() => {
    return localProducts.filter(p => p.isPopularRightNow).slice(0, 6);
  }, [localProducts]);

  const trendingSearches = [
    'Cursor', 'Claude', 'Vibe Coding', 'Lovable', 'Perplexity', 'Midjourney', 'Runway', 'AI Agents'
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast(`Subscribed: ${email}`, 'success');
    setEmail('');
  };

  return (
    <div className="flex gap-8 py-4 relative items-start">
      
      {/* 2. CENTER SCROLLABLE FEED */}
      <div className="flex-1 space-y-8 min-w-0">
        
        {/* Hero Banner with search and SVG radiating network */}
        <section className="p-6 rounded-2xl border bg-card shadow-xs relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 min-h-[240px]">
          <div className="space-y-4 relative z-10 flex-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-primary leading-none block">Live AI Intelligence</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight">
              The Global Intelligence <br />Layer <span className="bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">for AI</span>.
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
              One graph connecting companies, founders, investors, products, funding and talent.
            </p>
            
            <div className="relative max-w-md mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search companies, founders, investors, products or funding rounds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-12 py-2.5 text-xs border rounded-full bg-background text-foreground placeholder-muted-foreground outline-0 focus:border-primary transition-colors"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Most searched */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] text-muted-foreground">
              <span className="font-bold">Most searched:</span>
              {['OpenAI', 'Cursor', 'Perplexity', 'Pinecone', 'Lovable', 'Groq'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-2 py-0.5 rounded border bg-secondary hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Node Network SVG - Upgraded with CompanyLogo cards */}
          <div className="w-full md:w-1/3 hidden md:flex justify-center relative select-none h-[280px] shrink-0">
            <div className="relative w-[280px] h-[280px] flex items-center justify-center">
              
              {/* Concentric circles and line guidelines - Moved back from center */}
              <svg className="absolute inset-0 w-full h-full stroke-zinc-200/35 dark:stroke-zinc-800/20 fill-none pointer-events-none" viewBox="-120 -120 240 240">
                {/* Rings */}
                <circle cx="0" cy="0" r="102" strokeDasharray="3 3" />
                <circle cx="0" cy="0" r="68" strokeDasharray="4 4" />
                <circle cx="0" cy="0" r="40" strokeDasharray="2 2" />
                
                {/* Connections */}
                {[270, 342, 54, 126, 198].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const rx102 = Math.cos(rad) * 102;
                  const ry102 = Math.sin(rad) * 102;
                  return (
                    <line key={angle} x1="0" y1="0" x2={rx102} y2={ry102} stroke="#fca5a5" strokeWidth="1" strokeDasharray="2 2" className="opacity-50" />
                  );
                })}
              </svg>

              {/* Central Core: Red Hexagon with Layer Stack Icon */}
              <div className="w-12 h-12 relative flex items-center justify-center z-10 filter drop-shadow-[0_4px_6px_rgba(239,68,68,0.2)]">
                <svg className="absolute w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="50,5 93,30 93,80 50,95 7,80 7,30" fill="#ef4444" />
                </svg>
                <svg className="w-5.5 h-5.5 text-white z-20 relative" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              {/* Orbiting Company logo cards */}
              {[
                { label: 'OpenAI', angle: 270, delay: 0 },
                { label: 'Cursor', angle: 342, delay: 0.5 },
                { label: 'Perplexity', angle: 54, delay: 1 },
                { label: 'Midjourney', angle: 126, delay: 1.5 },
                { label: 'Anthropic', angle: 198, delay: 2 }
              ].map((orbit) => {
                const radian = (orbit.angle * Math.PI) / 180;
                const radius = 102;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <motion.div
                    key={orbit.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 5, delay: orbit.delay }}
                    style={{ 
                      left: `calc(50% + ${x}px - 38px)`, 
                      top: `calc(50% + ${y}px - 38px)` 
                    }}
                    onClick={() => toast(`Opening ${orbit.label}`, 'info')}
                    className="absolute bg-white border border-zinc-200/80 shadow-md hover:shadow-lg rounded-xl p-1.5 flex flex-col items-center justify-center w-[76px] h-[76px] cursor-pointer hover:border-zinc-350 transition-all select-none"
                  >
                    <CompanyLogo id={orbit.label.toLowerCase()} name={orbit.label} className="w-9 h-9 border-none shrink-0" />
                    <span className="text-[9px] font-black text-zinc-800 mt-1 leading-none text-center truncate w-full">
                      {orbit.label}
                    </span>
                  </motion.div>
                );
              })}

            </div>
          </div>
        </section>

        {/* Collection of the Week Banner */}
        <section className="p-5 rounded-2xl bg-linear-to-br from-orange-500/10 to-rose-500/10 border border-orange-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative">
          <div className="space-y-2">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-500 border border-orange-500/30 uppercase tracking-wider leading-none select-none">
              Collection of the Week
            </span>
            <h3 className="text-base font-black text-foreground leading-none flex items-center gap-1.5 pt-1">
              <Flame className="w-4.5 h-4.5 text-orange-500 fill-orange-500/20" /> Vibe Coding Tools
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              The best AI systems built for prompt coding, auto-execution, and fast developer deployments.
            </p>
          </div>
          
          <button 
            onClick={() => toast('Exploring Vibe Coding collection...', 'info')}
            className="px-4 py-2.5 rounded-full bg-primary text-white hover:bg-primary/95 text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs leading-none select-none"
          >
            Explore Collection
          </button>
        </section>

        {/* Category Selector Tabs */}
        <div className="border-b pb-1 overflow-x-auto no-scrollbar flex items-center gap-1">
          {['All', 'Chat', 'Code', 'Agents', 'Image', 'Video', 'Voice', 'Productivity'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                toast(`Category filter set: ${cat}`, 'info');
              }}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 leading-none ${
                selectedCategory === cat 
                  ? 'bg-primary/10 text-primary font-black' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Popular right now carousel */}
        <section className="space-y-4">
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none">Popular Right Now</p>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {popularRightNow.map((p) => {
              const coObj = companies.find(c => c.id === p.companyId);
              return (
                <div 
                  key={p.id}
                  onClick={() => toast(`Opening details for: ${p.name}`, 'info')}
                  className="w-[180px] p-4 rounded-xl border bg-card hover:bg-secondary/40 transition-colors flex flex-col justify-between h-[120px] shrink-0 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <CompanyLogo id={p.companyId} name={p.name} domain={extractDomain(coObj?.website)} className="w-9 h-9 shrink-0" />
                  <span className="text-[9px] font-bold text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-0.5 leading-none">
                    <ArrowUp className="w-3 h-3" /> {p.votesCount}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground truncate leading-none mt-3">{p.name}</h4>
                  <p className="text-[10px] text-muted-foreground truncate leading-none mt-1">{p.tagline}</p>
                </div>
              </div>
            ); })}
          </div>
        </section>

        {/* Feed Headers & List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            {/* Left Sort options */}
            <div className="flex gap-3 text-xs font-bold">
              <button
                onClick={() => setSortBy('popular')}
                className={sortBy === 'popular' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
              >
                Most Popular
              </button>
              <button
                onClick={() => setSortBy('newest')}
                className={sortBy === 'newest' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
              >
                Newest
              </button>
            </div>

            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
              {filteredProducts.length} Products listed
            </span>
          </div>

          {/* Vertical items feed */}
          {filteredProducts.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filteredProducts.slice(0, visibleCount).map((p) => {
                const coObj = companies.find(c => c.id === p.companyId);
                return (
                  <div 
                    key={p.id}
                    onClick={() => toast(`Opening details for: ${p.name}`, 'info')}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl border bg-card hover:bg-secondary/20 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Logo/Icon */}
                      <CompanyLogo id={p.companyId} name={p.name} domain={extractDomain(coObj?.website)} className="w-12 h-12 shrink-0" />
                    {/* Info */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-none truncate">
                          {p.name}
                        </h4>
                        {p.tags.map((tag) => (
                          <span key={tag} className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground uppercase tracking-wide leading-none">
                            {tag}
                          </span>
                        ))}
                        {/* Trending status badge */}
                        {(() => {
                          let badge = { label: 'Trending', style: 'text-zinc-600 bg-zinc-50 border-zinc-100 dark:bg-zinc-800/40 dark:border-zinc-700/30 dark:text-zinc-400' };
                          if (p.name.includes('Cursor')) badge = { label: 'Trending in Coding', style: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30 dark:text-amber-400' };
                          else if (p.name.includes('Claude') || p.name.includes('ChatGPT')) badge = { label: 'Most used this week', style: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400' };
                          else if (p.name.includes('Midjourney')) badge = { label: 'Top rated in Image', style: 'text-pink-600 bg-pink-50 border-pink-100 dark:bg-pink-950/20 dark:border-pink-900/30 dark:text-pink-400' };
                          else if (p.name.includes('Runway') || p.name.includes('Sora')) badge = { label: 'Fastest growing', style: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30 dark:text-blue-400' };
                          return (
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border leading-none ${badge.style}`}>
                              {badge.label}
                            </span>
                          );
                        })()}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5 truncate max-w-sm sm:max-w-md leading-none">
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center gap-4.5 shrink-0">
                    {/* Upvote Heart Button */}
                    <button
                      onClick={(e) => handleVote(p.id, e)}
                      className={`flex items-center gap-1 cursor-pointer select-none text-xs font-bold transition-all hover:text-red-500 ${
                        p.upvotedByUser
                          ? 'text-red-500 scale-105'
                          : 'text-muted-foreground'
                      }`}
                      title="Upvote"
                    >
                      <svg className={`w-4 h-4 ${p.upvotedByUser ? 'fill-red-500 stroke-red-500' : 'stroke-current fill-none'}`} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      <span>{(p.votesCount / 1000).toFixed(1)}K</span>
                    </button>

                    {/* Comment Indicator */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{Math.floor((p.votesCount * 0.02) + 12)}</span>
                    </div>

                    {/* Bookmark Star Button */}
                    <button
                      onClick={(e) => handleBookmark(p.id, e)}
                      className={`p-1 rounded-lg border hover:bg-secondary cursor-pointer transition-colors ${
                        p.bookmarkedByUser ? 'text-primary border-primary/20' : 'text-muted-foreground'
                      }`}
                      title="Bookmark"
                    >
                      <Star className={`w-3.5 h-3.5 ${p.bookmarkedByUser ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground border border-dashed rounded-xl">
              No products match search criteria.
            </div>
          )}

          {/* Load More Products */}
          {filteredProducts.length > visibleCount && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="px-5 py-2.5 border rounded-full bg-card hover:bg-secondary text-xs font-bold text-foreground transition-all cursor-pointer flex items-center gap-1"
              >
                Load more products
              </button>
            </div>
          )}
        </div>

      </div>

      {/* 3. RIGHT SIDEBAR PANEL */}
      <div className="w-64 hidden lg:flex flex-col gap-6 sticky top-24 self-start select-none">
        
        {/* Product of the Day */}
        <div className="p-5 rounded-2xl border bg-card shadow-xs flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500 fill-amber-500/10" />
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none">Product of the Day</span>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <CompanyLogo id="cursor" name="Cursor" className="w-9 h-9 shrink-0 rounded-lg" />
              <div>
                <h4 className="text-xs font-bold leading-none text-foreground">Cursor</h4>
                <p className="text-[10px] text-muted-foreground mt-1 leading-none">AI Code Editor</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4 leading-relaxed line-clamp-2">
              The AI-first code editor built for extreme prompt coding speed and autocomplete workspace indexing.
            </p>
          </div>

          <Link href="/company/cursor" className="w-full py-2.5 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-xs flex items-center justify-center mt-6 transition-all select-none shadow-xs">
            View Product
          </Link>
        </div>

        {/* Trending Searches */}
        <div className="p-5 rounded-2xl border bg-card shadow-xs space-y-4">
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none">Trending Searches</p>
          <div className="flex flex-wrap gap-1.5">
            {trendingSearches.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  toast(`Filtering by trending search: ${term}`, 'info');
                }}
                className="px-2.5 py-1 border rounded-lg bg-secondary/50 text-muted-foreground text-[10px] font-semibold hover:bg-secondary hover:text-foreground transition-all cursor-pointer select-none leading-none"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Stay ahead in AI */}
        <div className="p-5 rounded-2xl border bg-card shadow-xs space-y-4">
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none">Stay Ahead in AI</p>
          <p className="text-xs text-muted-foreground leading-normal">
            Receive weekly lists of the top trending tools and prompt loaders.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border rounded-lg bg-background text-foreground placeholder-muted-foreground outline-0 focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/95 transition-colors rounded-lg flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
