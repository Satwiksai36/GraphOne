'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, Newspaper, ArrowUpRight, TrendingUp, Filter, Sparkles, User, Link as LinkIcon, Compass } from 'lucide-react';
import { news, companies } from '@/data/mockDb';
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

export default function NewsDiscoveryPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('All');

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

  // Available sources list
  const sources = useMemo(() => {
    const srcList = new Set<string>();
    news.forEach(art => srcList.add(art.source));
    return ['All', ...Array.from(srcList)];
  }, []);

  // Aggregate stats
  const stats = useMemo(() => {
    const uniqueStartups = new Set<string>();
    news.forEach(n => {
      if (n.companyId) uniqueStartups.add(n.companyId);
    });
    return {
      totalStories: news.length,
      startupsMentioned: uniqueStartups.size,
      trendingTopic: 'Frontier AI Agents'
    };
  }, []);

  // Filtered news feed list
  const filteredNews = useMemo(() => {
    return news.filter(art => {
      const company = companies.find(c => c.id === art.companyId);
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (company && company.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.source.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSource = 
        selectedSource === 'All' || 
        art.source === selectedSource;

      return matchesSearch && matchesSource;
    });
  }, [searchQuery, selectedSource]);

  // Source colors config helper
  const getSourceBadgeStyle = (src: string) => {
    const s = src.toLowerCase();
    if (s.includes('crunch') || s.includes('tc')) return 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20';
    if (s.includes('bloomberg') || s.includes('bb')) return 'bg-blue-500/10 text-blue-600 border border-blue-500/20';
    if (s.includes('venture') || s.includes('vb')) return 'bg-orange-500/10 text-orange-600 border border-orange-500/20';
    if (s.includes('wired')) return 'bg-red-500/10 text-red-600 border border-red-500/20';
    return 'bg-zinc-500/10 text-zinc-600 border border-zinc-500/20';
  };

  return (
    <div className="space-y-12 pb-6 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Overview Hero Title */}
      <section className="relative overflow-hidden py-12 px-6 rounded-3xl border bg-card shadow-xs text-center max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider leading-none select-none">
          <Newspaper className="w-3.5 h-3.5 stroke-[2.5]" /> Intelligence Feed
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-foreground tracking-tight leading-none mt-4">
          AI News Network
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-3">
          The global wire for artificial intelligence research announcements, product launches, corporate developments, and capital tables.
        </p>
      </section>

      {/* Aggregate Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Stories Tracked', value: `${stats.totalStories} articles`, icon: Newspaper, color: 'text-primary bg-primary/10', desc: 'Cumulative news headlines' },
          { label: 'Firms Mentioned', value: `${stats.startupsMentioned} startups`, icon: Sparkles, color: 'text-purple-500 bg-purple-500/10', desc: 'Unique covered organizations' },
          { label: 'Trending Subject', value: stats.trendingTopic, icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10', desc: 'Highest developer discussion activity' }
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
          <Search className="w-4 h-4 text-muted-foreground shrink-0 ml-3" />
          <input
            type="text"
            placeholder="Search news titles, publishers, or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 pl-2.5 pr-4 py-2 text-xs text-foreground bg-transparent placeholder-muted-foreground outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 text-xs">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {sources.map((src) => (
              <button
                key={src}
                onClick={() => {
                  setSelectedSource(src);
                  toast(`Filtering by publisher: ${src}`, 'info');
                }}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer whitespace-nowrap leading-none ${
                  selectedSource === src
                    ? 'bg-primary border-primary text-white shadow-xs'
                    : 'bg-card text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {src}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Feed List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
          <span className="font-bold uppercase tracking-wider">{filteredNews.length} Headlines Found</span>
          <span className="flex items-center gap-1.5 font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            Live Wire Feed
          </span>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {filteredNews.map((article) => {
              const company = companies.find(c => c.id === article.companyId);
              const storyUrl = article.url || `https://google.com/search?q=${encodeURIComponent(article.title + " " + article.source)}`;
              return (
                <div 
                  key={article.id}
                  className="p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-850 bg-white dark:bg-zinc-900 shadow-2xs hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between gap-5 relative overflow-hidden group"
                >
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded leading-none uppercase tracking-wider ${getSourceBadgeStyle(article.source)}`}>
                        {article.source}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 opacity-80" />
                        {article.date}
                      </span>
                    </div>

                    <a 
                      href={storyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-base font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug hover:text-primary transition-colors cursor-pointer"
                    >
                      {article.title}
                    </a>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4 mt-auto">
                    {company ? (
                      <Link 
                        href={`/company/${company.id}`}
                        className="flex items-center gap-2 p-1.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 transition-colors shadow-2xs"
                      >
                        <CompanyLogo id={company.id} name={company.name} className="w-8 h-8 border-none shrink-0 rounded-lg" />
                        <span className="text-[10px] font-black text-zinc-700 dark:text-zinc-300 capitalize pr-1.5 leading-none">{company.name}</span>
                      </Link>
                    ) : (
                      <span className="text-[10px] text-muted-foreground font-bold">General News</span>
                    )}

                    <a
                      href={storyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors select-none"
                    >
                      READ STORY <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground border border-dashed rounded-2xl bg-card">
            No headlines found matching the criteria.
          </div>
        )}
      </section>

    </div>
  );
}
