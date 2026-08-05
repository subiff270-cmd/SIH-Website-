import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Cpu, 
  ArrowRight,
  ShieldAlert,
  Send,
  BellRing,
  Camera,
  Layers,
  Activity
} from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import { useAuth } from '../context/AuthContext';
import { SmartCityCanvas } from '../components/3d/SmartCityCanvas';

export const OfficerDashboard: React.FC = () => {
  const { complaints, notifications, assignWorker, clearNotifications } = useIssues();
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'pending' | '3d_matrix' | 'completed'>('pending');

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [workerName, setWorkerName] = useState('Vikram Singh (PWD Crew #14)');
  const [workerPhone, setWorkerPhone] = useState('+91 98111 22334');

  const officerNotifs = notifications.filter((n) => n.targetRole === 'officer');
  const pendingApprovalQueue = complaints.filter((c) => c.status === 'AI_VERIFIED');
  const completedQueue = complaints.filter((c) => c.status === 'COMPLETED');

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicketId) {
      assignWorker(selectedTicketId, workerName, workerPhone);
      setSelectedTicketId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/40 shadow-glowPurple flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono text-purple-300 uppercase tracking-widest block">DEPARTMENT OFFICER OPERATIONS PORTAL</span>
              <h1 className="text-2xl font-bold text-white font-display">Officer Triage & Dispatch Hub</h1>
              <p className="text-xs text-slate-400">Inspect AI-verified reports, dispatch field workers, and review completed job photos.</p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-900/90 border border-purple-500/40 text-xs font-mono text-purple-300 font-bold">
            Pending Approval: {pendingApprovalQueue.length} Tickets
          </div>
        </div>

        {/* REAL-TIME OFFICER PUSH NOTIFICATIONS ALERT */}
        <AnimatePresence>
          {officerNotifs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 rounded-3xl bg-purple-500/10 border-2 border-purple-400 shadow-glowPurple space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-purple-300 flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-purple-400 animate-bounce" />
                  OFFICER ALERT: WORKER COMPLETED JOB ({officerNotifs.length})
                </span>
                <button
                  onClick={() => clearNotifications('officer')}
                  className="text-[10px] font-mono text-slate-400 hover:text-white"
                >
                  Dismiss All [X]
                </button>
              </div>

              {officerNotifs.map((n) => (
                <div key={n.id} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-cyan-400">
                    <span className="font-bold text-purple-300">{n.title}</span>
                    <span>Ticket #{n.ticketNumber}</span>
                  </div>
                  <p className="text-slate-200">{n.message}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* OFFICER TABS */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'pending'
                ? 'bg-purple-500 text-white shadow-glowPurple'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" /> Pending Citizen Approval Queue ({pendingApprovalQueue.length})
          </button>
          <button
            onClick={() => setActiveTab('3d_matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === '3d_matrix'
                ? 'bg-purple-500 text-white shadow-glowPurple'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" /> Officer 3D Triage City Matrix
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-emerald-500 text-black shadow-glowEmerald'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Completed Repairs ({completedQueue.length})
          </button>
        </div>

        {/* TAB 1: PENDING CITIZEN REPORTS */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingApprovalQueue.length === 0 ? (
              <div className="glass-card p-8 rounded-3xl text-center text-xs text-slate-400 font-mono border border-slate-800">
                No pending citizen reports waiting for approval right now.
              </div>
            ) : (
              pendingApprovalQueue.map((ticket) => (
                <div
                  key={ticket.id}
                  className="glass-card p-6 rounded-3xl border border-purple-500/30 shadow-glowPurple flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img src={ticket.imageUrl} alt={ticket.title} className="w-20 h-20 rounded-2xl object-cover border border-slate-700 shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          {ticket.ticketNumber}
                        </span>
                        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                          ticket.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {ticket.severity} SEVERITY
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400">
                          AI Confidence: {ticket.aiAnalysis.confidenceScore}%
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white font-display">{ticket.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-1">{ticket.description}</p>
                      
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-3 pt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-400" /> {ticket.location.address}</span>
                        <span>Reported by: {ticket.reportedBy.name}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className="btn-neon w-full md:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold shadow-glowPurple flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Approve & Dispatch to Worker
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: OFFICER 3D TRIAGE CITY MATRIX */}
        {activeTab === '3d_matrix' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Officer Citywide Triage 3D Matrix</h3>
              <p className="text-xs text-slate-400 font-mono">3D Digital Twin showing pending tickets awaiting officer dispatch across city wards.</p>
            </div>
            <div className="w-full h-[500px] relative rounded-3xl overflow-hidden border border-purple-500/30 shadow-glassCard">
              <SmartCityCanvas
                complaints={pendingApprovalQueue}
                activeDepartmentFilter="ALL"
                weather="sunny"
                isNight={true}
              />
            </div>
          </div>
        )}

        {/* TAB 3: COMPLETED REPAIRS */}
        {activeTab === 'completed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedQueue.map((t) => (
              <div key={t.id} className="glass-card p-5 rounded-3xl border border-emerald-500/40 shadow-glowEmerald space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-cyan-300 font-bold text-xs">{t.ticketNumber}</span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    RESOLVED & PHOTO VERIFIED
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">{t.title}</h4>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div>
                    <span className="text-slate-400 block mb-1">Before Defect</span>
                    <img src={t.imageUrl} alt="Before" className="w-full h-24 object-cover rounded-xl border border-slate-800" />
                  </div>
                  <div>
                    <span className="text-emerald-400 block mb-1">Worker Repair Photo</span>
                    <img src={t.afterImageUrl || t.imageUrl} alt="After repair" className="w-full h-24 object-cover rounded-xl border border-emerald-500/50" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
                  <div className="flex justify-between"><span>Field Worker:</span> <span className="text-white font-bold">{t.assignedWorker?.name || 'Vikram Singh'}</span></div>
                  <div className="flex justify-between"><span>Resolution Note:</span> <span className="text-emerald-400 font-semibold truncate">"Repaired & inspected"</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Worker Assignment Modal */}
        {selectedTicketId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-purple-500/40 shadow-2xl space-y-4"
            >
              <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-400" /> Dispatch Field Worker
              </h3>
              <p className="text-xs text-slate-400">
                Approving this ticket will immediately dispatch work task to the field worker's dashboard with a push notification!
              </p>
              
              <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Select Field Worker</label>
                  <input
                    type="text"
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Worker Contact Phone</label>
                  <input
                    type="text"
                    value={workerPhone}
                    onChange={(e) => setWorkerPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTicketId(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-neon px-5 py-2 rounded-xl bg-purple-600 text-white font-bold"
                  >
                    Approve & Trigger Dispatch
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};
