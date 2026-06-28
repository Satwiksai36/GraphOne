'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Building2, UserCheck, ShieldCheck, Activity } from 'lucide-react';
import { Company } from '@/types';
import { companies } from '@/data/mockDb';

interface Node {
  id: string;
  label: string;
  category: 'core' | 'product' | 'investor' | 'competitor' | 'acquisition' | 'investment';
  x: number;
  y: number;
}

interface EcosystemGraphProps {
  company: Company;
}

export function CompanyEcosystemGraph({ company }: EcosystemGraphProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  // Define nodes radiating around the center (400, 250)
  const coreX = 400;
  const coreY = 250;

  // Let's build nodes for OpenAI
  const nodes: Node[] = [
    { id: 'core', label: company.name, category: 'core', x: coreX, y: coreY },
    
    // Products (Top)
    { id: 'p1', label: 'ChatGPT', category: 'product', x: 260, y: 80 },
    { id: 'p2', label: 'GPT-4o', category: 'product', x: 400, y: 70 },
    { id: 'p3', label: 'Sora', category: 'product', x: 540, y: 80 },
    
    // Investors (Right)
    { id: 'i1', label: 'Microsoft', category: 'investor', x: 620, y: 170 },
    { id: 'i2', label: 'Sequoia', category: 'investor', x: 650, y: 250 },
    { id: 'i3', label: 'a16z', category: 'investor', x: 620, y: 330 },
    
    // Competitors (Left)
    { id: 'c1', label: 'Anthropic', category: 'competitor', x: 180, y: 170 },
    { id: 'c2', label: 'DeepMind', category: 'competitor', x: 150, y: 250 },
    { id: 'c3', label: 'xAI', category: 'competitor', x: 180, y: 330 },
    
    // Acquisitions / Investments (Bottom)
    { id: 'a1', label: 'Rockset', category: 'acquisition', x: 280, y: 400 },
    { id: 'inv1', label: 'Figure AI', category: 'investment', x: 400, y: 420 },
    { id: 'a2', label: 'Harvey', category: 'investment', x: 520, y: 400 }
  ];

  const categories = [
    { name: 'product', label: 'Products', color: 'stroke-sky-500 text-sky-500 fill-sky-500/10' },
    { name: 'investor', label: 'Investors', color: 'stroke-pink-500 text-pink-500 fill-pink-500/10' },
    { name: 'competitor', label: 'Competitors', color: 'stroke-rose-500 text-rose-500 fill-rose-500/10' },
    { name: 'acquisition', label: 'Acquisitions', color: 'stroke-violet-500 text-violet-500 fill-violet-500/10' },
    { name: 'investment', label: 'Investments', color: 'stroke-emerald-500 text-emerald-500 fill-emerald-500/10' }
  ];

  return (
    <div className="flex flex-col p-6 rounded-2xl border bg-card shadow-xs overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-6">
        <div>
          <h3 className="text-lg font-black text-foreground">11. AI Ecosystem Graph</h3>
          <p className="text-xs text-muted-foreground mt-1">Interactive network mapping capital, product, and competitor relationships.</p>
        </div>

        {/* Legend Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer select-none leading-none ${
              activeCategory === null 
                ? 'bg-primary text-white border-primary' 
                : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
            }`}
          >
            All Connections
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer select-none leading-none ${
                activeCategory === cat.name
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative border rounded-xl bg-secondary/20 w-full overflow-x-auto no-scrollbar">
        <svg
          viewBox="0 0 800 500"
          className="w-full min-w-[700px] h-[400px] select-none block"
        >
          {/* Defs for animations & gradients */}
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff3366" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          {nodes
            .filter((node) => node.category !== 'core')
            .map((node, idx) => {
              const isSelected = activeCategory === null || activeCategory === node.category;
              const isHovered = hoveredNode?.id === node.id;
              
              return (
                <g key={`line-${node.id}`} className="transition-opacity duration-300">
                  {/* Outer glow connection line */}
                  <path
                    d={`M ${coreX} ${coreY} Q ${(coreX + node.x) / 2} ${(coreY + node.y) / 2 - 30} ${node.x} ${node.y}`}
                    fill="none"
                    stroke={isHovered ? 'var(--primary)' : 'url(#lineGrad)'}
                    strokeWidth={isHovered ? 2.5 : isSelected ? 1.5 : 0.5}
                    strokeDasharray={isSelected ? 'none' : '4 4'}
                    className="transition-all"
                  />
                  {/* Moving signal pulse along line */}
                  {isSelected && (
                    <motion.circle
                      r="3"
                      fill="var(--primary)"
                      initial={{ offset: 0 }}
                      animate={{
                        cx: [coreX, node.x],
                        cy: [coreY, node.y]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: (idx * 0.4) % 2
                      }}
                    />
                  )}
                </g>
              );
            })}

          {/* Core Central Node */}
          <g>
            {/* Pulsing Outer Rings */}
            <circle cx={coreX} cy={coreY} r="45" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 3" className="animate-spin [animation-duration:20s]" />
            <motion.circle
              cx={coreX}
              cy={coreY}
              r="40"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.5"
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
            {/* Core Card */}
            <foreignObject x={coreX - 60} y={coreY - 25} width="120" height="50">
              <div className="w-full h-full rounded-xl border border-primary bg-primary text-white shadow-lg shadow-primary/20 flex flex-col items-center justify-center p-1 text-center">
                <span className="text-xs font-black truncate max-w-full leading-none">{company.name}</span>
                <span className="text-[8px] uppercase tracking-widest mt-1 opacity-80 leading-none">Core Network</span>
              </div>
            </foreignObject>
          </g>

          {/* Orbit Nodes */}
          {nodes
            .filter((node) => node.category !== 'core')
            .map((node) => {
              const isSelected = activeCategory === null || activeCategory === node.category;
              const isHovered = hoveredNode?.id === node.id;
              
              const catConfig = categories.find((c) => c.name === node.category);
              const nodeClass = catConfig ? catConfig.color : '';

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`cursor-pointer transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-25'}`}
                >
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 28 : 22}
                    className={`${nodeClass} transition-all duration-300 stroke-[1.5]`}
                  />
                  <foreignObject
                    x={node.x - 45}
                    y={node.y - 12}
                    width="90"
                    height="24"
                  >
                    <div className="w-full h-full flex items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-foreground truncate max-w-full leading-tight">
                        {node.label}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
        </svg>

        {/* Dynamic Context Tooltip Details */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 p-3 rounded-lg border bg-card/90 shadow-md text-xs pointer-events-none max-w-xs"
            >
              <p className="font-bold text-foreground flex items-center gap-1.5 capitalize">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {hoveredNode.category}: {hoveredNode.label}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                {hoveredNode.category === 'product' && 'Active product release linked with user metrics.'}
                {hoveredNode.category === 'investor' && 'Active VC backing the core funding velocity.'}
                {hoveredNode.category === 'competitor' && 'Direct industry competitor targeting similar model parameters.'}
                {hoveredNode.category === 'acquisition' && 'Company assets acquired to build core technology.'}
                {hoveredNode.category === 'investment' && 'Portfolio asset backed by the core company entity.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
