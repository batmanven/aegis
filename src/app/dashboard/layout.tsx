"use client";

import React from 'react';
import { Shield, LayoutDashboard, Map as MapIcon, Radio, MessageSquare, AlertTriangle, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MeshProvider } from '@/lib/mesh/MeshContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <MeshProvider>
      <div className="flex h-screen bg-black overflow-hidden">
      <aside className="w-20 md:w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl flex flex-col items-center md:items-stretch py-8 z-50">
        <div className="px-6 mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary aegis-glow-primary rounded flex items-center justify-center shrink-0">
            <Shield className="text-black w-6 h-6" />
          </div>
          <span className="hidden md:block text-lg font-black tracking-tighter uppercase italic">Aegis Grid</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" href="/dashboard" active={pathname === '/dashboard'} />
          <NavItem icon={<MapIcon size={20} />} label="Tactical Map" href="/dashboard/map" active={pathname === '/dashboard/map'} />
          <NavItem icon={<Radio size={20} />} label="Mesh Network" href="/dashboard/mesh" active={pathname === '/dashboard/mesh'} />
          <NavItem icon={<AlertTriangle size={20} />} label="Active Alerts" href="/dashboard/alerts" active={pathname === '/dashboard/alerts'} />
          <NavItem icon={<MessageSquare size={20} />} label="Survival Feed" href="/dashboard/feed" active={pathname === '/dashboard/feed'} />
          <NavItem icon={<Shield size={20} />} label="Survival AI" href="/dashboard/assistant" active={pathname === '/dashboard/assistant'} />
        </nav>

        <div className="px-4 mt-auto space-y-2">
          <NavItem icon={<User size={20} />} label="Profile" href="/dashboard/profile" active={pathname === '/dashboard/profile'} />
          <NavItem icon={<Settings size={20} />} label="System Config" href="/dashboard/settings" active={pathname === '/dashboard/settings'} />
        </div>
      </aside>
      <main className="flex-1 relative flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/5 bg-black/30 backdrop-blur-md flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-success/80">Satellite Link: Optimal</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">AI Core: Online</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/50">
              COORD: 18.5204° N, 73.8567° E
            </div>
            <div className="px-3 py-1 rounded bg-danger/10 border border-danger/30 text-[10px] font-bold text-danger uppercase tracking-tighter">
              Level 2 Alert: Coastal Odisha
            </div>
          </div>
        </header>

        <div className="flex-1 relative overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
    </MeshProvider>
  );
}

function NavItem({ icon, label, href, active = false }: { icon: React.ReactNode; label: string; href: string; active?: boolean }) {
  return (
    <Link href={href}>
      <div className={`
        flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group relative
        ${active ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(0,209,255,0.1)]' : 'text-white/40 hover:bg-white/5 hover:text-white'}
      `}>
        <div className={`${active ? 'text-primary' : 'text-inherit group-hover:text-primary transition-colors'}`}>
          {icon}
        </div>
        <span className="hidden md:block text-sm font-bold uppercase tracking-widest">{label}</span>
        {active && <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />}
      </div>
    </Link>
  );
}
