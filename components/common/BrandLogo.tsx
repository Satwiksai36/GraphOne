'use client';

import React, { useState } from 'react';

interface LogoProps {
  id: string;
  name: string;
  domain?: string;
  className?: string;
}

// Local logo image assets copied from reference folder
const localLogos: Record<string, string> = {
  'agentx': '/logos/agentx -logo.png',
  'autocoder': '/logos/autocoder-logo.png',
  'chatmatrix': '/logos/chatmatrix-logo.png',
  'cloudbrain': '/logos/cloudbrain-logo.png',
  'cybercorp': '/logos/cyber-corp-logo.png',
  'deepflow': '/logos/deep flow-logo.png',
  'matrixcompute': '/logos/matrix-logo.png',
  'matrix': '/logos/matrix-logo.png',
  'perplexity': '/logos/perplexity-logo.png',
  'shieldai': '/logos/shieldai-logo.png',
  'synapse': '/logos/synaspe-logo.png'
};

// Comprehensive domain mappings for all real AI companies
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
  'palette': 'palette.fm',
  'groq': 'groq.com',
  'scale-ai': 'scale.com',
  'scale': 'scale.com',
  'pinecone': 'pinecone.io',
  'weights-biases': 'wandb.ai',
  'wandb': 'wandb.ai',
  'phind': 'phind.com',
  'harvey': 'harvey.ai',
  'luma-ai': 'lumalabs.ai',
  'luma': 'lumalabs.ai',
  'clarity': 'clarity.ai',
  'rockset': 'rockset.com',
  'global-illumination': 'globalillumination.com',
  'safe-superintelligence': 'ssi.inc',
  'ssi': 'ssi.inc',
  'world-labs': 'worldlabs.ai',
  'worldlabs': 'worldlabs.ai',
  'unity': 'unity.com'
};

const investorDomains: Record<string, string> = {
  'sequoia': 'sequoiacap.com',
  'sequoia-capital': 'sequoiacap.com',
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

// Generates a beautiful procedurally-designed SVG corporate logo using determinism
function AbstractLogo({ name, className = 'w-full h-full' }: { name: string; className?: string }) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const absHash = Math.abs(hash);
  const hue1 = absHash % 360;
  const hue2 = (absHash + 120) % 360;
  const shapeType = absHash % 4; // 4 different aesthetic shape styles
  
  const color1 = `hsl(${hue1}, 80%, 60%)`;
  const color2 = `hsl(${hue2}, 75%, 55%)`;
  const color3 = `hsl(${(hue1 + 240) % 360}, 90%, 65%)`;

  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`bg-grad-${absHash}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color1} stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={`shape-grad-${absHash}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      
      <rect x="4" y="4" width="92" height="92" rx="20" ry="20" fill={`url(#bg-grad-${absHash})`} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />

      {shapeType === 0 && (
        // Overlapping geometric orbits
        <>
          <circle cx="40" cy="50" r="20" fill={`url(#shape-grad-${absHash})`} fillOpacity="0.8" />
          <circle cx="60" cy="50" r="20" fill={color3} fillOpacity="0.65" />
          <circle cx="50" cy="50" r="10" stroke="#fff" strokeWidth="2.5" />
        </>
      )}
      {shapeType === 1 && (
        // Abstract nodes/neural connections
        <>
          <line x1="25" y1="25" x2="50" y2="75" stroke={`url(#shape-grad-${absHash})`} strokeWidth="5" strokeLinecap="round" />
          <line x1="75" y1="25" x2="50" y2="75" stroke={`url(#shape-grad-${absHash})`} strokeWidth="5" strokeLinecap="round" />
          <line x1="25" y1="25" x2="75" y2="25" stroke={color3} strokeWidth="4" strokeLinecap="round" />
          <circle cx="25" cy="25" r="10" fill={color1} />
          <circle cx="75" cy="25" r="10" fill={color2} />
          <circle cx="50" cy="75" r="12" fill={color3} />
        </>
      )}
      {shapeType === 2 && (
        // Diamond prism shape
        <>
          <path d="M50 15L82 50L50 85L18 50Z" fill={`url(#shape-grad-${absHash})`} fillOpacity="0.85" />
          <path d="M50 15L50 85" stroke="#fff" strokeWidth="2" strokeOpacity="0.5" />
          <path d="M18 50L82 50" stroke="#fff" strokeWidth="2" strokeOpacity="0.5" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="#fff" strokeWidth="3" />
        </>
      )}
      {shapeType === 3 && (
        // Intersecting futuristic curves
        <>
          <path d="M25 35 C 50 65, 50 65, 75 35" stroke={`url(#shape-grad-${absHash})`} strokeWidth="9" strokeLinecap="round" />
          <path d="M25 65 C 50 35, 50 35, 75 65" stroke={color3} strokeWidth="7" strokeLinecap="round" />
          <circle cx="50" cy="50" r="8" fill="#fff" />
        </>
      )}
    </svg>
  );
}

