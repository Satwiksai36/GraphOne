'use client';

import React, { useState } from 'react';

interface LogoProps {
  id: string;
  name: string;
  className?: string;
}

// Domain mappings for pulling original brand logo files
const companyDomains: Record<string, string> = {
  'openai': 'openai.com',
  'chatgpt': 'openai.com',
  'gpt-4o': 'openai.com',
  'codex': 'openai.com',
  'sora': 'openai.com',
  'operator': 'openai.com',
  'openai-agents': 'openai.com',
  'anthropic': 'anthropic.com',
  'claude-3-5': 'anthropic.com',
  'perplexity': 'perplexity.ai',
  'cursor': 'cursor.com',
  'midjourney': 'midjourney.com',
  'xai': 'x.ai',
  'huggingface': 'huggingface.co',
  'hugging-face': 'huggingface.co',
  'mistral-ai': 'mistral.ai',
  'mistral': 'mistral.ai',
  'google-deepmind': 'deepmind.google',
  'deepmind': 'deepmind.google',
  'gemini-1-5': 'google.com',
  'databricks': 'databricks.com',
  'cohere': 'cohere.com',
  'pika': 'pika.art',
  'cognition': 'cognition.ai',
  'devin': 'cognition.ai',
  'adept': 'adept.ai',
  'glean': 'glean.com',
  'lovable': 'lovable.dev',
  'reka': 'reka.ai',
  'ollama': 'ollama.com',
  'together-ai': 'together.ai',
  'character-ai': 'character.ai',
  'runway': 'runwayml.com',
  'synthesia': 'synthesia.io',
  'elevenlabs': 'elevenlabs.io',
  'deci': 'deci.ai',
  'typeface': 'typeface.ai',
  'granola': 'granola.so',
  'memgpt': 'memgpt.ai',
  'bria-ai': 'bria.ai',
  'characterx': 'characterx.ai',
  'linfty': 'linfty.com',
  'palette': 'palette.fm'
};

const investorDomains: Record<string, string> = {
  'sequoia': 'sequoiacap.com',
  'andreessen': 'a16z.com',
  'a16z': 'a16z.com',
  'lightspeed': 'lsvp.com',
  'accel': 'accel.com',
  'khosla': 'khoslaventures.com',
  'general-catalyst': 'generalcatalyst.com',
  'y-combinator': 'ycombinator.com',
  'yc': 'ycombinator.com',
  'microsoft': 'microsoft.com',
  'msft': 'microsoft.com',
  'thrive': 'thrivecapital.com',
  'tc': 'thrivecapital.com',
  'founders': 'foundersfund.com',
  'ff': 'foundersfund.com',
  'gv': 'gv.com',
  'google-ventures': 'gv.com',
  'spark': 'sparkcapital.com',
  'sc': 'sparkcapital.com',
  'menlo': 'menloventures.com',
  'mv': 'menloventures.com',
  'nea': 'nea.com',
  'ivp': 'ivp.com',
  'theory': 'theory.vc',
  'conviction': 'conviction.com',
  'radical': 'radical.vc',
  'nfdg': 'nfdg.vc',
  'south-park': 'southparkcommons.com',
  'spc': 'southparkcommons.com'
};

