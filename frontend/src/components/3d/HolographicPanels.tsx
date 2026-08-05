import React from 'react';
import { Html } from '@react-three/drei';
import { Cpu, ShieldAlert, Activity, CheckCircle2, Award } from 'lucide-react';
import { CITY_ANALYTICS } from '../../mockData';

export const HolographicPanels: React.FC = () => {
  return (
    <group>
      {/* Floating HUD Panel Left */}
      <Html position={[-14, 8, 4]} distanceFactor={22} center>
        <div className="p-4 rounded-3xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-2xl shadow-glowCyan text-xs font-mono space-y-2.5 w-64 text-white">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1.5">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Cpu className="w-4 h-4 text-cyan-400 animate-spin" /> Neural Triage Grid
            </span>
            <span className="text-[10px] text-emerald-400 font-bold animate-pulse">96.8% ACC</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[9px] text-slate-400 block">TOTAL REPORTED</span>
              <span className="font-extrabold text-cyan-400">{CITY_ANALYTICS.totalIssuesReported}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[9px] text-slate-400 block">SLA RESOLVED</span>
              <span className="font-extrabold text-emerald-400">{CITY_ANALYTICS.totalResolved}</span>
            </div>
          </div>
        </div>
      </Html>

      {/* Floating HUD Panel Right */}
      <Html position={[14, 8, -4]} distanceFactor={22} center>
        <div className="p-4 rounded-3xl bg-slate-950/90 border border-purple-500/40 backdrop-blur-2xl shadow-glowPurple text-xs font-mono space-y-2.5 w-64 text-white">
          <div className="flex items-center justify-between border-b border-purple-500/30 pb-1.5">
            <span className="flex items-center gap-1.5 text-purple-300 font-bold">
              <Activity className="w-4 h-4 text-purple-400" /> Dept Dispatch Flow
            </span>
            <span className="text-[10px] text-purple-300">LIVE</span>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between items-center bg-slate-900 p-1.5 rounded-lg">
              <span className="text-slate-300">PWD Road Crews</span>
              <span className="text-cyan-400 font-bold">85 Active</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900 p-1.5 rounded-lg">
              <span className="text-slate-300">Solid Waste Trucks</span>
              <span className="text-emerald-400 font-bold">140 Active</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
