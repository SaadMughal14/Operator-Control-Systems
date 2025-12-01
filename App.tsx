
import React, { useEffect, useState } from 'react';
import { NetworkGraph } from './components/NetworkGraph';
import { GlassButton } from './components/ui/GlassButton';
import { SmartInquiry } from './components/SmartInquiry';
import { Modal } from './components/ui/Modal';

// --- BRAND LOGO COMPONENT ---
const BrandLogo = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-all duration-500">
    <defs>
      {/* DARK MODE GOLD (Luminous Champagne) */}
      <linearGradient id="gold-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4c5a8" stopOpacity="1" />
        <stop offset="50%" stopColor="#c9b896" stopOpacity="1" />
        <stop offset="100%" stopColor="#b8a684" stopOpacity="1" />
      </linearGradient>
      
      <linearGradient id="goldSubtle-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4c5a8" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#b8a684" stopOpacity="0.4" />
      </linearGradient>

      {/* LIGHT MODE GOLD (Rich Bronze/Dark Gold for Contrast) */}
      <linearGradient id="gold-light" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8C7348" stopOpacity="1" />
        <stop offset="50%" stopColor="#6F5935" stopOpacity="1" />
        <stop offset="100%" stopColor="#544327" stopOpacity="1" />
      </linearGradient>
      
      <linearGradient id="goldSubtle-light" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8C7348" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#6F5935" stopOpacity="0.4" />
      </linearGradient>
      
      <filter id="premiumGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="strongGlow">
        <feGaussianBlur stdDeviation="7" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g transform="translate(200, 200)">
      
      {/* ROTATING OUTER ELEMENTS */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 0 0"
          to="360 0 0"
          dur="12s"
          repeatCount="indefinite"/>
        
        {/* Outer subtle ring for depth */}
        <circle cx="0" cy="0" r="75" fill="none" stroke={isDarkMode ? "#d4c5a8" : "#8C7348"} strokeWidth="0.5" opacity="0.15"/>
        
        {/* Four main arc segments */}
        <path d="M 0,-65 A 65,65 0 0,1 45.96,-45.96" 
              fill="none" 
              stroke={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} 
              strokeWidth="10" 
              strokeLinecap="round"
              filter={isDarkMode ? "url(#premiumGlow)" : ""}
        />
        
        <path d="M 45.96,45.96 A 65,65 0 0,1 0,65" 
              fill="none" 
              stroke={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} 
              strokeWidth="10" 
              strokeLinecap="round"
              filter={isDarkMode ? "url(#premiumGlow)" : ""}
        />
        
        <path d="M 0,65 A 65,65 0 0,1 -45.96,45.96" 
              fill="none" 
              stroke={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} 
              strokeWidth="10" 
              strokeLinecap="round"
              filter={isDarkMode ? "url(#premiumGlow)" : ""}
        />
        
        <path d="M -45.96,-45.96 A 65,65 0 0,1 0,-65" 
              fill="none" 
              stroke={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} 
              strokeWidth="10" 
              strokeLinecap="round"
              filter={isDarkMode ? "url(#premiumGlow)" : ""}
        />
        
        {/* Inner accent arcs */}
        <path d="M 0,-55 A 55,55 0 0,1 38.89,-38.89" 
              fill="none" 
              stroke={`url(#${isDarkMode ? 'goldSubtle-dark' : 'goldSubtle-light'})`} 
              strokeWidth="1.5" 
              strokeLinecap="round"/>
        
        <path d="M 38.89,38.89 A 55,55 0 0,1 0,55" 
              fill="none" 
              stroke={`url(#${isDarkMode ? 'goldSubtle-dark' : 'goldSubtle-light'})`} 
              strokeWidth="1.5" 
              strokeLinecap="round"/>
        
        <path d="M 0,55 A 55,55 0 0,1 -38.89,38.89" 
              fill="none" 
              stroke={`url(#${isDarkMode ? 'goldSubtle-dark' : 'goldSubtle-light'})`} 
              strokeWidth="1.5" 
              strokeLinecap="round"/>
        
        <path d="M -38.89,-38.89 A 55,55 0 0,1 0,-55" 
              fill="none" 
              stroke={`url(#${isDarkMode ? 'goldSubtle-dark' : 'goldSubtle-light'})`} 
              strokeWidth="1.5" 
              strokeLinecap="round"/>
        
        {/* Refined connecting elements at gaps */}
        <g opacity="0.9">
          <rect x="-2.5" y="-72" width="5" height="10" fill={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} rx="1" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
          <line x1="-8" y1="-68" x2="8" y2="-68" stroke={isDarkMode ? "#d4c5a8" : "#8C7348"} strokeWidth="1" opacity="0.5"/>
          
          <rect x="41" y="-51" width="10" height="5" fill={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} rx="1" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
          <line x1="47" y1="-55" x2="47" y2="-41" stroke={isDarkMode ? "#d4c5a8" : "#8C7348"} strokeWidth="1" opacity="0.5"/>
          
          <rect x="41" y="46" width="10" height="5" fill={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} rx="1" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
          <line x1="47" y1="41" x2="47" y2="55" stroke={isDarkMode ? "#d4c5a8" : "#8C7348"} strokeWidth="1" opacity="0.5"/>
          
          <rect x="-2.5" y="62" width="5" height="10" fill={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} rx="1" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
          <line x1="-8" y1="68" x2="8" y2="68" stroke={isDarkMode ? "#d4c5a8" : "#8C7348"} strokeWidth="1" opacity="0.5"/>
          
          <rect x="-51" y="46" width="10" height="5" fill={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} rx="1" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
          <line x1="-47" y1="41" x2="-47" y2="55" stroke={isDarkMode ? "#d4c5a8" : "#8C7348"} strokeWidth="1" opacity="0.5"/>
          
          <rect x="-51" y="-51" width="10" height="5" fill={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} rx="1" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
          <line x1="-47" y1="-55" x2="-47" y2="-41" stroke={isDarkMode ? "#d4c5a8" : "#8C7348"} strokeWidth="1" opacity="0.5"/>
        </g>
        
        {/* Subtle outer frame markers */}
        <g opacity="0.4">
          <circle cx="0" cy="-78" r="1.5" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
          <circle cx="55.15" cy="-55.15" r="1.5" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
          <circle cx="78" cy="0" r="1.5" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
          <circle cx="55.15" cy="55.15" r="1.5" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
          <circle cx="0" cy="78" r="1.5" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
          <circle cx="-55.15" cy="55.15" r="1.5" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
          <circle cx="-78" cy="0" r="1.5" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
          <circle cx="-55.15" cy="-55.15" r="1.5" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
        </g>
      </g>
      
      {/* STATIC CENTER ELEMENTS */}
      
      {/* Inner concentric rings */}
      <circle cx="0" cy="0" r="42" fill="none" stroke={isDarkMode ? "#d4c5a8" : "#8C7348"} strokeWidth="1" opacity="0.2"/>
      <circle cx="0" cy="0" r="38" fill="none" stroke={`url(#${isDarkMode ? 'goldSubtle-dark' : 'goldSubtle-light'})`} strokeWidth="1.5" opacity="0.3"/>
      
      {/* Refined crosshair design */}
      <g opacity="0.8">
        <line x1="-28" y1="0" x2="-18" y2="0" stroke={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} strokeWidth="2" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
        <line x1="18" y1="0" x2="28" y2="0" stroke={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} strokeWidth="2" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
        <line x1="0" y1="-28" x2="0" y2="-18" stroke={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} strokeWidth="2" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
        <line x1="0" y1="18" x2="0" y2="28" stroke={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} strokeWidth="2" filter={isDarkMode ? "url(#premiumGlow)" : ""}/>
        
        <circle cx="-28" cy="0" r="2" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
        <circle cx="28" cy="0" r="2" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
        <circle cx="0" cy="-28" r="2" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
        <circle cx="0" cy="28" r="2" fill={isDarkMode ? "#d4c5a8" : "#8C7348"}/>
      </g>
      
      {/* Premium central core */}
      <circle cx="0" cy="0" r="16" fill={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} filter={isDarkMode ? "url(#softGlow)" : ""}/>
      <circle cx="0" cy="0" r="13" className="fill-gray-100 dark:fill-[#0a0a0a] transition-colors duration-500" />
      <circle cx="0" cy="0" r="10" fill={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} filter={isDarkMode ? "url(#strongGlow)" : ""}/>
      <circle cx="0" cy="0" r="7" className="fill-gray-100 dark:fill-[#0a0a0a] transition-colors duration-500" />
      
      {/* Central precise square element */}
      <rect x="-4.5" y="-4.5" width="9" height="9" 
            fill={`url(#${isDarkMode ? 'gold-dark' : 'gold-light'})`} 
            filter={isDarkMode ? "url(#strongGlow)" : ""}/>
      <rect x="-3" y="-3" width="6" height="6" 
            fill={isDarkMode ? "#d4c5a8" : "#544327"}/>
      
    </g>
  </svg>
);

