import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Cpu, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sun, 
  Moon, 
  Flame,
  UserCheck,
  Wrench,
  Award,
  PlusCircle,
  Building,
  X
} from 'lucide-react';
import { SmartCityCanvas } from '../components/3d/SmartCityCanvas';
import { StepVisualizer } from '../components/common/StepVisualizer';
import { useIssues } from '../context/IssueContext';
import { useAuth } from '../context/AuthContext';
import { Complaint } from '../types';

export const HomePage: React.FC = () => {
  const { complaints } = useIssues();
  const { currentUser } = useAuth();

  // 3D Canvas state controls
  const [activeDeptFilter, setActiveDeptFilter] = useState<string>('ALL');
  const [weather, setWeather] = useState<'sunny' | 'rain' | 'storm' | 'fog'>('sunny');
  const [isNight, setIsNight] = useState<boolean>(true);
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);

  // Modals state
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // 3-Step Lifecycle Visualizer
  const [storyStep, setStoryStep] = useState<number>(0);

  const storySteps = [
    { title: '1. Citizen Snaps Photo & Reports', desc: 'Citizen uploads camera defect photo with original GPS location and voice note.', icon: MapPin },
    { title: '2. Officer Approves & Dispatches', desc: 'Department Officer reviews AI triage, validates severity, and dispatches worker with a push notification.', icon: UserCheck },
    { title: '3. Worker Resolves & Citizen Earns Points', desc: 'Field worker repairs defect, uploads resolution photo, and citizen receives +50 reward points!', icon: Award }
  ];

  const handleEmergencyTrigger = () => {
    setEmergencyMode(true);
    const critical = complaints.find((c) => c.severity === 'CRITICAL') || complaints[0];
    setSelectedComplaint(critical);
  };

  return (
    <div className="relative min-h-screen bg-[#080C14] text-slate-100 overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Glow Mesh */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Emergency Alert Banner */}
      <AnimatePresence>
        {emergencyMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-50 bg-rose-600/90 border-b border-rose-400 text-white py-2.5 px-4 flex items-center justify-between text-xs font-mono backdrop-blur-md shadow-[0_0_30px_rgba(244,63,94,0.8)]"
          >
            <div className="flex items-center gap-2 max-w-7xl mx-auto">
              <AlertTriangle className="w-4 h-4 text-amber-300 animate-bounce" />
              <span className="font-extrabold uppercase tracking-wider">CRITICAL EMERGENCY DETECTED:</span>
              <span>Autonomous drones dispatched to main arterial pipeline rupture!</span>
            </div>
            <button onClick={() => setEmergencyMode(false)} className="text-white hover:text-amber-200 font-bold">
              Dismiss Alert [X]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO TOP SECTION - INSTANT 100% VISIBILITY */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-glowCyan">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            AI Powered Crowdsourced Civic Issue Triage
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight leading-none drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
            Civic<span className="text-cyan-400">AI</span> Smart City Operating System
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-2xl mx-auto leading-relaxed">
            Snap photos of potholes, garbage, water leaks, or broken lights. AI automatically classifies defects, verifies GPS, and dispatches municipal crews.
          </p>

          {/* DYNAMIC ROLE PORTAL CTA BUTTON */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {currentUser?.role === 'officer' ? (
              <Link
                to="/dashboard/officer"
                className="btn-neon px-8 py-4 rounded-2xl bg-purple-600 text-white font-bold text-sm shadow-glowPurple flex items-center gap-2"
              >
                <Building className="w-5 h-5" /> Open Officer Pending Triage Requests ({complaints.filter(c => c.status === 'AI_VERIFIED').length})
              </Link>
            ) : currentUser?.role === 'worker' ? (
              <Link
                to="/dashboard/worker"
                className="btn-neon px-8 py-4 rounded-2xl bg-emerald-500 text-black font-bold text-sm shadow-glowEmerald flex items-center gap-2"
              >
                <Wrench className="w-5 h-5" /> Open Worker Approved Work Tasks
              </Link>
            ) : (
              <>
                <Link
                  to="/report"
                  className="btn-neon px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-glowCyan flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" /> Snap Photo & Report Civic Issue
                </Link>
                <Link
                  to="/dashboard/citizen"
                  className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs font-mono flex items-center gap-2"
                >
                  View My Reported Tickets Progress →
                </Link>
              </>
            )}
          </div>
        </div>

        {/* PROJECT HIGH-IMPACT TELEMETRY METRICS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="glass-card p-5 rounded-3xl border border-cyan-500/30 text-center space-y-1 shadow-glowCyan">
            <Cpu className="w-6 h-6 text-cyan-400 mx-auto" />
            <span className="text-[10px] text-slate-400 block uppercase">AI TRIAGE ACCURACY</span>
            <span className="text-xl font-extrabold text-cyan-300">96.8% Precision</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 shadow-glowEmerald">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
            <span className="text-[10px] text-slate-400 block uppercase">AVG RESOLUTION SPEED</span>
            <span className="text-xl font-extrabold text-emerald-300">1.2 Days SLA</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center space-y-1 shadow-glowPurple">
            <Building2 className="w-6 h-6 text-purple-400 mx-auto" />
            <span className="text-[10px] text-slate-400 block uppercase">MUNICIPAL WARDS COVERED</span>
            <span className="text-xl font-extrabold text-purple-300">32 City Zones</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center space-y-1 shadow-glowCyan">
            <Award className="w-6 h-6 text-amber-400 mx-auto" />
            <span className="text-[10px] text-slate-400 block uppercase">REWARDS DISPATCHED</span>
            <span className="text-xl font-extrabold text-amber-300">₹4.2 Lakh Rebates</span>
          </div>
        </div>

        {/* KEY CIVIC INNOVATION HIGHLIGHT CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-sm font-bold text-white font-display">YOLOv8 Computer Vision</h3>
            <p className="text-xs text-slate-400">Classifies potholes, garbage spills, & water leaks from device camera photos.</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-sm font-bold text-white font-display">Haversine Duplicate Engine</h3>
            <p className="text-xs text-slate-400">Merges duplicate complaints within 500m radius to eliminate ticket noise.</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-sm font-bold text-white font-display">3-Role Sequential Dispatch</h3>
            <p className="text-xs text-slate-400">Citizen reports → Officer approves & dispatches → Field worker resolves with photo.</p>
          </div>
        </div>

      </section>

      {/* 3D SMART CITY SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4 z-10 relative">
        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-cyan-400" /> Interactive 3D Digital Twin City
            </h2>
            <p className="text-xs text-slate-400 font-mono">Pulsing pins show live complaints. Click buildings to view department status.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setIsNight(!isNight)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 hover:border-cyan-400"
            >
              {isNight ? <Moon className="w-3.5 h-3.5 text-purple-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              {isNight ? 'Night View' : 'Daylight'}
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

        {/* 3D Canvas Box */}
        <div className="w-full h-[540px] md:h-[640px] relative rounded-3xl overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_60px_rgba(6,182,212,0.4)]">
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
          />
        </div>
      </section>

      {/* 3-STEP SEQUENTIAL WORKFLOW SECTION */}
      <section className="py-20 bg-slate-950/70 border-y border-slate-800/80 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase shadow-glowCyan">
              3-Step Sequential Triage Lifecycle
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display">How CivicAI Automates Civic Repair</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-3">
              {storySteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setStoryStep(idx)}
                  className={`w-full text-left p-4 rounded-2xl text-xs font-mono transition-all flex items-center justify-between border ${
                    storyStep === idx
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-glowCyan font-bold scale-[1.02]'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span>{step.title}</span>
                  <ArrowRight className={`w-4 h-4 ${storyStep === idx ? 'text-cyan-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-2 space-y-4">
              <StepVisualizer stepIndex={storyStep === 0 ? 2 : storyStep === 1 ? 5 : 8} />
              <div className="glass-card p-5 rounded-3xl border border-cyan-500/30 text-xs font-mono leading-relaxed text-slate-200 shadow-glowCyan">
                "{storySteps[storyStep].desc}"
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INSPECT COMPLAINT MODAL */}
      <AnimatePresence>
        {selectedComplaint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border-2 border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.5)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Ticket #{selectedComplaint.ticketNumber}
                </span>
                <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img src={selectedComplaint.imageUrl} alt={selectedComplaint.title} className="w-full h-44 object-cover rounded-2xl border border-slate-800" />

              <div>
                <h3 className="text-lg font-bold text-white font-display">{selectedComplaint.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedComplaint.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div><span className="text-slate-400 block text-[10px]">CATEGORY</span><span className="text-cyan-300 font-bold">{selectedComplaint.category}</span></div>
                <div><span className="text-slate-400 block text-[10px]">SEVERITY</span><span className="text-rose-400 font-bold">{selectedComplaint.severity}</span></div>
                <div><span className="text-slate-400 block text-[10px]">DEPARTMENT</span><span className="text-slate-200">{selectedComplaint.department.name}</span></div>
                <div><span className="text-slate-400 block text-[10px]">STATUS</span><span className="text-emerald-400 font-bold">{selectedComplaint.status}</span></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
