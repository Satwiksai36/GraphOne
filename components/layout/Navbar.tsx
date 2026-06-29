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
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs transition-transform group-hover:scale-105 duration-200 shrink-0">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="30,68 46,46 46,68" className="fill-zinc-200 dark:fill-zinc-850" />
                <path
                  d="M30 68 l16 -22 l14 12 l15 -26"
                  fill="none"
                  stroke="#ff3366"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="75" cy="32" r="5" className="fill-white dark:fill-zinc-900" stroke="#ff3366" strokeWidth="3" />
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