// --- VISUAL MOCKUPS FOR PORTFOLIO (PURE CSS/SVG) ---

const MockTerminal = () => (
  <div className="w-full h-full bg-[#0F1014] p-4 font-mono text-[10px] text-green-500/80 overflow-hidden relative select-none">
    <div className="absolute top-0 left-0 w-full h-6 bg-[#1A1B20] flex items-center px-2 gap-1.5 border-b border-white/5 z-10">
       <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
       <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
       <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
    </div>
    <div className="mt-6 space-y-1 opacity-90">
      <div className="animate-[fadeIn_0.5s_ease-in-out_forwards] opacity-0" style={{ animationDelay: '0s' }}><span className="text-blue-400">&gt;&gt; BOT_INIT</span> <span className="text-gray-500">SESSION: #882</span></div>
      <div className="animate-[fadeIn_0.5s_ease-in-out_forwards] opacity-0" style={{ animationDelay: '0.8s' }}><span className="text-white">&gt;&gt; INCOMING_QUERY</span> <span className="text-yellow-500">"Where is my order?"</span></div>
      <div className="animate-[fadeIn_0.5s_ease-in-out_forwards] opacity-0" style={{ animationDelay: '1.6s' }}><span className="text-blue-400">&gt;&gt; CHECKING_SHOPIFY...</span> <span>[====  ]</span></div>
      <div className="text-gray-700 my-2 animate-[fadeIn_0.5s_ease-in-out_forwards] opacity-0" style={{ animationDelay: '2.0s' }}>----------------------------------------</div>
      <div className="animate-[fadeIn_0.5s_ease-in-out_forwards] opacity-0" style={{ animationDelay: '2.5s' }}><span className="text-accent">&gt;&gt; STATUS_FOUND</span> <span className="text-accent">SHIPPED</span></div>
      <div className="animate-[fadeIn_0.5s_ease-in-out_forwards] opacity-0" style={{ animationDelay: '3.2s' }}><span className="text-green-500">&gt;&gt; REPLY_SENT</span> <span className="text-green-500">RESOLVED</span></div>
      <div className="text-gray-500 animate-[fadeIn_0.5s_ease-in-out_forwards] opacity-0" style={{ animationDelay: '4.0s' }}>&gt;&gt; WAITING_FOR_NEXT_TICKET...</div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-[pulse_3s_linear_infinite] pointer-events-none"></div>
    <style>{`
      @keyframes fadeIn { to { opacity: 0.9; } }
    `}</style>
  </div>
);

