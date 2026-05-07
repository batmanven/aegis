/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Send, Terminal, Cpu, Info, AlertCircle } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Aegis Survival AI active. State your emergency or request survival protocols.",
      // eslint-disable-next-line react-hooks/purity
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/survival', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input, context: "Disaster scenario in India" })
      });
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: data.text || "Connection lost. Reverting to local emergency cache. Please find high ground.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-1">On-Device Edge AI</h2>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Survival Assistant</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary">
          <Cpu size={14} className="animate-pulse" />
          Neural Core: Active
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          {/* Main Chat Area */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            <GlassCard className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest italic">Aegis AI Terminal</span>
                </div>
                <div className="text-[8px] font-mono text-white/20">ENCRYPTION: QUANTUM_SAFE</div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-4 rounded-xl text-sm leading-relaxed ${msg.role === 'user'
                        ? 'bg-primary/20 border border-primary/30 text-white shadow-[0_0_20px_rgba(0,209,255,0.05)]'
                        : 'bg-white/5 border border-white/10 text-white/80'
                        }`}>
                        {msg.content.split('\n').map((line, j) => (
                          <p key={j} className={line.startsWith('-') || line.startsWith('*') ? 'ml-2 mb-1' : 'mb-2 last:mb-0'}>
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="text-[8px] font-mono text-white/20 uppercase">
                        {msg.role === 'assistant' ? 'AEGIS_CORE' : 'NODE_USER'} // {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-.3s]" />
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-.5s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40 flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask survival instructions (e.g. 'How to treat a burn?', 'Flood safety tips')..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
                <NeonButton type="submit" disabled={loading}>
                  <Send size={18} />
                </NeonButton>
              </form>
            </GlassCard>
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <Info size={16} />
                Survival Hotkeys
              </h3>
              <div className="space-y-2">
                <QuickAction text="First Aid Guide" />
                <QuickAction text="Emergency Rations" />
                <QuickAction text="Signaling for Help" />
                <QuickAction text="Water Purification" />
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-danger/20 bg-danger/5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-danger mb-4 flex items-center gap-2">
                <AlertCircle size={16} />
                Critical Protocols
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded bg-danger/10 border border-danger/20 text-[10px] font-bold text-danger/80 leading-tight">
                  IF FLOODING OCCURS: MOVE TO HIGHEST AVAILABLE POINT. DO NOT WALK THROUGH MOVING WATER.
                </div>
                <div className="p-3 rounded bg-danger/10 border border-danger/20 text-[10px] font-bold text-danger/80 leading-tight">
                  IF EARTHQUAKE OCCURS: DROP, COVER, AND HOLD ON. STAY AWAY FROM GLASS.
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ text }: { text: string }) {
  return (
    <button className="w-full text-left p-3 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:bg-white/10 hover:text-white transition-all">
      {text}
    </button>
  );
}
