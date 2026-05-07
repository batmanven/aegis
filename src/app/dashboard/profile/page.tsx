"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { User, Shield, Award, Activity, Link as LinkIcon } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-1">Operator Profile</h2>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">User Identity</h1>
        </div>
        <NeonButton size="sm">Edit Credentials</NeonButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-8 text-center" glow="primary">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-primary/20 border-2 border-primary aegis-glow-primary flex items-center justify-center overflow-hidden">
                <User size={64} className="text-primary" />
              </div>
              <div className="absolute bottom-0 right-0 p-2 rounded-full bg-success aegis-glow-success border-2 border-black">
                <Shield size={16} className="text-black" />
              </div>
            </div>

            <h3 className="text-2xl font-black uppercase italic tracking-tight mb-1">Commander Aegis</h3>
            <div className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Tactical Response Unit</div>

            <div className="flex items-center justify-center gap-4 py-4 border-y border-white/5">
              <div className="text-center px-4">
                <div className="text-[10px] font-bold text-white/20 uppercase mb-1">Rank</div>
                <div className="text-sm font-black text-primary uppercase">Elite</div>
              </div>
              <div className="text-center px-4 border-l border-white/5">
                <div className="text-[10px] font-bold text-white/20 uppercase mb-1">XP</div>
                <div className="text-sm font-black text-primary uppercase">12.4K</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2">
              <Activity size={14} className="text-primary" />
              System Statistics
            </h4>
            <div className="space-y-4">
              <StatRow label="Lives Saved" value="142" />
              <StatRow label="Mesh Uptime" value="99.9%" />
              <StatRow label="Alert Responses" value="28" />
              <StatRow label="AI Interactions" value="1.2K" />
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="p-8">
            <h3 className="text-xl font-black uppercase italic tracking-tight mb-6 flex items-center gap-3">
              <Award size={20} className="text-primary" />
              Mission Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AchievementCard title="First Responder" date="May 2026" desc="Recognized for early response during Cyclone Amphan-26." />
              <AchievementCard title="Mesh Architect" date="April 2026" desc="Established 50+ local nodes in the Bengal rural sector." />
              <AchievementCard title="AI Whisperer" date="April 2026" desc="Utilized Gemini AI to optimize 10+ evacuation routes." />
              <AchievementCard title="Guardian Angel" date="March 2026" desc="Successfully coordinated a rescue mission during floods." />
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-xl font-black uppercase italic tracking-tight mb-6 flex items-center gap-3">
              <LinkIcon size={20} className="text-primary" />
              Linked Infrastructure
            </h3>
            <div className="space-y-4">
              <LinkedSystem name="Satellite Relay Alpha-9" status="CONNECTED" />
              <LinkedSystem name="Regional Mesh Hub: Kolkata" status="CONNECTED" />
              <LinkedSystem name="Emergency Emergency Node: Delhi" status="OFFLINE" danger />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}

function AchievementCard({ title, date, desc }: { title: string, date: string, desc: string }) {
  return (
    <div className="p-4 rounded bg-white/5 border border-white/10 group hover:border-primary/40 transition-all">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-black uppercase italic text-sm text-primary">{title}</h4>
        <span className="text-[8px] font-mono text-white/20 uppercase">{date}</span>
      </div>
      <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
    </div>
  );
}

function LinkedSystem({ name, status, danger }: { name: string, status: string, danger?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 rounded bg-black/40 border border-white/5">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${danger ? 'bg-danger' : 'bg-success'} animate-pulse`} />
        <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{name}</span>
      </div>
      <span className={`text-[10px] font-black uppercase tracking-tighter ${danger ? 'text-danger' : 'text-success'}`}>
        {status}
      </span>
    </div>
  );
}
