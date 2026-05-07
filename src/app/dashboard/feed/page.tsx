"use client";

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { AlertTriangle, MapPin, Clock, ShieldAlert, CheckCircle2, MessageSquare, Filter } from 'lucide-react';

const MOCK_REPORTS = [
  { id: 1, type: 'Flood', location: 'Lower Assam', status: 'ACTIVE', time: '14m ago', priority: 'CRITICAL', text: 'Water level rising rapidly near Brahmaputra bridge. 5 families trapped.' },
  { id: 2, type: 'Medical', location: 'Puri, Odisha', status: 'RESPONDING', time: '28m ago', priority: 'HIGH', text: 'Emergency medical assistance required at Shelter Alpha. Multiple heatstroke cases.' },
  { id: 3, type: 'Blockade', location: 'Pune Highway', status: 'VERIFIED', time: '1h ago', priority: 'MEDIUM', text: 'Tree fallen across NH48. Road completely blocked for heavy vehicles.' },
  { id: 4, type: 'Shelter', location: 'Community Hall B', status: 'FULL', time: '2h ago', priority: 'LOW', text: 'Shelter capacity reached. Redirecting survivors to Metro Station S4.' },
];

export default function FeedPage() {
  const [filter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newReport, setNewReport] = useState({ type: 'Flood', location: '', text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call with satellite transmission effect
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false);
        setNewReport({ type: 'Flood', location: '', text: '' });
      }, 2000);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-1">Community Intelligence</h2>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Survival Feed</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <Filter size={14} />
            Filter: {filter}
          </div>
          <NeonButton size="sm" onClick={() => setIsModalOpen(true)}>Submit Report</NeonButton>
        </div>
      </div>

      {/* Submit Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in zoom-in duration-300">
          <GlassCard className="w-full max-w-lg p-8 relative overflow-hidden min-h-[400px] flex flex-col" glow="primary">
            {isSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full bg-success/20 border-2 border-success flex items-center justify-center aegis-glow-success">
                  <CheckCircle2 size={40} className="text-success" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight text-success">Report Dispatched</h3>
                  <p className="text-sm text-white/40 uppercase tracking-widest mt-2">Data verified and synced to mesh nodes.</p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-6">Dispatch Report</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Incident Type</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all appearance-none"
                      value={newReport.type}
                      onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                    >
                      <option value="Flood">Flood</option>
                      <option value="Medical">Medical Emergency</option>
                      <option value="Blockade">Road Blockade</option>
                      <option value="Shelter">Shelter Update</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Location (Hyper-local)</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Kalighat Metro Gate 2"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                      value={newReport.location}
                      onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Situation Details</label>
                    <textarea
                      rows={4}
                      placeholder="Describe the situation as concisely as possible..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all resize-none"
                      value={newReport.text}
                      onChange={(e) => setNewReport({ ...newReport, text: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <NeonButton
                      type="submit"
                      className="flex-2 cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Transmitting...' : 'Confirm Dispatch'}
                    </NeonButton>
                  </div>
                </form>
              </>
            )}

            {isSubmitting && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-black uppercase text-primary tracking-widest animate-pulse">Establishing Satellite Uplink</span>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {MOCK_REPORTS.map((report) => (
          <GlassCard key={report.id} className="p-6 group hover:border-primary/20 transition-all" glow={report.priority === 'CRITICAL' ? 'danger' : 'none'}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center justify-center min-w-[100px] border-r border-white/5 pr-6">
                <div className={`p-3 rounded-full mb-2 ${report.priority === 'CRITICAL' ? 'bg-danger/20 text-danger' :
                  report.priority === 'HIGH' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                  }`}>
                  {report.priority === 'CRITICAL' ? <ShieldAlert size={24} /> : <AlertTriangle size={24} />}
                </div>
                <div className={`text-[10px] font-black uppercase tracking-tighter ${report.priority === 'CRITICAL' ? 'text-danger' :
                  report.priority === 'HIGH' ? 'text-warning' : 'text-primary'
                  }`}>
                  {report.priority}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-black uppercase italic tracking-tight">{report.type} Incident</h3>
                    <div className="flex items-center gap-1.5 text-white/40">
                      <MapPin size={14} className="text-primary" />
                      <span className="text-[10px] font-bold uppercase">{report.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-white/20">
                      <Clock size={14} />
                      <span className="text-[10px] font-mono">{report.time}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${report.status === 'ACTIVE' ? 'bg-danger/20 text-danger' :
                      report.status === 'RESPONDING' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                      }`}>
                      {report.status}
                    </div>
                  </div>
                </div>

                <p className="text-white/60 leading-relaxed font-medium">
                  {report.text}
                </p>

                <div className="flex items-center gap-6 pt-2 border-t border-white/5">
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/30 hover:text-primary transition-colors cursor-pointer">
                    <MessageSquare size={14} />
                    12 Updates
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/30 hover:text-success transition-colors cursor-pointer">
                    <CheckCircle2 size={14} />
                    Verify Report
                  </button>
                  <div className="ml-auto text-[8px] font-mono text-white/20 uppercase">
                    AI Confidence Index: 94.2%
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
