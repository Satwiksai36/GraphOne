'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CompanySubNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabsRefMap: Record<string, React.RefObject<HTMLDivElement | null>>;
}

export function CompanySubNavbar({ activeTab, setActiveTab, tabsRefMap }: CompanySubNavbarProps) {
  const tabs = [
    { id: 'overview', name: '1. Overview' },
    { id: 'timeline', name: '2. Timeline' },
    { id: 'funding', name: '3. Funding & Ownership' },
    { id: 'investors', name: '5. Investors' },
    { id: 'leadership', name: '6. Leadership' },
    { id: 'products', name: '7. Products' },
    { id: 'ecosystem', name: '11. Ecosystem Graph' },
    { id: 'news', name: '12. News & Research' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const ref = tabsRefMap[tabId];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-16 z-30 w-full border-b bg-background/90 backdrop-blur-md overflow-x-auto no-scrollbar py-2 shrink-0 select-none">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 leading-none",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground font-black"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
