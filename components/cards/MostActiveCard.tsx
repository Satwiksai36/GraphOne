'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Investor } from '@/types';
import { companies } from '@/data/mockDb';

interface MostActiveCardProps {
  investor: Investor;
}

export function MostActiveCard({ investor }: MostActiveCardProps) {
  // Find top backed companies from the global companies list
  const topBacked = investor.recentInvestments.map((inv) => {
    return companies.find(c => c.id === inv.companyId);
  }).filter(Boolean);

  return (
    <div className="p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary border flex items-center justify-center font-bold text-base text-muted-foreground select-none">
              {investor.name[0]}
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground leading-none">{investor.name}</h4>
              <p className="text-[10px] text-muted-foreground mt-1.5 uppercase font-bold tracking-wider leading-none">
                {investor.stats.deals90d} deals last 90d
              </p>
            </div>
          </div>
          
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">
            {investor.stats.mostActiveStage}
          </span>
        </div>

        {/* Backed Companies Row */}
        <div className="mt-6">
          <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest leading-none">Top Portfolio Backs</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {topBacked.slice(0, 3).map((company) => (
              company && (
                <Link key={company.id} href={`/company/${company.id}`} className="flex items-center gap-1 px-2.5 py-1 border rounded-lg bg-secondary/40 text-xs font-semibold text-foreground hover:bg-secondary transition-colors">
                  <span className="w-3.5 h-3.5 rounded bg-white border flex items-center justify-center text-[9px] font-black shrink-0">
                    {company.name[0]}
                  </span>
                  <span>{company.name}</span>
                </Link>
              )
            ))}
            {topBacked.length === 0 && (
              <span className="text-xs text-muted-foreground italic">No public profiles listed</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t flex items-center justify-end">
        <Link href={`/investor/${investor.id}`} className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5 leading-none">
          View portfolio <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
