'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, MapPin, Users, DollarSign } from 'lucide-react';
import { Company } from '@/types';
import { cn } from '@/lib/utils';
import { CompanyLogo } from '@/components/common/BrandLogo';

interface CompanyListCardProps {
  company: Company;
  viewMode: 'grid' | 'list';
}

const extractDomain = (url?: string) => {
  if (!url) return undefined;
  try {
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.split('/')[0];
  } catch (e) {
    return undefined;
  }
};

export function CompanyListCard({ company, viewMode }: CompanyListCardProps) {
  const isGrid = viewMode === 'grid';

  if (!isGrid) {
    // List view row
    return (
      <Link href={`/company/${company.id}`} className="block">
        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ x: 4, scale: 1.005 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card hover:bg-secondary/40 transition-colors shadow-2xs hover:shadow-xs"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <CompanyLogo id={company.id} name={company.name} domain={extractDomain(company.website)} className="w-10 h-10 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-foreground truncate leading-none">
                  {company.name}
                </h4>
                {company.isVerified && (
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-white shrink-0">
                    <Check className="w-2 h-2 stroke-3" />
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate max-w-md">
                {company.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              Valuation: <strong className="text-foreground">{company.valuation || company.fundingTotal}</strong>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {company.location.split(',')[0]}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {company.employeeCount.replace(' employees', '')}
            </span>
            <span className="px-2 py-0.5 rounded bg-secondary text-[10px] font-bold uppercase tracking-wide">
              {company.categories[0] || 'AI'}
            </span>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Grid view card
  return (
    <Link href={`/company/${company.id}`} className="block">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col justify-between p-5 rounded-2xl border bg-card hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors h-[210px] group"
      >
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2">
            <CompanyLogo id={company.id} name={company.name} domain={extractDomain(company.website)} className="w-10 h-10 shrink-0" />
            
            <span className="px-2 py-0.5 rounded-full bg-secondary text-[9px] font-black uppercase tracking-wider text-muted-foreground">
              {company.categories[0] || 'AI Platform'}
            </span>
          </div>

          {/* Title and Tagline */}
          <div className="mt-4 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-none truncate">
                {company.name}
              </h4>
              {company.isVerified && (
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-white shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-3" />
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
              {company.tagline}
            </p>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-6 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <MapPin className="w-3.5 h-3.5" />
            {company.location.split(',')[0]}
          </span>
          <span className="font-bold text-foreground">
            {company.valuation || company.fundingTotal}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
