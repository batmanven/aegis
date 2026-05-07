import React from 'react';
import { AegisEarth } from '@/components/ui/AegisEarth';
import { NeonButton } from '@/components/ui/NeonButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { Radio, Activity, Map as MapIcon, Shield, Zap, Globe, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col bg-black overflow-x-hidden scroll-smooth">
      {/* Background Effects */}
      <div className="fixed inset-0 aegis-grid opacity-10 pointer-events-none" />
      <div className="fixed inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 z-[100] w-full px-8 py-4 flex items-center justify-between border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Shield size={16} className="text-primary" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">Aegis Grid</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
          <Link href="#vision" className="hover:text-primary transition-colors hover:tracking-[0.4em]">Vision</Link>
          <Link href="#tech" className="hover:text-primary transition-colors hover:tracking-[0.4em]">Technology</Link>
          <Link href="#network" className="hover:text-primary transition-colors hover:tracking-[0.4em]">Mesh Network</Link>
        </div>
        <Link href="/dashboard">
          <NeonButton size="sm" className='cursor-pointer'>Enter System</NeonButton>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-40 pb-32 flex flex-col lg:flex-row items-center gap-16 min-h-screen">
        <div className="flex-1 space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
            <Zap size={12} />
            AI Core: Online // Grid: Active
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
            Surviving the <br />
            <span className="text-primary aegis-glow-primary">Unpredictable.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/40 max-w-xl leading-relaxed font-medium uppercase tracking-wide">
            When networks collapse and infrastructure fails, Aegis Grid provides a decentralized survival layer powered by AI and P2P mesh protocols.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <NeonButton size="lg" className="w-full cursor-pointer">
                Access Mission Control
              </NeonButton>
            </Link>
            <Link href="/dashboard/map" className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border border-white/10 rounded-md hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                View Deployment Map
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full h-[600px] relative perspective-1000">
          <AegisEarth />
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="w-full h-px bg-primary animate-scan" />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-4">01 // THE VISION</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
              Humanity's Decentralized <br />Safety Net.
            </h3>
            <p className="text-white/50 leading-relaxed space-y-6">
              Current disaster response systems are dangerously centralized. When a single cell tower or server fails, thousands lose access to life-saving information. 
              <br /><br />
              Aegis Grid reimagines survival as a community-powered infrastructure. By turning every device into a network node, we ensure that no one is truly offline.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FeatureSmall icon={<Globe />} title="Global Reach" desc="Deployable in any terrain, from urban centers to remote regions." />
            <FeatureSmall icon={<Shield />} title="Total Privacy" desc="Encrypted peer-to-peer data transmission with no central logs." />
            <FeatureSmall icon={<Activity />} title="Live Analytics" desc="Continuous monitoring of global threat vectors via AI." />
            <FeatureSmall icon={<Zap />} title="Instant Response" desc="Sub-second latency for critical SOS broadcasts." />
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section id="tech" className="relative z-10 w-full py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-4">02 // TECHNOLOGY</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Tactical Intelligence.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="p-10 space-y-6" glow="primary">
              <Cpu className="text-primary w-10 h-10" />
              <h4 className="text-2xl font-black uppercase italic tracking-tight">AI Predictive Engine</h4>
              <p className="text-sm text-white/40 leading-relaxed uppercase tracking-wider font-bold">
                Utilizing Gemini-1.5-Flash to analyze satellite telemetry and predict disaster intensity with 98% accuracy.
              </p>
            </GlassCard>

            <GlassCard className="p-10 space-y-6" glow="warning">
              <MapIcon className="text-warning w-10 h-10" />
              <h4 className="text-2xl font-black uppercase italic tracking-tight">3D Risk Mapping</h4>
              <p className="text-sm text-white/40 leading-relaxed uppercase tracking-wider font-bold">
                Cinematic Mapbox integration featuring 3D terrain extrusions and AI-calculated evacuation corridors.
              </p>
            </GlassCard>

            <GlassCard className="p-10 space-y-6" glow="danger">
              <Radio className="text-danger w-10 h-10" />
              <h4 className="text-2xl font-black uppercase italic tracking-tight">Offline Mesh Protocol</h4>
              <p className="text-sm text-white/40 leading-relaxed uppercase tracking-wider font-bold">
                Peer-to-peer survival network that remains operational when internet and cellular grids collapse.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section id="network" className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary">03 // MESH NETWORK</h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">When Networks Fail, We Connect.</h3>
          <p className="text-lg text-white/40 leading-relaxed uppercase tracking-widest font-bold">
            The Aegis Mesh Network is a resilient, user-powered infrastructure. Every device acts as a relay, creating a robust, decentralized grid that covers the "Last Mile" of disaster communication.
          </p>
          <Link href="/dashboard/mesh">
            <NeonButton size="lg">Initialize Local Node</NeonButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full px-8 py-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-black">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-black tracking-tighter uppercase italic">Aegis Grid</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            © 2026 AEGIS GRID INFRASTRUCTURE.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          <div className="flex flex-col gap-2">
            <span className="text-primary">Protocols</span>
            <span>AES-256-GCM</span>
            <span>P2P-MESH-v2</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-primary">Status</span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success" /> 
              Core: Optimal
            </span>
            <span>Uptime: 99.99%</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureSmall({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3">
      <div className="text-primary">{icon}</div>
      <h4 className="font-black uppercase italic text-sm tracking-tight">{title}</h4>
      <p className="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">{desc}</p>
    </div>
  );
}