const MockChart = () => (
   <div className="w-full h-full bg-[#0F1014] relative overflow-hidden flex items-end p-0 select-none group-hover:bg-[#050507] transition-colors duration-500">
      {/* Background Grid */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* Line Chart SVG */}
      <svg className="w-full h-3/4 z-10" viewBox="0 0 100 50" preserveAspectRatio="none">
        <path d="M0 45 L10 42 L20 35 L30 38 L40 25 L50 28 L60 15 L70 18 L80 10 L90 12 L100 5" 
              fill="none" 
              stroke="#D4C6A9" 
              strokeWidth="0.5" 
              vectorEffect="non-scaling-stroke" 
              className="drop-shadow-[0_0_5px_rgba(212,198,169,0.5)]"
              strokeDasharray="200"
              strokeDashoffset="200">
           <animate attributeName="stroke-dashoffset" from="200" to="0" dur="3s" repeatCount="indefinite" restart="always" />
        </path>
        <path d="M0 45 L10 42 L20 35 L30 38 L40 25 L50 28 L60 15 L70 18 L80 10 L90 12 L100 5 V 50 H 0 Z" fill="url(#gradient)" opacity="0.2" className="group-hover:opacity-30 transition-opacity duration-500" />
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#D4C6A9" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Floating Ticker */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-accent/20 px-3 py-1 text-xs font-mono text-accent shadow-[0_0_15px_rgba(212,198,169,0.2)]">
         +42 NEW LEADS
      </div>
      <div className="absolute top-4 left-4 text-[10px] font-mono text-gray-500">
         CAMPAIGN_PERFORMANCE
      </div>
   </div>
);

