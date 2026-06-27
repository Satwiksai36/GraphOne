'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUpRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Company } from '@/types';
import { formatViews } from '@/lib/utils';

interface FeaturedProps {
  company: Company;
  rank: number;
}

export function TrendingCardFeatured({ company, rank }: FeaturedProps) {
  // Use unique backgrounds for the top 3 cards
  const bgGradients = [
    'from-indigo-950 via-purple-950 to-zinc-950 border-purple-500/20',
    'from-slate-950 via-teal-950 to-zinc-950 border-teal-500/20',
    'from-zinc-950 via-purple-900/60 to-black border-pink-500/20'
  ];
  
  const labelColors = [
    'text-purple-400 bg-purple-500/10 border-purple-500/30',
    'text-teal-400 bg-teal-500/10 border-teal-500/30',
    'text-pink-400 bg-pink-500/10 border-pink-500/30'
  ];

  const gradient = bgGradients[rank - 1] || bgGradients[0];
  const labelColor = labelColors[rank - 1] || labelColors[0];

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden flex flex-col justify-between p-6 rounded-2xl border bg-linear-to-br ${gradient} shadow-xl min-h-[260px] group`}
    >
      {/* Decorative background glows */}
      <div className="absolute -right-16 -top-16 w-36 h-36 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300 pointer-events-none" />
      
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-white/40">
            0{rank}
          </span>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${labelColor}`}>
            Trending #{rank}
          </span>
        </div>

        {/* Company Name & Sector */}
        <div className="mt-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0 text-white font-bold text-lg select-none">
            {company.name[0]}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white leading-tight flex items-center gap-1.5 group-hover:text-primary transition-colors">
              {company.name}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-white/50 mt-1">{company.categories[0] || 'AI Platform'}</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-white/70 mt-4 line-clamp-2 leading-relaxed">
          {company.tagline}
        </p>
      </div>

      {/* Footer Metrics */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {formatViews(company.views7d)} views (7d)
        </span>
        <Link href={`/company/${company.id}`} className="text-white hover:text-primary font-medium transition-colors flex items-center gap-1">
          Profile <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}

export function TrendingCardSimple({ company }: { company: Company }) {
  return (
    <Link href={`/company/${company.id}`}>
      <motion.div
        whileHover={{ x: 4 }}
        className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-secondary transition-all shadow-xs group"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-secondary border flex items-center justify-center font-bold text-base text-muted-foreground shrink-0 select-none">
            {company.name[0]}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors leading-none">
              {company.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-1.5 truncate leading-none">
              {company.categories[0] || 'AI Platform'} &middot; {formatViews(company.views7d)} views
            </p>
          </div>
        </div>
        
        <span className="p-1.5 rounded-full border bg-card text-muted-foreground group-hover:text-primary group-hover:border-primary transition-all shrink-0">
          <ChevronRight className="w-4 h-4" />
        </span>
      </motion.div>
    </Link>
  );
}
