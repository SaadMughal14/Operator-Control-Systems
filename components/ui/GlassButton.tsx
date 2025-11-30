import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  // "Knife" styling: Sharp angles using clip-path
  const baseStyles = "relative px-8 py-4 transition-all duration-300 font-mono text-xs tracking-[0.2em] uppercase group";
  
  const variants = {
    primary: "bg-gray-200 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-white/10 border-l border-gray-400 dark:border-white/20",
    secondary: "bg-transparent text-gray-900 dark:text-gray-400 hover:text-black dark:hover:text-white border-l border-gray-900 dark:border-white/10",
    accent: "bg-[#8C7348]/10 dark:bg-accent/10 text-[#6F5935] dark:text-accent hover:bg-[#8C7348]/20 dark:hover:bg-accent/20 border-l border-[#8C7348] dark:border-accent/40"
  };

  const clipPathStyle = {
    clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={clipPathStyle}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3 justify-center">
        {children}
        <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
      
      {/* Knife Shine Effect */}
      <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent z-0 ease-in-out" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
    </button>
  );
};