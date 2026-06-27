'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, Code, Search, Video, Mic, Server, Activity, Cpu, 
  LucideIcon 
} from 'lucide-react';

interface CategoryCardProps {
  name: string;
  count: number;
  iconName: string;
  onClick?: () => void;
  selected?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  agents: Bot,
  coding: Code,
  search: Search,
  video: Video,
  voice: Mic,
  infra: Server,
  health: Activity,
  robotics: Cpu
};

export function CategoryCard({ name, count, iconName, onClick, selected = false }: CategoryCardProps) {
  const Icon = iconMap[iconName] || Bot;

  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl border text-left cursor-pointer transition-all w-full select-none ${
        selected 
          ? 'bg-primary border-primary text-primary-foreground shadow-xs' 
          : 'bg-card hover:bg-secondary hover:shadow-xs text-foreground'
      }`}
    >
      <span className={`p-2.5 rounded-lg shrink-0 ${
        selected ? 'bg-white/20 text-white' : 'bg-secondary text-primary'
      }`}>
        <Icon className="w-5 h-5" />
      </span>
      <div className="min-w-0">
        <h4 className="text-sm font-bold truncate leading-none">{name}</h4>
        <p className={`text-xs mt-1.5 leading-none ${selected ? 'text-white/80' : 'text-muted-foreground'}`}>
          {count.toLocaleString()} companies
        </p>
      </div>
    </motion.button>
  );
}
