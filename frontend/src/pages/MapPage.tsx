import React from 'react';
import { CivicMap } from '../components/maps/CivicMap';
import { useIssues } from '../context/IssueContext';
import { MapPin, Sparkles } from 'lucide-react';

export const MapPage: React.FC = () => {
  const { complaints } = useIssues();

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Real-time Geospatial Intelligence
            </div>
            <h1 className="text-3xl font-extrabold font-display">Citywide Civic Defect Map</h1>
            <p className="text-xs text-slate-400">Pulsing pins indicate severity: Red (Critical), Orange (High), Yellow (Medium), Green (Resolved).</p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            {complaints.length} Active Map Locations Tagged
          </div>
        </div>

        <CivicMap complaints={complaints} height="650px" />

      </div>
    </div>
  );
};
