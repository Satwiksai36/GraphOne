'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, Briefcase, MapPin, Users, Building, ArrowUpRight, CheckCircle, Flame, Sparkles, Terminal, Code, Cpu, ShieldAlert, BadgeInfo } from 'lucide-react';
// Import API client
import { api } from '@/lib/api';
import { Company } from '@/types';
import { CompanyLogo } from '@/components/common/BrandLogo';
import { useToast } from '@/components/ui/Toast';

const extractDomain = (url?: string) => {
  if (!url) return undefined;
  try {
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.split('/')[0];
  } catch (e) {
    return undefined;
  }
};

export default function JobsDiscoveryPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Dynamic API states
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobsData() {
      try {
        setLoading(true);
        const compRes = await api.companies.list({ limit: 100 });
        setCompanies(compRes.data.items);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to fetch jobs listings.');
      } finally {
        setLoading(false);
      }
    }
    loadJobsData();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search');
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  // Retrieve all jobs across all companies dynamically
  const allJobs = useMemo(() => {
    const list: Array<{
      id: string;
      companyId: string;
      companyName: string;
      website?: string;
      title: string;
      department: string;
      location: string;
      type: string;
    }> = [];

    companies.forEach((co) => {
      if (co.openJobs && Array.isArray(co.openJobs)) {
        co.openJobs.forEach((job, idx) => {
          list.push({
            id: `${co.id}-job-${idx}`,
            companyId: co.id,
            companyName: co.name,
            website: co.website,
            title: job.title,
            department: job.department,
            location: job.location,
            type: job.type || 'Full-time'
          });
        });
      }
    });

    return list;
  }, [companies]);

  // Filter options
  const departments = useMemo(() => {
    const depts = new Set<string>();
    allJobs.forEach(j => depts.add(j.department));
    return ['All', ...Array.from(depts)];
  }, [allJobs]);

  const locations = useMemo(() => {
    const locs = new Set<string>();
    allJobs.forEach(j => {
      const city = j.location.split(',')[0].trim();
      locs.add(city);
    });
    return ['All', ...Array.from(locs)];
  }, [allJobs]);

  // Aggregate Stats
  const stats = useMemo(() => {
    const hiringCompanies = new Set<string>();
    allJobs.forEach(j => hiringCompanies.add(j.companyId));
    return {
      totalJobs: allJobs.length,
      companiesHiring: hiringCompanies.size,
      hiringHub: 'San Francisco, CA'
    };
  }, [allJobs]);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = 
        selectedDept === 'All' || 
        job.department === selectedDept;

      const matchesLoc = 
        selectedLocation === 'All' || 
        job.location.startsWith(selectedLocation);

      return matchesSearch && matchesDept && matchesLoc;
    });
  }, [allJobs, searchQuery, selectedDept, selectedLocation]);

  const handleApply = (jobTitle: string, companyName: string, website?: string) => {
    toast(`Redirecting to application portal for ${jobTitle} at ${companyName}...`, 'success');
    setTimeout(() => {
      const careersUrl = website 
        ? (website.startsWith('http') ? website : `https://${website}`) 
        : `https://google.com/search?q=${encodeURIComponent(jobTitle + " " + companyName + " careers")}`;
      window.open(careersUrl, '_blank');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm font-bold text-muted-foreground animate-pulse">Loading jobs portal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-2xl font-black">!</div>
        <div className="space-y-2">
          <h3 className="text-lg font-black text-foreground">Data Load Error</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <button onClick={() => window.location.reload()} className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/95 cursor-pointer transition-all">
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-6 pt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Overview Hero Title */}
      <section className="relative overflow-hidden py-12 px-6 rounded-3xl border bg-card shadow-xs text-center max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider leading-none select-none">
          <Briefcase className="w-3.5 h-3.5 stroke-[2.5]" /> Career Opportunities
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-foreground tracking-tight leading-none mt-4">
          AI Talent Graph
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-3">
          Discover open technical, research, and product roles at leading foundation labs and fast-growing AI startups.
        </p>
      </section>

      {/* Aggregate Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Postings', value: `${stats.totalJobs} jobs`, icon: Users, color: 'text-primary bg-primary/10', desc: 'Sourced across top AI platforms' },
          { label: 'Hiring Organizations', value: `${stats.companiesHiring} firms`, icon: Building, color: 'text-purple-500 bg-purple-500/10', desc: 'Firms with active headcounts' },
          { label: 'Top Hiring Hub', value: stats.hiringHub, icon: MapPin, color: 'text-emerald-500 bg-emerald-500/10', desc: 'Highest developer demand density' }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl border bg-card shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 relative overflow-hidden group">
              <div className="space-y-1.5">
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none block">{item.label}</span>
                <h3 className="text-3xl font-black text-foreground leading-none">{item.value}</h3>
                <p className="text-[10px] text-muted-foreground font-medium">{item.desc}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 stroke-2" />
              </div>
            </div>
          );
        })}
      </section>

      {/* Search and Filters */}
      <section className="space-y-4 border-b pb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full p-1 shadow-sm flex items-center">
            <Search className="w-4 h-4 text-muted-foreground shrink-0 ml-3" />
            <input
              type="text"
              placeholder="Search by job title or company name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 pl-2.5 pr-4 py-2 text-xs text-foreground bg-transparent placeholder-muted-foreground outline-none w-full"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs w-full md:w-auto shrink-0">
            {/* Department Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground font-bold leading-none">Dept:</span>
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-card text-foreground border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-semibold outline-none cursor-pointer"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground font-bold leading-none">Location:</span>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-card text-foreground border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-semibold outline-none cursor-pointer"
              >
                {locations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Feed List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
          <span className="font-bold uppercase tracking-wider">{filteredJobs.length} Jobs listed</span>
          <span className="flex items-center gap-1.5 font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            Verified Opportunities
          </span>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => {
              const company = companies.find(c => c.id === job.companyId);
              
              // Custom Department Icon / Styling
              const isTechRole = job.department.toLowerCase().includes('eng') || job.department.toLowerCase().includes('research') || job.department.toLowerCase().includes('tech');
              const isProductRole = job.department.toLowerCase().includes('product') || job.department.toLowerCase().includes('design');
              
              const DeptIcon = isTechRole ? Code : (isProductRole ? Terminal : Briefcase);
              const deptBg = isTechRole ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : (isProductRole ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 'bg-purple-500/10 text-purple-600 border border-purple-500/20');

              return (
                <div 
                  key={job.id}
                  className="p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-850 bg-white dark:bg-zinc-900 shadow-2xs hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between gap-5 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <CompanyLogo 
                      id={job.companyId} 
                      name={job.companyName} 
                      domain={extractDomain(company?.website)} 
                      className="w-13 h-13 shrink-0 rounded-2xl" 
                    />
                    
                    <div className="min-w-0 space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link 
                          href={`/company/${job.companyId}`}
                          className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors truncate"
                        >
                          {job.companyName}
                        </Link>
                        <span className={`text-[8.5px] font-black px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 ${deptBg}`}>
                          <DeptIcon className="w-3 h-3" /> {job.department}
                        </span>
                      </div>
                      
                      <h4 className="text-base font-black text-zinc-900 dark:text-zinc-100 leading-tight tracking-tight pt-0.5">
                        {job.title}
                      </h4>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-muted-foreground pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 opacity-80" />
                          {job.location}
                        </span>
                        <span className="text-zinc-300 font-normal">|</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4 mt-auto">
                    <Link 
                      href={`/company/${job.companyId}`}
                      className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary select-none hover:underline"
                    >
                      FIRM PROFILE <ArrowUpRight className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => handleApply(job.title, job.companyName, company?.website)}
                      className="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-xs cursor-pointer select-none"
                    >
                      APPLY NOW
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground border border-dashed rounded-2xl bg-card">
            No active jobs found matching the criteria.
          </div>
        )}
      </section>

    </div>
  );
}
