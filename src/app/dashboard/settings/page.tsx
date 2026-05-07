"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Shield, Bell, Zap, Cpu } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-1">System Configuration</h2>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Control Panel</h1>
        </div>
        <NeonButton size="sm">Factory Reset</NeonButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Settings */}
        <div className="space-y-8">
          <GlassCard className="p-8">
            <h3 className="text-xl font-black uppercase italic tracking-tight mb-6 flex items-center gap-3">
              <Shield size={20} className="text-primary" />
              Security & Access
            </h3>
            <div className="space-y-6">
              <ToggleRow title="Two-Factor Authentication" desc="Enable biometric or security key verification." checked />
              <ToggleRow title="End-to-End Encryption" desc="All mesh data is encrypted using AES-256." checked />
              <ToggleRow title="Intrusion Detection" desc="AI monitors for malicious node behavior." checked />
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-xl font-black uppercase italic tracking-tight mb-6 flex items-center gap-3">
              <Bell size={20} className="text-primary" />
              Alert Protocols
            </h3>
            <div className="space-y-6">
              <ToggleRow title="Audio SOS Alerts" desc="Play high-frequency audio when SOS is detected." checked />
              <ToggleRow title="Push Notifications" desc="Send critical risk alerts to linked devices." checked />
              <ToggleRow title="Auto-Evacuation Routes" desc="Automatically calculate routes when risk level is critical." checked />
            </div>
          </GlassCard>
        </div>

        {/* Technical Config */}
        <div className="space-y-8">
          <GlassCard className="p-8">
            <h3 className="text-xl font-black uppercase italic tracking-tight mb-6 flex items-center gap-3">
              <Cpu size={20} className="text-primary" />
              AI Intelligence
            </h3>
            <div className="space-y-6">
              <ToggleRow title="Neural Core Optimization" desc="Allocate more GPU resources to AI processing." checked />
              <ToggleRow title="Edge Mode" desc="Enable on-device AI for full offline capability." checked />
              <ToggleRow title="Gemini 1.5 Integration" desc="Use advanced cloud reasoning when available." checked />
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-xl font-black uppercase italic tracking-tight mb-6 flex items-center gap-3">
              <Zap size={20} className="text-primary" />
              Power Management
            </h3>
            <div className="space-y-6">
              <ToggleRow title="Ultra Low Latency" desc="Prioritize speed over battery efficiency." checked />
              <ToggleRow title="Adaptive Mesh" desc="Nodes enter sleep mode when no activity detected." />
              <ToggleRow title="Emergency Backup" desc="Auto-switch to local cache if satellite link fails." checked />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ title, desc, checked = false }: { title: string, desc: string, checked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-8 group">
      <div className="flex-1">
        <h4 className="text-sm font-black uppercase italic tracking-tight text-white/80 mb-1 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-[10px] text-white/40 uppercase tracking-widest">{desc}</p>
      </div>
      <div className={`w-12 h-6 rounded-full relative transition-all duration-300 cursor-pointer border ${checked ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10'
        }`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${checked ? 'left-7 bg-primary aegis-glow-primary' : 'left-1 bg-white/20'
          }`} />
      </div>
    </div>
  );
}
