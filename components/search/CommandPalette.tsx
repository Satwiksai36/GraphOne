'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Search, Building2, User, Sparkles, UserCheck, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { companies, investors, products, founders } from '@/data/mockDb';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  name: string;
  type: 'company' | 'investor' | 'product' | 'founder';
  taglineOrRole: string;
  route: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut for "/" to open, and "Escape" to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search logic computed on render
  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    
    const matchedCompanies: SearchResult[] = companies
      .filter((c) => c.name.toLowerCase().includes(searchTerm) || c.tagline.toLowerCase().includes(searchTerm))
      .slice(0, 4)
      .map((c) => ({
        id: c.id,
        name: c.name,
        type: 'company',
        taglineOrRole: c.tagline,
        route: `/company/${c.id}`
      }));

    const matchedInvestors: SearchResult[] = investors
      .filter((i) => i.name.toLowerCase().includes(searchTerm) || i.bio.toLowerCase().includes(searchTerm))
      .slice(0, 4)
      .map((i) => ({
        id: i.id,
        name: i.name,
        type: 'investor',
        taglineOrRole: i.location,
        route: `/investor/${i.id}`
      }));

    const matchedProducts: SearchResult[] = products
      .filter((p) => p.name.toLowerCase().includes(searchTerm) || p.tagline.toLowerCase().includes(searchTerm))
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        name: p.name,
        type: 'product',
        taglineOrRole: p.tagline,
        route: `/products?search=${encodeURIComponent(p.name)}`
      }));

    const matchedFounders: SearchResult[] = founders
      .filter((f) => f.name.toLowerCase().includes(searchTerm) || f.role.toLowerCase().includes(searchTerm))
      .slice(0, 4)
      .map((f) => {
        const companyId = f.companies[0] || 'openai';
        return {
          id: f.id,
          name: f.name,
          type: 'founder',
          taglineOrRole: f.role,
          route: `/company/${companyId}`
        };
      });

    return [...matchedCompanies, ...matchedInvestors, ...matchedProducts, ...matchedFounders];
  }, [query]);

  // Handle arrows and Enter inside search modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex].route);
      }
    }
  };

  const handleSelect = (route: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(route);
  };

  // Close when clicking outside the dialog
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Global Open Trigger Button (e.g. Header Search Bar Placeholder) */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-3 px-4 py-2 border rounded-full bg-secondary text-muted-foreground text-xs md:text-sm hover:border-muted-foreground transition-all cursor-pointer w-64 justify-between"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span>Search GraphOne...</span>
        </div>
        <kbd className="px-1.5 py-0.5 rounded bg-background border text-[10px] font-semibold text-muted-foreground font-mono">
          /
        </kbd>
      </button>
      
      {/* Mobile Search Icon Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-full hover:bg-secondary text-muted-foreground"
      >
        <Search className="w-5 h-5" />
      </button>

      {mounted && typeof document !== 'undefined' ? createPortal(
        <AnimatePresence>
          {isOpen && (
            <div
              onClick={handleBackdropClick}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 md:p-12 overflow-y-auto"
            >
              <motion.div
                ref={containerRef}
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="bg-card border rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] mt-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Search Box */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b relative">
                  <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search companies, founders, products, investors..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-0 outline-0 ring-0 w-full text-foreground placeholder-muted-foreground text-sm md:text-base focus:outline-hidden"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-2 min-h-[150px]">
                  {results.length > 0 ? (
                    <div className="flex flex-col gap-0.5">
                      {results.map((item, index) => {
                        const isSel = index === selectedIndex;
                        return (
                          <div
                            key={`${item.type}-${item.id}-${index}`}
                            onClick={() => handleSelect(item.route)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={cn(
                              "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors",
                              isSel ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className={cn(
                                "p-1.5 rounded-lg shrink-0",
                                isSel ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                              )}>
                                {item.type === 'company' && <Building2 className="w-4 h-4" />}
                                {item.type === 'investor' && <Sparkles className="w-4 h-4" />}
                                {item.type === 'product' && <UserCheck className="w-4 h-4" />}
                                {item.type === 'founder' && <User className="w-4 h-4" />}
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold truncate leading-normal">{item.name}</p>
                                <p className={cn(
                                  "text-xs truncate leading-normal",
                                  isSel ? "text-white/70" : "text-muted-foreground"
                                )}>{item.taglineOrRole}</p>
                              </div>
                            </div>
                            <span className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize tracking-wider shrink-0",
                              isSel ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                            )}>
                              {item.type}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                      {query.trim() ? (
                        <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-8 h-8 opacity-30" />
                          <p className="text-sm">Type to search the graph...</p>
                          <p className="text-xs opacity-75">Tips: Search for &ldquo;OpenAI&rdquo;, &ldquo;Sequoia&rdquo;, &ldquo;Sam Altman&rdquo; or &ldquo;Cursor&rdquo;</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Panel */}
                <div className="border-t px-4 py-2.5 bg-secondary text-[10px] text-muted-foreground flex items-center justify-between shrink-0 font-medium">
                  <div className="flex items-center gap-2.5">
                    <span><kbd className="border bg-background px-1 rounded">↑↓</kbd> Navigate</span>
                    <span><kbd className="border bg-background px-1 rounded">Enter</kbd> Select</span>
                  </div>
                  <span>ESC to close</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      ) : null}
    </>
  );
}
