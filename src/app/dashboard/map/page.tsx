import React from 'react';
import { RiskMap } from '@/components/map/RiskMap';

export default function MapPage() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-1">Geospatial Intelligence</h2>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Tactical Risk Map</h1>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-white/30 uppercase">Scan Range</div>
          <div className="text-sm font-mono text-white/60">RADIUS: 500KM // DEPTH: 10M</div>
        </div>
      </div>

      <div className="flex-1 min-h-[600px] w-full">
        <RiskMap />
      </div>
    </div>
  );
}
