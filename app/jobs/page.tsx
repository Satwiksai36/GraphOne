'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Briefcase, MapPin, Users, Building, ArrowUpRight, CheckCircle } from 'lucide-react';
import { companies } from '@/data/mockDb';
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
  }, []);

  // Filter options
  const departments = useMemo(() => {
    const depts = new Set<string>();
    allJobs.forEach(j => depts.add(j.department));
    return ['All', ...Array.from(depts)];
  }, [allJobs]);

  const locations = useMemo(() => {
    const locs = new Set<string>();
    allJobs.forEach(j => {
      // Split location to city for cleaner filtering
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

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Overview Hero Title */}
      <section className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest leading-none select-none">
          <Briefcase className="w-3.5 h-3.5" /> Career Opportunities
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-none">
          AI Talent Graph
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Discover open technical, research, and product roles at leading foundation labs and fast-growing AI startups.
        </p>
      </section>

      {/* Aggregate Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border bg-card shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Open Postings</p>
            <h3 className="text-2xl font-black text-foreground mt-2 leading-none">{stats.totalJobs} jobs</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl border bg-card shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-black">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Hiring Organizations</p>
            <h3 className="text-2xl font-black text-foreground mt-2 leading-none">{stats.companiesHiring} companies</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl border bg-card shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Top Hiring Hub</p>
            <h3 className="text-2xl font-black text-foreground mt-2 leading-none">{stats.hiringHub}</h3>
          </div>
        </div>
      </section>

      {/* Search and Filters Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b pb-6">
        {/* Search */}
        <div className="relative col-span-1 md:col-span-6 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search roles or hiring startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs border rounded-xl bg-background text-foreground placeholder-muted-foreground outline-0 focus:border-primary transition-colors"
          />
        </div>

        {/* Department Filter */}
        <div className="col-span-1 md:col-span-3 w-full">
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              toast(`Department filter: ${e.target.value}`, 'info');
            }}
            className="w-full px-3 py-2 text-xs border rounded-xl bg-card text-foreground outline-0 focus:border-primary transition-colors"
          >
            <option value="All">All Departments</option>
            {departments.filter(d => d !== 'All').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="col-span-1 md:col-span-3 w-full">
          <select
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              toast(`Location filter: ${e.target.value}`, 'info');
            }}
            className="w-full px-3 py-2 text-xs border rounded-xl bg-card text-foreground outline-0 focus:border-primary transition-colors"
          >
            <option value="All">All Locations</option>
            {locations.filter(l => l !== 'All').map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Jobs Feed List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
          <span className="font-bold uppercase tracking-wider">{filteredJobs.length} Careers Found</span>
          <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Active Postings Only</span>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="p-5 rounded-2xl border bg-card hover:bg-secondary/15 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <CompanyLogo 
                    id={job.companyId} 
                    name={job.companyName} 
                    domain={extractDomain(job.website)} 
                    className="w-11 h-11 shrink-0" 
                  />
                  <div className="min-w-0 space-y-1.5">
                    <h4 className="text-sm font-black text-foreground leading-none">
                      {job.title}
                    </h4>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <Link 
                        href={`/company/${job.companyId}`}
                        className="font-bold text-foreground hover:text-primary transition-colors"
                      >
                        {job.companyName}
                      </Link>
                      <span>&middot;</span>
                      <span className="flex items-center gap-1 leading-none">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <Link 
                    href={`/company/${job.companyId}`}
                    className="px-4 py-2 border rounded-xl bg-card hover:bg-secondary text-xs font-bold text-foreground transition-colors select-none"
                  >
                    View Startup
                  </Link>
                  <button 
                    onClick={() => toast(`Opening apply flow for ${job.title} at ${job.companyName}...`, 'success')}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-0.5 select-none cursor-pointer"
                  >
                    Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground border border-dashed rounded-2xl bg-card">
            No careers found matching the filters.
          </div>
        )}
      </section>

    </div>
  );
}
