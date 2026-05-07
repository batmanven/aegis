import React from 'react';
import { AegisEarth } from '@/components/ui/AegisEarth';
import { NeonButton } from '@/components/ui/NeonButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { Radio, Activity, Map as MapIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      <div className="absolute inset-0 aegis-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />

      <nav className="relative z-50 w-full px-8 py-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter uppercase italic">Aegis Grid</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/60">
          <Link href="#vision" className="hover:text-primary transition-colors">Vision</Link>
          <Link href="#tech" className="hover:text-primary transition-colors">Technology</Link>
          <Link href="#network" className="hover:text-primary transition-colors">Mesh Network</Link>
        </div>
        <Link href="/dashboard">
          <NeonButton size="md" className='cursor-pointer'>Enter System</NeonButton>
        </Link>
      </nav>

      <section className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            System Live: AI Prediction Engine Active
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            PROTECTING <span className="text-primary neon-text-primary italic">HUMANITY</span> BEFORE DISASTER STRIKES.
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
            When networks collapse, humanity still connects. Aegis Grid is an AI-powered disaster survival ecosystem designed for an unpredictable future.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/dashboard">
              <NeonButton size="lg" className="w-full sm:w-auto cursor-pointer">
                Access Mission Control
              </NeonButton>
            </Link>
            <NeonButton variant="outline" size="lg" className="w-full sm:w-auto cursor-pointer">
              View Deployment Map
            </NeonButton>
          </div>
        </div>

        <div className="flex-1 w-full h-[500px] relative">
          <AegisEarth />
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="w-full h-1 bg-primary animate-scan" />
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-8 space-y-4" glow="primary">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Activity className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase italic tracking-tight">AI Prediction</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Real-time analysis of satellite imagery and terrain data to predict floods, wildfires, and cyclones.
            </p>
          </GlassCard>

          <GlassCard className="p-8 space-y-4" glow="danger">
            <div className="w-12 h-12 rounded-lg bg-danger/10 flex items-center justify-center border border-danger/20">
              <Radio className="text-danger w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase italic tracking-tight">Mesh Network</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Decentralized P2P communication that works even when internet and cell towers fail.
            </p>
          </GlassCard>

          <GlassCard className="p-8 space-y-4" glow="warning">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center border border-warning/20">
              <MapIcon className="text-warning w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase italic tracking-tight">3D Risk Maps</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Cinematic tactical interface for real-time evacuation routing and safe zone identification.
            </p>
          </GlassCard>
        </div>
      </section>

      <footer className="relative z-10 w-full px-8 py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/80 backdrop-blur-xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          © 2026 AEGIS GRID INFRASTRUCTURE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          <span>Encryption: AES-256</span>
          <span>Status: Secure</span>
          <span>Latency: 14ms</span>
        </div>
      </footer>
    </main>
  );
}