// Safelist classes to ensure Tailwind compiles the dynamically generated scaled sizing utilities:
// w-5 h-5 w-6 h-6 w-8 h-8 w-9 h-9 w-10 h-10 w-11 h-11 w-12 h-12 w-14 h-14 w-16 h-16 w-20 h-20 w-28 h-28 w-32 h-32

// Helper to scale logo sizing classes by approximately 20-30%
function scaleClassName(className: string): string {
  if (!className) return className;
  return className.split(/\s+/).map(cls => {
    const match = cls.match(/^(w|h)-(\d+(\.\d+)?)$/);
    if (match) {
      const [, side, sizeStr] = match;
      const size = parseFloat(sizeStr);
      let newSize = size;
      if (size === 4) newSize = 5;
      else if (size === 6) newSize = 8;
      else if (size === 7) newSize = 9;
      else if (size === 8) newSize = 10;
      else if (size === 9) newSize = 11;
      else if (size === 10) newSize = 12;
      else if (size === 11) newSize = 14;
      else if (size === 12) newSize = 14;
      else if (size === 14) newSize = 16;
      else if (size === 24) newSize = 28;
      else {
        newSize = Math.ceil(size * 1.25);
      }
      return `${side}-${newSize}`;
    }
    return cls;
  }).join(' ');
}

