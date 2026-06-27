'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Company } from '@/types';

import { CompanyLogo } from '@/components/common/BrandLogo';

interface UnicornCardProps {
  company: Company;
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

export function UnicornCard({ company }: UnicornCardProps) {
  return (
    <Link href={`/company/${company.id}`} className="shrink-0">
      <motion.div
        whileHover={{ scale: 1.02, y: -1 }}
        className="flex items-center gap-3 px-5 py-3 rounded-xl border bg-card hover:bg-secondary transition-all min-w-[200px]"
      >
        <CompanyLogo id={company.id} name={company.name} domain={extractDomain(company.website)} className="w-8 h-8 shrink-0" />
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
