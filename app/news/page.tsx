'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, Newspaper, ArrowUpRight, TrendingUp, Filter, Sparkles } from 'lucide-react';
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

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Overview Hero Title */}
      <section className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest leading-none select-none">
          <Newspaper className="w-3.5 h-3.5" /> Intelligence Feed
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-none">
          AI News Network
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The global wire for artificial intelligence research announcements, product launches, corporate developments, and capital tables.
        </p>
      </section>

      {/* Aggregate Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border bg-card shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Stories Tracked</p>
            <h3 className="text-2xl font-black text-foreground mt-2 leading-none">{stats.totalStories} articles</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl border bg-card shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-black">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Firms Mentioned</p>
            <h3 className="text-2xl font-black text-foreground mt-2 leading-none">{stats.startupsMentioned} startups</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl border bg-card shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Trending Subject</p>
            <h3 className="text-2xl font-black text-foreground mt-2 leading-none">{stats.trendingTopic}</h3>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-6">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search news titles, publishers, or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border rounded-xl bg-background text-foreground placeholder-muted-foreground outline-0 focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {sources.map((src) => (
              <button
                key={src}
                onClick={() => {
                  setSelectedSource(src);
                  toast(`Filtering by publisher: ${src}`, 'info');
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer whitespace-nowrap leading-none ${
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
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
          <span className="font-bold uppercase tracking-wider">{filteredNews.length} Headlines Found</span>
          <span>Sorting: Most Recent</span>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map((article) => {
              const company = companies.find(c => c.id === article.companyId);
              return (
                <div 
                  key={article.id}
                  className="p-5 rounded-2xl border bg-card hover:shadow-xs transition-shadow flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1 font-bold text-primary leading-none">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border font-semibold">
                        {article.source}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-foreground leading-snug">
                      {article.title}
                    </h3>
                  </div>

                  {/* Company Tag */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    {company ? (
                      <div className="flex items-center gap-2">
                        <CompanyLogo 
                          id={company.id} 
                          name={company.name} 
                          domain={extractDomain(company.website)} 
                          className="w-6 h-6 shrink-0" 
                        />
                        <Link 
                          href={`/company/${company.id}`}
                          className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                        >
                          {company.name}
                        </Link>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">General Intelligence</div>
                    )}

                    <button 
                      onClick={() => toast(`Navigating to ${article.source} source details for: "${article.title}"...`, 'success')}
                      className="inline-flex items-center gap-0.5 text-xs font-bold text-primary hover:text-primary/90 transition-colors select-none cursor-pointer"
                    >
                      Read Story <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground border border-dashed rounded-2xl bg-card">
            No news articles found matching the search filters.
          </div>
        )}
      </section>

    </div>
  );
}
