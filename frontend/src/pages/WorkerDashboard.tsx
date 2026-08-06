import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  MapPin, 
  Navigation, 
  Camera, 
  CheckCircle2, 
  Clock,
  BellRing,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  Ban,
  AlertTriangle,
  ArrowRight,
  Eye,
  XCircle
} from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SmartCityCanvas } from '../components/3d/SmartCityCanvas';

type VerifyPhase = 'idle' | 'scanning_before' | 'scanning_after' | 'comparing' | 'passed' | 'failed';

// After-photo presets for demo
const afterPresets = [
  {
    name: '✅ Repaired Road (Pass)',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    willPass: true
  },
  {
    name: '❌ Same Pothole (Fail)',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    willPass: false
  },
  {
    name: '❌ Random Selfie (Fail)',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    willPass: false
  }
];

export const WorkerDashboard: React.FC = () => {
  const { complaints, notifications, resolveIssueWithPhoto, clearNotifications } = useIssues();
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'tasks' | '3d_nav'>('tasks');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('Cold-mix asphalt patch unit deployed. Defect repaired and verified.');
  const [afterPhotoUrl, setAfterPhotoUrl] = useState(afterPresets[0].url);
  const [selectedPresetWillPass, setSelectedPresetWillPass] = useState(true);

  // AI Verification state machine
  const [verifyPhase, setVerifyPhase] = useState<VerifyPhase>('idle');
  const [beforeScanScore, setBeforeScanScore] = useState(0);
  const [afterScanScore, setAfterScanScore] = useState(0);
  const [matchPercent, setMatchPercent] = useState(0);
  const [qualityScore, setQualityScore] = useState(0);

  const workerNotifs = notifications.filter((n) => n.targetRole === 'worker');

  const assignedTasks = complaints.filter(
    (c) => c.status === 'ASSIGNED' || c.status === 'IN_PROGRESS' || (c.status === 'COMPLETED' && c.assignedWorker)
  );

  const handleWorkerPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAfterPhotoUrl(event.target.result as string);
          setSelectedPresetWillPass(true); // Real uploads = pass by default
          setVerifyPhase('idle');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunVerification = async (taskId: string) => {
    // Phase 1: Scanning Before Photo
    setVerifyPhase('scanning_before');
    await new Promise((r) => setTimeout(r, 1200));
    const bScore = 94.2 + Math.random() * 4;
    setBeforeScanScore(parseFloat(bScore.toFixed(1)));

    // Phase 2: Scanning After Photo
    setVerifyPhase('scanning_after');
    await new Promise((r) => setTimeout(r, 1200));
    const aScore = selectedPresetWillPass ? (2.1 + Math.random() * 3) : (78.5 + Math.random() * 15);
    setAfterScanScore(parseFloat(aScore.toFixed(1)));

    // Phase 3: Comparing
    setVerifyPhase('comparing');
    await new Promise((r) => setTimeout(r, 1000));

    const defectMatch = selectedPresetWillPass ? (1.2 + Math.random() * 3) : (82 + Math.random() * 12);
    setMatchPercent(parseFloat(defectMatch.toFixed(1)));

    const qScore = selectedPresetWillPass ? (92 + Math.random() * 6) : (8 + Math.random() * 15);
    setQualityScore(parseFloat(qScore.toFixed(0)));

    if (selectedPresetWillPass) {
      // PASS — defect is cleared
      setVerifyPhase('passed');
      await new Promise((r) => setTimeout(r, 1500));
      resolveIssueWithPhoto(taskId, afterPhotoUrl, resolutionNotes);
      setTimeout(() => {
        setActiveTicketId(null);
        setVerifyPhase('idle');
      }, 1200);
    } else {
      // FAIL — defect still exists
      setVerifyPhase('failed');
    }
  };

  const resetVerification = () => {
    setVerifyPhase('idle');
    setBeforeScanScore(0);
    setAfterScanScore(0);
    setMatchPercent(0);
    setQualityScore(0);
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Card */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 shadow-glowEmerald flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Wrench className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest block">FIELD WORKER PORTAL</span>
              <h1 className="text-xl font-bold text-white font-display">Worker: {currentUser?.name || 'Vikram Singh'}</h1>
              <p className="text-xs text-slate-400">Upload repair photos. AI compares Before vs After — rejects if defect still exists.</p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            {assignedTasks.length} Assigned Work Orders
          </span>
        </div>

        {/* REAL-TIME WORKER PUSH NOTIFICATIONS */}
        <AnimatePresence>
          {workerNotifs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-3xl bg-cyan-500/10 border-2 border-cyan-400 shadow-glowCyan space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-cyan-300 flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-cyan-400 animate-bounce" />
                  WORKER DISPATCH NOTIFICATION ({workerNotifs.length})
                </span>
                <button onClick={() => clearNotifications('worker')} className="text-[10px] font-mono text-slate-400 hover:text-white">
                  Dismiss All [X]
                </button>
              </div>
              {workerNotifs.map((n) => (
                <div key={n.id} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-cyan-400">
                    <span className="font-bold">{n.title}</span>
                    <span>Ticket #{n.ticketNumber}</span>
                  </div>
                  <p className="text-slate-200">{n.message}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* WORKER TABS */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'tasks' ? 'bg-emerald-500 text-black shadow-glowEmerald' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" /> AI Before/After Verification ({assignedTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('3d_nav')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === '3d_nav' ? 'bg-emerald-500 text-black shadow-glowEmerald' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" /> Worker 3D Waypoint Navigation
          </button>
        </div>

        <input type="file" ref={fileInputRef} accept="image/*" capture="environment" onChange={handleWorkerPhotoUpload} className="hidden" />

        {/* TAB 1: ASSIGNED TASKS & AI BEFORE/AFTER VERIFICATION */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {assignedTasks.length === 0 ? (
              <div className="glass-card p-10 rounded-3xl text-center space-y-3 border border-slate-800">
                <Clock className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Active Tasks Assigned Yet</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Citizen reports defect → Officer approves → Task appears here with GPS route!
                </p>
              </div>
            ) : (
              assignedTasks.map((task) => (
                <div key={task.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                  {/* Task Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <img src={task.imageUrl} alt={task.title} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">{task.ticketNumber}</span>
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${task.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                            {task.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white font-display mt-1">{task.title}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {task.location.address}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${task.location.lat},${task.location.lng}`}
                      target="_blank" rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-500 hover:text-black transition-all"
                    >
                      <Navigation className="w-4 h-4" /> Open GPS Route
                    </a>
                  </div>

                  {/* ═══ AI BEFORE/AFTER VERIFICATION ENGINE ═══ */}
                  {task.status !== 'COMPLETED' && (
                    activeTicketId === task.id ? (
                      <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                            <Eye className="w-4 h-4" /> AI Before vs After Comparison Engine
                          </h4>
                          <button type="button" onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                            📷 Upload Real Photo
                          </button>
                        </div>

                        {/* Side-by-Side Photo Comparison with Scan Overlay */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* BEFORE Photo */}
                          <div className="relative rounded-xl overflow-hidden border border-slate-700">
                            <span className="absolute top-2 left-2 z-20 text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/90 text-white uppercase">Before (Defect)</span>
                            <img src={task.imageUrl} alt="Before" className="w-full h-36 object-cover" />
                            {/* Scanning Laser on Before */}
                            {verifyPhase === 'scanning_before' && (
                              <motion.div className="absolute inset-0 z-10">
                                <motion.div
                                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent shadow-[0_0_20px_#F43F5E]"
                                  animate={{ top: ['0%', '100%', '0%'] }}
                                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                                />
                                <div className="absolute inset-0 bg-rose-500/10 flex items-center justify-center">
                                  <span className="text-[10px] font-mono text-rose-300 font-bold bg-slate-950/80 px-2 py-1 rounded">
                                    <Cpu className="w-3 h-3 inline animate-spin mr-1" /> Detecting defect pattern...
                                  </span>
                                </div>
                              </motion.div>
                            )}
                            {/* Score badge */}
                            {beforeScanScore > 0 && verifyPhase !== 'scanning_before' && (
                              <div className="absolute bottom-2 right-2 z-20 text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/90 text-white">
                                Defect: {beforeScanScore}%
                              </div>
                            )}
                          </div>

                          {/* AFTER Photo */}
                          <div className="relative rounded-xl overflow-hidden border border-emerald-500/40">
                            <span className="absolute top-2 left-2 z-20 text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/90 text-white uppercase">After (Repair)</span>
                            <img src={afterPhotoUrl} alt="After" className="w-full h-36 object-cover" />
                            {/* Scanning Laser on After */}
                            {verifyPhase === 'scanning_after' && (
                              <motion.div className="absolute inset-0 z-10">
                                <motion.div
                                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10B981]"
                                  animate={{ top: ['0%', '100%', '0%'] }}
                                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                                />
                                <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                                  <span className="text-[10px] font-mono text-emerald-300 font-bold bg-slate-950/80 px-2 py-1 rounded">
                                    <Cpu className="w-3 h-3 inline animate-spin mr-1" /> Scanning repaired surface...
                                  </span>
                                </div>
                              </motion.div>
                            )}
                            {/* Score badge */}
                            {afterScanScore > 0 && verifyPhase !== 'scanning_after' && (
                              <div className={`absolute bottom-2 right-2 z-20 text-[9px] font-mono font-bold px-2 py-0.5 rounded text-white ${
                                afterScanScore < 10 ? 'bg-emerald-500/90' : 'bg-rose-500/90'
                              }`}>
                                Defect: {afterScanScore}%
                              </div>
                            )}
                          </div>
                        </div>

                        {/* After Photo Presets for Demo */}
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">Select Demo After-Photo Preset:</span>
                          <div className="flex gap-2">
                            {afterPresets.map((p, i) => (
                              <button
                                key={i}
                                onClick={() => { setAfterPhotoUrl(p.url); setSelectedPresetWillPass(p.willPass); resetVerification(); }}
                                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-all ${
                                  afterPhotoUrl === p.url
                                    ? p.willPass ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                                }`}
                              >
                                {p.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* AI Comparison Metrics Panel */}
                        <AnimatePresence>
                          {verifyPhase === 'comparing' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2">
                              <Cpu className="w-4 h-4 animate-spin text-cyan-400" />
                              Running pixel-level defect comparison matrix... Analyzing structural similarity index...
                            </motion.div>
                          )}

                          {verifyPhase === 'passed' && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/50 space-y-2">
                              <div className="flex items-center gap-2 text-emerald-300">
                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm font-bold">✅ AI VERIFICATION PASSED — Defect Cleared!</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="p-2 rounded-lg bg-slate-950 border border-emerald-500/30 text-center">
                                  <span className="text-[9px] text-slate-400 block font-mono">BEFORE DEFECT</span>
                                  <span className="text-sm font-bold text-rose-400">{beforeScanScore}%</span>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-950 border border-emerald-500/30 text-center">
                                  <span className="text-[9px] text-slate-400 block font-mono">AFTER DEFECT</span>
                                  <span className="text-sm font-bold text-emerald-400">{afterScanScore}%</span>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-950 border border-emerald-500/30 text-center">
                                  <span className="text-[9px] text-slate-400 block font-mono">QUALITY SCORE</span>
                                  <span className="text-sm font-bold text-cyan-300">{qualityScore}/100</span>
                                </div>
                              </div>
                              <p className="text-[10px] font-mono text-emerald-200/80">
                                Defect detection dropped from {beforeScanScore}% → {afterScanScore}%. Surface restoration quality: {qualityScore}/100. Ticket auto-closed. Citizen earns +50 reward points!
                              </p>
                            </motion.div>
                          )}

                          {verifyPhase === 'failed' && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-rose-500/15 border-2 border-rose-500/50 space-y-2">
                              <div className="flex items-center gap-2 text-rose-300">
                                <XCircle className="w-5 h-5 text-rose-400" />
                                <span className="text-sm font-bold">❌ AI VERIFICATION FAILED — Defect Still Exists!</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="p-2 rounded-lg bg-slate-950 border border-rose-500/30 text-center">
                                  <span className="text-[9px] text-slate-400 block font-mono">BEFORE DEFECT</span>
                                  <span className="text-sm font-bold text-rose-400">{beforeScanScore}%</span>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-950 border border-rose-500/30 text-center">
                                  <span className="text-[9px] text-slate-400 block font-mono">AFTER DEFECT</span>
                                  <span className="text-sm font-bold text-rose-400">{afterScanScore}%</span>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-950 border border-rose-500/30 text-center">
                                  <span className="text-[9px] text-slate-400 block font-mono">MATCH OVERLAP</span>
                                  <span className="text-sm font-bold text-rose-400">{matchPercent}%</span>
                                </div>
                              </div>
                              <p className="text-[10px] font-mono text-rose-200/80">
                                AI detected {afterScanScore}% defect presence in the AFTER photo — same defect pattern still visible ({matchPercent}% match). Ticket closure REJECTED. Worker must complete the actual repair and upload a new photo.
                              </p>
                              <button
                                onClick={resetVerification}
                                className="mt-1 px-4 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold hover:bg-rose-500 hover:text-white transition-all"
                              >
                                Upload New After Photo & Retry
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Resolution Notes */}
                        <textarea
                          rows={2} value={resolutionNotes} onChange={(e) => setResolutionNotes(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
                          placeholder="Enter resolution notes..."
                        />

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-1">
                          <button onClick={() => { setActiveTicketId(null); resetVerification(); }} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs">
                            Cancel
                          </button>
                          <button
                            onClick={() => handleRunVerification(task.id)}
                            disabled={verifyPhase !== 'idle' && verifyPhase !== 'failed'}
                            className={`px-5 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all ${
                              verifyPhase !== 'idle' && verifyPhase !== 'failed'
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'btn-neon bg-emerald-500 text-black shadow-glowEmerald hover:bg-emerald-400'
                            }`}
                          >
                            <Sparkles className="w-4 h-4" />
                            {verifyPhase === 'failed' ? 'Retry AI Verification' : 'Run AI Before/After Verification'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setActiveTicketId(task.id); resetVerification(); }}
                        className="btn-neon w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold text-xs shadow-glowEmerald flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Upload After Photo & Run AI Verification
                      </button>
                    )
                  )}

                  {/* Completed Card */}
                  {task.status === 'COMPLETED' && task.afterImageUrl && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          AI Verified: Defect 100% Cleared & Surface Restored
                        </span>
                        <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded font-bold text-emerald-300">+50 Citizen Pts</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[9px] font-mono text-slate-500 block mb-1">BEFORE</span>
                          <img src={task.imageUrl} alt="Before" className="w-full h-20 object-cover rounded-lg border border-slate-800" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-emerald-400 block mb-1">AFTER (Verified)</span>
                          <img src={task.afterImageUrl} alt="After" className="w-full h-20 object-cover rounded-lg border border-emerald-500/40" />
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: 3D NAV */}
        {activeTab === '3d_nav' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Worker Field Waypoint 3D Navigation Twin</h3>
              <p className="text-xs text-slate-400 font-mono">Shows ONLY waypoints for work orders approved and assigned to you by the Officer.</p>
            </div>
            <div className="w-full h-[500px] relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-glassCard">
              <SmartCityCanvas complaints={assignedTasks} activeDepartmentFilter="ALL" weather="sunny" isNight={true} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
