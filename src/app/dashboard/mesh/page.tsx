"use client";

import React, { useState } from 'react';
import { useMesh } from '@/lib/mesh/MeshContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Send, Users, Terminal, Copy } from 'lucide-react';

export default function MeshPage() {
  const { peerId, connections, messages, sendMessage, connectToPeer, status } = useMesh();
  const [targetId, setTargetId] = useState('');
  const [inputText, setInputText] = useState('');

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetId) {
      connectToPeer(targetId);
      setTargetId('');
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const copyId = () => {
    if (peerId) {
      navigator.clipboard.writeText(peerId);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-full flex flex-col">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-1">Communication Layer</h2>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Mesh Network</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-success' : 'bg-warning'} animate-pulse`} />
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">{status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Left Column: Connection Info */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Users size={18} className="text-primary" />
              Node Identity
            </h3>
            <div className="p-4 rounded bg-black/40 border border-white/10 flex items-center justify-between mb-4">
              <div className="truncate mr-4">
                <div className="text-[10px] font-bold text-white/30 uppercase mb-1">Your Peer ID</div>
                <div className="font-mono text-sm text-primary truncate">{peerId || 'Generating...'}</div>
              </div>
              <button onClick={copyId} className="p-2 hover:bg-white/10 rounded transition-colors text-white/40">
                <Copy size={16} />
              </button>
            </div>

            <form onSubmit={handleConnect} className="space-y-3">
              <div className="text-[10px] font-bold text-white/30 uppercase">Connect to Remote Node</div>
              <input
                type="text"
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                placeholder="Enter Peer ID..."
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary/50"
              />
              <NeonButton type="submit" className="w-full" size="sm">Establish Link</NeonButton>
            </form>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-bold uppercase tracking-widest mb-4">Connected Nodes ({connections.length})</h3>
            <div className="space-y-2">
              {connections.length === 0 ? (
                <div className="text-xs text-white/20 italic">No active peer connections</div>
              ) : (
                connections.map(id => (
                  <div key={id} className="flex items-center justify-between p-2 rounded bg-primary/5 border border-primary/10">
                    <span className="text-[10px] font-mono text-primary truncate">{id.slice(0, 16)}...</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          <NeonButton variant="danger" className="w-full cursor-pointer" onClick={() => sendMessage("EMERGENCY SOS BROADCAST", "sos")}>
            Broadcast SOS
          </NeonButton>
        </div>

        {/* Right Column: Communication Feed */}
        <div className="lg:col-span-2 flex flex-col h-[600px]">
          <GlassCard className="flex-1 flex flex-col overflow-hidden border-primary/20">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest italic">Encrypted Mesh Log</span>
              </div>
              <div className="text-[10px] font-mono text-white/20">STATUS: SECURE_P2P</div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.type === 'system' ? 'items-center' : msg.sender === peerId ? 'items-end' : 'items-start'}`}>
                  {msg.type === 'system' ? (
                    <span className="text-[10px] text-white/20 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                      {msg.text}
                    </span>
                  ) : (
                    <div className={`max-w-[80%] rounded-lg p-3 ${msg.type === 'sos' ? 'bg-danger/20 border border-danger/40 text-danger' :
                      msg.sender === peerId ? 'bg-primary/20 border border-primary/40 text-primary' : 'bg-white/5 border border-white/10 text-white/80'
                      }`}>
                      <div className="text-[8px] font-bold opacity-50 mb-1">
                        {msg.sender === peerId ? 'YOU' : `NODE_${msg.sender.slice(0, 8)}`} • {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-sm">{msg.text}</div>
                    </div>
                  )}
                </div>
              ))}
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-white/10 text-xs italic">
                  No data transmission detected on current frequency
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type message to broadcast..."
                className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-primary/50"
              />
              <NeonButton type="submit" size="sm">
                <Send size={16} />
              </NeonButton>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
