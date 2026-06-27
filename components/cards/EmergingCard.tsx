'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Calendar } from 'lucide-react';
import { Company } from '@/types';
import { CompanyLogo } from '../common/BrandLogo';

interface EmergingCardProps {
  company: Company;
  featured?: boolean;
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

export function EmergingCard({ company, featured = false }: EmergingCardProps) {
  if (featured) {
    return (
      <Link href={`/company/${company.id}`} className="block col-span-1 md:col-span-2">
        <motion.div
          whileHover={{ y: -4 }}
          className="relative overflow-hidden flex flex-col sm:flex-row justify-between gap-6 p-6 rounded-2xl border bg-card hover:shadow-md transition-all min-h-[170px] group"
        >
          {/* Abstract SVG Connection Glow on Right Side */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none hidden sm:block">
            <svg className="w-full h-full text-primary" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="80" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="80" cy="50" r="15" fill="currentColor" />
              <line x1="20" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
            </svg>
          </div>

          <div className="flex-1 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3">
                <CompanyLogo id={company.id} name={company.name} domain={extractDomain(company.website)} className="w-10 h-10 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-none">
                    {company.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-none">
                    {company.categories[0] || 'AI Platform'}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 line-clamp-2 leading-relaxed max-w-md">
                {company.description}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              <span className="flex items-center gap-1 leading-none">
                <Calendar className="w-3.5 h-3.5" />
                Founded {company.foundedYear}
              </span>
              <span className="flex items-center gap-1 leading-none">
                <Users className="w-3.5 h-3.5" />
                {company.employeeCount}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/company/${company.id}`} className="block">
      <motion.div
        whileHover={{ y: -4 }}
        className="flex flex-col justify-between p-5 rounded-2xl border bg-card hover:shadow-md transition-all h-[170px] group"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <CompanyLogo id={company.id} name={company.name} domain={extractDomain(company.website)} className="w-9 h-9 shrink-0" />
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors leading-none">
                {company.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 truncate leading-none">
                {company.categories[0] || 'AI Research'}
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-3.5 line-clamp-2 leading-relaxed">
            {company.tagline}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          <span className="flex items-center gap-1 leading-none">
            <Calendar className="w-3 h-3" />
            {company.foundedYear}
          </span>
          <span className="flex items-center gap-1 leading-none">
            <Users className="w-3 h-3" />
            {company.employeeCount.replace(' employees', '')}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
