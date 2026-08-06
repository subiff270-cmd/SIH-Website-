import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  Sun, 
  Moon, 
  Flame, 
  CloudRain, 
  Layers, 
  X, 
  ArrowRight,
  ShieldCheck,
  Building,
  Wrench,
  Droplets,
  Zap,
  Trash2,
  Shield,
  PlusCircle,
  Filter
} from 'lucide-react';
import { SmartCityCanvas } from '../components/3d/SmartCityCanvas';
import { PredictiveAnalyticsWidget } from '../components/ai/PredictiveAnalyticsWidget';
import { useIssues } from '../context/IssueContext';
import { useAuth } from '../context/AuthContext';
import { Complaint } from '../types';
import { Link, useNavigate } from 'react-router-dom';

export const DigitalTwinPage: React.FC = () => {
  const navigate = useNavigate();
  const { complaints } = useIssues();
  const { switchRole } = useAuth();

  // Controls State
  const [activeDeptFilter, setActiveDeptFilter] = useState<string>('ALL');
  const [weather, setWeather] = useState<'sunny' | 'rain' | 'storm' | 'fog'>('sunny');
  const [isNight, setIsNight] = useState<boolean>(true);
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);

  // Modals
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedDeptBuilding, setSelectedDeptBuilding] = useState<string | null>(null);

  const handleEmergencyTrigger = () => {
    setEmergencyMode(true);
    const critical = complaints.find((c) => c.severity === 'CRITICAL') || complaints[0];
    if (critical) setSelectedComplaint(critical);
  };

  // Department metadata helper
  const getDeptInfo = (buildingName: string) => {
    if (buildingName.includes('Road') || buildingName.includes('PWD')) {
      return { abbr: 'PWD', name: 'Public Works Dept', color: 'cyan', icon: Wrench, issues: 'Potholes, Road Cuts, Footpaths' };
    }
    if (buildingName.includes('Waste') || buildingName.includes('Solid')) {
      return { abbr: 'SWM', name: 'Solid Waste Operations', color: 'emerald', icon: Trash2, issues: 'Garbage Spills, Dumping' };
    }
    if (buildingName.includes('Water') || buildingName.includes('Sewerage')) {
      return { abbr: 'WSD', name: 'Water & Sewerage Board', color: 'blue', icon: Droplets, issues: 'Pipeline Leaks, Overflow' };
    }
    return { abbr: 'ELEC', name: 'Electrical & Lighting Division', color: 'amber', icon: Zap, issues: 'Street Lights, Transformers' };
  };

  const activeBuildingInfo = selectedDeptBuilding ? getDeptInfo(selectedDeptBuilding) : null;

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2 shadow-glowCyan">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              Real-Time 3D Smart City Neural Matrix
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-display">
              3D Smart City Digital Twin
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Click 3D buildings & defect beacons to inspect telemetry, live camera photos & dispatch field workers.
            </p>
          </div>

          {/* Interactive Environment Controls */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setIsNight(!isNight)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 hover:border-cyan-400"
            >
              {isNight ? <Moon className="w-3.5 h-3.5 text-purple-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              {isNight ? 'Night Mode' : 'Daylight'}
            </button>

            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 outline-none"
            >
              <option value="sunny">☀️ Clear Weather</option>
              <option value="rain">🌧️ Rain Mode</option>
              <option value="storm">⚡ Monsoon Storm</option>
              <option value="fog">🌫️ Fog Grid</option>
            </select>

            <button
              onClick={handleEmergencyTrigger}
              className="btn-neon px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-mono font-bold text-xs shadow-glowRose flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Emergency Focus
            </button>
          </div>
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 mr-1">Filter 3D Hub:</span>
          {[
            { label: 'All City Defect Beacons', code: 'ALL' },
            { label: 'PWD Roads (🛣️)', code: 'PWD_ROADS' },
            { label: 'Solid Waste (♻️)', code: 'SWM_CLEAN' },
            { label: 'Water Board (💧)', code: 'WATER_DEPT' },
            { label: 'Electrical Grid (⚡)', code: 'ELEC_LIGHT' },
          ].map((dept) => (
            <button
              key={dept.code}
              onClick={() => setActiveDeptFilter(dept.code)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                activeDeptFilter === dept.code
                  ? 'bg-cyan-500 text-black font-bold shadow-glowCyan'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Fullscreen 3D Smart City Container */}
        <div className="w-full h-[620px] relative rounded-3xl overflow-hidden border border-cyan-500/40 shadow-glassCard">
          <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 backdrop-blur-md shadow-glowCyan">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            3D Smart City Twin (Orbit, Zoom & Click Buildings/Pins)
          </div>

          <SmartCityCanvas
            complaints={complaints}
            activeDepartmentFilter={activeDeptFilter}
            weather={weather}
            isNight={isNight}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
            onSelectDepartmentBuilding={(name) => setSelectedDeptBuilding(name)}
          />
        </div>

        {/* AI Predictive Infrastructure Analytics Widget */}
        <PredictiveAnalyticsWidget />

        {/* ═══ MODAL 1: COMPLAINT PIN INSPECTION MODAL ═══ */}
        <AnimatePresence>
          {selectedComplaint && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl" onClick={() => setSelectedComplaint(null)}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-glowCyan space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Ticket #{selectedComplaint.ticketNumber}
                  </span>
                  <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative rounded-2xl overflow-hidden h-48 bg-slate-950 border border-slate-800">
                  <img src={selectedComplaint.imageUrl} alt={selectedComplaint.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40 backdrop-blur-md">
                    {selectedComplaint.category}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-display">{selectedComplaint.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">{selectedComplaint.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div><span className="text-slate-400 block text-[10px]">CATEGORY</span><span className="text-cyan-300 font-bold">{selectedComplaint.category}</span></div>
                  <div><span className="text-slate-400 block text-[10px]">SEVERITY</span><span className="text-rose-400 font-bold">{selectedComplaint.severity}</span></div>
                  <div><span className="text-slate-400 block text-[10px]">DEPARTMENT</span><span className="text-slate-200">{selectedComplaint.department?.name || 'Public Works'}</span></div>
                  <div><span className="text-slate-400 block text-[10px]">STATUS</span><span className="text-emerald-400 font-bold">{selectedComplaint.status}</span></div>
                </div>

                <div className="flex justify-end pt-2">
                  <button onClick={() => setSelectedComplaint(null)} className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono shadow-glowCyan">
                    Close Inspection
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ═══ MODAL 2: 3D DEPARTMENT BUILDING TELEMETRY MODAL ═══ */}
        <AnimatePresence>
          {selectedDeptBuilding && activeBuildingInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl" onClick={() => setSelectedDeptBuilding(null)}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-glowCyan space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <activeBuildingInfo.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                        3D BUILDING TELEMETRY ({activeBuildingInfo.abbr})
                      </span>
                      <h3 className="text-lg font-bold text-white font-display mt-0.5">{selectedDeptBuilding}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedDeptBuilding(null)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-cyan-500/30">
                    <span className="text-[9px] text-slate-400 block">ACTIVE BEACONS</span>
                    <span className="text-base font-bold text-cyan-300">12 Defect Pins</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-500/30">
                    <span className="text-[9px] text-slate-400 block">AVG SLA SPEED</span>
                    <span className="text-base font-bold text-emerald-300">1.2 Days</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-purple-500/30">
                    <span className="text-[9px] text-slate-400 block">DISPATCHED CREWS</span>
                    <span className="text-base font-bold text-purple-300">6 Crews</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  <strong>Scope:</strong> {activeBuildingInfo.issues}. Real-time WebGL spatial telemetry connected to municipal headquarters.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-3 font-mono text-xs">
                  <button
                    onClick={() => {
                      setSelectedDeptBuilding(null);
                      switchRole('officer');
                      navigate('/dashboard/officer');
                    }}
                    className="btn-neon py-3 rounded-2xl bg-purple-600 text-white font-bold shadow-glowPurple flex items-center justify-center gap-2"
                  >
                    <Building className="w-4 h-4" /> Open Officer Portal
                  </button>
                  <Link
                    to="/report"
                    onClick={() => setSelectedDeptBuilding(null)}
                    className="btn-neon py-3 rounded-2xl bg-cyan-500 text-black font-bold shadow-glowCyan flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" /> Report New Issue
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
