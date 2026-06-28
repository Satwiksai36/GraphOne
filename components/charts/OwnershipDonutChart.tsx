'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface DataItem {
  category: string;
  percentage: number;
}

interface DonutChartProps {
  data: DataItem[];
}

export function OwnershipDonutChart({ data }: DonutChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.percentage,
  }));

  // Sleek Tailwind matching HSL color palette
  const COLORS = ['#ff3366', '#8b5cf6', '#06b6d4', '#e4e4e7', '#f97316'];

  if (!mounted) {
    return (
      <div className="w-full h-[240px] flex items-center justify-center text-xs text-muted-foreground">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              background: 'var(--card)', 
              borderColor: 'var(--border)', 
              color: 'var(--foreground)',
              borderRadius: '8px',
              fontSize: '12px'
            }} 
            formatter={(value) => [`${value}%`, 'Share']}
          />
          <Legend 
            verticalAlign="middle" 
            align="right" 
            layout="vertical"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', paddingLeft: '15px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
