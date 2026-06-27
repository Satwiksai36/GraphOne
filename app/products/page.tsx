'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ArrowUp, MessageSquare, Flame, Star, Trophy, Sparkles, 
  ChevronRight, Send, Compass, Cpu, Bot, Terminal, Code
} from 'lucide-react';

import { products } from '@/data/mockDb';
import { Product } from '@/types';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { useToast } from '@/components/ui/Toast';

export default function ProductsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular');
  const [visibleCount, setVisibleCount] = useState(10);
  const [email, setEmail] = useState('');

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
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      
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
      
      {/* 1. LEFT SIDEBAR PANEL */}
      <LeftSidebar />

      {/* 2. CENTER SCROLLABLE FEED */}
      <div className="flex-1 space-y-8 min-w-0">
        
        {/* Hero Banner with search */}
        <section className="p-6 rounded-2xl border bg-card shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[200px]">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="space-y-3 relative z-10 max-w-xl">
            <span className="text-[10px] uppercase font-black tracking-widest text-primary leading-none block">Live AI Intelligence</span>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
              The Global Intelligence <br />Layer <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">for AI</span>.
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Discover real-time user upvotes, bookmark tools, and analyze active developer frameworks in the AI economy.
            </p>
          </div>

          <div className="relative max-w-md mt-6 z-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products, builders, frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs border rounded-full bg-background text-foreground placeholder-muted-foreground outline-0 focus:border-primary transition-colors"
            />
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
            {popularRightNow.map((p) => (
              <div 
                key={p.id}
                onClick={() => toast(`Opening details for: ${p.name}`, 'info')}
                className="w-[180px] p-4 rounded-xl border bg-card hover:bg-secondary/40 transition-colors flex flex-col justify-between h-[120px] shrink-0 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-secondary border flex items-center justify-center font-bold text-xs text-muted-foreground select-none">
                    {p.name[0]}
                  </span>
                  <span className="text-[9px] font-bold text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-0.5 leading-none">
                    <ArrowUp className="w-3 h-3" /> {p.votesCount}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground truncate leading-none mt-3">{p.name}</h4>
                  <p className="text-[10px] text-muted-foreground truncate leading-none mt-1">{p.tagline}</p>
                </div>
              </div>
            ))}
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
              {filteredProducts.slice(0, visibleCount).map((p) => (
                <div 
                  key={p.id}
                  onClick={() => toast(`Opening details for: ${p.name}`, 'info')}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl border bg-card hover:bg-secondary/20 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Logo/Icon */}
                    <div className="w-10 h-10 rounded-xl bg-secondary border flex items-center justify-center font-bold text-base text-muted-foreground shrink-0 select-none">
                      {p.name[0]}
                    </div>
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
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5 truncate max-w-sm sm:max-w-md leading-none">
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={(e) => handleBookmark(p.id, e)}
                      className={`p-1.5 rounded-lg border hover:bg-secondary cursor-pointer transition-colors ${
                        p.bookmarkedByUser ? 'text-primary border-primary/20' : 'text-muted-foreground'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${p.bookmarkedByUser ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => handleVote(p.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl transition-all cursor-pointer select-none leading-none text-xs font-bold ${
                        p.upvotedByUser
                          ? 'bg-primary border-primary text-white shadow-xs scale-105'
                          : 'bg-card text-foreground hover:bg-secondary'
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5 shrink-0" />
                      <span>{p.votesCount}</span>
                    </button>
                  </div>
                </div>
              ))}
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
              <div className="w-9 h-9 rounded-lg bg-emerald-950 text-white flex items-center justify-center font-bold text-sm select-none">
                C
              </div>
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
