'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { CompanyLogo } from '@/components/common/BrandLogo';

export interface LeaderboardItem {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  route: string;
  companyId?: string;
}

interface LeaderboardCardProps {
  title: string;
  number: string;
  subtitle: string;
  items: LeaderboardItem[];
  viewAllRoute?: string;
}

export function LeaderboardCard({ title, number, subtitle, items, viewAllRoute = '/' }: LeaderboardCardProps) {
  return (
    <div className="flex flex-col p-6 rounded-2xl border bg-card shadow-xs min-h-[300px]">
      {/* Title Header */}
      <div className="flex items-start gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-black shrink-0 select-none">
          {number}
        </span>
        <div>
          <h3 className="text-sm font-black text-foreground leading-none">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1.5 leading-none">{subtitle}</p>
        </div>
      </div>

      {/* Items List */}
      <div className="mt-6 flex-1 flex flex-col justify-between gap-4">
        {items.map((item, index) => (
          <Link key={item.id} href={item.route} className="block group">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <CompanyLogo id={item.companyId || item.id} name={item.name} className="w-8 h-8 shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors leading-none">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1.5 truncate leading-none">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {item.badge && (
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-secondary text-muted-foreground shrink-0 leading-none">
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t flex items-center justify-end">
        <Link href={viewAllRoute} className="text-xs font-semibold hover:text-primary flex items-center gap-0.5 cursor-pointer leading-none transition-colors">
          More details <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
