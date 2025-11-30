import React, { useState } from 'react';
import { GlassButton } from './ui/GlassButton';
import { generateProposal } from '../services/geminiService';

export const SmartInquiry: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    challenge: ''
  });
  const [proposal, setProposal] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateAudit = async () => {
    if (!formData.industry || !formData.challenge) return;
    
    setLoading(true);
    // Simulate network delay for "processing" effect
    await new Promise(r => setTimeout(r, 1500));
    
    const result = await generateProposal(formData.name, formData.industry, formData.challenge);
    setProposal(result);
    setLoading(false);
    setStep(2);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 dark:bg-charcoal/80 backdrop-blur-xl border border-gray-300 dark:border-white/10 p-1 relative overflow-hidden shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.6)]" 
         style={{ 
           clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
         }}>
      
      {/* Decorative scan line */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-1 bg-accent/50 animate-[pulse_2s_infinite] shadow-[0_0_20px_rgba(212,198,169,0.5)] z-20" />
      )}

      <div className="p-8 md:p-12 relative z-10">
        
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-light text-gray-900 dark:text-white dark:text-glow">Initialize Control</h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm font-mono">Let us analyze your operational needs instantly.</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-800 dark:text-gray-400 font-semibold">Company / Name</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 dark:bg-white/10 border-b border-gray-400 dark:border-white/20 focus:border-[#8C7348] dark:focus:border-accent p-3 text-black dark:text-white placeholder-gray-600 dark:placeholder-gray-400 outline-none transition-colors font-mono hover:bg-gray-100 dark:hover:bg-white/[0.15]"
                    placeholder="Acme Corp"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-800 dark:text-gray-400 font-semibold">Industry</label>
                  <input 
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 dark:bg-white/10 border-b border-gray-400 dark:border-white/20 focus:border-[#8C7348] dark:focus:border-accent p-3 text-black dark:text-white placeholder-gray-600 dark:placeholder-gray-400 outline-none transition-colors font-mono hover:bg-gray-100 dark:hover:bg-white/[0.15]"
                    placeholder="e.g. Real Estate, Logistics"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-800 dark:text-gray-400 font-semibold">Operational Challenge</label>
                <textarea 
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-white/10 border-b border-gray-400 dark:border-white/20 focus:border-[#8C7348] dark:focus:border-accent p-3 text-black dark:text-white placeholder-gray-600 dark:placeholder-gray-400 outline-none transition-colors font-mono resize-none leading-relaxed hover:bg-gray-100 dark:hover:bg-white/[0.15]"
                  placeholder="e.g. We spend 10 hours a week manually copying data from PDF invoices into Excel..."
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <GlassButton onClick={generateAudit} disabled={loading} variant="accent" className="w-full md:w-auto">
                {loading ? 'ANALYZING REQUIREMENTS...' : 'GENERATE STRATEGY'}
              </GlassButton>
            </div>
          </div>
        )}

        {step === 2 && proposal && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-start border-b border-gray-300 dark:border-white/10 pb-6">
              <div>
                <div className="text-xs text-[#8C7348] dark:text-accent font-mono uppercase tracking-widest mb-2 font-semibold dark:text-glow-accent">Recommended Solution</div>
                <h3 className="text-2xl text-black dark:text-white font-medium dark:text-glow">{proposal.title}</h3>
              </div>
              <div className="text-right hidden md:block">
                 <div className="text-xs text-gray-700 dark:text-gray-400 font-mono uppercase tracking-widest">Est. Efficiency Gain</div>
                 <div className="text-xl text-black dark:text-white font-bold dark:text-glow">{proposal.estimatedSavings}</div>
              </div>
            </div>

            <div className="py-2 space-y-8">
              <div>
                <h4 className="text-sm text-gray-600 dark:text-gray-300 font-mono uppercase tracking-widest mb-3 border-l-2 border-[#8C7348] dark:border-accent pl-3">Strategy</h4>
                <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed font-light">{proposal.strategy}</p>
              </div>

              <div>
                <h4 className="text-sm text-gray-600 dark:text-gray-300 font-mono uppercase tracking-widest mb-3 border-l-2 border-[#8C7348] dark:border-accent pl-3">Architecture</h4>
                <div className="flex flex-wrap gap-3">
                  {proposal.recommendedTech.map((tech: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-sm text-black dark:text-white font-mono shadow-sm cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#8C7348]/10 dark:bg-accent/10 border border-[#8C7348]/20 dark:border-accent/20 p-6 relative overflow-hidden mt-6">
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                 <div>
                   <p className="text-black dark:text-white font-medium text-lg">Ready to take control?</p>
                   <p className="text-sm text-gray-700 dark:text-gray-300">Book a technical discovery call to finalize this roadmap.</p>
                 </div>
                 <GlassButton variant="primary" onClick={() => window.open(`mailto:support@claritydrop.online?subject=Operator Inquiry: ${proposal.title}&body=Hi Operator Team,%0A%0AI'm interested in the ${proposal.title} strategy generated by your AI.%0A%0AMy Details:%0AName: ${formData.name}%0AIndustry: ${formData.industry}%0AChallenge: ${formData.challenge}%0A%0APlease let me know the next steps.%0A%0AThanks.`)}>BOOK CONSULTATION</GlassButton>
               </div>
            </div>
            
            <button onClick={() => setStep(1)} className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#8C7348] dark:hover:text-accent underline decoration-gray-400 dark:decoration-gray-600 underline-offset-4 w-full text-center mt-4 uppercase tracking-widest">
              Start New Analysis
            </button>
          </div>
        )}

      </div>
    </div>
  );
};