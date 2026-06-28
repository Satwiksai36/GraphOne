'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MiniGrowthChartProps {
  color?: string;
  className?: string;
  points?: number[];
}

export function MiniGrowthChart({ color = '#ff3366', className, points = [50, 40, 45, 30, 20, 25, 10] }: MiniGrowthChartProps) {
  // Generate SVG path for a line chart based on points
  const width = 100;
  const height = 40;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const svgPoints = points.map((p, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 8) - 4; // Add padding
    return { x, y };
  });

  let pathData = '';
  if (svgPoints.length > 0) {
    pathData = `M ${svgPoints[0].x} ${svgPoints[0].y}`;
    for (let i = 1; i < svgPoints.length; i++) {
      const prev = svgPoints[i - 1];
      const curr = svgPoints[i];
      const cpX1 = prev.x + (curr.x - prev.x) / 2;
      const cpY1 = prev.y;
      const cpX2 = prev.x + (curr.x - prev.x) / 2;
      const cpY2 = curr.y;
      pathData += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
    }
  }

  // Create area path
  const areaData = pathData ? `${pathData} L ${width} ${height} L 0 ${height} Z` : '';

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.00" />
          </linearGradient>
        </defs>
        {/* Fill Area */}
        {areaData && (
          <motion.path 
            d={areaData} 
            fill={`url(#grad-${color.replace('#', '')})`} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
        )}
        {/* Stroke Line */}
        {pathData && (
          <motion.path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}
