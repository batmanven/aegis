"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldAlert, Bell, MapPin, Wind, Droplets, Thermometer, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ALERTS = [
  { id: 1, type: 'CYCLONE', name: 'Cyclone Amphan-26', severity: 'EXTREME', location: 'Coastal Odisha / Bengal', windSpeed: '185 km/h', eta: '4h 12m', status: 'EVACUATION_MANDATORY' },
  { id: 2, type: 'FLOOD', name: 'Flash Flood Alpha', severity: 'CRITICAL', location: 'Guwahati, Assam', waterLevel: '+2.4m', eta: 'Active', status: 'RESCUE_IN_PROGRESS' },
  { id: 3, type: 'HEATWAVE', name: 'Thermal Surge', severity: 'HIGH', location: 'North India Grid', temp: '48.5°C', eta: 'Ongoing', status: 'ADVISORY_ACTIVE' },
];

export default function AlertsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-danger mb-1 flex items-center gap-2">
            <ShieldAlert size={16} className="animate-pulse" />
            Critical Threat Level
          </h2>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Active Alerts</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded bg-danger/10 border border-danger/30 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-danger animate-ping" />
            <span className="text-xs font-black text-danger uppercase tracking-widest italic">Alert System Live</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ALERTS.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard 
              className="overflow-hidden border-danger/20 relative group"
              glow={alert.severity === 'EXTREME' ? 'danger' : 'none'}
            >
              {/* Status Ribbon */}
              <div className={`absolute top-0 right-0 px-6 py-1.5 text-[10px] font-black uppercase tracking-widest italic skew-x-[-20deg] translate-x-4 ${
                alert.severity === 'EXTREME' ? 'bg-danger text-white' : 'bg-warning text-black'
              }`}>
                {alert.status}
              </div>

              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex flex-col items-center justify-center min-w-[120px] lg:border-r lg:border-white/5 lg:pr-8">
                    <div className={`p-4 rounded-full mb-3 ${
                      alert.severity === 'EXTREME' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'
                    } aegis-glow-danger`}>
                      <ShieldAlert size={32} />
                    </div>
                    <span className={`text-sm font-black uppercase tracking-tighter ${
                      alert.severity === 'EXTREME' ? 'text-danger' : 'text-warning'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-black uppercase italic tracking-tight">{alert.name}</h3>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-bold text-white/40 uppercase">
                            ID: {alert.id}992-ARC
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <MapPin size={14} className="text-primary" />
                          <span className="text-xs font-bold uppercase tracking-wider">{alert.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-[10px] font-bold text-white/20 uppercase">Response Time</div>
                          <div className="text-xl font-mono text-primary font-black">{alert.eta}</div>
                        </div>
                        <Zap size={24} className="text-primary animate-pulse" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {alert.windSpeed && <Metric icon={<Wind size={14} />} label="Wind Speed" value={alert.windSpeed} color="text-primary" />}
                      {alert.waterLevel && <Metric icon={<Droplets size={14} />} label="Water Level" value={alert.waterLevel} color="text-info" />}
                      {alert.temp && <Metric icon={<Thermometer size={14} />} label="Surface Temp" value={alert.temp} color="text-danger" />}
                      <Metric icon={<Bell size={14} />} label="Alert Radius" value="45km" color="text-warning" />
                      <Metric icon={<ShieldCheck size={14} />} label="Confidence" value="98.2%" color="text-success" />
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <button className="px-6 py-2 rounded bg-danger/20 border border-danger/40 text-[10px] font-black text-danger uppercase tracking-widest hover:bg-danger/30 transition-all cursor-pointer">
                        Initiate Evacuation
                      </button>
                      <button className="px-6 py-2 rounded bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer">
                        Deploy Mesh Relays
                      </button>
                      <button className="ml-auto flex items-center gap-2 text-[10px] font-bold uppercase text-primary hover:underline cursor-pointer">
                        View Detailed Intel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Metric({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="p-3 rounded bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 mb-1">
        <div className={color}>{icon}</div>
        <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-sm font-black uppercase text-white">{value}</div>
    </div>
  );
}
