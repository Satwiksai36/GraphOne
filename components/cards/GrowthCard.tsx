'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Company } from '@/types';
import { MiniGrowthChart } from '../charts/MiniGrowthChart';

import { CompanyLogo } from '../common/BrandLogo';

interface GrowthCardProps {
  company: Company;
  index: number;
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

export function GrowthCard({ company, index }: GrowthCardProps) {
  // Rotate wave colors for aesthetic variety
  const colors = ['#ff3366', '#06b6d4', '#8b5cf6', '#f97316', '#3b82f6'];
  const color = colors[index % colors.length];

  // Dynamic growth metrics mockpoints
  const pointsList = [
    [70, 65, 55, 45, 30, 20, 10],
    [50, 48, 52, 38, 25, 20, 15],
    [90, 80, 75, 60, 45, 30, 12],
    [40, 38, 30, 32, 28, 18, 8],
    [80, 70, 75, 55, 42, 35, 14]
  ];
  const points = pointsList[index % pointsList.length];

  return (
    <Link href={`/company/${company.id}`} className="block">
      <motion.div
        whileHover={{ y: -4 }}
        className="relative overflow-hidden flex flex-col justify-between p-5 rounded-2xl border bg-card hover:shadow-md transition-all h-[170px] group"
      >
        {/* Background Sparkline Wave */}
        <div className="absolute inset-x-0 bottom-0 h-16 opacity-35 group-hover:opacity-50 transition-opacity">
          <MiniGrowthChart color={color} points={points} className="w-full h-full" />
        </div>

        {/* Content Area */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <CompanyLogo id={company.id} name={company.name} domain={extractDomain(company.website)} className="w-10 h-10 shrink-0" />
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors leading-none">
                {company.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 truncate leading-none">
                {company.categories[0] || 'AI Startup'}
              </p>
            </div>
          </div>
        </div>

        {/* Growth Rate / Metric Indicator */}
        <div className="relative z-10 flex items-end justify-between mt-auto">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">
              Weekly Momentum
            </p>
            <p className="text-lg font-black text-foreground mt-1 leading-none">
              +{company.growthRate || (120 + index * 30)}%
            </p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 leading-none">
            Active
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
