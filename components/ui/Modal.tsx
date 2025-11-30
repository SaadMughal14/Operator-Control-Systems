import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GlassButton } from './GlassButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/50 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content - 3D Glass Style with Knife Edges */}
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#0F1014] z-10 animate-in fade-in zoom-in-95 duration-300 group shadow-2xl"
        style={{ 
            clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
        }}
      >
         {/* Border Container (simulated via absolute div to handle complex inset shadows differently in light mode) */}
         <div className="absolute inset-0 pointer-events-none border border-gray-200 dark:border-white/10"
              style={{
                 clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                 boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.5)"
              }}
         ></div>

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-accent/80 rotate-45 shadow-[0_0_5px_#D4C6A9]" />
                <h2 className="text-xl font-mono uppercase tracking-widest text-gray-900 dark:text-white dark:text-glow">{title}</h2>
            </div>
            <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white dark:hover:text-glow transition-all duration-300"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="relative p-8 max-h-[70vh] overflow-y-auto text-gray-600 dark:text-gray-300 leading-relaxed font-light scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
            {children}
        </div>

        {/* Footer */}
        <div className="relative p-6 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-black/40 flex justify-end">
            <GlassButton variant="primary" onClick={onClose}>
                CLOSE
            </GlassButton>
        </div>
      </div>
    </div>,
    document.body
  );
};