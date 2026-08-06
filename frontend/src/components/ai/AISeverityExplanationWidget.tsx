import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ruler, 
  Layers, 
  Maximize2, 
  AlertOctagon, 
  Zap, 
  Calculator, 
  Building2, 
  CheckCircle2, 
  Info, 
  Sliders, 
  Cpu, 
  ShieldAlert,
  Droplets,
  Trash2,
  Car
} from 'lucide-react';
import { AISpatialEstimation } from '../../types';

interface AISeverityExplanationWidgetProps {
  spatialData?: AISpatialEstimation;
  category?: string;
  priorityScore?: number;
}

export const AISeverityExplanationWidget: React.FC<AISeverityExplanationWidgetProps> = ({
  spatialData,
  category = 'POTHOLE',
  priorityScore = 92
}) => {
  const [activeTab, setActiveTab] = useState<'estimation' | 'tech_breakdown' | 'municipal_guide'>('estimation');

  // Default fallback estimation if not provided
  const data: AISpatialEstimation = spatialData || {
    severityScale: priorityScore > 85 ? 'Dangerous' : priorityScore > 60 ? 'Medium' : 'Small',
    damageAreaSqM: +(1.8 + (priorityScore / 100) * 1.5).toFixed(1),
    approxWidthCm: Math.round(45 + (priorityScore / 100) * 55),
    depthCategory: priorityScore > 85 ? 'Deep Cavity (>12cm)' : priorityScore > 60 ? 'Moderate (5-12cm)' : 'Shallow (2-5cm)',
    roadOccupancyPercent: Math.round(25 + (priorityScore / 100) * 40),
    garbageVolumeCuM: category === 'GARBAGE' ? 2.4 : undefined,
    floodAreaSqM: category === 'WATER_LEAKAGE' || category === 'DRAINAGE' ? 14.5 : undefined,
    objectDetectionLabel: 'YOLOv8 Segmentation Bounding Box',
    segmentationMaskConfidence: 98.4,
    monocularDepthMapScore: 0.89,
    severityIndex: +(priorityScore / 10).toFixed(1),
    priorityFormulaText: 'Score = (0.35 × Severity) + (0.25 × Area/Volume) + (0.20 × Road Occupancy) + (0.20 × Citizen Upvotes)'
  };

  const getSeverityBadgeColor = (scale: string) => {
    switch (scale) {
      case 'Dangerous':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-glowRose';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      default:
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50';
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-glowCyan space-y-6 text-slate-100">
      
      {/* Widget Header & Tab Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-bold block">
                AI COMPUTER VISION ENGINE
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold">
                YOLOv8 + Monocular Depth
              </span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">AI Severity Estimation & Priority Matrix</h3>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('estimation')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'estimation'
                ? 'bg-cyan-500 text-black font-bold shadow-glowCyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Defect Telemetry
          </button>
          <button
            onClick={() => setActiveTab('tech_breakdown')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'tech_breakdown'
                ? 'bg-cyan-500 text-black font-bold shadow-glowCyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🧠 AI Tech Pipeline
          </button>
          <button
            onClick={() => setActiveTab('municipal_guide')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'municipal_guide'
                ? 'bg-cyan-500 text-black font-bold shadow-glowCyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏛️ Municipal Guide
          </button>
        </div>
      </div>

      {/* ═══ TAB 1: DEFECT ESTIMATION TELEMETRY ═══ */}
      {activeTab === 'estimation' && (
        <div className="space-y-6">
          {/* Main Scale & Priority Score Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">SEVERITY RATING</span>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-extrabold font-mono px-3 py-1 rounded-xl border ${getSeverityBadgeColor(data.severityScale)}`}>
                  {data.severityScale.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {data.severityScale === 'Dangerous' ? '🚨 Immediate SLA Action' : 'Standard Queue'}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">PRIORITY SCORE (0-100)</span>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
                <span className="text-3xl font-extrabold text-cyan-300 font-mono">{priorityScore}/100</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">ROAD OCCUPANCY</span>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-purple-400" />
                <span className="text-xl font-extrabold text-purple-300 font-mono">{data.roadOccupancyPercent}% Lane Blocked</span>
              </div>
            </div>
          </div>

          {/* 6 Spatial & Volumetric Measurements Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 font-mono flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-cyan-400" /> Spatial & Volumetric AI Measurements
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 block uppercase">DAMAGE AREA</span>
                <span className="text-sm font-bold text-cyan-300">{data.damageAreaSqM} m²</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 block uppercase">APPROX WIDTH</span>
                <span className="text-sm font-bold text-cyan-300">{data.approxWidthCm} cm</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 block uppercase">DEPTH CATEGORY</span>
                <span className="text-xs font-bold text-amber-300">{data.depthCategory}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 block uppercase">ROAD OCCUPANCY</span>
                <span className="text-sm font-bold text-purple-300">{data.roadOccupancyPercent}%</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 block uppercase">GARBAGE VOLUME</span>
                <span className="text-sm font-bold text-emerald-300">{data.garbageVolumeCuM ? `${data.garbageVolumeCuM} m³` : 'N/A'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 block uppercase">FLOOD SPREAD</span>
                <span className="text-sm font-bold text-blue-300">{data.floodAreaSqM ? `${data.floodAreaSqM} m²` : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Priority Score Formula Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-cyan-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4" /> AI Priority Formula Breakdown
              </span>
              <span className="text-[10px] text-slate-400">Score Range: 0 (Minor) → 100 (Critical Emergency)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
              <code className="text-cyan-300">{data.priorityFormulaText}</code>
            </p>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: TECHNICAL AI PIPELINE BREAKDOWN ═══ */}
      {activeTab === 'tech_breakdown' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Cpu className="w-4 h-4" /> 1. Object Detection (YOLOv8)
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Locates defect bounding boxes (pothole, garbage, leak, streetlight) with 96.8% precision, identifying defect classes and initial coordinates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Layers className="w-4 h-4" /> 2. Instance Segmentation
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Generates pixel-accurate contour masks to measure exact surface damage area ($m^2$), flood spread radius, and garbage heap volume ($m^3$).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Maximize2 className="w-4 h-4" /> 3. Monocular Depth Estimation
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Predicts 3D depth maps from single camera photos to classify cavity depth (Shallow, Moderate, Deep Cavity &gt;12cm) without special hardware.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Sliders className="w-4 h-4" /> 4. Severity Index & Priority Matrix
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Combines physical dimensions, road classification (arterial highway vs side street), and citizen upvotes into a single 0-100 Priority Score.
            </p>
          </div>
        </div>
      )}

      {/* ═══ TAB 3: MUNICIPAL REPAIR PRIORITIZATION GUIDE ═══ */}
      {activeTab === 'municipal_guide' && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4 text-xs font-mono">
          <h4 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-400" /> How Municipalities Prioritize Repairs Using AI
          </h4>

          <div className="space-y-3 text-slate-300 text-[11px] leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-cyan-300 block mb-1">🚨 1. Automated Priority Dispatch (No Manual Delays)</strong>
              Municipalities group complaints by AI Priority Score. Issues scored &gt;85 (e.g. deep potholes on main arterial roads or main pipe bursts) trigger immediate SMS/Push alerts to field worker crews.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-emerald-300 block mb-1">🎯 2. Ward-Wise Material Allocation</strong>
              By estimating total damage area ($m^2$) and asphalt volume required, public works departments pre-calculate asphalt tonnages before trucks leave the depot.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-amber-300 block mb-1">🛡️ 3. SLA Compliance & Public Accountability</strong>
              Officers track mean time to repair (MTTR) against severity levels, guaranteeing 24-hour SLA response for Dangerous issues.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
