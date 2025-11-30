import React, { useState, useRef, useEffect } from 'react';
import { generateAgentResponse } from '../services/geminiService';
import { ChatMessage, Agent } from '../types';
import { GlassButton } from './ui/GlassButton';

interface AgentConsoleProps {
  activeAgent: Agent;
}

export const AgentConsole: React.FC<AgentConsoleProps> = ({ activeAgent }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: `Link established. I am ${activeAgent.name}. Awaiting your command.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset chat when agent changes
  useEffect(() => {
    setMessages([{
      id: 'init-' + activeAgent.id,
      role: 'model',
      text: `Link established. I am ${activeAgent.name}. ${activeAgent.role} ready.`,
      timestamp: new Date()
    }]);
  }, [activeAgent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    try {
      const responseText = await generateAgentResponse(userMsg.text, `${activeAgent.name} - ${activeAgent.role}`);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Connection interrupted. Secure key required for neural link.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] glass-panel rounded-lg overflow-hidden border border-white/10">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`} />
            {isProcessing && <div className="absolute inset-0 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75"></div>}
          </div>
          <span className="font-mono text-sm tracking-widest text-gray-300 uppercase">{activeAgent.name}</span>
        </div>
        <div className="text-xs text-gray-600 font-mono">ENCRYPTED // TLS 1.3</div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-sm border ${
              msg.role === 'user' 
                ? 'bg-white/5 border-white/10 text-gray-200' 
                : 'bg-black/40 border-accent/20 text-gray-300'
            }`}>
              {msg.isError ? (
                <span className="text-red-400">{msg.text}</span>
              ) : (
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
              )}
              <div className="mt-2 text-[10px] text-gray-600 uppercase tracking-wider">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
           <div className="flex justify-start">
             <div className="bg-black/40 border border-accent/20 p-4 rounded-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent/50 animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-accent/50 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-accent/50 animate-bounce delay-200"></span>
             </div>
           </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/20 border-t border-white/5">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command or query..."
            className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-mono text-sm placeholder-gray-600"
          />
          <GlassButton type="submit" disabled={isProcessing}>
             EXECUTE
          </GlassButton>
        </form>
      </div>
    </div>
  );
};
