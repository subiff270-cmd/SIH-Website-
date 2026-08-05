import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Complaint, IssueCategory } from '../../types';
import { ThumbsUp, MapPin, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useIssues } from '../../context/IssueContext';

interface CivicMapProps {
  complaints: Complaint[];
  height?: string;
  onSelectComplaint?: (c: Complaint) => void;
}

// Generate Leaflet SVG pin icon with custom glow colors
const createCustomIcon = (severity: string, status: string) => {
  let color = '#3B82F6';
  if (status === 'COMPLETED') color = '#10B981';
  else if (severity === 'CRITICAL') color = '#F43F5E';
  else if (severity === 'HIGH') color = '#F59E0B';
  else if (severity === 'MEDIUM') color = '#EAB308';

  const svgHtml = `
    <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background-color: ${color}; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="position: relative; width: 20px; height: 20px; border-radius: 50%; background-color: ${color}; border: 2px solid white; box-shadow: 0 0 15px ${color};"></div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export const CivicMap: React.FC<CivicMapProps> = ({ complaints, height = '500px', onSelectComplaint }) => {
  const { upvoteComplaint } = useIssues();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredComplaints = complaints.filter(
    (c) => selectedCategory === 'ALL' || c.category === selectedCategory
  );

  const categories: { label: string; value: string }[] = [
    { label: 'All Issues', value: 'ALL' },
    { label: 'Potholes', value: 'POTHOLE' },
    { label: 'Garbage', value: 'GARBAGE' },
    { label: 'Water Leak', value: 'WATER_LEAKAGE' },
    { label: 'Street Light', value: 'STREET_LIGHT' },
  ];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/30 shadow-glassCard">
      {/* Category Filter Pills Bar */}
      <div className="absolute top-4 left-4 z-[400] flex flex-wrap gap-1.5 bg-slate-950/80 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              selectedCategory === cat.value
                ? 'bg-cyan-500 text-black font-bold shadow-glowCyan'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div style={{ height }}>
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India default
          zoom={5}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {filteredComplaints.map((c) => (
            <Marker
              key={c.id}
              position={[c.location.lat, c.location.lng]}
              icon={createCustomIcon(c.severity, c.status)}
              eventHandlers={{
                click: () => onSelectComplaint && onSelectComplaint(c),
              }}
            >
              <Popup>
                <div className="p-1 space-y-2 max-w-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {c.ticketNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                        c.status === 'COMPLETED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : c.severity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white leading-tight">{c.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2">{c.description}</p>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-cyan-400" /> {c.location.city}
                    </span>
                    <button
                      onClick={() => upvoteComplaint(c.id)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-black flex items-center gap-1 font-mono transition-all"
                    >
                      <ThumbsUp className="w-3 h-3" /> {c.upvotesCount} Upvotes
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
