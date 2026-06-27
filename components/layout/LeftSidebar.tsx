'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Rocket, Sparkles, Briefcase, FileText, PlusCircle, Bookmark, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '../ui/Toast';

export function LeftSidebar() {
  const pathname = usePathname();
  const { toast } = useToast();

  const links = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'AI Startups', href: '/', icon: Rocket },
    { name: 'AI Products', href: '/products', icon: Compass },
    { name: 'Investors', href: '/investors', icon: Sparkles },
    { name: 'Jobs', href: '#', icon: Briefcase },
    { name: 'News', href: '#', icon: FileText }
  ];

  const handleContribute = (type: string) => {
    toast(`Submit ${type} portal coming soon!`, 'info');
  };

  return (
    <aside className="w-56 shrink-0 hidden md:flex flex-col gap-8 self-start sticky top-24 select-none">
      {/* Primary Links */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Contribute Panel */}
      <div className="space-y-3">
        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest px-3 leading-none">Contribute</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleContribute('Startup')}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all w-full text-left cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-primary" />
            <span>Submit Startup</span>
          </button>
          <button
            onClick={() => handleContribute('Product')}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all w-full text-left cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-indigo-500" />
            <span>Submit Product</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
