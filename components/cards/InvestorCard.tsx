'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Investor } from '@/types';

interface InvestorCardProps {
  investor: Investor;
  index: number;
}

export function InvestorCard({ investor, index }: InvestorCardProps) {
  // Eye-catching gradient backgrounds matching Screen 3 visual design
  const gradients = [
    'from-orange-600 to-rose-500 shadow-orange-500/10',
    'from-emerald-600 to-teal-500 shadow-emerald-500/10',
    'from-blue-600 to-indigo-500 shadow-blue-500/10',
    'from-purple-600 to-pink-500 shadow-purple-500/10',
    'from-rose-600 to-orange-500 shadow-rose-500/10',
    'from-zinc-800 to-zinc-950 shadow-zinc-500/10'
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <Link href={`/investor/${investor.id}`} className="shrink-0">
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        className={`w-[240px] h-[260px] rounded-2xl p-6 bg-linear-to-br ${gradient} text-white flex flex-col justify-between shadow-xl relative overflow-hidden group`}
      >
        {/* Glow Element */}
        <div className="absolute -right-8 -top-8 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300" />
        
        <div>
          {/* Logo Placeholder */}
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center font-black text-lg select-none">
            {investor.name[0]}
          </div>

          <h3 className="text-lg font-black mt-6 leading-tight group-hover:underline">
            {investor.name}
          </h3>
          <p className="text-[10px] text-white/60 mt-1.5 uppercase font-bold tracking-wider leading-none">
            {investor.type.join(' &middot; ')}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[10px] text-white/80 leading-none">
            <MapPin className="w-3.5 h-3.5" />
            <span>{investor.location.split(',')[0]}</span>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold">
            <span>View portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
