import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, CloudRain, AlertTriangle, ArrowRight, CheckCircle2, Shield, Wrench, Activity } from 'lucide-react';

interface RiskPrediction {
  id: string;
  location: string;
  predictedDefect: string;
  riskScore: number;
  timeframe: string;
  reasons: string[];
  suggestedAction: string;
  isDispatched?: boolean;
}

export const PredictiveAnalyticsWidget: React.FC = () => {
  const [predictions, setPredictions] = useState<RiskPrediction[]>([
    {
      id: 'pred_1',
      location: 'MG Road Sector 14 Junction (Ward 14)',
      predictedDefect: 'Asphalt Pothole Surface Collapse',
      riskScore: 94,
      timeframe: 'Forecasted in next 48 Hours',
      reasons: ['Monsoon Heavy Rainfall (85mm)', 'Heavy Commercial Bus Route', 'Road Asphalt Age: 8.2 Years'],
      suggestedAction: 'Dispatch Preemptive Cold-Mix Patch Crew',
      isDispatched: false
    },
    {
      id: 'pred_2',
      location: 'Central Arterial Pipeline Line 4 (Ward 8)',
      predictedDefect: 'Pressurized Water Main Pipe Rupture',
      riskScore: 89,
      timeframe: 'Forecasted in next 12 Hours',
      reasons: ['Pressure Spike Detected (140 PSI)', 'Cast Iron Corrosion Index 82%', 'Vibration Telemetry High'],
      suggestedAction: 'Trigger Water Board Pressure Equalization Valve',
      isDispatched: false
    },
    {
      id: 'pred_3',
      location: 'Commercial Market Hub (Ward 22)',
      predictedDefect: 'Solid Waste Overflow & Drain Clog',
      riskScore: 82,
      timeframe: 'Forecasted in next 6 Hours',
      reasons: ['Weekend Market Garbage Spike', 'IoT Bin Sensor Capacity 91%'],
      suggestedAction: 'Route Automated Sanitation Truck #4',
      isDispatched: false
    }
  ]);

  const handleDispatch = (id: string) => {
    setPredictions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isDispatched: true } : p))
    );
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-purple-500/30 shadow-glowPurple space-y-6 bg-slate-950/90 relative overflow-hidden">
      {/* Background Decorative Mesh Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-mono mb-1">
            <Brain className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            AI Predictive Infrastructure Engine
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white">
            Predictive Risk Forecasts ("Next Pothole Likely Here")
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Analyzes historical defect rates, monsoon rainfall, traffic density & pipe pressure to prevent failures before citizens report them.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-purple-300 shrink-0">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Real-time Risk Telemetry Active</span>
        </div>
      </div>

      {/* Predictions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {predictions.map((pred) => (
          <motion.div
            key={pred.id}
            whileHover={{ y: -4 }}
            className={`p-5 rounded-2xl bg-slate-900/80 border space-y-3 flex flex-col justify-between transition-all ${
              pred.isDispatched
                ? 'border-emerald-500/50 shadow-glowEmerald'
                : 'border-slate-800 hover:border-purple-500/40'
            }`}
          >
            <div className="space-y-2">
              {/* Risk Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {pred.timeframe}
                </span>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  pred.riskScore >= 90
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}>
                  Risk Index {pred.riskScore}%
                </span>
              </div>

              {/* Location & Failure Type */}
              <div>
                <h3 className="text-sm font-bold text-white font-display">{pred.predictedDefect}</h3>
                <span className="text-[11px] text-cyan-400 font-mono block mt-0.5">{pred.location}</span>
              </div>

              {/* AI Risk Factors */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">AI Risk Drivers:</span>
                {pred.reasons.map((r, i) => (
                  <div key={i} className="text-[11px] text-slate-300 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Action & Button */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="text-[10px] text-slate-400 font-mono block">SUGGESTED PREEMPTIVE ACTION:</span>
              <p className="text-xs font-semibold text-slate-200">{pred.suggestedAction}</p>

              {pred.isDispatched ? (
                <div className="w-full py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Preemptive Crew Dispatched!
                </div>
              ) : (
                <button
                  onClick={() => handleDispatch(pred.id)}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono shadow-glowPurple flex items-center justify-center gap-1.5 transition-all"
                >
                  <Wrench className="w-3.5 h-3.5" /> Dispatch Preemptive Maintenance Crew
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