const MockDoc = () => (
    <div className="w-full h-full bg-[#0F1014] p-6 relative overflow-hidden select-none flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="w-20 h-2 bg-gray-700 rounded-sm"></div>
            <div className="text-[8px] font-mono text-gray-500">DOC_SCANNER_V2</div>
        </div>
        <div className="space-y-2 opacity-60">
            <div className="w-full h-1 bg-gray-600 rounded-sm"></div>
            <div className="w-3/4 h-1 bg-gray-600 rounded-sm"></div>
            <div className="w-full h-1 bg-gray-600 rounded-sm"></div>
            <div className="w-1/2 h-1 bg-accent/50 rounded-sm shadow-[0_0_10px_rgba(212,198,169,0.4)]"></div>
            <div className="w-full h-1 bg-gray-600 rounded-sm"></div>
        </div>
        
        {/* Scanning Beam */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-accent shadow-[0_0_15px_#D4C6A9] z-20 opacity-80"
             style={{ animation: 'scan 3s linear infinite' }}></div>

        {/* Detection Overlay */}
        <div className="absolute right-0 top-10 w-1/3 h-20 bg-accent/5 border-l border-accent/20 p-2 space-y-2 backdrop-blur-sm">
            <div className="text-[8px] text-accent font-mono uppercase">Data Extracted</div>
            <div className="w-full h-1 bg-accent/20"></div>
            <div className="w-2/3 h-1 bg-accent/20"></div>
            <div className="text-[8px] text-green-500 font-mono mt-2">SYNC_COMPLETE</div>
        </div>

        <style>{`
          @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>
    </div>
);

const MockNetwork = () => (
    <div className="w-full h-full bg-[#0F1014] relative overflow-hidden select-none">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border border-white/5 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] group-hover:border-accent/20 transition-colors duration-500">
                <div className="w-24 h-24 border border-dashed border-white/10 rounded-full"></div>
            </div>
        </div>
        {/* Nodes */}
        <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
           <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#D4C6A9] animate-pulse"></div>
           <span className="text-[8px] text-gray-500 mt-1">Source</span>
        </div>
        
        <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
           <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
           <span className="text-[8px] text-gray-500 mt-1">Target</span>
        </div>

        <div className="absolute top-1/2 left-1/2 flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
           <div className="w-3 h-3 bg-white/10 backdrop-blur border border-white/50 rounded-full"></div>
           <span className="text-[8px] text-white mt-8 bg-black/50 px-1">SYNC</span>
        </div>
        
        {/* Connection Lines (Static SVG for simplicity) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
            <line x1="75%" y1="66%" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
        </svg>
    </div>
);

const MockMap = () => (
  <div className="w-full h-full bg-[#0F1014] relative overflow-hidden select-none">
     {/* Grid */}
     <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
     {/* Map Path */}
     <svg className="w-full h-full absolute inset-0">
        <path d="M 50 150 L 100 80 L 180 120 L 250 90" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[pulse_3s_linear_infinite] opacity-50" />
        <circle cx="50" cy="150" r="2" fill="#3b82f6" />
        <circle cx="100" cy="80" r="2" fill="#3b82f6" />
        <circle cx="180" cy="120" r="2" fill="#3b82f6" />
        
        {/* Moving Dot */}
        <circle r="3" fill="white" className="shadow-[0_0_10px_white]">
           <animateMotion dur="6s" repeatCount="indefinite" path="M 50 150 L 100 80 L 180 120 L 250 90" />
        </circle>
     </svg>
     {/* Floating Cards */}
     <div className="absolute top-6 right-6 bg-black/80 border-l-2 border-blue-500 p-2 pl-3 backdrop-blur-sm group-hover:translate-x-[-5px] transition-transform duration-500">
        <div className="text-[8px] text-blue-400 font-mono tracking-wider">NEXT STOP</div>
        <div className="text-xs text-white font-mono mt-1">12 min away</div>
     </div>
  </div>
);

const MockPulse = () => (
  <div className="w-full h-full bg-[#0F1014] p-5 flex flex-col gap-4 select-none relative">
     <div className="flex justify-between border-b border-white/5 pb-2">
        <span className="text-[10px] text-green-400 font-mono animate-pulse tracking-wider">SYSTEM STATUS</span>
        <span className="text-[10px] text-gray-500 font-mono">SRV-01</span>
     </div>
     <div className="flex-1 flex items-center gap-1 relative overflow-hidden">
        {/* EKG Line */}
        <svg className="h-20 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
           <path d="M0 10 L10 10 L15 10 L20 10 L25 10 L35 10 L40 5 L45 15 L50 10 L100 10" fill="none" stroke="#4ade80" strokeWidth="1" className="drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" vectorEffect="non-scaling-stroke">
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
           </path>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F1014] w-full h-full"></div>
     </div>
     <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 p-2 rounded-sm border border-white/5 group-hover:border-green-500/30 transition-colors">
           <div className="text-[8px] text-gray-500 uppercase">Uptime</div>
           <div className="text-xl text-white font-mono leading-none mt-1">100<span className="text-[10px] text-gray-500">%</span></div>
        </div>
        <div className="bg-white/5 p-2 rounded-sm border border-white/5 group-hover:border-blue-500/30 transition-colors">
           <div className="text-[8px] text-gray-500 uppercase">Latency</div>
           <div className="text-xl text-white font-mono leading-none mt-1">24<span className="text-[10px] text-gray-500">ms</span></div>
        </div>
     </div>
  </div>
);

// --- NEW UNIQUE MOCKUPS ---

const MockKanban = () => (
    <div className="w-full h-full bg-[#0F1014] p-4 relative overflow-hidden select-none">
        <div className="flex justify-between gap-2 h-full">
            {[1, 2, 3].map((col, i) => (
                <div key={i} className="flex-1 bg-white/[0.02] border border-white/5 flex flex-col gap-2 p-2">
                    <div className="h-1 w-full bg-white/10 mb-2 relative overflow-hidden">
                         <div className={`absolute top-0 left-0 h-full bg-accent/40 w-1/2 ${i === 1 ? 'animate-pulse' : ''}`}></div>
                    </div>
                    {/* Cards */}
                    <div className="h-8 w-full bg-white/5 border-l-2 border-gray-600"></div>
                    {i === 1 && (
                         <div className="h-8 w-full bg-white/10 border-l-2 border-accent shadow-[0_0_10px_rgba(212,198,169,0.2)] animate-bounce delay-700"></div>
                    )}
                    <div className="h-8 w-full bg-white/5 border-l-2 border-gray-600 opacity-50"></div>
                </div>
            ))}
        </div>
        {/* Floater */}
        <div className="absolute top-1/2 left-1/4 w-16 h-8 bg-accent/20 border border-accent/50 backdrop-blur-sm z-20 flex items-center justify-center shadow-[0_0_15px_rgba(212,198,169,0.3)]"
             style={{ animation: 'float-right 4s infinite ease-in-out' }}>
             <span className="text-[6px] text-white font-mono">CANDIDATE_01</span>
        </div>
        <style>{`
            @keyframes float-right {
                0% { transform: translate(0, 0); opacity: 0; }
                20% { opacity: 1; }
                80% { transform: translate(150%, 0); opacity: 1; }
                100% { transform: translate(150%, 0); opacity: 0; }
            }
        `}</style>
    </div>
);

const MockInventory = () => (
    <div className="w-full h-full bg-[#0F1014] p-6 relative flex items-end justify-center gap-4 select-none">
        {/* Bars */}
        <div className="w-8 bg-white/5 relative group-hover:bg-white/10 transition-colors duration-500 h-2/3 border-t border-white/20">
            <div className="absolute -top-4 w-full text-center text-[8px] text-gray-500">AMZN</div>
            <div className="absolute bottom-0 w-full bg-blue-500/20 h-[80%] animate-pulse"></div>
        </div>
        
        {/* Center Hub */}
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center relative z-10 bg-[#0F1014]">
             <div className="w-8 h-8 rounded-full border border-accent/50 flex items-center justify-center">
                 <div className="w-1 h-1 bg-accent shadow-[0_0_5px_#D4C6A9]"></div>
             </div>
        </div>

        <div className="w-8 bg-white/5 relative group-hover:bg-white/10 transition-colors duration-500 h-3/4 border-t border-white/20">
             <div className="absolute -top-4 w-full text-center text-[8px] text-gray-500">SHOP</div>
             <div className="absolute bottom-0 w-full bg-green-500/20 h-[80%] animate-pulse delay-100"></div>
        </div>

        {/* Sync Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
             <path d="M 100 150 Q 150 180 200 150" fill="none" stroke="#D4C6A9" strokeWidth="0.5" className="opacity-40" />
             <circle r="2" fill="#D4C6A9">
                 <animateMotion dur="2s" repeatCount="indefinite" path="M 100 150 Q 150 180 200 150" />
             </circle>
        </svg>

        <div className="absolute top-4 right-4 bg-green-900/20 border border-green-500/30 px-2 py-1">
             <span className="text-[8px] text-green-400 font-mono tracking-wider">SYNC_ACTIVE</span>
        </div>
    </div>
);

const MockCalendar = () => (
    <div className="w-full h-full bg-[#0F1014] p-5 relative select-none">
        <div className="grid grid-cols-4 gap-1 h-full opacity-80">
            {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`border border-white/5 relative group-hover:border-white/10 transition-colors ${i === 6 || i === 11 ? 'bg-accent/10' : ''}`}>
                    {i === 6 && (
                        <div className="absolute inset-0 bg-accent/20 animate-pulse border border-accent/40 flex items-center justify-center">
                             <span className="text-[6px] text-white">BOOKED</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
        {/* Floating Notification */}
        <div className="absolute bottom-4 right-4 bg-[#1a1a1a] border-l-2 border-green-500 p-2 shadow-2xl animate-[bounce_3s_infinite]">
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <div className="text-[8px] text-white font-mono">SMS_SENT</div>
             </div>
        </div>
    </div>
);

const MockSocial = () => (
    <div className="w-full h-full bg-[#0F1014] p-6 relative flex flex-col justify-center select-none gap-4">
        {/* Source File */}
        <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center">
                 <div className="w-4 h-4 bg-gray-500 rounded-sm"></div>
             </div>
             <div className="h-0.5 flex-1 bg-white/5 relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-purple-500 w-1/3 animate-[slide-right_2s_infinite]"></div>
             </div>
        </div>
        
        {/* Targets */}
        <div className="space-y-2 pl-8 border-l border-white/5">
             <div className="flex items-center justify-between text-[8px] font-mono text-gray-500">
                 <span>TIKTOK</span>
                 <span className="text-green-500">DONE</span>
             </div>
             <div className="w-full h-1 bg-white/5">
                 <div className="h-full bg-green-500/50 w-full"></div>
             </div>
             
             <div className="flex items-center justify-between text-[8px] font-mono text-gray-500 mt-2">
                 <span>YOUTUBE</span>
                 <span className="text-yellow-500">UPLOADING...</span>
             </div>
             <div className="w-full h-1 bg-white/5">
                 <div className="h-full bg-yellow-500/50 w-2/3 animate-pulse"></div>
             </div>
        </div>
        <style>{`
            @keyframes slide-right {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(300%); }
            }
        `}</style>
    </div>
);


// --- PROJECT DATA (REORDERED & ENHANCED) ---

const PROJECTS = [
  // --- MOST ANIMATED / VISUALLY STUNNING FIRST ---
  {
    id: 'pulse',
    title: 'Project PULSE',
    category: 'IT // Monitoring',
    metric: '99.9%',
    metricLabel: 'Uptime',
    description: "Server health monitoring system for a SaaS startup. Detects downtime instantly and restarts services automatically.",
    Mockup: MockPulse
  },
  {
    id: 'sync',
    title: 'Project SYNC',
    category: 'Ops // Integration',
    metric: 'Real-time',
    metricLabel: 'Data Sync',
    description: "Connected a client's Shopify store to Airtable and Slack. Team gets instant notifications for VIP orders and low stock alerts.",
    Mockup: MockNetwork
  },
  {
    id: 'dispatch',
    title: 'Project DISPATCH',
    category: 'Logistics // Routing',
    metric: '-15%',
    metricLabel: 'Fuel Costs',
    description: "Automated route planning for a local HVAC company. Optimizes daily stops for technicians based on location and traffic.",
    Mockup: MockMap
  },
  {
    id: 'scout',
    title: 'Project SCOUT',
    category: 'HR // Recruitment',
    metric: '40hrs',
    metricLabel: 'Saved Per Hire',
    description: "Automated resume screening pipeline. Parses PDF resumes, scores candidates based on criteria, and schedules initial interviews.",
    Mockup: MockKanban
  },
  {
    id: 'stockpile',
    title: 'Project STOCKPILE',
    category: 'Retail // Inventory',
    metric: '0%',
    metricLabel: 'Overselling',
    description: "Multi-channel inventory sync. Updates stock levels across Shopify, Amazon, and physical POS in real-time to prevent overselling.",
    Mockup: MockInventory
  },
  // --- OTHERS BELOW ---
  {
    id: 'amplify',
    title: 'Project AMPLIFY',
    category: 'Social // Content',
    metric: 'Daily',
    metricLabel: 'Auto-Posting',
    description: "Content distribution engine. Takes one video and automatically generates descriptions and posts to TikTok, Reels, and Shorts.",
    Mockup: MockSocial
  },
  {
    id: 'outreach',
    title: 'Project OUTREACH',
    category: 'Sales // Lead Gen',
    metric: '+450%',
    metricLabel: 'Leads Generated',
    description: "Automated LinkedIn and Email outreach system for a B2B marketing agency. Scripts personalization and schedules meetings automatically.",
    Mockup: MockChart
  },
  {
    id: 'support',
    title: 'Project SUPPORT-AI',
    category: 'Service // Chatbot',
    metric: '-85%',
    metricLabel: 'Response Time',
    description: "Custom customer support agent for an e-commerce brand. Handles FAQs, order tracking, and returns instantly, 24/7.",
    Mockup: MockTerminal
  },
  {
    id: 'extract',
    title: 'Project EXTRACT',
    category: 'Admin // Processing',
    metric: '20hrs',
    metricLabel: 'Saved Per Week',
    description: "PDF Invoice scraper that automatically reads email attachments, extracts line items, and syncs them directly into QuickBooks.",
    Mockup: MockDoc
  },
  {
    id: 'booking',
    title: 'Project BOOKING',
    category: 'Health // Scheduling',
    metric: '+35%',
    metricLabel: 'Show-up Rate',
    description: "Smart appointment reminder system for a dental clinic. Sends WhatsApp confirmations and automatically fills cancellation slots.",
    Mockup: MockCalendar
  }
];


// --- MODAL CONTENT ---
const MODAL_CONTENT: Record<string, { title: string; content: React.ReactNode }> = {
  about: {
    title: "About Operator",
    content: (
      <div className="space-y-4">
        <p>Operator is an automation consultancy built for the modern era. We don't just "implement AI" — we build the central nervous system for your business.</p>
        <p>Our mission is to give you complete control. By automating the repetitive, high-volume tasks that clog your day, we free you to focus on growth and strategy.</p>
        <p>We believe that if you can define a process, we can automate it. We turn chaos into clockwork.</p>
      </div>
    )
  },
  privacy: {
    title: "Privacy Protocol",
    content: (
      <div className="space-y-4 text-sm">
        <h4 className="dark:text-white text-black font-medium uppercase tracking-wider">Data Handling</h4>
        <p>We respect your business data. All automations are built within your own accounts (Make.com, Zapier, or Cloud) whenever possible, giving you full control.</p>
        
        <h4 className="dark:text-white text-black font-medium uppercase tracking-wider mt-6">Security</h4>
        <p>We use industry-standard encryption for all API keys and credentials. We never use your customer data to train public models.</p>
      </div>
    )
  },
  terms: {
    title: "Terms of Engagement",
    content: (
      <div className="space-y-4 text-sm">
        <p>By engaging with Operator Control Systems, you agree to the following standards.</p>
        <ul className="list-disc pl-5 space-y-2 marker:text-accent">
            <li>Ownership: You own the workflows and agents we build for you.</li>
            <li>Support: We offer a 30-day bug-free guarantee on all delivered automations.</li>
            <li>Results: While we strive for efficiency, we are not liable for business outcomes resulting from automated decisions.</li>
        </ul>
      </div>
    )
  },
  contact: {
    title: "Contact Links",
    content: (
      <div className="space-y-6">
        <p>Ready to automate? Reach out directly.</p>
        <div className="grid grid-cols-1 gap-4">
            <div className="p-4 border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 flex items-center justify-between group cursor-pointer hover:border-accent/50 transition-colors" onClick={() => window.open('mailto:support@claritydrop.online')}>
                <span className="font-mono text-gray-800 dark:text-gray-300">support@claritydrop.online</span>
                <span className="text-[#8C7348] dark:text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <div className="p-4 border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 flex items-center justify-between group cursor-pointer hover:border-accent/50 transition-colors" onClick={() => window.open('mailto:support@claritydrop.online')}>
                <span className="font-mono text-gray-800 dark:text-gray-300">Book a Demo Call</span>
                <span className="text-[#8C7348] dark:text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
        </div>
      </div>
    )
  }
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [sharedProject, setSharedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  // Default to dark mode (true)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const handleShare = (project: typeof PROJECTS[0]) => {
    setSharedProject(project);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, PROJECTS.length));
  };

  return (
    <div className="min-h-screen font-sans selection:bg-accent/30 selection:text-white pb-20 bg-gray-50 dark:bg-obsidian text-black dark:text-white overflow-x-hidden transition-colors duration-500">
      
      {/* General Info Modal */}
      <Modal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        title={activeModal ? MODAL_CONTENT[activeModal]?.title : ''}
      >
        {activeModal ? MODAL_CONTENT[activeModal]?.content : null}
      </Modal>

      {/* Share Project Modal */}
      <Modal
        isOpen={!!sharedProject}
        onClose={() => setSharedProject(null)}
        title={`Share ${sharedProject?.title}`}
      >
        <div className="space-y-6">
          <p className="text-gray-800 dark:text-gray-300">Share this case study with your network.</p>
          <div className="grid grid-cols-1 gap-3">
             <button className="flex items-center justify-between p-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:border-accent/50 transition-all group">
                <span className="font-mono text-sm text-black dark:text-white">Share on LinkedIn</span>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
             </button>
             <button className="flex items-center justify-between p-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:border-accent/50 transition-all group">
                <span className="font-mono text-sm text-black dark:text-white">Share on Twitter (X)</span>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
             </button>
             <button className="flex items-center justify-between p-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:border-accent/50 transition-all group" onClick={() => {
                navigator.clipboard.writeText(`Check out ${sharedProject?.title} by Operator Systems`);
                setSharedProject(null);
             }}>
                <span className="font-mono text-sm text-black dark:text-white">Copy Link</span>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
             </button>
          </div>
        </div>
      </Modal>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-white/90 dark:bg-obsidian/90 border-gray-200 dark:border-white/10 backdrop-blur-md h-24' : 'bg-transparent border-transparent h-32'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-0 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* New SVG Brand Logo with Negative Margins to tighten gap */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 transition-all duration-500 -mr-5">
                 <BrandLogo isDarkMode={isDarkMode} />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-xl md:text-2xl font-bold tracking-[0.2em] text-black dark:text-white block leading-none dark:text-glow">OPERATOR</span>
              <span className="text-[10px] md:text-xs text-gray-800 dark:text-gray-400 font-mono tracking-widest block leading-none mt-2">CONTROL SYSTEMS</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 md:gap-10">
            <div className="hidden md:flex items-center gap-10 text-xs font-mono font-medium tracking-widest text-gray-700 dark:text-gray-300">
              <button onClick={() => scrollToSection('services')} className="hover:text-[#8C7348] dark:hover:text-glow-accent transition-all uppercase">Services</button>
              <button onClick={() => scrollToSection('process')} className="hover:text-[#8C7348] dark:hover:text-glow-accent transition-all uppercase">Process</button>
              <button onClick={() => scrollToSection('work')} className="hover:text-[#8C7348] dark:hover:text-glow-accent transition-all uppercase">Work</button>
            </div>
            
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
               {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/></svg>
               ) : (
                  <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
               )}
            </button>

            <div className="hidden md:block">
              <GlassButton variant="primary" className="!py-3 !px-6 text-[10px]" onClick={() => scrollToSection('inquiry')}>
                START PROJECT
              </GlassButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen">
           <NetworkGraph />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-10">
            <div className="inline-flex items-center gap-3 border-l-2 border-[#8C7348] dark:border-accent pl-4">
              <span className="text-[#8C7348] dark:text-glow-accent text-xs font-mono uppercase tracking-[0.2em] font-semibold">Control Systems</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.95] text-black dark:text-white dark:text-glow-strong">
              COMMAND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400">CENTER</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 max-w-2xl leading-relaxed font-light border-l border-gray-400 dark:border-white/20 pl-6 ml-2">
              Operational Mastery. We build the central nervous system for your business. 
              Eliminate chaos, automate workflows, and scale your operations without adding headcount.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <GlassButton variant="accent" onClick={() => scrollToSection('inquiry')}>
                INITIALIZE AUDIT
              </GlassButton>
              <GlassButton variant="secondary" onClick={() => scrollToSection('work')}>
                VIEW SYSTEMS
              </GlassButton>
            </div>
          </div>

          {/* Abstract visuals - Right side */}
          <div className="hidden lg:block lg:col-span-4 relative h-[400px]">
            <div className="absolute inset-0 border border-gray-300 dark:border-white/20 bg-white/30 dark:bg-gradient-to-br dark:from-white/10 dark:to-transparent backdrop-blur-md shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                 style={{ 
                   clipPath: "polygon(20% 0%, 100% 0, 100% 20%, 100% 80%, 80% 100%, 0 100%, 0% 80%, 0% 20%)",
                   boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.2)"
                 }}>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center space-y-2">
                   <div className="text-6xl font-light text-black dark:text-white dark:text-glow">20<span className="text-[#8C7348] dark:text-glow-accent text-3xl">+</span></div>
                   <div className="text-xs text-gray-700 dark:text-gray-200 font-mono uppercase tracking-widest">Hrs Saved / Week</div>
                 </div>
               </div>
               {/* Decorative lines */}
               <div className="absolute bottom-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8C7348]/50 dark:via-accent/50 to-transparent box-shadow-[0_0_10px_#D4C6A9]"></div>
               <div className="absolute top-10 right-0 w-px h-full bg-gradient-to-b from-transparent via-gray-400 dark:via-white/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gray-600 dark:via-white to-transparent dark:shadow-[0_0_10px_white]"></div>
          <span className="text-[10px] font-mono tracking-widest text-gray-700 dark:text-gray-300 uppercase dark:text-glow">Scroll</span>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative bg-gray-100 dark:bg-obsidian transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1 space-y-8">
               <h2 className="text-4xl font-light text-black dark:text-white leading-tight dark:text-glow">System <br /><span className="text-gray-600 dark:text-gray-300">Modules</span></h2>
               <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                 Practical solutions for real business problems. We don't just sell "AI" — we sell control.
               </p>
               <GlassButton variant="secondary" className="!px-0 !border-l-0 !pl-0 hover:pl-4" onClick={() => scrollToSection('inquiry')}>
                 Schedule a Consultation
               </GlassButton>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Chatbot Agents", desc: "24/7 Customer Service bots that actually solve problems, sync with your CRM, and handle orders." },
                { title: "Workflow Automation", desc: "Connect your apps (Slack, Gmail, Airtable). Stop copy-pasting data between tabs." },
                { title: "Lead Generation", desc: "Automated outreach systems that find leads, verify emails, and schedule meetings for you." },
                { title: "Data Processing", desc: "Automatically extract data from PDFs, invoices, and receipts directly into Excel or QuickBooks." }
              ].map((service, i) => (
                <div key={i} className="group p-8 bg-white dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 hover:border-[#8C7348]/40 dark:hover:border-accent/40 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(212,198,169,0.1)] transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
                   <div className="absolute top-0 right-0 p-4 opacity-30 text-4xl font-mono text-gray-400 dark:text-gray-500 group-hover:text-[#8C7348] dark:group-hover:text-accent transition-colors">0{i+1}</div>
                   <h3 className="text-xl font-medium text-black dark:text-white mb-4 group-hover:translate-x-1 transition-transform dark:group-hover:text-glow">{service.title}</h3>
                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-light">{service.desc}</p>
                   <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C7348]/70 dark:bg-accent/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_10px_#D4C6A9]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section - EXPANDED */}
      <section id="work" className="py-32 relative border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#08080A] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
             <div className="space-y-4">
               <h2 className="text-4xl font-light text-black dark:text-white dark:text-glow">Deployed Systems</h2>
               <p className="text-gray-700 dark:text-gray-200 max-w-xl">Real automations deployed in the field.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.slice(0, visibleCount).map((project) => (
              <div key={project.id} className="group relative bg-[#0F1014] border border-gray-300 dark:border-white/10 overflow-hidden shadow-2xl hover:border-[#8C7348]/30 dark:hover:border-accent/30 hover:bg-[#050507] transition-all duration-500 flex flex-col h-[400px]">
                 {/* Share Button (Hidden until hover) */}
                 <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(project);
                    }}
                    className="absolute top-6 right-6 z-40 p-2 bg-black/80 border border-white/20 text-gray-400 hover:text-white hover:border-accent opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                    title="Share Case Study"
                 >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                 </button>

                 {/* Header */}
                 <div className="p-6 border-b border-white/5 flex justify-between items-start bg-black/20 z-20">
                    <div className="max-w-[70%]">
                      <div className="text-accent text-xs font-mono uppercase tracking-widest mb-2 truncate dark:text-glow-accent">{project.category}</div>
                      <h3 className="text-2xl font-medium text-white group-hover:text-glow-strong transition-all duration-300">{project.title}</h3>
                    </div>
                    <div className="text-right">
                       <span className="block text-xl font-bold text-white group-hover:text-accent transition-colors dark:text-glow">{project.metric}</span>
                       <span className="text-[10px] text-gray-500 uppercase tracking-wider">{project.metricLabel}</span>
                    </div>
                 </div>
                 
                 {/* Visual Mockup Area - Always dark mode UI for portfolio */}
                 <div className="flex-1 relative overflow-hidden">
                    <div className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                       <project.Mockup />
                    </div>
                 </div>

                 {/* Description Overlay */}
                 <div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 z-30 pointer-events-none">
                    <p className="text-gray-200 text-center leading-relaxed max-w-sm">
                      "{project.description}"
                    </p>
                 </div>
              </div>
            ))}
          </div>

          {visibleCount < PROJECTS.length && (
              <div className="flex justify-center mt-16 relative z-20">
                 {/* ENHANCED VIEW MORE BUTTON WITH GOLDEN BLUR BACKLIGHT */}
                 <div className="relative group/btn">
                    <div className="absolute inset-0 bg-[#8C7348]/30 dark:bg-accent/30 blur-xl rounded-full opacity-60 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                    <GlassButton 
                        onClick={handleLoadMore} 
                        variant="secondary" 
                        className="relative z-10 w-full md:w-auto min-w-[200px] shadow-[0_10px_30px_rgba(140,115,72,0.3)] dark:shadow-[0_0_30px_rgba(212,198,169,0.3)] border-gray-400 dark:border-white/20 bg-white/80 dark:bg-black/40"
                    >
                        VIEW MORE SYSTEMS
                    </GlassButton>
                 </div>
              </div>
          )}
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <div className="border-y border-gray-300 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm py-12 overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
           <p className="text-center text-xs font-mono text-gray-600 dark:text-gray-400 uppercase tracking-[0.3em] mb-8 dark:text-glow">Built With Best-In-Class Tools</p>
           <div className="flex justify-center flex-wrap gap-12 md:gap-20 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
             <span className="text-xl font-bold font-mono text-black dark:text-white tracking-tight dark:hover:text-glow">Make.com</span>
             <span className="text-xl font-bold font-mono text-black dark:text-white tracking-tight dark:hover:text-glow">Zapier</span>
             <span className="text-xl font-bold font-mono text-black dark:text-white tracking-tight dark:hover:text-glow">OpenAI</span>
             <span className="text-xl font-bold font-mono text-black dark:text-white tracking-tight dark:hover:text-glow">Gemini</span>
             <span className="text-xl font-bold font-mono text-black dark:text-white tracking-tight dark:hover:text-glow">Airtable</span>
             <span className="text-xl font-bold font-mono text-black dark:text-white tracking-tight dark:hover:text-glow">Vapi</span>
           </div>
        </div>
      </div>

      {/* Process / Inquiry Section */}
      <section id="inquiry" className="py-32 px-6 relative bg-gray-100 dark:bg-obsidian transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            <div className="space-y-10 sticky top-32">
              <h2 className="text-4xl md:text-5xl font-light text-black dark:text-white leading-tight dark:text-glow">
                Initialize Your <br /><span className="text-[#8C7348] dark:text-glow-accent">Control Strategy</span>
              </h2>
              <p className="text-gray-800 dark:text-gray-200 font-light text-lg leading-relaxed">
                Skip the sales call. Tell us about your operational bottleneck, and our system will instantly generate a technical implementation plan and ROI estimate.
              </p>
              
              <div id="process" className="flex flex-col gap-8 pt-8 border-t border-gray-300 dark:border-white/10">
                <div className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-none bg-white border border-gray-400 dark:bg-white/5 dark:border-white/10 flex items-center justify-center text-[#8C7348] dark:text-accent font-mono text-lg shrink-0 group-hover:border-[#8C7348]/50 dark:group-hover:border-accent/50 group-hover:shadow-[0_0_10px_rgba(140,115,72,0.3)] dark:group-hover:shadow-[0_0_10px_rgba(212,198,169,0.3)] transition-all">1</div>
                  <div>
                    <h4 className="text-black dark:text-white font-medium text-lg dark:group-hover:text-glow">Input Challenges</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Describe the manual task you want to remove.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-none bg-white border border-gray-400 dark:bg-white/5 dark:border-white/10 flex items-center justify-center text-black dark:text-white font-mono text-lg shrink-0 group-hover:border-gray-600 dark:group-hover:border-white/40 group-hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all">2</div>
                  <div>
                    <h4 className="text-black dark:text-white font-medium text-lg dark:group-hover:text-glow">Instant Strategy</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Receive a preliminary technical approach immediately.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                   <div className="w-10 h-10 rounded-none bg-[#8C7348]/10 dark:bg-accent/20 border border-[#8C7348]/40 dark:border-accent/50 flex items-center justify-center text-[#8C7348] dark:text-accent font-mono text-lg shrink-0 shadow-[0_0_15px_rgba(140,115,72,0.2)] dark:shadow-[0_0_15px_rgba(212,198,169,0.2)] group-hover:shadow-[0_0_25px_rgba(140,115,72,0.4)] dark:group-hover:shadow-[0_0_25px_rgba(212,198,169,0.4)] transition-all">3</div>
                   <div>
                     <h4 className="text-black dark:text-white font-medium text-lg dark:group-hover:text-glow">Implementation</h4>
                     <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">We schedule a deep-dive to build your solution.</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Smart Inquiry Component */}
            <div className="relative pt-4">
               <SmartInquiry />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-white/10 bg-gray-200 dark:bg-black pt-20 pb-10 px-6 mt-20 transition-colors duration-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold tracking-widest text-black dark:text-white dark:text-glow">OPERATOR</h3>
            <p className="text-gray-800 dark:text-gray-300 max-w-sm text-sm font-light leading-relaxed">
              We replace manual effort with intelligent software.
              <br/>
              Specializing in SMB automation and AI agents.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase text-black dark:text-white tracking-widest border-b border-gray-400 dark:border-white/10 pb-2 inline-block">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 font-mono">
              <li onClick={() => openModal('about')} className="hover:text-[#8C7348] dark:hover:text-glow-accent cursor-pointer transition-colors">About Us</li>
              <li onClick={() => scrollToSection('services')} className="hover:text-[#8C7348] dark:hover:text-glow-accent cursor-pointer transition-colors">Services</li>
              <li onClick={() => scrollToSection('work')} className="hover:text-[#8C7348] dark:hover:text-glow-accent cursor-pointer transition-colors">Case Studies</li>
              <li onClick={() => openModal('contact')} className="hover:text-[#8C7348] dark:hover:text-glow-accent cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase text-black dark:text-white tracking-widest border-b border-gray-400 dark:border-white/10 pb-2 inline-block">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 font-mono">
              <li onClick={() => openModal('privacy')} className="hover:text-[#8C7348] dark:hover:text-glow-accent cursor-pointer transition-colors">Privacy Policy</li>
              <li onClick={() => openModal('terms')} className="hover:text-[#8C7348] dark:hover:text-glow-accent cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-300 dark:border-white/5 pt-10">
          <p className="text-xs text-gray-600 font-mono">© 2024 OPERATOR SYSTEMS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-black dark:hover:text-white transition-colors text-xs font-mono uppercase tracking-wider">Twitter</a>
            <a href="#" className="text-gray-600 hover:text-black dark:hover:text-white transition-colors text-xs font-mono uppercase tracking-wider">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
