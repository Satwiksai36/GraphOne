'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../common/ThemeProvider';
import { CommandPalette } from '../search/CommandPalette';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Companies', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Investors', href: '/investors' },
    { name: 'Funding', href: '/funding' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'News', href: '/news' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Brand Area */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-primary shadow-xs transition-transform group-hover:scale-105 duration-200">
              <svg className="w-6 h-6 fill-none" viewBox="0 0 24 24">
                <path d="M5 18H19 M10 11V18 M14 15V18" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" strokeLinecap="round" />
                <path d="M5 17L10 11L14 15L19 7" className="stroke-primary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="19" cy="7" r="2.5" className="fill-primary" />
                <circle cx="19" cy="7" r="1" className="fill-background" />
              </svg>
            </span>
            <span className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary leading-none">
              Graph<span className="text-primary">One</span>
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                (link.href === '/' && pathname === '/') ||
                (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-primary hover:text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Search, Actions Area */}
        <div className="flex items-center gap-4">
          <CommandPalette />

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border bg-card text-foreground hover:bg-secondary cursor-pointer transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>

          {/* Auth Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-3 py-2 whitespace-nowrap shrink-0">
              Log in
            </button>
            <button className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-sm rounded-full px-4 py-2 cursor-pointer select-none whitespace-nowrap shrink-0">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 rounded-full border bg-card text-foreground hover:bg-secondary transition-colors cursor-pointer">
            <Menu className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