export function CompanyLogo({ id, name, domain: passedDomain, className = 'w-10 h-10' }: LogoProps) {
  className = scaleClassName(className);
  const normId = id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const [loadState, setLoadState] = useState<'hunter' | 'google' | 'fallback'>('hunter');

  // 1. Check if we have a local public logo asset
  if (localLogos[normId]) {
    return (
      <div className={`rounded-xl bg-white border flex items-center justify-center overflow-hidden shrink-0 select-none ${className}`}>
        <img 
          src={localLogos[normId]} 
          alt={name} 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // 2. Verify if it is a real-world company with an actual mapped logo domain
  const matchedKey = Object.keys(companyDomains).find(key => normId.includes(key));
  const domain = matchedKey ? companyDomains[matchedKey] : null;

  if (domain && loadState !== 'fallback') {
    if (loadState === 'hunter') {
      return (
        <div className={`rounded-xl bg-white border flex items-center justify-center overflow-hidden shrink-0 select-none ${className}`}>
          <img 
            src={`https://logos.hunter.io/${domain}`} 
            alt={name} 
            onError={() => setLoadState('google')}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }
    if (loadState === 'google') {
      return (
        <div className={`rounded-xl bg-white border flex items-center justify-center overflow-hidden shrink-0 select-none ${className}`}>
          <img 
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} 
            alt={name} 
            onError={() => setLoadState('fallback')}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }
  }

  // Fallback 1: Premium custom vector SVGs for core companies
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
      <div className={`rounded-xl bg-[#191919] flex items-center justify-center text-[#cc9f7a] font-extrabold border border-[#cc9f7a]/25 shrink-0 p-1.5 ${className}`}>
        <svg className="w-[60%] h-[60%] stroke-current fill-none stroke-2.5" viewBox="0 0 24 24">
          <path d="M4 20L12 4L20 20M6 16H18" />
        </svg>
      </div>
    );
  }

  if (normId.includes('perplexity')) {
    return (
      <div className={`rounded-xl bg-[#002f2b] flex items-center justify-center text-[#20e8d5] p-1.5 shrink-0 border border-[#20e8d5]/20 ${className}`}>
        <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 24 24">
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
        <svg className="w-full h-full fill-none stroke-current stroke-1.5" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 0-10 10c0 5.5 4.5 10 10 10s10-4.5 10-10A10 10 0 0 0 12 2zm1 14.5c-2 0-3.5-.8-4.5-2 .5-1.5 2-2 3.5-2s3 .5 3.5 2c-1 1.2-2.5 2-2.5 2z" />
          <path d="M12 4l-4 7h8l-4-7z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // Fallback 2: Premium dynamic abstract vector logo instead of letter initials
  return (
    <div className={`rounded-xl bg-secondary/40 border flex items-center justify-center p-1.5 shrink-0 ${className}`}>
      <AbstractLogo name={name} />
    </div>
  );
}

export function InvestorLogo({ id, name, domain: passedDomain, className = 'w-10 h-10' }: LogoProps) {
  className = scaleClassName(className);
  const normId = id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const [loadState, setLoadState] = useState<'hunter' | 'google' | 'fallback'>('hunter');

  // Verify if it is a real-world VC with an actual mapped logo domain
  const matchedKey = Object.keys(investorDomains).find(key => normId.includes(key));
  const domain = matchedKey ? investorDomains[matchedKey] : null;

  if (domain && loadState !== 'fallback') {
    if (loadState === 'hunter') {
      return (
        <div className={`rounded-xl bg-white border flex items-center justify-center overflow-hidden shrink-0 select-none ${className}`}>
          <img 
            src={`https://logos.hunter.io/${domain}`} 
            alt={name} 
            onError={() => setLoadState('google')}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }
    if (loadState === 'google') {
      return (
        <div className={`rounded-xl bg-white border flex items-center justify-center overflow-hidden shrink-0 select-none ${className}`}>
          <img 
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} 
            alt={name} 
            onError={() => setLoadState('fallback')}
            className="w-full h-full object-contain"
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

  if (normId.includes('lightspeed')) {
    return (
      <div className={`rounded-xl bg-[#ff3b30] flex items-center justify-center text-white font-extrabold shrink-0 ${className}`}>
        <svg className="w-full h-full p-1.5 fill-current" viewBox="0 0 24 24">
          <path d="M8 2l8 6-5 2 7 8-12 4 3-8-5-2z" />
        </svg>
      </div>
    );
  }

  if (normId.includes('accel')) {
    return (
      <div className={`rounded-xl bg-[#df1921] flex items-center justify-center text-white font-black shrink-0 ${className}`}>
        <span className="text-[11px] font-black tracking-tighter uppercase">Accel</span>
      </div>
    );
  }

  if (normId.includes('general-catalyst') || normId.includes('general catalyst')) {
    return (
      <div className={`rounded-xl bg-[#4b2f89] flex items-center justify-center text-white font-black shrink-0 ${className}`}>
        <span className="text-xs font-black">G</span>
      </div>
    );
  }

  if (normId.includes('khosla')) {
    return (
      <div className={`rounded-xl bg-[#111111] flex items-center justify-center text-white font-black shrink-0 ${className}`}>
        <span className="text-[9px] font-black tracking-tight text-[#8cc63f]">KHOSLA</span>
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

  // Fallback 2: Premium dynamic abstract vector logo instead of letter initials
  return (
    <div className={`rounded-xl bg-secondary/40 border flex items-center justify-center p-1.5 shrink-0 ${className}`}>
      <AbstractLogo name={name} />
    </div>
  );
}
