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
  Map as MapIcon
} from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import { useAuth } from '../context/AuthContext';
import { SmartCityCanvas } from '../components/3d/SmartCityCanvas';

export const WorkerDashboard: React.FC = () => {
  const { complaints, notifications, resolveIssueWithPhoto, clearNotifications } = useIssues();
  const { currentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'tasks' | '3d_nav'>('tasks');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('Cold-mix asphalt patch unit deployed. Defect repaired and verified.');
  const [afterPhotoUrl, setAfterPhotoUrl] = useState('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80');

  const workerNotifs = notifications.filter((n) => n.targetRole === 'worker');

  // Filter tasks explicitly assigned to worker by the Officer
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
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResolveSubmit = (id: string) => {
    resolveIssueWithPhoto(id, afterPhotoUrl, resolutionNotes);
    setActiveTicketId(null);
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
              <p className="text-xs text-slate-400">Contains ONLY tasks approved & assigned by Officer with GPS location map.</p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            {assignedTasks.length} Assigned Work Orders
          </span>
        </div>

        {/* REAL-TIME WORKER PUSH NOTIFICATIONS ALERT */}
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
                <button
                  onClick={() => clearNotifications('worker')}
                  className="text-[10px] font-mono text-slate-400 hover:text-white"
                >
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
              activeTab === 'tasks'
                ? 'bg-emerald-500 text-black shadow-glowEmerald'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" /> Assigned Tasks & Photo Upload ({assignedTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('3d_nav')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === '3d_nav'
                ? 'bg-emerald-500 text-black shadow-glowEmerald'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" /> Worker 3D Waypoint Navigation Map
          </button>
        </div>

        {/* Hidden Camera Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleWorkerPhotoUpload}
          className="hidden"
        />

        {/* TAB 1: ASSIGNED TASKS & PHOTO UPLOAD */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {assignedTasks.length === 0 ? (
              <div className="glass-card p-10 rounded-3xl text-center space-y-3 border border-slate-800">
                <Clock className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Active Tasks Assigned Yet</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Citizen reports defect → Officer approves → Task appears here on your worker dashboard with GPS route!
                </p>
              </div>
            ) : (
              assignedTasks.map((task) => (
                <div key={task.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <img src={task.imageUrl} alt={task.title} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                            {task.ticketNumber}
                          </span>
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                            task.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            STATUS: {task.status}
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
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-500 hover:text-black transition-all"
                    >
                      <Navigation className="w-4 h-4" /> Open GPS Navigation Route
                    </a>
                  </div>

                  {/* Resolution Photo Upload */}
                  {task.status !== 'COMPLETED' && (
                    activeTicketId === task.id ? (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                            <Camera className="w-4 h-4" /> Upload Real Resolution Photo from Device
                          </h4>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono"
                          >
                            Take / Choose Photo
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 block mb-1">Before Defect</span>
                            <img src={task.imageUrl} alt="Before" className="w-full h-28 object-cover rounded-xl border border-slate-800" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-emerald-400 block mb-1">After Repair Photo</span>
                            <img src={afterPhotoUrl} alt="After repair" className="w-full h-28 object-cover rounded-xl border border-emerald-500/50 shadow-glowEmerald" />
                          </div>
                        </div>

                        <textarea
                          rows={2}
                          value={resolutionNotes}
                          onChange={(e) => setResolutionNotes(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
                          placeholder="Enter resolution notes..."
                        />

                        <div className="flex items-center justify-end gap-3 pt-1">
                          <button onClick={() => setActiveTicketId(null)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs">
                            Cancel
                          </button>
                          <button
                            onClick={() => handleResolveSubmit(task.id)}
                            className="btn-neon px-4 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold shadow-glowEmerald"
                          >
                            Complete & Send Officer Notification
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveTicketId(task.id)}
                        className="btn-neon w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold text-xs shadow-glowEmerald flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Mark Resolved & Upload Photo
                      </button>
                    )
                  )}

                  {task.status === 'COMPLETED' && task.afterImageUrl && (
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Resolution completed & verified! Officer & Citizen notified.</span>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: WORKER 3D WAYPOINT NAVIGATION MAP */}
        {activeTab === '3d_nav' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Worker Field Waypoint 3D Navigation Twin</h3>
              <p className="text-xs text-slate-400 font-mono">Shows ONLY waypoints for work orders approved and assigned to you by the Officer.</p>
            </div>
            <div className="w-full h-[500px] relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-glassCard">
              <SmartCityCanvas
                complaints={assignedTasks}
                activeDepartmentFilter="ALL"
                weather="sunny"
                isNight={true}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