export function CompanyLogo({ id, name, className = 'w-10 h-10' }: LogoProps) {
  const normId = id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const [loadState, setLoadState] = useState<'hunter' | 'google' | 'fallback'>('hunter');

  // Try to find domain mapping
  const matchedKey = Object.keys(companyDomains).find(key => normId.includes(key));
  const domain = matchedKey ? companyDomains[matchedKey] : null;

  if (domain) {
    if (loadState === 'hunter') {
      return (
        <div className={`rounded-xl bg-white border flex items-center justify-center p-1.5 overflow-hidden shrink-0 select-none ${className}`}>
          <img 
            src={`https://logos.hunter.io/${domain}`} 
            alt={name} 
            onError={() => setLoadState('google')}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      );
    }
    if (loadState === 'google') {
      return (
        <div className={`rounded-xl bg-white border flex items-center justify-center p-1.5 overflow-hidden shrink-0 select-none ${className}`}>
          <img 
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} 
            alt={name} 
            onError={() => setLoadState('fallback')}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      );
    }
  }

  // Fallback 1: Custom SVGs
  if (normId.includes('openai') || normId.includes('chatgpt')) {
    return (
      <div className={`rounded-xl bg-[#10a37f] flex items-center justify-center text-white p-1.5 shrink-0 ${className}`}>
        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
          <path d="M22.28 14.28a5.19 5.19 0 0 0-.29-5.19 5.12 5.12 0 0 0-4.78-2.73 5.07 5.07 0 0 0-1.12.12 5.19 5.19 0 0 0-4.39-2.31 5.12 5.12 0 0 0-4.9 3.59 5.09 5.09 0 0 0-.91-.32 5.19 5.19 0 0 0-5.19 2.29 5.12 5.12 0 0 0-.13 5.56 5.09 5.09 0 0 0 1.13 1.58 5.19 5.19 0 0 0 4.39 2.31 5.12 5.12 0 0 0 4.9-3.59c.29.13.6.24.91.32a5.19 5.19 0 0 0 5.19-2.29 5.12 5.12 0 0 0 .13-5.56 5.09 5.09 0 0 0-1.13-1.58zm-11-8.52a3.63 3.63 0 0 1 3.12 1.77 3.59 3.59 0 0 1 .42 3.52 3.64 3.64 0 0 1-3.23 2.19 3.62 3.62 0 0 1-.31 0 3.63 3.63 0 0 1-3.12-1.77 3.59 3.59 0 0 1-.42-3.52 3.64 3.64 0 0 1 3.54-2.19zm-5.46 3.1a3.63 3.63 0 0 1 1.77 3.12 3.59 3.59 0 0 1-3.52.42 3.64 3.64 0 0 1-2.19-3.23 3.62 3.62 0 0 1 0-.31 3.63 3.63 0 0 1 1.77-3.12 3.59 3.59 0 0 1 3.52-.42 3.64 3.64 0 0 1 2.19 3.23zm0 6.27a3.63 3.63 0 0 1-1.77-3.12 3.59 3.59 0 0 1 3.52-.42 3.64 3.64 0 0 1 2.19 3.23c0 .1 0 .21 0 .31a3.63 3.63 0 0 1-1.77 3.12 3.59 3.59 0 0 1-3.52.42 3.64 3.64 0 0 1-2.19-3.23zm5.46 3.1a3.63 3.63 0 0 1-3.12-1.77 3.59 3.59 0 0 1-.42-3.52 3.64 3.64 0 0 1 3.23-2.19c.1 0 .21 0 .31 0a3.63 3.63 0 0 1 3.12 1.77 3.59 3.59 0 0 1 .42 3.52 3.64 3.64 0 0 1-3.54 2.19zm5.46-3.1a3.63 3.63 0 0 1-1.77-3.12 3.59 3.59 0 0 1 3.52-.42 3.64 3.64 0 0 1 2.19 3.23 3.62 3.62 0 0 1 0 .31 3.63 3.63 0 0 1-1.77 3.12 3.59 3.59 0 0 1-3.52.42 3.64 3.64 0 0 1-2.19-3.23zm0-6.27a3.63 3.63 0 0 1 1.77 3.12 3.59 3.59 0 0 1-3.52.42 3.64 3.64 0 0 1-2.19-3.23c0-.1 0-.21 0-.31a3.63 3.63 0 0 1 1.77-3.12 3.59 3.59 0 0 1 3.52-.42 3.64 3.64 0 0 1 2.19 3.23z"/>
        </svg>
      </div>
    );
  }

  if (normId.includes('anthropic')) {
    return (
      <div className={`rounded-xl bg-[#191919] flex items-center justify-center text-[#cc9f7a] font-extrabold border border-[#cc9f7a]/25 shrink-0 ${className}`}>
        <svg className="w-6 h-6 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
          <path d="M4 20L12 4L20 20M6 16H18" />
        </svg>
      </div>
    );
  }

  if (normId.includes('perplexity')) {
    return (
      <div className={`rounded-xl bg-[#002f2b] flex items-center justify-center text-[#20e8d5] p-1.5 shrink-0 border border-[#20e8d5]/20 ${className}`}>
        <svg className="w-full h-full fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      </div>
    );
  }

  if (normId.includes('xai') || normId === 'x-ai') {
    return (
      <div className={`rounded-xl bg-black flex items-center justify-center text-white font-black p-1 shrink-0 ${className}`}>
        <span className="text-xs font-black tracking-tighter">xAI</span>
      </div>
    );
  }

  if (normId.includes('midjourney')) {
    return (
      <div className={`rounded-xl bg-[#080710] flex items-center justify-center text-white p-1.5 shrink-0 border border-white/10 ${className}`}>
        <svg className="w-full h-full fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 0-10 10c0 5.5 4.5 10 10 10s10-4.5 10-10A10 10 0 0 0 12 2zm1 14.5c-2 0-3.5-.8-4.5-2 .5-1.5 2-2 3.5-2s3 .5 3.5 2c-1 1.2-2.5 2-2.5 2z" />
          <path d="M12 4l-4 7h8l-4-7z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // Fallback 2: Initials text box
  return (
    <div className={`rounded-xl bg-secondary border flex items-center justify-center font-black text-sm text-muted-foreground select-none shrink-0 ${className}`}>
      {name[0]}
    </div>
  );
}

export function InvestorLogo({ id, name, className = 'w-10 h-10' }: LogoProps) {
  const normId = id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const [loadState, setLoadState] = useState<'hunter' | 'google' | 'fallback'>('hunter');

  // Try to find domain mapping
  const matchedKey = Object.keys(investorDomains).find(key => normId.includes(key));
  const domain = matchedKey ? investorDomains[matchedKey] : null;

  if (domain) {
    if (loadState === 'hunter') {
      return (
        <div className={`rounded-xl bg-white border flex items-center justify-center p-1.5 overflow-hidden shrink-0 select-none ${className}`}>
          <img 
            src={`https://logos.hunter.io/${domain}`} 
            alt={name} 
            onError={() => setLoadState('google')}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      );
    }
    if (loadState === 'google') {
      return (
        <div className={`rounded-xl bg-white border flex items-center justify-center p-1.5 overflow-hidden shrink-0 select-none ${className}`}>
          <img 
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} 
            alt={name} 
            onError={() => setLoadState('fallback')}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      );
    }
  }

  // Fallback 1: Custom SVGs
  if (normId.includes('sequoia')) {
    return (
      <div className={`rounded-xl bg-[#004d3d] flex items-center justify-center text-white p-1.5 shrink-0 ${className}`}>
        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
          <path d="M12 2L8 8h3v4H7l5 7h-4l6 5 6-5h-4l5-7h-4v-4h3L12 2z" />
        </svg>
      </div>
    );
  }

  if (normId.includes('andreessen') || normId.includes('a16z')) {
    return (
      <div className={`rounded-xl bg-[#ff4600] flex items-center justify-center text-white font-extrabold shrink-0 ${className}`}>
        <span className="text-[11px] font-black tracking-tighter">a16z</span>
      </div>
    );
  }

  if (normId.includes('y-combinator') || normId === 'yc') {
    return (
      <div className={`rounded-xl bg-[#ff6600] flex items-center justify-center text-white font-extrabold shrink-0 ${className}`}>
        <span className="text-sm font-black font-mono">Y</span>
      </div>
    );
  }

  if (normId.includes('microsoft') || normId === 'msft') {
    return (
      <div className={`rounded-xl bg-white border flex items-center justify-center p-1.5 shrink-0 ${className}`}>
        <div className="grid grid-cols-2 gap-0.5 w-full h-full">
          <div className="bg-[#f25022]" />
          <div className="bg-[#7fba00]" />
          <div className="bg-[#00a4ef]" />
          <div className="bg-[#ffb900]" />
        </div>
      </div>
    );
  }

  // Fallback 2: Initials text box
  return (
    <div className={`rounded-xl bg-secondary border flex items-center justify-center font-black text-sm text-muted-foreground select-none shrink-0 ${className}`}>
      {name[0]}
    </div>
  );
}
