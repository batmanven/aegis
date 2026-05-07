"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, Layers, Navigation2 } from 'lucide-react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const MOCK_RISK_ZONES = [
  { id: 1, name: 'Odisha Coast', type: 'Cyclone', severity: 'CRITICAL', coords: [85.8245, 20.2961] as [number, number] },
  { id: 2, name: 'Assam Valley', type: 'Flood', severity: 'HIGH', coords: [92.9376, 26.2006] as [number, number] },
  { id: 3, name: 'Western Ghats', type: 'Landslide', severity: 'MEDIUM', coords: [73.8567, 18.5204] as [number, number] },
];

export const RiskMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(78.9629);
  const [lat, setLat] = useState(20.5937);
  const [zoom, setZoom] = useState(4);

  const [simulationActive, setSimulationActive] = useState(false);
  const [routingActive, setRoutingActive] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    map.current.on('load', () => {
      if (!map.current) return;

      map.current.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

      map.current.addSource('flood-sim', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[]]
          },
          'properties': {}
        }
      });

      map.current.addLayer({
        'id': 'flood-layer',
        'type': 'fill',
        'source': 'flood-sim',
        'paint': {
          'fill-color': '#00d1ff',
          'fill-opacity': 0,
          'fill-outline-color': '#00d1ff'
        }
      });

      map.current.addSource('evac-route', {
        'type': 'geojson',
        'data': { 'type': 'Feature', 'geometry': { 'type': 'LineString', 'coordinates': [] }, 'properties': {} }
      });

      map.current.addLayer({
        'id': 'route-layer',
        'type': 'line',
        'source': 'evac-route',
        'layout': { 'line-join': 'round', 'line-cap': 'round' },
        'paint': { 'line-color': '#00e676', 'line-width': 4, 'line-opacity': 0, 'line-dasharray': [2, 1] }
      });

      map.current.addLayer({
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#333',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6
        }
      });

      MOCK_RISK_ZONES.forEach((zone) => {
        const el = document.createElement('div');
        el.className = `w-8 h-8 rounded-full flex items-center justify-center animate-pulse ${zone.severity === 'CRITICAL' ? 'bg-danger/40 border-danger' :
          zone.severity === 'HIGH' ? 'bg-warning/40 border-warning' : 'bg-primary/40 border-primary'
          } border-2 backdrop-blur-sm cursor-pointer`;

        const icon = document.createElement('div');
        icon.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>`;
        el.appendChild(icon);

        new mapboxgl.Marker(el)
          .setLngLat(zone.coords)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2 bg-black text-white font-sans">
                  <div class="text-[10px] font-bold uppercase text-primary">${zone.type} RISK</div>
                  <div class="text-sm font-black uppercase italic">${zone.name}</div>
                  <div class="text-[10px] font-mono mt-1 opacity-60">SEVERITY: ${zone.severity}</div>
                </div>
              `)
          )
          .addTo(map.current!);
      });
    });

    map.current.on('move', () => {
      setLng(Number(map.current!.getCenter().lng.toFixed(4)));
      setLat(Number(map.current!.getCenter().lat.toFixed(4)));
      setZoom(Number(map.current!.getZoom().toFixed(2)));
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!map.current) return;

    if (simulationActive) {
      const center = map.current.getCenter();
      const radius = 0.5;
      const points = 64;
      const coords = [];
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        coords.push([center.lng + Math.cos(angle) * radius, center.lat + Math.sin(angle) * radius]);
      }
      coords.push(coords[0]);
      (map.current.getSource('flood-sim') as mapboxgl.GeoJSONSource).setData({
        'type': 'Feature', 'geometry': { 'type': 'Polygon', 'coordinates': [coords] }, 'properties': {}
      });
      map.current.setPaintProperty('flood-layer', 'fill-opacity', 0.4);
    } else {
      if (map.current.getLayer('flood-layer')) map.current.setPaintProperty('flood-layer', 'fill-opacity', 0);
    }

    if (routingActive) {
      const center = map.current.getCenter();
      const routeCoords = [
        [center.lng, center.lat],
        [center.lng + 0.1, center.lat + 0.1],
        [center.lng + 0.15, center.lat + 0.05],
        [center.lng + 0.3, center.lat + 0.2],
      ];
      (map.current.getSource('evac-route') as mapboxgl.GeoJSONSource).setData({
        'type': 'Feature', 'geometry': { 'type': 'LineString', 'coordinates': routeCoords }, 'properties': {}
      });
      map.current.setPaintProperty('route-layer', 'line-opacity', 1);
    } else {
      if (map.current.getLayer('route-layer')) map.current.setPaintProperty('route-layer', 'line-opacity', 0);
    }

  }, [simulationActive, routingActive]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5">
      <div ref={mapContainer} className="w-full h-full" />

      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4 pointer-events-none">
        <GlassCard className="p-4 pointer-events-auto min-w-[200px]">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest italic">Aegis Tactical HUD</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
              <span>LNG:</span>
              <span className="text-white">{lng}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
              <span>LAT:</span>
              <span className="text-white">{lat}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
              <span>ZOOM:</span>
              <span className="text-white">{zoom}</span>
            </div>
          </div>
        </GlassCard>

        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={() => setSimulationActive(!simulationActive)}
            className={`p-2 rounded border transition-all ${simulationActive ? 'bg-primary/20 border-primary text-primary' : 'bg-black/80 border-white/10 text-white/60'}`}
          >
            <Layers size={18} />
          </button>
          <button
            onClick={() => setRoutingActive(!routingActive)}
            title="Calculate AI Evacuation Route"
            className={`p-2 rounded border transition-all ${routingActive ? 'bg-success/20 border-success text-success' : 'bg-black/80 border-white/10 text-white/60'}`}
          >
            <Navigation2 size={18} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
        <GlassCard className="p-4 pointer-events-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Risk Severity</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
              <div className="w-3 h-3 rounded-full bg-danger animate-pulse" />
              <span>Critical Risk</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>Medium Risk</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
