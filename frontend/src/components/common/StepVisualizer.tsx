import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Cpu, 
  MapPin, 
  Sparkles, 
  Layers, 
  UserCheck, 
  Flame, 
  CheckCircle2, 
  Award,
  Smartphone,
  Navigation,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

interface StepVisualizerProps {
  stepIndex: number;
}

export const StepVisualizer: React.FC<StepVisualizerProps> = ({ stepIndex }) => {
  return (
    <div className="w-full h-80 relative rounded-3xl bg-slate-950/90 border border-cyan-500/40 overflow-hidden flex items-center justify-center p-6 shadow-glowCyan">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <AnimatePresence mode="wait">
        {/* Step 1: Camera Flies into Smart City */}
        {stepIndex === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center justify-center text-center space-y-4 z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="w-28 h-28 rounded-full border-2 border-dashed border-cyan-500/60 flex items-center justify-center relative shadow-[0_0_40px_rgba(6,182,212,0.4)]"
            >
              <Building2 className="w-12 h-12 text-cyan-400" />
            </motion.div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-300 font-bold px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40">
                INITIATING 3D DIGITAL TWIN
              </span>
              <p className="text-xs text-slate-400 font-mono">Camera sweeps across 32 municipal wards & sensors</p>
            </div>
          </motion.div>
        )}

        {/* Step 2: AI Platform Overview */}
        {stepIndex === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-sm space-y-4 z-10"
          >
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-purple-500/40 shadow-glowPurple">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-purple-400 animate-pulse" />
                <div>
                  <span className="text-xs font-bold text-white block">Neural Triage Engine</span>
                  <span className="text-[10px] font-mono text-slate-400">Processing 6,000+ City Complaints</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">96.8% ACC</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[9px] text-slate-400 block">SLA RESOLVED</span>
                <span className="font-bold text-emerald-400 text-base">5,500</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[9px] text-slate-400 block">AVG SPEED</span>
                <span className="font-bold text-cyan-400 text-base">1.2 Days</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Citizen Uploads Issue */}
        {stepIndex === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center space-y-3 z-10"
          >
            <div className="relative p-4 rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-glowCyan flex items-center gap-4">
              <Smartphone className="w-10 h-10 text-cyan-400 animate-bounce" />
              <div className="text-left space-y-1">
                <span className="text-xs font-bold text-white block">Citizen Mobile Upload</span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> GPS Tagged: 28.6139° N, 77.2090° E
                </span>
                <div className="flex items-center gap-1 h-3 pt-1">
                  {[40, 70, 30, 90, 50].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ['20%', `${h}%`, '20%'] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-cyan-400 rounded-full"
                    />
                  ))}
                  <span className="text-[9px] font-mono text-slate-400 ml-1">Voice Note Recorded</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: AI Vision Scanning & Classification */}
        {stepIndex === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-sm relative rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-glowCyan z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
              alt="Pothole"
              className="w-full h-44 object-cover opacity-80"
            />
            {/* Laser Line Scan */}
            <motion.div
              className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#06B6D4]"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute top-3 left-3 bg-cyan-500 text-black px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold">
              YOLOv8 DETECTED: POTHOLE (97.4%)
            </div>
          </motion.div>
        )}

        {/* Step 5: Auto-Department Selection */}
        {stepIndex === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-5 rounded-3xl bg-slate-900 border border-purple-500/40 shadow-glowPurple space-y-3 text-center z-10"
          >
            <Layers className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
            <h4 className="font-bold text-sm text-white font-display">Automated Matrix Routing</h4>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
              Assigned to: <span className="text-white font-bold">Public Works Dept (PWD)</span>
            </div>
          </motion.div>
        )}

        {/* Step 6: Field Worker Assignment */}
        {stepIndex === 5 && (
          <motion.div
            key="step-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-5 rounded-3xl bg-slate-900 border border-blue-500/40 shadow-glowBlue flex items-center gap-4 z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              alt="Worker"
              className="w-14 h-14 rounded-2xl border-2 border-cyan-400 object-cover"
            />
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono text-cyan-300 uppercase block">WORKER DISPATCHED</span>
              <h4 className="font-bold text-sm text-white">Vikram Singh (PWD Road Crew #14)</h4>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Navigation className="w-3 h-3" /> Turn-by-Turn GPS Dispatched
              </span>
            </div>
          </motion.div>
        )}

        {/* Step 7: Drone Inspection */}
        {stepIndex === 6 && (
          <motion.div
            key="step-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center space-y-3 z-10"
          >
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-glowCyan"
            >
              <Flame className="w-10 h-10 text-cyan-400" />
            </motion.div>
            <span className="text-xs font-mono text-cyan-300 font-bold bg-slate-900 px-3 py-1 rounded-full border border-cyan-500/40">
              Autonomous Drone Telemetry Active
            </span>
          </motion.div>
        )}

        {/* Step 8: Issue Resolved & Verified */}
        {stepIndex === 7 && (
          <motion.div
            key="step-7"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-2 gap-3 w-full max-w-sm z-10"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-rose-400 block">BEFORE DEFECT</span>
              <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80" alt="Before" className="w-full h-24 object-cover rounded-xl border border-rose-500/50" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-emerald-400 block">AFTER REPAIR</span>
              <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80" alt="After" className="w-full h-24 object-cover rounded-xl border border-emerald-500/50 shadow-glowEmerald" />
            </div>
          </motion.div>
        )}

        {/* Step 9: Citizen Rewards Awarded */}
        {stepIndex === 8 && (
          <motion.div
            key="step-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/40 text-center space-y-3 shadow-glowCyan z-10"
          >
            <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold font-display text-amber-300">+50 CIVIC REWARD POINTS</h4>
            <p className="text-xs text-slate-300 font-mono">
              Thank you for keeping your city clean! Points added to Aarav Sharma's wallet.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
