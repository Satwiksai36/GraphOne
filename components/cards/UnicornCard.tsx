'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Company } from '@/types';

interface UnicornCardProps {
  company: Company;
}

export function UnicornCard({ company }: UnicornCardProps) {
  return (
    <Link href={`/company/${company.id}`} className="shrink-0">
      <motion.div
        whileHover={{ scale: 1.02, y: -1 }}
        className="flex items-center gap-3 px-5 py-3 rounded-xl border bg-card hover:bg-secondary transition-all min-w-[200px]"
      >
        <div className="w-8 h-8 rounded-lg bg-secondary border flex items-center justify-center font-bold text-xs text-muted-foreground select-none shrink-0">
          {company.name[0]}
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-foreground truncate leading-none">
            {company.name}
          </h4>
          <p className="text-[10px] font-mono font-black text-primary mt-1.5 leading-none">
            {company.valuation || company.fundingTotal}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
