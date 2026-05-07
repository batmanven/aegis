"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Activity, Radio, AlertTriangle, Wind, Droplets, Thermometer, MapPin, Zap } from 'lucide-react';
import { NeonButton } from '@/components/ui/NeonButton';
import { SystemModal } from '@/components/ui/SystemModal';

const playTacticalAlert = (type: 'danger' | 'success') => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playTone = (freq: number, start: number, duration: number, wave: OscillatorType = 'sine') => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime + start);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime + start);
      gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + start + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + start + duration);
      oscillator.start(audioCtx.currentTime + start);
      oscillator.stop(audioCtx.currentTime + start + duration);
    };

    if (type === 'danger') {
      // Triple pulse alarm
      playTone(880, 0, 0.3, 'square');
      playTone(880, 0.4, 0.3, 'square');
      playTone(880, 0.8, 0.5, 'square');
    } else {
      // Dual tone chime
      playTone(1200, 0, 0.2, 'sine');
      playTone(1600, 0.2, 0.4, 'sine');
    }
  } catch (e) {
    console.error("Audio failed", e);
  }
};

export default function DashboardPage() {
  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'info' | 'danger' | 'success';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const handleSOS = () => {
    playTacticalAlert('danger');
    setModalState({
      isOpen: true,
      title: "SOS Broadcast initiated",
      message: "EMERGENCY: SOS BROADCAST INITIATED. SATELLITE UPLINK ACTIVE. RESCUE TEAMS HAVE BEEN NOTIFIED.",
      type: 'danger'
    });
  };

  const handleMesh = () => {
    playTacticalAlert('success');
    setModalState({
      isOpen: true,
      title: "Mesh Nodes Active",
      message: "SYSTEM: MESH RELAY NODES ACTIVATED. LOCAL FREQUENCY SECURED. DATA REPLICATION IN PROGRESS.",
      type: 'success'
    });
  };

  const closeDiscard = () => setModalState(prev => ({ ...prev, isOpen: false }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-1">Mission Control</h2>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">System Overview</h1>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-white/30 uppercase">Last Refreshed</div>
          <div className="text-sm font-mono text-white/60">21:45:21 // 07-MAY-2026</div>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<Activity size={18} />} label="Global Risk Index" value="MEDIUM" color="text-warning" />
        <StatCard icon={<Radio size={18} />} label="Active Mesh Nodes" value="1,248" color="text-primary" />
        <StatCard icon={<AlertTriangle size={18} />} label="Priority SOS" value="12" color="text-danger" />
        <StatCard icon={<Zap size={18} />} label="Core Integrity" value="99.4%" color="text-success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Feed */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 border-primary/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle size={18} className="text-danger" />
                Active Disaster Predictions
              </h3>
              <NeonButton size="sm" variant="outline">Detailed Analysis</NeonButton>
            </div>

            <div className="space-y-4">
              <RiskItem
                location="Coastal Odisha"
                disaster="Cyclone Escalation"
                probability={91}
                severity="CRITICAL"
                trend="Rising"
              />
              <RiskItem
                location="Assam (Brahmaputra)"
                disaster="River Overflow"
                probability={78}
                severity="HIGH"
                trend="Stable"
              />
              <RiskItem
                location="Pune, MH"
                disaster="Heatwave Index"
                probability={45}
                severity="MEDIUM"
                trend="Rising"
              />
            </div>
          </GlassCard>

          {/* Environmental Telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <TelemetryCard icon={<Wind size={24} />} label="Wind Velocity" value="42 km/h" sub="NE Direction" />
            <TelemetryCard icon={<Droplets size={24} />} label="Humidity" value="84%" sub="Precipitation Imminent" />
            <TelemetryCard icon={<Thermometer size={24} />} label="Ground Temp" value="28°C" sub="Night Average" />
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <GlassCard className="p-6 bg-primary/5 border-primary/20">
            <h3 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-primary">
              <Zap size={18} />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <NeonButton variant="danger" className="w-full justify-start cursor-pointer" onClick={handleSOS}>Broadcast SOS Alert</NeonButton>
              <NeonButton variant="outline" className="w-full justify-start text-primary border-primary/30 cursor-pointer" onClick={handleMesh}>Activate Mesh Relay</NeonButton>
              <NeonButton variant="outline" className="w-full justify-start text-white/50 border-white/10 cursor-pointer">Request Satellite Sync</NeonButton>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              Nearby Shelters
            </h3>
            <div className="space-y-4">
              <ShelterItem name="Base Camp Alpha" distance="1.2 km" capacity="84%" />
              <ShelterItem name="Metro Station S4" distance="3.8 km" capacity="42%" />
              <ShelterItem name="Community Hall B" distance="5.1 km" capacity="FULL" />
            </div>
          </GlassCard>
        </div>
      </div>

      <SystemModal 
        isOpen={modalState.isOpen}
        onClose={closeDiscard}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <GlassCard className="p-4 flex items-center gap-4">
      <div className={`p-2 rounded bg-white/5 ${color}`}>{icon}</div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">{label}</div>
        <div className={`text-xl font-black italic ${color}`}>{value}</div>
      </div>
    </GlassCard>
  );
}

function RiskItem({ location, disaster, probability, severity, trend }: { location: string; disaster: string; probability: number; severity: string; trend: string }) {
  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-1 h-12 rounded-full ${severity === 'CRITICAL' ? 'bg-danger' : severity === 'HIGH' ? 'bg-warning' : 'bg-primary'}`} />
        <div>
          <div className="text-xs font-bold text-white/40 uppercase tracking-tighter">{location}</div>
          <div className="text-lg font-black uppercase italic leading-none">{disaster}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-black text-white leading-none">{probability}%</div>
        <div className={`text-[10px] font-bold uppercase ${trend === 'Rising' ? 'text-danger' : 'text-success'}`}>{trend}</div>
      </div>
    </div>
  );
}

function TelemetryCard({ icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <GlassCard className="p-6 text-center group hover:border-primary/30 transition-all">
      <div className="inline-flex p-3 rounded-full bg-white/5 text-primary mb-4 group-hover:aegis-glow-primary transition-all">{icon}</div>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">{label}</div>
      <div className="text-2xl font-black italic mb-1">{value}</div>
      <div className="text-[10px] font-medium text-white/40 uppercase tracking-tighter">{sub}</div>
    </GlassCard>
  );
}

function ShelterItem({ name, distance, capacity }: { name: string; distance: string; capacity: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <MapPin size={14} className="text-primary" />
        <span className="font-bold uppercase tracking-tight text-white/60">{name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-mono text-white/30">{distance}</span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${capacity === 'FULL' ? 'bg-danger/20 text-danger' : 'bg-success/20 text-success'}`}>
          {capacity}
        </span>
      </div>
    </div>
  );
}
